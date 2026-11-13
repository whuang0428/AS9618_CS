// Inline course diagrams use local geometry so projection, print and offline viewing agree.
import models from './course-v3-section4-models.js';

const exampleMemory = Object.entries(models.programMemory());
const ink = '#163644';
const teal = '#12675f';
const amber = '#a75123';
const grey = '#57717b';
const mint = '#dcefe8';
const sand = '#fff0d9';
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function label(x, y, value, size = 22, options = {}) {
  const { anchor = 'start', weight = 400, fill = ink } = options;
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${escape(value)}</text>`;
}

function rect(x, y, w, h, fill = 'white', stroke = '#aabec0', radius = 8) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}

function path(d, stroke = teal, width = 3, fill = 'none') {
  return `<path d="${d}" stroke="${stroke}" stroke-width="${width}" fill="${fill}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function dot(x, y, radius, fill, stroke = 'none') {
  return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}

function repeated(count, draw) {
  return Array.from({ length: count }, (_, index) => draw(index)).join('');
}

function rightArrow(x1, y, x2, color = teal) {
  return path(`M${x1} ${y}H${x2}m-9 -6 9 6 -9 6`, color);
}

function figure(title, caption, height, content) {
  return { type: 'diagram', title, caption,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="${height}" viewBox="0 0 900 ${height}" role="img" aria-label="${escape(title)}"><title>${escape(title)}</title><desc>${escape(caption)}</desc><rect width="900" height="${height}" fill="#fbfcf8"/>${content}</svg>` };
}

export const vonNeumann = figure(
  'One memory supplies instructions and data',
  'Follow the same memory connection to fetch the instruction at address 1 and then read its operand at address 5. The readable assembly names stand for encoded machine instructions.',
  356,
  rect(28, 63, 270, 202, '#eaf1f3', ink) + label(50, 103, 'Processor (CPU)', 28, { weight: 700 }) +
  rect(49, 126, 107, 48, 'white') + label(102, 156, 'Control', 21, { anchor: 'middle' }) +
  rect(167, 126, 109, 48, 'white') + label(222, 156, 'ALU', 21, { anchor: 'middle' }) +
  rect(49, 190, 227, 49, 'white') + label(162, 220, 'Registers', 21, { anchor: 'middle' }) +
  label(388, 123, 'address', 20, { anchor: 'middle' }) + rightArrow(300, 140, 477) +
  path('M477 192H300m9 -6 -9 6 9 6', teal) + label(388, 222, 'contents on read', 19, { anchor: 'middle' }) +
  rect(479, 24, 393, 299, 'white', ink) + label(501, 64, 'Main memory', 28, { weight: 700 }) +
  label(501, 97, 'Address', 19, { fill: grey }) + label(627, 97, 'Contents', 19, { fill: grey }) +
  exampleMemory.map(([address,value], i) =>
    rect(496, 106 + i*29, 357, 27, i < 4 ? mint : sand, 'none', 3) +
    label(521, 126 + i*29, address, 18) + label(633, 126 + i*29, value, 18, { weight: i === 1 || i === 5 ? 700 : 400 })).join('') +
  label(163, 310, 'Input / output interface', 19, { anchor: 'middle' }) + path('M162 268V286', grey)
);

export const sharedProgramMemory = figure(
  'Instructions and data share one main memory',
  'Start at address 1. The CPU fetches ADD 5 as an instruction. Its operand tells the CPU to read address 5 in that same memory, where it finds the number 24.',
  438,
  '<g role="group" aria-label="Main memory">' +
  rect(18, 15, 422, 405, 'white', ink, 12) +
  label(38, 53, 'Main memory', 29, { weight: 700 }) +
  label(38, 81, 'One address space for instructions and data', 18) +
  label(38, 119, 'Address', 18, { fill: grey }) + label(142, 119, 'Stored word', 18, { fill: grey }) +
  label(282, 119, 'Role in this program', 16, { fill: grey }) +
  exampleMemory.map(([address, word], i) => {
    const y = 132 + i * 40;
    const instruction = typeof word === 'string';
    const highlighted = address === '1' || address === '5';
    const colour = instruction ? teal : amber;
    return `<g aria-label="Address ${address}">` +
      rect(30, y, 398, 36, highlighted ? (instruction ? mint : sand) : '#f4f6f5', highlighted ? colour : 'none', 4) +
      label(57, y + 25, address, 20) + label(142, y + 25, word, 22, { weight: highlighted ? 700 : 500 }) +
      label(282, y + 25, instruction ? 'Instruction' : 'Data', 19, { fill: colour }) + '</g>';
  }).join('') + '</g>' +
  label(503, 54, 'How the CPU uses these words', 24, { weight: 700 }) +
  label(503, 83, 'LDD 4 has already loaded 18 into ACC.', 19) +
  rightArrow(431, 190, 493, teal) +
  label(507, 178, '1. Fetch the instruction', 25, { weight: 700, fill: teal }) +
  label(507, 208, 'Address 1 supplies ADD 5.', 21) +
  label(507, 237, 'The 5 names the address to read next.', 19) +
  rightArrow(431, 350, 493, amber) +
  label(507, 337, '2. Read the data', 25, { weight: 700, fill: amber }) +
  label(507, 367, 'Address 5 supplies 24.', 21) +
  label(507, 396, 'The CPU adds 24 to the 18 in ACC.', 19)
);

export const registerFamilies = figure(
  'Register storage inside the CPU',
  'Register use depends on the processor design. A program can reuse a general-purpose register for different values. A special-purpose register has an assigned architectural role.',
  326,
  rect(284,18,332,57,'#eaf1f3',ink) + label(450,54,'CPU registers',27,{anchor:'middle',weight:700}) +
  path('M450 76v23H225v32m225 -32h225v32',grey,3) +
  rect(27,132,395,165,'white',teal) + rect(478,132,395,165,'white',amber) +
  label(48,169,'General-purpose',23,{weight:700,fill:teal}) + label(499,169,'Special-purpose',23,{weight:700,fill:amber}) +
  label(48,208,'R1 holds a total: 42',21) + label(48,253,'Later, R1 holds a count: 3',21) +
  label(499,208,'PC holds the next address: 2',21) + label(499,253,'Later, PC still holds an address.',21)
);

function punches(x, count) {
  let drawing = rect(x, 75, 325, 65, '#e7efef', ink) + rect(x+92, 48, 142, 29, ink, ink, 10);
  for (let index = 0; index < count; index++) {
    const offset = 30 + 35*index;
    drawing += rect(x+offset, 142, 12, 34, teal, teal, 3);
  }
  return drawing + path(`M${x+14} 193h295v36h-295Z`, '#acb9ac', 2, '#f9f3db') +
    repeated(8,i => dot(x+36+35*i, 211, 7, i < count ? ink : 'white', '#81948d'));
}

export const processorType = figure(
  'Two hole punches doing the same job',
  'Both tools make eight holes. A desktop punch makes one per stroke; the gang punch makes four in one stroke. An instruction that processes several data items together can save work on a suitable program.',
  320,
  label(46, 39, 'Single punch', 25, { weight: 700 }) + label(478, 39, 'Four-punch head', 25, { weight: 700 }) +
  punches(50, 1) + punches(482, 4) +
  label(52, 281, '8 holes ÷ 1 = 8 strokes', 23) + label(482, 281, '8 holes ÷ 4 = 2 strokes', 23)
);

function task(x, y, name, width = 134, handover = false) {
  return rect(x, y, width, 42, handover ? sand : mint, handover ? amber : teal, 4) +
    label(x+width/2, y+28, name, 18, { anchor: 'middle', weight: 700 });
}

export const cores = figure(
  'Two proofreaders divide four independent pages',
  'One reader spends 20 minutes preparing a correction key and 80 minutes checking four pages. With two readers, preparation still takes 20 minutes, the pages take 40 minutes in parallel, and communicating results takes 4 more. Total time falls from 100 to 64 minutes.',
  351,
  label(178, 31, 'Elapsed time in minutes', 20, { fill: grey }) +
  repeated(6,i => label(178+132*i, 58, 20*i, 18, { anchor: 'middle' }) + path(`M${178+132*i} 64v184`, '#e0e6df',1)) +
  label(22, 99, 'One reader', 22, { weight: 700 }) +
  task(178,72,'Prepare',130,true) + repeated(4,i => task(310+i*132,72,'Page '+(i+1),130)) +
  label(22, 158, 'Reader A', 22, { weight: 700 }) + task(178,131,'Prepare',130,true) + task(310,131,'Page 1',130) + task(442,131,'Page 3',130) +
  label(22, 214, 'Reader B', 22, { weight: 700 }) + label(241,210,'wait for key',17,{anchor:'middle',fill:grey}) + task(310,187,'Page 2',130) + task(442,187,'Page 4',130) +
  path('M573 152v56',grey,2) + rect(575,160,24,39,sand,amber,3) + label(610,187,'4 min to combine results',18,{fill:amber}) +
  label(179,274,'Two readers: 20 + (80 ÷ 2) + 4 = 64 minutes',21) +
  label(179,312,'Speedup = 100 ÷ 64 ≈ 1.56×',23,{weight:700})
);

function ferry(y, capacity) {
  const deckWidth = 27 + 59*capacity;
  let drawing = path(`M60 ${y+65}h${deckWidth}l-29 31H90Z`, ink,3,'#d9e7e7');
  drawing += path(`M58 ${y+102}` + 'q17 10 34 0'.repeat(capacity*2), '#578c9b',2);
  for (let i = 0; i < capacity; i++) {
    const x = 76+59*i;
    drawing += rect(x,y+18,52,46,sand,amber,3) + path(`M${x+5} ${y+22}l42 36m0 -36 -42 36`, '#bd824c',2);
  }
  return drawing;
}

export const busWidth = figure(
  'A wider ferry carries more crates per crossing',
  'Each crate stands for 16 bits. The same 256-bit load takes eight transfers on a 32-bit data bus and four on a 64-bit data bus.',
  320,
  label(56, 35, 'Same load: 16 crates × 16 bits = 256 bits', 21, { weight: 700 }) +
  ferry(40,2) + label(369, 96, '32-bit data bus', 25, { weight: 700 }) +
  label(369, 132, '256 ÷ 32 = 8 transfers', 22) +
  ferry(173,4) + label(369, 229, '64-bit data bus', 25, { weight: 700 }) +
  label(369, 265, '256 ÷ 64 = 4 transfers', 22)
);

function clockTrace(y, period) {
  let d = `M215 ${y}`;
  for (let cycle = 0; cycle < 6; cycle++) d += `v-30h${period/2}v30h${period/2}`;
  return path(d, teal, 4) + dot(215+6*period,y,5,amber) +
    repeated(6,i => label(215+(i+0.5)*period, y+20, i+1, 15, {anchor:'middle',fill:grey}));
}

function metronome(y) {
  return path(`M43 ${y-54}h13l19 59H26Z`,ink,2,mint) +
    path(`M48 ${y-6}l24 -48`,teal,4) + dot(64,y-38,4,amber) + dot(48,y-6,4,ink);
}

export const clockSpeed = figure(
  'Six beats on two metronomes',
  'The same six-cycle task takes 6 ns at 1 GHz and 3 ns at 2 GHz. Compare both traces against the same time scale.',
  303,
  label(30, 47, 'One beat per cycle', 23, { weight: 700 }) +
  repeated(7,i => path(`M${215+i*95} 56v181`, '#ccd8d5',1) + label(215+i*95, 262, i, 18, { anchor:'middle' })) +
  metronome(116) + label(87, 107, '1 GHz', 26, { weight: 700 }) + clockTrace(116,95) +
  metronome(205) + label(87, 196, '2 GHz', 26, { weight: 700 }) + clockTrace(205,47.5) +
  label(800, 111, '6 ns', 19, { fill: amber }) + label(509,201,'3 ns',19,{ fill: amber }) +
  label(792, 291, 'Time (ns)', 18, { anchor:'end' })
);

function book(x,y,color,height) {
  return rect(x,y-height,21,height,color,ink,2) + path(`M${x+4} ${y-7}h13`,ink,1);
}

export const cache = figure(
  'A desk shelf keeps the book you just used',
  'The first request for book A takes a trip to the stacks. Keeping a copy nearby makes the second request a desk-shelf hit. A first request for B still goes to the stacks.',
  310,
  label(43, 44, 'Reader’s desk', 23, { weight: 700 }) + label(285, 44, 'Desk shelf', 23, { weight: 700 }) +
  label(659, 44, 'Library stacks', 23, { weight: 700 }) +
  path('M35 176h172m-154 0v44m138 -44v44', ink,6) +
  path('M74 152q22 -11 44 -1q22 -10 44 1v18q-20 -10 -44 0q-21 -10 -44 0Z', ink,2,'#fff5d5') +
  path('M281 97v79h125V97m-125 79v17m125 -17v17',ink,5) +
  book(301,173,mint,45) + label(311,159,'A',17,{anchor:'middle'}) +
  path('M648 62v145h183V62m-183 65h183m-183 -65h183',ink,5) +
  repeated(7,i => book(655+i*24,124,i%2 ? mint : sand,36 + i%3*7)) +
  repeated(7,i => book(655+i*24,204,i%2 ? sand : mint,42 + i%3*7)) +
  rightArrow(205,130,270) + label(237,115,'hit',18,{anchor:'middle',fill:teal}) +
  rightArrow(424,130,629,amber) + label(527,112,'miss: fetch a copy',18,{anchor:'middle',fill:amber}) +
  path('M34 236H866','#c6d2cd',2) +
  label(42,278,'A: miss',22) + label(245,278,'A: hit',22,{fill:teal,weight:700}) +
  label(448,278,'B: miss',22) + label(655,278,'A: hit',22,{fill:teal,weight:700})
);
