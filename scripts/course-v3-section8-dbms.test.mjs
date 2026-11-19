import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PGlite } from '../web/assets/vendor/pglite/index.js';
import { dbmsConfig, libraryTables, librarySetupSql, libraryDefinitionSql, sqlExamples } from './course-v3-section8-dbms-data.mjs';
import { createDbmsSession } from './course-v3-section8-dbms-worker.js';
import { compatibleSnapshot, nextSnapshotRecord, SnapshotConflict, createSnapshotStore } from './course-v3-section8-dbms-store.js';
import { renderDbmsWorkbench } from './course-v3-section8-dbms.mjs';

const getTable = (response, name) => response.state.tables.find(table => table.name === name);
const values = rows => rows.map(row => row.map(value => typeof value === 'string' && /^-?\d+(?:\.\d+)?$/.test(value) ? Number(value) : value));
async function inSession(callback) {
  const session = createDbmsSession(PGlite, dbmsConfig);
  try { await callback(session); } finally { await session.close(); }
}

test('one five-table fixture matches every reading table and every expected SQL result', async () => {
  const db = await PGlite.create();
  try {
    await db.exec(librarySetupSql);
    for (const table of libraryTables) {
      const result = await db.query(`SELECT * FROM ${table.title} ORDER BY 1;`, [], { rowMode: 'array' });
      assert.deepEqual(result.rows.map(row => row.map(value => value instanceof Date ? value.toISOString().slice(0, 10) : value)), table.rows, table.title);
    }
    for (const [id, example] of Object.entries(sqlExamples)) {
      if (!example.expected) continue;
      const result = await db.query(example.sql, [], { rowMode: 'array' });
      assert.deepEqual(result.fields.map(field => field.name), example.expected.headers, id);
      assert.deepEqual(values(result.rows), example.expected.rows, id);
    }
    const types = (await db.query("SELECT DISTINCT data_type FROM information_schema.columns WHERE table_schema = 'public';")).rows.map(row => row.data_type);
    for (const type of ['character', 'character varying', 'boolean', 'integer', 'real', 'date', 'time without time zone']) assert.ok(types.includes(type), type);
    assert.equal((await db.query('SELECT SUM(Fee) FROM Loan;')).rows[0].sum, 15);
  } finally { await db.close(); }
});

test('the live dictionary and ER references change after DDL; DML only changes records', async () => {
  await inSession(async session => {
    const initial = await session.handle({ action: 'init' });
    assert.equal(initial.state.tables.length, 5);
    assert.equal(initial.state.database, 'schoollibrary');
    assert.equal(getTable(initial, 'loan').references.length, 2);
    assert.ok(getTable(initial, 'member').constraints.some(rule => rule.type === 'u' && rule.definition.includes('schoolemail')));
    const changed = await session.handle({ action: 'run', sql: sqlExamples.update.sql });
    assert.deepEqual(getTable(changed, 'loan').columns, getTable(initial, 'loan').columns);
    assert.equal(getTable(changed, 'loan').rows.find(row => row[0] === 203)[5], 0);
    const altered = await session.handle({ action: 'run', sql: sqlExamples['alter-column'].sql });
    const note = getTable(altered, 'member').columns.find(column => column.column_name === 'note');
    assert.equal(note.character_maximum_length, 80);
    assert.ok(getTable(altered, 'member').rows.every(row => row.at(-1) === null));
    const key = await session.handle({ action: 'run', sql: sqlExamples['add-primary-key'].sql });
    assert.ok(getTable(key, 'readinggroup').constraints.some(rule => rule.type === 'p'));
    const foreign = await session.handle({ action: 'run', sql: sqlExamples['add-foreign-key'].sql });
    assert.equal(getTable(foreign, 'readinggroupmember').references[0].target_table, 'member');
  });
});

