import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section1Journey, section1Sessions, section1PaperObjectives, section1PaperCoverageNotes } from './course-v3-section1-journey.mjs';
import { section1GroupObjectives, section1PapersForLesson, renderSection1Classroom, renderSection1Overview } from './course-v3-section1-classroom.mjs';
import { labMarkup, labFor } from './course-v3-section1-labs.mjs';
import { renderPastPaperQuestions } from './course-v3-past-paper-render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const json = path => JSON.parse(readFileSync(join(root, path), 'utf8'));
const sorted = values => [...values].sort();
const unique = values => [...new Set(values)];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const ids = (requirement, ...numbers) => numbers.map(number => `S1.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);
const requiredObjectives = [2, 6, 6, 2, 1, 2, 4, 6, 3, 4, 8].flatMap((count, index) => ids(index + 1, ...Array.from({ length: count }, (_, i) => i + 1)));
const baseLessons = courseV3Lessons.filter(lesson => lesson.section === 1).sort((a, b) => a.sequenceIndex - b.sequenceIndex);
const pool = baseLessons.flatMap(lesson => lesson.pastPaperQuestions);
const descriptions = new Map(baseLessons.flatMap(lesson => lesson.objectives));
const lessons = baseLessons.map(lesson => ({
  ...lesson,
  legacyPastPaperQuestions: lesson.pastPaperQuestions,
  objectives: [...new Map([...lesson.objectives, ...section1Journey[lesson.sequenceIndex].groups.flatMap(group => group.objectiveIds).map(id => [id, descriptions.get(id)])])],
  pastPaperQuestions: section1PapersForLesson(lesson, pool)
}));
const groups = lessons.flatMap(lesson => section1Journey[lesson.sequenceIndex].groups);
const owner = id => lessons.find(lesson => section1Journey[lesson.sequenceIndex].groups.some(group => group.id === id));
const linkFor = (id, phase = 'observe') => `../${owner(id).route}/#${id}--${phase}`;
const paperIds = Array.from({ length: 10 }, (_, index) => `E${String(index + 1).padStart(3, '0')}`);
const helpers = {
  renderPastPaperQuestions,
  renderPractice: question => `<article class="practice-question" id="${question.id.toLowerCase()}" data-question-id="${question.id}"><details><summary>Teacher-written answer</summary><p>Model reasoning</p></details></article>`
};
const pages = new Map(lessons.map(lesson => [lesson.sequenceIndex, renderSection1Classroom(lesson, helpers)]));
function fragment(lesson, group) {
  const html = pages.get(lesson.sequenceIndex);
  const local = section1Journey[lesson.sequenceIndex].groups;
  const next = local[local.indexOf(group) + 1];
  const start = html.indexOf(`id="${group.id}"`);
  const end = next ? html.indexOf(`id="${next.id}"`, start + 1) : html.indexOf('<nav class="s5-navigation"', start);
  assert.ok(start >= 0 && end > start, `${group.id}: missing concept markup`);
  return html.slice(start, end);
}

test('six stable routes retain all 28 unit keys and 44 Section 1 objectives', () => {
  assert.deepEqual(lessons.map(lesson => lesson.sequenceIndex), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(lessons.map(lesson => lesson.route), ['lesson-001', 'lesson-002', 'lesson-003', 'lesson-004', 'lesson-005', 'lesson-006']);
  assert.equal(requiredObjectives.length, 44);
  assert.equal(baseLessons.reduce((total, lesson) => total + lesson.units.length, 0), 28);
  assert.deepEqual(sorted(unique(groups.flatMap(group => group.objectiveIds))), sorted(requiredObjectives));
  assert.equal(unique(groups.map(group => group.id)).length, groups.length);
  for (const lesson of lessons) {
    const local = section1Journey[lesson.sequenceIndex].groups;
    assert.deepEqual(sorted(unique(local.flatMap(group => group.unitKeys))), sorted(lesson.units.map(unit => unit.unitKey)), lesson.route);
    for (const group of local) assert.ok(section1GroupObjectives(group, lesson).length);
    for (const [, description] of lesson.objectives) assert.ok(description?.trim(), `${lesson.route}: missing objective description`);
  }
});

test('the teaching order and 45-minute sessions preserve prerequisites', () => {
  const taught = new Set();
  for (const group of groups) {
    for (const prerequisite of group.requires ?? []) assert.ok(taught.has(prerequisite), `${group.id}: ${prerequisite} has not been taught`);
    taught.add(group.id);
  }
  const firstUnit = key => groups.findIndex(group => group.unitKeys.includes(key));
  for (const [earlier, later] of [
    ['S1.02-BINARY', 'S1.02-HEXADECIMAL'],
    ['S1.02-BINARY', 'S1.02-ONES-COMPLEMENT'],
    ['S1.02-ONES-COMPLEMENT', 'S1.02-TWOS-COMPLEMENT'],
    ['S1.02-TWOS-COMPLEMENT', 'S1.04-SIGNED'],
    ['S1.04-UNSIGNED', 'S1.05-OVERFLOW'],
    ['S1.07-CHARACTER-SETS', 'S1.07-UNICODE'],
    ['S1.08-BITMAP-STRUCTURE', 'S1.08-FILE-SIZE'],
    ['S1.09-VECTOR-LIST', 'S1.09-BITMAP-VECTOR-SCALING'],
    ['S1.10-ANALOGUE-SAMPLING', 'S1.10-SAMPLING-RATE'],
    ['S1.10-ANALOGUE-SAMPLING', 'S1.10-SAMPLING-RESOLUTION'],
    ['S1.11-RLE', 'S1.11-LOSSLESS-FILES']
  ]) {
    assert.ok(firstUnit(earlier) >= 0 && firstUnit(later) >= 0, `${earlier}, ${later}: unknown unit`);
    assert.ok(firstUnit(earlier) < firstUnit(later), `${earlier} must precede ${later}`);
  }
  assert.deepEqual(sorted(unique(section1Sessions.flatMap(session => session.groups))), sorted([...taught]));
  for (const session of section1Sessions) {
    assert.equal(session.minutes, 45);
    assert.ok(session.title?.trim() && session.focus?.trim());
    for (const id of session.groups) assert.ok(taught.has(id), `${session.title}: unknown concept ${id}`);
  }
});

// Independently reviewed against the selected original QP and official MS.
// Some objectives contain more than the selected part asks: the notes must retain those limits.
const expectedPaperObjectives = {
  E001: ids(1, 1, 2),
  E002: ids(3, 3, 5),
  E003: ids(3, 6),
  E004: ids(4, 1),
  E005: [...ids(4, 1), ...ids(5, 1)],
  E006: ids(7, 1, 2, 4),
  E007: ids(8, 4),
  E008: [...ids(8, 1), ...ids(9, 1)],
  E009: ids(10, 4),
  E010: ids(11, 3)
};
const paperPrerequisites = {
  E002: [...ids(2, 1), ...ids(3, 3, 5)],
  E004: [...ids(3, 6), ...ids(4, 1, 2)],
  E009: ids(10, 1, 2, 4),
  E010: [...ids(8, 1), ...ids(11, 3)]
};

test('all ten paper tasks follow their required knowledge with honest direct-assessment mappings', () => {
  assert.deepEqual(sorted(groups.flatMap(group => group.papers ?? [])), paperIds);
  assert.deepEqual(sorted(Object.keys(section1PaperObjectives)), paperIds);
  assert.equal(pool.reduce((sum, question) => sum + question.marks, 0), 31);
  assert.equal(pool.reduce((sum, question) => sum + question.parts.length, 0), 14);
  const taught = new Set();
  for (const group of groups) {
    group.objectiveIds.forEach(id => taught.add(id));
    for (const id of group.papers ?? []) {
      assert.deepEqual(sorted(section1PaperObjectives[id]), sorted(expectedPaperObjectives[id]), `${id}: assessment claim exceeds the selected part`);
      assert.ok(section1PaperCoverageNotes[id]?.trim(), `${id}: missing coverage note`);
      for (const objective of expectedPaperObjectives[id]) assert.ok(taught.has(objective), `${id} precedes ${objective}`);
      for (const prerequisite of paperPrerequisites[id] ?? []) assert.ok(taught.has(prerequisite), `${id}: the original context or teacher reasoning uses untaught ${prerequisite}`);
    }
  }
  assert.match(section1PaperCoverageNotes.E007, /header|resolution|colour|depth/i);
  assert.match(section1PaperCoverageNotes.E008, /header/i);
  assert.match(section1PaperCoverageNotes.E009, /rate|file.?size/i);
  assert.match(section1PaperCoverageNotes.E010, /decod|effectiv|sav|ratio/i);
  for (const question of lessons.flatMap(lesson => lesson.pastPaperQuestions)) assert.deepEqual(question.objectiveIds, section1PaperObjectives[question.id]);
});

test('every concept has concrete material, complete explanation, worked reasoning and an independent check', () => {
  for (const lesson of lessons) {
    const html = pages.get(lesson.sequenceIndex);
    assert.match(html, /data-mode="reading"/);
    assert.match(html, /<noscript>/);
    for (const group of section1Journey[lesson.sequenceIndex].groups) {
      assert.ok(group.stimulus?.title?.trim() && (group.stimulus.items?.length || group.stimulus.table), group.id);
      assert.ok(group.question?.trim() && group.observe?.trim(), `${group.id}: missing observation prompt`);
      assert.ok(group.steps?.length && group.worked?.steps?.length, `${group.id}: missing explanation or worked example`);
      assert.ok(group.worked.title?.trim() && group.worked.setup?.trim(), `${group.id}: incomplete worked example`);
      assert.ok(group.check?.prompt?.trim() && group.check.answer?.trim(), `${group.id}: missing check`);
      assert.ok(group.takeaway?.trim() && group.bridge?.trim(), `${group.id}: missing connection`);
      const part = fragment(lesson, group);
      const phases = ['observe', 'explain', 'worked', 'check', 'recap'];
      const positions = phases.map(phase => part.indexOf(`id="${group.id}--${phase}"`));
      assert.ok(positions.every((position, index) => position >= 0 && (!index || position > positions[index - 1])), `${group.id}: teaching phases out of order`);
      for (const step of [...group.steps, ...group.worked.steps]) {
        assert.ok(step.title?.trim() && step.body?.trim(), `${group.id}: incomplete teaching step`);
        if (step.code) assert.ok(!step.code.includes('\\n'), `${group.id}: literal newline escapes in displayed code`);
        if (step.table) for (const row of step.table.rows) assert.equal(row.length, step.table.headers.length, group.id);
      }
      for (const picture of [group.image, ...group.steps.map(step => step.image), ...group.worked.steps.map(step => step.image)].filter(Boolean)) {
        assert.ok(picture.alt?.trim() && picture.caption?.trim(), `${group.id}: unexplained picture`);
        assert.ok(existsSync(join(root, 'web', picture.asset)), `${group.id}: missing picture ${picture.asset}`);
        assert.ok(part.includes(`src="../..${picture.asset}"`), `${group.id}: picture is not rendered`);
      }
    }
  }
});

test('cross-page navigation, overview and original bookmarks remain usable', () => {
  const overview = renderSection1Overview(lessons);
  for (const lesson of lessons) {
    const html = pages.get(lesson.sequenceIndex);
    const identifiers = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(identifiers).size, identifiers.length, `${lesson.route}: duplicate HTML id`);
    for (const id of ['visual-and-core', 'past-paper-questions', 'original-exam-style-question', 'practice', 'summary', 'lesson-contents']) assert.ok(identifiers.includes(id), `${lesson.route}#${id}`);
    for (const [index] of lesson.units.entries()) assert.ok(identifiers.includes(`unit-${index + 1}`), `${lesson.route}: unit-${index + 1}`);
    for (const question of [...lesson.practice, ...(lesson.optionalPractice ?? [])]) assert.ok(html.includes(`data-question-id="${question.id}"`), question.id);
    for (const question of lesson.legacyPastPaperQuestions) assert.ok(identifiers.includes(question.id.toLowerCase()), `${lesson.route}: old paper bookmark ${question.id}`);
    for (const group of section1Journey[lesson.sequenceIndex].groups) {
      const index = groups.indexOf(group);
      const part = fragment(lesson, group);
      assert.ok(part.includes(`data-s1-order="${index + 1}" data-s1-total="${groups.length}"`));
      assert.ok(part.includes(`data-s1-prev="${index ? linkFor(groups[index - 1].id, 'recap') : ''}"`));
      assert.ok(part.includes(`data-s1-next="${index < groups.length - 1 ? linkFor(groups[index + 1].id) : ''}"`));
      assert.ok(overview.includes(`href="${linkFor(group.id)}"`), group.id);
    }
  }
});

test('paper prompts follow checks, while hints, teacher reasoning and official MS start closed', () => {
  for (const lesson of lessons) {
    const html = pages.get(lesson.sequenceIndex);
    for (const detail of html.matchAll(/<details\b[^>]*>/g)) {
      if (/\sopen(?:\s|>)/.test(detail[0])) assert.match(detail[0], /data-s5-question-fold/, `${lesson.route}: an answer starts open`);
    }
    for (const group of section1Journey[lesson.sequenceIndex].groups) {
      const part = fragment(lesson, group);
      for (const id of group.papers ?? []) {
        const start = part.indexOf(`data-question-id="${id}"`);
        assert.ok(start > part.indexOf(`id="${group.id}--check"`), `${id}: paper precedes check`);
        const paper = part.slice(start, part.indexOf('</article>', start));
        for (const role of ['original-question', 'reading', 'solution', 'mark-scheme']) assert.ok(paper.includes(`data-exam-role="${role}"`), `${id}: missing separate ${role}`);
        const source = pool.find(question => question.id === id);
        for (const extract of [...source.qp.extracts, ...source.ms.extracts]) assert.ok(part.includes(`src="../..${extract.asset}"`), `${id}: missing source crop`);
        for (const block of source.solution.filter(item => typeof item === 'object' && item.type === 'code')) assert.ok(!block.text.includes('\\n'), `${id}: teacher solution shows literal newline escapes`);
      }
    }
  }
});

test('each planned experiment resolves to real markup and a prediction', () => {
  for (const lesson of lessons) {
    for (const group of section1Journey[lesson.sequenceIndex].groups.filter(group => group.lab)) {
      assert.ok(labMarkup[group.lab], `${group.id}: missing experiment ${group.lab}`);
      assert.ok(group.experimentPrompt?.trim(), `${group.id}: missing prediction`);
      const configured = labFor(group.lab, group.labConfig ?? {});
      const part = fragment(lesson, group);
      assert.ok(part.includes(`id="${group.id}--experiment"`), group.id);
      assert.ok(part.includes(configured), `${group.id}: configured experiment is not rendered`);
    }
  }
});

test('all 25 published QP and MS extracts retain approved identities, hashes, dimensions and marks', () => {
  const manifest = json('scripts/past-paper-source-manifest.json').questions;
  const approved = json('docs/practice-past-paper-review-20260915/selection-registry.json');
  assert.equal(pool.length, 10);
  assert.equal(pool.reduce((total, question) => total + question.qp.extracts.length + question.ms.extracts.length, 0), 25);
  for (const question of pool) {
    const registered = manifest.find(item => item.id === question.id);
    const selection = approved.find(item => item.id === question.id);
    assert.ok(registered && selection, question.id);
    assert.equal(question.extractReview.status, 'verified', question.id);
    assert.equal(question.parts.reduce((sum, part) => sum + part.marks, 0), question.marks, question.id);
    for (const field of ['syllabusCode', 'year', 'series', 'component', 'parts', 'marks']) assert.deepEqual(question[field], selection[field], `${question.id}: changed ${field}`);
    for (const kind of ['qp', 'ms']) {
      assert.deepEqual(question[kind], registered[kind], question.id);
      assert.equal(question[kind].filename, selection[kind].filename, question.id);
      assert.equal(question[kind].sha256, selection[kind].sha256, question.id);
      for (const extract of question[kind].extracts) {
        const bytes = readFileSync(join(root, 'web', extract.asset));
        assert.equal(digest(bytes), extract.sha256, extract.asset);
        assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', extract.asset);
        assert.equal(bytes.readUInt32BE(16), extract.width, extract.asset);
        assert.equal(bytes.readUInt32BE(20), extract.height, extract.asset);
        assert.ok(extract.page >= 1 && extract.bbox.length === 4, extract.asset);
      }
    }
  }
});

test('the generated opening illustration retains its provenance and is used in teaching', () => {
  const manifest = json('scripts/course-v3-section1-classroom-images.json');
  assert.match(manifest.tool, /ImageGen/i);
  assert.ok(manifest.assets.length);
  for (const asset of manifest.assets) {
    const bytes = readFileSync(join(root, asset.path));
    assert.equal(digest(bytes), asset.sha256, asset.path);
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', asset.path);
    assert.ok(asset.prompt?.trim() && asset.review?.trim(), `${asset.path}: missing generation or review record`);
    assert.ok(groups.some(group => group.image?.asset === asset.path.replace(/^web/, '')), `${asset.path}: unused illustration`);
  }
});

test('local original QP and MS PDFs match all fourteen registered source identities', async t => {
  const archive = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
  const candidates = existsSync(archive) ? readdirSync(archive, { recursive: true }).map(name => join(archive, String(name))) : [];
  const sources = new Map();
  for (const question of pool) for (const source of [question.qp, question.ms]) {
    if (sources.has(source.filename)) assert.equal(sources.get(source.filename), source.sha256, source.filename);
    sources.set(source.filename, source.sha256);
  }
  assert.equal(sources.size, 14);
  for (const [filename, expectedHash] of sources) await t.test(filename, subtest => {
    const path = candidates.find(candidate => candidate.endsWith('/' + filename));
    if (!path) return subtest.skip(`Local original PDF unavailable: ${filename}; crop hash checks do not verify this missing source.`);
    const bytes = readFileSync(path);
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-', filename);
    assert.equal(digest(bytes), expectedHash, filename);
  });
});
