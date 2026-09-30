import test from 'node:test';
import assert from 'node:assert/strict';
import { accessSync, constants, existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section3Journey, section3Sessions } from './course-v3-section3-journey.mjs';
import { groupObjectives, paperIdsForGroup, section3PapersForLesson } from './course-v3-section3-classroom.mjs';
import { section3ExtraPapers } from './course-v3-section3-extra-papers.mjs';
import { imageDimensions } from './image-dimensions.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = path => JSON.parse(readFileSync(join(root, path), 'utf8'));
const sha256 = value => createHash('sha256').update(value).digest('hex');
const lessons = courseV3Lessons.filter(lesson => lesson.section === 3);
const groups = lessons.flatMap(lesson => section3Journey[lesson.sequenceIndex].groups.map(group => ({ group, lesson })));
const papers = lessons.flatMap(section3PapersForLesson);
const manifest = readJson('scripts/past-paper-source-manifest.json');
const cropSpecs = readJson('scripts/past-paper-extracts.json');
const approved = readJson('docs/practice-past-paper-review-20260915/selection-registry.json');
const sourceRoot = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';

// Independently audited question scope: a broad requirement match is insufficient.
const expectedPaperObjectives = {
  E021: ['S3.02.A01', 'S3.02.A03'],
  E022: ['S3.03.A09'],
  E023: ['S3.03.A08'],
  E024: ['S3.04.A01', 'S3.06.A02', 'S3.06.A03'],
  E025: ['S3.08.A01', 'S3.08.A02', 'S3.08.A03', 'S3.09.A01', 'S3.09.A02'],
  E026: ['S3.08.A01', 'S3.08.A02', 'S3.08.A03', 'S3.09.A02'],
  E027: ['S3.10.A03', 'S3.10.A04', 'S3.10.A05', 'S3.10.A06'],
  E028: ['S3.10.A08', 'S3.10.A09'],
  E3D01: ['S3.03.A02'],
  E3D02: ['S3.03.A05'],
  E3D03: ['S3.03.A07', 'S3.04.A01'],
  E3D04: ['S3.07.A01', 'S3.07.A02', 'S3.07.A03'],
};
const expectedObjectives = [5, 3, 9, 1, 2, 4, 3, 3, 2, 10].flatMap((count, index) =>
  Array.from({ length: count }, (_, n) => `S3.${String(index + 1).padStart(2, '0')}.A${String(n + 1).padStart(2, '0')}`));
const sorted = values => [...values].sort();
const nonempty = (value, label) => assert.ok(typeof value === 'string' && value.trim(), label);

test('Section 3 groups cover all 42 syllabus objectives through real unit keys', () => {
  assert.deepEqual(lessons.map(lesson => lesson.sequenceIndex), [15, 16, 17, 18, 19, 20]);
  assert.equal(expectedObjectives.length, 42);
  assert.deepEqual(sorted(lessons.flatMap(lesson => lesson.objectives.map(([id]) => id))), sorted(expectedObjectives));
  assert.equal(new Set(groups.map(({ group }) => group.id)).size, groups.length, 'Concept IDs must be unique');
  const covered = new Set();
  for (const lesson of lessons) {
    const lessonCoverage = new Set();
    for (const group of section3Journey[lesson.sequenceIndex].groups) {
      assert.ok(group.unitKeys.length, `${group.id}: missing unit keys`);
      for (const key of group.unitKeys) assert.ok(lesson.units.some(unit => unit.unitKey === key), `${group.id}: unknown unit ${key}`);
      for (const id of groupObjectives(group, lesson)) {
        lessonCoverage.add(id);
        covered.add(id);
      }
    }
    assert.deepEqual(sorted(lessonCoverage), sorted(lesson.objectives.map(([id]) => id)), `Lesson ${lesson.sequenceIndex}: incomplete teaching coverage`);
  }
  assert.deepEqual(sorted(covered), sorted(expectedObjectives));
});

