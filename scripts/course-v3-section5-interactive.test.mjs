import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section5Journey, section5Checkpoint, section5Route, section5PaperObjectives, section5PaperCoverageNotes } from './course-v3-section5-journey.mjs';
import { groupObjectives, section5PapersForLesson, renderSection5Overview, renderSection5Classroom } from './course-v3-section5-classroom.mjs';
import { renderPastPaperQuestions } from './course-v3-past-paper-render.mjs';
import { section5ExtraPapers } from './course-v3-section5-extra-papers.mjs';
import { section5Programs, s5LoopTrace } from './course-v3-section5-programs.mjs';
import models from './course-v3-section5-models.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessons = courseV3Lessons.filter(lesson => lesson.section === 5);
const pool = lessons.flatMap(lesson => lesson.pastPaperQuestions);
const groups = lessons.flatMap(lesson => section5Journey[lesson.sequenceIndex].groups);
const papers = lessons.flatMap(lesson => section5PapersForLesson(lesson, pool));
const sorted = values => [...values].sort();
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const ids = (requirement, count) => Array.from({ length: count }, (_, i) => `S5.${String(requirement).padStart(2,'0')}.A${String(i + 1).padStart(2,'0')}`);
const required = [6,6,3,3,2,1,8].flatMap((count, i) => ids(i + 1, count));

test('every AS Section 5 objective has one owner and all original units remain reachable', () => {
  assert.deepEqual(sorted(groups.flatMap(group => group.objectiveIds)), sorted(required));
  assert.equal(new Set(groups.map(group => group.id)).size, groups.length);
  for (const lesson of lessons) {
    assert.equal(lesson.classroomCourse, section5Journey[lesson.sequenceIndex]);
    const page = lesson.classroomCourse.groups;
    assert.deepEqual(sorted(page.flatMap(group => groupObjectives(group, lesson))), sorted(lesson.objectives.map(([id]) => id)));
    assert.deepEqual(sorted([...new Set(page.flatMap(group => group.unitKeys))]), sorted(lesson.units.map(unit => unit.unitKey)));
  }
});

test('past-paper practice follows all its prerequisites, including cumulative cross-topic questions', () => {
  const taught = new Set(), assigned = [];
  for (const group of lessons.flatMap(l => section5Route(l.sequenceIndex))) {
    (group.objectiveIds ?? []).forEach(id => taught.add(id));
    for (const id of group.papers) {
      assert.ok(section5PaperObjectives[id]?.length, id);
      for (const objective of section5PaperObjectives[id]) assert.ok(taught.has(objective), `${id} precedes ${objective}`);
      assert.ok(section5PaperCoverageNotes[id], `${id} missing honest coverage note`);
      assigned.push(id);
    }
  }
  assert.equal(new Set(assigned).size, assigned.length);
  assert.deepEqual(sorted(assigned), sorted([...pool, ...section5ExtraPapers].map(q => q.id)));
  assert.deepEqual(section5PaperObjectives.E5D06, ['S5.07.A04'], 'question explicitly excludes prettyprinting');
  assert.ok(section5Journey[31].groups.some(group => group.papers.includes('E042')), 'development-stage comparison follows comparison teaching');
});

test('the nine chapter links lead to numbered sections or the 15-mark boundary', () => {
  const overview = renderSection5Overview(lessons);
  const route = lessons.flatMap(lesson => section5Route(lesson.sequenceIndex));
  assert.deepEqual(route.map(g => g.number ?? 'checkpoint'), ['5.1.1','5.1.2','5.1.3','5.1.4','checkpoint','5.2.1','5.2.2','5.2.3','5.2.4']);
  for (const lesson of lessons) for (const group of section5Route(lesson.sequenceIndex)) {
    assert.ok(overview.includes(`href="../${lesson.route}/#${group.id}"`));
  }
  assert.deepEqual(groups.map(g => g.materials.length), [1,5,6,3,3,1,1,4]);
  for (const group of groups) for (const material of group.materials) {
    assert.ok(material.html && material.title && material.objectiveIds.length, material.id);
    if (['5.1.2','5.1.3'].includes(group.number)) {
      assert.match(material.html, /<figure/);
      assert.match(material.html, /QP p\d+, MS p\d+/);
      assert.match(material.html, /Describe|Explain|explain|describe/);
    }
  }
  assert.deepEqual(groups.find(g => g.number === '5.2.1').materials.map(m => m.id), ['assembler','compiler','interpreter']);
});

test('worked arithmetic agrees with the executable classroom models', () => {
  const outputs = [models.compilerAction(models.compilerAction(undefined,'build'),'run').output, models.interpretProgram({ branch: false, limit:3 }).output];
  assert.deepEqual(outputs, [6,6]);
  assert.equal(section5Programs.repeatedA.tests[0].output[0], Number(s5LoopTrace.at(-1).at(-1)));
  for (const [program, expected] of [['wrongVariable',6],['wrongOperator',7]]) {
    assert.equal(models.debuggerAction({program},'run').output,expected);
    assert.equal(models.debuggerAction({program,corrected:true},'run').output,12);
  }
});

test('the renderer keeps source questions after explanations and every answer folded', () => {
  const helpers = { renderPastPaperQuestions, renderPractice: q => `<article data-question-id="${q.id}"></article>` };
  for (const lesson of lessons) {
    const qs = section5PapersForLesson(lesson, pool);
    const html = renderSection5Classroom({ ...lesson, pastPaperQuestions: qs }, helpers);
    assert.equal((html.match(/data-s5-classroom/g) ?? []).length, 1);
    const revealed = [...html.matchAll(/<details\b[^>]*\sopen(?:[\s=>])[^<]*/g)];
    assert.ok(revealed.every(match => match[0].includes('class="exam-question-sheet"')), 'only the original question may start expanded');
    for (const group of section5Journey[lesson.sequenceIndex].groups) {
      const groupStart = html.indexOf(`id="${group.id}"`);
      assert.ok(groupStart >= 0);
      for (const id of group.papers) assert.ok(html.indexOf(`data-question-id="${id}"`, groupStart) > groupStart);
    }
    const identifiers = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(identifiers).size, identifiers.length, `Duplicate anchors on ${lesson.route}`);
  }
});

