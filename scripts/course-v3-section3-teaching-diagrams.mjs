import {logicCases} from './course-v3-section3-examples.mjs';

const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text = (x,y,s,size=24,anchor='middle') => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${esc(s)}</text>`;
const line = (x1,y1,x2,y2,arrow=true) => `<path class="wire" d="M${x1} ${y1} L${x2} ${y2}"${arrow?' marker-end="url(#arrow)"':''}/>`;
const box = (x,y,w,lines,h=105) => `<rect class="box" x="${x}" y="${y}" width="${w}" height="${h}" rx="9"/>${lines.map((s,i)=>text(x+w/2,y+36+i*29,s)).join('')}`;
const shell = (title,desc,body,w=1200,h=650) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title description"><title id="title">${esc(title)}</title><desc id="description">${esc(desc)}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#155e75"/></marker></defs><style>text{font-family:Arial,sans-serif;fill:#172f4e}.wire{stroke:#155e75;stroke-width:3;fill:none;stroke-linejoin:round}.box,.gate{fill:#eef7f7;stroke:#172f4e;stroke-width:2.5}.gate{stroke-width:3}.muted{fill:#f4f6f9;stroke:#7c8b9c;stroke-width:2}.accent{fill:#fff3d9;stroke:#9a5b0b;stroke-width:2}</style><rect width="100%" height="100%" fill="white"/>${text(w/2,47,title,30)}${body}</svg>`;
const pathFor = (gate,x,y) => {
  const base=gate==='NAND'?'AND':gate==='NOR'?'OR':gate;
  let shape=base==='NOT'?'<path class="gate" d="M0 -35 L85 0 L0 35 Z"/><circle class="gate" cx="95" cy="0" r="10"/>':base==='AND'?'<path class="gate" d="M0 -40 H50 A40 40 0 0 1 50 40 H0 Z"/>':'<path class="gate" d="M0 -40 Q60 -40 100 0 Q60 40 0 40 Q30 0 0 -40 Z"/>';
  if(base==='XOR') shape+='<path class="wire" d="M-12 -40 Q18 0 -12 40"/>';
  if(['NAND','NOR'].includes(gate)) shape+=`<circle class="gate" cx="${gate==='NAND'?100:110}" cy="0" r="10"/>`;
  return `<g transform="translate(${x} ${y})" data-gate="${gate}">${shape}</g>`;
};
const outputOffset = gate => ({NOT:105,AND:90,NAND:110,OR:100,NOR:120,XOR:100}[gate]);
const inputOffset = gate => ['OR','NOR','XOR'].includes(gate)?11:0;

// A tree deliberately repeats named input terminals. Equal labels carry the
// same signal; they do not introduce independent input variables.
export function circuitSvg(key) {
  const spec=logicCases[key];
  const depth=node=>typeof node==='string'?0:1+Math.max(...node.inputs.map(depth));
  let leaf=0,body='';
  const layout=node=>{
    if(typeof node==='string') {
      const y=135+leaf++*120;
      body+=text(35,y+8,node,25,'start');
      return {x:115,y};
    }
    const children=node.inputs.map(layout),x=160+depth(node)*230;
    const y=children.reduce((sum,c)=>sum+c.y,0)/children.length;
    children.forEach((child,i)=>{
      const targetY=y+(children.length===1?0:i===0?-20:20);
      const knee=x-55-(children.length===2?i*15:0);
      body+=`<path class="wire" d="M${child.x} ${child.y} H${knee} V${targetY} H${x+inputOffset(node.gate)}"/>`;
    });
    body+=pathFor(node.gate,x,y);
    return {x:x+outputOffset(node.gate),y};
  };
  const out=layout(spec.tree),w=Math.max(850,out.x+150),h=leaf*120+165;
  body+=line(out.x,out.y,out.x+55,out.y,false)+text(out.x+80,out.y+8,spec.output,27);
  body+=text(w/2,h-55,`Independent inputs: ${spec.inputs.join(', ')}. Repeated labels carry the same input signal.`,23);
  body+=text(w/2,h-23,'NOT has one input; every other gate shown has two inputs.',23);
  return shell(`One valid circuit · ${spec.output}`,`Circuit for ${key}. Repeated input names refer to the same independent input.`,body,w,h);
}

