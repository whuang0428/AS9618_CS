import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section8Journey, section8Modules, section8Checkpoints, section8PaperObjectives, section8PaperCoverageNotes } from './course-v3-section8-journey.mjs';
import { section8GroupObjectives, section8PapersForLesson, section8BookmarkTargets, prepareSection8Lesson, renderSection8Classroom, renderSection8Overview } from './course-v3-section8-classroom.mjs';
import { section8ExtraPapers } from './course-v3-section8-extra-papers.mjs';
import { section8NewPapers } from './course-v3-section8-new-papers.mjs';
import { dbmsPanelLabels, sqlExamples } from './course-v3-section8-dbms-data.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessons = courseV3Lessons.filter(lesson => lesson.section === 8).sort((a, b) => a.sequenceIndex - b.sequenceIndex);
// The original combined E065 source belongs to the integrated review.
const pool = courseV3Lessons.flatMap(lesson => lesson.pastPaperQuestions);
const published = lessons.map(lesson => ({ ...prepareSection8Lesson(lesson), pastPaperQuestions: section8PapersForLesson(lesson, pool) }));
const groups = lessons.flatMap(lesson => section8Journey[lesson.sequenceIndex].groups);
const materials = groups.flatMap(group => group.materials);
const allocations = published.flatMap(lesson => lesson.pastPaperQuestions);
const sorted = values => [...values].sort();
const unique = values => [...new Set(values)];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => [key, canonical(item)])) : value;
const identifiers = html => [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
// Stable requirement counts are independent of the new material allocation.
const requiredObjectives = [2, 5, 1, 5, 6, 2, 3, 2, 5, 6, 3].flatMap((count, requirement) => Array.from({ length: count }, (_, index) => `S8.${String(requirement + 1).padStart(2, '0')}.A${String(index + 1).padStart(2, '0')}`));
const expectedSubsections = ['8.1.1', '8.1.2', '8.1.3', '8.1.4', '8.2.1', '8.2.2', '8.3.1', '8.3.2', '8.3.3', '8.3.4', '8.3.5'];
const mainPapers = {
  43: ['E056', 'E8D01', 'E065A', 'E058', 'E8N01'],
  44: ['E8N02', 'E059', 'E060', 'E065D'],
  47: ['E061B', 'E061C', 'E065C', 'E062', 'E063', 'E8N03', 'E8N04'],
};
const extensionPapers = { 43: ['E057', 'E8D02'], 44: [], 47: ['E065B', 'E8N05'] };
// Incoming group anchors captured from the former 35-concept route, before the redesign.
const oldGroups = {
  42: ['library-repeated-facts', 'library-records-and-fields', 'library-choose-identifiers', 'library-link-and-repeat', 'library-valid-references', 'library-relationship-rules', 'library-index-lookups'],
  43: ['library-er-design', 'orders-first-normal-form', 'orders-second-normal-form', 'orders-third-normal-form', 'orders-check-and-reconstruct'],
  44: ['library-model-and-schema', 'library-data-dictionary', 'library-developer-tools', 'library-integrity-rules', 'library-access-rights', 'library-backup-and-recovery', 'library-query-processor'],
  45: ['library-sql-roles'],
  46: ['library-read-sql', 'library-create-database', 'library-field-types', 'library-declare-keys', 'library-alter-structure'],
  47: ['library-select-columns', 'library-filter-records', 'library-sort-results', 'library-calculate-aggregates', 'library-group-records', 'library-join-records', 'library-query-combination', 'library-insert-records', 'library-update-records', 'library-delete-and-transfer'],
};
const oldPaperLinks = { 42: ['E056', 'E8D01', 'E8D02'], 43: ['E057', 'E058', 'E065A'], 44: ['E059', 'E060', 'E065D'], 45: [], 46: ['E061', 'E061B', 'E061C', 'E065B'], 47: ['E062', 'E063', 'E065C'] };
const helpers = { renderPractice: q => `<article class="practice-question" data-question-id="${q.id}"><details><summary>Teacher-written answer</summary><p>Model reasoning</p></details></article>` };
const rendered = lesson => renderSection8Classroom(lesson, helpers);
const renderedPages = new Map(published.map(lesson => [lesson.sequenceIndex, rendered(lesson)]));

test('eleven requested subsections preserve six routes, all 40 objectives and 37 original units', () => {
  assert.deepEqual(lessons.map(lesson => lesson.route), ['lesson-042', 'lesson-043', 'lesson-044', 'lesson-045', 'lesson-046', 'lesson-047']);
  assert.deepEqual(groups.map(group => group.number), expectedSubsections);
  assert.equal(requiredObjectives.length, 40);
  assert.deepEqual(sorted(lessons.flatMap(lesson => lesson.objectives.map(([id]) => id))), sorted(requiredObjectives));
  assert.deepEqual(sorted(unique(materials.flatMap(material => material.objectiveIds))), sorted(requiredObjectives), 'Every objective needs teaching material before assessment');
  const originalUnits = lessons.flatMap(lesson => lesson.units.map(unit => unit.unitKey));
  assert.equal(originalUnits.length, 37);
  assert.deepEqual(sorted(unique(materials.flatMap(material => material.unitKeys))), sorted(originalUnits));
  assert.equal(unique(materials.map(material => material.id)).length, materials.length);
  assert.equal(unique(groups.map(group => group.id)).length, groups.length);
  for (const lesson of published) {
    const ownGroups = section8Journey[lesson.sequenceIndex].groups;
    assert.deepEqual(sorted(unique(ownGroups.flatMap(section8GroupObjectives))), sorted(lesson.objectives.map(([id]) => id)), lesson.route);
    assert.deepEqual(sorted(lesson.syllabusIds), sorted(unique(lesson.objectives.map(([id]) => id.replace(/\.A\d+$/, '')))));
    for (const group of ownGroups) {
      assert.ok(group.materials.length && group.title && group.number, group.id);
      assert.deepEqual(sorted(unique(group.materials.flatMap(m => m.objectiveIds))), sorted(group.objectiveIds));
      assert.deepEqual(sorted(unique(group.materials.flatMap(m => m.unitKeys))), sorted(group.unitKeys));
      for (const material of group.materials) {
        assert.ok(material.id && material.title && material.html?.trim(), `${group.id}: incomplete static material`);
        assert.ok(material.objectiveIds.length && material.unitKeys.length, `${material.id}: missing coverage`);
        assert.ok(!material.paperId, `${material.id}: original questions must sit in the checkpoint`);
      }
    }
  }
  assert.ok(published.find(l => l.sequenceIndex === 42).objectives.some(([id]) => id === 'S8.03.A01'), 'E-R teaching moves to the database example in 8.1.2');
  assert.ok(published.find(l => l.sequenceIndex === 45).objectives.some(([id]) => id.startsWith('S8.08.')), 'Reading SQL is taught with the language introduction');
  assert.throws(() => section8GroupObjectives({ id: 'invalid', objectiveIds: ['S8.99.A01'], unitKeys: [] }), /Unknown/);
});

test('the chapter directory follows 8.1, 8.2, 8.3 with explicit stage boundaries', () => {
  assert.equal(section8Modules.length, 3);
  assert.deepEqual(section8Modules.flatMap(module => module.groups), groups.map(group => group.id));
  assert.deepEqual(Object.keys(section8Checkpoints).map(Number), [43, 44, 47]);
  const html = renderSection8Overview(lessons);
  let previous = -1;
  for (const lesson of lessons) {
    for (const group of section8Journey[lesson.sequenceIndex].groups) {
      const href = `../${lesson.route}/#${group.id}`;
      const index = html.indexOf(`href="${href}"`, previous + 1);
      assert.ok(index > previous, `${group.number}: overview sequence or link is wrong`);
      previous = index;
      for (const page of renderedPages.values()) assert.ok(page.includes(`#${group.id}"`), `${group.id}: missing chapter-directory access`);
    }
    const cp = section8Checkpoints[lesson.sequenceIndex];
    if (cp) {
      assert.ok(cp.summary.length && cp.title, `${cp.id}: no stage recap`);
      const index = html.indexOf(`#${cp.id}"`, previous + 1);
      assert.ok(index > previous, `${cp.id}: stage checkpoint does not follow its teaching`);
      previous = index;
    }
  }
});

test('teaching tables retain full rows and workbench buttons name supported panels and examples', () => {
  for (const material of materials) {
    for (const match of material.html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/g)) {
      const headers = match[1].match(/<thead>([\s\S]*?)<\/thead>/)?.[1];
      const body = match[1].match(/<tbody>([\s\S]*?)<\/tbody>/)?.[1];
      assert.ok(headers && body, `${material.id}: incomplete table`);
      const columns = (headers.match(/<th\b/g) ?? []).length;
      for (const row of body.matchAll(/<tr>([\s\S]*?)<\/tr>/g)) assert.equal((row[1].match(/<(?:th|td)\b/g) ?? []).length, columns, `${material.id}: inconsistent row width`);
    }
    for (const match of material.html.matchAll(/<button\b[^>]*data-s8-open-dbms[^>]*>/g)) {
      const panel = match[0].match(/data-panel="([^"]+)"/)?.[1];
      const example = match[0].match(/data-example="([^"]+)"/)?.[1];
      assert.ok(panel && Object.hasOwn(dbmsPanelLabels, panel), `${material.id}: unsupported DBMS panel ${panel}`);
      assert.ok(example && Object.hasOwn(sqlExamples, example), `${material.id}: unsupported SQL example ${example}`);
    }
  }
});

