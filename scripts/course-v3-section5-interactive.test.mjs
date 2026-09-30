import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section5Journey, section5Sessions, section5PaperObjectives, section5PaperCoverageNotes } from './course-v3-section5-journey.mjs';
import { groupObjectives, section5PapersForLesson, renderSection5Classroom } from './course-v3-section5-classroom.mjs';
import { labMarkup } from './course-v3-section5-labs.mjs';
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
  for (const group of groups) {
    group.objectiveIds.forEach(id => taught.add(id));
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

test('the route contains complete explanations, concrete materials and usable model configurations', () => {
  for (const group of groups) {
    assert.ok(group.question && group.observe && group.check?.prompt && group.check?.answer && group.takeaway, group.id);
    assert.ok(group.steps.length >= 3, `${group.id}: missing explanation stages`);
    assert.ok(group.image || group.lab || group.steps.some(step => step.table || step.code), `${group.id}: lacks concrete material`);
    for (const step of [...group.steps, ...(group.worked?.steps ?? [])]) {
      assert.ok(step.title && step.body, `${group.id}: incomplete step`);
      if (step.table) for (const row of step.table.rows) assert.equal(row.length, step.table.headers.length, `${group.id}: table columns`);
    }
    if (group.lab) assert.ok(labMarkup[group.lab]?.includes('data-action="reset-lab"'), `${group.id}: missing resettable lab`);
    if (group.labConfig?.problem) assert.ok(labMarkup[group.lab].includes(`value="${group.labConfig.problem}"`));
    if (group.labConfig?.scenario) assert.ok(labMarkup[group.lab].includes(`value="${group.labConfig.scenario}"`));
    if (group.image) assert.ok(existsSync(join(root, 'web', group.image.asset)), `${group.id}: missing illustration`);
  }
  assert.deepEqual(section5Sessions.flatMap(session => session.groups), groups.map(group => group.id));
  for (const session of section5Sessions) assert.ok(session.minutes[0] > 0 && session.minutes[1] >= session.minutes[0]);
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
    assert.doesNotMatch(html, /<details\b[^>]*\sopen(?:[\s=>])/);
    for (const group of section5Journey[lesson.sequenceIndex].groups) {
      const groupStart = html.indexOf(`id="${group.id}"`);
      assert.ok(groupStart >= 0);
      for (const id of group.papers) assert.ok(html.indexOf(`data-question-id="${id}"`, groupStart) > html.indexOf(`id="${group.id}--explain"`, groupStart));
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
    assert.ok(path, source.filename);
    assert.equal(digest(readFileSync(join(archive,path))), source.sha256, `${question.id}: ${source.filename}`);
  }
});

test('generated illustrations match the reviewed prompt and asset register', () => {
  const register = JSON.parse(readFileSync(join(root,'scripts/course-v3-section5-classroom-images.json')));
  for (const asset of register.assets) {
    assert.ok(asset.prompt && asset.purpose && asset.review);
    assert.equal(digest(readFileSync(join(root,asset.path))), asset.sha256, asset.path);
  }
});


test('bookmarks from the previous interactive presentation lead to the corresponding new concept', () => {
  const expected = { 28: { 3: 'process-turns' }, 29: { 2: 'library-routine', 3: 'dll-sharing' }, 32: { 2: 'debug-with-evidence' } };
  for (const [sequence, anchors] of Object.entries(expected)) {
    const lesson = lessons.find(item => item.sequenceIndex === Number(sequence));
    const html = renderSection5Classroom({ ...lesson, pastPaperQuestions: section5PapersForLesson(lesson, pool) }, { renderPastPaperQuestions, renderPractice: () => '' });
    for (const [number, concept] of Object.entries(anchors)) {
      const anchor = html.indexOf(`id="unit-${number}"`);
      const group = html.lastIndexOf('<article class="s5-group"', anchor);
      assert.ok(html.slice(group,anchor).includes(`id="${concept}"`), `${sequence} unit-${number}`);
    }
  }
});
