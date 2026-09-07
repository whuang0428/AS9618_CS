// Exact, reproducible teaching diagrams. Asset keys belong to concepts, not lesson numbers.
import { extendedMechanisms } from './course-v3-mechanism-extensions.mjs';
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const ink = '#17374d', teal = '#176b70', red = '#a43c35';
const text = (x, y, lines, size = 26, anchor = 'start', color = ink) => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-size="${size}">${(Array.isArray(lines) ? lines : [lines]).map((line, i) => `<tspan x="${x}" dy="${i ? size * 1.35 : 0}">${esc(line)}</tspan>`).join('')}</text>`;
const box = (x, y, w, h, lines, fill = '#eef7f6', size = 26) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${teal}" stroke-width="2"/>${text(x + w / 2, y + h / 2 - ((Array.isArray(lines) ? lines.length : 1) - 1) * size * .675 + size * .35, lines, size, 'middle')}`;
const arrow = (d, label = '', x = 0, y = 0, color = teal) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="3" marker-end="url(#${color === red ? 'red-arrow' : 'arrow'})"/>${label ? text(x, y, label, 23, 'middle', color) : ''}`;
const decision = (x, y, w, h, lines) => `<polygon points="${x+w/2},${y} ${x+w},${y+h/2} ${x+w/2},${y+h} ${x},${y+h/2}" fill="#fff4dd" stroke="${teal}" stroke-width="2"/>${text(x+w/2,y+h/2-((Array.isArray(lines)?lines.length:1)-1)*17+9,lines,25,'middle')}`;
const io = (x,y,w,h,label) => `<polygon points="${x+22},${y} ${x+w},${y} ${x+w-22},${y+h} ${x},${y+h}" fill="#eef7f6" stroke="${teal}" stroke-width="2"/>${text(x+w/2,y+h/2+9,label,26,'middle')}`;
const terminal = (x,y,w,h,label) => box(x,y,w,h,label).replace('rx="10"','rx="32"');
function svg(title, desc, height, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="${height}" viewBox="0 0 1100 ${height}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc><defs>${[['arrow',teal],['red-arrow',red]].map(([id,color])=>`<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${color}"/></marker>`).join('')}</defs><rect width="1100" height="${height}" fill="white"/><g font-family="Arial, Helvetica, sans-serif">${text(35,50,title,32)}${body}</g></svg>\n`;
}

const mechanismData = Object.freeze({
  shifts: { bits:'10010111', width:8 },
  boundaries: { lower:0, upper:100, cases:[[-1,false],[0,true],[1,true],[55,true],[99,true],[100,true],[101,false]] },
});

