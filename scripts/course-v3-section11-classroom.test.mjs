import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section11Journey, section11Modules, section11Sessions, section11PaperObjectives, section11PaperCoverageNotes } from './course-v3-section11-journey.mjs';
import { section11GroupObjectives, section11PapersForLesson, renderSection11Classroom, renderSection11Overview } from './course-v3-section11-classroom.mjs';
import { labMarkup } from './course-v3-section11-labs.mjs';
import { renderPastPaperQuestions } from './course-v3-past-paper-render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const baseLessons = courseV3Lessons.filter(lesson => lesson.section === 11).sort((a, b) => a.sequenceIndex - b.sequenceIndex);
const descriptions = new Map(baseLessons.flatMap(lesson => lesson.objectives));
const pool = courseV3Lessons.flatMap(lesson => lesson.pastPaperQuestions ?? []);
const lessons = baseLessons.map(lesson => ({
  ...lesson,
  legacyPastPaperQuestions: lesson.pastPaperQuestions,
  objectives: [...new Map([...lesson.objectives, ...section11Journey[lesson.sequenceIndex].groups.flatMap(group => group.objectiveIds).map(id => [id, descriptions.get(id)])])],
  pastPaperQuestions: section11PapersForLesson(lesson, pool)
}));
const groups = lessons.flatMap(lesson => section11Journey[lesson.sequenceIndex].groups);
const order = section11Modules.flatMap(module => module.groups);
const orderedGroups = order.map(id => groups.find(group => group.id === id));
const sorted = values => [...values].sort();
const unique = values => [...new Set(values)];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const ids = (requirement, ...numbers) => numbers.map(number => `S11.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);
const requiredObjectives = [1, 5, 3, 5, 1, 5, 4, 4, 1].flatMap((count, index) => ids(index + 1, ...Array.from({ length: count }, (_, i) => i + 1)));
const paperIds = Array.from({ length: 12 }, (_, i) => `E${String(86 + i).padStart(3, '0')}`);
const sources = paperIds.map(id => pool.find(question => question.id === id));
const helpers = {
  renderPastPaperQuestions,
  renderPractice: question => `<article class="practice-question" id="${question.id.toLowerCase()}" data-question-id="${question.id}"><details><summary>Teacher-written answer</summary><p>Model reasoning</p></details></article>`
};
const rendered = lesson => renderSection11Classroom(lesson, helpers);
function fragment(html, lesson, group) {
  const local = section11Journey[lesson.sequenceIndex].groups;
  const next = local[local.indexOf(group) + 1];
  const start = html.indexOf(`id="${group.id}"`);
  const end = next ? html.indexOf(`id="${next.id}"`, start + 1) : html.indexOf('<nav class="s5-navigation"', start);
  assert.ok(start >= 0 && end > start, group.id);
  return html.slice(start, end);
}
const owner = id => lessons.find(lesson => section11Journey[lesson.sequenceIndex].groups.some(group => group.id === id));
const linkFor = (id, phase) => `../${owner(id).route}/#${id}--${phase}`;

test('the twelve stable routes retain all 31 unit keys and all 29 Section 11 objectives', () => {
  assert.deepEqual(lessons.map(lesson => lesson.sequenceIndex), Array.from({ length: 12 }, (_, i) => 72 + i));
  assert.equal(requiredObjectives.length, 29);
  assert.equal(baseLessons.reduce((total, lesson) => total + lesson.units.length, 0), 31);
  assert.deepEqual(sorted(unique(groups.flatMap(group => group.objectiveIds))), sorted(requiredObjectives));
  assert.equal(unique(groups.map(group => group.id)).length, groups.length);
  for (const lesson of lessons) {
    const local = section11Journey[lesson.sequenceIndex].groups;
    assert.deepEqual(sorted(unique(local.flatMap(group => group.unitKeys))), sorted(lesson.units.map(unit => unit.unitKey)), lesson.route);
    for (const group of local) assert.ok(section11GroupObjectives(group, lesson).length);
    for (const [, description] of lesson.objectives) assert.ok(description?.trim(), lesson.route);
  }
});

test('the learning route starts with declarations and teaches dependencies before complete programs', () => {
  assert.deepEqual(sorted(order), sorted(groups.map(group => group.id)));
  assert.equal(unique(order).length, order.length);
  assert.equal(owner(order[0]).sequenceIndex, 73);
  const taught = new Set();
  for (const group of orderedGroups) {
    for (const prerequisite of group.prerequisites ?? []) assert.ok(taught.has(prerequisite), `${group.id}: ${prerequisite} has not been taught`);
    taught.add(group.id);
  }
  const firstUnit = unitKey => orderedGroups.findIndex(group => group.unitKeys.includes(unitKey));
  for (const prerequisite of ['S11-DECLARE', 'S11-ASSIGN-IO', 'S11-LOGICAL', 'S11-IF-NESTED', 'S11-FOR-BOUNDS', 'S11-WHILE']) {
    assert.ok(firstUnit(prerequisite) < firstUnit('S11-TRANSLATE-ENGLISH'), `${prerequisite} must precede full translation`);
  }
  assert.ok(firstUnit('S11-STRING-FUNCTIONS') < firstUnit('S11-FUNCTION-RETURN'));
  assert.ok(firstUnit('S11-PROCEDURE-CALL') < firstUnit('S11-BYVAL-BYREF'));
  const sessions = section11Sessions.flatMap(session => session.groups);
  assert.deepEqual(sorted(unique(sessions)), sorted(order));
  for (const session of section11Sessions) {
    assert.equal(session.minutes, 45);
    assert.ok(session.title.trim() && session.focus.trim());
    for (const id of session.groups) assert.ok(taught.has(id), `${session.id}: unknown concept ${id}`);
  }
});

test('all 12 original paper tasks appear once, after their required teaching, with precise coverage', () => {
  assert.deepEqual(sorted(groups.flatMap(group => group.papers ?? [])), sorted(paperIds));
  assert.deepEqual(sorted(Object.keys(section11PaperObjectives)), sorted(paperIds));
  assert.ok(sources.every(Boolean));
  assert.equal(sources.reduce((sum, question) => sum + question.marks, 0), 61);
  assert.equal(sources.reduce((sum, question) => sum + question.parts.length, 0), 17);
  const taught = new Set();
  for (const group of orderedGroups) {
    group.objectiveIds.forEach(id => taught.add(id));
    for (const id of group.papers ?? []) {
      assert.ok(section11PaperCoverageNotes[id]?.trim(), `${id}: missing scope or prerequisite note`);
      assert.ok(section11PaperObjectives[id].length);
      for (const objective of section11PaperObjectives[id]) assert.ok(taught.has(objective), `${id} precedes ${objective}`);
    }
  }
  assert.deepEqual(section11PaperObjectives.E087, ids(2, 1), 'the postal-rate question assesses named constants');
  assert.ok(section11PaperObjectives.E096.includes('S11.09.A01'), 'NewLoan explicitly requests efficient pseudocode and rewards early termination');
  assert.ok(section11PaperObjectives.E096.includes('S11.07.A01'), 'NewLoan is a Boolean-returning function');
  assert.equal(lessons.find(lesson => lesson.pastPaperQuestions.some(q => q.id === 'E092')).sequenceIndex, 79, 'capacity and sentinel controls precede E092');
  assert.equal(lessons.find(lesson => lesson.pastPaperQuestions.some(q => q.id === 'E096')).sequenceIndex, 81, 'return-path teaching precedes E096');
});

test('every concept provides concrete material, recall, explanation, a worked example and an independent check', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    assert.match(html, /data-mode="reading"/);
    assert.match(html, /<noscript>/);
    for (const group of section11Journey[lesson.sequenceIndex].groups) {
      assert.ok(group.stimulus.title.trim() && (group.stimulus.items?.length || group.stimulus.table), group.id);
      assert.ok(group.prerequisite?.title?.trim() && group.prerequisite.body?.trim(), `${group.id}: recall`);
      assert.ok(group.steps.length >= 3 && group.worked.steps.length >= 2, group.id);
      assert.ok(group.check.prompt.trim() && group.check.answer.trim(), group.id);
      const part = fragment(html, lesson, group);
      const opening = part.slice(part.indexOf(`id="${group.id}--observe"`), part.indexOf(`id="${group.id}--prepare"`));
      assert.match(opening, /class="s11-stimulus"/);
      assert.doesNotMatch(opening, /class="s5-starting-example"/, `${group.id}: opening must not leak the later solution`);
      for (const phase of ['observe', 'prepare', 'explain', 'worked', 'check', 'recap']) assert.ok(part.includes(`id="${group.id}--${phase}"`), `${group.id}: ${phase}`);
      for (const step of [...group.steps, ...group.worked.steps]) {
        assert.ok(step.title?.trim() && step.body?.trim(), `${group.id}: incomplete teaching step`);
        if (step.code) assert.ok(!step.code.includes('\\n'), `${group.id}: literal newline escape in code`);
        if (step.table) for (const row of step.table.rows) assert.equal(row.length, step.table.headers.length, group.id);
      }
    }
  }
});