test('E-R diagrams use CIE single-line and three-branch ends for the stated relationships', () => {
  const cases = [
    ['s8-library-er', { 'member-loan': ['end'], 'copy-loan': ['start'], 'member-card': [], 'book-copy': ['start'] }],
    ['s8-relationship-cardinality', { 'type-0': [], 'type-1': ['end'], 'type-2': ['start', 'end'] }],
  ];
  for (const [id, relationships] of cases) {
    const html = materials.find(m => m.id === id).html;
    const connectors = [...html.matchAll(/<g data-s8-er-edge="([^"]+)">([\s\S]*?)<\/g>/g)];
    assert.deepEqual(connectors.map(([, name]) => name), Object.keys(relationships), id);
    for (const [, name, paths] of connectors) {
      assert.equal((paths.match(/data-s8-er-line\b/g) ?? []).length, 1, `${name}: one continuous relationship line`);
      const branches = [...paths.matchAll(/data-s8-er-many="(start|end)" d="([^"]+)"/g)];
      assert.deepEqual(branches.map(([, end]) => end), relationships[name], `${name}: the many end must match the business rule`);
      for (const [, , path] of branches) assert.equal((path.match(/L/g) ?? []).length, 2, `${name}: two outer branches plus the central line`);
    }
    assert.doesNotMatch(html, /<marker\b|0\.\.[*1]|>\s*1\s*<\/text>/, `${id}: use CIE relationship symbols rather than numeric UML ends or arrows`);
  }
});

