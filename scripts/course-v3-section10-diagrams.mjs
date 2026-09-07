// Numeric diagrams use explicit rows so values and indices remain reviewable.
export const section10Diagrams = {
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
const facts = g => [...g.rows.map(row => row.map((value, i) => `${g.headers[i]}: ${value}`).join("; ") + "."), ...g.notes];
export const diagramPath = key => `/assets/course-v3/section-10/${key}.svg`;
export function diagramFor(key) {
  const g = section10Diagrams[key];
  if (!g) throw new Error(`Unknown S10 diagram: ${key}`);
  return { type: "reviewed-visual", title: g.title, asset: diagramPath(key), alt: g.notes.join(" "), facts: facts(g), caption: g.notes[0], review: "reviewed" };
}
export const section10DiagramFiles = () => Object.fromEntries(Object.entries(section10Diagrams).map(([key, value]) => [`${key}.svg`, render(value)]));
