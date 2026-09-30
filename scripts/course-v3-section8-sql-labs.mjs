import { section8Databases, section8SqlCases } from './course-v3-section8-sql.mjs';

const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
// This classroom model requires every loan to refer to a registered member.
// NOT NULL is a separate rule from the foreign key, which alone permits NULL.
const librarySetup = section8Databases.library.setup.replace('MemberID INTEGER REFERENCES', 'MemberID INTEGER NOT NULL REFERENCES');
const choice = (label, sql, notice = '') => ({ label, sql, notice });
const queryLab = (key, title, question, challenge, choices, tables = ['Member', 'Loan']) => ({
  key, title, question, challenge, choices, setup: librarySetup,
  tables: section8Databases.library.tables.filter((table) => tables.includes(table.title)),
});

export const sqlLabConfigs = {
  'sql-select': queryLab('sql-select', 'Choose the information to show', 'Which columns would answer a librarian who needs the names of all members?', 'Write a query that shows MemberID and MemberName, in MemberID order.', [
    choice('Names only', section8SqlCases.select.sql),
    choice('Names and membership status', 'SELECT MemberName, Active\nFROM Member\nORDER BY MemberID;'),
    choice('Every column', 'SELECT *\nFROM Member\nORDER BY MemberID;'),
  ], ['Member']),
  'sql-filter': queryLab('sql-filter', 'Choose records using a condition', 'Predict the loan numbers before running the query. Which records meet both conditions?', 'Find loans for member 1 or member 2 that have not been returned. Use parentheses to make the intended grouping clear.', [
    choice('Not returned AND fee at least 3', section8SqlCases.filter.sql),
    choice('Not returned OR fee at least 3', section8SqlCases.filterOr.sql),
    choice('Members 1 or 2, not returned', section8SqlCases.filterGrouped.sql),
    choice('Compare without parentheses', section8SqlCases.filterUngrouped.sql),
    choice('No matching records', section8SqlCases.noMatches.sql),
  ], ['Loan']),
  'sql-sort': queryLab('sql-sort', 'Put the result in a useful order', 'Will ORDER BY change which records are stored in Loan, or only their order in this result?', 'Show LoanID and Fee in ascending fee order, with LoanID as the second sort key.', [
    choice('Largest fee first', section8SqlCases.sort.sql),
    choice('Smallest fee first', 'SELECT LoanID, Fee\nFROM Loan\nORDER BY Fee ASC, LoanID ASC;'),
    choice('Loan number order', 'SELECT LoanID, Fee\nFROM Loan\nORDER BY LoanID;'),
  ], ['Loan']),
  'sql-aggregate': queryLab('sql-aggregate', 'Summarise a set of records', 'Calculate the total, number of loans and mean fee yourself before revealing the result.', 'Find the total fee and number of loans that have not been returned.', [
    choice('All loans: SUM, COUNT and AVG', section8SqlCases.aggregate.sql),
    choice('Only loans not returned', 'SELECT SUM(Fee) AS TotalFee, COUNT(*) AS LoanCount, AVG(Fee) AS MeanFee\nFROM Loan\nWHERE Returned = FALSE;'),
    choice('No matching loans', section8SqlCases.emptyAggregate.sql, 'COUNT returns 0 for an empty set. SUM and AVG return NULL, which is not the number zero.'),
  ], ['Loan']),
  'sql-group': queryLab('sql-group', 'Create one summary for each group', 'Which loans belong to each member? Predict how many result rows GROUP BY will produce.', 'Show each MemberID and the total fee for that member. Sort the groups by MemberID.', [
    choice('Count loans per member', section8SqlCases.group.sql),
    choice('Sum fees per member', 'SELECT MemberID, SUM(Fee) AS TotalFee\nFROM Loan\nGROUP BY MemberID\nORDER BY MemberID;'),
    choice('Group by returned status', 'SELECT Returned, COUNT(*) AS LoanCount\nFROM Loan\nGROUP BY Returned\nORDER BY Returned;'),
  ], ['Loan']),
  'sql-join': queryLab('sql-join', 'Match each loan to its member', 'Asha has two loans; Dara has none. How many times will each name appear in this INNER JOIN?', 'Show the member name and loan number for loans that have not been returned and have a fee of at least 3.', [
    choice('Match every loan', section8SqlCases.join.sql),
    choice('Only loans not returned', 'SELECT Member.MemberName, Loan.LoanID\nFROM Member INNER JOIN Loan\nON Member.MemberID = Loan.MemberID\nWHERE Loan.Returned = FALSE\nORDER BY Loan.LoanID;'),
    choice('Only returned loans', 'SELECT Member.MemberName, Loan.LoanID\nFROM Member INNER JOIN Loan\nON Member.MemberID = Loan.MemberID\nWHERE Loan.Returned = TRUE\nORDER BY Loan.LoanID;'),
  ]),
  'sql-combined': queryLab('sql-combined', 'Combine matching, filtering and grouping', 'Which loans survive WHERE? Then which member groups have the largest total fee?', 'Change the query to summarise returned loans. Predict which members disappear and explain why.', [
    choice('Summary of outstanding loans', section8SqlCases.combined.sql),
    choice('Count outstanding loans by member', section8SqlCases.reviewQuery.sql),
    choice('Summary of all loans', 'SELECT Member.MemberName, COUNT(*) AS LoanCount, SUM(Loan.Fee) AS TotalFee\nFROM Member INNER JOIN Loan\nON Member.MemberID = Loan.MemberID\nGROUP BY Member.MemberID, Member.MemberName\nORDER BY SUM(Loan.Fee) DESC, Member.MemberID;'),
  ]),
  'sql-ddl': {
    key: 'sql-ddl', title: 'Create a database and define its tables',
    question: 'Create SchoolLibrary, connect to it, then create Member before Visit. Why does the table order matter?',
    challenge: 'Create a Copy table with CopyID as its primary key and a title limited to 60 characters. Check its structure.',
    setup: '', tables: [],
    choices: [
      choice('1. Create SchoolLibrary', 'CREATE DATABASE SchoolLibrary;', 'After running this statement, choose schoollibrary below and select Connect. Creating a database does not automatically change the current connection.'),
      choice('2. Create Member', 'CREATE TABLE Member (\n    MemberID INTEGER PRIMARY KEY,\n    MemberName VARCHAR(40),\n    Active BOOLEAN\n);'),
      choice('3. Create Visit with seven data types', 'CREATE TABLE Visit (\n    VisitID INTEGER PRIMARY KEY,\n    Initial CHARACTER(1),\n    VisitorName VARCHAR(40),\n    Active BOOLEAN,\n    Fee REAL,\n    VisitDate DATE,\n    ArrivalTime TIME,\n    MemberID INTEGER NOT NULL,\n    FOREIGN KEY (MemberID) REFERENCES Member(MemberID)\n);'),
      choice('4. Add a member and a valid visit', "INSERT INTO Member VALUES (1, 'Asha', TRUE);\nINSERT INTO Visit VALUES (101, 'A', 'Asha', TRUE, 2.5, '2027-09-08', '09:15:00', 1);"),
    ],
  },
  'sql-alter': {
    key: 'sql-alter', title: 'Change a table definition',
    question: 'These starting tables have records but no keys. Add a field, then declare Member’s primary key before Loan’s foreign key.',
    challenge: 'Add a primary key to Loan using LoanID. Then try to insert a second LoanID 201 and explain the error.',
    setup: librarySetup.replace('INTEGER PRIMARY KEY', 'INTEGER').replace('INTEGER PRIMARY KEY', 'INTEGER').replace('INTEGER NOT NULL REFERENCES Member(MemberID)', 'INTEGER NOT NULL'),
    tables: section8Databases.library.tables.map((table) => ({ ...table, headers: table.headers.map((header) => header.replace(/ \((?:PK|FK)\)/, '')) })),
    choices: [
      choice('Add Email to Member', 'ALTER TABLE Member ADD Email VARCHAR(80);'),
      choice('Declare Member’s primary key', 'ALTER TABLE Member ADD PRIMARY KEY (MemberID);'),
      choice('Declare Loan’s foreign key', 'ALTER TABLE Loan ADD FOREIGN KEY (MemberID) REFERENCES Member(MemberID);', 'Run the Member primary-key statement first. A foreign key must refer to a suitable unique key.'),
      choice('Declare Loan’s primary key', 'ALTER TABLE Loan ADD PRIMARY KEY (LoanID);'),
    ],
  },
  'sql-insert': queryLab('sql-insert', 'Add a record that follows the rules', 'Can another loan use MemberID 1? Can another loan use LoanID 201? Explain the difference.', 'Add your own new member, then add a loan for that member. Choose unused primary-key values.', [
    choice('Add a new member', section8SqlCases.insert.sql),
    choice('Add a loan for an existing member', 'INSERT INTO Loan (LoanID, MemberID, Fee, Returned)\nVALUES (206, 1, 3, FALSE);'),
    choice('Try a duplicate primary key', 'INSERT INTO Loan (LoanID, MemberID, Fee, Returned)\nVALUES (201, 2, 3, FALSE);'),
    choice('Try a member who does not exist', 'INSERT INTO Loan (LoanID, MemberID, Fee, Returned)\nVALUES (207, 9, 3, FALSE);'),
    choice('Try a loan with no member', 'INSERT INTO Loan (LoanID, MemberID, Fee, Returned)\nVALUES (208, NULL, 3, FALSE);', 'This library separately declares MemberID NOT NULL: every loan must name a member.'),
  ]),
  'sql-update': queryLab('sql-update', 'Change the intended records', 'Point to the record selected by WHERE before running UPDATE. How many records should change?', 'Set Returned to TRUE and Fee to 0 for LoanID 205. Check both values afterwards.', [
    choice('Return loan 203', section8SqlCases.update.sql),
    choice('Return loan 203 and clear its fee', section8SqlCases.multiUpdate.sql),
    choice('No matching loan', 'UPDATE Loan\nSET Returned = TRUE\nWHERE LoanID = 999;'),
    choice('Compare: omit WHERE', 'UPDATE Loan\nSET Returned = TRUE;', 'Predict the number of affected records. Reset the experiment afterwards to restore the original data.'),
  ], ['Loan']),
  'sql-delete': queryLab('sql-delete', 'Remove a selected record', 'Deleting a loan and deleting a member have different consequences. Predict each result before running it.', 'Delete only the returned loans. Explain why their member records still exist.', [
    choice('Delete loan 204', section8SqlCases.delete.sql),
    choice('Try deleting a member with loans', 'DELETE FROM Member\nWHERE MemberID = 1;', 'This experiment rejects deletion while a loan still refers to the member. No cascading deletion rule is declared.'),
    choice('Delete a member with no loans', 'DELETE FROM Member\nWHERE MemberID = 4;'),
    choice('Delete all returned loans', 'DELETE FROM Loan\nWHERE Returned = TRUE;'),
  ]),
};

