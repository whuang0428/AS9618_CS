import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section2Journey, section2Sessions, section2Route, section2Modules } from './course-v3-section2-journey.mjs';
import { section2PaperObjectives, section2PaperCoverageNotes, section2PaperPrerequisites } from './course-v3-section2-paper-map.mjs';
import { section2GroupObjectives, section2PapersForLesson, renderSection2Classroom, renderSection2Overview } from './course-v3-section2-classroom.mjs';
import { section2ExtraPapers } from './course-v3-section2-extra-papers.mjs';
import { labFor } from './course-v3-section2-labs.mjs';
import { renderPastPaperQuestions } from './course-v3-past-paper-render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const json = path => JSON.parse(readFileSync(join(root, path), 'utf8'));
const sorted = values => [...values].sort();
const unique = values => [...new Set(values)];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const ids = (requirement, ...numbers) => numbers.map(number => `S2.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);
// Independently fixed against the published course's 16 requirement groups.
const requiredObjectives = [3, 3, 3, 4, 3, 4, 1, 6, 4, 2, 3, 6, 3, 5, 6, 3].flatMap((count, index) => ids(index + 1, ...Array.from({ length: count }, (_, i) => i + 1)));
const baseLessons = courseV3Lessons.filter(lesson => lesson.section === 2).sort((a, b) => a.sequenceIndex - b.sequenceIndex);
const pool = baseLessons.flatMap(lesson => lesson.pastPaperQuestions);
const sources = [...pool, ...section2ExtraPapers];
const lessons = baseLessons.map(lesson => ({
  ...lesson,
  legacyPastPaperQuestions: lesson.pastPaperQuestions,
  pastPaperQuestions: section2PapersForLesson(lesson, pool)
}));
const localGroups = lessons.flatMap(lesson => section2Journey[lesson.sequenceIndex].groups);
const byId = new Map(localGroups.map(group => [group.id, group]));
const groups = section2Route.map(id => byId.get(id));
const owner = id => lessons.find(lesson => section2Journey[lesson.sequenceIndex].groups.some(group => group.id === id));
const linkFor = (id, phase = 'observe') => `../${owner(id).route}/#${id}--${phase}`;
const paperIds = [...Array.from({ length: 10 }, (_, index) => `E${String(index + 11).padStart(3, '0')}`), ...Array.from({ length: 5 }, (_, index) => `E2D0${index + 1}`)];
const helpers = {
  renderPastPaperQuestions,
  renderPractice: question => `<article class="practice-question" id="${question.id.toLowerCase()}" data-question-id="${question.id}"><details><summary>Teacher-written answer</summary><p>Model reasoning</p></details></article>`
};
const pages = new Map(lessons.map(lesson => [lesson.sequenceIndex, renderSection2Classroom(lesson, helpers)]));
function fragment(lesson, group) {
  const html = pages.get(lesson.sequenceIndex);
  const local = section2Journey[lesson.sequenceIndex].groups;
  const next = local[local.indexOf(group) + 1];
  const start = html.indexOf(`id="${group.id}"`);
  const end = next ? html.indexOf(`id="${next.id}"`, start + 1) : html.indexOf('<nav class="s5-navigation"', start);
  assert.ok(start >= 0 && end > start, `${group.id}: missing concept markup`);
  return html.slice(start, end);
}

test('eight stable routes retain all 31 knowledge units and 59 Section 2 objectives', () => {
  assert.deepEqual(lessons.map(lesson => lesson.sequenceIndex), [7, 8, 9, 10, 11, 12, 13, 14]);
  assert.deepEqual(lessons.map(lesson => lesson.route), Array.from({ length: 8 }, (_, i) => `lesson-${String(i + 7).padStart(3, '0')}`));
  assert.equal(requiredObjectives.length, 59);
  assert.deepEqual(sorted(baseLessons.flatMap(lesson => lesson.objectives.map(([id]) => id))), sorted(requiredObjectives));
  assert.equal(baseLessons.reduce((total, lesson) => total + lesson.units.length, 0), 31);
  assert.deepEqual(sorted(unique(localGroups.flatMap(group => group.objectiveIds))), sorted(requiredObjectives));
  assert.equal(unique(localGroups.map(group => group.id)).length, localGroups.length);
  assert.deepEqual(sorted(section2Route), sorted(localGroups.map(group => group.id)));
  for (const lesson of lessons) {
    const local = section2Journey[lesson.sequenceIndex].groups;
    assert.deepEqual(sorted(unique(local.flatMap(group => group.unitKeys))), sorted(lesson.units.map(unit => unit.unitKey)), lesson.route);
    for (const group of local) assert.ok(section2GroupObjectives(group, lesson).length);
    for (const [, description] of lesson.objectives) assert.ok(description?.trim(), `${lesson.route}: missing objective description`);
  }
});

test('the cross-page learning route, modules and 45-minute sessions preserve prerequisites', () => {
  const taught = new Set();
  for (const group of groups) {
    assert.ok(group, 'unknown concept in route');
    for (const prerequisite of group.requires ?? []) assert.ok(taught.has(prerequisite), `${group.id}: ${prerequisite} has not been taught`);
    taught.add(group.id);
  }
  assert.deepEqual(section2Modules.flatMap(module => module.groups), section2Route, 'module route differs from classroom navigation');
  assert.deepEqual(sorted(unique(section2Sessions.flatMap(session => session.groups))), sorted([...taught]));
  let furthestIntroduced = -1;
  const seen = new Set();
  for (const session of section2Sessions) {
    assert.equal(session.minutes, 45);
    assert.ok(session.title?.trim() && session.focus?.trim());
    for (const id of session.groups) {
      assert.ok(taught.has(id), `${session.title}: unknown concept ${id}`);
      if (!seen.has(id)) {
        const index = section2Route.indexOf(id);
        assert.ok(index > furthestIntroduced, `${session.title}: introduces ${id} out of sequence`);
        furthestIntroduced = index;
        seen.add(id);
      }
    }
  }
});

// Checked from actual selected QP/MS regions. Notes limit bundled or alternative scope.
const expectedPaperObjectives = {
  E011: ids(2, 1), E012: ids(3, 1), E013: [...ids(4, 2), ...ids(5, 1)],
  E014: ids(6, 3), E015: ids(8, 2, 3, 4), E016: ids(11, 1), E017: ids(11, 2),
  E018: ids(12, 1, 4), E019: ids(14, 2), E020: ids(15, 1, 2, 5, 6),
  E2D01: ids(1, 2, 3), E2D02: [...ids(4, 3), ...ids(5, 2)],
  E2D03: [...ids(10, 1), ...ids(9, 1, 3, 4)], E2D04: ids(14, 4), E2D05: ids(16, 1, 2, 3)
};

test('all fifteen paper groups follow their prerequisites without claiming full objective coverage', () => {
  assert.deepEqual(sorted(groups.flatMap(group => group.papers ?? [])), sorted(paperIds));
  assert.deepEqual(sorted(Object.keys(section2PaperObjectives)), sorted(paperIds));
  assert.deepEqual(sorted(Object.keys(section2PaperPrerequisites)), sorted(paperIds));
  assert.equal(sources.reduce((sum, question) => sum + question.marks, 0), 60);
  assert.equal(sources.reduce((sum, question) => sum + question.parts.length, 0), 20);
  const taught = new Set();
  for (const group of groups) {
    group.objectiveIds.forEach(id => taught.add(id));
    for (const id of group.papers ?? []) {
      assert.deepEqual(sorted(section2PaperObjectives[id]), sorted(expectedPaperObjectives[id]), `${id}: assessment claim exceeds selected parts`);
      assert.ok(section2PaperCoverageNotes[id]?.trim(), `${id}: missing coverage limit`);
      for (const objective of expectedPaperObjectives[id]) assert.ok(taught.has(objective), `${id} precedes assessed ${objective}`);
      for (const prerequisite of section2PaperPrerequisites[id]) assert.ok(taught.has(prerequisite), `${id} uses untaught ${prerequisite}`);
    }
  }
  assert.match(section2PaperCoverageNotes.E015, /alternative/i);
  assert.match(section2PaperCoverageNotes.E020, /do not directly assess objective S2\.15\.A04/);
  assert.match(section2PaperCoverageNotes.E2D03, /partly sampled/);
  for (const question of lessons.flatMap(lesson => lesson.pastPaperQuestions)) assert.deepEqual(question.objectiveIds, section2PaperObjectives[question.id]);
  const directlyTouched = new Set(Object.values(section2PaperObjectives).flat());
  assert.ok(requiredObjectives.some(id => !directlyTouched.has(id)), 'Selected papers must not be reported as complete assessment coverage.');
});

test('every concept has material before explanation, a complete worked example and a labelled independent check', () => {
  for (const lesson of lessons) {
    const html = pages.get(lesson.sequenceIndex);
    assert.match(html, /data-mode="reading"/);
    assert.match(html, /<noscript>/);
    for (const group of section2Journey[lesson.sequenceIndex].groups) {
      assert.ok(group.stimulus?.title?.trim() && (group.stimulus.items?.length || group.stimulus.table), group.id);
      assert.ok(group.question?.trim() && group.observe?.trim(), `${group.id}: missing observation`);
      assert.ok(group.steps?.length && group.worked?.steps?.length, `${group.id}: incomplete explanation`);
      assert.ok(group.worked.title?.trim() && group.worked.setup?.trim(), `${group.id}: incomplete worked example`);
      assert.ok(group.check?.prompt?.trim() && group.check.answer?.trim(), `${group.id}: missing check`);
      assert.ok(group.takeaway?.trim() && group.bridge?.trim(), `${group.id}: missing connection`);
      const part = fragment(lesson, group);
      const positions = ['observe', 'explain', 'worked', 'check', 'recap'].map(phase => part.indexOf(`id="${group.id}--${phase}"`));
      assert.ok(positions.every((position, index) => position >= 0 && (!index || position > positions[index - 1])), `${group.id}: phases out of order`);
      assert.match(part, /Try it yourself · Teacher-written/);
      for (const step of [...group.steps, ...group.worked.steps]) {
        assert.ok(step.title?.trim() && step.body?.trim(), `${group.id}: incomplete teaching step`);
        if (step.table) for (const row of step.table.rows) assert.equal(row.length, step.table.headers.length, group.id);
      }
      for (const picture of [group.image, ...group.steps.map(step => step.image), ...group.worked.steps.map(step => step.image)].filter(Boolean)) {
        assert.ok(picture.alt?.trim() && picture.caption?.trim(), `${group.id}: unexplained picture`);
        assert.ok(existsSync(join(root, 'web', picture.asset)), `${group.id}: missing ${picture.asset}`);
        assert.ok(part.includes(`src="../..${picture.asset}"`), `${group.id}: picture not rendered`);
      }
    }
  }
});

test('overview and classroom links follow the same route, with unique IDs and original bookmarks', () => {
  const overview = renderSection2Overview(lessons);
  for (const lesson of lessons) {
    const html = pages.get(lesson.sequenceIndex);
    const identifiers = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(identifiers).size, identifiers.length, `${lesson.route}: duplicate HTML id`);
    assert.ok(html.includes('href="../section-2/"'), `${lesson.route}: wrong section backlink`);
    for (const id of ['visual-and-core', 'past-paper-questions', 'original-exam-style-question', 'practice', 'summary', 'lesson-contents']) assert.ok(identifiers.includes(id), `${lesson.route}#${id}`);
    for (const [index] of lesson.units.entries()) assert.ok(identifiers.includes(`unit-${index + 1}`), `${lesson.route}: unit-${index + 1}`);
    for (const question of [...lesson.practice, ...(lesson.optionalPractice ?? [])]) assert.ok(html.includes(`data-question-id="${question.id}"`), question.id);
    for (const question of lesson.legacyPastPaperQuestions) assert.ok(identifiers.includes(question.id.toLowerCase()), `${lesson.route}: old paper bookmark ${question.id}`);
    for (const group of section2Journey[lesson.sequenceIndex].groups) {
      const index = groups.indexOf(group);
      const part = fragment(lesson, group);
      assert.ok(part.includes(`data-s2-order="${index + 1}" data-s2-total="${groups.length}"`));
      assert.ok(part.includes(`data-s2-prev="${index ? linkFor(groups[index - 1].id, 'recap') : ''}"`));
      assert.ok(part.includes(`data-s2-next="${index < groups.length - 1 ? linkFor(groups[index + 1].id) : ''}"`));
      assert.ok(overview.includes(`href="${linkFor(group.id)}"`), group.id);
    }
  }
});

