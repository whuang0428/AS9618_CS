import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section10Journey, section10Modules, section10Sessions, section10PaperObjectives, section10PaperCoverageNotes } from './course-v3-section10-journey.mjs';
import { section10GroupObjectives, section10PapersForLesson, renderSection10Classroom, renderSection10Overview } from './course-v3-section10-classroom.mjs';
import { section10ExtraPapers } from './course-v3-section10-extra-papers.mjs';
import { labMarkup } from './course-v3-section10-labs.mjs';
import { renderPastPaperQuestions } from './course-v3-past-paper-render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const baseLessons = courseV3Lessons.filter(lesson => lesson.section === 10).sort((a, b) => a.sequenceIndex - b.sequenceIndex);
const descriptions = new Map(baseLessons.flatMap(lesson => lesson.objectives));
const pool = [...courseV3Lessons.flatMap(lesson => lesson.pastPaperQuestions ?? []), ...section10ExtraPapers];
const lessons = baseLessons.map(lesson => ({
  ...lesson,
  objectives: [...new Map([...lesson.objectives, ...section10Journey[lesson.sequenceIndex].groups.flatMap(group => group.objectiveIds).map(id => [id, descriptions.get(id)])])],
  pastPaperQuestions: section10PapersForLesson(lesson, pool)
}));
const groups = lessons.flatMap(lesson => section10Journey[lesson.sequenceIndex].groups);
const order = section10Modules.flatMap(module => module.groups);
const orderedGroups = order.map(id => groups.find(group => group.id === id));
const sorted = values => [...values].sort();
const unique = values => [...new Set(values)];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const ids = (requirement, ...numbers) => numbers.map(number => `S10.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);
const requiredObjectives = [6, 3, 2, 1, 1, 2, 2, 1, 3, 4].flatMap((count, index) => ids(index + 1, ...Array.from({ length: count }, (_, i) => i + 1)));
// Checked against the selected QP parts and official MS, not inherited lesson-wide mappings.
const expectedPaperObjectives = {
  E075: ids(1, 1, 3, 4), E076: ids(2, 2), E077: [...ids(3, 1, 2), ...ids(5, 1)],
  E078: ids(5, 1), E079: ids(5, 1), E079L: ids(6, 1), E079B: [...ids(5, 1), ...ids(6, 2)],
  E080: ids(7, 2), E081: ids(10, 1, 4), E082: ids(10, 2, 4), E083: ids(10, 3, 4),
  E084: ids(10, 4), E085: ids(10, 1, 2, 4)
};
const sources = Object.keys(expectedPaperObjectives).map(id => pool.find(question => question.id === id));
const helpers = {
  renderPastPaperQuestions,
  renderPractice: question => `<article class="practice-question" id="${question.id.toLowerCase()}" data-question-id="${question.id}"><details><summary>Teacher-written answer</summary><p>Model reasoning</p></details></article>`
};
const rendered = lesson => renderSection10Classroom(lesson, helpers);
function fragment(html, lesson, group) {
  const local = section10Journey[lesson.sequenceIndex].groups;
  const next = local[local.indexOf(group) + 1];
  const start = html.indexOf(`id="${group.id}"`);
  const end = next ? html.indexOf(`id="${next.id}"`, start + 1) : html.indexOf('<nav class="s5-navigation"', start);
  assert.ok(start >= 0 && end > start, group.id);
  return html.slice(start, end);
}
const owner = id => lessons.find(lesson => section10Journey[lesson.sequenceIndex].groups.some(group => group.id === id));
const linkFor = (id, phase) => `../${owner(id).route}/#${id}--${phase}`;

test('the fourteen stable routes retain every unit and cover all 25 Section 10 objectives', () => {
  assert.deepEqual(lessons.map(lesson => lesson.sequenceIndex), Array.from({ length: 14 }, (_, i) => 58 + i));
  assert.equal(requiredObjectives.length, 25);
  assert.deepEqual(sorted(unique(groups.flatMap(group => group.objectiveIds))), sorted(requiredObjectives));
  assert.equal(unique(groups.map(group => group.id)).length, groups.length);
  for (const lesson of lessons) {
    const local = section10Journey[lesson.sequenceIndex].groups;
    assert.deepEqual(sorted(unique(local.flatMap(group => group.unitKeys))), sorted(lesson.units.map(unit => unit.unitKey)), lesson.route);
    for (const group of local) assert.ok(section10GroupObjectives(group, lesson).length);
    for (const [, description] of lesson.objectives) assert.ok(description?.trim(), lesson.route);
  }
});

test('the learning route and 45-minute sessions include every concept after its prerequisites', () => {
  assert.deepEqual(sorted(order), sorted(groups.map(group => group.id)));
  assert.equal(unique(order).length, order.length);
  const taught = new Set();
  for (const group of orderedGroups) {
    for (const prerequisite of group.prerequisites ?? []) assert.ok(taught.has(prerequisite), `${group.id}: ${prerequisite} has not been taught`);
    taught.add(group.id);
  }
  const sessions = section10Sessions.flatMap(session => session.groups);
  assert.deepEqual(sorted(unique(sessions)), sorted(order));
  for (const session of section10Sessions) {
    assert.equal(session.minutes, 45);
    assert.ok(session.title.trim() && session.focus.trim());
    for (const id of session.groups) assert.ok(taught.has(id), `${session.id}: unknown concept ${id}`);
  }
});

test('authentic papers use precise mappings and appear only after the required teaching', () => {
  assert.deepEqual(section10PaperObjectives, expectedPaperObjectives);
  assert.deepEqual(sorted(groups.flatMap(group => group.papers ?? [])), sorted(Object.keys(expectedPaperObjectives)));
  assert.ok(sources.every(Boolean));
  assert.equal(sources.length, 13);
  assert.equal(sources.reduce((sum, question) => sum + question.marks, 0), 70);
  assert.equal(sources.reduce((sum, question) => sum + question.parts.length, 0), 22);
  const taught = new Set();
  for (const group of orderedGroups) {
    group.objectiveIds.forEach(id => taught.add(id));
    for (const id of group.papers ?? []) {
      assert.ok(section10PaperCoverageNotes[id]?.trim(), `${id}: missing scope or prerequisite note`);
      for (const objective of section10PaperObjectives[id]) assert.ok(taught.has(objective), `${id} precedes ${objective}`);
    }
  }
  assert.equal(lessons.find(lesson => lesson.pastPaperQuestions.some(q => q.id === 'E077')).sequenceIndex, 62, '2D declaration precedes E077');
  assert.equal(lessons.find(lesson => lesson.pastPaperQuestions.some(q => q.id === 'E083')).sequenceIndex, 70, 'free-list preservation precedes E083');
  const linear = groups.find(group => group.papers?.includes('E079L'));
  assert.match(JSON.stringify(linear), /RETURN/);
  assert.match(JSON.stringify(linear), /-1/);
  const bubble = groups.find(group => group.papers?.includes('E079B'));
  const bubbleText = JSON.stringify(bubble);
  assert.match(bubbleText, /Reading/);
  assert.match(bubbleText, /NoSwaps/);
  assert.match(bubbleText, /boundary/i);
  assert.match(bubbleText, /PROCEDURE/);
  assert.match(bubbleText, /both|pair/i);
  assert.deepEqual(sources.find(q => q.id === 'E079B').parts, [{ part: '6(b)', marks: 8 }], 'exclude the untaught test-plan question');
});

test('every concept begins with concrete material and has complete explanation, example and check', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    assert.match(html, /data-mode="reading"/);
    assert.match(html, /<noscript>/);
    for (const group of section10Journey[lesson.sequenceIndex].groups) {
      assert.ok(group.stimulus.title.trim() && (group.stimulus.items?.length || group.stimulus.table), group.id);
      assert.ok(group.steps.length >= 3 && group.worked.steps.length >= 2, group.id);
      assert.ok(group.check.prompt.trim() && group.check.answer.trim(), group.id);
      const part = fragment(html, lesson, group);
      const opening = part.slice(part.indexOf(`id="${group.id}--observe"`), part.indexOf(`id="${group.id}--prepare"`));
      assert.match(opening, /class="s10-stimulus"/);
      assert.doesNotMatch(opening, /<pre\b|class="s5-starting-example"/);
      for (const phase of ['observe', 'explain', 'worked', 'check', 'recap']) assert.ok(part.includes(`id="${group.id}--${phase}"`), `${group.id}: ${phase}`);
      for (const step of [...group.steps, ...group.worked.steps]) {
        assert.ok(step.title?.trim() && step.body?.trim(), `${group.id}: incomplete teaching step`);
        if (step.code) assert.ok(!step.code.includes('\\n'), `${group.id}: code contains literal newline escapes`);
        if (step.table) for (const row of step.table.rows) assert.equal(row.length, step.table.headers.length, group.id);
      }
    }
  }
});

