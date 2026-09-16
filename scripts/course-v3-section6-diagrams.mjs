// Exact numeric diagrams: SVG text and arithmetic remain inspectable and reproducible.
import { parityExample, blockCounts } from './course-v3-section6-examples.mjs';
const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const text = (x, y, s, size = 25, extra = "") => `<text x="${x}" y="${y}" font-size="${size}" ${extra}>${esc(s)}</text>`;
const box = (x, y, w, h, fill = "#edf6f5", stroke = "#bdd3d4") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${stroke}"/>`;
const frame = (title, subtitle, body, height = 660) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}</desc><rect width="1200" height="${height}" fill="#fff"/><g fill="#183448" font-family="Arial, Helvetica, sans-serif">${text(45, 58, title, 36, 'font-weight="700"')}${text(45, 99, subtitle, 23)}${body}</g></svg>`;
const centred = (x, y, s, size = 28, extra = "") => text(x, y, s, size, `text-anchor="middle" ${extra}`);

export function section6DiagramFiles() {
  const checkDigit = frame("Check digit: a stated rule", "Data digits 4726 · weights 3, 1, 3, 1 · choose a final digit for a multiple of 10", [
    box(45, 135, 1110, 285),
    ...["Data digit", "Weight", "Product"].map((label, r) => text(70, 194 + r * 88, label, 24)),
    ...[4,7,2,6].flatMap((digit, c) => [digit, [3,1,3,1][c], digit * [3,1,3,1][c]].map((n, r) => centred(405 + c * 200, 194 + r * 88, n, 32))),
    text(70, 469, "Weighted sum = 12 + 7 + 6 + 6 = 31", 28),
    text(70, 519, "31 + 9 = 40  →  check digit = 9  →  full code = 47269", 28, 'font-weight="700"'),
    text(70, 588, "On entry: recalculate from 4726 and compare with the supplied final digit.", 24),
    text(70, 625, "The rule detects some entry errors; it does not prove that the code is the intended one.", 22),
  ].join(""));
  const bitRow = (label, bits, y, highlighted = -1, colour = "#b35328") => text(55, y + 40, label, 24) + [...bits].map((b, i) => box(342+i*96,y,76,62,i === highlighted ? "#fff0e5" : "#edf6f5", i === highlighted ? colour : "#bdd3d4") + centred(380+i*96,y+42,b,32)).join("");
  const byteParity = frame("Byte parity: include the parity bit", "This example uses seven data bits followed by one parity bit, forming an eight-bit group.", [
    text(344, 152, "Seven data bits", 24), text(998, 152, "Parity", 23),
    bitRow("Even parity sent", "10110010", 177, 7),
    text(345, 283, "Four 1 bits in the data + parity bit 0 = four 1 bits in total.", 24),
    bitRow("Received", "10100010", 325, 3),
    text(345, 431, "One bit changed: only three 1 bits remain. Even parity fails.", 24),
    box(45, 470, 1110, 138, "#f1f5f9"),
    text(70, 516, "Odd parity for the same data would append 1, giving five 1 bits.", 25),
    text(70, 561, "Two bit flips may preserve parity: a passed check does not prove no error.", 24),
  ].join(""));
  const { sentBlock, receivedBlock } = parityExample;
  const grid = (rows, top, highlight) => rows.flatMap((row, r) => [
    text(52, top + 30 + r * 54, r === 3 ? 'Column parity' : `Row ${r + 1}`, 23),
    ...[...row].map((bit, c) => box(290+c*87, top+r*54, 68, 43,
      highlight && (r===1 || c===4) ? '#fff0e5' : c===7 || r===3 ? '#e1edf7' : '#edf6f5',
      highlight && r===1 && c===4 ? '#aa4824' : '#bdd3d4') + centred(324+c*87,top+30+r*54,bit,27)),
    text(1012,top+30+r*54,highlight && r===1 ? 'FAIL: 3 ones' : `${blockCounts(rows).rows[r]} ones`,22),
  ]).join('');
  const blockParity = frame('Block parity: build, check and correct', 'Even parity · seven data bits per row, one row-parity bit, then a transmitted column-parity row', [
    text(52,150,'1  SENDER: append the row bits, then count each column',27,'font-weight="700"'),
    text(290,193,'Data columns 1–7',23), text(895,193,'Row bit',23),
    grid(sentBlock,215,false),
    text(52,474,`Column totals including the last row: ${blockCounts(sentBlock).columns.join(', ')} — all even.`,23),
    text(52,537,'2  RECEIVER: one bit changes in row 2, column 5',27,'font-weight="700"'),
    ...Array.from({length:8},(_,c)=>centred(324+c*87,581,c+1,23)),
    grid(receivedBlock,602,true),
    text(52,859,`Column totals: ${blockCounts(receivedBlock).columns.join(', ')} — only column 5 fails.`,23),
    text(52,921,'3  CORRECT: at row 2, column 5, change 1 back to 0.',27,'font-weight="700"'),
    text(52,969,'The corrected block equals the sender’s block above. Recheck both directions.',24),
    text(52,1017,'Single-bit assumption: multiple changes may be ambiguous or go undetected.',23),
  ].join(''),1060);
  const checksum = frame("Checksum: calculate and compare", "Specified algorithm for this example: add the data bytes, then take the remainder modulo 256.", [
    box(45, 142, 530, 315), box(610, 142, 545, 315, "#fff4e9"),
    text(70, 190, "SENDER", 24, 'font-weight="700"'),
    text(70, 246, "Data: 84, 121, 77", 30),
    text(70, 302, "Sum = 282", 30),
    text(70, 359, "282 mod 256 = 26", 30, 'font-weight="700"'),
    text(70, 418, "Send the data and checksum 26.", 24),
    text(635, 190, "RECEIVER: ONE BYTE CHANGED", 23, 'font-weight="700"'),
    text(635, 246, "Data: 84, 120, 77", 30),
    text(635, 302, "Sum = 281", 30),
    text(635, 359, "281 mod 256 = 25", 30, 'font-weight="700"'),
    text(635, 418, "Compare 25 with the received 26.", 24),
    text(70, 519, "25 ≠ 26  →  mismatch  →  reject the block or request retransmission", 28, 'font-weight="700"'),
    text(70, 578, "A match cannot prove no error: 85, 120, 77 also gives checksum 26.", 25),
    text(70, 624, "Always use the algorithm stated in the question; checksum algorithms vary.", 23),
  ].join(""));
  return { "check-digit.svg": checkDigit, "byte-parity.svg": byteParity, "block-parity.svg": blockParity, "checksum.svg": checksum, ...teachingDiagrams() };
}

const lines = (x,y,values,size=24) => values.map((line,i)=>text(x,y+i*35,line,size)).join('');
const arrow = (x1,y,x2) => `<path d="M${x1} ${y}H${x2-13}" stroke="#23676b" stroke-width="4" fill="none"/><path d="M${x2-14} ${y-7}L${x2} ${y}L${x2-14} ${y+7}" fill="#23676b"/>`;
function teachingDiagrams() {
  const life = frame('Follow the data and the working service','The same examination record can face different problems at different stages.',[
    ...[
      ['ENTER','Source mark: 46','Teacher enters 64','Inaccurate value'],
      ['STORE','Correct mark saved','Only copy deleted','Data unavailable'],
      ['USE','Correct file exists','Application cannot start','Service unavailable'],
      ['SHARE','Record stays unchanged','Unauthorised disclosure','Privacy affected'],
    ].map((v,i)=>box(40+i*295,150,260,245)+lines(58+i*295,194,[v[0]],25)+lines(58+i*295,252,v.slice(1),21)),
    text(55,465,'Security protects against unauthorised access, loss and damage.',26),
    text(55,514,'Privacy concerns appropriate access, use and disclosure of personal data.',26),
    text(55,563,'Integrity concerns accuracy, completeness and consistency.',26),
    text(55,617,'One event may affect more than one property. Explain the actual consequence.',23),
  ].join(''));
  const pathRow = (top,title,stages,fill) => text(48,top,title,27,'font-weight="700"')+
    stages.map((stage,i)=>box(45+i*290,top+25,265,180,fill)+lines(64+i*290,top+68,stage,23)+(i<3?arrow(310+i*290,top+112,333+i*290):'')).join('');
  const phishing = frame('Phishing and pharming: identify the route','Both routes can reach an imitation sign-in page; their causes and precautions differ.',[
    pathRow(150,'PHISHING: a deceptive message persuades the user',[
      ['Urgent message','impersonates support'],['User follows','the supplied link'],['Imitation page','collects credentials'],['Attacker receives','the entered secret'],
    ],'#edf6f5'),
    pathRow(420,'PHARMING: the intended name is mapped to the wrong destination',[
      ['User types the','correct known name'],['Corrupted DNS or','local name mapping'],['Wrong server sends','an imitation page'],['Attacker receives','the entered secret'],
    ],'#fff4e9'),
    text(48,696,'Phishing: use an independently known contact or address to check the request.',23),
    text(48,739,'Pharming: protect or repair resolution settings; investigate certificate warnings.',23),
    text(48,782,'Typing the correct address avoids the supplied link; it does not repair a corrupted mapping.',22),
  ].join(''),820);
  const spyware = frame('Spyware: collection, disclosure and consequences','The installation, the captured information and the recipient are separate parts of the mechanism.',[
    ...[
      ['1  INSTALL','Unknown utility runs','with a hidden','monitoring component'],
      ['2  COLLECT','Keylogger records','the typed account','name and password'],
      ['3  DISCLOSE','A hidden log is sent','over a connection','to a third party'],
      ['4  MISUSE','The recipient can','attempt to sign in','as the account owner'],
    ].map((v,i)=>box(40+i*295,155,260,240)+lines(58+i*295,200,[v[0]],24)+lines(58+i*295,257,v.slice(1),22)+(i<3?arrow(300+i*295,278,333+i*295):'')),
    text(52,463,'Controlled installation reduces entry; anti-spyware can detect and isolate the component.',24),
    text(52,518,'Removal stops this installed component from collecting more information.',26),
    text(52,573,'It cannot erase the recipient’s existing log. Replace exposed credentials from a trusted device.',22),
    text(52,624,'Covert collection defines spyware; it does not have to replicate into other host files.',23),
  ].join(''));
  return {'data-lifecycle.svg':life,'phishing-pharming.svg':phishing,'spyware-route.svg':spyware};
}

export const section6Visual = (file,title,alt) => ({type:'reviewed-visual',title,asset:`/assets/course-v3/section-6/${file}`,alt,facts:[alt],caption:alt,review:'reviewed',layout:'mechanism',preserveText:true});
