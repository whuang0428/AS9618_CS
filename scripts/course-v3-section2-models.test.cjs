const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('./course-v3-section2-models.js');
const last = trace => trace.at(-1);

test('a resource request depends on its provider, not every other device', () => {
  assert.equal(last(M.networkTrace()).delivered, true);
  assert.equal(last(M.networkTrace({ architecture: 'server', failure: 'server' })).delivered, false);
  assert.equal(last(M.networkTrace({ architecture: 'server', failure: 'peer' })).delivered, true);
  assert.equal(last(M.networkTrace({ architecture: 'peer', failure: 'peer' })).delivered, false);
  assert.equal(last(M.networkTrace({ architecture: 'peer', failure: 'server' })).delivered, true);
  for (const architecture of ['server', 'peer']) assert.equal(last(M.networkTrace({ architecture, failure: 'switch' })).delivered, false);
});

test('star: an unrelated leaf failure preserves A to C, while destination or centre failure blocks it', () => {
  assert.deepEqual(M.topologyModel().path, ['A', 'S', 'C']);
  assert.deepEqual(M.topologyModel({ shape: 'star', failure: 'link-ab' }).path, ['A', 'S', 'C']);
  assert.deepEqual(M.topologyModel({ shape: 'star', failure: 'link-ac' }).path, []);
  assert.equal(M.topologyModel({ shape: 'star', failure: 'centre' }).working.length, 0);
});

test('mesh: a failed direct link uses a real surviving alternate path', () => {
  assert.deepEqual(M.topologyModel({ shape: 'mesh' }).path, ['A', 'C']);
  const model = M.topologyModel({ shape: 'mesh', failure: 'link-ac' });
  assert.deepEqual(model.path, ['A', 'B', 'C']);
  for (let i = 1; i < model.path.length; i++) assert.ok(model.working.some(edge => edge.includes(model.path[i - 1]) && edge.includes(model.path[i])));
  assert.equal(M.topologyModel({ shape: 'mesh', failure: 'centre' }).broken.length, 0);
  assert.deepEqual(M.shortestPath(['A', 'B'], [], 'A', 'B'), []);
  assert.deepEqual(M.shortestPath(['A'], [], 'A', 'X'), []);
});

test('media uses physical carriers and a satellite relay without invented bandwidth rankings', () => {
  assert.match(M.media.copper.carrier, /Electrical/);
  assert.match(M.media.fibre.carrier, /Light/);
  assert.equal(M.media.satellite.path[1], 'Satellite relay');
  assert.equal(last(M.mediaTrace({ medium: 'radio', scenario: 'mobile' })).suitable, true);
  assert.equal(last(M.mediaTrace({ medium: 'copper', scenario: 'mobile' })).suitable, false);
  assert.match(M.media.satellite.limits, /orbit/);
});

test('shared Ethernet collision trace orders detection, jam and backoff before retry', () => {
  const trace = M.ethernetTrace(), collision = trace.findIndex(f => f.collision), jam = trace.findIndex(f => f.jam), backoff = trace.findIndex(f => f.slots);
  assert.ok(collision > 1 && collision < jam && jam < backoff);
  assert.deepEqual(trace[backoff].slots, [0, 1]);
  assert.equal(last(trace).recovered, true);
  assert.ok(!trace[0].collision);
});

test('equal backoff choices can collide again and carrier sense can defer without a collision', () => {
  const same = M.ethernetTrace({ backoff: 'same' });
  assert.deepEqual(same.find(f => f.slots).slots, [0, 0]);
  assert.equal(last(same).recovered, false);
  assert.equal(last(same).collision, true);
  const later = M.ethernetTrace({ timing: 'later' });
  assert.ok(later.every(f => !f.collision && !f.jam && !f.slots));
  assert.match(later[2].line, /defers/);
});