const lifecycle=shell('One reading: capture, save, switch off and reload','A recorder reads 23, saves it, changes only the RAM value to 24, switches off and reloads the saved 23.',
  box(40,110,325,['1 · Sensor input','Reading: 23'])+box(435,110,325,['2 · RAM workspace','Process and display 23'])+box(830,110,325,['3 · Save completes','Flash file: 23'])+
  line(365,160,435,160)+line(760,160,830,160)+
  box(40,330,325,['4 · Unsaved edit','RAM: 24; file: 23'])+box(435,330,325,['5 · Power removed','RAM lost; file remains'])+box(830,330,325,['6 · Restart and read','Load 23 into RAM'])+
  `<path class="wire" marker-end="url(#arrow)" d="M990 215 V270 H200 V330"/>`+line(365,380,435,380)+line(760,380,830,380)+
  text(600,520,'Persistent firmware provides start-up instructions; it is separate from the saved reading.')+text(600,565,'A completed copy to removable storage can be disconnected and kept separately.'),1200,615);

const layers=shell('A three-layer model: every slice contributes','Each illustrative layer is 1 mm thick. Bottom: 3 by 3 filled cells; middle: 2 by 2; top: 1 by 1. Stack them in that order.',
  [3,2,1].map((n,i)=>{
    const x=90+i*400;
    return text(x+90,105,`Layer ${i+1} · ${n} × ${n}`)+Array.from({length:n*n},(_,k)=>`<rect class="box" x="${x+(k%n)*58}" y="${150+Math.floor(k/n)*58}" width="58" height="58"/>`).join('')+text(x+90,390,`${n*n} filled ${n===1?'cell':'cells'}`)+text(x+90,430,`Height: ${i}–${i+1} mm`);
  }).join('')+text(600,525,'Deposit/solidify each cross-section; reposition by one layer height; continue to the final slice.')+text(600,570,'After layer 1: only the base exists. After layer 3: the complete stepped object exists.'),1200,620);

const sound=shell('A moving coil: reverse the direction of conversion','Dynamic microphone: diaphragm moves a coil relative to a permanent magnet and induces voltage. Loudspeaker: changing coil current produces a force and moves the cone.',
  text(600,100,'Dynamic microphone · sound drives movement',27)+box(35,135,220,['Sound pressure','moves diaphragm'])+box(335,135,240,['Attached coil moves','in magnetic field'])+box(655,135,240,['Induced voltage','analogue signal'])+box(975,135,190,['ADC','digital samples'])+
  line(255,185,335,185)+line(575,185,655,185)+line(895,185,975,185)+
  text(600,320,'Loudspeaker · an electrical signal drives movement',27)+box(35,355,220,['Samples → DAC','→ amplifier'])+box(335,355,240,['Changing coil current','in magnetic field'])+box(655,355,240,['Force moves coil','and attached cone'])+box(975,355,190,['Air pressure','sound waves'])+
  line(255,405,335,405)+line(575,405,655,405)+line(895,405,975,405)+text(600,550,'The permanent magnet supplies the field; the coil and diaphragm/cone can move.')+text(600,590,'Functional conversion diagram. This microphone example does not describe every microphone type.'),1200,640);

const flash=shell('Flash: retain charge, then sense the threshold','Illustrative single-level floating-gate cell. Insulation retains charge. An erased low-threshold cell reads 1; a programmed high-threshold cell reads 0 in this declared model.',
  [0,1,1].map((charged,i)=>{
    const x=60+i*400;
    return text(x+135,112,['1 · Erased','2 · Programmed','3 · Power restored'][i],27)+`<rect class="muted" x="${x}" y="145" width="270" height="200" rx="12"/><rect class="box" x="${x+45}" y="190" width="180" height="85" rx="8"/>`+text(x+135,177,'Insulating layer',21)+text(x+135,240,charged?'−  −  −  −':'Uncharged',23)+text(x+135,320,'Floating gate',22)+text(x+135,390,charged?'Higher threshold':'Lower threshold')+text(x+135,430,charged?'Read as 0':'Read as 1');
  }).join('')+line(330,250,460,250)+line(730,250,860,250)+text(795,490,'Power off, then on',22)+text(600,540,'Reading senses whether the transistor conducts at the chosen test voltage.')+text(600,582,'Erasing removes stored charge. No DRAM-style periodic refresh is needed to retain data.'),1200,625);