test('cross-page navigation and the overview share the complete learning order', () => {
  let crossPage = 0;
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section11Journey[lesson.sequenceIndex].groups) {
      const index = order.indexOf(group.id);
      const part = fragment(html, lesson, group);
      assert.ok(part.includes(`data-s11-order="${index + 1}" data-s11-total="${order.length}"`));
      assert.ok(part.includes(`data-s11-prev="${index ? linkFor(order[index - 1], 'recap') : ''}"`));
      assert.ok(part.includes(`data-s11-next="${index < order.length - 1 ? linkFor(order[index + 1], 'observe') : ''}"`));
      if (index < order.length - 1 && owner(order[index + 1]).route !== lesson.route) crossPage += 1;
    }
  }
  assert.ok(crossPage >= 11);
  const overview = renderSection11Overview(lessons);
  for (const id of order) assert.ok(overview.includes(`href="${linkFor(id, 'observe')}"`), id);
});

test('reordered concepts retain accurate official syllabus headings', () => {
  const headings = { '11.1': 'Programming Basics', '11.2': 'Constructs', '11.3': 'Structured Programming' };
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section11Journey[lesson.sequenceIndex].groups) {
      const expected = unique(group.objectiveIds.map(id => {
        const requirement = Number(id.split('.')[1]);
        return requirement <= 3 ? '11.1' : requirement <= 5 ? '11.2' : '11.3';
      }));
      const part = fragment(html, lesson, group);
      const actual = [...part.matchAll(/data-s11-syllabus="([^"]+)"/g)].map(match => match[1]);
      assert.deepEqual(sorted(actual), sorted(expected), `${group.id}: wrong official syllabus heading`);
      for (const id of expected) assert.ok(part.includes(`${id} ${headings[id]}</span>`));
    }
  }
  const overview = renderSection11Overview(lessons);
  assert.match(overview, /<summary>Syllabus coverage<\/summary>/);
  for (const [id, title] of Object.entries(headings)) assert.ok(overview.includes(`<summary>${id} ${title}`));
});