test('cross-page navigation and the overview use the same complete learning order', () => {
  let crossPage = 0;
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section10Journey[lesson.sequenceIndex].groups) {
      const index = order.indexOf(group.id);
      const part = fragment(html, lesson, group);
      assert.ok(part.includes(`data-s10-order="${index + 1}" data-s10-total="${order.length}"`));
      assert.ok(part.includes(`data-s10-prev="${index ? linkFor(order[index - 1], 'recap') : ''}"`));
      assert.ok(part.includes(`data-s10-next="${index < order.length - 1 ? linkFor(order[index + 1], 'observe') : ''}"`));
      if (index < order.length - 1 && owner(order[index + 1]).route !== lesson.route) crossPage += 1;
    }
  }
  assert.ok(crossPage >= 13);
  const overview = renderSection10Overview(lessons);
  for (const id of order) assert.ok(overview.includes(`href="${linkFor(id, 'observe')}"`), id);
});

test('all previous unit, practice and question bookmarks remain reachable with answers initially folded', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    const identifiers = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(identifiers).size, identifiers.length, `${lesson.route}: duplicate HTML id`);
    assert.doesNotMatch(html, /<details\b[^>]*\sopen(?:[\s=>])/i, `${lesson.route}: answer starts visible`);
    for (const [index, unit] of lesson.units.entries()) {
      const group = section10Journey[lesson.sequenceIndex].groups.find(item => item.unitKeys.includes(unit.unitKey));
      assert.ok(fragment(html, lesson, group).includes(`id="unit-${index + 1}"`), `${lesson.route}#unit-${index + 1}`);
    }
    for (const id of ['visual-and-core', 'past-paper-questions', 'original-exam-style-question', 'practice', 'summary', 'lesson-contents']) assert.ok(identifiers.includes(id), `${lesson.route}#${id}`);
    for (const question of [...lesson.practice, ...(lesson.optionalPractice ?? [])]) assert.ok(html.includes(`data-question-id="${question.id}"`), question.id);
    const oldLesson = baseLessons.find(item => item.sequenceIndex === lesson.sequenceIndex);
    for (const question of oldLesson.pastPaperQuestions ?? []) assert.ok(identifiers.includes(question.id.toLowerCase()), `${lesson.route}#${question.id.toLowerCase()}`);
    for (const question of lesson.pastPaperQuestions) assert.ok(identifiers.includes(question.id.toLowerCase()), question.id);
  }
});

