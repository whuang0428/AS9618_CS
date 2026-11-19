/* One state per lab instance; reading-mode changes keep the existing DOM. */
(() => {
  'use strict';
  if (typeof section6Models === 'undefined') return;
  const M = section6Models, states = new WeakMap();
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const field = (lab, name) => lab.querySelector(`[data-s6-field="${name}"]`);
  const value = (lab, name) => field(lab,name).value;
  const checked = (lab, name) => field(lab,name).checked;
  function inputs(lab, state) {
    switch (lab.dataset.s6Lab) {
      case 'signature': return {message:value(lab,'message'), altered:value(lab,'altered'), tamper:checked(lab,'tamper'), publicKey:value(lab,'publicKey')};
      case 'firewall': return {direction:value(lab,'direction'), port:value(lab,'port'), target:value(lab,'target'), placement:value(lab,'placement'), established:checked(lab,'established'), bypass:checked(lab,'bypass')};
      case 'antivirus': return {sample:value(lab,'sample'), updated:checked(lab,'updated'), response:value(lab,'response')};
      case 'antispyware': return {disclosed:checked(lab,'disclosed'), replacePassword:checked(lab,'replacePassword')};
      case 'encryption': return {message:value(lab,'message'), key:value(lab,'key'), decryptionKey:value(lab,'decryptionKey')};
      case 'parity': {
        const mode = value(lab,'mode'), preset = value(lab,'preset');
        let flips = preset === 'custom' ? state.flips : preset === 'none' ? [] : preset === 'single' ? [{row:0,column:3}] : preset === 'double' ? [{row:0,column:2},{row:0,column:3}] : [{row:0,column:0},{row:0,column:1},{row:1,column:0},{row:1,column:1}];
        if (mode === 'byte') flips = flips.filter(flip => flip.row === 0);
        state.flips = flips;
        return {mode, convention:value(lab,'convention'), data:value(lab,'data'), rows:value(lab,'rows').trim().split(/\s+/), flips};
      }
      case 'checksum': return {original:value(lab,'original'), received:value(lab,'received'), scenario:value(lab,'scenario')};
    }
  }
  function controlsState(lab) {
    if (lab.dataset.s6Lab === 'parity') {
      const block = value(lab,'mode') === 'block';
      field(lab,'data').closest('label').hidden = block;
      field(lab,'rows').closest('label').hidden = !block;
      field(lab,'preset').querySelector('[value="rectangle"]').disabled = !block;
      if (!block && value(lab,'preset') === 'rectangle') field(lab,'preset').value = 'double';
      lab.querySelectorAll('[data-s6-mode]').forEach(button => {
        const selected = button.dataset.s6Mode === value(lab,'mode');
        button.setAttribute('aria-selected',String(selected)); button.tabIndex = selected ? 0 : -1;
        if (selected) lab.querySelector('[data-s6-stage]').setAttribute('aria-labelledby',button.id);
      });
    }
    if (lab.dataset.s6Lab === 'signature') field(lab,'altered').disabled = !checked(lab,'tamper');
    if (lab.dataset.s6Lab === 'checksum') field(lab,'received').disabled = value(lab,'scenario') !== 'custom';
  }
  function diagram(lab, state) {
    let html = state.lanes.map(lane => `<section class="s6-lab-lane"><h6>${esc(lane.label)}</h6><div class="s6-lab-flow">${lane.items.map(item => `<div class="s6-lab-node${item.state ? ` s6-state-${item.state}` : ''}"><span>${esc(item.label)}</span><strong>${esc(item.value)}</strong></div>`).join('')}</div></section>`).join('');
    if (state.rules) html += `<div class="s6-lab-table-wrap" tabindex="0" role="region" aria-label="Firewall rules"><table><caption>Read in order: stop at the first match</caption><thead><tr><th>Rule</th><th>Test</th><th>Action</th><th>This step</th></tr></thead><tbody>${state.rules.map(rule => `<tr${rule.status === 'MATCH' ? ' class="s6-rule-match"' : ''}><th>${rule.number}</th><td>${esc(rule.description)}</td><td>${rule.decision}</td><td>${rule.status}</td></tr>`).join('')}</tbody></table></div>`;
    if (state.grid) {
      const g = state.grid;
      html += `<div class="s6-lab-table-wrap" tabindex="0" role="region" aria-label="Parity bit grid"><table class="s6-bit-grid"><caption>${esc(g.convention)} parity · ${g.editable ? 'received bits: select a bit to flip it' : g.checking ? 'receiver counts' : 'sender data'}</caption><thead><tr><th>Row</th>${[...g.rows[0]].map((_,c) => `<th>${c === 7 ? 'Parity' : c + 1}</th>`).join('')}${g.checking ? '<th>1 bits</th><th>Check</th>' : ''}</tr></thead><tbody>${g.rows.map((row,r) => `<tr><th>${r === 3 ? 'Parity byte' : `Data ${r + 1}`}</th>${[...row].map((bit,c) => {
        const changed = g.changed.some(flip => flip.row === r && flip.column === c);
        const classes = [r === 3 || c === 7 ? 's6-checking-bit' : '', g.checking && (g.failedRows.includes(r) || g.failedColumns.includes(c)) ? 's6-bit-fail' : ''].filter(Boolean).join(' ');
        return `<td class="${classes}">${g.editable ? `<button type="button" data-s6-bit="${r}:${c}" aria-label="Row ${r+1}, column ${c+1}: ${bit}${changed ? ', changed in transit' : ''}. Flip this bit." aria-pressed="${changed}">${bit}${changed ? '<span class="s6-bit-mark" aria-hidden="true">*</span>' : ''}</button>` : bit}</td>`;
      }).join('')}${g.checking ? `<td>${g.counts.rows[r]}</td><td class="${g.failedRows.includes(r) ? 's6-result-fail' : 's6-result-pass'}">${g.failedRows.includes(r) ? 'FAIL' : 'PASS'}</td>` : ''}</tr>`).join('')}${g.checking && g.mode === 'block' ? `<tr><th>Column check</th>${g.counts.columns.map((count,c) => `<td class="${g.failedColumns.includes(c) ? 's6-result-fail' : 's6-result-pass'}">${count} ones<br>${g.failedColumns.includes(c) ? 'FAIL' : 'PASS'}</td>`).join('')}<td colspan="2"></td></tr>` : ''}</tbody></table></div>${g.editable ? '<p class="s6-lab-small">* Changed during transmission. Blue cells contain the checking bits sent by the sender.</p>' : ''}`;
    }
    return html;
  }
  function draw(lab, announcement = '') {
    const state = states.get(lab), prev = lab.querySelector('[data-s6-action="previous"]'), next = lab.querySelector('[data-s6-action="next"]');
    if (!state.model) { prev.disabled = next.disabled = true; return; }
    const f = state.model.frames[state.index];
    lab.querySelector('[data-s6-progress]').textContent = `Step ${state.index + 1} / ${state.model.frames.length}`;
    lab.querySelector('[data-s6-stage]').innerHTML = `<h5>${esc(f.title)}</h5><p class="s6-lab-explanation">${esc(f.caption)}</p>${diagram(lab,f)}`;
    lab.querySelector('[data-s6-result]').textContent = announcement || f.conclusion || 'Predict the next state, then select Next step.';
    prev.disabled = state.index === 0; next.disabled = state.index === state.model.frames.length - 1;
  }
  function rebuild(lab, index = 0, announcement = '') {
    const state = states.get(lab), error = lab.querySelector('.s6-lab-error');
    controlsState(lab);
    try {
      state.model = M[lab.dataset.s6Lab](inputs(lab,state)); state.index = Math.min(index,state.model.frames.length-1);
      error.hidden = true; error.textContent = ''; draw(lab,announcement);
    } catch (problem) {
      state.model = null; state.index = 0;
      error.textContent = problem.message; error.hidden = false;
      lab.querySelector('[data-s6-stage]').replaceChildren();
      lab.querySelector('[data-s6-progress]').textContent = 'Inputs need attention';
      lab.querySelector('[data-s6-result]').textContent = 'Previous results cleared. Correct the inputs to start a new walkthrough.';
      draw(lab);
    }
  }
  function init(lab) {
    if (states.has(lab)) return;
    const defaults = [...lab.querySelectorAll('[data-s6-field]')].map(el => ({name:el.dataset.s6Field,value:el.value,checked:el.checked}));
    states.set(lab,{index:0,model:null,flips:[],defaults});
    lab.classList.add('s6-lab-enhanced'); lab.querySelector('.s6-lab-live').hidden = false;
    rebuild(lab);
    lab.addEventListener('input',event => {
      if (event.target.matches('[data-s6-field]')) rebuild(lab,0,'Inputs changed. Previous conclusions cleared; predict the new result and begin again.');
    });
    lab.addEventListener('change',event => {
      if (event.target.matches('select[data-s6-field],input[type="checkbox"][data-s6-field]')) rebuild(lab,0,'Inputs changed. Previous conclusions cleared; predict the new result and begin again.');
    });
    lab.addEventListener('keydown',event => {
      const tab = event.target.closest('[data-s6-mode]');
      if (!tab || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const mode = event.key === 'Home' ? 'byte' : event.key === 'End' ? 'block' : value(lab,'mode') === 'byte' ? 'block' : 'byte';
      field(lab,'mode').value = mode;
      rebuild(lab,0,'Parity mode changed. Previous conclusions cleared.');
      lab.querySelector(`[data-s6-mode="${mode}"]`).focus();
    });
    lab.addEventListener('click',event => {
      const tab = event.target.closest('[data-s6-mode]'), bit = event.target.closest('[data-s6-bit]'), button = event.target.closest('[data-s6-action]'), state = states.get(lab);
      if (tab) {
        field(lab,'mode').value = tab.dataset.s6Mode; rebuild(lab,0,'Parity mode changed. Previous conclusions cleared.');
      } else if (bit) {
        const [row,column] = bit.dataset.s6Bit.split(':').map(Number), at = state.flips.findIndex(flip => flip.row === row && flip.column === column);
        if (at < 0) state.flips.push({row,column}); else state.flips.splice(at,1);
        field(lab,'preset').value = 'custom';
        rebuild(lab,2,'Transmission changed. Earlier checking results cleared; select Next step to recount.');
        lab.querySelector(`[data-s6-bit="${row}:${column}"]`)?.focus({preventScroll:true});
      } else if (button) {
        const action = button.dataset.s6Action;
        if (action === 'reset') {
          for (const saved of state.defaults) { const el = field(lab,saved.name); el.value = saved.value; if (el.type === 'checkbox') el.checked = saved.checked; }
          state.flips = []; rebuild(lab,0,'Experiment reset to its original inputs.');
        } else if (state.model) {
          state.index = Math.max(0,Math.min(state.model.frames.length-1,state.index+(action === 'next' ? 1 : -1))); draw(lab);
        }
      }
    });
  }
  document.querySelectorAll('[data-s6-lab]').forEach(init);
})();
