import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section7Journey, section7Sessions, section7LegacyGroups, section7PaperObjectives, section7PaperCoverageNotes } from './course-v3-section7-journey.mjs';
import { section7GroupObjectives, section7PapersForLesson, renderSection7Classroom, renderSection7Overview } from './course-v3-section7-classroom.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessons = courseV3Lessons.filter(lesson => lesson.section === 7).sort((a, b) => a.sequenceIndex - b.sequenceIndex);
const pool = lessons.flatMap(lesson => lesson.pastPaperQuestions);
const published = lessons.map(lesson => ({ ...lesson, pastPaperQuestions: section7PapersForLesson(lesson, pool) }));
const papers = published.flatMap(lesson => lesson.pastPaperQuestions);
const groups = lessons.flatMap(lesson => section7Journey[lesson.sequenceIndex].groups);
const materials = groups.flatMap(group => group.materials);
const sorted = values => [...values].sort();
const unique = values => [...new Set(values)];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const ids = (r, ...ns) => ns.map(n => `S7.${String(r).padStart(2, '0')}.A${String(n).padStart(2, '0')}`);
const requiredObjectives = [2, 2, 3, 1, 5, 6].flatMap((count, index) => ids(index + 1, ...Array.from({ length: count }, (_, i) => i + 1)));
const expectedPapers = ['E051', 'E052', 'E053', 'E7D03B', 'E054B', 'E054A', 'E7D01', 'E7D02', 'E7D03C', 'E055'];
const helpers = { renderPractice: q => `<article class="practice-question" data-question-id="${q.id}"><details><summary>Teacher-written answer</summary><p>Model reasoning</p></details></article>` };
const rendered = lesson => renderSection7Classroom(lesson, helpers);
const identifiers = html => [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);

test('the requested five subsections preserve four routes, 19 objectives and 18 old units', () => {
  assert.deepEqual(lessons.map(lesson => lesson.sequenceIndex), [38, 39, 40, 41]);
  assert.deepEqual(groups.map(group => group.number), ['7.1.1', '7.1.2', '7.1.3', '7.1.4', '7.1.5']);
  assert.equal(requiredObjectives.length, 19);
  assert.deepEqual(sorted(lessons.flatMap(lesson => lesson.objectives.map(([id]) => id))), sorted(requiredObjectives));
  assert.deepEqual(sorted(unique(materials.filter(m => !m.paperId).flatMap(m => m.objectiveIds))), sorted(requiredObjectives), 'Original questions must not be the sole teaching of an objective');
  assert.equal(lessons.reduce((count, lesson) => count + lesson.units.length, 0), 18);
  assert.equal(new Set(materials.map(m => m.id)).size, materials.length);
  for (const lesson of lessons) {
    const ownGroups = section7Journey[lesson.sequenceIndex].groups;
    assert.deepEqual(sorted(unique(ownGroups.flatMap(group => section7GroupObjectives(group, lesson)))), sorted(lesson.objectives.map(([id]) => id)), lesson.route);
    assert.deepEqual(sorted(unique(ownGroups.flatMap(group => group.unitKeys))), sorted(lesson.units.map(unit => unit.unitKey)), lesson.route);
    for (const group of ownGroups) for (const material of group.materials) {
      assert.ok(material.id && material.title && (material.html || material.paperId));
      assert.ok(material.unitKeys.length && material.unitKeys.every(key => group.unitKeys.includes(key)));
      assert.ok(material.objectiveIds.length && material.objectiveIds.every(id => group.objectiveIds.includes(id)));
    }
  }
});

test('the route and overview link directly to five numbered sections without fixed-duration promises', () => {
  assert.deepEqual(section7Sessions.flatMap(session => session.groups), groups.map(group => group.id));
  assert.ok(section7Sessions.every(session => session.pacing && !('minutes' in session)));
  const html = renderSection7Overview(lessons);
  for (const lesson of lessons) for (const group of section7Journey[lesson.sequenceIndex].groups) assert.ok(html.includes(`href="../${lesson.route}/#${group.id}"`));
  for (const lesson of published) for (const group of groups) assert.ok(rendered(lesson).includes(`#${group.id}"`), 'Every lesson has the five-part chapter directory');
});

test('body diagrams precede membership analysis, and four software figures precede the comparison', () => {
  const bodies = groups[0].materials;
  assert.deepEqual(bodies.slice(0, 2).map(m => m.id), ['s7-bcs', 's7-ieee']);
  for (const m of bodies.slice(0, 2)) assert.match(m.html, /class="s7-visual"/);
  assert.ok(bodies.findIndex(m => m.id === 's7-membership-ms') > 1);
  const licences = groups.find(group => group.number === '7.1.4').materials;
  assert.deepEqual(licences.slice(0, 4).map(m => m.id), ['s7-free-software', 's7-open-source', 's7-shareware', 's7-commercial']);
  for (const m of licences.slice(0, 4)) assert.match(m.html, /class="s7-visual"/);
  assert.equal(licences[4].id, 's7-software-comparison');
  assert.match(licences[4].html, /<table>/);
});

