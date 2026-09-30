import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section7Journey, section7Sessions, section7PaperObjectives, section7PaperCoverageNotes } from './course-v3-section7-journey.mjs';
import { section7GroupObjectives, section7PapersForLesson, renderSection7Classroom } from './course-v3-section7-classroom.mjs';
import { section7ExtraPapers } from './course-v3-section7-extra-papers.mjs';
import { labMarkup } from './course-v3-section7-labs.mjs';
import { renderPastPaperQuestions } from './course-v3-past-paper-render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessons = courseV3Lessons.filter(lesson => lesson.section === 7).sort((a, b) => a.sequenceIndex - b.sequenceIndex);
const pool = lessons.flatMap(lesson => lesson.pastPaperQuestions);
const sources = [...pool, ...section7ExtraPapers];
const groups = lessons.flatMap(lesson => section7Journey[lesson.sequenceIndex].groups);
const sorted = values => [...values].sort();
const unique = values => [...new Set(values)];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const ids = (requirement, ...numbers) => numbers.map(number => `S7.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);
const requiredObjectives = [2, 2, 3, 1, 5, 6].flatMap((count, index) => ids(index + 1, ...Array.from({ length: count }, (_, i) => i + 1)));
const expectedPapers = ['E051', 'E052', 'E053', 'E054', 'E055', 'E7D01', 'E7D02', 'E7D03'];
const expectedPaperObjectives = {
  E051: ids(2, 2),
  E052: [...ids(1, 2), ...ids(2, 2)],
  E053: [...ids(1, 2), ...ids(3, 1, 2)],
  E054: [...ids(4, 1), ...ids(5, 1, 2, 4, 5)],
  E055: ids(6, 2, 3),
  E7D01: ids(5, 3, 4),
  E7D02: ids(6, 3),
  E7D03: [...ids(3, 1), ...ids(6, 3)]
};
const helpers = {
  renderPastPaperQuestions,
  renderPractice: question => `<article data-question-id="${question.id}"><details><summary>Teacher-written answer</summary><p>Model reasoning</p></details></article>`
};

function rendered(lesson) {
  return renderSection7Classroom({ ...lesson, pastPaperQuestions: section7PapersForLesson(lesson, pool) }, helpers);
}
function groupHtml(html, lesson, group) {
  const lessonGroups = section7Journey[lesson.sequenceIndex].groups;
  const index = lessonGroups.indexOf(group);
  const start = html.indexOf(`id="${group.id}"`);
  const next = lessonGroups[index + 1];
  const end = next ? html.indexOf(`id="${next.id}"`, start + 1) : html.indexOf('<nav class="s5-navigation"', start);
  assert.ok(start >= 0 && end > start, `Missing group boundary: ${group.id}`);
  return html.slice(start, end);
}

// The fixed list is the published syllabus contract, not a count of whichever content happens to exist.
test('the four lesson routes cover all 19 required objectives and all 18 original knowledge units', () => {
  assert.deepEqual(lessons.map(lesson => lesson.sequenceIndex), [38, 39, 40, 41]);
  assert.equal(requiredObjectives.length, 19);
  assert.deepEqual(sorted(lessons.flatMap(lesson => lesson.objectives.map(([id]) => id))), sorted(requiredObjectives));
  assert.deepEqual(sorted(unique(groups.flatMap(group => group.objectiveIds))), sorted(requiredObjectives));
  assert.equal(lessons.reduce((count, lesson) => count + lesson.units.length, 0), 18);
  assert.equal(new Set(groups.map(group => group.id)).size, groups.length, 'concept IDs must be unique across the section');
  for (const lesson of lessons) {
    const lessonGroups = section7Journey[lesson.sequenceIndex].groups;
    assert.deepEqual(sorted(unique(lessonGroups.flatMap(group => section7GroupObjectives(group, lesson)))), sorted(lesson.objectives.map(([id]) => id)), lesson.route);
    assert.deepEqual(sorted(unique(lessonGroups.flatMap(group => group.unitKeys))), sorted(lesson.units.map(unit => unit.unitKey)), lesson.route);
  }
});

test('suggested sessions cover every concept once in teaching order and allocate 45 minutes', () => {
  assert.deepEqual(section7Sessions.flatMap(session => session.groups), groups.map(group => group.id));
  for (const session of section7Sessions) {
    assert.equal(session.minutes, 45, session.title);
    assert.ok(session.title.trim() && session.focus.trim());
    assert.ok(session.groups.length > 0);
  }
});

test('all eight selected paper groups are placed once after their explicit cumulative prerequisites', () => {
  assert.deepEqual(sorted(sources.map(question => question.id)), sorted(expectedPapers));
  assert.deepEqual(sorted(Object.keys(section7PaperObjectives)), sorted(expectedPapers));
  assert.deepEqual(sorted(Object.keys(section7PaperCoverageNotes)), sorted(expectedPapers));
  const taught = new Set();
  const assigned = [];
  for (const group of groups) {
    for (const objective of group.objectiveIds) taught.add(objective);
    for (const id of group.papers) {
      assert.ok(section7PaperObjectives[id]?.length, `${id}: missing explicit prerequisite mapping`);
      for (const objective of section7PaperObjectives[id]) assert.ok(taught.has(objective), `${id} in ${group.id} precedes ${objective}`);
      assert.ok(section7PaperCoverageNotes[id]?.trim(), `${id}: missing coverage limitation`);
      assigned.push(id);
    }
  }
  assert.deepEqual(sorted(assigned), sorted(expectedPapers));
  for (const lesson of lessons) {
    const allocation = section7PapersForLesson(lesson, pool);
    assert.deepEqual(allocation.map(question => question.id), section7Journey[lesson.sequenceIndex].groups.flatMap(group => group.papers));
    for (const question of allocation) assert.deepEqual(question.objectiveIds, section7PaperObjectives[question.id], `${question.id}: renderer must use the precise mapping`);
  }
});

test('selected questions claim only their reviewed coverage, including explicit economic and environmental gaps', () => {
  assert.deepEqual(section7PaperObjectives, expectedPaperObjectives);
  const assessed = new Set(Object.values(section7PaperObjectives).flat());
  assert.ok(!assessed.has('S7.06.A04'), 'the selected sources do not directly assess the economic cost comparison');
  assert.ok(!assessed.has('S7.06.A05'), 'the selected sources do not directly assess the environmental calculation');
  assert.ok(!assessed.has('S7.06.A06'), 'a specific AI impact is not a complete deployment evaluation');
  assert.match(section7PaperCoverageNotes.E055, /does not directly test.*economic.*environmental/i);
  for (const id of ['S7.06.A04', 'S7.06.A05', 'S7.06.A06']) {
    const owner = groups.find(group => group.objectiveIds.includes(id));
    assert.ok(owner?.check?.prompt && owner.check.answer, `${id}: the coverage gap needs a teacher-written check`);
  }
});

test('each concept supplies complete observation, explanation, worked reasoning and an independent check', () => {
  for (const group of groups) {
    for (const field of ['title', 'question', 'observe', 'takeaway', 'bridge']) assert.ok(group[field]?.trim(), `${group.id}: empty ${field}`);
    assert.ok(group.steps?.length >= 3, `${group.id}: missing explanation stages`);
    assert.ok(group.worked?.title?.trim() && group.worked.setup?.trim() && group.worked.conclusion?.trim(), `${group.id}: incomplete worked context`);
    assert.ok(group.worked.steps?.length >= 2, `${group.id}: incomplete worked reasoning`);
    assert.ok(group.check?.prompt?.trim() && group.check.answer?.trim(), `${group.id}: incomplete independent check`);
    for (const step of [...group.steps, ...group.worked.steps]) {
      assert.ok(step.title?.trim() && step.body?.trim(), `${group.id}: incomplete teaching step`);
      if (step.table) {
        assert.ok(step.table.headers.length && step.table.rows.length, `${group.id}: empty table`);
        for (const row of step.table.rows) assert.equal(row.length, step.table.headers.length, `${group.id}: inconsistent table columns`);
      }
    }
    if (group.image) {
      assert.ok(group.image.alt?.trim() && group.image.caption?.trim(), `${group.id}: missing visual explanation`);
      assert.ok(existsSync(join(root, 'web', group.image.asset)), `${group.id}: missing image ${group.image.asset}`);
    }
  }
});

test('the six teaching activities are used and each starts hidden with a local reset', () => {
  const expected = ['ethics', 'licence', 'pipeline', 'fairness', 'costs', 'environment'];
  assert.deepEqual(sorted(Object.keys(labMarkup)), sorted(expected));
  assert.deepEqual(sorted(unique(groups.map(group => group.lab).filter(Boolean))), sorted(expected));
  for (const group of groups.filter(group => group.lab)) {
    assert.ok(group.experimentPrompt?.trim(), `${group.id}: missing prediction instructions`);
    const markup = labMarkup[group.lab];
    assert.ok(markup.includes(`data-s7-lab="${group.lab}"`));
    assert.ok(markup.includes('data-s7-action="reset"'), `${group.lab}: missing local reset`);
    assert.match(markup, /data-s7-role="output"[^>]*\bhidden\b/, `${group.lab}: initial output must be hidden`);
    assert.ok(markup.includes('type="button"'), `${group.lab}: buttons must not submit a form`);
  }
});

test('rendered answers are folded and original questions follow the group explanation and check', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    assert.equal((html.match(/\bdata-s7-classroom(?=[\s=>])/g) ?? []).length, 1, lesson.route);
    assert.doesNotMatch(html, /<details\b[^>]*\sopen(?:[\s=>])/i, `${lesson.route}: exposed answer or guidance`);
    const identifiers = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(identifiers).size, identifiers.length, `${lesson.route}: duplicate HTML IDs`);
    for (const group of section7Journey[lesson.sequenceIndex].groups) {
      const fragment = groupHtml(html, lesson, group);
      const explanation = fragment.indexOf(`id="${group.id}--explain"`);
      const check = fragment.indexOf(`id="${group.id}--check"`);
      assert.ok(explanation >= 0 && check > explanation, group.id);
      for (const id of group.papers) {
        const start = fragment.indexOf(`data-question-id="${id}"`);
        assert.ok(start > check, `${id}: question appears before this group's teaching and check`);
        const question = sources.find(source => source.id === id);
        for (const extract of [...question.qp.extracts, ...question.ms.extracts]) assert.ok(fragment.includes(`src="../..${extract.asset}"`), `${id}: missing original extract ${extract.asset}`);
        const questionHtml = fragment.slice(start, fragment.indexOf('</article>', start));
        for (const role of ['original-question', 'reading', 'solution', 'mark-scheme']) assert.ok(questionHtml.includes(`data-exam-role="${role}"`), `${id}: missing independent ${role} content`);
      }
    }
  }
});