const definitions = {
  addressing: {
    title:'Follow the address to find the value', height:845,
    facts:['Memory[100] = 150; Memory[150] = 7; Memory[102] = 9; IX = 2.', 'Immediate #100 supplies 100; direct 100 reads 150; indirect 100 reads 7.', 'Indexed 100 + IX selects address 102 and reads 9.', 'Relative addressing with stated PC base 40 and displacement -5 gives target address 35, not the contents of address 35.'],
    draw:() => text(35,99,'Same operand 100; IX = 2. Boxes distinguish locations from values.',25) + [
      ['Immediate', ['#100'], ['Value 100'], null],
      ['Direct', ['Address 100'], ['Memory[100]', 'contains 150'], ['Value 150']],
      ['Indirect', ['Address 100'], ['Memory[100]', 'contains address 150'], ['Memory[150]', 'contains value 7']],
      ['Indexed', ['100 + IX', '= 102'], ['Memory[102]', 'contains 9'], ['Value 9']],
      ['Relative', ['Stated PC base', '40'], ['40 + (-5)'], ['Target address 35']],
    ].map(([name,a,b,c],i)=>{const y=148+i*132;return text(35,y+14,name,27)+box(210,y-28,210,86,a)+arrow(`M420 ${y+15}H465`)+box(465,y-28,270,86,b)+ (c?arrow(`M735 ${y+15}H780`)+box(780,y-28,285,86,c):'');}).join('')+text(35,812,'An address selects storage. Its contents can be a different number.',25),
  },
  shifts: {
    title:'Track every bit through a one-place shift', height:915,
    facts:['Each panel starts independently from the 8-bit pattern 10010111 (signed value -105).', 'Logical left: 00101110; logical right: 01001011. Zeros enter; outgoing bits are discarded.', 'Arithmetic left: 00101110 with signed overflow; arithmetic right: 11001011 (-53), copying the sign bit.', 'Cyclic left: 00101111; cyclic right: 11001011. The outgoing bit wraps around.'],
    draw:() => {
      const bits=mechanismData.shifts.bits;
      const panels=[['Logical left','00101110','left','zero'],['Logical right','01001011','right','zero'],['Arithmetic left','00101110','left','zero'],['Arithmetic right','11001011','right','sign'],['Cyclic left','00101111','left','wrap'],['Cyclic right','11001011','right','wrap']];
      return text(35,95,'Start each panel again from 10010111. Top: before; bottom: after.',25)+panels.map(([title,result,dir,mode],i)=>{
        const x=35+(i%2)*535,y=125+Math.floor(i/2)*250,bx=x+90,cell=44;
        const cells=(value,yy)=>[...value].map((b,j)=>box(bx+j*cell,yy,38,40,b,j===(dir==='left'?7:0)?'#fff0cc':'#f3f7fa',25)).join('');
        const paths=Array.from({length:8},(_,j)=>{
          let target=dir==='left'?j-1:j+1;
          if(target<0||target>7)return mode==='wrap'?arrow(`M${bx+j*cell+19} ${y+91}V${y+110}H${bx+(dir==='left'?7:0)*cell+19}V${y+136}`):arrow(`M${bx+j*cell+19} ${y+91}L${bx+(dir==='left'?-35:8*cell+20)} ${y+120}`,'',0,0,red);
          return arrow(`M${bx+j*cell+19} ${y+91}L${bx+target*cell+19} ${y+136}`)+(mode==='sign'&&j===0?arrow(`M${bx+19} ${y+91}V${y+136}`):'');
        }).join('');
        const note=i===2?'Signed overflow: -105 × 2 is outside -128..127':i===3?'Copy sign 1: -105 / 2 rounds down to -53':mode==='wrap'?'Outgoing bit returns at the opposite end':'Discard outgoing bit; insert 0 in the gap';
        return `<g data-shift="${esc(title)}"><rect x="${x}" y="${y}" width="510" height="230" rx="10" fill="#fbfdfd" stroke="#bdcdd4"/>`+text(x+18,y+31,title,27)+text(x+10,y+79,'Before',20)+text(x+10,y+165,'After',20)+cells(bits,y+51)+paths+cells(result,y+136)+text(x+16,y+210,note,20)+'</g>';
      }).join('')+text(35,902,'Matching results for one input do not make the shift rules equivalent.',24);
    },
  },
  memory: {
    title:'Allocate, protect and release main memory', height:640,
    facts:['The simplified memory contains region A, region B and other free space; sizes are illustrative.', 'The editor receives region A; the browser later receives a separate region B.', 'When the editor exits, A becomes available again while B remains allocated.', 'Memory protection prevents one process from freely overwriting another process; releasing RAM does not save a file.'],
    draw:() => text(35,100,'A simplified RAM map: the OS records which process may use each region.',25)+[
      ['1 · Editor starts',['Editor','Free','Free']],['2 · Browser starts',['Editor','Browser','Free']],['3 · Editor exits',['Free','Browser','Free']],
    ].map(([title,values],i)=>{const x=35+i*365;return text(x,155,title,27)+values.map((v,j)=>box(x,185+j*88,285,76,[`Region ${['A','B','C'][j]}`,v],v==='Free'?'#f2f4f6':'#e1f0ed',24)).join('')+(i<2?arrow(`M${x+295} 310H${x+352}`):'');}).join('')+box(35,488,1030,102,['Protection: the editor may not overwrite the browser’s allocated region.', 'Release: an exited process’s region becomes available for reuse.'],'#fff4dd',25),
  },
  debugger: {
    title:'Pause before the line, then inspect its effect', height:690,
    facts:['Initial Total = 12 and Increment = 4. The intended operation adds Increment.', 'Line 5 is faulty: Total <- Total - Increment. A breakpoint pauses before it executes.', 'Before line 5, Total + Increment evaluates to 16; after stepping, Total is 8 and that expression evaluates to 12.', 'Line 6 OUTPUT Total has not executed immediately after stepping line 5. Correcting line 5 to addition and rerunning outputs 16.'],
    draw:() => text(35,99,'Task: add Increment to Total. The subtraction below is the fault.',25)+box(35,135,585,325,[], '#f3f7fa')+
      ['1  DECLARE Total : INTEGER','2  DECLARE Increment : INTEGER','3  Total <- 12','4  Increment <- 4','5  Total <- Total - Increment','6  OUTPUT Total'].map((s,i)=>(i===4?`<rect x="48" y="${156+i*43}" width="560" height="41" fill="#ffe0d9"/>`:'')+text(58,186+i*43,s,25)).join('')+
      box(695,140,360,116,['Breakpoint before line 5','Total = 12','Increment = 4'],'#eef7f6',25)+arrow('M875 256V320','Step line 5',967,296)+box(695,320,360,130,['Paused before line 6','Total = 8','No output yet'],'#fff0df',25)+
      box(35,502,490,130,['Predict: 12 + 4 = 16','Observe: 12 - 4 = 8','Compare: wrong operator'],'#fff4dd',27)+box(575,502,480,130,['Fix: Total <- Total + Increment','Restart from the initial state.','Run again: output 16.'],'#eef7f6',25),
  },
  decomposition: {
    title:'Decompose a library loan into responsibilities', height:570,
    facts:['ProcessLoan is the whole task, decomposed into IdentifyCopy, CheckAvailability, RecordLoan and ReportOutcome.', 'The tree shows whole-to-part responsibility; its connectors do not mean that all branches execute unconditionally.', 'CopyID links identification to checking. Recording requires an available copy; reporting gives confirmation or a refusal reason.'],
    draw:() => box(365,105,370,88,['Process a library loan'])+`<path d="M550 193V238H147V276M550 238H953V276M415 238V276M685 238V276" stroke="${teal}" stroke-width="3" fill="none"/>`+
      [[35,'Identify copy',['CopyID']],[305,'Check availability',['CopyID → availability']],[575,'Record loan',['Available copy + borrower']],[845,'Report outcome',['Confirmation or refusal']]].map(([x,label,detail])=>box(x,276,220,106,label.split(' '), '#eef7f6',25)+text(x+110,419,detail,19,'middle')).join('')+
      box(35,465,1030,72,'These are responsibilities, not a sequence of unconditional actions.','#fff4dd',25),
  },
  repeat: {
    title:'REPEAT: execute the body before testing', height:850,
    facts:['INPUT Mark runs before the first UNTIL test, so at least one input is read.', 'The condition is (Mark >= 0) AND (Mark <= 100). TRUE exits; FALSE returns to INPUT Mark.', 'For inputs -1, 101, 100, the outcomes are FALSE, FALSE, TRUE. The final output is 100.'],
    draw:() => terminal(345,100,350,65,'Start')+arrow('M520 165V215')+io(345,215,350,65,'INPUT Mark')+arrow('M520 280V340')+
      decision(310,340,420,170,['Mark >= 0 AND','Mark <= 100?'])+arrow('M520 510V580','TRUE · stop',636,556)+io(345,580,350,65,'OUTPUT Mark')+arrow('M520 645V690')+terminal(395,690,250,60,'End')+
      arrow('M310 425H145V247H356','FALSE · repeat',230,322)+text(35,811,'Input trace: -1 → FALSE; 101 → FALSE; 100 → TRUE → output 100.',24),
  },
  while: {
    title:'WHILE: test before entering the body', height:1110,
    facts:['Total starts at 0 and the first Value is read before the test.', 'Value <> -1 is the continuation condition. TRUE adds Value and reads again; FALSE exits.', 'A first input of -1 skips the body and outputs 0. Inputs 3, 4, -1 output 7; the sentinel is never added.'],
    draw:() => terminal(390,90,240,60,'Start')+arrow('M510 150V190')+box(340,190,340,70,'Total <- 0')+arrow('M510 260V305')+io(340,305,340,70,'INPUT Value')+arrow('M510 375V420')+
      decision(330,420,360,130,'Value <> -1?')+arrow('M510 550V610','TRUE · enter',620,586)+box(295,610,430,75,'Total <- Total + Value')+arrow('M510 685V730')+io(340,730,340,70,'INPUT Value')+
      arrow('M351 765H130V485H330')+arrow('M690 485H865V850','FALSE · exit',955,575)+io(685,850,360,70,'OUTPUT Total')+arrow('M865 920V965')+terminal(745,965,240,60,'End')+
      text(35,1080,'First input -1: output 0. Inputs 3, 4, -1: output 7; the sentinel is never added.',25),
  },
  'loop-comparison': {
    title:'A condition decides either to continue or to stop', height:755,
    facts:['WHILE tests before its body and enters on TRUE; it can execute zero times.', 'REPEAT runs its body first and exits when UNTIL is TRUE; it executes at least once.', 'Negating the condition alone does not preserve a zero-iteration path when changing WHILE into REPEAT.'],
    draw:() => text(35,99,'The body must return to its own condition. Check the first-iteration rule.',25)+
      `<rect x="35" y="125" width="1030" height="270" rx="12" fill="#fafcfd" stroke="#bdcdd4"/><rect x="35" y="430" width="1030" height="285" rx="12" fill="#fafcfd" stroke="#bdcdd4"/>`+
      text(55,162,'WHILE Condition · body may run zero times',27)+decision(80,215,250,110,'Condition?')+arrow('M330 270H425','TRUE',377,255)+box(425,230,230,80,'Body')+
      arrow('M540 310V355H205V325')+arrow('M205 215V192H925V230','FALSE: skip body',723,187)+box(825,230,200,80,['Next','statement'])+
      text(55,468,'REPEAT … UNTIL Condition · body runs at least once',27)+box(80,535,220,80,'Body')+arrow('M300 575H390')+decision(390,520,270,110,'Condition?')+
      arrow('M660 575H825','TRUE: stop',743,557)+box(825,535,200,80,['Next','statement'])+arrow('M525 630V680H190V615','FALSE: repeat',365,671),
  },
  passing: {
    title:'A copied value and a reference use different storage', height:665,
    facts:['Caller Number starts at 5. ChangeCopy receives its own BYVAL Value, adds 2 and displays 7; Number remains 5.', 'The later ChangeOriginal call uses BYREF: Value refers to Number itself. Adding 2 changes Number to 7.', 'The program outputs 7 inside ChangeCopy, then 5 in the caller, then 7 after ChangeOriginal. A BYREF argument must be an assignable variable of the required type.'],
    draw:() => text(35,99,'Use the same call order as the program: ChangeCopy, then ChangeOriginal.',24)+
      text(35,158,'1 · BYVAL: two independent locations',28)+box(35,198,260,95,['Caller Number','5'])+arrow('M295 245H410','copy 5',352,224)+box(410,198,275,95,['Local Value','5 → 7'])+text(740,231,['Caller stays 5.','Local output: 7.'],26)+
      text(35,375,'2 · BYREF: both names refer to the caller’s location',28)+box(335,415,350,100,['Number','5 → 7'])+text(35,444,['Parameter Value','refers to Number'],25)+arrow('M245 462H335')+text(745,450,['Value <- Value + 2','updates Number.'],25)+
      box(35,565,1030,65,'Output order: 7 (inside copy), 5 (caller), 7 (after reference call).','#fff4dd',25),
  },
  boundaries: {
    title:'Test both sides of each inclusive limit', height:590,
    facts:['The input rule accepts integers from 0 to 100 inclusive.', '-1 and 101 are outside the permitted range and are rejected; 0, 1, 55, 99 and 100 are accepted.', '0 and 100 are valid extremes; 55 is an ordinary normal value. Boundary testing includes valid and invalid neighbours.', 'The axis is broken between the limit details and the ordinary example; spacing is not to scale. Text "fifty" fails the integer type check before the range test.'],
    draw:() => text(35,103,'Rule: INTEGER, 0 <= Mark <= 100. Broken axis; spacing is not to scale.',25)+
      `<path d="M65 265H1035" stroke="${ink}" stroke-width="3"/><path d="M345 257l8 16 8-16 8 16M735 257l8 16 8-16 8 16" fill="none" stroke="${ink}" stroke-width="3"/>`+
      mechanismData.boundaries.cases.map(([v,ok],i)=>{const x=[90,210,310,550,790,890,1010][i];return `<circle cx="${x}" cy="265" r="11" fill="${ok?teal:red}"/>`+text(x,227,v,31,'middle')+text(x,315,ok?'Accept':'Reject',23,'middle',ok?teal:red);}).join('')+
      `<path d="M210 342V368H890V342" fill="none" stroke="${teal}" stroke-width="3"/>`+text(550,409,'0 and 100 are included: both are valid extremes.',26,'middle')+
      box(35,467,1030,84,['Boundary describes position; state acceptance or rejection separately.','Text "fifty" fails the type check, so it does not belong on this integer axis.'],'#fff4dd',25),
  },
};
Object.assign(definitions, extendedMechanisms({ text, box, arrow, decision, io, terminal, esc, teal, red }));
export function mechanismVisual(key) {
  const d=definitions[key];if(!d)throw new Error(`Unknown mechanism ${key}`);
  return {type:'reviewed-visual',title:d.title,asset:`/assets/course-v3/mechanisms/${key}.svg`,alt:d.facts.join(' '),facts:d.facts,caption:d.facts.at(-1),review:'reviewed',layout:'mechanism',preserveText:true};
}
export function mechanismDiagramFiles() {
  return Object.fromEntries(Object.entries(definitions).map(([key,d])=>[`${key}.svg`,svg(d.title,d.facts.join(' '),d.height,d.draw())]));
}
