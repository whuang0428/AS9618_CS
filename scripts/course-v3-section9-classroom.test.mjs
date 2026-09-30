import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section9Journey, section9Sessions, section9PaperObjectives, section9PaperCoverageNotes } from './course-v3-section9-journey.mjs';
import { section9GroupObjectives, section9PapersForLesson, renderSection9Classroom, renderSection9Overview } from './course-v3-section9-classroom.mjs';
import { labMarkup } from './course-v3-section9-labs.mjs';
import { renderPastPaperQuestions } from './course-v3-past-paper-render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const baseLessons = courseV3Lessons.filter(lesson => lesson.section === 9).sort((a, b) => a.sequenceIndex - b.sequenceIndex);
const descriptions = new Map(baseLessons.flatMap(lesson => lesson.objectives));
const pool = courseV3Lessons.flatMap(lesson => lesson.pastPaperQuestions ?? []);
const lessons = baseLessons.map(lesson => ({
  ...lesson,
  objectives: [...new Map([...lesson.objectives, ...section9Journey[lesson.sequenceIndex].groups.flatMap(group => group.objectiveIds).map(id => [id, descriptions.get(id)])])],
  pastPaperQuestions: section9PapersForLesson(lesson, pool)
}));
const groups = lessons.flatMap(lesson => section9Journey[lesson.sequenceIndex].groups);
const order = section9Sessions.flatMap(session => session.groups);
const orderedGroups = order.map(id => groups.find(group => group.id === id));
const sorted = values => [...values].sort();
const unique = values => [...new Set(values)];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const ids = (requirement, ...numbers) => numbers.map(number => `S9.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);
const requiredObjectives = [4, 2, 1, 1, 1, 1, 3, 1, 1].flatMap((count, index) => ids(index + 1, ...Array.from({ length: count }, (_, i) => i + 1)));
const expectedGroups = Array.from({ length: 20 }, (_, i) => `s9-u${String(i + 1).padStart(2, '0')}`);
const expectedPaperObjectives = {
  E067: ids(1, 1, 3), E068: ids(2, 1, 2), E069: ids(4, 1), E070: ids(6, 1),
  E071: ids(7, 1, 3), E072: ids(8, 1), E073: ids(9, 1), E074: ids(8, 1), E086: [...ids(5, 1), ...ids(6, 1)]
};
const sources = Object.keys(expectedPaperObjectives).map(id => pool.find(question => question.id === id));
const helpers = {
  renderPastPaperQuestions,
  renderPractice: question => `<article class="practice-question" id="${question.id.toLowerCase()}" data-question-id="${question.id}"><details><summary>Teacher-written answer</summary><p>Model reasoning</p></details></article>`
};
const rendered = lesson => renderSection9Classroom(lesson, helpers);
function fragment(html, lesson, group) {
  const local = section9Journey[lesson.sequenceIndex].groups;
  const next = local[local.indexOf(group) + 1];
  const start = html.indexOf(`id="${group.id}"`);
  const end = next ? html.indexOf(`id="${next.id}"`, start + 1) : html.indexOf('<nav class="s5-navigation"', start);
  assert.ok(start >= 0 && end > start, group.id);
  return html.slice(start, end);
}
const owner = id => lessons.find(lesson => section9Journey[lesson.sequenceIndex].groups.some(group => group.id === id));
const linkFor = (id, phase) => `../${owner(id).route}/#${id}--${phase}`;

test('the nine stable routes cover 15 required objectives, 20 concepts and all 24 previous units', () => {
  assert.deepEqual(lessons.map(lesson => lesson.sequenceIndex), [49, 50, 51, 52, 53, 54, 55, 56, 57]);
  assert.equal(requiredObjectives.length, 15);
  assert.deepEqual(sorted(unique(groups.flatMap(group => group.objectiveIds))), sorted(requiredObjectives));
  assert.deepEqual(sorted(groups.map(group => group.id)), sorted(expectedGroups));
  assert.equal(baseLessons.reduce((sum, lesson) => sum + lesson.units.length, 0), 24);
  for (const lesson of lessons) {
    const local = section9Journey[lesson.sequenceIndex].groups;
    assert.deepEqual(sorted(unique(local.flatMap(group => group.unitKeys))), sorted(lesson.units.map(unit => unit.unitKey)), lesson.route);
    for (const group of local) assert.ok(section9GroupObjectives(group, lesson).length);
  }
});

test('20 flexible sessions teach each concept once in dependency order', () => {
  assert.deepEqual(order, expectedGroups);
  assert.equal(section9Sessions.length, 20);
  const taught = new Set();
  for (const session of section9Sessions) {
    assert.equal(session.minutes, 45);
    assert.ok(session.title.trim() && session.focus.trim());
    for (const id of session.prerequisiteGroups ?? []) assert.ok(taught.has(id), `${session.id}: prerequisite ${id} has not been taught`);
    session.groups.forEach(id => taught.add(id));
  }
});

test('nine authentic question groups use reviewed exact mappings without claiming the missing conversions', () => {
  assert.deepEqual(section9PaperObjectives, expectedPaperObjectives);
  assert.deepEqual(sorted(groups.flatMap(group => group.papers)), sorted(Object.keys(expectedPaperObjectives)));
  assert.equal(sources.length, 9);
  assert.equal(sources.reduce((sum, q) => sum + q.marks, 0), 36);
  assert.equal(sources.reduce((sum, q) => sum + q.parts.length, 0), 11);
  const taught = new Set();
  for (const group of orderedGroups) {
    group.objectiveIds.forEach(id => taught.add(id));
    for (const id of group.papers) {
      assert.ok(section9PaperCoverageNotes[id]?.trim(), `${id}: missing coverage limit`);
      for (const objective of section9PaperObjectives[id]) assert.ok(taught.has(objective), `${id} precedes ${objective}`);
    }
  }
  assert.ok(!section9PaperObjectives.E067.includes('S9.01.A04'), 'choosing fields is not a complete abstract-model task');
  assert.ok(!section9PaperObjectives.E071.includes('S9.07.A02'), 'drawing a flowchart is not writing pseudocode');
  for (const lesson of lessons) for (const question of lesson.pastPaperQuestions) assert.deepEqual(question.objectiveIds, expectedPaperObjectives[question.id]);
});

test('every opening has concrete material and never reveals later pseudocode as its visual', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section9Journey[lesson.sequenceIndex].groups) {
      assert.ok(group.stimulus.title.trim() && group.stimulus.items.length);
      assert.ok(group.steps.length >= 4 && group.worked.steps.length >= 3, group.id);
      assert.ok(group.check.prompt.trim() && group.check.answer.trim());
      const part = fragment(html, lesson, group);
      const opening = part.slice(part.indexOf(`id="${group.id}--observe"`), part.indexOf(`id="${group.id}--prepare"`));
      assert.match(opening, /class="s9-stimulus"/);
      assert.doesNotMatch(opening, /<pre\b|class="s5-starting-example"/);
      for (const step of [...group.steps, ...group.worked.steps]) {
        assert.ok(step.title?.trim() && step.body?.trim(), `${group.id}: incomplete teaching step`);
        if (step.table) for (const row of step.table.rows) assert.equal(row.length, step.table.headers.length, group.id);
      }
    }
  }
});