test('integrity rejection preserves data and an error in an explicit transaction is recovered', async () => {
  await inSession(async session => {
    const initial = await session.handle({ action: 'init' });
    for (const [id, code] of [['integrity-duplicate', '23505'], ['integrity-orphan', '23503'], ['integrity-negative', '23514'], ['integrity-delete-parent', '23503']]) {
      const response = await session.handle({ action: 'run', sql: sqlExamples[id].sql });
      assert.equal(response.ok, false, id); assert.equal(response.error.code, code, id);
      assert.deepEqual(response.state.tables.map(table => table.rows), initial.state.tables.map(table => table.rows));
    }
    const failed = await session.handle({ action: 'run', sql: 'BEGIN; DELETE FROM Loan; SELECT Missing FROM Member;' });
    assert.equal(failed.error.code, '42703');
    assert.equal(getTable(failed, 'loan').rows.length, 5);
    const open = await session.handle({ action: 'run', sql: 'BEGIN; DELETE FROM Loan;' });
    assert.match(open.error.message, /left open/);
    assert.equal(getTable(open, 'loan').rows.length, 5);
    const next = await session.handle({ action: 'run', sql: 'SELECT COUNT(*) FROM Loan;' });
    assert.equal(next.ok, true); assert.deepEqual(values(next.results[0].rows), [[5]]);
  });
});

test('individual and group rights are enforced by PostgreSQL, including the Data view', async () => {
  await inSession(async session => {
    await session.handle({ action: 'user', user: 'student_user' });
    const read = await session.handle({ action: 'run', sql: sqlExamples.select.sql });
    assert.equal(read.ok, true); assert.equal(getTable(read, 'member').denied, false);
    const denied = await session.handle({ action: 'run', sql: sqlExamples.update.sql });
    assert.equal(denied.error.code, '42501');
    await session.handle({ action: 'user', user: 'postgres' });
    await session.handle({ action: 'run', sql: 'GRANT UPDATE ON Loan TO student_user; REVOKE SELECT ON Member FROM library_readers;' });
    const noRead = await session.handle({ action: 'user', user: 'student_user' });
    assert.equal(getTable(noRead, 'member').denied, true);
    assert.deepEqual(getTable(noRead, 'member').rows, []);
    const direct = await session.handle({ action: 'run', sql: sqlExamples.update.sql });
    assert.equal(direct.ok, true); assert.equal(direct.results[0].affectedRows, 1);
    await session.handle({ action: 'user', user: 'librarian_user' });
    const group = await session.handle({ action: 'run', sql: sqlExamples.insert.sql });
    assert.equal(group.ok, true);
    const bad = await session.handle({ action: 'run', sql: sqlExamples['integrity-orphan'].sql });
    assert.equal(bad.error.code, '23503', 'a permitted writer still must satisfy integrity');
  });
});

test('a compressed backup restores data, definitions, grants and the chosen database across sessions', async () => {
  let backup;
  await inSession(async session => {
    const initial = await session.handle({ action: 'init' }); backup = initial.snapshot;
    const bytes = new Uint8Array(await backup.dump.arrayBuffer());
    assert.deepEqual([...bytes.slice(0, 2)], [0x1f, 0x8b], 'persist compressed gzip rather than a 40MB raw cluster');
    await session.handle({ action: 'run', sql: `${sqlExamples.update.sql}\n${sqlExamples['alter-column'].sql}\nREVOKE SELECT ON Member FROM library_readers;` });
    const restored = await session.handle({ action: 'restore', snapshot: backup });
    assert.equal(getTable(restored, 'loan').rows.find(row => row[0] === 203)[5], 6);
    assert.ok(!getTable(restored, 'member').columns.some(column => column.column_name === 'note'));
    assert.ok(restored.state.grants.some(grant => grant.grantee === 'library_readers' && grant.table_name === 'member' && grant.privilege_type === 'SELECT'));
  });
  await inSession(async session => {
    const resumed = await session.handle({ action: 'init', snapshot: backup });
    assert.equal(resumed.state.database, 'schoollibrary');
    assert.equal(getTable(resumed, 'loan').rows.length, 5);
    const reset = await session.handle({ action: 'reset' });
    assert.equal(reset.state.tables.length, 5);
  });
});