test('full-duplex Ethernet has no CSMA/CD recovery, and introductory frame trace avoids it', () => {
  const switched = M.ethernetTrace({ mode: 'switched' });
  assert.ok(switched.every(f => !f.collision && !f.jam && !f.slots));
  assert.match(last(switched).why, /congestion/);
  const frames = M.ethernetTrace({ mode: 'switched', topic: 'frames' });
  assert.deepEqual(frames[0].fields, ['Destination MAC', 'Source MAC', 'Payload', 'Error check']);
  assert.ok(frames.every(f => !f.slots));
});

test('stream starts exactly at threshold after reception and uses Mbit consistently', () => {
  const trace = M.streamingTrace({ download: 2, playback: 2, threshold: 4, initial: 0, seconds: 3 });
  assert.equal(trace[0].buffer, 0);
  assert.equal(trace[1].state, 'buffering');
  assert.equal(trace[1].used, 0);
  assert.equal(trace[2].state, 'playing');
  assert.equal(trace[2].receivedBuffer, 4);
  assert.equal(trace[2].buffer, 2);
  assert.equal(trace[3].buffer, 2);
});

test('a slow connection drains a playing buffer then resumes only at the restart threshold', () => {
  const trace = M.streamingTrace({ download: 1, playback: 2, threshold: 4, initial: 4, seconds: 9 });
  assert.equal(trace[4].buffer, 0);
  assert.equal(trace[5].state, 'stalled');
  assert.equal(trace[5].buffer, 1);
  assert.equal(trace[6].state, 'buffering');
  assert.equal(trace[6].buffer, 2);
  assert.equal(trace[8].state, 'playing');
  assert.equal(trace[8].buffer, 2);
});

test('zero delivery cannot manufacture data, including when starting with a partial buffer', () => {
  const empty = M.streamingTrace({ download: 0, playback: 2, threshold: 4, seconds: 5 });
  assert.ok(empty.every(f => f.buffer === 0 && f.used === 0));
  const partial = M.streamingTrace({ download: 0, playback: 2, threshold: 4, initial: 3 });
  assert.ok(partial.every(f => f.buffer === 3 && f.used === 0));
});

test('the classroom live-deficit example runs long enough to reveal its first stall', () => {
  const trace = M.streamingTrace({ download: 3, playback: 4, threshold: 4, initial: 12, kind: 'live' });
  assert.equal(trace[12].buffer, 0);
  assert.equal(trace[12].state, 'playing');
  assert.equal(trace[13].state, 'stalled');
});

test('live content cannot be received before it is produced; on-demand content can be prefetched', () => {
  const live = M.streamingTrace({ kind: 'live', download: 10, playback: 2, threshold: 4, seconds: 12 });
  assert.equal(live[1].arrived, 2);
  assert.ok(live.every(f => f.received <= f.produced));
  assert.equal(last(live).buffer, 2);
  const demand = M.streamingTrace({ kind: 'demand', download: 10, playback: 2, threshold: 4, seconds: 12 });
  assert.equal(last(demand).buffer, 96);
});

test('streaming conserves data and never consumes a partial playback second across valid cases', () => {
  for (const kind of ['demand', 'live']) for (const download of [0, 1, 2, 7, 12]) for (const playback of [1, 2, 8]) for (const threshold of [playback, 24]) {
    const trace = M.streamingTrace({ kind, download, playback, threshold, initial: 3 });
    for (const f of trace) {
      assert.ok(f.buffer >= 0);
      assert.equal(f.received - f.consumed, f.buffer);
      assert.ok(f.used === 0 || f.used === playback);
      if (f.second) assert.equal(f.before + f.arrived - f.used, f.buffer);
      if (kind === 'live') assert.ok(f.received <= f.produced);
    }
  }
});

test('invalid streaming rates and impossible restart thresholds are rejected', () => {
  for (const config of [{ download: -1 }, { download: 0.5 }, { playback: 0 }, { playback: 8, threshold: 4 }, { initial: 25 }, { seconds: 0 }]) assert.throws(() => M.streamingTrace(config), RangeError);
});

