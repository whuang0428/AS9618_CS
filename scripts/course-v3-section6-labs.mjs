import models from './course-v3-section6-models.js';

const esc = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const option = (value, label, selected = false) => `<option value="${esc(value)}"${selected ? ' selected' : ''}>${esc(label)}</option>`;
const field = (name, title, control) => `<label class="s6-lab-field"><span>${title}</span>${control.replace('data-s6-field', `data-s6-field="${name}"`)}</label>`;
const input = (name, title, value, extra = '') => field(name, title, `<input data-s6-field value="${esc(value)}" ${extra}>`);
const select = (name, title, options) => field(name, title, `<select data-s6-field>${options.map(values => option(...values)).join('')}</select>`);
const checkbox = (name, title, checked = false) => `<label class="s6-lab-checkbox"><input type="checkbox" data-s6-field="${name}"${checked ? ' checked' : ''}><span>${title}</span></label>`;
const titles = {
  signature: 'Create and verify a digital signature', firewall: 'Trace a firewall decision',
  antivirus: 'Scan, detect and contain a virus', antispyware: 'Remove spyware and inspect the remaining disclosure',
  encryption: 'Transform and recover a message', parity: 'Build, transmit and check parity', checksum: 'Calculate and compare checksums',
};
const hints = {
  signature: 'Change the message in transit or select a different public key. Predict which comparison will fail.',
  firewall: 'Change the traffic and follow the first matching rule. Compare a host firewall with a network-boundary firewall.',
  antivirus: 'Compare an older detection database with an updated one, then choose quarantine or deletion.',
  antispyware: 'Watch the local installation and the third party’s copy separately. Removing one does not remove the other.',
  encryption: 'Edit the message and keys, then compare the sender’s plaintext with the recovered text.',
  parity: 'Choose byte or block parity, then introduce errors. At the transmission step, each received bit can also be toggled.',
  checksum: 'Change the bytes in transit. Compare an ordinary error with two changes that cancel in the sum.',
};

function controls(kind, variant, id) {
  if (kind === 'signature') return input('message','Original message','Deliver to room A','maxlength="120"') + checkbox('tamper','Replace the message during transmission',true) + input('altered','Replacement message','Deliver to room B','maxlength="120"') + select('publicKey','Public key used by the receiver',[['A','Sender public key A'],['B','Different public key B']]);
  if (kind === 'firewall') return select('placement','Firewall location',[['network','Network boundary'],['host','One host computer']]) + select('direction','Traffic direction',[['inbound','Inbound'],['outbound','Outbound']]) + input('port','Destination port','22','type="number" min="1" max="65535" step="1"') + select('target','Destination server',[['public','Public web server'],['staff','Staff server']]) + checkbox('established','Reply on an already permitted connection') + checkbox('bypass','Traffic path bypasses this firewall');
  if (kind === 'antivirus') return select('sample','Infected sample',[['known','V1 · signature in older database'],['recent','V2 · signature added by update',true],['unknown','V? · not in either database']]) + checkbox('updated','Update detection information before scanning',true) + select('response','After detection',[['quarantine','Retain in quarantine'],['delete','Quarantine, then delete']]);
  if (kind === 'antispyware') return checkbox('disclosed','Keystrokes were already sent to a third party',true) + checkbox('replacePassword','Replace the original password after removal');
  if (kind === 'encryption') return input('message','Plaintext message','Meet at 8','maxlength="120"') + input('key','Encryption key','13','type="number" min="1" max="255" step="1"') + input('decryptionKey','Decryption key','13','type="number" min="1" max="255" step="1"');
  if (kind === 'parity') return `<div class="s6-parity-modes" role="tablist" aria-label="Parity mode">${[['byte','Byte parity'],['block','Block parity']].map(([mode,label]) => `<button type="button" role="tab" id="${id}-${mode}-tab" data-s6-mode="${mode}" aria-controls="${id}-parity-panel" aria-selected="${mode === (variant === 'block' ? 'block' : 'byte')}" tabindex="${mode === (variant === 'block' ? 'block' : 'byte') ? 0 : -1}">${label}</button>`).join('')}</div><input type="hidden" data-s6-field="mode" value="${variant === 'block' ? 'block' : 'byte'}">` + select('convention','Agreed parity',[['even','Even'],['odd','Odd']]) + input('data','Seven data bits','1011001','inputmode="numeric" pattern="[01]{7}" maxlength="7"') + field('rows','Block: three rows of seven data bits','<textarea data-s6-field rows="3" spellcheck="false">1011001\n0110000\n1100011</textarea>') + select('preset','Transmission errors',[['none','No changed bits'],['single','One changed data bit',true],['double','Two changes in one byte'],['rectangle','Four corners in a block'],['custom','Custom: toggle received bits at step 3']]);
  if (kind === 'checksum') return input('original','Sender’s bytes','84, 121, 77','inputmode="text"') + select('scenario','Transmission case',[['unchanged','No changed bytes'],['single','Change one byte',true],['cancelling','Add 1 to one byte; subtract 1 from another'],['custom','Enter receiver’s bytes']]) + input('received','Receiver’s bytes for custom case','84, 120, 77','inputmode="text"');
  return '';
}

