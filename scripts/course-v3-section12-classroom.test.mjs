import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section12Journey, section12Modules, section12Sessions, section12PaperObjectives, section12PaperCoverageNotes } from './course-v3-section12-journey.mjs';
import { section12GroupObjectives, section12PapersForLesson, renderSection12Classroom, renderSection12Overview } from './course-v3-section12-classroom.mjs';
import { labMarkup } from './course-v3-section12-labs.mjs';
import { renderPastPaperQuestions } from './course-v3-past-paper-render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const baseLessons = courseV3Lessons.filter(lesson => lesson.section === 12).sort((a, b) => a.sequenceIndex - b.sequenceIndex);
const descriptions = new Map(baseLessons.flatMap(lesson => lesson.objectives));
const pool = courseV3Lessons.flatMap(lesson => lesson.pastPaperQuestions ?? []);
const lessons = baseLessons.map(lesson => ({
  ...lesson,
  legacyPastPaperQuestions: lesson.pastPaperQuestions,
  objectives: [...new Map([...lesson.objectives, ...section12Journey[lesson.sequenceIndex].groups.flatMap(group => group.objectiveIds).map(id => [id, descriptions.get(id)])])],
  pastPaperQuestions: section12PapersForLesson(lesson, pool)
}));
const groups = lessons.flatMap(lesson => section12Journey[lesson.sequenceIndex].groups);
const order = section12Modules.flatMap(module => module.groups);
const orderedGroups = order.map(id => groups.find(group => group.id === id));
const sorted = values => [...values].sort();
const unique = values => [...new Set(values)];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const ids = (requirement, ...numbers) => numbers.map(number => `S12.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);
const requiredObjectives = [6, 4, 1, 6, 9, 1, 2, 4, 1].flatMap((count, index) => ids(index + 1, ...Array.from({ length: count }, (_, i) => i + 1)));
const paperIds = Array.from({ length: 10 }, (_, i) => `E${String(98 + i).padStart(3, '0')}`);
const sources = paperIds.map(id => pool.find(question => question.id === id));
const helpers = {
  renderPastPaperQuestions,
  renderPractice: question => `<article class="practice-question" id="${question.id.toLowerCase()}" data-question-id="${question.id}"><details><summary>Teacher-written answer</summary><p>Model reasoning</p></details></article>`
};
const rendered = lesson => renderSection12Classroom(lesson, helpers);
function fragment(html, lesson, group) {
  const local = section12Journey[lesson.sequenceIndex].groups;
  const next = local[local.indexOf(group) + 1];
  const start = html.indexOf(`id="${group.id}"`);
  const end = next ? html.indexOf(`id="${next.id}"`, start + 1) : html.indexOf('<nav class="s5-navigation"', start);
  assert.ok(start >= 0 && end > start, group.id);
  return html.slice(start, end);
}
const owner = id => lessons.find(lesson => section12Journey[lesson.sequenceIndex].groups.some(group => group.id === id));
const linkFor = (id, phase) => `../${owner(id).route}/#${id}--${phase}`;

test('the nine stable routes retain all 30 unit keys and all 34 Section 12 objectives', () => {
  assert.deepEqual(lessons.map(lesson => lesson.sequenceIndex), Array.from({ length: 9 }, (_, i) => 84 + i));
  assert.equal(requiredObjectives.length, 34);
  assert.equal(baseLessons.reduce((total, lesson) => total + lesson.units.length, 0), 30);
  assert.deepEqual(sorted(unique(groups.flatMap(group => group.objectiveIds))), sorted(requiredObjectives));
  assert.equal(unique(groups.map(group => group.id)).length, groups.length);
  for (const lesson of lessons) {
    const local = section12Journey[lesson.sequenceIndex].groups;
    assert.deepEqual(sorted(unique(local.flatMap(group => group.unitKeys))), sorted(lesson.units.map(unit => unit.unitKey)), lesson.route);
    for (const group of local) assert.ok(section12GroupObjectives(group, lesson).length);
    for (const [, description] of lesson.objectives) assert.ok(description?.trim(), lesson.route);
  }
});

const expectedPaperObjectives = {
  E098: ids(1, 3, 4, 5, 6),
  E099: ids(2, 1, 3),
  E100: ids(3, 1),
  E101: ids(4, 2, 4, 5),
  E102: [...ids(4, 3, 4), ...ids(5, 4, 5)],
  E103: ids(5, 8),
  E104: ids(7, 1, 2),
  E105: ids(7, 1),
  E106: ids(8, 1, 3),
  E107: ids(9, 1)
};

test('the learning route and sessions preserve prerequisites across stable pages', () => {
  assert.deepEqual(sorted(order), sorted(groups.map(group => group.id)));
  assert.equal(unique(order).length, order.length);
  assert.equal(owner(order[0]).sequenceIndex, 84);
  const taught = new Set();
  for (const group of orderedGroups) {
    for (const prerequisite of group.prerequisites ?? []) assert.ok(taught.has(prerequisite), `${group.id}: ${prerequisite} has not been taught`);
    taught.add(group.id);
  }
  const firstUnit = unitKey => orderedGroups.findIndex(group => group.unitKeys.includes(unitKey));
  for (const [earlier, later] of [
    ['S12-LIFECYCLE-STAGES', 'S12-WATERFALL'],
    ['S12-STRUCTURE-HIERARCHY', 'S12-STRUCTURE-CODE'],
    ['S12-STRUCTURE-PARAMETERS', 'S12-STRUCTURE-CODE'],
    ['S12-STATES-MEANING', 'S12-STATES-GUARDS'],
    ['S12-ERROR-TYPES', 'S12-TEST-STUB'],
    ['S12-DATA-CATEGORIES', 'S12-TEST-PLAN'],
    ['S12-AMEND-ANALYSE', 'S12-AMEND-VERIFY']
  ]) {
    assert.ok(firstUnit(earlier) >= 0 && firstUnit(later) >= 0, `${earlier}, ${later}: unknown unit`);
    assert.ok(firstUnit(earlier) < firstUnit(later), `${earlier} must precede ${later}`);
  }
  const sessions = section12Sessions.flatMap(session => session.groups);
  assert.deepEqual(sorted(unique(sessions)), sorted(order));
  for (const session of section12Sessions) {
    assert.equal(session.minutes, 45);
    assert.ok(session.title.trim() && session.focus.trim());
    for (const id of session.groups) assert.ok(taught.has(id), `${session.id}: unknown concept ${id}`);
  }
});

test('all ten original paper tasks appear once after their prerequisites with precise coverage', () => {
  assert.deepEqual(sorted(groups.flatMap(group => group.papers ?? [])), sorted(paperIds));
  assert.deepEqual(sorted(Object.keys(section12PaperObjectives)), sorted(paperIds));
  assert.ok(sources.every(Boolean));
  assert.equal(sources.reduce((sum, question) => sum + question.marks, 0), 37);
  assert.equal(sources.reduce((sum, question) => sum + question.parts.length, 0), 15);
  const taught = new Set();
  for (const group of orderedGroups) {
    group.objectiveIds.forEach(id => taught.add(id));
    for (const id of group.papers ?? []) {
      assert.ok(section12PaperCoverageNotes[id]?.trim(), `${id}: missing scope or prerequisite note`);
      assert.deepEqual(sorted(section12PaperObjectives[id]), sorted(expectedPaperObjectives[id]), `${id}: selected question does not assess the claimed scope`);
      for (const objective of section12PaperObjectives[id]) assert.ok(taught.has(objective), `${id} precedes ${objective}`);
    }
  }
  assert.deepEqual(section12PaperObjectives.E103, ids(5, 8), 'the one-mark customer question assesses acceptance, not alpha or beta');
  assert.ok(!section12PaperObjectives.E099.includes('S12.02.A04'), 'completing the supplied chart is not writing pseudocode');
  assert.ok(!section12PaperObjectives.E101.includes('S12.04.A06'), 'the selected error question does not ask for correction and retesting');
  assert.deepEqual(section12PaperObjectives.E105, ids(7, 1), 'valid sentinel sequences do not separately assess abnormal-data classification');
  assert.ok(!section12PaperObjectives.E106.includes('S12.08.A02') && !section12PaperObjectives.E106.includes('S12.08.A04'));
});

test('every concept provides concrete material, recall, explanation, a worked example and an independent check', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    assert.match(html, /data-mode="reading"/);
    assert.match(html, /<noscript>/);
    for (const group of section12Journey[lesson.sequenceIndex].groups) {
      assert.ok(group.stimulus.title.trim() && (group.stimulus.items?.length || group.stimulus.table), group.id);
      assert.ok(group.prerequisite?.title?.trim() && group.prerequisite.body?.trim(), `${group.id}: recall`);
      assert.ok(group.steps.length >= 3 && group.worked.steps.length >= 2, group.id);
      assert.ok(group.check.prompt.trim() && group.check.answer.trim(), group.id);
      const part = fragment(html, lesson, group);
      const opening = part.slice(part.indexOf(`id="${group.id}--observe"`), part.indexOf(`id="${group.id}--prepare"`));
      assert.match(opening, /class="s12-stimulus"/);
      assert.doesNotMatch(opening, /class="s5-starting-example"/, `${group.id}: opening must not leak the later solution`);
      for (const phase of ['observe', 'prepare', 'explain', 'worked', 'check', 'recap']) assert.ok(part.includes(`id="${group.id}--${phase}"`), `${group.id}: ${phase}`);
      for (const step of [...group.steps, ...group.worked.steps]) {
        assert.ok(step.title?.trim() && step.body?.trim(), `${group.id}: incomplete teaching step`);
        if (step.code) assert.ok(!step.code.includes('\\n'), `${group.id}: literal newline escape in code`);
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

test('cross-page navigation and the overview share the complete learning order', () => {
  let crossPage = 0;
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section12Journey[lesson.sequenceIndex].groups) {
      const index = order.indexOf(group.id);
      const part = fragment(html, lesson, group);
      assert.ok(part.includes(`data-s12-order="${index + 1}" data-s12-total="${order.length}"`));
      assert.ok(part.includes(`data-s12-prev="${index ? linkFor(order[index - 1], 'recap') : ''}"`));
      assert.ok(part.includes(`data-s12-next="${index < order.length - 1 ? linkFor(order[index + 1], 'observe') : ''}"`));
      if (index < order.length - 1 && owner(order[index + 1]).route !== lesson.route) crossPage += 1;
    }
  }
  assert.ok(crossPage >= 8);
  const overview = renderSection12Overview(lessons);
  for (const id of order) assert.ok(overview.includes(`href="${linkFor(id, 'observe')}"`), id);
});

test('reordered concepts retain accurate official syllabus headings', () => {
  const headings = { '12.1': 'Program Development Life Cycle', '12.2': 'Program Design', '12.3': 'Program Testing and Maintenance' };
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section12Journey[lesson.sequenceIndex].groups) {
      const expected = unique(group.objectiveIds.map(id => {
        const requirement = Number(id.split('.')[1]);
        return requirement === 1 ? '12.1' : requirement <= 3 ? '12.2' : '12.3';
      }));
      const part = fragment(html, lesson, group);
      const actual = [...part.matchAll(/data-s12-syllabus="([^"]+)"/g)].map(match => match[1]);
      assert.deepEqual(sorted(actual), sorted(expected), `${group.id}: wrong official syllabus heading`);
      for (const id of expected) assert.ok(part.includes(`${id} ${headings[id]}</span>`));
    }
  }
  const overview = renderSection12Overview(lessons);
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
      const group = section12Journey[lesson.sequenceIndex].groups.find(item => item.unitKeys.includes(unit.unitKey));
      assert.ok(fragment(html, lesson, group).includes(`id="unit-${index + 1}"`), `${lesson.route}#unit-${index + 1}`);
    }
    for (const id of ['visual-and-core', 'past-paper-questions', 'original-exam-style-question', 'practice', 'summary', 'lesson-contents']) assert.ok(identifiers.includes(id), `${lesson.route}#${id}`);
    for (const question of [...lesson.practice, ...(lesson.optionalPractice ?? [])]) assert.ok(html.includes(`data-question-id="${question.id}"`), question.id);
    for (const question of lesson.legacyPastPaperQuestions ?? []) assert.ok(identifiers.includes(question.id.toLowerCase()), `${lesson.route}#${question.id.toLowerCase()}`);
    for (const question of lesson.pastPaperQuestions) assert.ok(identifiers.includes(question.id.toLowerCase()), question.id);
  }
});

