import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section8Journey, section8Modules, section8Sessions, section8PaperObjectives, section8PaperCoverageNotes } from './course-v3-section8-journey.mjs';
import { section8GroupObjectives, section8PapersForLesson, renderSection8Classroom, renderSection8Overview } from './course-v3-section8-classroom.mjs';
import { section8ExtraPapers } from './course-v3-section8-extra-papers.mjs';
import { labMarkup } from './course-v3-section8-labs.mjs';
import { sqlLabMarkup } from './course-v3-section8-sql-labs.mjs';
import { renderPastPaperQuestions } from './course-v3-past-paper-render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessons = courseV3Lessons.filter(lesson => lesson.section === 8).sort((a, b) => a.sequenceIndex - b.sequenceIndex);
// E065 is retained in the integrated review, so the pool must include the whole course.
const pool = courseV3Lessons.flatMap(lesson => lesson.pastPaperQuestions);
const groups = lessons.flatMap(lesson => section8Journey[lesson.sequenceIndex].groups);
const byGroup = new Map(groups.map(group => [group.id, group]));
const route = section8Modules.flatMap(module => module.groups);
const allocations = lessons.flatMap(lesson => section8PapersForLesson(lesson, pool));
const sorted = values => [...values].sort();
const unique = values => [...new Set(values)];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => [key, canonical(item)])) : value;
// Independent stable requirement counts come from the retained Section 8 syllabus contract.
const requiredObjectives = [2, 5, 1, 5, 6, 2, 3, 2, 5, 6, 3].flatMap((count, requirement) => Array.from({ length: count }, (_, index) => `S8.${String(requirement + 1).padStart(2, '0')}.A${String(index + 1).padStart(2, '0')}`));
const helpers = {
  renderPastPaperQuestions,
  renderPractice: question => `<article data-question-id="${question.id}"><details><summary>Teacher-written answer</summary><p>Model reasoning</p></details></article>`
};
const rendered = lesson => renderSection8Classroom({ ...lesson, pastPaperQuestions: section8PapersForLesson(lesson, pool) }, helpers);
function groupHtml(html, lesson, group) {
  const lessonGroups = section8Journey[lesson.sequenceIndex].groups;
  const next = lessonGroups[lessonGroups.indexOf(group) + 1];
  const start = html.indexOf(`id="${group.id}"`);
  const end = next ? html.indexOf(`id="${next.id}"`, start + 1) : html.indexOf('<nav class="s5-navigation"', start);
  assert.ok(start >= 0 && end > start, `Missing group boundary: ${group.id}`);
  return html.slice(start, end);
}
function assertTable(table, label) {
  assert.ok(table.headers?.length && Array.isArray(table.rows), `${label}: missing table structure`);
  for (const row of table.rows) assert.equal(row.length, table.headers.length, `${label}: inconsistent table columns`);
}

test('six stable routes cover all 40 objectives and every retained knowledge unit', () => {
  assert.deepEqual(lessons.map(lesson => lesson.route), ['lesson-042', 'lesson-043', 'lesson-044', 'lesson-045', 'lesson-046', 'lesson-047']);
  assert.equal(requiredObjectives.length, 40);
  assert.deepEqual(sorted(lessons.flatMap(lesson => lesson.objectives.map(([id]) => id))), sorted(requiredObjectives));
  assert.deepEqual(sorted(unique(groups.flatMap(group => group.objectiveIds))), sorted(requiredObjectives));
  assert.equal(byGroup.size, groups.length, 'concept IDs must be unique across the section');
  for (const lesson of lessons) {
    const concepts = section8Journey[lesson.sequenceIndex].groups;
    assert.ok(concepts.length && section8Journey[lesson.sequenceIndex].title && section8Journey[lesson.sequenceIndex].intro);
    assert.deepEqual(sorted(unique(concepts.flatMap(group => section8GroupObjectives(group, lesson)))), sorted(lesson.objectives.map(([id]) => id)), lesson.route);
    assert.deepEqual(sorted(unique(concepts.flatMap(group => group.unitKeys))), sorted(lesson.units.map(unit => unit.unitKey)), lesson.route);
  }
});