function staticDiagram(state) {
  let html = state.lanes.map(lane => `<section class="s6-lab-lane"><h5>${esc(lane.label)}</h5><div class="s6-lab-flow">${lane.items.map(item => `<div class="s6-lab-node${item.state ? ` s6-state-${item.state}` : ''}"><span>${esc(item.label)}</span><strong>${esc(item.value)}</strong></div>`).join('')}</div></section>`).join('');
  if (state.rules) html += `<div class="s6-lab-table-wrap"><table><caption>First matching rule wins</caption><thead><tr><th>Rule</th><th>Test</th><th>Action</th><th>This step</th></tr></thead><tbody>${state.rules.map(rule => `<tr><th>${rule.number}</th><td>${esc(rule.description)}</td><td>${rule.decision}</td><td>${rule.status}</td></tr>`).join('')}</tbody></table></div>`;
  if (state.grid) {
    const g = state.grid;
    html += `<div class="s6-lab-table-wrap"><table class="s6-bit-grid"><caption>${esc(g.convention)} parity · ${g.checking ? 'receiver counts' : 'data and checking bits'}</caption><thead><tr><th>Row</th>${[...g.rows[0]].map((_,i) => `<th>${i === 7 ? 'Parity' : i + 1}</th>`).join('')}${g.checking ? '<th>1 bits</th><th>Check</th>' : ''}</tr></thead><tbody>${g.rows.map((row,r) => `<tr><th>${r === 3 ? 'Parity byte' : `Data ${r + 1}`}</th>${[...row].map((bit,c) => `<td${r === 3 || c === 7 ? ' class="s6-checking-bit"' : ''}>${bit}</td>`).join('')}${g.checking ? `<td>${g.counts.rows[r]}</td><td>${g.failedRows.includes(r) ? 'FAIL' : 'PASS'}</td>` : ''}</tr>`).join('')}${g.checking && g.mode === 'block' ? `<tr><th>Column check</th>${g.counts.columns.map((count,c) => `<td>${count} ones<br>${g.failedColumns.includes(c) ? 'FAIL' : 'PASS'}</td>`).join('')}<td colspan="2"></td></tr>` : ''}</tbody></table></div>`;
  }
  return html;
}

export function renderSection6Lab(kind, { id, variant = '' } = {}) {
  if (!titles[kind]) throw new Error(`Unknown Section 6 lab: ${kind}`);
  if (!id || !/^[A-Za-z][A-Za-z0-9_-]*$/.test(id)) throw new Error('A Section 6 lab needs a unique, safe HTML id.');
  const defaults = kind === 'signature' ? { tamper: true } : kind === 'parity' ? { mode: variant === 'block' ? 'block' : 'byte' } : kind === 'antivirus' ? { updated: true } : {};
  const example = models[kind](defaults);
  const note = kind === 'signature' ? 'The digest values and key labels illustrate the encrypt, decrypt and compare process. This demonstration is not a cryptographic implementation.' : kind === 'encryption' ? 'A small XOR model makes the transformation visible. It is not a secure production cipher or a required exam calculation.' : '';
  return `<section class="s6-lab" id="${id}" data-s6-lab="${kind}" data-s6-variant="${esc(variant)}" aria-labelledby="${id}-title">
    <header class="s6-lab-header"><p class="s6-lab-eyebrow">Interactive walkthrough${variant === 'overview' ? ' · confidentiality overview' : ''}</p><h4 id="${id}-title">${titles[kind]}</h4><p>${hints[kind]}</p></header>
    <div class="s6-lab-live" hidden><div class="s6-lab-controls">${controls(kind,variant,id)}</div><p class="s6-lab-error" role="alert" hidden></p>
    <div class="s6-lab-stepbar"><span data-s6-progress></span><div class="s6-lab-actions"><button type="button" data-s6-action="previous">← Previous step</button><button type="button" data-s6-action="next">Next step →</button><button type="button" data-s6-action="reset">Reset</button></div></div>
    <div class="s6-lab-stage" data-s6-stage${kind === 'parity' ? ` id="${id}-parity-panel" role="tabpanel" aria-labelledby="${id}-${variant === 'block' ? 'block' : 'byte'}-tab"` : ''}></div><p class="s6-lab-result" data-s6-result role="status" aria-live="polite">Choose the inputs, predict the result, then step through the process.</p></div>
    <div class="s6-lab-fallback"><p>Complete worked walkthrough (also available when JavaScript is disabled).</p><ol>${example.frames.map(state => `<li><h5>${esc(state.title)}</h5><p>${esc(state.caption)}</p>${staticDiagram(state)}${state.conclusion ? `<p><strong>${esc(state.conclusion)}</strong></p>` : ''}</li>`).join('')}</ol></div>
${note ? `    <p class="s6-lab-model-note">${note}</p>` : ''}
  </section>`;
}