test('navigation follows the global learning route even when the next concept lives on another page', () => {
  let crossPage = 0;
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section9Journey[lesson.sequenceIndex].groups) {
      const index = order.indexOf(group.id);
      const part = fragment(html, lesson, group);
      assert.ok(part.includes(`data-s9-order="${index + 1}" data-s9-total="20"`));
      assert.ok(part.includes(`data-s9-prev="${index ? linkFor(order[index - 1], 'recap') : ''}"`));
      assert.ok(part.includes(`data-s9-next="${index < order.length - 1 ? linkFor(order[index + 1], 'observe') : ''}"`));
      if (index < order.length - 1 && owner(order[index + 1]).route !== lesson.route) crossPage += 1;
    }
  }
  assert.ok(crossPage >= 8, 'the learning route must support cross-page boundaries');
  const overview = renderSection9Overview(lessons);
  for (const id of order) assert.ok(overview.includes(`href="${linkFor(id, 'observe')}"`), id);
});

test('all 28 original practice questions remain reachable while core checks and challenges start folded', () => {
  let count = 0;
  for (const lesson of lessons) {
    const html = rendered(lesson);
    const practice = [...lesson.practice, ...(lesson.optionalPractice ?? [])];
    count += practice.length;
    const start = html.indexOf('<details class="s5-reference" id="practice"');
    const end = html.indexOf('<details class="s5-reference" id="summary"', start);
    const part = html.slice(start, end);
    for (const question of practice) assert.ok(part.includes(`data-question-id="${question.id}"`), question.id);
    assert.doesNotMatch(html, /<details\b[^>]*\sopen(?:[\s=>])/i, `${lesson.route}: answer starts visible`);
    for (const group of section9Journey[lesson.sequenceIndex].groups) {
      const part = fragment(html, lesson, group);
      assert.ok(part.includes('Try it yourself · Teacher-written'));
      if (group.challenge) assert.match(part, /<details class="s9-challenge">/);
      if (/\n/.test(group.check.answer) && /\bDECLARE\b/.test(group.check.answer)) assert.match(part, /aria-label="One valid pseudocode answer"/);

    }
  }
  assert.equal(count, 28);
});

