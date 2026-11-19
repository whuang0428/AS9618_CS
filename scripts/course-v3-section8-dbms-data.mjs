// One authored fixture feeds the reading tables, ER model and real DBMS.
export const libraryTables = [
  { title: 'Member', headers: ['MemberID (PK)', 'MemberName', 'SchoolEmail (UNIQUE)', 'TutorGroup', 'Active'], rows: [[1, 'Asha', 'asha@school.example', '8A', true], [2, 'Ben', 'ben@school.example', '8A', true], [3, 'Chen', 'chen@school.example', '8B', false], [4, 'Dara', 'dara@school.example', '8B', true]] },
  { title: 'MemberCard', headers: ['MemberID (PK, FK)', 'CardCode (UNIQUE)', 'IssueDate'], rows: [[1, 'CARD01', '2027-09-01'], [2, 'CARD02', '2027-09-01'], [3, 'CARD03', '2027-09-02'], [4, 'CARD04', '2027-09-02']] },
  { title: 'Book', headers: ['BookID (PK)', 'Title', 'Category'], rows: [[1, 'Atlas', 'Reference'], [2, 'Orbit', 'Fiction'], [3, 'River', 'Fiction']] },
  { title: 'Copy', headers: ['CopyID (PK)', 'BookID (FK)', 'ShelfCode'], rows: [[101, 1, 'A1'], [102, 1, 'A1'], [103, 2, 'B1'], [104, 3, 'B2']] },
  { title: 'Loan', headers: ['LoanID (PK)', 'MemberID (FK)', 'CopyID (FK)', 'BorrowDate', 'BorrowTime', 'Fee', 'Returned'], rows: [[201, 1, 101, '2027-11-01', '09:15:00', 2, false], [202, 1, 102, '2027-10-01', '10:00:00', 4, true], [203, 2, 102, '2027-11-02', '11:20:00', 6, false], [204, 3, 103, '2027-10-03', '14:30:00', 0, true], [205, 2, 103, '2027-11-03', '12:10:00', 3, false]] },
];

export const libraryDefinitionSql = `CREATE TABLE Member (
  MemberID INTEGER PRIMARY KEY,
  MemberName VARCHAR(40) NOT NULL,
  SchoolEmail VARCHAR(80) UNIQUE NOT NULL,
  TutorGroup VARCHAR(4),
  Active BOOLEAN NOT NULL
);
CREATE TABLE MemberCard (
  MemberID INTEGER PRIMARY KEY REFERENCES Member(MemberID),
  CardCode CHARACTER(6) UNIQUE NOT NULL,
  IssueDate DATE NOT NULL
);
CREATE TABLE Book (
  BookID INTEGER PRIMARY KEY,
  Title VARCHAR(60) NOT NULL,
  Category VARCHAR(20)
);
CREATE TABLE Copy (
  CopyID INTEGER PRIMARY KEY,
  BookID INTEGER NOT NULL REFERENCES Book(BookID),
  ShelfCode VARCHAR(8)
);
CREATE TABLE Loan (
  LoanID INTEGER PRIMARY KEY,
  MemberID INTEGER NOT NULL REFERENCES Member(MemberID),
  CopyID INTEGER NOT NULL REFERENCES Copy(CopyID),
  BorrowDate DATE NOT NULL,
  BorrowTime TIME NOT NULL,
  Fee REAL NOT NULL CHECK (Fee >= 0),
  Returned BOOLEAN NOT NULL
);`;

const literal = value => typeof value === 'string' ? `'${value.replaceAll("'", "''")}'` : typeof value === 'boolean' ? String(value).toUpperCase() : String(value);
export const libraryInsertSql = libraryTables.map(table => `INSERT INTO ${table.title} VALUES\n${table.rows.map(row => `(${row.map(literal).join(', ')})`).join(',\n')};`).join('\n');
export const librarySetupSql = `${libraryDefinitionSql}\n${libraryInsertSql}`;
export const libraryRolesSql = `CREATE ROLE library_readers;
CREATE ROLE library_writers;
CREATE ROLE student_user IN ROLE library_readers;
CREATE ROLE librarian_user IN ROLE library_writers;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO library_readers;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO library_writers;`;