test('every concept occurs once in a 45-minute classroom session', () => {
  const scheduled = [];
  for (const session of section3Sessions) {
    nonempty(session.title, 'Session title');
    assert.ok(session.groups.length, `${session.title}: no concepts`);
    const minutes = Object.values(session.minutes);
    assert.ok(minutes.length && minutes.every(value => Number.isFinite(value) && value > 0), `${session.title}: invalid timing`);
    assert.equal(minutes.reduce((sum, value) => sum + value, 0), 45, session.title);
    scheduled.push(...session.groups);
  }
  assert.deepEqual(sorted(scheduled), sorted(groups.map(({ group }) => group.id)), 'Missing, repeated or unknown scheduled concept');
});

test('each concept provides material, explanation, a check and a takeaway', () => {
  for (const { group } of groups) {
    for (const field of ['id', 'title', 'question', 'observe', 'takeaway', 'bridge']) nonempty(group[field], `${group.id}: ${field}`);
    assert.ok(group.steps.length, `${group.id}: no explanation steps`);
    nonempty(group.check?.prompt, `${group.id}: check prompt`);
    nonempty(group.check?.answer, `${group.id}: check answer`);
    for (const [index, step] of group.steps.entries()) {
      nonempty(step.title, `${group.id} step ${index + 1}: title`);
      nonempty(step.body, `${group.id} step ${index + 1}: body`);
      if (!step.table) continue;
      assert.ok(step.table.headers.length && step.table.rows.length, `${group.id}: empty table`);
      for (const row of step.table.rows) {
        assert.equal(row.length, step.table.headers.length, `${group.id} step ${index + 1}: table columns do not align`);
        assert.ok(row.every(cell => cell !== undefined && cell !== null), `${group.id}: missing table value`);
      }
    }
  }
});

test('the 12 original questions occur once and use their precise audited objectives', () => {
  const expectedIds = Object.keys(expectedPaperObjectives);
  assert.deepEqual(sorted(papers.map(paper => paper.id)), sorted(expectedIds), 'Lesson paper inventory');
  assert.deepEqual(sorted(groups.flatMap(({ group }) => paperIdsForGroup(group))), sorted(expectedIds), 'Concept paper placement');
  for (const paper of papers) {
    assert.deepEqual(sorted(paper.objectiveIds), sorted(expectedPaperObjectives[paper.id]), `${paper.id}: overly broad or incorrect objective mapping`);
    assert.equal(paper.marks, paper.parts.reduce((sum, part) => sum + part.marks, 0), `${paper.id}: marks`);
    for (const field of ['reading', 'solution', 'marking', 'mistakes']) assert.ok(paper[field]?.length, `${paper.id}: missing ${field}`);
  }
  const printer = papers.find(paper => paper.id === 'E3D01');
  assert.deepEqual(printer.parts, [{ part: '10(a)', marks: 3 }], '3D question must not assign the later buffer part');
});

test('question placement follows its prerequisite teaching in both page and session order', () => {
  const byId = new Map(groups.map(item => [item.group.id, item]));
  const prerequisites = {
    E024: ['S3.04-BUFFER', 'S3.06-SRAM-DRAM'],
    E3D03: ['S3.03-OPTICAL-DISC', 'S3.04-BUFFER'],
  };
  for (const [label, ordered] of [
    ['page order', groups],
    ['session order', section3Sessions.flatMap(session => session.groups.map(id => byId.get(id)))],
  ]) {
    const taught = new Set();
    const priorUnits = new Set();
    for (const item of ordered) {
      assert.ok(item, `${label}: unknown group`);
      const { group, lesson } = item;
      groupObjectives(group, lesson).forEach(id => taught.add(id));
      for (const paperId of paperIdsForGroup(group)) {
        for (const id of expectedPaperObjectives[paperId] ?? []) assert.ok(taught.has(id), `${label}: ${paperId} appears before ${id}`);
        for (const key of prerequisites[paperId] ?? []) assert.ok(priorUnits.has(key), `${label}: ${paperId} requires earlier teaching of ${key}`);
      }
      group.unitKeys.forEach(key => priorUnits.add(key));
    }
  }
});

