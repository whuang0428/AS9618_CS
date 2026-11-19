import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section6Journey, section6Route } from './course-v3-section6-journey.mjs';
import { section6ExtraPapers } from './course-v3-section6-extra-papers.mjs';
import { section6PapersForLesson, renderSection6Classroom, renderSection6Overview, section6PaperObjectives, section6PaperCoverageNotes } from './course-v3-section6-classroom.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessons = courseV3Lessons.filter(l => l.section === 6);
const originalPool = lessons.flatMap(l => l.pastPaperQuestions);
const published = lessons.map(l => ({ ...l, pastPaperQuestions: section6PapersForLesson(l, originalPool) }));
const allPapers = published.flatMap(l => l.pastPaperQuestions);
const groups = lessons.flatMap(l => section6Journey[l.sequenceIndex].groups);
const materials = groups.flatMap(g => g.materials);
const sorted = a => [...a].sort();
const unique = a => [...new Set(a)];
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const mockPractice = q => `<article class="practice-question" data-question-id="${q.id}"><details><summary>Answer</summary>Teacher explanation</details></article>`;
const rendered = l => renderSection6Classroom(l, { renderPractice: mockPractice });

test('nine requested subsections preserve all 32 objectives and 26 original units', () => {
  assert.deepEqual(groups.map(g => g.number), ['6.1.1','6.1.2','6.1.3','6.1.4','6.1.5','6.1.6','6.2.1','6.2.2','6.2.3']);
  const objectives = lessons.flatMap(l => l.objectives.map(([id]) => id));
  const units = lessons.flatMap(l => l.units.map(u => u.unitKey));
  assert.equal(objectives.length, 32);
  assert.equal(units.length, 26);
  assert.deepEqual(sorted(unique(materials.flatMap(m => m.objectiveIds))), sorted(objectives));
  assert.deepEqual(sorted(unique(groups.flatMap(g => g.unitKeys))), sorted(units));
  for (const lesson of lessons) {
    assert.equal(lesson.classroomCourse, section6Journey[lesson.sequenceIndex]);
    for (const group of lesson.classroomCourse.groups) {
      assert.ok(group.materials.length > 0);
      for (const material of group.materials) {
        assert.ok(material.html && material.title && material.id);
        assert.ok(material.objectiveIds.every(id => group.objectiveIds.includes(id)));
      }
    }
  }
});

test('two independent checkpoint boundaries contain exactly the approved questions and marks', () => {
  const route = lessons.flatMap(l => section6Route(l.sequenceIndex));
  assert.deepEqual(route.map(g => g.number ?? 'checkpoint'), ['6.1.1','6.1.2','6.1.3','6.1.4','6.1.5','6.1.6','checkpoint','6.2.1','6.2.2','6.2.3','checkpoint']);
  const boundaries = route.filter(g => g.checkpoint);
  assert.deepEqual(boundaries.map(g => g.papers), [['E045','E6S01','E6S02','E6S03','E6S04','E6S05'], ['E6I01','E049','E6I02','E6I03','E6I04']]);
  assert.deepEqual(boundaries.map(g => g.papers.reduce((n, id) => n + allPapers.find(p => p.id === id).marks, 0)), [20, 17]);
  const taught = new Set();
  for (const group of route) {
    (group.objectiveIds ?? []).forEach(id => taught.add(id));
    for (const paper of group.papers ?? []) for (const id of section6PaperObjectives[paper]) assert.ok(taught.has(id), `${paper} precedes ${id}`);
  }
});

test('original practice is retained and restrictive paper prompts have precise mappings', () => {
  assert.equal(allPapers.length, 15);
  assert.equal(unique(allPapers.map(p => p.id)).length, 15);
  assert.deepEqual(section6PaperObjectives.E046, ['S6.03.A04']);
  for (const paper of allPapers) assert.ok(section6PaperCoverageNotes[paper.id]);
  for (const lesson of published) for (const q of [...lesson.practice, ...lesson.optionalPractice]) assert.ok(rendered(lesson).includes(`id="${q.id}"`));
});