test('papers follow independent checks and retain separate hints, reasoning and official MS', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section12Journey[lesson.sequenceIndex].groups) {
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
  const usedLabs = [];
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section12Journey[lesson.sequenceIndex].groups.filter(group => group.lab)) {
      usedLabs.push(group.lab);
      assert.ok(labMarkup[group.lab], group.lab);
      assert.ok(group.experimentPrompt.trim(), group.id);
      const part = fragment(html, lesson, group);
      assert.ok(part.includes(`data-s12-lab="${group.lab}"`));
      assert.match(part, /data-s12-action="reset"/);
    }
  }
  assert.deepEqual(sorted(unique(usedLabs)), sorted(['lifecycle', 'structure', 'states', 'debug', 'testing', 'boundary', 'maintenance']));
});

test('original extracts retain reviewed bytes, dimensions, source identities and marks', () => {
  const original = JSON.parse(readFileSync(join(root, 'scripts/past-paper-source-manifest.json'), 'utf8')).questions;
  for (const question of sources) {
    assert.equal(question.parts.reduce((sum, part) => sum + part.marks, 0), question.marks, question.id);
    assert.equal(question.extractReview.status, 'verified', question.id);
    const retained = original.find(item => item.id === question.id);
    assert.ok(retained, `${question.id}: missing original source manifest record`);
    for (const field of ['syllabusCode', 'year', 'series', 'component', 'parts', 'marks', 'inserts']) {
      assert.deepEqual(question[field], retained[field], `${question.id}: changed original ${field}`);
    }
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

test('all published question, mark-scheme and insert crops retain their registered hashes', () => {
  const extracts = sources.flatMap(question => [...question.qp.extracts, ...question.ms.extracts, ...(question.inserts ?? [])]);
  assert.equal(extracts.length, 31);
  for (const extract of extracts) {
    const bytes = readFileSync(join(root, 'web', extract.asset));
    assert.equal(digest(bytes), extract.sha256, extract.asset);
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', extract.asset);
    assert.equal(bytes.readUInt32BE(16), extract.width, extract.asset);
    assert.equal(bytes.readUInt32BE(20), extract.height, extract.asset);
  }
});

test('the opening illustration retains its reviewed generated asset and appears in teaching', () => {
  const manifest = JSON.parse(readFileSync(join(root, 'scripts/course-v3-section12-classroom-images.json'), 'utf8'));
  assert.ok(manifest.assets.length > 0);
  for (const asset of manifest.assets) {
    const bytes = readFileSync(join(root, asset.path));
    assert.equal(digest(bytes), asset.sha256, asset.path);
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', asset.path);
    assert.equal(bytes.readUInt32BE(16), asset.width, asset.path);
    assert.equal(bytes.readUInt32BE(20), asset.height, asset.path);
    assert.ok(asset.prompt.trim() && asset.review.trim(), `${asset.path}: missing provenance`);
    assert.ok(groups.some(group => group.image?.asset === asset.path.replace(/^web/, '')), `${asset.path}: unused illustration`);
  }
});

test('local original QP, MS and insert PDFs match all sixteen registered source identities', async t => {
  const archive = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
  const insertArchive = process.env.AS9618_PAST_PAPER_INSERT_ROOT ?? join(root, 'docs/practice-past-paper-review-20260915');
  const candidates = [archive, insertArchive].filter(existsSync).flatMap(directory => readdirSync(directory, { recursive: true }).map(name => join(directory, String(name))));
  const checked = new Map();
  for (const question of sources) {
    for (const source of [question.qp, question.ms, ...(question.inserts ?? []).map(insert => ({ filename: insert.filename, sha256: insert.sourceSha256 }))]) {
      const existing = checked.get(source.filename);
      if (existing) assert.equal(existing, source.sha256, `${source.filename}: inconsistent identities`);
      checked.set(source.filename, source.sha256);
    }
  }
  assert.equal(checked.size, 16);
  for (const [filename, expectedHash] of checked) {
    await t.test(filename, subtest => {
      const path = candidates.find(candidate => candidate.endsWith('/' + filename));
      if (!path) return subtest.skip(`Local original PDF unavailable: ${filename}; published extract hash verification does not verify this missing source.`);
      const bytes = readFileSync(path);
      assert.equal(bytes.subarray(0, 5).toString(), '%PDF-', filename);
      assert.equal(digest(bytes), expectedHash, filename);
    });
  }
});