const disk=shell('HDD access: select the track, then wait for the sector','A head moves radially to a circular track. Rotation brings a selected sector under the head. Writing and reading use different magnetic actions.',
  [80,140,200].map(r=>`<circle cx="280" cy="305" r="${r}" fill="none" stroke="${r===140?'#b66a06':'#7c8b9c'}" stroke-width="${r===140?6:3}"/>`).join('')+`<circle cx="280" cy="305" r="25" class="box"/><path d="M410 254 A140 140 0 0 1 420 305" stroke="#b66a06" stroke-width="16" fill="none"/>`+
  line(545,305,426,305)+text(580,305,'Head',25)+text(520,410,'Seek across tracks',22)+text(280,560,'Highlighted ring: target track')+
  box(700,115,440,['1 · Seek','Move head to required track'])+box(700,265,440,['2 · Rotational wait','Bring target sector beneath head'])+box(700,415,440,['3 · Transfer','Write pattern OR sense and decode'])+
  line(920,220,920,265)+line(920,370,920,415)+text(920,580,'The head normally stays above the surface.',22));

const optical=shell('An optical recording must survive a later read','Higher writing power changes the recordable layer. After writing, lower reading power senses optical differences without rewriting the recording.',
  text(600,105,'Write to a recordable disc',27)+box(40,140,310,['Data to record','controller selects positions'])+box(445,140,310,['Higher-power laser','changes recording layer'])+box(850,140,310,['Recorded pattern','persists without power'])+line(350,190,445,190)+line(755,190,850,190)+
  text(600,350,'Read the same recorded track',27)+box(40,385,310,['Low-power laser','illuminates the track'])+box(445,385,310,['Detector senses','reflected-light differences'])+box(850,385,310,['Controller decodes','recovered data'])+line(350,435,445,435)+line(755,435,850,435)+text(600,570,'Pressed, recordable and rewritable discs have different recording layers and update possibilities.'));

const touch=shell('Touch coordinates select a displayed control','An illustrative screen uses coordinates increasing rightward and downward. A reported touch at (240, 120) is inside the Start button, bounded by x 200 to 300 and y 80 to 160.',
  `<rect class="muted" x="75" y="135" width="480" height="300"/>`+
  Array.from({length:7},(_,i)=>line(75+i*80,135,75+i*80,435,false)).join('')+Array.from({length:6},(_,i)=>line(75,135+i*60,555,135+i*60,false)).join('')+
  `<rect class="accent" x="275" y="215" width="100" height="80"/><circle cx="315" cy="255" r="9" fill="#155e75"/>`+text(325,282,'Start',22)+text(75,115,'(0, 0)',22)+text(545,475,'x increases →',22)+text(190,475,'y increases downward',22)+
  box(665,145,480,['Capacitance changes locally','Controller estimates x = 240, y = 120'])+box(665,330,480,['Software checks button bounds','200 ≤ x ≤ 300 and 80 ≤ y ≤ 160'])+line(555,255,665,195)+line(905,250,905,330)+text(600,565,'The sensing grid supplies input; the display is a separate output layer.')+text(600,603,'The coordinates are a declared teaching example, not a calibration of an actual electrode grid.'),1200,645);

const memory=shell('Classify the job separately from the memory technology','Working data can use SRAM or DRAM; firmware requires nonvolatile instruction storage; saved user files use secondary storage. A buffer is a temporary storage role.',
  box(35,120,345,['Working data','Read/write workspace'])+box(425,120,345,['Persistent firmware','Start-up / control instructions'])+box(815,120,345,['Saved user files','Retain completed records'])+
  box(35,320,345,['SRAM or DRAM','Select by latency, density, cost'])+box(425,320,345,['PROM / EPROM / EEPROM','Select by update requirement'])+box(815,320,345,['Flash, HDD or optical storage','Select by use and constraints'])+
  line(207,225,207,320)+line(597,225,597,320)+line(987,225,987,320)+text(600,520,'A buffer is an area used temporarily during a transfer; it may be implemented in RAM.')+text(600,562,'Flash can hold firmware or user files. A technology name alone does not identify the role.'),1200,610);