test('modules and the 27 suggested sessions follow dependencies across the preserved page routes', () => {
  assert.deepEqual(sorted(route), sorted(groups.map(group => group.id)), 'each concept belongs once in the main module route');
  const taught = new Set();
  for (const id of route) {
    const group = byGroup.get(id);
    assert.ok(Array.isArray(group.prerequisites), `${id}: declare prerequisites explicitly`);
    for (const prerequisite of group.prerequisites) assert.ok(taught.has(prerequisite), `${id} precedes its prerequisite ${prerequisite}`);
    taught.add(id);
  }
  assert.equal(section8Sessions.length, 27, 'the approved initial pacing uses 27 flexible 45-minute sessions');
  const sessionOrder = section8Sessions.flatMap(session => session.groups);
  assert.deepEqual(sorted(unique(sessionOrder)), sorted(route), 'sessions must cover the complete learning route');
  // Long concepts may span sessions, and the final transfer lesson revisits earlier material.
  assert.deepEqual(unique(sessionOrder), route, 'first teaching of each concept must match the module route');
  for (const session of section8Sessions) {
    assert.equal(session.minutes, 45, session.title);
    assert.ok(session.title?.trim() && session.focus?.trim() && session.groups?.length, 'each session needs a usable focus and stopping point');
  }
  const overview = renderSection8Overview(lessons);
  for (const group of groups) assert.ok(overview.includes(`#${group.id}`), `${group.id}: missing overview access`);
});

test('concepts provide concrete observation, explanation, worked reasoning and independent checks', () => {
  for (const group of groups) {
    for (const field of ['title', 'question', 'observe', 'takeaway', 'bridge']) assert.ok(group[field]?.trim(), `${group.id}: empty ${field}`);
    assert.ok(group.steps?.length >= 2, `${group.id}: a beginner explanation needs an actual progression`);
    assert.ok(group.worked?.title?.trim() && group.worked.setup?.trim() && group.worked.conclusion?.trim(), `${group.id}: incomplete worked context`);
    assert.ok(group.worked.steps?.length >= 2, `${group.id}: worked example omits the reasoning process`);
    assert.ok(group.check?.prompt?.trim() && group.check.answer?.trim(), `${group.id}: incomplete independent check`);
    for (const step of [...group.steps, ...group.worked.steps]) {
      assert.ok(step.title?.trim() && step.body?.trim(), `${group.id}: incomplete teaching step`);
      if (step.table) assertTable(step.table, group.id);
      for (const table of step.tables ?? []) assertTable(table, group.id);
    }
    assert.ok(group.steps.some(step => step.table || step.code) || group.image || /\d|Member|Loan|Book|Order|Asha|Amina/.test(group.observe), `${group.id}: no identifiable concrete starting material`);
    if (group.image) {
      assert.ok(group.image.alt?.trim() && group.image.caption?.trim(), `${group.id}: missing visual explanation`);
      assert.ok(existsSync(join(root, 'web', group.image.asset)), `${group.id}: missing visual ${group.image.asset}`);
    }
  }
});

test('paper allocation is explicit and occurs only after its mapped objectives have been taught', () => {
  const selected = groups.flatMap(group => group.papers ?? []);
  assert.equal(unique(selected).length, selected.length, 'do not duplicate one selected paper group at several teaching positions');
  assert.deepEqual(sorted(selected), sorted(Object.keys(section8PaperObjectives)));
  assert.deepEqual(sorted(selected), sorted(Object.keys(section8PaperCoverageNotes)));
  assert.deepEqual(sorted(allocations.map(question => question.id)), sorted(selected));
  const taught = new Set();
  for (const id of route) {
    const group = byGroup.get(id);
    group.objectiveIds.forEach(objective => taught.add(objective));
    for (const paper of group.papers ?? []) {
      assert.ok(section8PaperObjectives[paper]?.length, `${paper}: missing precise mapping`);
      for (const objective of section8PaperObjectives[paper]) {
        assert.ok(requiredObjectives.includes(objective), `${paper}: invalid objective ${objective}`);
        assert.ok(taught.has(objective), `${paper} appears before ${objective} has been taught`);
      }
      assert.ok(section8PaperCoverageNotes[paper]?.trim(), `${paper}: missing coverage limits`);
    }
  }
  for (const question of allocations) assert.deepEqual(question.objectiveIds, section8PaperObjectives[question.id]);
  assert.ok(!selected.includes('E061'), 'the combined E061 source must not be repeated beside its selected parts');
  assert.ok(!selected.includes('E065'), 'the combined review source must not be repeated beside its selected parts');
});

test('split question groups preserve every selected original part, mark and source identity', () => {
  for (const [parentID, children] of [['E061', ['E061B', 'E061C']], ['E065', ['E065A', 'E065B', 'E065C', 'E065D']]]) {
    const parent = pool.find(question => question.id === parentID);
    assert.ok(parent, `${parentID}: original combined source missing`);
    const parts = children.map(id => section8ExtraPapers.find(question => question.id === id));
    assert.ok(parts.every(Boolean), `${parentID}: a split part is missing`);
    assert.deepEqual(parts.flatMap(question => question.parts), parent.parts, `${parentID}: original selected parts or marks changed`);
    assert.equal(parts.reduce((sum, question) => sum + question.marks, 0), parent.marks);
    for (const part of parts) for (const kind of ['qp', 'ms']) {
      assert.equal(part[kind].filename, parent[kind].filename);
      assert.equal(part[kind].sha256, parent[kind].sha256);
    }
  }
  for (const id of ['E8D01', 'E8D02']) {
    const paper = section8ExtraPapers.find(question => question.id === id);
    assert.ok(paper?.qp?.sourcePdf && paper?.ms?.sourcePdf, `${id}: new source needs its original PDF locations`);
    assert.ok(allocations.some(question => question.id === id), `${id}: sourced question is not taught`);
  }
});

