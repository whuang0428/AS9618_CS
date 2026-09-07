// Exact program flowchart: the graph is also executed by the S11 verifier.
export const countGraph = {
  start:"start",
  nodes:[
    {id:"start",kind:"terminal",text:"Start",x:320,y:20,w:320,h:54,next:"init"},
    {id:"init",kind:"process",text:"Count <- 0; Index <- 1",x:320,y:112,w:320,h:64,next:"loop"},
    {id:"loop",kind:"decision",text:"Index <= 3?",condition:"Index <= 3",x:310,y:218,w:340,h:110,yes:"input",no:"output"},
    {id:"input",kind:"io",text:"INPUT Value",x:320,y:374,w:320,h:64,next:"positive"},
    {id:"positive",kind:"decision",text:"Value > 0?",condition:"Value > 0",x:310,y:484,w:340,h:110,yes:"count",no:"advance"},
    {id:"count",kind:"process",text:"Count <- Count + 1",x:320,y:640,w:320,h:64,next:"advance"},
    {id:"advance",kind:"process",text:"Index <- Index + 1",x:320,y:766,w:320,h:64,next:"loop"},
    {id:"output",kind:"io",text:"OUTPUT Count",x:690,y:350,w:240,h:64,next:"end"},
    {id:"end",kind:"terminal",text:"End",x:690,y:474,w:240,h:54},
  ],
  edges:[
    ["start","init","M480 74V112"], ["init","loop","M480 176V218"],
    ["loop","input","M480 328V374","Yes",506,354],
    ["loop","output","M650 273H810V350","No",717,258],
    ["input","positive","M480 438V484"],
    ["positive","count","M480 594V640","Yes",506,620],
    ["positive","advance","M310 539H210V798H320","No",234,524],
    ["count","advance","M480 704V766"],
    ["advance","loop","M480 830V885H90V273H310"],
    ["output","end","M810 414V474"],
  ],
};
export const countDiagram = {
  type:"reviewed-visual",title:"Flowchart: count positives in three inputs",asset:"/assets/course-v3/section-11/count-positive.svg",
  alt:"Count and Index are initialised. While Index is at most 3, read a value, increase Count only if the value is positive, then increase Index on both branches. On loop exit output Count and end.",
  facts:["Count starts at 0 and Index at 1.","Index <= 3 repeats the input path; its No branch reaches the final output.","Value > 0 increments Count only on Yes; both paths increment Index.","OUTPUT Count is followed by End, with no outgoing arrow from End."],
  width:1200,height:1175,caption:"The final count is output after all three inputs; every decision outcome has a defined next step.",
};
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
export function section11DiagramFiles() {
  const shapes=countGraph.nodes.map(n=>{
    const {x,y,w,h}=n;
    const shape=n.kind==="decision"?`<polygon points="${x+w/2},${y} ${x+w},${y+h/2} ${x+w/2},${y+h} ${x},${y+h/2}"/>`:
      n.kind==="io"?`<polygon points="${x+20},${y} ${x+w},${y} ${x+w-20},${y+h} ${x},${y+h}"/>`:
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${n.kind==="terminal"?h/2:0}"/>`;
    return `<g data-node="${n.id}">${shape}<text x="${x+w/2}" y="${y+h/2+7}" text-anchor="middle">${esc(n.text)}</text></g>`;
  }).join("\n");
  const edges=countGraph.edges.map(([from,to,d,label,x,y])=>`<path data-from="${from}" data-to="${to}" d="${d}"/>${label?`<text class="edge-label" x="${x}" y="${y}">${label}</text>`:""}`).join("\n");
  return {"count-positive.svg":`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1175" viewBox="0 0 960 940" role="img" aria-labelledby="title desc"><title id="title">Count positive values among three inputs</title><desc id="desc">${esc(countDiagram.alt)}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#176a70"/></marker></defs><style>svg{background:#fff}text{font:20px ui-monospace,monospace;fill:#10283e}g rect,g polygon{fill:#eff7f6;stroke:#176a70;stroke-width:2}path[data-from]{fill:none;stroke:#176a70;stroke-width:2.5;marker-end:url(#arrow)}.edge-label{font:700 19px sans-serif}</style>${edges}${shapes}<text x="480" y="930" text-anchor="middle" style="font:17px sans-serif">Both input branches advance Index; End has no outgoing path.</text></svg>\n`};
}