function initialTables(tables) {
  if (!tables.length) return '<p>No user tables yet. Run CREATE TABLE and inspect the new structure here.</p>';
  return tables.map((table) => `<section><h5>${escape(table.title)}</h5><div class="table-wrap" tabindex="0"><table><thead><tr>${table.headers.map((header) => `<th scope="col">${escape(header)}</th>`).join('')}</tr></thead><tbody>${table.rows.map((row) => `<tr>${row.map((cell) => `<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`).join('');
}

export const sqlLabMarkup = Object.fromEntries(Object.values(sqlLabConfigs).map((config) => [config.key, `
<div class="s8-sql-lab" data-s8-sql="${config.key}">
  <h4>${escape(config.title)}</h4>
  <p class="s8-sql-prediction">${escape(config.question)}</p>
  <div class="s8-sql-modes" role="group" aria-label="SQL learning stage">
    <button type="button" data-s8-action="mode" data-mode="guided" aria-pressed="true">1 · Guided</button>
    <button type="button" data-s8-action="mode" data-mode="amend" aria-pressed="false">2 · Modify</button>
    <button type="button" data-s8-action="mode" data-mode="independent" aria-pressed="false">3 · Write your own</button>
  </div>
  <div class="s8-sql-controls" data-s8-role="guided-controls"><label>Choose a statement <select data-s8-role="choice">${config.choices.map((item, index) => `<option value="${index}">${escape(item.label)}</option>`).join('')}</select></label></div>
  <p data-s8-role="notice">${escape(config.choices[0].notice || 'Predict the result, then select Run SQL. Changing the selection changes the statement, not the data.')}</p>
  <p data-s8-role="challenge" hidden><strong>Your task:</strong> ${escape(config.challenge)}</p>
  <div class="s8-sql-workspace">
    <div class="s8-sql-compose">
      <label class="s8-sql-editor">SQL statement<textarea data-s8-role="editor" rows="7" spellcheck="false" autocapitalize="off" autocomplete="off" readonly>${escape(config.choices[0].sql)}</textarea></label>
      <div class="s8-sql-actions">
        <button type="button" data-s8-action="run">Run SQL</button>
        <button type="button" data-s8-action="reset">Reset experiment</button>
      </div>
      <div class="s8-sql-controls" data-s8-role="connection"${config.key === 'sql-ddl' ? '' : ' hidden'}><label>Database <select data-s8-role="database"><option value="postgres">postgres</option></select></label><button type="button" data-s8-action="connect">Connect</button><span data-s8-role="connected">Connected to postgres</span></div>
      <p class="s8-sql-status" data-s8-role="status" role="status" aria-live="polite">The local SQL engine starts when this experiment is visible. Each experiment has its own temporary data.</p>
    </div>
    <div class="s8-sql-result" data-s8-role="results" aria-label="SQL result"><p>Predict the output before running the statement.</p></div>
  </div>
  <details class="s8-sql-source" open><summary>Current source tables and structure</summary><div class="s8-sql-tables" data-s8-role="tables">${initialTables(config.tables)}</div></details>
  <p class="s8-sql-note">Changes stay in this experiment until Reset or page reload. Run queries on this practice data, then check the current tables below. Unquoted SQL names appear in lowercase in the results.</p>
  <noscript><p>Enable JavaScript and open this page through the course website or a local web server to run SQL.</p></noscript>
  <script type="application/json" data-s8-sql-config>${JSON.stringify(config).replaceAll('<', '\\u003c')}</script>
</div>`]));