test('paper prompts follow checks and separate the original question, hint, teacher reasoning and official MS', () => {
  for (const lesson of lessons) {
    const html = pages.get(lesson.sequenceIndex);
    for (const detail of html.matchAll(/<details\b[^>]*>/g)) if (/\sopen(?:\s|>)/.test(detail[0])) assert.match(detail[0], /data-s5-question-fold/, `${lesson.route}: answer starts open`);
    for (const group of section2Journey[lesson.sequenceIndex].groups) {
      const part = fragment(lesson, group);
      for (const id of group.papers ?? []) {
        const start = part.indexOf(`data-question-id="${id}"`);
        assert.ok(start > part.indexOf(`id="${group.id}--check"`), `${id}: paper precedes check`);
        const paper = part.slice(start, part.indexOf('</article>', start));
        for (const role of ['original-question', 'reading', 'solution', 'mark-scheme']) assert.ok(paper.includes(`data-exam-role="${role}"`), `${id}: missing separate ${role}`);
        for (const extract of [...sources.find(question => question.id === id).qp.extracts, ...sources.find(question => question.id === id).ms.extracts]) assert.ok(part.includes(`src="../..${extract.asset}"`), `${id}: missing source crop`);
      }
    }
  }
});

test('each experiment renders with its intended configuration after a prediction', () => {
  for (const lesson of lessons) for (const group of section2Journey[lesson.sequenceIndex].groups.filter(group => group.lab)) {
    assert.ok(group.experimentPrompt?.trim(), `${group.id}: missing prediction`);
    const configured = labFor(group.lab, group.labConfig ?? {});
    assert.ok(configured?.trim(), `${group.id}: no markup for ${group.lab}`);
    const part = fragment(lesson, group);
    assert.ok(part.includes(`id="${group.id}--experiment"`), group.id);
    assert.ok(part.includes(configured), `${group.id}: wrong experiment configuration`);
  }
});

