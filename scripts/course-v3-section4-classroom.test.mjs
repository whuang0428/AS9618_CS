import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section4Journey, section4Sessions, section4PaperObjectives, section4PaperCoverageNotes } from './course-v3-section4-journey.mjs';
import { groupObjectives, section4PapersForLesson } from './course-v3-section4-classroom.mjs';
import { section4ExtraPapers } from './course-v3-section4-extra-papers.mjs';
import { section4Programs } from './course-v3-section4-programs.mjs';
import { imageDimensions } from './image-dimensions.mjs';
import models from './course-v3-section4-models.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessons = courseV3Lessons.filter(lesson => lesson.section === 4);
const pool = lessons.flatMap(lesson => lesson.pastPaperQuestions);
const groups = lessons.flatMap(lesson => section4Journey[lesson.sequenceIndex].groups.map(group => ({ group, lesson })));
const byId = new Map(groups.map(({ group, lesson }) => [group.id, { group, lesson }]));
const papers = lessons.flatMap(lesson => section4PapersForLesson(lesson, pool));
const sorted = values => [...values].sort();
const unique = values => [...new Set(values)];
const sha = value => createHash('sha256').update(value).digest('hex');
const json = path => JSON.parse(readFileSync(join(root, path), 'utf8'));
const text = (value, label) => assert.ok(typeof value === 'string' && value.trim(), label);
const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const ids = (requirement, ...numbers) => numbers.map(n => `S4.${String(requirement).padStart(2, '0')}.A${String(n).padStart(2, '0')}`);
const expectedObjectives = [1, 8, 1, 1, 5, 4, 2, 6, 1, 2, 1, 5, 6, 2, 16].flatMap((count, index) => ids(index + 1, ...Array.from({ length: count }, (_, n) => n + 1)));
// Independently checked against the selected QP/MS parts, including partial
// instruction-family/addressing coverage rather than broad requirement labels.
const expectedPapers = {
  E029: ids(2, 2, 3, 4, 6),
  E030: ids(6, 1, 3, 4),
  E031: ids(5, 4, 5),
  E032: ids(7, 2),
  E033: [...ids(2, 3, 4), ...ids(7, 1, 2)],
  E034: ids(8, 4, 5, 6),
  E035: ids(10, 1),
  E036: [...ids(11, 1), ...ids(13, 1, 2, 3, 4, 5, 6), ...ids(14, 1, 2)],
  E037: ids(15, 5, 7, 10, 11),
  E038: ids(15, 5, 6, 7),
  E4D01: [...ids(13, 1, 5), ...ids(14, 1, 2)],
  E4D02: ids(15, 1, 3, 4),
  E4D03: ids(15, 1, 3, 4, 13),
};

test('teaching groups cover the 61 atomic syllabus objectives through valid source units', () => {
  assert.deepEqual(lessons.map(lesson => lesson.sequenceIndex), [21, 22, 23, 24, 25, 26, 27]);
  assert.equal(new Set(groups.map(({ group }) => group.id)).size, groups.length);
  assert.deepEqual(sorted(unique(lessons.flatMap(lesson => lesson.objectives.map(([id]) => id)))), sorted(expectedObjectives));
  const covered = [];
  for (const lesson of lessons) {
    const pageGroups = section4Journey[lesson.sequenceIndex].groups;
    const pageObjectives = pageGroups.flatMap(group => groupObjectives(group, lesson));
    assert.deepEqual(sorted(unique(pageObjectives)), sorted(lesson.objectives.map(([id]) => id)), `Incomplete page: ${lesson.route}`);
    const usedUnits = unique(pageGroups.flatMap(group => group.unitKeys));
    assert.deepEqual(sorted(usedUnits), sorted(lesson.units.map(unit => unit.unitKey)), `${lesson.route}: source unit lost`);
    covered.push(...pageObjectives);
  }
  assert.deepEqual(sorted(unique(covered)), sorted(expectedObjectives));
});

test('every concept occurs once in a 45-minute session in prerequisite order', () => {
  const scheduled = [];
  for (const session of section4Sessions) {
    text(session.title, 'Missing session title');
    assert.ok(session.groups.length);
    assert.ok(Object.values(session.minutes).every(value => Number.isFinite(value) && value > 0));
    assert.equal(Object.values(session.minutes).reduce((sum, n) => sum + n, 0), 45, session.title);
    scheduled.push(...session.groups);
  }
  assert.deepEqual(scheduled, groups.map(({ group }) => group.id), 'Missing, duplicated, unknown or reordered concept');
});

