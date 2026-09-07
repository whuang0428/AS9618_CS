import { section12Structures, section12States } from './course-v3-section12-programs.mjs';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const shell=(title,body,height=640)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" role="img" aria-label="${esc(title)}"><defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="none" stroke="#16747b" stroke-width="1.5"/></marker></defs><rect width="1200" height="${height}" fill="#f7fafc"/><style>text{font-family:Arial,sans-serif;fill:#153451}.title{font-size:30px;font-weight:700}.label{font-size:22px}.small{font-size:18px}.call{fill:none;stroke:#53667b;stroke-width:3}.data{fill:none;stroke:#16747b;stroke-width:3;marker-end:url(#arrow)}</style><text x="40" y="55" class="title">${esc(title)}</text>${body}</svg>`;
const box=(x,y,w,label)=>`<rect x="${x}" y="${y}" width="${w}" height="70" rx="5" fill="#e9f2f7" stroke="#153451" stroke-width="2"/><text x="${x+w/2}" y="${y+43}" text-anchor="middle" class="label">${esc(label)}</text>`;
function chart(key){
 const s=section12Structures[key], names=s.inputs.map(([n])=>n), result=s.result[0];
 return shell(`${s.main}: module hierarchy and data interfaces`,[
  '<text x="40" y="90" class="small">Each child is called by the controlling module. Read left to right for this sequence.</text>',
  box(430,125,340,s.main),
  '<path class="call" d="M600 195 V250 M190 250 H1010 M190 250 V370 M600 250 V370 M1010 250 V370"/>',
  box(35,370,310,s.reader),box(440,370,320,s.calculate),box(855,370,310,s.writer),
  '<path class="data" d="M315 350 V270"/><circle cx="315" cy="350" r="6" fill="white" stroke="#16747b" stroke-width="2"/>',
  `<text x="40" y="290" class="small">${esc(names[0])}</text><text x="40" y="317" class="small">${esc(names[1])}</text>`,
  '<path class="data" d="M475 272 V349"/><circle cx="475" cy="272" r="6" fill="white" stroke="#16747b" stroke-width="2"/>',
  `<text x="490" y="296" class="small">${esc(names[0])}</text><text x="490" y="323" class="small">${esc(names[1])}</text>`,
  '<path class="data" d="M730 350 V272"/><circle cx="730" cy="350" r="6" fill="white" stroke="#16747b" stroke-width="2"/>',
  `<text x="650" y="295" class="small">${esc(result)}</text>`,
  '<path class="data" d="M1140 272 V350"/><circle cx="1140" cy="272" r="6" fill="white" stroke="#16747b" stroke-width="2"/>',
  `<text x="1040" y="309" class="small">${esc(result)}</text>`,
  '<text x="45" y="480" class="small">Procedure: fills caller variables</text><text x="460" y="480" class="small">Function: returns one result</text><text x="875" y="480" class="small">Procedure: displays the result</text>',
  '<text x="40" y="550" class="small">Grey lines: module calls. Teal arrows with open circles: direction of data transfer.</text>',
  '<text x="40" y="582" class="small">The calculation result returns to the parent before it is passed to the display procedure.</text>',
 ].join(''));
}
function stateDiagram(){return shell('Turnstile states and the events that change them',[
 '<text x="40" y="95" class="small">Initial state: Locked. Only the four transitions drawn here belong to this model.</text>',
 '<circle cx="80" cy="310" r="10" fill="#153451"/><path class="data" d="M95 310 H200"/>',
 '<circle cx="310" cy="310" r="100" fill="#e5f3f1" stroke="#16747b" stroke-width="3"/><text x="310" y="318" text-anchor="middle" class="label">Locked</text>',
 '<circle cx="865" cy="310" r="100" fill="#e9f2f7" stroke="#153451" stroke-width="3"/><text x="865" y="318" text-anchor="middle" class="label">Unlocked</text>',
 '<path class="data" d="M405 275 H763"/><text x="585" y="253" text-anchor="middle" class="label">coin</text>',
 '<path class="data" d="M768 355 H410"/><text x="585" y="391" text-anchor="middle" class="label">pass</text>',
 '<path class="data" d="M250 230 C160 90 460 90 371 230"/><text x="310" y="180" text-anchor="middle" class="label">push</text>',
 '<path class="data" d="M806 391 C705 553 1022 553 924 391"/><text x="865" y="550" text-anchor="middle" class="label">coin</text>',
 '<text x="40" y="595" class="small">A loop returns to the same state. An event label does not name a processing module.</text>',
].join(''));}
export const diagramPath12=key=>`/assets/course-v3/section-12/${key}.svg`;
export const structureVisual=key=>({type:'reviewed-visual',asset:diagramPath12(key),title:`${section12Structures[key].main}: calls and data`,alt:`${section12Structures[key].main} calls ${section12Structures[key].reader}, ${section12Structures[key].calculate} and ${section12Structures[key].writer}. Arrows show the inputs returned by the reader, supplied to the function, and the function result passed to the display procedure.`,facts:[`The parent ${section12Structures[key].main} calls three separate modules.`,`${section12Structures[key].reader} supplies ${section12Structures[key].inputs.map(x=>x[0]).join(' and ')} by reference.`,`${section12Structures[key].calculate} returns ${section12Structures[key].result[0]}; the parent passes this result to ${section12Structures[key].writer}.`],caption:'Follow one labelled value from its source to its destination, then identify the matching formal parameter or returned result in the pseudocode.',review:'reviewed'});
export const stateVisual12={type:'reviewed-visual',asset:diagramPath12('turnstile'),title:'A turnstile has two persistent states',alt:'Locked is the initial state. A coin changes Locked to Unlocked. Passing changes Unlocked to Locked. Pushing while Locked and inserting another coin while Unlocked leave the state unchanged.',facts:section12States.transitions.map(t=>`${t.from} + ${t.event} → ${t.to}.`),caption:'Trace events in order from Locked. A self-loop consumes the event while preserving the current state.',review:'reviewed'};
export const section12DiagramFiles=()=>({...Object.fromEntries(Object.keys(section12Structures).map(key=>[`${key}.svg`,chart(key)])),'turnstile.svg':stateDiagram()});
