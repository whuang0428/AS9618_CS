// Authored teaching HTML; official question extracts are rendered separately.
export const esc = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const ids = (r, ...ns) => ns.map(n => `S8.${String(r).padStart(2, '0')}.A${String(n).padStart(2, '0')}`);
export const material = (id, title, html, unitKeys, objectiveIds, aliases = []) => ({id, title, html, unitKeys, objectiveIds, aliases});
export const table = (title, headers, rows) => `<div class="s8-table-scroll" tabindex="0" role="region" aria-label="${esc(title)}"><table><caption>${esc(title)}</caption><thead><tr>${headers.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((v,i) => i ? `<td>${esc(v)}</td>` : `<th scope="row">${esc(v)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export const figure = (body, caption) => `<figure class="s8-visual">${body}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
export const panel = (title, body) => `<div class="s8-panel"><h4>${title}</h4>${body}</div>`;
export const pair = (...items) => `<div class="s8-pair">${items.join('')}</div>`;
export const flow = items => `<ol class="s8-flow">${items.map(([title,body]) => `<li><strong>${title}</strong><span>${body}</span></li>`).join('')}</ol>`;
export const note = (body, title='Further explanation') => `<aside class="s8-note"><h4>${title}</h4><p>${body}</p></aside>`;
export const check = (prompt,answer) => `<div class="s8-check"><p class="s8-kicker">Practice question · teacher-written</p><p>${prompt}</p><details class="s8-choice"><summary>Suggested answer</summary><p>${answer}</p></details></div>`;
export const code = sql => `<pre class="s8-code"><code>${esc(sql)}</code></pre>`;
export const workbench = (panelName,example='default',label='Open Library DBMS') => `<button type="button" class="s8-open-workbench" data-s8-open-dbms data-panel="${esc(panelName)}" data-example="${esc(example)}">${esc(label)}</button>`;
export const dependencies = (title, rows) => figure(`<div class="s8-dependencies" role="img" aria-label="${esc(title)}">${rows.map(([from,to,label]) => `<div><strong>${esc(from)}</strong><span aria-hidden="true"> → </span><strong>${esc(to)}</strong><p>${esc(label)}</p></div>`).join('')}</div>`, 'A → B denotes a functional dependency: each value of A determines a single value of B. A and B may each consist of one or more attributes.');