test('each concept has explanatory material, a complete worked example and a hidden-answer check', () => {
  for (const { group, lesson } of groups) {
    for (const field of ['id', 'title', 'question', 'observe', 'takeaway', 'trap', 'bridge']) text(group[field], `${group.id}: ${field}`);
    assert.ok(group.steps.length, `${group.id}: explanation missing`);
    assert.ok(group.image || group.lab || group.steps.some(step => step.table || step.code), `${group.id}: no concrete teaching material`);
    for (const field of ['title', 'setup', 'conclusion']) text(group.worked?.[field], `${group.id}: worked ${field}`);
    assert.ok(group.worked.steps.length, `${group.id}: incomplete worked example`);
    for (const field of ['prompt', 'answer']) text(group.check?.[field], `${group.id}: check ${field}`);
    for (const step of [...group.steps, ...group.worked.steps]) {
      text(step.title, `${group.id}: step title`); text(step.body, `${group.id}: step body`);
      if (step.code) text(step.code, `${group.id}: code`);
      if (step.table) {
        assert.ok(step.table.headers.length && step.table.rows.length);
        for (const row of step.table.rows) {
          assert.equal(row.length, step.table.headers.length, `${group.id}: misaligned table`);
          assert.ok(row.every(cell => cell !== null && cell !== undefined));
        }
      }
    }
    const authored = [...lesson.practice, ...lesson.optionalPractice];
    for (const id of group.practiceIds ?? []) assert.ok(authored.some(q => q.id === id), `${group.id}: missing authored task ${id}`);
    if (group.image) {
      const asset = typeof group.image === 'string' ? group.image : group.image.asset;
      assert.ok(existsSync(join(root, 'web', asset)), `${group.id}: missing ${asset}`);
    }
  }
});

test('the shared memory and assembler examples represent the same complete calculation', () => {
  const stored = byId.get('stored-instructions').group.steps[0].table.rows;
  const program = section4Programs.sharedCalculation;
  assert.deepEqual(stored.slice(0, 4).map(row => row[1]), program.lines);
  assert.deepEqual(Object.fromEntries(stored.slice(4).map(([address, contents]) => [address, contents])), program.memory);
  assert.deepEqual(stored.map(([address]) => address), [0, 1, 2, 3, 4, 5, 6]);
  const symbols = byId.get('label-addresses').group.steps.find(step => step.table).table.rows;
  assert.deepEqual(symbols.map(([name, address]) => [name, address]), [['START', 0], ['FIRST', 4], ['SECOND', 5], ['TOTAL', 6]]);
  const encoded = byId.get('two-assembler-passes').group.steps.find(step => step.table?.headers.includes('Emitted 16-bit word')).table.rows;
  const opcodes = { LDD: 1, ADD: 2, STO: 3, END: 255 };
  for (const [address, bits] of encoded) {
    assert.match(bits, /^[01]{8} [01]{8}$/);
    const number = parseInt(bits.replace(' ', ''), 2);
    if (address < 4) {
      const [opcode, operand = '0'] = program.lines[address].split(' ');
      assert.equal(number, opcodes[opcode] * 256 + Number(operand));
    } else assert.equal(number, program.memory[address]);
  }
});

test('the complete published loop table follows execution rather than listing order', () => {
  const { origin, lines, memory } = section4Programs.workedTrace;
  const actual = byId.get('complete-loop-trace').group.worked.steps.find(step => step.table).table.rows;
  let pc = origin, acc = 0, compare = 'Unset';
  const expected = [];
  for (let guard = 0; guard < 40; guard += 1) {
    const address = pc;
    const [op, operand] = lines[address - origin].replace(/^\w+:\s*/, '').split(/\s+/);
    pc += 1;
    let output = '—';
    if (op === 'LDM') acc = Number(operand.slice(1));
    else if (op === 'DEC') acc -= 1;
    else if (op === 'CMP') compare = acc === Number(operand.slice(1)) ? 'True' : 'False';
    else if (op === 'JPN' && compare === 'False') pc = origin + lines.findIndex(line => line.startsWith(`${operand}:`));
    else if (op === 'LDD') acc = memory[Number(operand)];
    else if (op === 'OUT') output = String.fromCharCode(acc);
    expected.push([address, acc, 0, compare, op === 'END' ? 'Return to OS' : pc, output]);
    if (op === 'END') break;
  }
  assert.deepEqual(actual, expected);
  assert.equal(expected.at(-1)[0], 26);
  assert.equal(expected.filter(row => row[0] === 23).length, 2);
  assert.equal(expected.filter(row => row[5] === 'C').length, 1);
});