test('every authored experiment is used and has prediction, local reset and accessible feedback', () => {
  const available = { ...labMarkup, ...sqlLabMarkup };
  const used = unique(groups.map(group => group.lab).filter(Boolean));
  assert.deepEqual(sorted(used), sorted(Object.keys(available)), 'activity configuration and actual teaching use must agree');
  for (const group of groups.filter(group => group.lab)) {
    assert.ok(group.experimentPrompt?.trim(), `${group.id}: experiment lacks a prediction task`);
    const html = available[group.lab];
    assert.ok(html?.includes('type="button"'), `${group.lab}: no keyboard/touch button`);
    if (labMarkup[group.lab]) {
      assert.ok(html.includes(`data-s8-lab="${group.lab}"`));
      assert.ok(html.includes('data-s8-action="reset"'));
      assert.ok(html.includes('aria-live="polite"'));
    } else {
      assert.match(html, /textarea/i, `${group.lab}: independent SQL needs an editor`);
      assert.match(html, /reset/i, `${group.lab}: independent SQL needs a data reset`);
    }
  }
});

test('one complete reading DOM retains folded answers and places each paper after teaching and checks', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    assert.equal((html.match(/\bdata-s8-classroom(?=[\s=>])/g) ?? []).length, 1, lesson.route);
    assert.ok(html.includes('data-mode="reading"'), 'without JavaScript the full reading content remains available');
    const openDetails = html.match(/<details\b[^>]*\sopen(?:[\s=>])[^>]*>/gi) ?? [];
    assert.ok(openDetails.every(tag => /class="s8-sql-source"/.test(tag)), `${lesson.route}: an answer or guidance is exposed; only current SQL source data may start open`);
    const identifiers = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(identifiers).size, identifiers.length, `${lesson.route}: duplicate HTML ID`);
    for (const group of section8Journey[lesson.sequenceIndex].groups) {
      const fragment = groupHtml(html, lesson, group);
      const explanation = fragment.indexOf(`id="${group.id}--explain"`);
      const worked = fragment.indexOf(`id="${group.id}--worked"`);
      const check = fragment.indexOf(`id="${group.id}--check"`);
      assert.ok(explanation >= 0 && worked > explanation && check > worked, `${group.id}: teaching order changed`);
      for (const id of group.papers ?? []) {
        const start = fragment.indexOf(`data-question-id="${id}"`);
        assert.ok(start > check, `${id}: question precedes teaching or its understanding check`);
        const question = allocations.find(source => source.id === id);
        for (const extract of [...question.qp.extracts, ...question.ms.extracts, ...(question.inserts ?? [])]) assert.ok(fragment.includes(extract.asset), `${id}: required original extract not shown`);
        const part = fragment.slice(start, fragment.indexOf('</article>', start));
        for (const role of ['original-question', 'reading', 'solution', 'mark-scheme']) assert.ok(part.includes(`data-exam-role="${role}"`), `${id}: missing independent ${role} reveal`);
      }
    }
  }
});

test('old unit, stage and original question bookmarks remain reachable on the six original routes', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson); const concepts = section8Journey[lesson.sequenceIndex].groups;
    for (const [index, unit] of lesson.units.entries()) {
      const owner = concepts.find(group => group.unitKeys.includes(unit.unitKey));
      assert.ok(owner, unit.unitKey);
      assert.ok(groupHtml(html, lesson, owner).includes(`id="unit-${index + 1}"`), `${lesson.route}#unit-${index + 1}: no corresponding concept`);
    }
    for (const id of ['visual-and-core', 'past-paper-questions', 'original-exam-style-question', 'practice', 'summary']) assert.equal(html.split(`id="${id}"`).length - 1, 1, `${lesson.route}#${id}: missing or duplicated`);
    for (const question of [...lesson.pastPaperQuestions, ...section8PapersForLesson(lesson, pool)]) assert.ok(html.includes(`id="${question.id.toLowerCase()}"`), `${lesson.route}#${question.id.toLowerCase()}: original or selected question bookmark lost`);
  }
});