test('all 12 original parts and 33 marks are assigned once after their cumulative teaching prerequisites', () => {
  assert.deepEqual(papers.map(p => p.id), expectedPapers);
  assert.deepEqual(sorted(Object.keys(section7PaperObjectives)), sorted(expectedPapers));
  assert.deepEqual(sorted(Object.keys(section7PaperCoverageNotes)), sorted(expectedPapers));
  assert.equal(papers.reduce((n, paper) => n + paper.marks, 0), 33);
  assert.equal(papers.reduce((n, paper) => n + paper.parts.length, 0), 12);
  const parts = papers.flatMap(p => p.parts.map(part => `${p.year}:${p.series}:${p.component}:${part.part}`));
  assert.equal(unique(parts).length, parts.length, 'Splitting a question must not count any original part twice');
  const taught = new Set();
  for (const material of materials) {
    if (!material.paperId) material.objectiveIds.forEach(id => taught.add(id));
    else {
      const id = material.paperId;
      assert.ok(section7PaperCoverageNotes[id]);
      for (const objective of section7PaperObjectives[id]) assert.ok(taught.has(objective), `${id} precedes ${objective}`);
    }
  }
  assert.deepEqual(papers.find(p => p.id === 'E054B').parts, [{ part: '5(b)(ii)', marks: 2 }]);
  assert.deepEqual(papers.find(p => p.id === 'E054A').parts, [{ part: '5(b)(i)', marks: 3 }]);
  assert.deepEqual(papers.find(p => p.id === 'E7D03B').parts, [{ part: '8(b)', marks: 3 }]);
  assert.deepEqual(papers.find(p => p.id === 'E7D03C').parts, [{ part: '8(c)', marks: 4 }]);
});

test('paper allocation works with the default lesson pool as well as the complete section pool', () => {
  for (const lesson of lessons) {
    assert.deepEqual(section7PapersForLesson(lesson), section7PapersForLesson(lesson, pool), lesson.route);
  }
});

test('learning explanations and AI coverage gaps remain distinct from official marking claims', () => {
  const assessed = new Set(Object.values(section7PaperObjectives).flat());
  for (const id of ids(6, 4, 5, 6)) assert.ok(!assessed.has(id));
  for (const name of ['economic', 'environmental']) {
    const material = materials.find(m => m.id === `s7-ai-${name}-impacts`);
    assert.match(material.html, /teacher-written/i);
    assert.match(material.html, /No directly matching .*MS/);
    assert.match(material.html, /<details class="s7-choice"/);
  }
  for (const method of ['supervised', 'unsupervised', 'reinforcement']) {
    const material = materials.find(m => m.id === `s7-ai-${method}-learning`);
    assert.match(material.html, /class="s7-visual"/);
    assert.match(material.html, /A Level Section 18/);
  }
  assert.ok(materials.find(m => m.id === 's7-ai-family-relationships'));
  assert.ok(materials.find(m => m.id === 's7-ai-evaluate-use').html.includes('Teacher-written'));
});

test('old unit, concept, practice and source-question bookmarks remain reachable with unique IDs', () => {
  for (const lesson of published) {
    const html = rendered(lesson), all = identifiers(html);
    assert.equal(unique(all).length, all.length, `Duplicate IDs on ${lesson.route}`);
    for (const [id] of lesson.objectives) assert.ok(all.includes(id), id);
    lesson.units.forEach((unit, index) => assert.ok(all.includes(`unit-${index + 1}`), `${lesson.route}: ${unit.unitKey}`));
    for (const id of Object.keys(section7LegacyGroups[lesson.sequenceIndex])) assert.ok(all.includes(id), id);
    for (const id of ['lesson-contents', 'visual-and-core', 'classroom-unit', 'past-paper-questions', 'original-exam-style-question', 'practice', 'summary']) assert.ok(all.includes(id), id);
    for (const q of [...lesson.practice, ...lesson.optionalPractice]) assert.ok(all.includes(q.id), q.id);
    for (const q of lesson.pastPaperQuestions) { assert.ok(all.includes(q.id), q.id); assert.ok(all.includes(q.id.toLowerCase())); }
    assert.match(html, /data-mode="reading"/, 'No-JavaScript view must retain the complete text');
    assert.doesNotMatch(html, /data-s7-card[^>]*\bhidden\b/, 'Source materials must not start hidden');
    const firstPaper = section7Journey[lesson.sequenceIndex].groups.flatMap(g => g.materials).find(m => m.paperId);
    assert.ok(html.indexOf('id="past-paper-questions"') > html.indexOf(`id="${firstPaper.id}"`));
  }
  const copyright = rendered(published[2]), ai = rendered(published[3]);
  for (const id of ['E054', 'e054']) assert.ok(identifiers(copyright).includes(id));
  for (const id of ['E7D03', 'e7d03']) assert.ok(identifiers(ai).includes(id));
  assert.ok(ai.includes('href="../lesson-039/#e7d03b"'));
});