test('old unit, practice and moved-paper bookmarks survive without initially opened answers', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    const identifiers = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(identifiers).size, identifiers.length, `${lesson.route}: duplicate HTML id`);
    assert.doesNotMatch(html, /<details\b[^>]*\sopen(?:[\s=>])/i, `${lesson.route}: answer starts visible`);
    for (const [index, unit] of lesson.units.entries()) {
      const group = section11Journey[lesson.sequenceIndex].groups.find(item => item.unitKeys.includes(unit.unitKey));
      assert.ok(fragment(html, lesson, group).includes(`id="unit-${index + 1}"`), `${lesson.route}#unit-${index + 1}`);
    }
    for (const id of ['visual-and-core', 'past-paper-questions', 'original-exam-style-question', 'practice', 'summary', 'lesson-contents']) assert.ok(identifiers.includes(id), `${lesson.route}#${id}`);
    for (const question of [...lesson.practice, ...(lesson.optionalPractice ?? [])]) assert.ok(html.includes(`data-question-id="${question.id}"`), question.id);
    for (const question of lesson.legacyPastPaperQuestions) assert.ok(identifiers.includes(question.id.toLowerCase()), `${lesson.route}#${question.id.toLowerCase()}`);
    for (const question of lesson.pastPaperQuestions) assert.ok(identifiers.includes(question.id.toLowerCase()), question.id);
  }
  assert.match(rendered(lessons.find(l => l.sequenceIndex === 78)), /href="\.\.\/lesson-079\/#e092"/);
  assert.match(rendered(lessons.find(l => l.sequenceIndex === 82)), /href="\.\.\/lesson-081\/#e096"/);
});

