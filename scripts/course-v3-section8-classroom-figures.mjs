// Exact, editable figures for the beginner classroom sequence.
// Cardinality labels describe permitted associations, not processing order.
const colours = { ink: '#202a32', muted: '#52606b', blue: '#254f68', line: '#aebbc4', fill: '#f2f5f7' };
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, value, size = 28, weight = 400, fill = colours.ink, anchor = 'start') => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${escape(value)}</text>`;
const line = (x1, y1, x2, y2, stroke = colours.line, width = 1.6) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}"/>`;

function entity(x, y, width, name, meaning, fields) {
  const header = 64;
  const row = 54;
  const height = header + fields.length * row;
  return `<g data-entity="${name}">${text(x, y - 19, meaning, 26, 400, colours.muted)}
    <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="white" stroke="${colours.blue}" stroke-width="2"/>
    <rect x="${x}" y="${y}" width="${width}" height="${header}" fill="${colours.fill}"/>
    ${line(x, y + header, x + width, y + header, colours.blue)}
    ${text(x + 20, y + 43, name, 34, 600)}
    ${fields.map(([key, name], index) => {
      const baseline = y + header + index * row + 37;
      return text(x + 20, baseline, key, 25, 600, colours.blue)
        + text(x + 82, baseline, name, 30)
        + (index + 1 < fields.length ? line(x + 18, baseline + 17, x + width - 18, baseline + 17) : '');
    }).join('')}
  </g>`;
}

function relationship(from, to, path, one, many, label, labelPosition) {
  return `<g data-from="${from}" data-to="${to}">
    <path d="${path}" fill="none" stroke="${colours.blue}" stroke-width="2.8"/>
    ${text(...one, '1', 30, 600, colours.blue)}
    ${text(...many, '0..*', 30, 600, colours.blue)}
    ${text(...labelPosition, label, 25, 400, colours.muted, 'middle')}
  </g>`;
}

function libraryER() {
  const title = 'Library ER design: titles, copies and borrowing events';
  const description = 'Book has primary key BookID and Title. Copy has primary key CopyID and foreign key BookID referring to Book. Loan has primary key LoanID, foreign keys CopyID and MemberID, and BorrowDate. Member has primary key MemberID and MemberName. One Book may have zero or many Copies; every Copy belongs to exactly one Book. One Copy may have zero or many Loans over time; every Loan names exactly one Copy. One Member may have zero or many Loans; every Loan names exactly one Member. Repeated borrowing uses a new LoanID. Preventing overlapping active loans for one copy requires an additional business rule.';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1040" viewBox="0 0 1600 1040" role="img" aria-labelledby="library-er-title library-er-description">
    <title id="library-er-title">${escape(title)}</title>
    <desc id="library-er-description">${escape(description)}</desc>
    <style>text{font-family:Arial,Helvetica,sans-serif}line,path,rect{vector-effect:non-scaling-stroke}</style>
    <rect width="1600" height="1040" fill="white"/>
    ${text(60, 65, title, 40, 600)}
    ${text(60, 111, 'Each line represents a relationship. Read the number at both ends.', 28, 400, colours.muted)}
    ${line(60, 137, 1540, 137)}
    ${entity(60, 209, 340, 'Book', 'A catalogue title', [['PK', 'BookID'], ['', 'Title']])}
    ${entity(600, 209, 340, 'Copy', 'One physical item', [['PK', 'CopyID'], ['FK', 'BookID']])}
    ${entity(1160, 209, 380, 'Loan', 'One borrowing event', [['PK', 'LoanID'], ['FK', 'CopyID'], ['FK', 'MemberID'], ['', 'BorrowDate']])}
    ${entity(600, 500, 340, 'Member', 'A registered person', [['PK', 'MemberID'], ['', 'MemberName']])}
    ${relationship('Book', 'Copy', 'M400 303H600', [421, 284], [522, 284], 'has copies', [500, 341])}
    ${relationship('Copy', 'Loan', 'M940 303H1160', [961, 284], [1082, 284], 'appears in', [1050, 341])}
    ${relationship('Member', 'Loan', 'M940 594H1048V454H1160', [961, 575], [1082, 435], 'has loans', [1143, 590])}
    ${line(60, 724, 1540, 724)}
    ${text(60, 772, 'PK: primary key   ·   FK: foreign key   ·   1: exactly one   ·   0..*: zero, one or many', 27, 600, colours.blue)}
    ${text(60, 829, 'Each Copy has exactly one Book; a Book may have zero or many Copies.', 28)}
    ${text(60, 879, 'Each Loan has exactly one Copy and one Member; each may have zero or many Loans.', 28)}
    ${text(60, 929, 'Loans describe history: borrowing the same copy again creates a new LoanID.', 28)}
    ${text(60, 984, 'Preventing overlapping active loans is an additional rule, beyond these relationship lines.', 27, 400, colours.muted)}
  </svg>`;
}

export function renderSection8ClassroomFigures() {
  return [{ asset: '/assets/course-v3/section-8/library-er-academic.svg', svg: libraryER() }];
}