test('every old unit anchor opens its first corresponding concept and source question IDs remain reachable', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    const lessonGroups = section7Journey[lesson.sequenceIndex].groups;
    for (const [index, unit] of lesson.units.entries()) {
      const owner = lessonGroups.find(group => group.unitKeys.includes(unit.unitKey));
      assert.ok(owner, unit.unitKey);
      assert.ok(groupHtml(html, lesson, owner).includes(`id="unit-${index + 1}"`), `${lesson.route}#unit-${index + 1} changed owner`);
    }
    for (const question of section7PapersForLesson(lesson, pool)) assert.ok(html.includes(`id="${question.id.toLowerCase()}"`), `${question.id}: missing bookmark`);
    for (const id of ['visual-and-core', 'past-paper-questions', 'original-exam-style-question', 'practice', 'summary']) assert.ok(html.includes(`id="${id}"`), `${lesson.route}#${id}`);
  }
});

test('legacy paper anchors occur once inside each lesson’s first past-paper phase', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    const firstGroup = section7Journey[lesson.sequenceIndex].groups.find(group => group.papers.length);
    assert.ok(firstGroup, `${lesson.route}: no past-paper group`);
    const start = html.indexOf(`id="${firstGroup.id}--papers"`);
    const end = html.indexOf(`id="${firstGroup.id}--recap"`, start);
    assert.ok(start >= 0 && end > start, `${lesson.route}: missing first past-paper phase`);
    const firstPhase = html.slice(start, end);
    for (const id of ['past-paper-questions', 'original-exam-style-question']) {
      assert.equal(html.split(`id="${id}"`).length - 1, 1, `${lesson.route}#${id}: duplicate or missing anchor`);
      assert.ok(firstPhase.includes(`id="${id}"`), `${lesson.route}#${id}: anchor must be inside the first past-paper phase`);
    }
  }
});