test('papers follow independent checks and retain separate hints, reasoning and official MS', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section11Journey[lesson.sequenceIndex].groups) {
      const part = fragment(html, lesson, group);
      for (const id of group.papers ?? []) {
        const start = part.indexOf(`data-question-id="${id}"`);
        assert.ok(start > part.indexOf(`id="${group.id}--check"`), `${id}: paper precedes check`);
        const paper = part.slice(start, part.indexOf('</article>', start));
        for (const role of ['original-question', 'reading', 'solution', 'mark-scheme']) assert.ok(paper.includes(`data-exam-role="${role}"`), `${id}: ${role}`);
        const source = sources.find(question => question.id === id);
        for (const extract of [...source.qp.extracts, ...source.ms.extracts, ...(source.inserts ?? [])]) assert.ok(part.includes(`src="../..${extract.asset}"`), extract.asset);
      }
    }
  }
});

test('experiments resolve to real labs, include predictions and keep reset controls', () => {
  let labCount = 0;
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section11Journey[lesson.sequenceIndex].groups.filter(group => group.lab)) {
      labCount += 1;
      assert.ok(labMarkup[group.lab], group.lab);
      assert.ok(group.experimentPrompt.trim(), group.id);
      const part = fragment(html, lesson, group);
      assert.ok(part.includes(`data-s11-lab="${group.lab}"`));
      assert.match(part, /data-s11-action="reset"/);
    }
  }
  assert.ok(labCount >= 12, 'the learning route includes interactive execution throughout the chapter');
});

test('original extracts retain reviewed bytes, dimensions, source identities and marks', () => {
  const original = JSON.parse(readFileSync(join(root, 'scripts/past-paper-source-manifest.json'), 'utf8')).questions;
  for (const question of sources) {
    assert.equal(question.parts.reduce((sum, part) => sum + part.marks, 0), question.marks, question.id);
    assert.equal(question.extractReview.status, 'verified', question.id);
    const retained = original.find(item => item.id === question.id);
    assert.ok(retained, `${question.id}: missing original source manifest record`);
    for (const kind of ['qp', 'ms']) {
      const source = question[kind];
      assert.deepEqual(source, retained[kind], `${question.id}: changed source metadata`);
      assert.ok(source.filename.endsWith('.pdf') && /^[a-f0-9]{64}$/.test(source.sha256) && source.extracts.length, `${question.id}: ${kind}`);
      for (const extract of source.extracts) {
        const bytes = readFileSync(join(root, 'web', extract.asset));
        assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', extract.asset);
        assert.equal(digest(bytes), extract.sha256, extract.asset);
        assert.equal(bytes.readUInt32BE(16), extract.width, extract.asset);
        assert.equal(bytes.readUInt32BE(20), extract.height, extract.asset);
        assert.ok(extract.page >= 1 && extract.bbox.length === 4, extract.asset);
      }
    }
  }
});

test('the opening illustration retains its reviewed generated asset and appears in the teaching route', () => {
  const manifest = JSON.parse(readFileSync(join(root, 'scripts/course-v3-section11-classroom-images.json'), 'utf8'));
  assert.ok(manifest.assets.length > 0);
  for (const asset of manifest.assets) {
    const bytes = readFileSync(join(root, asset.path));
    assert.equal(digest(bytes), asset.sha256, asset.path);
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', asset.path);
    assert.equal(bytes.readUInt32BE(16), asset.width, asset.path);
    assert.equal(bytes.readUInt32BE(20), asset.height, asset.path);
    assert.ok(asset.prompt.trim() && asset.review.trim(), `${asset.path}: missing generation or visual review record`);
    assert.ok(groups.some(group => group.image?.asset === asset.path.replace(/^web/, '')), `${asset.path}: unused illustration`);
  }
});

test('local original PDFs match the registered source identities when the archive is available', async t => {
  const archive = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
  if (!existsSync(archive)) return t.skip('Local original-PDF archive unavailable; published extract hashes are verified separately.');
  const candidates = readdirSync(archive, { recursive: true }).map(String);
  const checked = new Set();
  for (const question of sources) for (const kind of ['qp', 'ms']) {
    const source = question[kind];
    const identity = `${source.filename}:${source.sha256}`;
    if (checked.has(identity)) continue;
    checked.add(identity);
    await t.test(source.filename, subtest => {
      const relative = candidates.find(path => path.endsWith('/' + source.filename) || path === source.filename);
      if (!relative) return subtest.skip(`Local original PDF unavailable: ${source.filename}`);
      assert.equal(digest(readFileSync(join(archive, relative))), source.sha256, question.id);
    });
  }
});