test('all old and new paper sources preserve source identity, crop review and image integrity', () => {
  for (const paper of papers) {
    assert.equal(paper.sourceType, 'past-paper', paper.id);
    assert.equal(paper.extractReview?.status, 'verified', `${paper.id}: unreviewed crop`);
    assert.ok(paper.sourceRef && paper.accessUrl, `${paper.id}: missing source reference`);
    const original = manifest.questions.find(question => question.id === paper.id);
    const extra = section3ExtraPapers.find(question => question.id === paper.id);
    const source = original ?? extra;
    assert.ok(source, `${paper.id}: unregistered source`);
    if (original) {
      const selection = approved.find(question => question.id === paper.id);
      assert.ok(selection, `${paper.id}: not in approved source register`);
      for (const key of ['syllabusCode', 'year', 'series', 'component', 'parts', 'marks', 'syllabusMapping']) {
        assert.deepEqual(paper[key], selection[key], `${paper.id}: changed approved ${key}`);
      }
    }
    const geometry = original
      ? Object.fromEntries(['insert', 'ms', 'qp'].filter(key => key in cropSpecs[paper.id]).map(key => [key, cropSpecs[paper.id][key]]))
      : Object.fromEntries(['ms', 'qp'].map(kind => [kind, paper[kind].extracts.map(extract => [extract.page, extract.bbox[1], extract.bbox[3]])]));
    assert.equal(sha256(JSON.stringify(geometry)), paper.extractReview.cropSpecSha256, `${paper.id}: changed crop geometry`);
    for (const kind of ['qp', 'ms']) {
      assert.deepEqual(paper[kind], source[kind], `${paper.id}: changed ${kind} source`);
      assert.match(paper[kind].sha256, /^[a-f0-9]{64}$/, `${paper.id}: missing ${kind} PDF hash`);
      assert.ok(paper[kind].extracts.length, `${paper.id}: no ${kind} extract`);
      if (original) assert.equal(paper[kind].sha256, approved.find(question => question.id === paper.id)[kind].sha256);
      assert.deepEqual(paper[kind].extracts.map(extract => [extract.page, extract.bbox[1], extract.bbox[3]]), geometry[kind], `${paper.id}: ${kind} geometry differs from review`);
      for (const extract of paper[kind].extracts) {
        const path = join(root, 'web', extract.asset);
        assert.ok(existsSync(path), `${paper.id}: missing ${extract.asset}`);
        assert.equal(sha256(readFileSync(path)), extract.sha256, `${paper.id}: modified ${extract.asset}`);
        assert.deepEqual(imageDimensions(path), { width: extract.width, height: extract.height }, `${paper.id}: incorrect dimensions`);
        assert.equal(extract.width, Math.floor((extract.bbox[2] - extract.bbox[0]) * 2));
        assert.equal(extract.height, Math.floor((extract.bbox[3] - extract.bbox[1]) * 2));
      }
    }
  }
});

// The public repository does not contain the teacher-owned PDFs. Explicit skips
// expose unavailable local sources without reporting their hashes as verified.
const localSources = new Map();
for (const paper of papers) for (const kind of ['qp', 'ms']) {
  const source = paper[kind];
  const folder = `${paper.year}-${paper.series === 'Oct/Nov' ? 'Oct-Nov' : 'May-June'}`;
  const path = join(sourceRoot, source.sourcePdf ?? join(folder, source.filename));
  if (localSources.has(path)) assert.equal(localSources.get(path), source.sha256, `Conflicting PDF hashes: ${path}`);
  localSources.set(path, source.sha256);
}
for (const [path, expectedHash] of localSources) test(`original PDF SHA-256: ${path.slice(sourceRoot.length + 1)}`, t => {
  try {
    accessSync(path, constants.R_OK);
  } catch (error) {
    if (!['ENOENT', 'EACCES', 'EPERM'].includes(error.code)) throw error;
    t.skip(`Teacher source PDF is not readable (${error.code}): ${path}`);
    return;
  }
  assert.equal(sha256(readFileSync(path)), expectedHash, `Original PDF changed: ${path}`);
});