test('all original question and mark-scheme crops retain their reviewed bytes and dimensions', () => {
  for (const question of papers) {
    assert.equal(question.parts.reduce((sum, part) => sum + part.marks, 0), question.marks);
    for (const kind of ['qp','ms']) {
      assert.ok(question[kind].filename && question[kind].sha256 && question[kind].extracts.length);
      for (const extract of question[kind].extracts) {
        const bytes = readFileSync(join(root, 'web', extract.asset));
        assert.equal(digest(bytes), extract.sha256, extract.asset);
        assert.equal(bytes.readUInt32BE(16), extract.width);
        assert.equal(bytes.readUInt32BE(20), extract.height);
      }
    }
  }
});

test('local original PDFs match recorded source identities when the teaching archive is available', t => {
  const archive = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
  if (!existsSync(archive)) return t.skip('Local source archive unavailable; published extract hashes are still verified');
  const candidates = readdirSync(archive, { recursive: true }).map(String);
  for (const question of papers) for (const kind of ['qp','ms']) {
    const source = question[kind];
    const path = source.sourcePdf ?? candidates.find(path => path.endsWith('/' + source.filename) || path === source.filename);
    if (!path && source.sourceURL) continue; // The public originals have a separate check below.
    assert.ok(path, source.filename);
    assert.equal(digest(readFileSync(join(archive,path))), source.sha256, `${question.id}: ${source.filename}`);
  }
});

test('the five-mark matching question has the original five tools, one unused purpose and both public PDF sources', () => {
  const question = section5ExtraPapers.find(q => q.id === 'E5C01');
  assert.deepEqual(question.parts, [{ part: '1(a)', marks: 5 }]);
  assert.deepEqual(question.solution[0].rows.map(row => row[0]), ['Virus checker', 'Disk formatter', 'Back-up', 'Disk repair', 'Defragmentation']);
  assert.deepEqual(question.objectiveIds, ['S5.02.A01', 'S5.02.A02', 'S5.02.A03', 'S5.02.A04', 'S5.02.A06']);
  for (const [kind, page] of [['qp', 2], ['ms', 3]]) {
    const source = question[kind];
    assert.equal(new URL(source.sourceURL).pathname.split('/').at(-1), source.filename);
    const [extract] = source.extracts;
    assert.equal(extract.page, page);
    const [left, top, right, bottom] = extract.bbox;
    assert.deepEqual([extract.width, extract.height], [2 * (right - left), 2 * (bottom - top)]);
  }
});

test('downloaded public originals have the reviewed SHA-256 values', t => {
  const cache = process.env.AS9618_PAST_PAPER_PUBLIC_ROOT;
  if (!cache) return t.skip('Set AS9618_PAST_PAPER_PUBLIC_ROOT to the directory containing the public Cambridge PDFs to check originals offline');
  for (const question of section5ExtraPapers) for (const kind of ['qp', 'ms']) {
    const source = question[kind];
    if (source.sourceURL) assert.equal(digest(readFileSync(join(cache, source.filename))), source.sha256, source.filename);
  }
});

test('generated illustrations match the reviewed prompt and asset register', () => {
  const register = JSON.parse(readFileSync(join(root,'scripts/course-v3-section5-classroom-images.json')));
  for (const asset of register.assets) {
    assert.ok(asset.prompt && asset.purpose && asset.review);
    assert.equal(digest(readFileSync(join(root,asset.path))), asset.sha256, asset.path);
  }
});


test('the checkpoint first presents exactly three independent questions totalling 15 marks', () => {
  const helpers = { renderPractice: () => '' };
  const pages = lessons.map(l => renderSection5Classroom({ ...l, pastPaperQuestions: section5PapersForLesson(l, pool) }, helpers));
  const start = pages[1].indexOf(`data-s5-topic id="${section5Checkpoint.id}"`);
  const end = pages[1].indexOf('<nav class="s5-navigation"', start);
  const before = pages[0] + pages[1].slice(0, start);
  const checkpoint = pages[1].slice(start, end);
  const published = [...checkpoint.matchAll(/class="exam-question" id="[^"]+" data-question-id="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(published, ['E5C01', 'E039', 'E040']);
  for (const id of published) assert.ok(!before.includes(`data-question-id="${id}"`));
  assert.equal(published.reduce((sum,id) => sum + papers.find(q => q.id === id).marks, 0), 15);
  assert.equal(checkpoint.split('<details class="exam-question-sheet" open>').length - 1, 3);
  for (const role of ['original-question', 'solution', 'mark-scheme']) assert.equal(checkpoint.split(`data-exam-role="${role}"`).length - 1, 3);
});

test('legacy unit and concept bookmarks share the intended material', () => {
  const expected = [[28, 'unit-3', 'process-turns'],[29, 'unit-2', 'library-routine'],[29, 'unit-3', 'dll-sharing'],[32, 'unit-2', 'debug-with-evidence']];
  for (const [page, unit, concept] of expected) {
    const material = section5Journey[page].groups.flatMap(g => g.materials).find(m => m.aliases.includes(unit));
    assert.ok(material?.aliases.includes(concept), `${page} ${unit}`);
  }
});