test('three checkpoints allocate 16 main parts and 51 marks, with four separate extensions', () => {
  const taught = new Set(), selected = [], main = [], extended = [];
  for (const lesson of lessons) {
    for (const group of section8Journey[lesson.sequenceIndex].groups) {
      assert.deepEqual(group.papers ?? [], [], `${group.id}: source questions should be at the stage boundary`);
      for (const material of group.materials) material.objectiveIds.forEach(id => taught.add(id));
    }
    const cp = section8Checkpoints[lesson.sequenceIndex];
    if (!cp) {
      assert.equal(section8PapersForLesson(lesson, pool).length, 0);
      continue;
    }
    assert.deepEqual(cp.papers, mainPapers[lesson.sequenceIndex]);
    assert.deepEqual(cp.extensionPapers, extensionPapers[lesson.sequenceIndex]);
    main.push(...cp.papers); extended.push(...cp.extensionPapers);
    for (const id of [...cp.papers, ...cp.extensionPapers]) {
      selected.push(id);
      assert.ok(section8PaperObjectives[id]?.length && section8PaperCoverageNotes[id]?.trim(), `${id}: missing exact coverage`);
      for (const objective of section8PaperObjectives[id]) {
        assert.ok(requiredObjectives.includes(objective), `${id}: invalid objective ${objective}`);
        assert.ok(taught.has(objective), `${id}: assessed before ${objective} is taught`);
      }
    }
  }
  assert.equal(main.length, 16);
  assert.equal(extended.length, 4);
  assert.equal(allocations.filter(q => main.includes(q.id)).reduce((sum, q) => sum + q.marks, 0), 51);
  assert.equal(unique(selected).length, selected.length, 'Question groups must not appear at two stages');
  assert.deepEqual(sorted(selected), sorted(Object.keys(section8PaperObjectives)));
  assert.deepEqual(sorted(selected), sorted(Object.keys(section8PaperCoverageNotes)));
  assert.deepEqual(allocations.map(q => q.id), selected);
  const parts = allocations.flatMap(q => q.parts.map(p => `${q.year}:${q.series}:${q.component}:${p.part}`));
  assert.equal(unique(parts).length, parts.length, 'The same original part must not be repeated through a parent selection');
  for (const q of allocations) assert.deepEqual(q.objectiveIds, section8PaperObjectives[q.id]);
  assert.ok(!selected.includes('E061') && !selected.includes('E065'), 'Combined parents duplicate their separately displayed parts');
});

