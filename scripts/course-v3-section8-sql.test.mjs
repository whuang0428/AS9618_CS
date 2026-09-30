import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { PGlite } from '../web/assets/vendor/pglite/index.js';
import { section8Databases, section8SqlCases, section8Ddl } from './course-v3-section8-sql.mjs';
import { sqlLabConfigs, sqlLabMarkup } from './course-v3-section8-sql-labs.mjs';
import { createSqlSession } from './course-v3-section8-sql-worker.js';

const value = (cell) => typeof cell === 'boolean' ? Number(cell) : typeof cell === 'string' && /^-?\d+(?:\.\d+)?$/.test(cell) ? Number(cell) : cell;
const rows = (result) => result.rows.map((row) => (Array.isArray(row) ? row : result.fields.map(({ name }) => row[name])).map(value));
const reset = (db) => db.exec('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');

test('vendored PostgreSQL files match the fixed-version provenance manifest', async () => {
  const base = new URL('../web/assets/vendor/pglite/', import.meta.url);
  const manifest = JSON.parse(await readFile(new URL('vendor-manifest.json', base), 'utf8'));
  assert.equal(manifest.version, '0.5.8');
  for (const [file, expected] of Object.entries(manifest.files)) {
    assert.equal(createHash('sha256').update(await readFile(new URL(file, base))).digest('hex'), expected, file);
  }
});

test('every retained SQL example produces the expected records in real PostgreSQL', async () => {
  const db = await PGlite.create();
  try {
    for (const [name, item] of Object.entries(section8SqlCases)) {
      await reset(db);
      if (section8Databases[item.database].setup) await db.exec(section8Databases[item.database].setup);
      if (item.setup) await db.exec(item.setup);
      const result = await db.exec(item.sql, { rowMode: 'array' });
      const actual = item.inspect ? await db.query(item.inspect, [], { rowMode: 'array' }) : result.at(-1);
      assert.deepEqual(rows(actual), item.expectedRows, name);
    }
  } finally { await db.close(); }
});

test('seven syllabus types, primary keys, foreign keys and ALTER use real constraints', async () => {
  const db = await PGlite.create();
  try {
    await db.exec(section8Ddl.tables);
    await db.exec(section8Ddl.alter);
    await db.exec("INSERT INTO Tutor VALUES (1, 'Ms Tan'); INSERT INTO Student VALUES (7, 'A', 'Asha', TRUE, 8.5, '2027-09-08', '09:15:00', 1, 'a@example.test');");
    const typed = await db.query('SELECT StudentID, Initial, StudentName, Active, Score, BirthDate::TEXT AS date, ArrivalTime::TEXT AS time FROM Student;');
    assert.deepEqual(Object.values(typed.rows[0]), [7, 'A', 'Asha', true, 8.5, '2027-09-08', '09:15:00']);
    await assert.rejects(db.exec("INSERT INTO Tutor VALUES (1, 'Other');"), { code: '23505' });
    await assert.rejects(db.exec("INSERT INTO Tutor VALUES (NULL, 'Other');"), { code: '23502' });
    await assert.rejects(db.exec("INSERT INTO Student (StudentID, TutorID) VALUES (8, 99);"), { code: '23503' });
    await assert.rejects(db.exec('DELETE FROM Tutor WHERE TutorID = 1;'), { code: '23503' });
    await assert.rejects(db.exec("INSERT INTO Student (StudentID, Initial) VALUES (8, 'AB');"), { code: '22001' });
    await assert.rejects(db.exec("INSERT INTO Student (StudentID, BirthDate) VALUES (8, '2027-02-30');"), { code: '22008' });
    await reset(db);
    await db.exec('CREATE TABLE Tutor (TutorID INTEGER); CREATE TABLE Student (StudentID INTEGER, TutorID INTEGER);');
    await db.exec(section8Ddl.addConstraints);
    await assert.rejects(db.exec('INSERT INTO Student VALUES (1, 9);'), { code: '23503' });
  } finally { await db.close(); }
});

test('CREATE DATABASE creates a separate usable database and connection switching preserves both', async () => {
  const session = createSqlSession(PGlite);
  const request = { id: 'ddl', config: sqlLabConfigs['sql-ddl'] };
  try {
    const created = await session.handle({ ...request, action: 'run', sql: 'CREATE DATABASE SchoolLibrary;' });
    assert.ok(created.databases.includes('schoollibrary'));
    assert.equal(created.database, 'postgres');
    await session.handle({ ...request, action: 'connect', database: 'schoollibrary' });
    await session.handle({ ...request, action: 'run', sql: 'CREATE TABLE Copy (CopyID INTEGER PRIMARY KEY, Title VARCHAR(60)); INSERT INTO Copy VALUES (1, \'Atlas\');' });
    const empty = await session.handle({ ...request, action: 'connect', database: 'postgres' });
    assert.equal(empty.tables.length, 0);
    const restored = await session.handle({ ...request, action: 'connect', database: 'schoollibrary' });
    assert.deepEqual(restored.tables[0].rows, [{ copyid: 1, title: 'Atlas' }]);
    const initial = await session.handle({ ...request, action: 'reset' });
    assert.equal(initial.database, 'postgres');
    assert.deepEqual(initial.databases, ['postgres']);
    assert.equal(initial.tables.length, 0);
  } finally { await session.close(); }
});