test('CREATE DATABASE and connection switching operate on separate real databases', async () => {
  await inSession(async session => {
    const created = await session.handle({ action: 'run', sql: sqlExamples['create-database'].sql });
    assert.equal(created.state.database, 'schoollibrary');
    assert.ok(created.state.databases.includes('librarybuild'));
    const empty = await session.handle({ action: 'connect', database: 'librarybuild' });
    assert.equal(empty.state.tables.length, 0);
    const defined = await session.handle({ action: 'run', sql: libraryDefinitionSql });
    assert.equal(defined.state.tables.length, 5);
    assert.ok(defined.state.tables.every(table => table.rows.length === 0));
    const user = await session.handle({ action: 'user', user: 'student_user' });
    assert.ok(user.state.tables.every(table => table.denied));
    await session.handle({ action: 'user', user: 'postgres' });
    const old = await session.handle({ action: 'connect', database: 'schoollibrary' });
    assert.equal(getTable(old, 'loan').rows.length, 5);
    const rejected = await session.handle({ action: 'connect', database: 'missing_database' });
    assert.equal(rejected.ok, false); assert.equal(rejected.state.database, 'schoollibrary');
  });
});

test('EXPLAIN yields a real plan without performing maintenance, and result transport preserves duplicate labels', async () => {
  await inSession(async session => {
    const planned = await session.handle({ action: 'plan', sql: 'UPDATE Loan SET Fee = 0;' });
    assert.equal(planned.ok, true); assert.ok(planned.plan[0].Plan['Node Type']);
    assert.equal(getTable(planned, 'loan').rows.reduce((sum, row) => sum + row[5], 0), 15);
    const multiple = await session.handle({ action: 'plan', sql: 'SELECT * FROM Loan; DELETE FROM Loan;' });
    assert.equal(multiple.ok, false); assert.equal(getTable(multiple, 'loan').rows.length, 5);
    const output = await session.handle({ action: 'run', sql: 'SELECT 1 AS id, 2 AS id, NULL AS missing;' });
    assert.deepEqual(output.results[0].fields, ['id', 'id', 'missing']);
    assert.deepEqual(output.results[0].rows, [[1, 2, null]]);
    const limit = await session.handle({ action: 'run', sql: 'SELECT generate_series(1, 105);' });
    assert.equal(limit.results[0].rowCount, 105); assert.equal(limit.results[0].rows.length, 100);
  });
});

test('snapshot compare-and-swap rejects stale writers and validates versions', async () => {
  const first = nextSnapshotRecord(null, 0, { id: 'library', ...dbmsConfig, snapshot: 'first' });
  const second = nextSnapshotRecord(first, 1, { ...first, snapshot: 'second' });
  assert.equal(second.revision, 2);
  assert.throws(() => nextSnapshotRecord(second, 1, { ...first, snapshot: 'stale' }), SnapshotConflict);
  assert.equal(second.snapshot, 'second');
  assert.equal(compatibleSnapshot(first, dbmsConfig), true);
  assert.equal(compatibleSnapshot({ ...first, seedVersion: 99 }, dbmsConfig), false);
  assert.equal(compatibleSnapshot({ ...first, engineVersion: 'other' }, dbmsConfig), false);
  await assert.rejects(createSnapshotStore(null).read('library'), /unavailable/);
});

test('workbench supplies all seven labelled panels, one accessible dialog and safely embedded configuration', () => {
  const html = renderDbmsWorkbench();
  for (const panel of ['data', 'schema', 'dictionary', 'integrity', 'users', 'backup', 'sql']) assert.ok(html.includes(`data-dbms-view="${panel}"`));
  assert.equal((html.match(/<dialog /g) || []).length, 1);
  assert.ok(html.includes('data-dbms-open'));
  assert.ok(html.includes('role="status"') && html.includes('aria-live="polite"'));
  const json = html.match(/<script type="application\/json" data-dbms-config>([\s\S]*?)<\/script>/)[1];
  assert.equal(JSON.parse(json).setup, librarySetupSql);
});
