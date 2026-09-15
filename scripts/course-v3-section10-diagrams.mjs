// Numeric diagrams use explicit rows so values and indices remain reviewable.
export const section10Diagrams = {
  "matrix-totals": {
    title: "One matrix, three kinds of total",
    headers: ["Row / column", "Column 1", "Column 2", "Column 3", "Row total"],
    rows: [["Row 1", 4, 7, 2, 13], ["Row 2", 8, 1, 6, 15], ["Column totals", 12, 8, 8, "Grand: 28"]],
    notes: ["13 + 15 = 28 and 12 + 8 + 8 = 28: both checks account for the same six values.", "A row total holds the row fixed; a column total holds the column fixed."],
  },
  "file-lifecycle": {
    title: "Save, close, extend, close, then read back",
    custom: "file", height: 850,
    notes: ["Names.txt starts with Old. WRITE replaces it with Ada, a blank line and Bo.", "After closing, APPEND adds Cy. Close and reopen FOR READ: four lines, including the blank."],
    facts: ["Initial contents: Old.", "WRITE session: Ada, empty string, Bo; close.", "APPEND session: Cy; close.", "READ session outputs Ada, empty string, Bo, Cy; close; output count 4."],
  },
  "linked-boundaries": {
    title: "Boundary cases change the head or a null link",
    custom: "linked", height: 660,
    notes: ["Each row is a separate case; null link = 0. Numbered boxes are physical array slots.", "Head insertion links the new node to the old head. Deleting the only node leaves Head = 0."],
    facts: ["Empty insertion: Head 0 becomes Head 3, with Data[3] X and Next[3] 0.", "Head insertion: the old chain 2(A),4(B),1(C) gains node 3(X) before 2.", "Only-node deletion: Head 3 and Next[3] 0 become Head 0; release slot 3."],
  },
  "booking-flow": {
    title: "One request: accept or reject, then continue",
    custom: "booking", height: 860,
    notes: ["All coordinates are valid and capacity is sufficient in this example. Requests use FIFO.", "Only a successful change enters the undo stack; Undo restores the saved previous state."],
    facts: ["If the request queue is empty, stop processing requests.", "Otherwise dequeue the earliest request and inspect its seat.", "An occupied seat is rejected with no occupancy or undo change; append REJECT.", "An available seat is changed to TRUE, its previous FALSE state is pushed, and ACCEPT is appended.", "Both branches return to the queue check. A later Undo pops the latest successful change, restores its old value and appends UNDO."],
  },
  matrix: {
    title: "Rows are horizontal; columns are vertical",
    headers: ["Row / column", "Column 1", "Column 2", "Column 3"],
    rows: [["Row 1", "4 · visit 1", "7 · visit 2", "2 · visit 3"], ["Row 2", "8 · visit 4", "1 · visit 5", "6 · visit 6"]],
    notes: ["Scores[2, 3] = 6. Each element uses a row index and a column index.", "Ascending nested loops visit (1,1), (1,2), (1,3), then (2,1), (2,2), (2,3)."],
  },
  bubble: {
    title: "Bubble sort: array after each complete pass",
    headers: ["Completed pass", "1", "2", "3", "4", "5", "6", "7"],
    rows: [["Input", 5, 1, 4, 2, 8, 3, 7], ["Pass 1", 1, 4, 2, 5, 3, 7, 8], ["Pass 2", 1, 2, 4, 3, 5, 7, 8], ["Pass 3", 1, 2, 3, 4, 5, 7, 8], ["Pass 4: no swaps", 1, 2, 3, 4, 5, 7, 8]],
    notes: ["Compare adjacent elements from left to right; swap only if the left value is greater.", "After pass 3 the values are sorted. Pass 4 detects that no further swap is needed."],
  },
  stack: {
    title: "A stack removes the most recently added item",
    headers: ["Operation", "Index 1", "Index 2", "Index 3", "Top"],
    rows: [["Empty", "—", "—", "—", 0], ["PUSH A", "A", "—", "—", 1], ["PUSH B", "A", "B", "—", 2], ["PUSH C", "A", "B", "C", 3], ["POP returns C", "A", "B", "unused", 2]],
    notes: ["Top identifies the last occupied position; Top = 0 means empty in this 1-based model.", "A popped value may remain in memory, but its position is outside the active stack."],
  },
  queue: {
    title: "A queue removes the earliest item still waiting",
    headers: ["Operation", "Index 1", "Index 2", "Index 3", "Front / Rear / Count"],
    rows: [["ENQUEUE A", "A", "—", "—", "1 / 1 / 1"], ["ENQUEUE B", "A", "B", "—", "1 / 2 / 2"], ["DEQUEUE returns A", "unused", "B", "—", "2 / 2 / 1"], ["ENQUEUE C", "unused", "B", "C", "2 / 3 / 2"], ["ENQUEUE D: wrap", "D", "B", "C", "2 / 1 / 3"]],
    notes: ["This circular queue uses Count to distinguish empty (0) from full (3).", "The logical order is B, C, D even though D is stored at array index 1."],
  },
  linked: {
    title: "Follow links, not consecutive array positions",
    headers: ["Array index", "Data", "Next", "Reachability"],
    rows: [[1, "C", 0, "Last active node"], [2, "A", 4, "Head = 2"], [3, "unused", 0, "Free slot"], [4, "B", 1, "Second active node"]],
    notes: ["Head = 2 and null link = 0. Traversal follows 2 → 4 → 1 → 0, producing A, B, C.", "Inserting X at slot 3 after A sets Next[3] = 4, then Next[2] = 3."],
  },
  choice: {
    title: "Choose dimensions from the required indices",
    headers: ["Task", "Structure", "Required access"],
    rows: [["One total per day", "1D array", "Totals[Day]"], ["One mark per pupil per test", "2D array", "Marks[Pupil, Test]"], ["One occupancy flag per seat", "2D array", "Occupied[Row, Seat]"], ["One total per performance", "1D array", "Bookings[Performance]"]],
    notes: ["A 2D array uses two indices separated by a comma, for example Marks[2, 3].", "One index identifies each 1D value; two independent indices identify each 2D value."],
  },
};
const esc = s => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
function wrap(text, limit) {
  const lines = [""];
  for (const word of String(text).split(" ")) {
    const last = lines.length - 1;
    if (lines[last] && (lines[last] + " " + word).length > limit) lines.push(word);
    else lines[last] += (lines[last] ? " " : "") + word;
  }
  return lines;
}
function render(g) {
  if (g.custom) return renderConcept(g);
  const width = 1100, left = 30, first = g.headers.length > 5 ? 250 : 240;
  const cell = (width - 60 - first) / (g.headers.length - 1);
  const rowHeight = 90, top = 100, height = top + (g.rows.length + 1) * rowHeight + 170;
  const rows = [g.headers, ...g.rows].map((row, r) => row.map((value, c) => {
    const x = c === 0 ? left : left + first + (c - 1) * cell, w = c === 0 ? first : cell;
    const lines = wrap(value, Math.max(4, Math.floor(w / 13)));
    return `<g data-row="${r}" data-column="${c}"><rect x="${x}" y="${top + r * rowHeight}" width="${w}" height="${rowHeight}" fill="${r === 0 ? "#e2edf2" : r % 2 ? "#ffffff" : "#f2f7f8"}" stroke="#91a8b4"/><text x="${x + 12}" y="${top + r * rowHeight + 30}" font-size="23" fill="#16394d">${lines.map((line, i) => `<tspan x="${x + 12}" dy="${i ? 27 : 0}">${esc(line)}</tspan>`).join("")}</text></g>`;
  }).join("")).join("");
  const notes = g.notes.flatMap(n => wrap(n, 92));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc"><title id="title">${esc(g.title)}</title><desc id="desc">${esc(facts(g).join(" "))}</desc><rect width="100%" height="100%" fill="white"/><g font-family="Arial, Helvetica, sans-serif"><text x="30" y="54" fill="#15354d" font-size="30" font-weight="700">${esc(g.title)}</text>${rows}<text x="30" y="${top + (g.rows.length + 1) * rowHeight + 36}" fill="#244b65" font-size="22">${notes.map((line, i) => `<tspan x="30" dy="${i ? 28 : 0}">${esc(line)}</tspan>`).join("")}</text></g></svg>`;
}
const facts = g => [...(g.facts ?? g.rows.map(row => row.map((value, i) => `${g.headers[i]}: ${value}`).join("; ") + ".")), ...g.notes];
export const diagramPath = key => `/assets/course-v3/section-10/${key}.svg`;
export function diagramFor(key) {
  const g = section10Diagrams[key];
  if (!g) throw new Error(`Unknown S10 diagram: ${key}`);
  return { type: "reviewed-visual", title: g.title, asset: diagramPath(key), alt: g.notes.join(" "), facts: facts(g), caption: g.notes[0], review: "reviewed" };
}
export const section10DiagramFiles = () => Object.fromEntries(Object.entries(section10Diagrams).map(([key, value]) => [`${key}.svg`, render(value)]));