test('IPv4 validates every decimal octet and preserves 32-bit representation', () => {
  assert.equal(M.ipv4('192.168.1.70').bits.length, 32);
  assert.equal(M.ipv4('255.255.255.255').bits, '1'.repeat(32));
  for (const address of ['', '192.168.1', '256.1.2.3', '-1.2.3.4', '1e2.0.0.1', '1..2.3', '1.2.3.4.5']) assert.throws(() => M.ipv4(address), RangeError);
});

test('IPv6 expansion handles compressed endpoints and all-zero addresses', () => {
  assert.equal(M.ipv6('2001:db8::70').expanded, '2001:0db8:0000:0000:0000:0000:0000:0070');
  assert.equal(M.ipv6('::').bits, '0'.repeat(128));
  assert.equal(M.ipv6('::1').expanded, '0000:0000:0000:0000:0000:0000:0000:0001');
  assert.equal(M.ipv6('1:2:3:4:5:6:7:8').bits.length, 128);
  for (const address of ['1:2:3', '1:2:3:4:5:6:7:8:9', '1::2::3', ':::1', '1:2:3:4:5:6:7::8', 'gggg::1', '12345::1']) assert.throws(() => M.ipv6(address), RangeError);
});

test('/26 subnetting distinguishes network, usable hosts and broadcast at every block boundary', () => {
  for (const start of [0, 64, 128, 192]) {
    const stem = '192.168.1.';
    assert.equal(M.subnetModel(stem + start, 26).kind, 'Network address');
    assert.equal(M.subnetModel(stem + (start + 63), 26).kind, 'Broadcast address');
    const host = M.subnetModel(stem + (start + 1), 26);
    assert.equal(host.kind, 'Usable host address');
    assert.equal(host.network, stem + start);
    assert.equal(host.broadcast, stem + (start + 63));
    assert.equal(host.usable, 62);
  }
});

test('the same IPv4 address has different boundaries under /24 and /26', () => {
  const small = M.subnetModel('192.168.1.70', 26), large = M.subnetModel('192.168.1.70', 24);
  assert.equal(small.network, '192.168.1.64'); assert.equal(small.last, '192.168.1.126');
  assert.equal(large.network, '192.168.1.0'); assert.equal(large.last, '192.168.1.254');
  assert.equal(large.usable, 254);
  assert.throws(() => M.subnetModel('192.168.1.70', 25), RangeError);
});

test('client and destination comparison uses the full prefix and changes when the given mask changes', () => {
  for (const destination of ['192.168.1.90', '192.168.1.100']) assert.equal(M.subnetComparison('192.168.1.70', destination, 26).sameNetwork, true);
  for (const destination of ['192.168.1.130', '192.168.1.150']) {
    const remote = M.subnetComparison('192.168.1.70', destination, 26);
    assert.equal(remote.sameNetwork, false);
    assert.match(remote.delivery, /gateway/);
    assert.equal(M.subnetComparison('192.168.1.70', destination, 24).sameNetwork, true);
  }
  assert.equal(M.subnetComparison('192.168.1.64', '192.168.1.90', 26).usable, false);
  assert.equal(M.subnetComparison('192.168.1.70', '192.168.1.127', 26).usable, false);
  assert.equal(last(M.addressingTrace({ destination: '192.168.1.100' })).comparison.sameNetwork, true);
});

test('RFC 1918 scope is separate from assignment and excludes neighbouring 172 ranges', () => {
  for (const address of ['10.0.0.1', '172.16.0.1', '172.31.255.254', '192.168.0.1']) assert.equal(M.subnetModel(address).scope, 'Private (RFC 1918)');
  for (const address of ['172.15.255.254', '172.32.0.1', '8.8.8.8']) assert.equal(M.subnetModel(address).scope, 'Outside RFC 1918 private ranges');
  assert.match(M.subnetModel('127.0.0.1').scope, /loopback/);
  assert.match(M.subnetModel('203.0.113.20').scope, /Special/);
  assert.equal(M.subnetModel('192.0.1.20').scope, 'Outside RFC 1918 private ranges');
  for (const assignment of ['static', 'dynamic']) assert.equal(M.addressingTrace({ assignment, topic: 'assignment' })[1].line, 'Private (RFC 1918)');
});