test('split question groups preserve original parts, marks and PDF source identities', () => {
  for (const [parentID, children] of [['E061', ['E061B', 'E061C']], ['E065', ['E065A', 'E065B', 'E065C', 'E065D']]]) {
    const parent = pool.find(question => question.id === parentID);
    assert.ok(parent, `${parentID}: original combined source missing`);
    const parts = children.map(id => section8ExtraPapers.find(question => question.id === id));
    assert.ok(parts.every(Boolean));
    assert.deepEqual(parts.flatMap(question => question.parts), parent.parts);
    assert.equal(parts.reduce((sum, question) => sum + question.marks, 0), parent.marks);
    for (const part of parts) for (const kind of ['qp', 'ms']) {
      assert.equal(part[kind].filename, parent[kind].filename);
      assert.equal(part[kind].sha256, parent[kind].sha256);
    }
  }
  for (const paper of [...section8ExtraPapers.filter(p => ['E8D01', 'E8D02'].includes(p.id)), ...section8NewPapers]) {
    assert.ok(paper.qp.sourcePdf && paper.ms.sourcePdf, `${paper.id}: missing original archive paths`);
    assert.ok(allocations.some(q => q.id === paper.id), `${paper.id}: source omitted from the main or extension set`);
  }
});

test('static reading contains every material and one shared DBMS, with no duplicate IDs', () => {
  for (const lesson of published) {
    const html = renderedPages.get(lesson.sequenceIndex), all = identifiers(html);
    assert.equal(unique(all).length, all.length, `Duplicate HTML IDs on ${lesson.route}`);
    assert.equal((html.match(/\bdata-s8-classroom(?=[\s=>])/g) ?? []).length, 1);
    assert.equal((html.match(/\bdata-s8-dbms(?=[\s=>])/g) ?? []).length, 1, `${lesson.route}: duplicate DBMS would split classroom state`);
    assert.equal((html.match(/\bdata-dbms-config(?=[\s=>])/g) ?? []).length, 1);
    assert.match(html, /data-mode="reading"/);
    assert.match(html, /<noscript>/);
    assert.doesNotMatch(html, /<section[^>]*data-s8-card[^>]*\bhidden\b/, 'Static teaching must remain available without JavaScript');
    assert.doesNotMatch(html, /<article[^>]*data-s8-topic[^>]*\bhidden\b/);
    for (const group of section8Journey[lesson.sequenceIndex].groups) for (const material of group.materials) {
      assert.ok(all.includes(material.id), material.id);
      assert.ok(html.includes(material.html), `${material.id}: full authored explanation is not rendered`);
    }
    for (const tag of html.match(/<details\b[^>]*\bopen[^>]*>/g) ?? []) assert.match(tag, /class="exam-question-sheet"/, 'Only an original question may start expanded');
    for (const id of ['lesson-contents', 'visual-and-core', 'classroom-unit', 'past-paper-questions', 'original-exam-style-question', 'practice', 'summary']) assert.ok(all.includes(id), `${lesson.route}#${id}`);
    for (const q of [...lesson.practice, ...lesson.optionalPractice]) assert.ok(all.includes(q.id), `${lesson.route}: practice bookmark ${q.id}`);
  }
});

