// Exact numeric diagrams: SVG text and arithmetic remain inspectable and reproducible.
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
  const original = ["10110010", "01100000", "11000110"];
  const parity = Array.from({ length: 8 }, (_, i) => original.reduce((n, row) => n ^ Number(row[i]), 0)).join("");
  const received = [original[0], "01101000", original[2], parity];
  const blockParity = frame("Block parity: locate one changed bit", "Even parity in every row and column · the parity row was sent with the original block", [
    ...Array.from({ length: 8 }, (_, i) => centred(360+i*85, 156, i+1, 24)),
    ...received.flatMap((row, r) => [text(52, 219+r*75, r === 3 ? "Parity row" : `Received row ${r+1}`, 23), ...[...row].map((b, c) => box(326+c*85,179+r*75,68,55, r === 1 || c === 4 ? "#fff0e5" : "#edf6f5", r === 1 && c === 4 ? "#aa4824" : "#bdd3d4")+centred(360+c*85,218+r*75,b,30))]),
    text(1030, 294, "FAIL", 24, 'fill="#aa4824" font-weight="700"'),
    centred(700, 507, "FAIL", 24, 'fill="#aa4824" font-weight="700"'),
    text(52, 565, "Row 2 and column 5 fail. Their intersection contains the changed bit.", 27),
    text(52, 611, "Correct row 2, column 5: 1 → 0. Then check all rows and columns again.", 25),
    text(52, 657, "Original row 2: 01100000. Sent parity row: " + parity + ".", 23),
    text(52, 700, "Single-bit assumption: several changed bits may not be located or even detected.", 23),
  ].join(""), 740);
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
  return { "check-digit.svg": checkDigit, "byte-parity.svg": byteParity, "block-parity.svg": blockParity, "checksum.svg": checksum };
}