test('DNS returns an address before the web request, not the page itself', () => {
  const trace = M.dnsTrace(), answer = trace.findIndex(f => f.title === 'Receive an address record'), request = trace.findIndex(f => f.title === 'Send the web request');
  assert.ok(answer > 0 && request > answer);
  assert.match(trace[answer].why, /not the webpage/);
  assert.equal(last(trace).delivered, true);
});

test('DNS outage blocks an uncached name but not a valid browser cache hit', () => {
  const miss = M.dnsTrace({ cache: 'miss', failure: 'dns' });
  assert.equal(last(miss).delivered, false);
  assert.ok(!miss.some(f => f.title === 'Send the web request'));
  const hit = M.dnsTrace({ cache: 'hit', failure: 'dns' });
  assert.equal(last(hit).delivered, true);
  assert.ok(!hit.some(f => f.title === 'Ask the configured resolver'));
});

test('a resolved address does not mask a web service failure', () => {
  for (const cache of ['hit', 'miss']) {
    const result = last(M.dnsTrace({ cache, failure: 'web' }));
    assert.equal(result.addressKnown, true);
    assert.equal(result.delivered, false);
  }
});

test('cloud access follows the specified deployment dependencies, not a universal public/private rule', () => {
  assert.equal(last(M.cloudTrace({ deployment: 'public', failure: 'internet' })).delivered, false);
  assert.equal(last(M.cloudTrace({ deployment: 'private', failure: 'internet' })).delivered, true);
  for (const deployment of ['private', 'public']) {
    assert.equal(last(M.cloudTrace({ deployment, failure: 'server' })).delivered, false);
    assert.equal(last(M.cloudTrace({ deployment, failure: 'none' })).delivered, true);
  }
  assert.match(last(M.cloudTrace({ deployment: 'private', failure: 'internet' })).why, /remotely hosted/);
});

test('models reject unknown categories instead of silently choosing a default', () => {
  for (const [fn, config] of [[M.networkTrace, { architecture: 'unknown' }], [M.topologyModel, { shape: 'ring' }], [M.mediaTrace, { medium: 'light' }], [M.ethernetTrace, { mode: 'wireless' }], [M.dnsTrace, { cache: 'expired' }], [M.cloudTrace, { deployment: 'hybrid' }]]) assert.throws(() => fn(config), RangeError);
});

test('lab templates validate configs and can restrict controls to concepts already taught', async () => {
  const { labFor, labMarkup } = await import('./course-v3-section2-labs.mjs');
  assert.equal(Object.keys(labMarkup).length, 8);
  const media = labFor('media', { allowedMedia: ['copper', 'fibre'] });
  assert.ok(!media.includes('<option value="radio"'));
  const network = labFor('network', { allowedFailures: ['none', 'server', 'peer'] });
  assert.ok(!network.includes('<option value="switch"'));
  assert.ok(!labFor('ethernet', { topic: 'frames' }).includes('data-s2-role="backoff"'));
  assert.ok(!labFor('addressing', { topic: 'subnets' }).includes('data-s2-role="assignment"'));
  assert.ok(!labFor('addressing', { topic: 'assignment' }).includes('data-s2-role="prefix"'));
  assert.throws(() => labFor('media', { allowedMedia: ['fibre'] }), RangeError);
  assert.throws(() => labFor('dns', { failure: 'anything' }), RangeError);
  assert.throws(() => labFor('network', { injected: true }), RangeError);
});