test('original questions appear after the stage teaching and answers remain independent', () => {
  for (const lesson of published) {
    const cp = section8Checkpoints[lesson.sequenceIndex];
    const html = renderedPages.get(lesson.sequenceIndex);
    if (!cp) {
      assert.doesNotMatch(html, /class="exam-question"/);
      continue;
    }
    const endOfTeaching = Math.max(...section8Journey[lesson.sequenceIndex].groups.flatMap(g => g.materials).map(m => html.indexOf(`id="${m.id}"`)));
    const checkpointStart = html.indexOf(`id="${cp.id}"`);
    assert.ok(checkpointStart > endOfTeaching, `${cp.id}: checkpoint interrupts teaching`);
    const extensionStart = html.indexOf('<details class="s8-extension"');
    assert.ok(extensionStart > checkpointStart);
    for (const q of lesson.pastPaperQuestions) {
      const start = html.indexOf(`data-question-id="${q.id}"`), end = html.indexOf('</article>', start);
      assert.ok(start > checkpointStart && end > start);
      assert.equal(start > extensionStart, cp.extensionPapers.includes(q.id), `${q.id}: core/extension placement wrong`);
      const fragment = html.slice(start, end);
      for (const role of ['original-question', 'reading', 'solution', 'mark-scheme', 'marking-explanation', 'mistakes']) assert.ok(fragment.includes(`data-exam-role="${role}"`), `${q.id}: missing ${role}`);
      for (const extract of [...q.qp.extracts, ...q.ms.extracts, ...(q.inserts ?? [])]) assert.ok(fragment.includes(extract.asset), `${q.id}: dropped original context or answer`);
    }
  }
});

test('all 35 old concept links, unit links and question links reach an existing replacement', () => {
  assert.equal(Object.values(oldGroups).flat().length, 35);
  for (const lesson of lessons) {
    const page = lesson.sequenceIndex, html = renderedPages.get(page), all = identifiers(html), targets = section8BookmarkTargets(page);
    const expected = [...oldGroups[page], ...lesson.units.map((_, i) => `unit-${i + 1}`), ...lesson.objectives.map(([id]) => id), ...oldPaperLinks[page].flatMap(id => [id, id.toLowerCase()])];
    for (const alias of expected) {
      assert.ok(targets[alias], `${lesson.route}#${alias}: no migration target`);
      assert.ok(all.includes(alias), `${lesson.route}#${alias}: no static incoming anchor`);
      const { page: targetPage, target } = targets[alias];
      assert.ok(identifiers(renderedPages.get(targetPage)).includes(target), `${alias}: destination ${targetPage}#${target} does not exist`);
      if (targetPage !== page) assert.ok(html.includes(`href="../lesson-${String(targetPage).padStart(3, '0')}/#${target}"`), `${alias}: missing no-JavaScript relocation link`);
    }
  }
  assert.equal(section8BookmarkTargets(43)['unit-1'].page, 42, 'The former E-R unit must redirect to 8.1.2');
  assert.equal(section8BookmarkTargets(46)['unit-1'].page, 45, 'The former read-SQL unit must redirect to 8.3.3');
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

test('generated pages ship the current materials, checkpoints and shared-workbench assets', () => {
  for (const lesson of published) {
    const html = readFileSync(join(root, 'web/course-v3', lesson.route, 'index.html'), 'utf8');
    assert.match(html, /section8-classroom\.js\?v=20261119s8r2/, 'new DOM requires a fresh controller cache key');
    for (const asset of ['section8-classroom.js', 'section8-dbms.js', 'section8-dbms.css']) assert.ok(html.includes(asset), `${lesson.route}: missing ${asset}`);
    assert.equal((html.match(/\bdata-s8-dbms(?=[\s=>])/g) ?? []).length, 1, `${lesson.route}: regenerate the current shared DBMS`);
    for (const group of section8Journey[lesson.sequenceIndex].groups) {
      assert.ok(html.includes(`id="${group.id}"`), `${lesson.route}: stale subsection ${group.number}`);
      for (const material of group.materials) assert.ok(html.includes(material.html), `${lesson.route}: stale material ${material.id}`);
    }
    const cp = section8Checkpoints[lesson.sequenceIndex];
    if (cp) {
      assert.ok(html.includes(`id="${cp.id}"`));
      for (const id of [...cp.papers, ...cp.extensionPapers]) assert.ok(html.includes(`data-question-id="${id}"`), `${lesson.route}: missing selected paper ${id}`);
    }
    const all = identifiers(html);
    assert.equal(unique(all).length, all.length, `${lesson.route}: generated duplicate HTML IDs`);
  }
  for (const asset of ['section8-dbms.js', 'section8-dbms-worker.js', 'section8-dbms-store.js', 'section8-dbms.css']) assert.ok(existsSync(join(root, 'web/course-v3', asset)), `Missing runtime asset ${asset}`);
  const overview = readFileSync(join(root, 'web/course-v3/section-8/index.html'), 'utf8');
  for (const group of groups) assert.ok(overview.includes(`#${group.id}"`), `Generated overview omits ${group.number}`);
  for (const cp of Object.values(section8Checkpoints)) assert.ok(overview.includes(`#${cp.id}"`));
});