// Exact SVG geometry; labels stay editable alongside their text alternatives.
function renderConcept(g) {
  const text = (x, y, lines, size = 24, anchor = "start") => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="#16394d">${lines.map((line, i) => `<tspan x="${x}" dy="${i ? 31 : 0}">${esc(line)}</tspan>`).join("")}</text>`;
  const box = (x, y, w, h, lines, fill = "#eef5f7") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="#668494" stroke-width="2"/>${text(x + 20, y + 35, lines)}`;
  const arrow = d => `<path d="${d}" fill="none" stroke="#24576d" stroke-width="3" marker-end="url(#arrow)"/>`;
  let content;
  if (g.custom === "file") content = [
    box(80,100,940,85,["Before opening: Names.txt contains one line: Old."]),
    arrow("M550 185 V220"),
    box(80,225,940,115,["WRITE → write Ada, an empty string, then Bo → CLOSE", "Saved lines: Ada | [blank line] | Bo"]),
    arrow("M550 340 V380"),
    box(80,385,940,115,["APPEND → write Cy → CLOSE", "Saved lines: Ada | [blank line] | Bo | Cy"]),
    arrow("M550 500 V540"),
    box(80,545,940,115,["READ → while NOT EOF: read, display, count → CLOSE", "Outputs: Ada | [blank line] | Bo | Cy | count 4"]),
    text(80,710,["[blank line] labels a zero-character line in this diagram.", "It is not the literal text stored or displayed by the program."]),
  ].join("");
  if (g.custom === "linked") content = [
    text(50,110,["1. Insert into empty list: Head 0 → 3"],26),
    box(50,140,190,70,["Head = 3"]), arrow("M240 175 H300"), box(305,140,230,70,["3: X | Next 0"]), arrow("M535 175 H600"), box(605,140,130,70,["0 / null"]),
    text(50,265,["2. Insert X at head of 2(A) → 4(B) → 1(C) → 0"],26),
    box(50,295,195,70,["Head = 3"]), arrow("M245 330 H280"), box(285,295,135,70,["3: X"]), arrow("M420 330 H455"), box(460,295,135,70,["2: A"]), arrow("M595 330 H630"), box(635,295,135,70,["4: B"]), arrow("M770 330 H805"), box(810,295,135,70,["1: C"]), arrow("M945 330 H985"), text(1000,339,["0"]),
    text(50,420,["3. Delete the only node: Head 3 → 0; release slot 3"],26),
    box(50,450,195,70,["Head = 0"]), arrow("M245 485 H300"), box(305,450,130,70,["0 / null"]), box(530,450,480,70,["Slot 3 is now available for reuse."]),
  ].join("");
  if (g.custom === "booking") content = [
    box(335,100,430,75,["Any waiting requests?"]),
    arrow("M765 138 H865"), text(785,123,["No"]), box(870,103,180,70,["Finish"]),
    arrow("M550 175 V215"),text(570,204,["Yes"]),
    box(310,220,480,105,["Dequeue earliest request.","Inspect Occupied[Row, Seat]."]),
    arrow("M550 325 V365"), box(365,370,370,70,["Is the seat occupied?"]),
    arrow("M365 405 H235 V470"),text(255,389,["Yes"]),
    arrow("M735 405 H855 V470"),text(780,389,["No"]),
    box(55,475,425,145,["Keep occupancy unchanged.","Keep undo stack unchanged.","Append REJECT event."]),
    box(595,475,455,145,["Save old state; set seat TRUE.","Push the saved undo record.","Append ACCEPT event."]),
    arrow("M235 620 V665 H30 V138 H330"),
    arrow("M855 620 V665 H235"),
    text(320,698,["Both branches return to the queue check."],24),
    box(80,735,940,85,["Later Undo: pop latest success → restore old state → append UNDO."]),
  ].join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="${g.height}" viewBox="0 0 1100 ${g.height}" role="img" aria-labelledby="title desc"><title id="title">${esc(g.title)}</title><desc id="desc">${esc(facts(g).join(" "))}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="#24576d"/></marker></defs><rect width="100%" height="100%" fill="white"/><g font-family="Arial, Helvetica, sans-serif">${text(30,55,[g.title],30)}${content}</g></svg>`;
}