test('conversion checks provide their visible source image and code before the folded answer', () => {
  const group = groups.find(item => item.id === 's9-u14');
  assert.ok(group.check.image?.asset && group.check.code);
  const part = fragment(rendered(owner(group.id)), owner(group.id), group);
  const check = part.slice(part.indexOf(`id="${group.id}--check"`));
  const answerAt = check.indexOf('<details class="s5-answer">');
  assert.ok(check.indexOf(`src="../..${group.check.image.asset}"`) < answerAt);
  assert.ok(check.indexOf('aria-label="Pseudocode for this check"') < answerAt);
  assert.ok(check.includes(`<p class="s9-source-label">${group.check.codeLabel}</p>`));
  assert.equal((check.match(/class="s9-check-task"/g) ?? []).length, group.check.prompt.split(/\n\s*\n/).length - 1);
});

function controllerHarness(groupList = [], initialUrl = 'http://localhost/course-v3/lesson-057/', bookmarks = {}) {
  const callbacks = {};
  const microtasks = [];
  const frames = [];
  const historyCalls = [];
  const navigations = [];
  const transitions = [];
  const parsed = new URL(initialUrl);
  const location = { href: parsed.href, hash: parsed.hash, origin: parsed.origin, pathname: parsed.pathname, assign: href => navigations.push(href) };
  const classroomRoot = {
    dataset: { mode: 'classroom' },
    classList: { contains: () => false },
    querySelectorAll: selector => selector === '[data-s9-group]' ? groupList : [],
    querySelector: selector => selector === '[data-s5-mode="classroom"]' ? { click() { transitions.push('classroom'); classroomRoot.dataset.mode = 'classroom'; } } : null,
    addEventListener: (type, handler) => { (callbacks[type] ??= []).push(handler); }
  };
  const document = { querySelector: () => classroomRoot, getElementById: id => bookmarks[id] ?? null, addEventListener() {} };
  const windowCallbacks = {};
  const window = { scrollY: 320, innerHeight: 768, addEventListener: (type, handler) => { (windowCallbacks[type] ??= []).push(handler); }, dispatchEvent: event => { transitions.push(event.type); (windowCallbacks[event.type] ?? []).forEach(handler => handler(event)); } };
  runInNewContext(readFileSync(join(root, 'scripts/course-v3-section9-classroom.js'), 'utf8'), {
    document, window, location, URL,
    history: { replaceState: (...args) => { historyCalls.push(args); const url = new URL(args[2], location.href); location.href = url.href; location.hash = url.hash; } },
    MutationObserver: class { observe() {} },
    CustomEvent: class { constructor(type) { this.type = type; } },
    HashChangeEvent: class { constructor(type) { this.type = type; } },
    queueMicrotask: callback => microtasks.push(callback),
    requestAnimationFrame: callback => frames.push(callback)
  });
  const flush = () => { while (microtasks.length) microtasks.shift()(); while (frames.length) frames.shift()(); };
  return { root: classroomRoot, window, callbacks, flush, historyCalls, navigations, transitions };
}