function attribute(tag, name) {
  return new RegExp(`(?:\\s)${name}=(?:"([^"]*)"|'([^']*)')`).exec(tag)?.slice(1).find(value => value !== undefined);
}

function assertUniqueIds(html, label) {
  const ids = [...html.matchAll(/<[a-z][^>]*>/gi)].map(([tag]) => attribute(tag, 'id')).filter(id => id !== undefined);
  assert.equal(ids.length, new Set(ids).size, `${label}: duplicate HTML IDs: ${ids.filter((id, index) => ids.indexOf(id) !== index).join(', ')}`);
}

function renderedGroups(html) {
  const stack = [];
  const found = [];
  for (const match of html.matchAll(/<\/?article\b[^>]*>/gi)) {
    if (!match[0].startsWith('</')) {
      stack.push({ start: match.index, tag: match[0], isGroup: /\sdata-s3-group(?=[\s>])/.test(match[0]) });
    } else {
      const item = stack.pop();
      assert.ok(item, 'Unexpected closing article');
      if (item.isGroup) found.push({ id: attribute(item.tag, 'id'), tag: item.tag, html: html.slice(item.start, match.index + match[0].length) });
    }
  }
  assert.equal(stack.length, 0, 'Unclosed article');
  return found;
}

for (const lesson of lessons) {
  const page = join(root, 'web/course-v3', lesson.route, 'index.html');
  test(`generated classroom page: ${lesson.route}`, { skip: existsSync(page) ? false : `NOT GENERATED: ${page}` }, async t => {
    const html = readFileSync(page, 'utf8');
    assert.match(html, /data-s3-classroom/, `${lesson.route}: generated page is stale`);
    assertUniqueIds(html, lesson.route);
    const expectedGroups = section3Journey[lesson.sequenceIndex].groups;
    const rendered = renderedGroups(html);
    assert.deepEqual(rendered.map(group => group.id), expectedGroups.map(group => group.id));
    for (const [index, output] of rendered.entries()) {
      const group = expectedGroups[index];
      assert.deepEqual(sorted(attribute(output.tag, 'data-objectives').split(' ')), sorted(groupObjectives(group, lesson)), `${group.id}: rendered objective mapping`);
      assert.deepEqual(attribute(output.tag, 'data-unit-keys').split(' '), group.unitKeys);
      const phases = [...output.html.matchAll(/data-s3-phase="([^"]+)"/g)].map(match => match[1]);
      assert.deepEqual(phases, ['observe', 'explain', ...(group.lab ? ['explore'] : []), 'check', ...(paperIdsForGroup(group).length ? ['exam'] : []), 'connect'], `${group.id}: missing or misplaced teaching stage`);
      assert.equal([...output.html.matchAll(/data-s3-step-panel="\d+"/g)].length, group.steps.length, `${group.id}: missing teaching step`);
      const originalTags = [...output.html.matchAll(/<article\b[^>]*>/g)].filter(([tag]) => /class="[^"]*\bexam-question\b/.test(tag));
      const originalIds = originalTags.map(([tag]) => attribute(tag, 'data-question-id'));
      assert.deepEqual(originalIds, paperIdsForGroup(group), `${group.id}: missing, duplicate or misplaced original question`);
      for (const [tag] of originalTags) {
        const paperId = attribute(tag, 'data-question-id');
        assert.deepEqual(sorted((attribute(tag, 'data-objectives') ?? '').split(' ')), sorted(expectedPaperObjectives[paperId]), `${paperId}: generated objective mapping is stale or overly broad`);
      }
      const renderedQuestionIds = [...output.html.matchAll(/data-question-id="([^"]+)"/g)].map(match => match[1]);
      for (const practiceId of group.practiceIds ?? []) assert.equal(renderedQuestionIds.filter(id => id === practiceId).length, 1, `${group.id}: missing or repeated teacher-written task ${practiceId}`);
      const images = [...output.html.matchAll(/<(?:img|image)\b[^>]*>/g)];
      const schematics = [...output.html.matchAll(/<svg\b[^>]*>/g)];
      assert.ok(images.length || schematics.length || output.html.includes('s3-process-map'), `${group.id}: no teaching visual`);
      for (const [tag] of schematics) {
        assert.match(attribute(tag, 'viewBox') ?? '', /^\s*-?[\d.]+\s+-?[\d.]+\s+[\d.]+\s+[\d.]+\s*$/, `${group.id}: invalid SVG viewBox`);
        assert.equal(attribute(tag, 'role'), 'img', `${group.id}: missing schematic image role`);
        nonempty(attribute(tag, 'aria-label'), `${group.id}: missing schematic description`);
      }
      for (const [tag] of images) {
        const src = /^<image\b/.test(tag) ? attribute(tag, 'href') ?? attribute(tag, 'xlink:href') : attribute(tag, 'src');
        nonempty(src, `${group.id}: missing image source`);
        if (/^data:/i.test(src)) {
          const data = /^data:image\/[^;,]+((?:;[^,]*)?),([\s\S]+)$/i.exec(src);
          assert.ok(data, `${group.id}: invalid inline image URI`);
          if (/;base64(?:;|$)/i.test(data[1])) {
            assert.match(data[2], /^[a-z\d+/]+={0,2}$/i, `${group.id}: invalid base64 image data`);
            assert.ok(Buffer.from(data[2], 'base64').length, `${group.id}: empty inline image`);
          } else {
            assert.ok(decodeURIComponent(data[2]).length, `${group.id}: empty inline image`);
          }
          continue;
        }
        if (/^(?:https?:)?\/\//i.test(src)) {
          const remote = new URL(src, 'https://example.invalid/');
          await t.test(`${group.id}: external image ${remote.href}`, { skip: 'External image availability requires browser/network verification; no local integrity claim.' }, () => {});
          continue;
        }
        const path = src.startsWith('/') ? join(root, 'web', src) : fileURLToPath(new URL(src, pathToFileURL(page)));
        assert.ok(existsSync(path), `${group.id}: missing generated image ${src}`);
        const dimensions = imageDimensions(path);
        assert.ok(dimensions?.width > 0 && dimensions?.height > 0, `${group.id}: invalid image ${src}`);
      }
    }
    const renderedPaperIds = [...html.matchAll(/<article\b[^>]*>/g)].filter(([tag]) => /class="[^"]*\bexam-question\b/.test(tag)).map(([tag]) => attribute(tag, 'data-question-id'));
    assert.deepEqual(sorted(renderedPaperIds), sorted(section3PapersForLesson(lesson).map(paper => paper.id)), `${lesson.route}: complete question inventory`);
  });
}

const overview = join(root, 'web/course-v3/section-3/index.html');
test('generated overview links every concept in its 45-minute session', { skip: existsSync(overview) ? false : `NOT GENERATED: ${overview}` }, () => {
  const html = readFileSync(overview, 'utf8');
  assert.match(html, /s3-overview/, 'Section overview is stale');
  assertUniqueIds(html, 'Section 3 overview');
  assert.equal([...html.matchAll(/Session \d+ · 45 minutes/g)].length, section3Sessions.length);
  for (const { group, lesson } of groups) assert.ok(html.includes(`href="../${lesson.route}/#${group.id}"`), `Overview omits ${group.id}`);
});
