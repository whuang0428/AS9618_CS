/* Dependency-free controllers, with independent state for every Section 2 lab. */
(() => {
  'use strict';
  const M = window.Section2Models;
  if (!M) return;
  const sessions = new WeakMap(), originals = new WeakMap();
  const get = (lab, role) => lab.querySelector(`[data-s2-role="${role}"]`);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = n => Number.isInteger(n) ? String(n) : Number(n.toFixed(2)).toString();
  const table = (headings, rows) => `<div class="s2-table-scroll"><table><thead><tr>${headings.map(heading => `<th scope="col">${esc(heading)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const metrics = entries => `<div class="s2-lab-metrics">${Object.entries(entries).map(([label, value]) => `<span>${esc(label)}<b>${esc(value)}</b></span>`).join('')}</div>`;
  const path = f => `<ol class="s2-signal-path" aria-label="Devices and connections in the example">${f.nodes.map((node, index) => `<li class="${f.active?.includes(index) ? 'is-active' : ''} ${f.failed === index ? 'is-failed' : ''}"><span>${esc(node)}</span>${f.failed === index ? '<small>Unavailable</small>' : ''}</li>`).join('')}</ol>`;
  function settings(lab) {
    const config = JSON.parse(lab.dataset.s2Config || '{}');
    for (const field of lab.querySelectorAll('input[data-s2-role],select[data-s2-role]')) {
      const role = field.dataset.s2Role;
      if (field.type === 'number') {
        if (field.value.trim() === '' || !Number.isFinite(Number(field.value))) throw new RangeError('Complete every numeric condition.');
        config[role] = Number(field.value);
      } else config[role] = role === 'prefix' ? Number(field.value) : field.value;
    }
    return config;
  }
  function options(lab) {
    const value = role => get(lab, role)?.value;
    for (const element of lab.querySelectorAll('[data-s2-option]')) element.hidden = element.dataset.s2Option === 'shared' ? value('mode') !== 'shared' : value('mode') !== 'shared' || value('timing') !== 'together';
    if (lab.dataset.s2Lab === 'topology') {
      const select = get(lab, 'failure');
      select.querySelector('[value="link-ac"]').textContent = value('shape') === 'star' ? 'Link C–S' : 'Link A–C';
      select.querySelector('[value="link-ab"]').textContent = value('shape') === 'star' ? 'Link B–S' : 'Link A–B';
    }
  }
  function prepare(lab) {
    const config = settings(lab), id = lab.dataset.s2Lab;
    const data = id === 'topology' ? M.topologyModel(config) : null;
    const trace = data ? data.trace : M[`${id}Trace`](config);
    sessions.set(lab, { config, data, trace, index: 0, revealed: false, dirty: false });
    options(lab); draw(lab);
  }
  function topology(data, f) {
    const positions = data.shape === 'star' ? { A: [90, 150], B: [570, 65], C: [570, 240], S: [320, 150] } : { A: [100, 75], B: [540, 75], C: [320, 235] };
    const broken = f.phase === 'inspect' ? [] : data.broken;
    const contains = (list, edge) => list.some(pair => pair.every(node => edge.includes(node)));
    const route = (f.path || []).slice(1).map((node, index) => [f.path[index], node]);
    return `<svg viewBox="0 0 660 300" role="img" aria-label="${esc(data.shape)} network. ${esc(f.phase === 'inspect' ? 'All original links shown.' : f.path?.length ? `Working path ${f.path.join(' to ')}.` : `${broken.length} failed links, shown dashed.`)}">${data.edges.map(edge => { const bad = contains(broken, edge), active = contains(route, edge); const [a, b] = edge.map(node => positions[node]); return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${bad ? '#ac3426' : active ? '#176445' : '#698095'}" stroke-width="${active ? 8 : 5}" ${bad ? 'stroke-dasharray="10 7"' : ''}/>${bad ? `<text x="${(a[0] + b[0]) / 2}" y="${(a[1] + b[1]) / 2 - 12}" text-anchor="middle" fill="#9c281e" font-size="20">failed</text>` : ''}`; }).join('')}${data.nodes.map(node => { const [x, y] = positions[node]; return `<circle cx="${x}" cy="${y}" r="31" fill="${f.path?.includes(node) ? '#e1f3e9' : '#f3f7fb'}" stroke="#274a67" stroke-width="3"/><text x="${x}" y="${y + 8}" text-anchor="middle" font-size="25" fill="#18334b">${node}</text>`; }).join('')}</svg><p class="s2-legend">Solid: available · dashed + “failed”: unavailable · thick green: chosen path</p>`;
  }
  function dnsDiagram(f) {
    const positions = [[105, 155], [365, 50], [365, 240], [615, 240]], edges = [[0, 1], [0, 2], [2, 3]];
    const names = [['Browser'], ['DNS', 'resolver'], ['Router'], ['Web', 'server']];
    return `<svg viewBox="0 0 725 315" role="img" aria-label="DNS lookup is a separate branch from web delivery. The browser asks a DNS resolver for an address; the web request travels through the router to the web server.">${edges.map(([a, b]) => { const active = f.active?.includes(a) && f.active?.includes(b); return `<line x1="${positions[a][0]}" y1="${positions[a][1]}" x2="${positions[b][0]}" y2="${positions[b][1]}" stroke="${active ? '#176445' : '#7b92a5'}" stroke-width="${active ? 7 : 3}"/>`; }).join('')}${positions.map(([x, y], index) => `<rect x="${x - 77}" y="${y - 37}" width="154" height="74" rx="10" fill="${f.failed === index ? '#fff0ed' : f.active?.includes(index) ? '#e1f3e9' : '#f3f7fb'}" stroke="${f.failed === index ? '#a93626' : '#274a67'}" stroke-width="3" ${f.failed === index ? 'stroke-dasharray="7 5"' : ''}/><text x="${x}" y="${y - (names[index].length - 1) * 12 + 7}" text-anchor="middle" font-size="23" fill="#18334b">${names[index].map((name, part) => `<tspan x="${x}" dy="${part ? 25 : 0}">${name}</tspan>`).join('')}</text>${f.failed === index ? `<text x="${x}" y="${y + 60}" text-anchor="middle" font-size="18" fill="#93271d">Unavailable</text>` : ''}`).join('')}<text x="515" y="55" font-size="19" fill="#38536a">Name → address</text><text x="465" y="170" text-anchor="middle" font-size="19" fill="#38536a">Web request / response</text></svg><p class="s2-legend">Separate logical jobs are shown. The webpage does not pass through the DNS resolver.</p>`;
  }
  function display(lab, s, f) {
    const id = lab.dataset.s2Lab;
    if (id === 'topology') return topology(s.data, f);
    if (id === 'streaming') {
      const max = Math.max(24, ...s.trace.map(item => item.buffer)), lastIndex = s.revealed ? s.index : Math.max(0, s.index - 1);
      return metrics({ 'Source': s.config.kind === 'live' ? 'Live' : 'On demand', 'Delivery / playback': `${s.config.download} / ${s.config.playback} Mbit/s`, 'Threshold': `${s.config.threshold} Mbit`, 'State': f.state }) + `<div class="s2-buffer-wrap"><div class="s2-buffer" role="meter" aria-label="Buffered data" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${f.buffer}" aria-valuetext="${f.buffer} Mbit"><span style="width:${f.buffer / max * 100}%"></span><i style="left:${s.config.threshold / max * 100}%" aria-hidden="true"></i></div><p>Buffer: <strong>${f.buffer} Mbit</strong> · vertical marker: start / restart threshold${f.delay === null || f.delay === undefined ? '' : ` · playback is ${fmt(f.delay)} s behind the live source`}</p></div>` + table(['Time', 'Before', 'Received', 'Played', 'After'], s.trace.slice(Math.max(0, lastIndex - 3), lastIndex + 1).map(item => [item.second === 0 ? 'Start' : `${item.second} s`, item.before ?? item.buffer, item.arrived, item.used, `${item.buffer} Mbit`]));
    }
    if (id === 'addressing') {
      let html = '';
      if (f.bits) html += `<div class="s2-address-bits" aria-label="32 address bits${f.prefix && f.prefix < 32 ? `; ${f.prefix} network bits highlighted` : ''}">${[...f.bits].map((bit, index) => `<span class="${!f.prefix || f.prefix === 32 ? 'is-bit' : index < f.prefix ? 'is-network' : 'is-host'}">${bit}</span>`).join('')}</div>${f.prefix && f.prefix < 32 ? `<p class="s2-legend">Blue: ${f.prefix} network bits · gold: ${32 - f.prefix} host bits</p>` : ''}`;
      if (f.groups) html += `<div class="s2-ipv6-groups">${f.groups.map(group => `<code>${group}</code>`).join('<span>:</span>')}</div>`;
      if (f.rows) html += table(['Property', 'Value'], f.rows);
      return html || metrics({ Address: s.config.address, 'Chosen assignment': s.config.assignment });
    }
    let html = id === 'dns' ? dnsDiagram(f) : f.nodes ? path(f) : '';
    if (f.fields) html += `<div class="s2-frame-fields">${f.fields.map(field => `<span>${esc(field)}</span>`).join('')}</div>`;
    if (f.slots) html += metrics({ 'A waits': `${f.slots[0]} slots`, 'B waits': `${f.slots[1]} slots` });
    if (f.collision !== undefined) html += `<p class="s2-outcome ${f.collision ? 'is-failed' : 'is-success'}">${f.collision ? f.jam ? 'Collision detected → jam → stop' : 'Overlapping transmissions: collision' : 'No shared-medium collision in this step'}</p>`;
    return html;
  }
  function draw(lab) {
    const s = sessions.get(lab);
    if (!s) return;
    const next = lab.querySelector('[data-s2-action="next"]'), previous = lab.querySelector('[data-s2-action="previous"]'), reveal = lab.querySelector('[data-s2-action="reveal"]');
    next.disabled = s.dirty || !s.revealed || s.index >= s.trace.length - 1;
    previous.disabled = s.dirty || s.index === 0;
    reveal.disabled = s.dirty || s.revealed;
    const frame = s.trace[s.index], visible = s.trace[s.revealed ? s.index : Math.max(0, s.index - 1)];
    get(lab, 'display').innerHTML = display(lab, s, visible);
    get(lab, 'progress').textContent = s.dirty ? 'Conditions edited · apply them to start a new prediction.' : `Step ${s.index + 1} of ${s.trace.length} · ${s.revealed ? 'revealed' : 'predict before revealing'}`;
    get(lab, 'line').textContent = s.dirty ? 'Apply the changed conditions' : s.revealed ? `${frame.title}: ${frame.line}` : `${frame.title} · what do you expect?`;
    const status = get(lab, 'status');
    status.dataset.rejected = 'false';
    status.textContent = s.dirty ? 'The picture still uses the previous conditions. Apply changes before continuing.' : s.revealed ? frame.why : s.index === 0 ? 'Inspect the starting arrangement. Make a prediction, then reveal this step.' : 'The display keeps the last revealed state. Predict what will happen next.';
  }
  function reset(lab) { lab.innerHTML = originals.get(lab); prepare(lab); }
  function error(lab, failure) { const s = sessions.get(lab); if (s) { s.dirty = true; draw(lab); } const output = get(lab, 'status'); output.textContent = failure.message; output.dataset.rejected = 'true'; }
  function start() {
    const labs = [...document.querySelectorAll('.s2-lab[data-s2-lab]')];
    for (const lab of labs) { originals.set(lab, lab.innerHTML); try { prepare(lab); } catch (failure) { error(lab, failure); } }
    document.addEventListener('click', event => {
      const button = event.target.closest?.('.s2-lab [data-s2-action]');
      if (!button || button.disabled) return;
      const lab = button.closest('.s2-lab'), action = button.dataset.s2Action, s = sessions.get(lab);
      try {
        if (action === 'reset') { reset(lab); lab.querySelector('[data-s2-action="reset"]').focus({ preventScroll: true }); return; }
        if (action === 'prepare') { prepare(lab); lab.querySelector('.s2-lab-setup').open = false; lab.querySelector('[data-s2-action="reveal"]').focus({ preventScroll: true }); return; }
        if (!s || s.dirty) return;
        if (action === 'reveal') s.revealed = true;
        if (action === 'next' && s.revealed && s.index < s.trace.length - 1) { s.index++; s.revealed = false; }
        if (action === 'previous' && s.index > 0) { s.index--; s.revealed = true; }
        draw(lab);
      } catch (failure) { error(lab, failure); }
    });
    const dirty = event => {
      const lab = event.target.closest?.('.s2-lab');
      if (!lab || !event.target.matches('input,select')) return;
      options(lab);
      const s = sessions.get(lab);
      if (s) { s.dirty = true; draw(lab); }
    };
    document.addEventListener('input', dirty); document.addEventListener('change', dirty);
    for (const name of ['s2:reset', 's2:hide']) document.addEventListener(name, event => {
      for (const lab of labs.filter(item => event.target === document || event.target === item || event.target.contains?.(item))) {
        try { if (name === 's2:reset') reset(lab); else { const s = sessions.get(lab); if (s) { s.index = 0; s.revealed = false; draw(lab); } } } catch (failure) { error(lab, failure); }
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