test('loading a page without a hash does not call element methods on an empty string', () => {
  const harness = controllerHarness();
  assert.doesNotThrow(harness.flush);
});

test('switching to full reading retains the current later concept and exact worked step after expansion', () => {
  const scrolls = [];
  const step = { id: 's9-u19--worked-3', hidden: false, scrollIntoView: options => scrolls.push(options) };
  const phase = { hidden: false, querySelectorAll: () => [{ hidden: true }, { hidden: true }, step] };
  const later = { hidden: false, querySelectorAll: () => [phase] };
  const earlier = { hidden: true, querySelectorAll: () => [] };
  const harness = controllerHarness([earlier, later]);
  harness.flush();
  const target = { closest: selector => selector === '[data-s5-mode="reading"]' ? target : null };
  harness.callbacks.click[0]({ target, button: 0 });
  assert.equal(scrolls.length, 0, 'position restoration must wait for the shared controller');
  harness.root.dataset.mode = 'reading';
  earlier.hidden = false;
  harness.flush();
  assert.equal(scrolls.length, 1);
  assert.equal(scrolls[0].behavior, 'instant');
  assert.ok(harness.historyCalls.at(-1)[2].endsWith('#s9-u19--worked-3'));
});

test('reading mode preserves an open single-practice bookmark through expansion', () => {
  const scrolls = [];
  const reference = { open: true };
  const target = { id: 's9-practice-example', parentElement: reference, closest: () => reference, scrollIntoView: options => scrolls.push(options) };
  const phase = { hidden: false, querySelectorAll: () => [] };
  const group = { hidden: false, querySelectorAll: () => [phase], dispatchEvent() {} };
  const harness = controllerHarness([group], 'http://localhost/course-v3/lesson-057/?view=reading#s9-practice-example', { 's9-practice-example': target });
  harness.flush();
  scrolls.length = 0;
  const button = { closest: selector => selector === '[data-s5-mode="reading"]' ? button : null };
  harness.callbacks.click[0]({ target: button, button: 0 });
  harness.root.dataset.mode = 'reading';
  reference.open = false;
  harness.flush();
  assert.equal(reference.open, true);
  assert.equal(scrolls.length, 1);
  assert.ok(harness.historyCalls.at(-1)[2].endsWith('?view=reading#s9-practice-example'));
});

test('cross-page concept links preserve full reading mode and the destination stage', () => {
  const harness = controllerHarness();
  harness.flush();
  harness.root.dataset.mode = 'reading';
  const link = { href: 'http://localhost/course-v3/lesson-053/#s9-u06--observe', closest: selector => selector === 'a[href]' ? link : null };
  let prevented = false;
  harness.callbacks.click[0]({ target: link, button: 0, preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
  assert.deepEqual(harness.navigations, ['http://localhost/course-v3/lesson-053/?view=reading#s9-u06--observe']);
});

test('Teach retains Connect when focusing the sticky control scrolls the prior Check into view', () => {
  const previous = { hidden: true, getBoundingClientRect: () => ({ top: -400, bottom: 165 }) };
  const phase = { id: 's9-u19--recap', hidden: false, querySelectorAll: () => [], scrollIntoView() {}, closest: selector => selector === '[data-s5-group]' ? group : null, getBoundingClientRect: () => ({ top: 415, bottom: 844, height: 429 }) };
  const group = { hidden: false, querySelectorAll: () => [previous, phase] };
  const harness = controllerHarness([group], 'http://localhost/course-v3/lesson-057/#s9-u19--recap', { 's9-u19--recap': phase });
  harness.flush();
  const readingButton = { closest: selector => selector === '[data-s5-mode="reading"]' ? readingButton : null };
  harness.callbacks.click[0]({ target: readingButton, button: 0 });
  harness.root.dataset.mode = 'reading';
  previous.hidden = false;
  harness.flush();
  // Browser-observed focus movement was 329px while the original phase remained visible.
  harness.window.scrollY -= 329;
  const resumeButton = { closest: selector => selector.includes('[data-s5-resume]') ? resumeButton : null };
  let intercepted = false;
  harness.callbacks.click[0]({ target: resumeButton, button: 0, preventDefault() {}, stopImmediatePropagation() { intercepted = true; } });
  assert.equal(intercepted, true);
  assert.ok(harness.historyCalls.at(-1)[2].endsWith('#s9-u19--recap'));
  assert.deepEqual(harness.transitions, ['hashchange', 'classroom']);
  assert.equal(harness.root.dataset.mode, 'classroom');
});

test('old unit, question and reference bookmarks are unique and retained', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    const identifiers = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(identifiers).size, identifiers.length, `${lesson.route}: duplicate HTML id`);
    for (const [index, unit] of lesson.units.entries()) {
      const first = section9Journey[lesson.sequenceIndex].groups.find(group => group.unitKeys.includes(unit.unitKey));
      assert.ok(fragment(html, lesson, first).includes(`id="unit-${index + 1}"`), `${lesson.route}#unit-${index + 1}`);
    }
    for (const id of ['visual-and-core', 'past-paper-questions', 'original-exam-style-question', 'practice', 'summary', 'lesson-contents']) assert.ok(identifiers.includes(id), `${lesson.route}#${id}`);
    for (const question of lesson.pastPaperQuestions) assert.ok(identifiers.includes(question.id.toLowerCase()), question.id);
  }
});