test('the original question and mark-scheme extracts retain reviewed bytes, dimensions and complete marks', () => {
  for (const question of sources) {
    assert.equal(question.parts.reduce((sum, part) => sum + part.marks, 0), question.marks, question.id);
    assert.equal(question.extractReview.status, 'verified', question.id);
    if (question.cropSpec) assert.equal(digest(JSON.stringify(question.cropSpec)), question.extractReview.cropSpecSha256, `${question.id}: crop review invalidated`);
    for (const kind of ['qp', 'ms']) {
      const source = question[kind];
      assert.ok(source.filename.endsWith('.pdf') && /^[a-f0-9]{64}$/.test(source.sha256) && source.extracts.length, `${question.id}: incomplete ${kind} source`);
      for (const extract of source.extracts) {
        const bytes = readFileSync(join(root, 'web', extract.asset));
        assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', extract.asset);
        assert.equal(digest(bytes), extract.sha256, extract.asset);
        assert.equal(bytes.readUInt32BE(16), extract.width, extract.asset);
        assert.equal(bytes.readUInt32BE(20), extract.height, extract.asset);
        assert.ok(extract.page > 0 && extract.bbox[2] > extract.bbox[0] && extract.bbox[3] > extract.bbox[1], `${extract.asset}: invalid crop bounds`);
      }
    }
  }
});

test('local original PDFs match recorded source identities when the teaching archive is available', async t => {
  const archive = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
  if (!existsSync(archive)) return t.skip('Local original-PDF archive unavailable; published extract hashes are verified separately.');
  const candidates = readdirSync(archive, { recursive: true }).map(String);
  const verified = new Set();
  for (const question of sources) for (const kind of ['qp', 'ms']) {
    const source = question[kind];
    const identity = `${source.filename}:${source.sha256}`;
    if (verified.has(identity)) continue;
    verified.add(identity);
    await t.test(source.filename, subtest => {
      const path = source.sourcePdf ?? candidates.find(path => path.endsWith('/' + source.filename) || path === source.filename);
      if (!path || !existsSync(join(archive, path))) return subtest.skip(`Local original PDF unavailable: ${source.filename}`);
      assert.equal(digest(readFileSync(join(archive, path))), source.sha256, `${question.id}: ${source.filename}`);
    });
  }
});
