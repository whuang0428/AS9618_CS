// Authored figures: the text and relationships remain editable and reproducible.
const colours = { ink: "#20262c", muted: "#52606b", line: "#bac2c8", blue: "#294c66", teal: "#366a69", pale: "#f4f6f7" };
const escape = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const text = (x, y, value, size = 28, weight = 400, colour = colours.ink) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${colour}">${escape(value)}</text>`;
const rule = (x1, y1, x2, y2, colour = colours.line) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colour}" stroke-width="1.5"/>`;
const rect = (x, y, width, height, fill = "white") => `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}" stroke="${colours.line}" stroke-width="1.5"/>`;
const arrow = (x1, y, x2) => `<path d="M${x1} ${y}H${x2}" fill="none" stroke="${colours.blue}" stroke-width="2" marker-end="url(#arrow)"/>`;
const frame = (title, description, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900" role="img" aria-labelledby="title description"><title id="title">${escape(title)}</title><desc id="description">${escape(description)}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1L9 5L0 9" fill="none" stroke="${colours.blue}" stroke-width="1.5"/></marker></defs><rect width="1440" height="900" fill="white"/><g font-family="Arial, Helvetica, sans-serif">${text(60, 74, title, 38, 600)}${rule(60, 107, 1380, 107)}${body}</g></svg>`;

function table(x, y, widths, headers, rows, rowHeight = 64) {
  const positions = [x];
  widths.forEach(width => positions.push(positions.at(-1) + width));
  const width = widths.reduce((sum, value) => sum + value, 0);
  const height = rowHeight * (rows.length + 1);
  let body = rect(x, y, width, height) + rect(x, y, width, rowHeight, colours.pale);
  positions.slice(1, -1).forEach(position => { body += rule(position, y, position, y + height); });
  [headers, ...rows].forEach((row, rowIndex) => {
    if (rowIndex > 0) body += rule(x, y + rowIndex * rowHeight, x + width, y + rowIndex * rowHeight);
    row.forEach((value, column) => { body += text(positions[column] + 18, y + rowIndex * rowHeight + rowHeight / 2 + 10, value, 28, rowIndex === 0 ? 600 : 400); });
  });
  return body;
}

function modelling() {
  const description = "The school rule states that each student has one tutor and one tutor may advise many students. Tutor has TutorID as its primary key and TutorName. Student has StudentID as its primary key, StudentName, TutorID as a required foreign key, and Mark. Student.TutorID references Tutor.TutorID. If a student may have several tutors, the model needs a StudentTutor association instead of one tutor reference.";
  return frame("Data modelling: from a business rule to a relationship", description,
    text(60, 164, "Confirm the organisation’s rule", 29, 600, colours.blue) +
    text(60, 212, "Each student has one tutor. One tutor may advise many students.") +
    text(60, 260, "Identify the entities, assign their attributes, then represent the relationship.", 28, 400, colours.muted) +
    text(80, 335, "Tutor", 32, 600) +
    table(80, 356, [105, 395], ["Key", "Attribute"], [["PK", "TutorID"], ["", "TutorName"]], 62) +
    text(860, 335, "Student", 32, 600) +
    table(860, 356, [105, 395], ["Key", "Attribute"], [["PK", "StudentID"], ["", "StudentName"], ["FK", "TutorID (required)"], ["", "Mark"]], 62) +
    `<path d="M580 449H710V573H860" fill="none" stroke="${colours.blue}" stroke-width="2.5"/>` +
    text(615, 430, "1", 30, 600, colours.blue) + text(762, 552, "many", 30, 600, colours.blue) +
    text(80, 727, "Student.TutorID references Tutor.TutorID.", 29, 600, colours.teal) +
    rule(60, 762, 1380, 762) +
    text(60, 807, "Validate a changed rule: if a student may have several tutors,") +
    text(60, 849, "one TutorID field is insufficient; model a StudentTutor association."));
}

function accessRights() {
  const description = "In this example policy, Readers may retrieve Student records but cannot insert them; Editors may retrieve and insert. Three independent attempts restart from the same state: Editor inserts student 22, Ben, tutor 7, mark 80, which is permitted and valid; Reader attempts the same row but permission is denied; Editor attempts student 23, Chen, tutor 9, mark 80, but the missing tutor reference fails integrity checks. Tutor 7 exists, tutor 9 does not, StudentID must be unique, and Mark must be between zero and one hundred.";
  return frame("Access rights: permission and integrity are separate checks", description,
    text(60, 164, "Example group policy for an authenticated account", 29, 600, colours.blue) +
    table(60, 192, [400, 460, 460], ["Group", "Retrieve Student", "Insert Student"], [["Readers", "Allowed", "Denied"], ["Editors", "Allowed", "Allowed"]], 58) +
    text(60, 432, "Independent insertion attempts — restart from the same records", 29, 600, colours.blue) +
    table(60, 461, [540, 210, 280, 290], ["Request", "Permission", "Integrity", "Stored result"], [
      ["Editor: (22, Ben, 7, 80)", "Allowed", "Passes rules", "Student added"],
      ["Reader: (22, Ben, 7, 80)", "Denied", "Same valid row", "No change"],
      ["Editor: (23, Chen, 9, 80)", "Allowed", "Tutor 9 absent", "No change"],
    ], 72) +
    text(60, 808, "Row order: StudentID, StudentName, TutorID, Mark.", 28, 400, colours.muted) +
    text(60, 854, "Tutor 7 exists; Tutor 9 does not. StudentID is unique; Mark must be 0–100.", 28));
}

function developerInterface() {
  const description = "A developer configures three DBMS objects. The Student table defines StudentID as the primary key, StudentName, TutorID as a foreign key and a Mark range of zero to one hundred. The entry form binds four controls to those fields. The report formats StudentName and Mark; the illustrated preview shows Amina 73 and Ben 80 after a successful insertion. When an Editor submits the form for student 22, Ben, tutor 7, mark 80, the DBMS checks permission and constraints before storing the new row. Form checks assist input; database rules also apply to requests made through other tools.";
  const formRows = [["StudentID", "22"], ["StudentName", "Ben"], ["TutorID", "7"], ["Mark", "80"]];
  const form = formRows.map(([label, value], index) => {
    const y = 247 + index * 59;
    return text(520, y + 35, label, 28) + rect(728, y, 192, 48) + text(746, y + 34, value, 28);
  }).join("");
  return frame("Developer interface: configure objects before use", description,
    text(60, 159, "Define the structure, arrange input controls and format retrieved information.", 28, 400, colours.muted) +
    text(60, 220, "Table definition", 30, 600, colours.blue) +
    text(520, 220, "Student-entry form", 30, 600, colours.blue) +
    text(980, 220, "Class-list report", 30, 600, colours.blue) +
    rule(480, 200, 480, 550) + rule(960, 200, 960, 550) +
    table(60, 247, [280, 120], ["Student field", "Rule"], [["StudentID", "PK"], ["StudentName", ""], ["TutorID", "FK"], ["Mark", "0–100"]], 58) +
    form + rect(728, 492, 192, 48, colours.pale) + text(778, 526, "Submit", 28) +
    text(980, 277, "Preview after insertion", 28, 400, colours.muted) +
    table(980, 305, [280, 120], ["StudentName", "Mark"], [["Amina", "73"], ["Ben", "80"]], 65) +
    rule(60, 586, 1380, 586) +
    text(60, 633, "When an Editor submits the form", 29, 600, colours.blue) +
    rect(60, 663, 365, 106) + text(78, 704, "Form sends a request", 28, 600) + text(78, 746, "(22, Ben, 7, 80)", 28) +
    arrow(425, 716, 505) +
    rect(515, 663, 405, 106) + text(533, 704, "DBMS checks", 28, 600) + text(533, 746, "Permission + constraints", 28) +
    arrow(920, 716, 1000) +
    rect(1010, 663, 370, 106) + text(1028, 704, "Student record stored", 28, 600) + text(1028, 746, "Form confirms success", 28) +
    text(60, 815, "Form checks assist input. Database rules must also apply to requests", 28) +
    text(60, 857, "from another form or query tool.", 28));
}

export function renderSection8AcademicFigures() {
  return [
    { path: "/assets/course-v3/section-8/data-modelling-academic.svg", svg: modelling() },
    { path: "/assets/course-v3/section-8/access-rights-academic.svg", svg: accessRights() },
    { path: "/assets/course-v3/section-8/developer-interface-academic.svg", svg: developerInterface() },
  ];
}