test('all 46 original extracts retain source identities, complete selected marks, hashes and dimensions', () => {
  const manifest = json('scripts/past-paper-source-manifest.json').questions;
  const approved = json('docs/practice-past-paper-review-20260915/selection-registry.json');
  assert.equal(sources.length, 15);
  assert.equal(sources.reduce((total, question) => total + question.qp.extracts.length + question.ms.extracts.length, 0), 46);
  for (const question of sources) {
    assert.equal(question.sourceType, 'past-paper', question.id);
    assert.equal(question.extractReview.status, 'verified', question.id);
    assert.equal(question.parts.reduce((sum, part) => sum + part.marks, 0), question.marks, question.id);
    if (/^E0/.test(question.id)) {
      const registered = manifest.find(item => item.id === question.id);
      const selection = approved.find(item => item.id === question.id);
      assert.ok(registered && selection, question.id);
      for (const field of ['syllabusCode', 'year', 'series', 'component', 'parts', 'marks']) assert.deepEqual(question[field], selection[field], `${question.id}: changed ${field}`);
      for (const kind of ['qp', 'ms']) assert.deepEqual(question[kind], registered[kind], question.id);
    } else {
      assert.equal(digest(JSON.stringify(question.cropSpec)), question.extractReview.cropSpecSha256, question.id);
      assert.ok(question.reading.length && question.solution.length && question.marking.length && question.mistakes.length, question.id);
    }
    for (const kind of ['qp', 'ms']) for (const extract of question[kind].extracts) {
      const bytes = readFileSync(join(root, 'web', extract.asset));
      assert.equal(digest(bytes), extract.sha256, extract.asset);
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', extract.asset);
      assert.equal(bytes.readUInt32BE(16), extract.width, extract.asset);
      assert.equal(bytes.readUInt32BE(20), extract.height, extract.asset);
      assert.ok(extract.page >= 1 && extract.bbox.length === 4, extract.asset);
    }
  }
});