test('papers follow their checks and preserve separate hint, reasoning and official MS controls', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section10Journey[lesson.sequenceIndex].groups) {
      const part = fragment(html, lesson, group);
      for (const id of group.papers ?? []) {
        const start = part.indexOf(`data-question-id="${id}"`);
        assert.ok(start > part.indexOf(`id="${group.id}--check"`), `${id}: paper precedes check`);
        const paper = part.slice(start, part.indexOf('</article>', start));
        for (const role of ['original-question', 'reading', 'solution', 'mark-scheme']) assert.ok(paper.includes(`data-exam-role="${role}"`), `${id}: ${role}`);
        const source = sources.find(question => question.id === id);
        for (const extract of [...source.qp.extracts, ...source.ms.extracts]) assert.ok(part.includes(`src="../..${extract.asset}"`), extract.asset);
      }
    }
  }
});

test('every experiment resolves to a real lab and has prediction and reset controls', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section10Journey[lesson.sequenceIndex].groups.filter(group => group.lab)) {
      assert.ok(labMarkup[group.lab], group.lab);
      assert.ok(group.experimentPrompt.trim(), group.id);
      const part = fragment(html, lesson, group);
      assert.ok(part.includes(`data-s10-lab="${group.lab}"`));
      assert.match(part, /data-s10-action="reset"/);
    }
  }
});

test('reviewed original extracts retain their bytes, dimensions, context metadata and marks', () => {
  const original = JSON.parse(readFileSync(join(root, 'scripts/past-paper-source-manifest.json'), 'utf8')).questions;
  for (const question of sources) {
    assert.equal(question.parts.reduce((sum, part) => sum + part.marks, 0), question.marks, question.id);
    assert.equal(question.extractReview.status, 'verified', question.id);
    const retained = original.find(item => item.id === question.id);
    for (const kind of ['qp', 'ms']) {
      const source = question[kind];
      if (retained) assert.deepEqual(source, retained[kind], `${question.id}: changed source metadata`);
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

test('the academic scene retains its reviewed image identity and is used only as contextual material', () => {
  const manifest = JSON.parse(readFileSync(join(root, 'scripts/course-v3-section10-classroom-images.json'), 'utf8'));
  assert.ok(manifest.images.length);
  for (const source of manifest.images) {
    assert.equal(digest(readFileSync(join(root, 'web', source.asset))), source.sha256, source.asset);
    assert.match(source.prompt, /academic/i);
    assert.match(source.review, /reviewed/i);
    assert.ok(groups.some(group => JSON.stringify(group.image ?? {}).includes(source.asset)), `${source.asset}: unused image`);
  }
});

test('the local original PDFs match all registered source identities', async t => {
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