const monitoring=shell('Reporting a measurement and regulating it are different tasks','The top lane records or displays temperature. The bottom lane compares temperature with a rule and drives refrigeration to change it, then measures again.',
  text(600,105,'Monitoring: observe and report',27)+box(40,145,300,['Temperature sensor','measures 25 °C'])+box(450,145,300,['Processor','records / checks limit'])+box(860,145,300,['Display / alert','reports the condition'])+line(340,195,450,195)+line(750,195,860,195)+
  text(600,345,'Closed-loop control: act and measure again',27)+box(40,385,250,['Temperature','sensor'])+box(350,385,250,['Controller','compares with rule'])+box(660,385,230,['Refrigeration','actuator'])+box(950,385,210,['Physical','temperature'])+line(290,435,350,435)+line(600,435,660,435)+line(890,435,950,435)+`<path class="wire" marker-end="url(#arrow)" d="M1055 490 V555 H165 V490"/>`+text(600,593,'New measurements describe the actual result, including no change when the actuator fails.'),1200,635);

const feedback=shell('Feedback returns a measurement of the physical outcome','Controller to actuator is an output command. Environment to sensor to controller is the feedback path. A failed actuator can leave the reading unchanged.',
  box(50,140,290,['Sensor + conversion','read actual temperature'])+box(455,140,290,['Controller','compare with target'])+box(865,140,285,['Actuator + driver','apply heating output'])+
  line(340,190,455,190)+line(745,190,865,190)+box(455,400,290,['Physical environment','temperature may change'])+
  `<path class="wire" marker-end="url(#arrow)" d="M1005 245 V285 H805 V450 H745"/><path class="wire" marker-end="url(#arrow)" d="M455 450 H195 V245"/>`+text(320,350,'Feedback path',24)+text(980,340,'Physical action',24)+text(600,100,'Target / switching rule',24)+line(600,110,600,140)+box(865,420,285,['Disturbance','e.g. an open door'])+line(865,470,765,470)+text(600,575,'A returned command is not evidence that heating actually happened.'),1200,630);

const gates=shell('Read the symbol before applying its rule','Six standard gate symbols. NOT has one input. AND, OR, NAND, NOR and XOR have two inputs; the output bubble inverts the result.',
  ['NOT','AND','OR','NAND','NOR','XOR'].map((g,i)=>{
    const x=100+(i%3)*400,y=175+Math.floor(i/3)*255;
    return text(x+65,y-80,g,29)+pathFor(g,x,y)+line(x-60,y+(g==='NOT'?0:-20),x+inputOffset(g),y+(g==='NOT'?0:-20),false)+(g==='NOT'?'':line(x-60,y+20,x+inputOffset(g),y+20,false))+line(x+outputOffset(g),y,x+175,y,false)+text(x+65,y+85,({NOT:'opposite input',AND:'both inputs 1',OR:'at least one input 1',NAND:'NOT of AND',NOR:'NOT of OR',XOR:'exactly one of two inputs 1'})[g],23);
  }).join('')+text(600,590,'Output bubble = inversion. Extra input curve = XOR (EOR).'),1200,635);

export const section3TeachingDiagramFiles = {
  'reading-lifecycle.svg':lifecycle,'three-layer-build.svg':layers,'sound-transduction.svg':sound,
  'flash-retention.svg':flash,'disk-access.svg':disk,'optical-roundtrip.svg':optical,'touch-position.svg':touch,
  'memory-roles.svg':memory,'monitor-control.svg':monitoring,'feedback-outcome.svg':feedback,'gate-symbols.svg':gates,
  ...Object.fromEntries(['equality','acceptedRows','practiceRows','lamp','norXor','xorTerms','warning','fromExamTable','sectionCheck'].map(key=>[`logic-${key}.svg`,circuitSvg(key)])),
};
export function section3Visual(name,title,alt) {
  return {type:'reviewed-visual',asset:`/assets/course-v3/section-3/${name}.svg`,title,alt,facts:[alt],caption:alt,layout:'mechanism',review:'Reproducible SVG; inspect labels, connections and correspondence with the teaching example.',preserveText:true};
}