test('rendered module navigation follows the teaching route rather than old lesson number order', () => {
  const lessonFor = id => lessons.find(lesson => section8Journey[lesson.sequenceIndex].groups.some(group => group.id === id));
  for (const [index, id] of route.entries()) {
    const lesson = lessonFor(id); const fragment = groupHtml(rendered(lesson), lesson, byGroup.get(id));
    for (const [direction, nextID] of [['prev', route[index - 1]], ['next', route[index + 1]]]) {
      const expected = nextID ? `../${lessonFor(nextID).route}/#${nextID}` : '';
      assert.ok(fragment.includes(`data-s8-${direction}-href="${expected}"`), `${id}: ${direction} does not follow the module sequence`);
    }
  }
});

test('official QP and MS extracts retain verified crops, actual image bytes and complete marks', () => {
  for (const question of allocations) {
    assert.equal(question.parts.reduce((sum, part) => sum + part.marks, 0), question.marks, question.id);
    assert.equal(question.extractReview.status, 'verified', `${question.id}: final visual source review is not complete`);
    if (question.cropSpec) assert.equal(digest(JSON.stringify(canonical(question.cropSpec))), question.extractReview.cropSpecSha256, `${question.id}: crop changed after review`);
    for (const kind of ['qp', 'ms']) {
      const source = question[kind];
      assert.ok(source.filename.endsWith('.pdf') && /^[a-f0-9]{64}$/.test(source.sha256) && source.extracts.length, `${question.id}: incomplete ${kind} source`);
      for (const extract of source.extracts) {
        const path = join(root, 'web', extract.asset); assert.ok(existsSync(path), `${question.id}: missing ${extract.asset}`);
        const bytes = readFileSync(path);
        assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', extract.asset);
        assert.equal(digest(bytes), extract.sha256, extract.asset);
        assert.equal(bytes.readUInt32BE(16), extract.width, extract.asset);
        assert.equal(bytes.readUInt32BE(20), extract.height, extract.asset);
        assert.ok(extract.page > 0 && extract.bbox[2] > extract.bbox[0] && extract.bbox[3] > extract.bbox[1], `${extract.asset}: invalid crop bounds`);
      }
    }
  }
});

test('local original PDFs match the retained source identities when the archive is available', async t => {
  const archive = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
  if (!existsSync(archive)) return t.skip('Local PDF archive is unavailable; extract hashes are checked separately.');
  const candidates = readdirSync(archive, { recursive: true }).map(String); const checked = new Set();
  for (const question of allocations) for (const kind of ['qp', 'ms']) {
    const source = question[kind]; const identity = `${source.filename}:${source.sha256}`;
    if (checked.has(identity)) continue; checked.add(identity);
    await t.test(source.filename, subtest => {
      const relative = source.sourcePdf ?? candidates.find(path => path === source.filename || path.endsWith('/' + source.filename));
      if (!relative || !existsSync(join(archive, relative))) return subtest.skip(`Original PDF unavailable: ${source.filename}`);
      assert.equal(digest(readFileSync(join(archive, relative))), source.sha256, source.filename);
    });
  }
});

test('the active library illustration has recorded provenance and completed visual review', () => {
  const manifestPath = join(root, 'scripts/course-v3-section8-classroom-images.json');
  assert.ok(existsSync(manifestPath), 'record the new library illustration and its review before delivery');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const rasterPaths = unique(groups.map(group => group.image?.asset).filter(path => path && /\.(?:png|jpe?g|webp)$/i.test(path)));
  assert.ok(rasterPaths.length > 0, 'the agreed library situation illustration must be present');
  for (const path of rasterPaths) {
    const asset = manifest.assets.find(item => item.path === `web${path}`);
    assert.ok(asset?.prompt && asset?.sha256, `${path}: missing generation provenance`);
    assert.ok(['verified', 'reviewed', 'approved'].includes(asset.review?.status), `${path}: image review is not complete`);
    assert.ok(asset.review.checked?.length && asset.review.limits?.trim(), `${path}: review observations and limits must be recorded`);
    assert.equal(digest(readFileSync(join(root, asset.path))), asset.sha256, path);
  }
});

test('generated lessons load the S8 controller and models and contain the current authored concepts', () => {
  for (const lesson of lessons) {
    const path = join(root, 'web/course-v3', lesson.route, 'index.html');
    const html = readFileSync(path, 'utf8');
    assert.ok(html.includes('data-s8-classroom'), `${lesson.route}: regenerate the current S8 page`);
    for (const file of ['section8-classroom.js', 'section8-models.js', 'section8-labs.js']) assert.ok(html.includes(file), `${lesson.route}: missing ${file}`);
    assert.ok(html.indexOf('section8-models.js') < html.indexOf('section8-labs.js'), `${lesson.route}: models must load before activity handlers`);
    for (const group of section8Journey[lesson.sequenceIndex].groups) assert.ok(html.includes(`id="${group.id}"`), `${lesson.route}: stale content for ${group.id}`);
  }
});