test('published shift, masking and conditional-update examples give independently calculated bits', () => {
  const shifts = byId.get('signed-cyclic-shifts').group.steps.find(step => step.table).table.rows;
  const byte = 151, binary = value => value.toString(2).padStart(8, '0');
  assert.deepEqual(shifts, [
    ['Logical', binary(byte * 2 % 256), binary(Math.floor(byte / 2))],
    ['Arithmetic', binary(byte * 2 % 256), binary(256 + Math.floor((byte - 256) / 2))],
    ['Cyclic', binary((byte * 2 % 256) + Math.floor(byte / 128)), binary(Math.floor(byte / 2) + byte % 2 * 128)],
  ]);
  const outcomes = byId.get('bitwise-operands').group.steps.find(step => step.table?.headers[0] === 'Operation with 00001111').table.rows;
  assert.deepEqual(outcomes.map(row => row[1]), [binary(166 & 15), binary(166 | 15), binary(166 ^ 15)]);
  const device = byId.get('test-and-control').group.worked.steps.find(step => step.table).table.rows;
  for (const [input, result, branch, output] of device) {
    const value = parseInt(input, 2), ready = (value & 16) !== 0;
    assert.equal(result, binary(value & 16));
    assert.equal(branch, ready ? 'No' : 'Yes');
    assert.equal(output, binary(ready ? value | 4 : value));
  }
});

test('concept-specific lab configurations are valid and retained by the live model', () => {
  for (const { group } of groups.filter(({ group }) => group.lab)) {
    let state = models.createLab(group.lab);
    for (const [key, value] of Object.entries(group.labConfig ?? {})) state = models.labAction(state, key, value);
    const before = models.view(state);
    assert.ok(before.title, `${group.id}: no initial model`);
    for (const [key, value] of Object.entries(group.labConfig ?? {})) assert.equal(state.config[key], value, `${group.id}: rejected ${key}`);
    if (group.labControls) for (const key of group.labControls) assert.ok(key in state.config, `${group.id}: unsupported control ${key}`);
  }
});

test('13 selected paper parts are assigned once with precise scope and honest partial-coverage notes', () => {
  assert.deepEqual(sorted(papers.map(p => p.id)), sorted(Object.keys(expectedPapers)));
  assert.deepEqual(sorted(groups.flatMap(({ group }) => group.papers)), sorted(Object.keys(expectedPapers)));
  assert.deepEqual(section4PaperObjectives, expectedPapers);
  for (const paper of papers) {
    assert.deepEqual(paper.objectiveIds, expectedPapers[paper.id]);
    assert.equal(paper.marks, paper.parts.reduce((sum, part) => sum + part.marks, 0));
    text(section4PaperCoverageNotes[paper.id], `${paper.id}: missing scope note`);
  }
  assert.match(section4PaperCoverageNotes.E036, /does not test every mnemonic, indirect addressing or relative addressing/);
  assert.match(section4PaperCoverageNotes.E035, /complete source program is checked separately/);
});

test('past-paper placement follows the actual prerequisite concepts, not only broad objective labels', () => {
  const prerequisites = {
    E029: ['memory-addresses', 'cpu-team', 'register-jobs'],
    E030: ['peripheral-ports'], E031: ['bus-capacity', 'cache-reuse', 'performance-conditions'],
    E032: ['register-jobs', 'fetch-an-instruction'], E033: ['register-jobs', 'bus-transactions', 'fetch-an-instruction'],
    E034: ['interrupt-events', 'save-service-return'], E035: ['readable-instructions', 'label-addresses', 'two-assembler-passes'],
    E4D01: ['immediate-direct', 'indirect-indexed'],
    E036: ['immediate-direct', 'indirect-indexed', 'relative-and-movement', 'arithmetic-characters', 'compare-and-branch', 'complete-loop-trace'],
    E4D02: ['logical-shifts', 'signed-cyclic-shifts'], E4D03: ['logical-shifts'],
    E037: ['immediate-direct', 'bitwise-operands'], E038: ['bitwise-operands', 'test-and-control'],
  };
  for (const order of [groups.map(({ group }) => group.id), section4Sessions.flatMap(session => session.groups)]) {
    const taught = new Set();
    for (const id of order) {
      taught.add(id);
      for (const paper of byId.get(id).group.papers) for (const prerequisite of prerequisites[paper]) assert.ok(taught.has(prerequisite), `${paper} precedes ${prerequisite}`);
    }
  }
});