test('official questions, guidance, teacher solutions and schemes remain separate and answers closed', () => {
  for (const lesson of published) {
    const html = rendered(lesson);
    for (const tag of html.match(/<details\b[^>]*\bopen[^>]*>/g) ?? []) assert.match(tag, /class="exam-question-sheet"/, 'Only the original question may start expanded');
    for (const question of lesson.pastPaperQuestions) {
      const start = html.indexOf(`data-question-id="${question.id}"`), end = html.indexOf('</article>', start);
      const fragment = html.slice(start, end);
      assert.ok(start > 0 && end > start);
      for (const role of ['original-question', 'reading', 'solution', 'mark-scheme', 'marking-explanation']) assert.ok(fragment.includes(`data-exam-role="${role}"`), `${question.id}: missing ${role}`);
      for (const extract of [...question.qp.extracts, ...question.ms.extracts]) assert.ok(fragment.includes(`src="../..${extract.asset}"`), extract.asset);
    }
  }
});

test('original extracts preserve reviewed source identities, crop geometry, hashes and dimensions', () => {
  for (const question of papers) {
    assert.equal(question.parts.reduce((sum, part) => sum + part.marks, 0), question.marks, question.id);
    assert.equal(question.extractReview.status, 'verified', question.id);
    if (question.cropSpec) assert.equal(digest(JSON.stringify(question.cropSpec)), question.extractReview.cropSpecSha256, question.id);
    for (const kind of ['qp', 'ms']) {
      const source = question[kind];
      assert.ok(source.filename.endsWith('.pdf') && /^[a-f0-9]{64}$/.test(source.sha256) && source.extracts.length);
      for (const extract of source.extracts) {
        const bytes = readFileSync(join(root, 'web', extract.asset));
        assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
        assert.equal(digest(bytes), extract.sha256, extract.asset);
        assert.equal(bytes.readUInt32BE(16), extract.width, extract.asset);
        assert.equal(bytes.readUInt32BE(20), extract.height, extract.asset);
        assert.ok(extract.page > 0 && extract.bbox[2] > extract.bbox[0] && extract.bbox[3] > extract.bbox[1]);
      }
    }
  }
});

test('local original PDFs match the source identities when the archive is available', async t => {
  const archive = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
  if (!existsSync(archive)) return t.skip('Local PDF archive unavailable; published extract hashes are tested separately.');
  const candidates = readdirSync(archive, { recursive: true }).map(String), verified = new Set();
  for (const question of papers) for (const kind of ['qp', 'ms']) {
    const source = question[kind], identity = `${source.filename}:${source.sha256}`;
    if (verified.has(identity)) continue;
    verified.add(identity);
    await t.test(source.filename, subtest => {
      const path = source.sourcePdf ?? candidates.find(path => path.endsWith('/' + source.filename) || path === source.filename);
      if (!path || !existsSync(join(archive, path))) return subtest.skip(`Missing ${source.filename}`);
      assert.equal(digest(readFileSync(join(archive, path))), source.sha256);
    });
  }
});

test('generated pages load only the S7 controller, include the five-part route and have valid local links', () => {
  for (const lesson of published) {
    const html = readFileSync(join(root, 'web/course-v3', lesson.route, 'index.html'), 'utf8');
    assert.match(html, /section7-classroom\.js/);
    assert.match(html, /section7-materials\.css/);
    assert.doesNotMatch(html, /section[56]-(?:pages|classroom)\.js/);
    assert.match(html, /data-s7-classroom/);
    assert.equal(unique(identifiers(html)).length, identifiers(html).length, lesson.route);
    for (const group of section7Journey[lesson.sequenceIndex].groups) {
      assert.ok(html.includes(`id="${group.id}"`));
      for (const material of group.materials) assert.ok(html.includes(`id="${material.id}"`), `${lesson.route}: rebuild missing ${material.id}`);
    }
    for (const [, src] of html.matchAll(/(?:src|href)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
      if (/^(?:https?:|data:|#)/.test(src)) continue;
      assert.ok(existsSync(resolve(root, 'web/course-v3', lesson.route, src)), `${lesson.route}: ${src}`);
    }
  }
});