test('old links resolve, anchors stay unique and answers start closed in both source views', () => {
  for (const lesson of published) {
    const html = rendered(lesson);
    const identifiers = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(unique(identifiers).length, identifiers.length, `Duplicate IDs in ${lesson.route}`);
    for (const [id] of lesson.objectives) assert.ok(identifiers.includes(id), id);
    lesson.units.forEach((u, i) => assert.ok(identifiers.includes(`unit-${i + 1}`), `${lesson.route} unit ${i + 1}`));
    for (const id of ['lesson-contents','classroom-unit','visual-and-core','practice','past-paper-questions','original-exam-style-question','summary']) assert.ok(identifiers.includes(id));
    const open = [...html.matchAll(/<details\b[^>]*\bopen[^>]*>/g)].map(m => m[0]);
    assert.ok(open.every(tag => tag.includes('exam-question-sheet')), 'Only the original question may start expanded');
    assert.match(html, /data-mode="reading"/, 'No-JS fallback must show complete material');
  }
  assert.match(rendered(published[0]), /id="e045"[^>]*href="\.\.\/lesson-036\/#e045"/);
  assert.match(rendered(published[0]), /id="E045"/);
  for (const lesson of published.slice(1)) for (const paper of lesson.pastPaperQuestions) {
    assert.ok(rendered(lesson).includes(`id="${paper.id}"`));
    assert.ok(rendered(lesson).includes(`id="${paper.id.toLowerCase()}"`));
  }
});

test('overview links reach all nine topics and both checkpoint starts', () => {
  const html = renderSection6Overview(published);
  for (const lesson of published) for (const group of section6Route(lesson.sequenceIndex)) assert.ok(html.includes(`href="../${lesson.route}/#${group.id}"`));
});

test('seven interactive mechanisms and both encryption instances are present', () => {
  const html = materials.map(m => m.html).join('');
  const kinds = [...html.matchAll(/data-s6-lab="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(sorted(unique(kinds)), sorted(['antivirus','antispyware','checksum','encryption','firewall','parity','signature']));
  assert.equal(kinds.filter(k => k === 'encryption').length, 2);
  assert.equal(kinds.filter(k => k === 'parity').length, 1, 'Byte and block share one switchable experiment');
  assert.equal(kinds.length, 8);
  const validation = groups.find(g => g.number === '6.2.2');
  for (const name of ['range','format','length','presence','existence','limit','check digit']) assert.ok(validation.materials.some(m => m.title.toLowerCase().includes(name)), name);
});

test('official crops retain original identities, reviewed geometry, hashes and dimensions', () => {
  for (const paper of allPapers) {
    assert.equal(paper.parts.reduce((n, p) => n + p.marks, 0), paper.marks);
    assert.equal(paper.extractReview.status, 'verified');
    if (paper.cropSpec) assert.equal(sha(JSON.stringify(paper.cropSpec)), paper.extractReview.cropSpecSha256);
    for (const kind of ['qp','ms']) {
      assert.ok(paper[kind].filename && paper[kind].sha256 && paper[kind].extracts.length);
      for (const crop of paper[kind].extracts) {
        const bytes = readFileSync(join(root, 'web', crop.asset));
        assert.equal(sha(bytes), crop.sha256, crop.asset);
        assert.equal(bytes.readUInt32BE(16), crop.width);
        assert.equal(bytes.readUInt32BE(20), crop.height);
      }
    }
  }
});

test('new original PDFs match the read-only Cambridge teaching archive', t => {
  const archive = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
  if (!existsSync(archive)) { t.skip('Set AS9618_PAST_PAPER_ROOT to verify original PDFs'); return; }
  for (const paper of section6ExtraPapers) for (const kind of ['qp','ms']) {
    const path = join(archive, paper[kind].sourcePdf);
    assert.equal(sha(readFileSync(path)), paper[kind].sha256, path);
  }
});

test('generated pages and browser assets use only S6 enhancement and retain no broken local images', () => {
  for (const lesson of published) {
    const html = readFileSync(join(root, 'web/course-v3', lesson.route, 'index.html'), 'utf8');
    assert.match(html, /section6-classroom\.js/);
    assert.doesNotMatch(html, /section5-(?:pages|classroom)\.js/);
    assert.match(html, /data-s6-classroom/);
    const identifiers = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(unique(identifiers).length, identifiers.length, lesson.route);
    for (const [, src] of html.matchAll(/(?:src|href)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
      if (/^(?:https?:|data:|#)/.test(src)) continue;
      const path = resolve(root, 'web/course-v3', lesson.route, src);
      assert.ok(existsSync(path), `Missing ${path}`);
    }
  }
});