const example = (title, sql, headers, rows, note = '') => ({ title, sql, ...(headers ? { expected: { headers, rows } } : {}), note });
export const sqlExamples = {
  default: example('Inspect the members', 'SELECT * FROM Member ORDER BY MemberID;'),
  'dictionary-add-note': example('Add a field and inspect the dictionary', 'ALTER TABLE Member ADD Note VARCHAR(80);', null, null, 'Adds a column, not a member. Compare Schema and Dictionary after running.'),
  'integrity-duplicate': example('Reject a duplicate primary key', "INSERT INTO Member VALUES (1, 'Another member', 'another@school.example', '8A', TRUE);", null, null, 'Expected rejection: MemberID 1 already exists. No duplicate member is stored.'),
  'integrity-orphan': example('Reject a missing referenced member', "INSERT INTO Loan VALUES (207, 99, 104, '2027-11-04', '09:00:00', 1, FALSE);", null, null, 'Expected rejection: MemberID 99 does not exist.'),
  'integrity-negative': example('Reject a negative fee', 'UPDATE Loan SET Fee = -1 WHERE LoanID = 201;', null, null, 'Expected rejection: the declared CHECK requires a non-negative fee.'),
  'integrity-delete-parent': example('Protect a referenced member', 'DELETE FROM Member WHERE MemberID = 1;', null, null, 'Expected rejection: a current card and loans still refer to this member.'),
  'security-read': example('Read as a student', 'SELECT MemberID, MemberName FROM Member ORDER BY MemberID;', ['memberid', 'membername'], [[1, 'Asha'], [2, 'Ben'], [3, 'Chen'], [4, 'Dara']], 'Select Student in the user selector. The readers group can SELECT.'),
  'security-write': example('Try writing as a student', 'UPDATE Loan SET Returned = TRUE WHERE LoanID = 203;', null, null, 'Run as Student, then Librarian. The same SQL meets different access rights.'),
  'backup-change': example('Make a change after the backup', 'UPDATE Loan SET Returned = TRUE, Fee = 0 WHERE LoanID = 203;', null, null, 'Create a backup first. After this update, restore it and inspect Loan 203.'),
  select: example('SELECT … FROM', 'SELECT MemberID, MemberName\nFROM Member\nORDER BY MemberID;', ['memberid', 'membername'], [[1, 'Asha'], [2, 'Ben'], [3, 'Chen'], [4, 'Dara']]),
  where: example('WHERE selects records', 'SELECT LoanID, Fee\nFROM Loan\nWHERE Returned = FALSE AND Fee >= 3\nORDER BY LoanID;', ['loanid', 'fee'], [[203, 6], [205, 3]]),
  order: example('ORDER BY sorts the result', 'SELECT LoanID, Fee\nFROM Loan\nORDER BY Fee DESC, LoanID ASC;', ['loanid', 'fee'], [[203, 6], [202, 4], [205, 3], [201, 2], [204, 0]]),
  group: example('GROUP BY forms one summary per member', 'SELECT MemberID, COUNT(*) AS LoanCount, SUM(Fee) AS TotalFee\nFROM Loan\nGROUP BY MemberID\nORDER BY MemberID;', ['memberid', 'loancount', 'totalfee'], [[1, 2, 6], [2, 2, 9], [3, 1, 0]]),
  join: example('INNER JOIN follows a reference', 'SELECT Member.MemberName, Loan.LoanID\nFROM Member INNER JOIN Loan\nON Member.MemberID = Loan.MemberID\nORDER BY Loan.LoanID;', ['membername', 'loanid'], [['Asha', 201], ['Asha', 202], ['Ben', 203], ['Chen', 204], ['Ben', 205]]),
  aggregate: example('SUM, COUNT and AVG', 'SELECT SUM(Fee) AS TotalFee, COUNT(*) AS LoanCount, AVG(Fee) AS MeanFee\nFROM Loan;', ['totalfee', 'loancount', 'meanfee'], [[15, 5, 3]]),
  combined: example('Combine JOIN, WHERE, GROUP BY and ORDER BY', 'SELECT Member.MemberID, Member.MemberName, COUNT(*) AS LoanCount, SUM(Loan.Fee) AS TotalFee\nFROM Member INNER JOIN Loan ON Member.MemberID = Loan.MemberID\nWHERE Loan.Returned = FALSE\nGROUP BY Member.MemberID, Member.MemberName\nORDER BY SUM(Loan.Fee) DESC, Member.MemberID;', ['memberid', 'membername', 'loancount', 'totalfee'], [[2, 'Ben', 2, 9], [1, 'Asha', 1, 2]]),
  'create-database': example('1. Create a separate database', 'CREATE DATABASE LibraryBuild;', null, null, 'Run as Administrator. Creating LibraryBuild does not switch the connection. Select librarybuild and Connect next.'),
  'create-tables': example('2. Define the five library tables', libraryDefinitionSql, null, null, 'Connect to your empty LibraryBuild database first. The shared SchoolLibrary database already contains these tables.'),
  'insert-fixture': example('3. Add the five-table library records', libraryInsertSql, null, null, 'Run only after creating the empty five tables in LibraryBuild.'),
  'alter-column': example('ALTER TABLE adds an attribute', 'ALTER TABLE Member ADD Note VARCHAR(80);', null, null, 'Schema and Dictionary gain Note. Existing records initially contain NULL for it.'),
  'add-primary-key': example('Add a primary key to a table', 'CREATE TABLE ReadingGroup (GroupID INTEGER, GroupName VARCHAR(40));\nALTER TABLE ReadingGroup ADD PRIMARY KEY (GroupID);', null, null, 'An extra practice table avoids removing the working library’s primary keys.'),
  'add-foreign-key': example('Add a foreign key with REFERENCES', 'CREATE TABLE ReadingGroupMember (GroupID INTEGER, MemberID INTEGER, PRIMARY KEY (GroupID, MemberID));\nALTER TABLE ReadingGroupMember ADD FOREIGN KEY (MemberID) REFERENCES Member(MemberID);', null, null, 'Adds an extra practice association table. The new foreign key refers to Member’s existing primary key.'),
  insert: example('INSERT INTO adds a record', "INSERT INTO Member (MemberID, MemberName, SchoolEmail, TutorGroup, Active)\nVALUES (5, 'Elena', 'elena@school.example', '8B', TRUE);", null, null, 'MemberID and SchoolEmail must both be unused. A second identical attempt is correctly rejected.'),
  update: example('UPDATE changes selected records', 'UPDATE Loan\nSET Returned = TRUE, Fee = 0\nWHERE LoanID = 203;', null, null, 'Predict which single record changes before running.'),
  delete: example('DELETE FROM removes selected records', 'DELETE FROM Loan\nWHERE LoanID = 204;', null, null, 'Removing this loan does not remove its Member or Copy.'),
};
// A retired lesson link remains useful without adding an already-existing Email.
sqlExamples['dictionary-add-email'] = sqlExamples['dictionary-add-note'];
export const ddlSteps = ['create-database', 'create-tables', 'insert-fixture', 'alter-column', 'add-primary-key', 'add-foreign-key'].map(id => ({ id, ...sqlExamples[id] }));
export const dbmsPanelLabels = { data: 'Data', schema: 'Model & schema', dictionary: 'Data dictionary', integrity: 'Integrity', users: 'Users & groups', backup: 'Backup & recovery', sql: 'Developer & SQL' };
export const dbmsUsers = [{ id: 'postgres', label: 'Administrator', group: 'Database owner' }, { id: 'student_user', label: 'Student', group: 'library_readers' }, { id: 'librarian_user', label: 'Librarian', group: 'library_writers' }];
export const dbmsConfig = { id: 's8-library-v1', formatVersion: 1, seedVersion: 1, engineVersion: '0.5.8', defaultDatabase: 'schoollibrary', setup: librarySetupSql, roles: libraryRolesSql, examples: sqlExamples, users: dbmsUsers };
export const dbmsTables = libraryTables;
export const dbmsSeedSql = librarySetupSql;
export const dbmsExamples = sqlExamples;
export const dbmsDdlSql = libraryDefinitionSql;