test('original questions follow explanation and checks and keep hint, reasoning and official MS separate', () => {
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section9Journey[lesson.sequenceIndex].groups) {
      const part = fragment(html, lesson, group);
      for (const id of group.papers) {
        const start = part.indexOf(`data-question-id="${id}"`);
        assert.ok(start > part.indexOf(`id="${group.id}--check"`));
        const paper = part.slice(start, part.indexOf('</article>', start));
        for (const role of ['original-question', 'reading', 'solution', 'mark-scheme']) assert.ok(paper.includes(`data-exam-role="${role}"`), `${id}: ${role}`);
        const source = sources.find(question => question.id === id);
        for (const extract of [...source.qp.extracts, ...source.ms.extracts]) assert.ok(part.includes(`src="../..${extract.asset}"`), extract.asset);
      }
    }
  }
});

test('activities receive their variants and provide initially hidden results and local reset controls', () => {
  const expected = ['abstraction', 'trace', 'conditions', 'loops', 'representations', 'modules', 'refinement', 'ticket'];
  assert.deepEqual(sorted(Object.keys(labMarkup)), sorted(expected));
  assert.deepEqual(sorted(unique(groups.map(group => group.lab).filter(Boolean))), sorted(expected));
  for (const lesson of lessons) {
    const html = rendered(lesson);
    for (const group of section9Journey[lesson.sequenceIndex].groups.filter(group => group.lab)) {
      const part = fragment(html, lesson, group);
      assert.ok(group.experimentPrompt.trim());
      assert.ok(part.includes(`data-s9-lab="${group.lab}"`));
      if (group.labConfig?.variant) assert.ok(part.includes(`data-variant="${group.labConfig.variant}"`));
      assert.match(part, /data-s9-action="reset"/);
      assert.match(part, /data-s9-role="output"[^>]*\bhidden\b|\bhidden\b[^>]*data-s9-role="output"/);
    }
  }
});

test('all nine authentic QP and MS sources retain reviewed image bytes, dimensions and marks', () => {
  for (const question of sources) {
    assert.equal(question.parts.reduce((sum, part) => sum + part.marks, 0), question.marks, question.id);
    assert.equal(question.extractReview.status, 'verified', question.id);
    for (const kind of ['qp', 'ms']) {
      const source = question[kind];
      assert.ok(source.filename.endsWith('.pdf') && /^[a-f0-9]{64}$/.test(source.sha256) && source.extracts.length, `${question.id}: ${kind}`);
      for (const extract of source.extracts) {
        const bytes = readFileSync(join(root, 'web', extract.asset));
        assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', extract.asset);
        assert.equal(digest(bytes), extract.sha256, extract.asset);
        assert.equal(bytes.readUInt32BE(16), extract.width, extract.asset);
        assert.equal(bytes.readUInt32BE(20), extract.height, extract.asset);
      }
    }
  }
});

test('local original PDFs match registered identities when the teaching archive is available', async t => {
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