test('paper crops preserve verified sources, crop geometry, image hashes and dimensions', () => {
  const manifest = json('scripts/past-paper-source-manifest.json');
  const crops = json('scripts/past-paper-extracts.json');
  const approved = json('docs/practice-past-paper-review-20260915/selection-registry.json');
  for (const paper of papers) {
    const source = manifest.questions.find(q => q.id === paper.id) ?? section4ExtraPapers.find(q => q.id === paper.id);
    assert.ok(source, paper.id);
    assert.equal(paper.sourceType, 'past-paper');
    assert.equal(paper.extractReview.status, 'verified');
    const selection = approved.find(q => q.id === paper.id);
    if (selection) for (const key of ['syllabusCode', 'year', 'series', 'component', 'parts', 'marks', 'syllabusMapping']) assert.deepEqual(paper[key], selection[key], `${paper.id}: original ${key} changed`);
    const geometry = crops[paper.id]
      ? Object.fromEntries(['insert', 'ms', 'qp'].filter(key => key in crops[paper.id]).map(key => [key, crops[paper.id][key]]))
      : paper.cropSpec;
    assert.equal(sha(JSON.stringify(geometry)), paper.extractReview.cropSpecSha256, `${paper.id}: crop changed`);
    for (const kind of ['qp', 'ms']) {
      assert.deepEqual(paper[kind], source[kind]);
      assert.match(paper[kind].sha256, /^[a-f0-9]{64}$/);
      for (const image of paper[kind].extracts) {
        const path = join(root, 'web', image.asset);
        assert.equal(sha(readFileSync(path)), image.sha256, `${paper.id}: ${image.asset} changed`);
        assert.deepEqual(imageDimensions(path), { width: image.width, height: image.height });
      }
    }
  }
});

const sources = new Map();
const sourceRoot = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
for (const paper of papers) for (const kind of ['qp', 'ms']) {
  const source = paper[kind];
  const folder = `${paper.year}-${paper.series === 'Oct/Nov' ? 'Oct-Nov' : 'May-June'}`;
  const path = join(sourceRoot, source.sourcePdf ?? join(folder, source.filename));
  if (sources.has(path)) assert.equal(sources.get(path), source.sha256);
  sources.set(path, source.sha256);
}
for (const [path, hash] of sources) test(`local original PDF matches registered hash: ${path.split('/').at(-1)}`, { skip: existsSync(path) ? false : 'Teacher-owned PDF unavailable locally; source hash not reverified.' }, () => assert.equal(sha(readFileSync(path)), hash));

for (const lesson of lessons) {
  const path = join(root, 'web/course-v3', lesson.route, 'index.html');
  test(`generated classroom preserves concept, practice and paper inventory: ${lesson.route}`, { skip: existsSync(path) ? false : 'Page not generated.' }, () => {
    const html = readFileSync(path, 'utf8');
    assert.match(html, /data-s4-classroom/);
    const allIds = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(allIds).size, allIds.length, 'Duplicate HTML ids');
    const qIds = [...html.matchAll(/data-question-id="([^"]+)"/g)].map(match => match[1]);
    for (const group of section4Journey[lesson.sequenceIndex].groups) {
      assert.ok(allIds.includes(group.id), `Missing ${group.id}`);
      const groupHtml = html.split(`<article class="s4-group" id="${group.id}"`)[1]?.split('<article class="s4-group"')[0];
      assert.ok(groupHtml, `${group.id}: missing article`);
      for (const phase of ['observe', 'explain', 'worked', 'check', 'recap']) assert.ok(allIds.includes(`${group.id}--${phase}`), `${group.id}: missing ${phase}`);
      for (const id of [...group.papers, ...(group.practiceIds ?? [])]) assert.equal(qIds.filter(value => value === id).length, 1, `${group.id}: missing/repeated ${id}`);
      for (const step of [...group.steps, ...group.worked.steps]) assert.ok(groupHtml.includes(escapeHtml(step.body)), `${group.id}: stale or missing explanation ${step.title}`);
      assert.ok(groupHtml.includes(escapeHtml(group.check.answer)), `${group.id}: stale check answer`);
      if (group.labConfig) assert.ok(groupHtml.includes(`data-s4-config="${escapeHtml(JSON.stringify(group.labConfig))}"`), `${group.id}: stale experiment configuration`);
      if (group.labControls) assert.ok(groupHtml.includes(`data-s4-controls="${escapeHtml(JSON.stringify(group.labControls))}"`), `${group.id}: stale experiment controls`);
    }
    assert.doesNotMatch(html, /<details\b[^>]*\bclass="s4-answer"[^>]*\bopen(?:[\s=>])/, 'Check answer exposed by default');
    assert.doesNotMatch(html, /<(?:script|link|img)\b[^>]*(?:src|href)="https?:\/\//, 'Runtime media depends on a remote host');
  });
}
