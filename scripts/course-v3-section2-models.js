/* Local teaching models. Each frame describes a complete display state. */
const Section2Models = (() => {
  'use strict';
  const choice = (value, allowed, label) => { if (!allowed.includes(value)) throw new RangeError(`Choose a supported ${label}.`); return value; };
  const integer = (value, min, max, label) => { if (!Number.isInteger(value) || value < min || value > max) throw new RangeError(`${label} must be a whole number from ${min} to ${max}.`); return value; };
  const frame = (title, line, why, extra = {}) => ({ title, line, why, ...extra });

  function networkTrace({ architecture = 'server', failure = 'none' } = {}) {
    choice(architecture, ['server', 'peer'], 'network model'); choice(failure, ['none', 'server', 'peer', 'switch'], 'failure');
    const provider = architecture === 'server' ? 'File server' : 'Student B';
    const nodes = ['Student A', 'Network connection', provider];
    const failed = failure === 'switch' ? 1 : failure === (architecture === 'server' ? 'server' : 'peer') ? 2 : -1;
    const trace = [frame('Locate the shared copy', `The worksheet is stored on ${provider}.`, architecture === 'server' ? 'Student A is a client: it requests the file service from a dedicated server.' : 'Student B provides this file; it can also request resources from other peers. Peer roles depend on the current task.', { nodes, active: [2], failed })];
    trace.push(frame('Send a request', 'Student A asks for the worksheet.', 'A shared resource stays on another device until data is sent across a working connection.', { nodes, active: failed === 1 ? [0] : [0, 1], failed }));
    if (failed >= 0) trace.push(frame('The request cannot complete', failed === 1 ? 'The network connection is unavailable.' : `${provider} is unavailable.`, 'This example has one copy and no alternative service. Another working computer cannot supply a file it does not hold.', { nodes, active: [], failed, delivered: false }));
    else trace.push(frame('Return the file data', `${provider} sends the requested worksheet to Student A.`, failure === 'none' ? 'Both the provider and the path are available, so the client can receive the data.' : 'The chosen failed device does not provide this particular resource. Its failure does not interrupt this request.', { nodes, active: [2, 1, 0], failed, delivered: true }));
    return trace;
  }

  function shortestPath(nodes, edges, source, destination) {
    if (!nodes.includes(source) || !nodes.includes(destination)) return [];
    const queue = [[source]], seen = new Set([source]);
    while (queue.length) {
      const path = queue.shift(), last = path[path.length - 1];
      if (last === destination) return path;
      edges.filter(edge => edge.includes(last)).forEach(edge => { const next = edge[0] === last ? edge[1] : edge[0]; if (!seen.has(next)) { seen.add(next); queue.push([...path, next]); } });
    }
    return [];
  }

  function topologyModel({ shape = 'star', failure = 'none' } = {}) {
    choice(shape, ['star', 'mesh'], 'topology'); choice(failure, ['none', 'link-ac', 'link-ab', 'centre'], 'failure');
    const nodes = shape === 'star' ? ['A', 'B', 'C', 'S'] : ['A', 'B', 'C'];
    const edges = shape === 'star' ? [['A', 'S'], ['B', 'S'], ['C', 'S']] : [['A', 'B'], ['A', 'C'], ['B', 'C']];
    const broken = failure === 'none' || shape === 'mesh' && failure === 'centre' ? [] : failure === 'centre' ? edges : [shape === 'star' ? [failure === 'link-ac' ? 'C' : 'B', 'S'] : failure === 'link-ac' ? ['A', 'C'] : ['A', 'B']];
    const working = edges.filter(edge => !broken.some(bad => bad.every(node => edge.includes(node))));
    const path = shortestPath(nodes, working, 'A', 'C');
    const trace = [frame('Inspect the connections', 'The task is to send data from A to C.', shape === 'star' ? 'Every end device has one link to the central switch S.' : 'Every pair of nodes has a direct link. These nodes are assumed able to forward data over an alternative path.', { path: [], phase: 'inspect' }), frame('Apply the chosen failure', broken.length ? `${broken.length} link${broken.length === 1 ? '' : 's'} unavailable` : 'All links remain available', shape === 'mesh' && failure === 'centre' ? 'This mesh has no central switch, so a central-switch failure does not apply.' : 'A failed link cannot carry data. A failed central switch prevents communication through all its links.', { path: [], phase: 'failure' }), frame('Find a working path', path.length ? path.join(' → ') : 'No working path from A to C', path.length ? path.length > 2 && shape === 'mesh' ? 'The direct link failed, but B can forward data along the remaining links. A physical alternative helps only if devices and routing support its use.' : 'Only the links on this working path are needed for this request.' : 'A cannot reach C using the remaining links. Extra links elsewhere would not automatically reconnect C.', { path, phase: 'path' })];
    return { shape, nodes, edges, broken, working, path, trace };
  }

  const media = {
    copper: { label: 'Copper cable', carrier: 'Electrical signals', path: ['Transmitter', 'Copper conductor', 'Receiver'], strengths: 'A practical wired connection over a suitable short cable run.', limits: 'Electrical interference and attenuation matter; cable type and length limit performance.' },
    fibre: { label: 'Optical fibre', carrier: 'Light pulses', path: ['Light transmitter', 'Optical fibre', 'Light receiver'], strengths: 'High-capacity links over long distances; the fibre does not pick up electromagnetic interference.', limits: 'Needs optical equipment and a physical cable route; installation and repair require suitable skills.' },
    radio: { label: 'Radio / Wi-Fi', carrier: 'Electromagnetic waves', path: ['Wireless device', 'Radio coverage area', 'Access point'], strengths: 'Devices can move within coverage without a cable attached to each device.', limits: 'Walls, interference, distance and competing users can affect service. An access point alone does not guarantee internet access.' },
    microwave: { label: 'Terrestrial microwave', carrier: 'Electromagnetic waves', path: ['Dish A', 'Line-of-sight path', 'Dish B'], strengths: 'Connects fixed sites without laying a cable between them.', limits: 'Directional dishes need a suitable clear path and alignment. Obstructions and weather can affect the link.' },
    satellite: { label: 'Satellite link', carrier: 'Electromagnetic waves', path: ['Ground station A', 'Satellite relay', 'Ground station B'], strengths: 'Can connect locations beyond convenient terrestrial infrastructure.', limits: 'The signal travels to a satellite and back. Delay depends on orbit and route; it is not one fixed value for every satellite system.' }
  };
  const scenarios = { room: 'Fixed computers in one classroom', campus: 'A connection between school buildings', remote: 'A school with no convenient terrestrial link', mobile: 'Tablets moving around a classroom' };
  function mediaTrace({ medium = 'copper', scenario = 'room' } = {}) {
    choice(medium, Object.keys(media), 'transmission medium'); choice(scenario, Object.keys(scenarios), 'scenario');
    const m = media[medium], wireless = ['radio', 'microwave', 'satellite'].includes(medium);
    const suitable = scenario === 'mobile' ? medium === 'radio' : scenario === 'remote' ? medium === 'satellite' : scenario === 'room' ? ['copper', 'radio'].includes(medium) : ['fibre', 'microwave'].includes(medium);
    return [frame('Identify what carries the bits', m.carrier, `Scenario: ${scenarios[scenario]}. ${wireless ? 'The signal crosses space rather than a conductor or fibre.' : 'The signal follows an installed cable.'}`, { nodes: m.path, active: [0] }), frame('Follow the signal', m.path.join(' → '), m.strengths, { nodes: m.path, active: [0, 1, 2] }), frame('Check the trade-off', suitable ? 'A plausible candidate for this scenario' : 'Question the fit before choosing this medium', `${m.limits} ${scenario === 'mobile' && medium !== 'radio' ? 'This path does not by itself provide Wi-Fi access to moving tablets.' : ''} A final choice also needs the actual distance, capacity, availability and budget; this is not a measured speed ranking.`, { nodes: m.path, active: [0, 1, 2], suitable })];
  }

  function ethernetTrace({ mode = 'shared', timing = 'together', backoff = 'different', topic = '' } = {}) {
    choice(mode, ['shared', 'switched'], 'Ethernet link'); choice(timing, ['together', 'later'], 'transmission timing'); choice(backoff, ['different', 'same'], 'backoff outcome');
    const nodes = mode === 'shared' && topic !== 'frames' ? ['A', 'Shared medium', 'B'] : ['A', 'Switch', 'B'];
    const f = (title, line, why, extra = {}) => frame(title, line, why, { nodes, active: [], ...extra });
    if (topic === 'frames') return [f('Prepare a frame', 'Destination MAC + source MAC + payload + error-check field', 'This is a simplified field list. A link-layer frame carries payload data and addressing for this Ethernet delivery.', { active: [0], fields: ['Destination MAC', 'Source MAC', 'Payload', 'Error check'] }), f('Transmit across the LAN', 'The interface puts the frame onto the link.', 'On a switched LAN, the switch uses the destination MAC address to choose the appropriate outgoing port when it has learned the destination.', { active: [0, 1] }), f('Receive and inspect', 'B checks the destination and the received frame.', 'A damaged frame is discarded. Error detection is not the same as repairing the frame; any recovery depends on the protocols in use.', { active: [2] })];
    const trace = [f('Make a prediction', mode === 'shared' ? 'A and B share one half-duplex medium.' : 'Each device uses a dedicated full-duplex switch link.', mode === 'shared' ? 'Signals take time to propagate. An idle observation at A does not instantly reveal that B has just started.' : 'Sending and receiving use independent directions. CSMA/CD is not used on these full-duplex links.')];
    if (mode === 'switched') return [...trace, f('Both devices send', 'Separate full-duplex links carry the frames.', 'The two transmissions do not create a shared-medium collision.', { active: [0, 1, 2], collision: false }), f('Forward or queue', 'The switch forwards frames to their destination ports.', 'Output congestion can require buffering or cause drops; that is different from an Ethernet collision.', { active: [0, 1, 2], collision: false })];
    trace.push(f('Carrier sense', 'A listens and starts when its local medium is idle.', 'Carrier sense reduces collisions but cannot remove the propagation delay.', { active: [0] }));
    if (timing === 'later') return [...trace, f('B hears the busy medium', 'B defers instead of transmitting.', 'A’s signal has reached B before B attempts to send.', { active: [0, 1], collision: false }), f('Transmit after the medium becomes idle', 'B sends after A finishes and the required gap has passed.', 'This timing causes no collision. Waiting for a busy medium is different from collision recovery.', { active: [2, 1], collision: false })];
    trace.push(f('B starts before A’s signal arrives', 'Both devices had observed idle at their own end.', 'The transmissions overlap on the shared medium because propagation is not instantaneous.', { active: [0, 1, 2], collision: true }), f('Detect and announce the collision', 'Send a jam signal; stop the damaged transmissions.', 'Both transmitters detect a collision while transmitting. The jam makes the collision detectable; neither damaged frame is accepted as successful.', { active: [0, 1, 2], collision: true, jam: true }), f('Choose random backoff delays', backoff === 'different' ? 'Illustrative first choices: A = 0 slots, B = 1 slot.' : 'Illustrative first choices: A = 0 slots, B = 0 slots.', 'After the first collision, each independently chooses 0 or 1 slot. After further collisions the range grows up to a limit; random choices need not be different.', { slots: backoff === 'different' ? [0, 1] : [0, 0] }));
    trace.push(backoff === 'different' ? f('Retry after the selected delays', 'A retries first; B senses A and waits.', 'Once A has finished and the medium is idle, B can transmit. These illustrated choices avoid another overlap.', { active: [0, 1], collision: false, recovered: true }) : f('A second collision is possible', 'Equal choices can produce overlapping retries.', 'Choose fresh backoff values from the expanded range. Random backoff reduces repeated contention; it does not guarantee success on the next attempt.', { active: [0, 1, 2], collision: true, recovered: false }));
    return trace;
  }

  function streamingTrace({ download = 3, playback = 2, threshold = 4, initial = 0, kind = 'demand', seconds = 16 } = {}) {
    integer(download, 0, 12, 'Download rate'); integer(playback, 1, 8, 'Playback data rate'); integer(threshold, playback, 24, 'Start / restart threshold'); integer(initial, 0, 24, 'Initial buffer'); integer(seconds, 1, 30, 'Observation seconds'); choice(kind, ['demand', 'live'], 'streaming type');
    let buffer = initial, received = initial, consumed = 0, produced = initial, playing = initial >= threshold;
    const trace = [frame('Inspect the initial state', `${buffer} Mbit buffered; ${playing ? 'ready to play' : 'waiting to reach the threshold'}.`, `All amounts are megabits (Mbit). Each step is one second. Receive data first; start or restart only at ${threshold} Mbit, then play one second only if ${playback} Mbit is available.`, { second: 0, buffer, arrived: 0, used: 0, received, consumed, produced, playing, state: playing ? 'ready' : 'buffering' })];
    for (let second = 1; second <= seconds; second++) {
      if (kind === 'live') produced += playback;
      const available = kind === 'live' ? produced - received : Infinity;
      const arrived = Math.min(download, available); received += arrived;
      const before = buffer; buffer += arrived;
      const receivedBuffer = buffer;
      if (!playing && buffer >= threshold) playing = true;
      let used = 0, state;
      if (playing && buffer >= playback) { used = playback; buffer -= used; consumed += used; state = 'playing'; }
      else { state = playing ? 'stalled' : 'buffering'; playing = false; }
      const why = state === 'playing' ? 'Enough data is available for a complete second of playback.' : state === 'stalled' ? 'There is too little data for the next second. Playback pauses; buffered data is kept while the restart threshold is rebuilt.' : `Playback waits until the buffer reaches ${threshold} Mbit; reaching only the playback amount is insufficient under this chosen policy.`;
      trace.push(frame(`Second ${second}`, `${before} + ${arrived} − ${used} = ${buffer} Mbit`, why + (kind === 'live' && arrived < download ? ' The source has not yet produced more data, so the connection cannot download future live content.' : ''), { second, before, buffer, arrived, used, receivedBuffer, received, consumed, produced, playing, state, delay: kind === 'live' ? (produced - consumed) / playback : null }));
    }
    return trace;
  }

  function ipv4(raw) {
    if (typeof raw !== 'string' || !/^\d{1,3}(\.\d{1,3}){3}$/.test(raw.trim())) throw new RangeError('Enter four IPv4 decimal octets, for example 192.168.1.70.');
    const octets = raw.trim().split('.').map(Number); octets.forEach(n => integer(n, 0, 255, 'IPv4 octet'));
    return { octets, address: octets.join('.'), bits: octets.map(n => n.toString(2).padStart(8, '0')).join('') };
  }
  function ipv6(raw) {
    const text = String(raw).trim().toLowerCase();
    if (!/^[0-9a-f:]+$/.test(text) || (text.match(/::/g) || []).length > 1) throw new RangeError('Use eight hexadecimal IPv6 groups, optionally shortening one run of zero groups with ::.');
    const parts = text.split('::'), left = parts[0] ? parts[0].split(':') : [], right = parts.length === 2 && parts[1] ? parts[1].split(':') : [];
    if (![...left, ...right].every(group => /^[0-9a-f]{1,4}$/.test(group)) || parts.length === 1 && left.length !== 8 || parts.length === 2 && left.length + right.length >= 8) throw new RangeError('An expanded IPv6 address has exactly eight groups of 1–4 hexadecimal digits.');
    const groups = parts.length === 1 ? left : [...left, ...Array(8 - left.length - right.length).fill('0'), ...right];
    return { groups, expanded: groups.map(group => group.padStart(4, '0')).join(':'), bits: groups.map(group => parseInt(group, 16).toString(2).padStart(16, '0')).join('') };
  }
  function addressScope(octets) {
    const [a, b, c] = octets;
    if (a === 10 || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 168) return 'Private (RFC 1918)';
    if (a === 127) return 'Special: loopback';
    if (a === 169 && b === 254) return 'Special: link-local';
    if (a === 0 || a >= 224 || a === 100 && b >= 64 && b <= 127 || a === 192 && b === 0 && [0, 2].includes(c) || a === 198 && [18, 19].includes(b) || a === 198 && b === 51 && c === 100 || a === 203 && b === 0 && c === 113) return 'Special / reserved range';
    return 'Outside RFC 1918 private ranges';
  }
  function subnetModel(raw = '192.168.1.70', prefix = 26) {
    choice(prefix, [24, 26], 'prefix for this model');
    const ip = ipv4(raw), hostBits = 32 - prefix, blockSize = 2 ** hostBits;
    const start = Math.floor(ip.octets[3] / blockSize) * blockSize, end = start + blockSize - 1;
    const stem = ip.octets.slice(0, 3).join('.'), address = n => `${stem}.${n}`;
    const kind = ip.octets[3] === start ? 'Network address' : ip.octets[3] === end ? 'Broadcast address' : 'Usable host address';
    return { ...ip, prefix, hostBits, blockSize, mask: prefix === 24 ? '255.255.255.0' : '255.255.255.192', network: address(start), broadcast: address(end), first: address(start + 1), last: address(end - 1), usable: blockSize - 2, kind, scope: addressScope(ip.octets) };
  }
  function subnetComparison(address, destination, prefix) {
    const client = subnetModel(address, prefix), target = subnetModel(destination, prefix), sameNetwork = client.network === target.network;
    const usable = client.kind === 'Usable host address' && target.kind === 'Usable host address';
    return { client, target, sameNetwork, usable, delivery: !usable ? 'Not an ordinary host-to-host example' : sameNetwork ? 'Same subnet: local delivery' : 'Different subnet: use a gateway' };
  }
  function addressingTrace({ address = '192.168.1.70', destination = '192.168.1.130', prefix = 26, assignment = 'dynamic', topic = '' } = {}) {
    choice(assignment, ['static', 'dynamic'], 'assignment method');
    if (topic === 'formats') {
      const v4 = ipv4(address), v6 = ipv6('2001:db8::70');
      return [frame('Count the IPv4 bits', `${v4.address}: four octets × 8 = 32 bits`, 'Each decimal octet represents eight bits, so its value ranges from 0 to 255.', { bits: v4.bits, prefix: 32 }), frame('Expand an IPv6 example', v6.expanded, 'Each hexadecimal digit represents four bits. Eight groups × four hexadecimal digits × four bits = 128 bits. :: replaces one run of zero groups. 2001:db8::70 is a documentation example.', { groups: v6.expanded.split(':') })];
    }
    const d = subnetModel(address, Number(prefix));
    if (topic === 'assignment') return [frame('Separate two questions', `Address: ${d.address}`, 'The address range describes its scope. The assignment method describes how the device obtained it; these are independent questions.'), frame('Classify the range', d.scope, 'RFC 1918 private IPv4 ranges are 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. Other special ranges also exist; being outside these private ranges alone does not guarantee internet reachability.'), frame('Choose the assignment method', assignment === 'static' ? 'Configured to remain at a chosen address' : 'Obtained automatically under a lease, for example using DHCP', assignment === 'static' ? 'Static does not mean public. A private address can be configured statically.' : 'Dynamic does not mean private and does not require a different value at every connection. A renewed lease may keep the same address.')];
    const comparison = subnetComparison(d.address, destination, d.prefix);
    return [frame('Write all 32 bits', d.address, 'Four octets contain eight bits each. The given prefix tells us where the network part ends; an address alone does not tell us its subnet.', { bits: d.bits, prefix: 0 }), frame('Apply the given prefix', `/${d.prefix}: ${d.prefix} network bits and ${d.hostBits} host bits`, `The mask is ${d.mask}. Keep the network bits unchanged; the host bits distinguish addresses within this subnet.`, { bits: d.bits, prefix: d.prefix }), frame('Find the subnet boundaries', `${d.network} to ${d.broadcast}`, `All host bits 0 identify the network; all host bits 1 identify the broadcast address. There are 2^${d.hostBits} = ${d.blockSize} addresses in this conventional IPv4 subnet.`, { bits: d.bits, prefix: d.prefix, rows: [['Network address', d.network], ['Broadcast address', d.broadcast]] }), frame('Classify this address', d.kind, `Usable hosts: ${d.first} to ${d.last} (${d.usable} addresses). The network and broadcast addresses are not ordinary device addresses under this subnet model.`, { bits: d.bits, prefix: d.prefix, rows: [['Given address', d.address], ['First host', d.first], ['Last host', d.last], ['Usable host count', d.usable]] }), frame('Compare the destination prefix', comparison.delivery, !comparison.usable ? 'The client or destination is a network or broadcast address for this prefix. Choose usable host addresses before treating this as ordinary host-to-host delivery.' : comparison.sameNetwork ? 'The complete network prefixes match under the given mask. The destination is treated as local; this does not by itself prove the device or link is available.' : 'The complete network prefixes differ under the client’s given mask. The client needs an appropriate gateway for onward delivery; this calculation does not guarantee a working route.', { bits: comparison.target.bits, prefix: d.prefix, rows: [['Client address', d.address], ['Client subnet', `${d.network}/${d.prefix}`], ['Destination address', comparison.target.address], ['Destination subnet under this mask', `${comparison.target.network}/${d.prefix}`]], comparison })];
  }

  function dnsTrace({ cache = 'miss', failure = 'none' } = {}) {
    choice(cache, ['miss', 'hit'], 'cache state'); choice(failure, ['none', 'dns', 'web'], 'failure');
    const nodes = ['Browser', 'DNS resolver', 'Router', 'Web server'];
    const f = (title, line, why, extra = {}) => frame(title, line, why, { nodes, active: [], ...extra });
    const trace = [f('Read the URL', 'https://courses.example/lesson', 'The browser separates the scheme, hostname and path. DNS resolves the hostname courses.example; it does not return the lesson page.', { active: [0] })];
    if (cache === 'hit') trace.push(f('Use a valid cached address', 'courses.example → 203.0.113.20', 'This local example already has an unexpired address record. No new DNS query is needed for this navigation.', { active: [0], addressKnown: true }));
    else {
      trace.push(f('Ask the configured resolver', 'Which address belongs to courses.example?', 'The resolver may use its own cache or query DNS servers to find the record. It does not need to hold every hostname itself.', { active: [0, 1] }));
      if (failure === 'dns') return [...trace, f('The lookup fails', 'No address has been obtained.', 'In this example there is no usable cached result or alternative resolver. The browser cannot begin this hostname-based web request; the web server might still be healthy.', { failed: 1, delivered: false })];
      trace.push(f('Receive an address record', 'courses.example → 203.0.113.20', 'DNS has supplied an address, not the webpage. 203.0.113.20 is reserved for documentation and is used only inside this local simulation.', { active: [1, 0], addressKnown: true }));
    }
    trace.push(f('Send the web request', 'The request uses the resolved address.', 'The destination in this example is outside the local network. Routers forward packets between networks; DNS does not transport the webpage.', { active: [0, 2, 3], addressKnown: true }));
    trace.push(f(failure === 'web' ? 'The web service fails' : 'Receive the webpage', failure === 'web' ? 'Address known, but no successful page response.' : 'The web server returns the requested page.', failure === 'web' ? 'Successful name resolution does not guarantee that the destination service is available.' : cache === 'hit' && failure === 'dns' ? 'The page succeeds despite the simulated DNS outage because the valid cached address avoided a new lookup.' : 'Name resolution, routing and the web service have separate roles. Connection setup and encryption are omitted here.', { active: failure === 'web' ? [] : [3, 2, 0], failed: failure === 'web' ? 3 : -1, delivered: failure !== 'web', addressKnown: true }));
    return trace;
  }

  function cloudTrace({ deployment = 'public', failure = 'none' } = {}) {
    choice(deployment, ['public', 'private'], 'cloud deployment'); choice(failure, ['none', 'internet', 'server'], 'failure');
    const isPublic = deployment === 'public', nodes = ['School device', isPublic ? 'Internet link' : 'School LAN', isPublic ? 'Provider cloud' : 'School private cloud'];
    const failed = failure === 'server' ? 2 : failure === 'internet' && isPublic ? 1 : -1;
    return [frame('Identify who can use the service', isPublic ? 'A provider offers a cloud service to multiple customers.' : 'Cloud resources are dedicated to this organisation.', isPublic ? 'Public cloud does not mean everyone can read every customer’s data. Access controls still apply.' : 'This example is a private cloud hosted at school. A private cloud can also be hosted elsewhere.', { nodes, active: [2], failed: -1 }), frame('Follow the dependencies', nodes.join(' → '), 'The school device needs a working route and an available service. The diagram models one service with no redundant route or local cached copy.', { nodes, active: [0, 1, 2], failed: -1 }), frame('Apply the outage', failed >= 0 ? 'The service is unavailable from this device.' : 'The selected service remains reachable.', failed === 2 ? 'The only service instance has failed. Either deployment needs recovery or redundancy to tolerate that failure.' : failed === 1 ? 'The public service is healthy, but this device cannot reach it over the failed internet link.' : failure === 'internet' ? 'The on-site private cloud remains reachable over the working school LAN in this example. A remotely hosted private cloud could still depend on the internet.' : 'The required path and service are available.', { nodes, active: failed >= 0 ? [] : [0, 1, 2], failed, delivered: failed < 0 })];
  }

  return { networkTrace, shortestPath, topologyModel, media, scenarios, mediaTrace, ethernetTrace, streamingTrace, ipv4, ipv6, addressScope, subnetModel, subnetComparison, addressingTrace, dnsTrace, cloudTrace };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = Section2Models;
if (typeof window !== 'undefined') window.Section2Models = Section2Models;
