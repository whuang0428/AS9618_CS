// Reproducible teaching diagrams with explicit state and flow descriptions.
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
const visual = (name, title, facts, height) => ({
  type:"reviewed-visual", title, asset:`/assets/course-v3/section-11/${name}.svg`,
  alt:facts.join(" "), facts, width:1040, height, caption:title, layout:"mechanism",
});
export const section11Visuals = {
  warning:visual("warning-stream", "Count temperatures above 30 until the sentinel 999", [
    "Initialise Count to 0, then read Temperature before testing it.",
    "Temperature 999 leads directly to the final count output and End.",
    "Otherwise test Temperature > 30: TRUE increments Count; FALSE leaves it unchanged.",
    "Both data paths read the next Temperature before returning to the sentinel test.",
  ],1040),
  strings:visual("string-positions", "Positions, counts and concatenation preserve the characters", [
    "CS2046AB has eight characters numbered 1 to 8.",
    "MID(Code, 3, 4) selects positions 3 through 6, giving the STRING 2046.",
    "RIGHT(Code, 2) selects AB. Joining 2046, a hyphen and AB gives 2046-AB.",
  ],480),
  selection:visual("selection-paths", "Independent decisions and exclusive alternatives follow different paths", [
    "Both programs receive Mark 85.",
    "The independent IF tests Mark >= 50 and Mark >= 80 are both true: Pass and Distinction are both output.",
    "The exclusive version tests Mark >= 80 first. TRUE outputs Distinction and skips ELSE, giving one classification.",
  ],560),
  nested:visual("nested-order", "The inner loop restarts for each outer value", [
    "Row ranges from 1 to 2. For each Row, Column ranges from 1 to 3.",
    "The output order is (1,1), (1,2), (1,3), (2,1), (2,2), (2,3).",
    "After (1,3), Row advances and Column restarts at 1. There are six body executions.",
  ],410),
  returns:visual("early-return", "RETURN completes this function call immediately", [
    "DeliveryFee accepts a non-negative INTEGER Quantity and returns REAL.",
    "Quantity 0 reaches RETURN 0.0 and skips the later calculation.",
    "Quantity 4 reaches RETURN 2.0 + 4 * 0.5, returning 4.0.",
    "The returned value replaces DeliveryFee(Quantity) and is assigned to caller variable Fee.",
  ],580),
  interfaces:visual("marks-interfaces", "A Boolean result controls acceptance; reference parameters update totals", [
    "Main sends the input Mark to ValidMark, which returns a BOOLEAN to UNTIL.",
    "FALSE retries within the same slot; TRUE permits one RecordMark call.",
    "RecordMark reads Mark by value and updates caller Total and Passed through reference parameters.",
    "Reference updates are not a function return. After three accepted marks, main outputs the mean and pass count.",
  ],630),
};
const text=(x,y,value,size=24)=>`<text x="${x}" y="${y}" style="font-size:${size}px">${esc(value)}</text>`;
const box=(x,y,w,h,lines,fill="#eff7f6")=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="#176a70" stroke-width="2"/>${lines.map((line,i)=>text(x+18,y+33+i*31,line)).join("")}`;
const arrow=d=>`<path d="${d}" fill="none" stroke="#176a70" stroke-width="3" marker-end="url(#arrow)"/>`;
function frame(v,body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="${v.height}" viewBox="0 0 1040 ${v.height}" role="img" aria-labelledby="title desc"><title id="title">${esc(v.title)}</title><desc id="desc">${esc(v.alt)}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#176a70"/></marker></defs><style>svg{background:#fff}text{font-family:ui-monospace,monospace;fill:#10283e}</style>${body}</svg>\n`;
}
function additionalDiagrams() {
  const v=section11Visuals;
  const strings=text(32,42,'Code = "CS2046AB"; positions start at 1')+
    [..."CS2046AB"].map((c,i)=>text(103+i*112,95,String(i+1),22)+box(70+i*112,112,90,60,[c],i>=2&&i<=5?"#d7efe9":"#f1f5fa")).join("")+
    text(34,224,'MID(Code, 3, 4) = "2046"')+text(550,224,'RIGHT(Code, 2) = "AB"')+
    arrow("M260 240V280")+arrow("M750 240V280")+box(34,294,970,62,['Label <- Digits & "-" & Suffix'])+
    arrow("M510 356V394")+text(365,435,'OUTPUT "2046-AB"');
  const selection=text(34,42,"Same input: Mark = 85")+text(34,96,"Two independent IF statements")+text(548,96,"One IF / ELSE structure")+
    box(34,120,455,88,['Mark >= 50 is TRUE','OUTPUT "Pass"'])+arrow("M262 208V250")+
    box(34,262,455,88,['Mark >= 80 is TRUE','OUTPUT "Distinction"'])+arrow("M262 350V409")+
    box(34,421,455,88,["Observed output:","Pass, then Distinction"])+
    box(548,120,456,88,['Mark >= 80 is TRUE','OUTPUT "Distinction"'])+arrow("M958 208V409")+
    text(592,279,"ELSE is skipped",22)+text(592,313,"No second classification",22)+box(548,421,456,88,["Observed output:","Distinction"]);
  const nested=text(34,42,"Row runs 1 to 2; each Column loop runs 1 to 3")+
    [0,1].map(r=>[0,1,2].map(c=>box(180+c*267,85+r*130,220,75,[`${r*3+c+1}. (${r+1}, ${c+1})`])).join("")).join("")+
    arrow("M400 121H443")+arrow("M667 121H710")+arrow("M934 160V187H140V252H178")+arrow("M400 251H443")+arrow("M667 251H710")+
    text(34,348,"After (1,3): Row becomes 2; the inner loop starts at Column 1.",22)+text(34,384,"2 rows × 3 columns = 6 body executions",22);
  const returns=text(34,42,"DeliveryFee(Quantity): trace two separate calls")+
    box(34,80,455,95,["Quantity = 0","Zero test is TRUE"])+box(548,80,456,95,["Quantity = 4","Zero test is FALSE"])+arrow("M260 175V210")+arrow("M775 175V210")+
    box(34,223,455,95,["RETURN 0.0","Later RETURN is skipped"])+box(548,223,456,95,["RETURN 2.0 + 4 * 0.5","Return 4.0"])+arrow("M260 318V368")+arrow("M775 318V368")+
    box(34,382,455,95,["Caller: Fee <- 0.0","OUTPUT Fee gives 0.0"])+box(548,382,456,95,["Caller: Fee <- 4.0","OUTPUT Fee gives 4.0"])+text(34,537,"Only one RETURN executes in each call; then the caller resumes.",22);
  const interfaces=text(34,42,"One accepted-mark slot: input, decide, then record")+
    box(34,80,280,95,["Main","INPUT Mark"])+box(600,80,400,95,["ValidMark(Mark)","returns BOOLEAN"])+
    arrow("M314 108H598")+text(355,97,"Mark value",21)+arrow("M600 155H316")+text(354,150,"TRUE / FALSE",21)+
    box(34,241,440,126,["UNTIL result:","FALSE: retry this slot","TRUE: call RecordMark"])+arrow("M170 175V239")+
    arrow("M474 310H598")+text(484,288,"TRUE",20)+box(600,241,400,126,["RecordMark","BYVAL Mark","BYREF Total, Passed"])+
    box(34,455,440,104,["Caller accumulators:","Total and Passed"])+arrow("M800 367V506H476")+text(553,442,"reference updates",21)+text(34,604,"After three accepted slots, main outputs Total / 3 and Passed.",22);
  const io=(x,y,w,label)=>`<polygon points="${x+20},${y} ${x+w},${y} ${x+w-20},${y+70} ${x},${y+70}" fill="#eff7f6" stroke="#176a70" stroke-width="2"/>${text(x+30,y+43,label,22)}`;
  const decision=(x,y,label)=>`<polygon points="${x+210},${y} ${x+420},${y+68} ${x+210},${y+136} ${x},${y+68}" fill="#eff7f6" stroke="#176a70" stroke-width="2"/>${text(x+50,y+75,label,22)}`;
  const terminal=(x,y,w,label)=>`<rect x="${x}" y="${y}" width="${w}" height="56" rx="28" fill="#eff7f6" stroke="#176a70" stroke-width="2"/>${text(x+30,y+36,label,22)}`;
  const warning=terminal(200,20,240,'Start')+box(170,111,360,64,['Count <- 0'])+io(170,218,360,'INPUT Temperature')+
    decision(140,334,'Temperature <> 999?')+decision(140,536,'Temperature > 30?')+
    box(170,738,360,64,['Count <- Count + 1'])+io(170,863,360,'INPUT Temperature')+
    io(670,355,320,'OUTPUT Count')+terminal(710,490,240,'End')+
    arrow('M350 76V110')+arrow('M350 175V217')+arrow('M350 288V333')+
    arrow('M350 470V535')+text(365,512,'TRUE',20)+arrow('M560 402H668')+text(581,385,'FALSE',20)+arrow('M830 425V489')+
    arrow('M350 672V737')+text(365,712,'TRUE',20)+arrow('M560 604H605V896H533')+text(578,589,'FALSE',20)+
    arrow('M350 802V862')+arrow('M350 927V977H75V402H138');
  return Object.fromEntries([[v.warning,warning],[v.strings,strings],[v.selection,selection],[v.nested,nested],[v.returns,returns],[v.interfaces,interfaces]].map(([meta,body])=>[meta.asset.split("/").at(-1),frame(meta,body)]));
}
export function section11DiagramFiles() {
  const shapes=countGraph.nodes.map(n=>{
    const {x,y,w,h}=n;
    const shape=n.kind==="decision"?`<polygon points="${x+w/2},${y} ${x+w},${y+h/2} ${x+w/2},${y+h} ${x},${y+h/2}"/>`:
      n.kind==="io"?`<polygon points="${x+20},${y} ${x+w},${y} ${x+w-20},${y+h} ${x},${y+h}"/>`:
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${n.kind==="terminal"?h/2:0}"/>`;
    return `<g data-node="${n.id}">${shape}<text x="${x+w/2}" y="${y+h/2+7}" text-anchor="middle">${esc(n.text)}</text></g>`;
  }).join("\n");
  const edges=countGraph.edges.map(([from,to,d,label,x,y])=>`<path data-from="${from}" data-to="${to}" d="${d}"/>${label?`<text class="edge-label" x="${x}" y="${y}">${label}</text>`:""}`).join("\n");
  return {...additionalDiagrams(),"count-positive.svg":`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1175" viewBox="0 0 960 940" role="img" aria-labelledby="title desc"><title id="title">Count positive values among three inputs</title><desc id="desc">${esc(countDiagram.alt)}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#176a70"/></marker></defs><style>svg{background:#fff}text{font:20px ui-monospace,monospace;fill:#10283e}g rect,g polygon{fill:#eff7f6;stroke:#176a70;stroke-width:2}path[data-from]{fill:none;stroke:#176a70;stroke-width:2.5;marker-end:url(#arrow)}.edge-label{font:700 19px sans-serif}</style>${edges}${shapes}<text x="480" y="930" text-anchor="middle" style="font:17px sans-serif">Both input branches advance Index; End has no outgoing path.</text></svg>\n`};
}