test('lab snapshots isolate changes, survive switching, and Reset restores constraints and records', async () => {
  const session = createSqlSession(PGlite);
  const first = { id: 'first', config: sqlLabConfigs['sql-join'] };
  const second = { id: 'second', config: sqlLabConfigs['sql-select'] };
  try {
    await session.handle({ ...first, action: 'run', sql: 'INSERT INTO Loan VALUES (206,4,8,FALSE);' });
    const changed = await session.handle({ ...first, action: 'run', sql: section8SqlCases.join.sql });
    assert.deepEqual(changed.results[0].rows.at(-1), ['Dara', 206]);
    const other = await session.handle({ ...second, action: 'run', sql: 'SELECT COUNT(*) FROM Loan;' });
    assert.deepEqual(other.results[0].rows, [[5]]);
    const preserved = await session.handle({ ...first, action: 'run', sql: 'SELECT COUNT(*) FROM Loan;' });
    assert.deepEqual(preserved.results[0].rows, [[6]]);
    await session.handle({ ...first, action: 'run', sql: 'ALTER TABLE Loan ADD Note VARCHAR(30); DELETE FROM Loan WHERE LoanID = 201;' });
    const initial = await session.handle({ ...first, action: 'reset' });
    const loan = initial.tables.find((table) => table.name === 'loan');
    assert.equal(loan.rows.length, 5);
    assert.equal(loan.columns.length, 4);
    assert.ok(loan.columns.find((column) => column.column_name === 'memberid').keys.includes('FK'));
    await assert.rejects(session.handle({ ...first, action: 'run', sql: 'INSERT INTO Loan VALUES (206,NULL,1,FALSE);' }), { code: '23502' });
  } finally { await session.close(); }
});

test('all guided statements run or produce their intended real database errors', async () => {
  const db = await PGlite.create();
  const deliberateErrors = new Map([
    ['Try a duplicate primary key', '23505'], ['Try a member who does not exist', '23503'],
    ['Try a loan with no member', '23502'], ['Try deleting a member with loans', '23503'],
  ]);
  try {
    for (const config of Object.values(sqlLabConfigs)) {
      if (config.key === 'sql-ddl') continue; // Database creation/connection has a separate lifecycle test.
      for (const item of config.choices) {
        await reset(db);
        await db.exec(config.setup);
        if (item.label === 'Declare Loan’s foreign key') await db.exec('ALTER TABLE Member ADD PRIMARY KEY (MemberID);');
        if (deliberateErrors.has(item.label)) await assert.rejects(db.exec(item.sql), { code: deliberateErrors.get(item.label) }, `${config.key}: ${item.label}`);
        else await db.exec(item.sql);
      }
    }
    await reset(db);
    for (const item of sqlLabConfigs['sql-ddl'].choices.slice(1)) await db.exec(item.sql);
    assert.equal((await db.query('SELECT COUNT(*) FROM Visit;')).rows[0].count, 1);
  } finally { await db.close(); }
});

test('result transport preserves duplicate labels, NULLs, affected counts and recoverable errors', async () => {
  const session = createSqlSession(PGlite);
  const request = { id: 'transport', config: sqlLabConfigs['sql-select'] };
  try {
    const duplicate = await session.handle({ ...request, action: 'run', sql: 'SELECT 1 AS id, 2 AS id, NULL AS missing;' });
    assert.deepEqual(duplicate.results[0].rows, [[1, 2, null]]);
    const update = await session.handle({ ...request, action: 'run', sql: 'UPDATE Loan SET Returned = TRUE WHERE LoanID = 203;' });
    assert.equal(update.results[0].affectedRows, 1);
    const noUpdate = await session.handle({ ...request, action: 'run', sql: 'UPDATE Loan SET Returned = TRUE WHERE LoanID = 999;' });
    assert.equal(noUpdate.results[0].affectedRows, 0);
    await assert.rejects(session.handle({ ...request, action: 'run', sql: 'BEGIN; DELETE FROM Loan; SELECT Missing FROM Member;' }), { code: '42703' });
    const recovered = await session.recoverState();
    assert.equal(recovered.tables.find((table) => table.name === 'loan').rows.length, 5);
    const limited = await session.handle({ ...request, action: 'run', sql: 'SELECT generate_series(1, 101);' });
    assert.equal(limited.results[0].rows.length, 100);
    assert.equal(limited.results[0].rowCount, 101);
  } finally { await session.close(); }
});

test('all twelve labs provide accessible editable phases, reset and safe embedded configuration', () => {
  assert.equal(Object.keys(sqlLabMarkup).length, 12);
  for (const [name, html] of Object.entries(sqlLabMarkup)) {
    assert.ok(html.includes('data-mode="guided"') && html.includes('data-mode="amend"') && html.includes('data-mode="independent"'), name);
    assert.ok(html.includes('data-s8-action="reset"') && html.includes('aria-live="polite"'), name);
    assert.ok(!html.includes(' id='), `${name} must be safe when reused on one page`);
    const json = html.match(/<script type="application\/json" data-s8-sql-config>([\s\S]*?)<\/script>/)[1];
    assert.equal(JSON.parse(json).key, name);
  }
});