test('new ImageGen observation material keeps reviewed provenance and is present in teaching', () => {
  const manifest = json('scripts/course-v3-section2-classroom-images.json');
  assert.ok(manifest.assets.length);
  for (const asset of manifest.assets) {
    assert.match(asset.generator, /Codex.*ImageGen/i);
    const bytes = readFileSync(join(root, 'web', asset.asset));
    assert.equal(digest(bytes), asset.sha256, asset.asset);
    assert.ok(asset.prompt?.trim() && asset.review?.status === 'reviewed', asset.asset);
    assert.ok(groups.some(group => group.image?.asset === asset.asset), `${asset.asset}: unused illustration`);
  }
});

test('all twenty-two local original QP and MS PDFs match the recorded SHA-256 identities', async t => {
  const archive = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
  const candidates = existsSync(archive) ? readdirSync(archive, { recursive: true }).map(name => join(archive, String(name))) : [];
  const identities = new Map();
  for (const question of sources) for (const source of [question.qp, question.ms]) {
    if (identities.has(source.filename)) assert.equal(identities.get(source.filename), source.sha256, source.filename);
    identities.set(source.filename, source.sha256);
  }
  assert.equal(identities.size, 22);
  for (const [filename, hash] of identities) await t.test(filename, subtest => {
    const path = candidates.find(candidate => candidate.endsWith('/' + filename));
    if (!path) return subtest.skip(`Local original PDF unavailable: ${filename}; crop hashes cannot verify this missing source.`);
    const bytes = readFileSync(path);
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-', filename);
    assert.equal(digest(bytes), hash, filename);
  });
});
