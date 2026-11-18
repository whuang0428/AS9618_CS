import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section4Journey, section4Route, section4PaperObjectives, section4PaperCoverageNotes } from './course-v3-section4-journey.mjs';
import { section4PapersForLesson } from './course-v3-section4-classroom.mjs';
import { section4ExtraPapers } from './course-v3-section4-extra-papers.mjs';
import { imageDimensions } from './image-dimensions.mjs';
import models from './course-v3-section4-models.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessons = courseV3Lessons.filter(lesson => lesson.section === 4);
const pool = lessons.flatMap(lesson => lesson.pastPaperQuestions);
const papers = lessons.flatMap(lesson => section4PapersForLesson(lesson, pool));
const materials = new Map(Object.values(section4Journey).flatMap(page => page.groups.map(group => [group.number, group.materials])));
const sorted = items => [...items].sort();
const unique = items => [...new Set(items)];
const sha = value => createHash('sha256').update(value).digest('hex');
const json = path => JSON.parse(readFileSync(join(root, path), 'utf8'));
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const ids = (requirement, ...numbers) => numbers.map(n => `S4.${String(requirement).padStart(2, '0')}.A${String(n).padStart(2, '0')}`);
const expectedObjectives = [1, 8, 1, 1, 5, 4, 2, 6, 1, 2, 1, 5, 6, 2, 16].flatMap((count, index) => ids(index + 1, ...Array.from({ length: count }, (_, n) => n + 1)));
const expectedPapers = {
  E4C01: [...ids(2, 2, 3), ...ids(3, 1), ...ids(4, 1)],
  E4C02: ids(2, 1),
  E4C03: ids(5, 2),
  E4C04: ids(5, 3),
  E4C05: ids(6, 1, 2),
  E4C06: ids(6, 1, 3),
  E4C07: ids(8, 2),
  E4C08: ids(8, 4, 6),
  E029: ids(2, 2, 3, 4, 6),
  E030: ids(6, 1, 3, 4),
  E031: ids(5, 4, 5),
  E032: ids(7, 2),
  E033: [...ids(2, 3, 4), ...ids(7, 1, 2)],
  E034: ids(8, 4, 5, 6),
  E035: ids(10, 1),
  E036: [...ids(11, 1), ...ids(13, 1, 2, 3, 4, 5, 6), ...ids(14, 1, 2)],
  E037: ids(15, 5, 7, 10, 11),
  E038: ids(15, 5, 6, 7),
  E4D01: [...ids(13, 1, 5), ...ids(14, 1, 2)],
  E4D02: ids(15, 1, 3, 4),
  E4D03: ids(15, 1, 3, 4, 13),
};

test('paper crops preserve verified sources, crop geometry, image hashes and dimensions', () => {
  const manifest = json('scripts/past-paper-source-manifest.json');
  const crops = json('scripts/past-paper-extracts.json');
  const approved = json('docs/practice-past-paper-review-20260915/selection-registry.json');
  for (const paper of papers) {
    const source = manifest.questions.find(q => q.id === paper.id) ?? section4ExtraPapers.find(q => q.id === paper.id);
    assert.ok(source, paper.id);
    assert.equal(paper.sourceType, 'past-paper');
    assert.equal(paper.extractReview.status, 'verified');
    const selection = approved.find(q => q.id === paper.id);
    if (selection) for (const key of ['syllabusCode', 'year', 'series', 'component', 'parts', 'marks', 'syllabusMapping']) assert.deepEqual(paper[key], selection[key], `${paper.id}: original ${key} changed`);
    const geometry = crops[paper.id]
      ? Object.fromEntries(['insert', 'ms', 'qp'].filter(key => key in crops[paper.id]).map(key => [key, crops[paper.id][key]]))
      : paper.cropSpec;
    assert.equal(sha(JSON.stringify(geometry)), paper.extractReview.cropSpecSha256, `${paper.id}: crop changed`);
    for (const kind of ['qp', 'ms']) {
      assert.deepEqual(paper[kind], source[kind]);
      assert.match(paper[kind].sha256, /^[a-f0-9]{64}$/);
      for (const image of paper[kind].extracts) {
        const path = join(root, 'web', image.asset);
        assert.equal(sha(readFileSync(path)), image.sha256, `${paper.id}: ${image.asset} changed`);
        assert.deepEqual(imageDimensions(path), { width: image.width, height: image.height });
      }
    }
  }
});

const sources = new Map();
const sourceRoot = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
for (const paper of papers) for (const kind of ['qp', 'ms']) {
  const source = paper[kind];
  const folder = `${paper.year}-${paper.series === 'Oct/Nov' ? 'Oct-Nov' : 'May-June'}`;
  const path = join(sourceRoot, source.sourcePdf ?? join(folder, source.filename));
  if (sources.has(path)) assert.equal(sources.get(path), source.sha256);
  sources.set(path, source.sha256);
}
for (const [path, hash] of sources) test(`local original PDF matches registered hash: ${path.split('/').at(-1)}`, { skip: existsSync(path) ? false : 'Teacher-owned PDF unavailable locally; source hash not reverified.' }, () => assert.equal(sha(readFileSync(path)), hash));


const range = (start, end, prefix) => Array.from({ length: end - start + 1 }, (_, i) => prefix + (start + i));
const sectionNumbers = {
  21: range(1, 5, '4.1.'), 22: range(6, 13, '4.1.'), 23: ['4.1.14'],
  24: range(15, 17, '4.1.'), 25: ['4.2.1', '4.2.2'], 26: ['4.2.3', '4.2.4'], 27: range(1, 4, '4.3.'),
};
const boundaries = {
  '4.1.5': ['checkpoint-architecture', 'E029', 'E4C01', 'E4C02'],
  '4.1.9': ['checkpoint-performance', 'E031', 'E4C03', 'E4C04'],
  '4.1.13': ['checkpoint-ports', 'E030', 'E4C05', 'E4C06'],
  '4.1.14': ['fde-review', 'E032', 'E033'],
  '4.1.17': ['checkpoint-interrupts', 'E4C07', 'E4C08', 'E034'],
  '4.2.4': ['checkpoint-assembly', 'E035', 'E4D01', 'E036'],
  '4.3.4': ['checkpoint-bits', 'E4D02', 'E037', 'E038'],
};
const oldConcepts = {
  21: ['memory-addresses', 'stored-instructions', 'cpu-team', 'register-jobs'],
  22: ['bus-transactions', 'bus-capacity', 'cache-reuse', 'performance-conditions', 'peripheral-ports'],
  23: ['fetch-an-instruction', 'execute-the-calculation'],
  24: ['interrupt-events', 'save-service-return'],
  25: ['readable-instructions', 'label-addresses', 'two-assembler-passes'],
  26: ['immediate-direct', 'indirect-indexed', 'relative-and-movement', 'arithmetic-characters', 'compare-and-branch', 'complete-loop-trace', 'instruction-families'],
  27: ['logical-shifts', 'signed-cyclic-shifts', 'bitwise-operands', 'test-and-control'],
};

test('the 25 numbered sections form the teaching route and cover all 61 course objectives', () => {
  assert.deepEqual(lessons.map(l => l.sequenceIndex), [21, 22, 23, 24, 25, 26, 27]);
  assert.deepEqual(sorted(unique(lessons.flatMap(l => l.objectives.map(([id]) => id)))), sorted(expectedObjectives));
  const covered = [];
  for (const { sequenceIndex: page } of lessons) {
    const groups = section4Journey[page].groups;
    assert.deepEqual(groups.map(g => g.number), sectionNumbers[page]);
    for (const group of groups) {
      assert.ok(group.materials.length, group.number);
      assert.ok(group.objectiveIds.length, group.number);
      covered.push(...group.objectiveIds);
    }
    const route = section4Route(page);
    const actual = route.map(item => item.id);
    const expected = sectionNumbers[page].flatMap(number => boundaries[number] ? [number, boundaries[number][0]] : [number]);
    assert.deepEqual(actual, expected);
    for (const number of sectionNumbers[page].filter(n => boundaries[n])) {
      const [id, ...expectedIds] = boundaries[number];
      assert.deepEqual(route.find(item => item.id === id).papers, expectedIds, number);
    }
  }
  assert.deepEqual(sorted(unique(covered)), sorted(expectedObjectives));
});

test('the six three-part checkpoints and three additional parts have precise exam mappings', () => {
  assert.deepEqual(sorted(papers.map(p => p.id)), sorted(Object.keys(expectedPapers)));
  assert.deepEqual(section4PaperObjectives, expectedPapers);
  for (const paper of papers) {
    assert.deepEqual(paper.objectiveIds, expectedPapers[paper.id], paper.id);
    assert.equal(paper.parts.reduce((sum, part) => sum + part.marks, 0), paper.marks, paper.id);
    assert.ok(section4PaperCoverageNotes[paper.id]?.trim(), paper.id);
  }
});

function materialOfType(number, type) {
  return materials.get(number).filter(m => m.type === type);
}
function assertTerms(value, terms) {
  for (const term of terms) assert.match(value, term);
}

test('architecture, performance analogies and port diagrams cover the specified distinctions', () => {
  const opening = materials.get('4.1.1');
  assert.deepEqual(opening.map(m => m.type), ['diagram', 'figure']);
  assert.match(opening[1].title, /ENIAC/);
  assert.ok(opening[1].sources.some(s => /archives|docsteach|upenn/.test(s.url)));
  const comparison = materials.get('4.1.2').filter(material => !material.cardId);
  assert.deepEqual(comparison.map(m => m.type), ['table', 'diagram']);
  assert.match(comparison[1].body, /instructions and the data they use share the same main memory/);
  assert.ok(comparison[1].sources.some(source => source.url.endsWith('9618_w22_ms_11.pdf#page=6')));
  const drawing = comparison[1].svg;
  const memory = drawing.split('<g role="group" aria-label="Main memory">');
  assert.equal(memory.length, 2, 'The diagram must show a single main memory');
  const rows = [...memory[1].split('</g></g>')[0].matchAll(/<g aria-label="Address (\d+)">([\s\S]*?)(?=<\/g>|$)/g)];
  assert.deepEqual(rows.map(([, address]) => address), ['0', '1', '2', '3', '4', '5', '6']);
  for (const [, address, row] of rows) {
    const word = models.programMemory()[address];
    const cells = [...row.matchAll(/<text\b[^>]*>([^<]+)<\/text>/g)].map(match => match[1]);
    assert.deepEqual(cells, [address, String(word), typeof word === 'string' ? 'Instruction' : 'Data']);
  }
  assertTerms(drawing, [/>1\. Fetch the instruction</, />Address 1 supplies ADD 5\.</, />2\. Read the data</, />Address 5 supplies 24\.</]);
  assertTerms(comparison[1].body, [/18 \+ 24 = 42/, /SUB 5/, /18 − 24 = −6/, /STO 6/]);
  assert.ok(materialOfType('4.1.3', 'table').length);
  const [registers, flow] = materials.get('4.1.4');
  assert.deepEqual(registers.rows.map(row => row[0].match(/\((\w+)\)/)[1]), ['PC', 'MDR', 'MAR', 'ACC', 'IX', 'CIR', 'SR']);
  assert.ok(registers.headers.length >= 3);
  assert.equal(flow.lab, 'registerFlow');
  assert.ok(materialOfType('4.1.5', 'lab').some(m => m.lab === 'busCycle'));
  for (const [number, count] of Object.entries({ '4.1.6': 2, '4.1.7': 1, '4.1.8': 1, '4.1.9': 1 })) {
    assert.equal(materialOfType(number, 'diagram').length, count, number);
  }
  const description = number => materials.get(number).map(m => [m.body, m.caption, m.code, m.rows?.flat().join(' ')].filter(Boolean).join(' ')).join(' ');
  const cores = materialOfType('4.1.6', 'diagram')[1];
  assertTerms(cores.svg, [/20 \+ \(80 ÷ 2\) \+ 4 = 64/, /100 ÷ 64 ≈ 1\.56×/]);
  assertTerms(description('4.1.6'), [/communicat/i, /100 ÷ 64 ≈ 1\.56×/]);
  const bus = materialOfType('4.1.7', 'diagram')[0];
  assertTerms(bus.svg, [/256 ÷ 32 = 8 transfers/, /256 ÷ 64 = 4 transfers/]);
  assertTerms(description('4.1.7'), [/256 ÷ 32 = 8/, /256 ÷ 64 = 4/]);
  assertTerms(description('4.1.7'), [/65 bits/, /three transfers/, /256 addresses/]);
  assertTerms(description('4.1.8'), [/6 ns at 1 GHz/, /3 ns at 2 GHz/]);
  assert.match(description('4.1.9'), /miss, hit, miss, hit/i);
  const sockets = ['4.1.10', '4.1.11', '4.1.12'].map(number => materials.get(number)[0]);
  const plug = sockets[1].companion;
  assert.match(plug.title, /HDMI.*plug/);
  for (const photo of [...sockets, plug]) {
    assert.equal(photo.type, 'figure');
    assert.match(photo.asset, /\.jpg$/);
    assert.ok(photo.sources.some(s => s.url.startsWith('https://commons.wikimedia.org/wiki/File:')), photo.title);
    const path = join(root, 'web', photo.asset);
    assert.equal(readFileSync(path).readUInt16BE(), 0xffd8, photo.asset);
    assert.ok(imageDimensions(path).width >= 1000, photo.asset);
  }
  for (const number of ['4.1.10', '4.1.11', '4.1.12']) {
    assert.equal(materialOfType(number, 'diagram').length, 0, number);
    const tables = materialOfType(number, 'table');
    assert.ok(tables.length >= 2, number);
    assert.ok(tables.some(m => m.sources?.length && m.rows.some(row => /(?:19|20)\d\d/.test(row[0]))), number);
  }
  const comparisonTable = materialOfType('4.1.13', 'table')[0];
  assert.deepEqual(comparisonTable.headers.slice(1), ['USB', 'HDMI', 'VGA']);
  assert.deepEqual(comparisonTable.socketPhotos.map(p => p.asset), sockets.map(p => p.asset));
});

test('FDE notation and interrupt examples expose the instruction boundary and the return state', () => {
  const [cycle, rtn] = materials.get('4.1.14');
  assert.equal(cycle.lab, 'fetch');
  assert.deepEqual(rtn.rows.map(row => row[0]), ['MAR ← [PC]', 'PC ← [PC] + 1', 'MDR ← [[MAR]]', 'CIR ← [MDR]']);
  assert.match(rtn.body, /9618\/13.*2025.*2\(a\)\(ii\)/);
  assert.ok(rtn.sources.some(s => s.url.endsWith('9618_s25_ms_13.pdf#page=5')));
  const mixed = materialOfType('4.1.15', 'diagram')[0];
  assertTerms(mixed.svg, [/Hardware/i, /Software/i]);
  assert.deepEqual(materialOfType('4.1.16', 'lab').map(m => m.config.event), ['keyboard', 'io', 'timer']);
  const service = materialOfType('4.1.17', 'lab')[0];
  assert.equal(service.config.arrival, 'during');
  const handling = materialOfType('4.1.17', 'table')[0].rows.flat().join(' ');
  assertTerms(handling, [/pending/i, /stack/i, /ISR/i, /restor/i, /PC = 2/, /ACC = 42/]);
});

test('assembly modes, official instruction groups and bit manipulation have worked examples', () => {
  assert.equal(materialOfType('4.2.1', 'diagram').length, 3);
  assert.deepEqual(materialOfType('4.2.2', 'lab').map(m => m.lab), ['assemblyStages', 'assembler']);
  const instructionSet = materialOfType('4.2.3', 'table')[0];
  assert.ok(instructionSet.sources.some(s => /cambridgeinternational\.org\/.*syllabus\.pdf/.test(s.url)));
  assert.deepEqual(unique(instructionSet.rows.map(row => row[0])).slice(0, 5), [
    'Data movement', 'Input and output of data', 'Arithmetic operations', 'Unconditional and conditional instructions', 'Compare instructions',
  ]);
  const forms = instructionSet.rows.map(row => row[1]).join(' ');
  for (const op of 'LDM LDD LDI LDX LDR MOV STO IN OUT ADD SUB INC DEC JMP JPE JPN CMP CMI END'.split(' ')) {
    assert.match(forms, new RegExp('\\b' + op + '\\b'), op);
  }
  const addressing = materialOfType('4.2.4', 'diagram');
  assert.deepEqual(addressing.map(m => m.title.split(' ')[0]), ['Immediate', 'Direct', 'Indirect', 'Indexed', 'Relative']);
  const evidence = [[/LDM #18/], [/LDD 300/, /18/], [/LDI 310/, /300/, /18/], [/LDX 298/, /IX = 2/, /300/], [/100/, /\+3/, /103/, /203/]];
  addressing.forEach((m, i) => assertTerms(m.caption, evidence[i]));
  const trace = materialOfType('4.2.4', 'table')[0].rows;
  assert.deepEqual(trace.map(row => parseInt(row[0], 10)), [180, 181, 182, 183, 184, 185, 187, 188]);
  assert.equal(trace.at(-1).at(-1), 'B');
  const shifts = materialOfType('4.3.2', 'table')[0].rows;
  const rules = [x => x << 1 & 255, x => x >>> 1, x => x << 1 & 255, x => (x & 128) | (x >>> 1), x => ((x << 1) | (x >>> 7)) & 255, x => (x >>> 1) | ((x & 1) << 7)];
  assert.equal(shifts.length, rules.length);
  shifts.forEach(([name, value, result], i) => assert.equal(parseInt(result.slice(0, 8), 2), rules[i](parseInt(value.slice(0, 8), 2)), name));
  const masks = materialOfType('4.3.3', 'table')[0].rows;
  assert.deepEqual(masks.map(([goal, operation]) => [goal, operation]), [
    ['Test bit 4', 'AND B00010000'], ['Set bit 2', 'OR B00000100'],
    ['Clear bit 2', 'AND B11111011'], ['Toggle bit 2', 'XOR B00000100'],
  ]);
  assert.equal(materialOfType('4.3.4', 'lab')[0].lab, 'deviceControl');
  assert.equal(materialOfType('4.3.4', 'text')[0].code, 'LDD 900\nAND B00010000\nCMP #0\nJPE DONE\nLDD 900\nOR B00000100\nSTO 900\nDONE: END');
});

const site = join(root, 'web', 'course-v3');
const overview = readFileSync(join(site, 'section-4', 'index.html'), 'utf8');
const pageHtml = new Map(lessons.map(l => [l.sequenceIndex, readFileSync(join(site, l.route, 'index.html'), 'utf8')]));
function sectionsOf(html, selector) {
  const matches = [...html.matchAll(selector)];
  return new Map(matches.map((match, i) => [match[1], html.slice(match.index, matches[i + 1]?.index ?? html.length)]));
}
function hasContent(html, text, message) {
  assert.ok(html.includes(esc(text)), message ?? String(text).slice(0, 100));
}

test('worked examples include the referenced visual or interactive material on the same step', () => {
  for (const title of ['How much useful work does an instruction do?', 'Why twice as many cores can deliver less than twice the performance']) {
    assert.equal(materials.get('4.1.6').find(material => material.title === title)?.type, 'table', title);
  }
  for (const [number, step] of [['4.1.7', 2], ['4.1.8', 2], ['4.1.9', 2]]) {
    assert.equal(materials.get(number)[step - 1].type, 'table', `${number} step ${step}`);
  }
  const symbols = materials.get('4.2.2')[2].companion;
  assert.deepEqual(symbols.rows.map(([name, addr]) => [name, addr]), [['START','0'], ['FIRST','4'], ['SECOND','5'], ['TOTAL','6']]);
  const relocation = materials.get('4.2.4')[4];
  assertTerms(relocation.svg.replace(/<desc>.*?<\/desc>/, ''), [/100 \+ 3 = 103/, /200 \+ 3 = 203/]);
  const branch = materials.get('4.2.4')[6].companion;
  assert.equal(branch.lab, 'trace');
  assert.equal(branch.config.program, 'branch');
  assert.ok(branch.controls.includes('input'));
  const shift = materials.get('4.3.2')[1].companion;
  assert.equal(shift.lab, 'bits');
  assert.deepEqual(shift.config, { family: 'shifts', value: 64, operation: 'ASL', amount: 1 });
});

test('instruction introductions preserve existing card bookmarks and their teaching targets', () => {
  const expectations = [
    {
      page: 21, number: '4.1.2',
      order: ['instruction', '1', '2', 'operation-and-operand', 'instruction-fields', 'operand-forms', 'instruction-set'],
      originalTitles: [
        'Where does each machine keep the program and its data?',
        'Instructions and data share one main memory',
      ],
    },
    {
      page: 22, number: '4.1.6',
      order: ['cpu-instruction-designs', 'instruction-design-comparison', 'isa-and-implementation', '1', '2', '3', '4'],
      originalTitles: [
        'Two hole punches doing the same job',
        'How much useful work does an instruction do?',
        'Two proofreaders divide four independent pages',
        'Why twice as many cores can deliver less than twice the performance',
      ],
    },
  ];
  for (const { page, number, order, originalTitles } of expectations) {
    const groups = sectionsOf(pageHtml.get(page), /<article class="s4-group(?: s4-boundary)?" id="([^"]+)"[^>]*data-s4-group[^>]*>/g);
    const cards = sectionsOf(groups.get(number), /<section class="s4-phase" id="([^"]+)"[^>]*data-s4-card[^>]*>/g);
    assert.deepEqual([...cards.keys()], order.map(suffix => `${number}--${suffix}`), number);
    originalTitles.forEach((title, index) => {
      const id = `${number}--${index + 1}`;
      const heading = cards.get(id)?.match(/<h3\b[^>]*>([^<]*)<\/h3>/)?.[1];
      assert.equal(heading, esc(title), `${id} must still open its original material`);
    });
    const idsOnPage = [...pageHtml.get(page).matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(unique(idsOnPage).length, idsOnPage.length, `Duplicate HTML id on lesson ${page}`);
  }
});

for (const lesson of lessons) {
  const page = lesson.sequenceIndex;
  test(`published lesson ${page} exposes its reading cards, figures, sources, original questions and bookmarks`, () => {
    const html = pageHtml.get(page);
    assert.match(html, /data-mode="reading"/);
    const idsOnPage = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(unique(idsOnPage).length, idsOnPage.length, 'Duplicate HTML id');
    const groupBody = html.split('<nav class="s4-navigation"')[0];
    const groups = sectionsOf(groupBody, /<article class="s4-group(?: s4-boundary)?" id="([^"]+)"[^>]*data-s4-group[^>]*>/g);
    assert.deepEqual([...groups.keys()], section4Route(page).map(item => item.id));
    for (const id of ['lesson-menu', 'visual-and-core', 'lesson-contents', 'practice', 'summary', 'past-paper-questions', 'original-exam-style-question', ...oldConcepts[page], ...range(1, lesson.units.length, 'unit-')]) {
      assert.ok(idsOnPage.includes(id), `Broken bookmark on ${page}: ${id}`);
    }
    for (const item of section4Route(page)) {
      hasContent(overview, `../${lesson.route}/#${item.id}`);
      const group = groups.get(item.id);
      assert.ok(group.includes('<h2 tabindex="-1">' + esc(item.title) + '</h2>'), item.id);
      const cards = sectionsOf(group, /<section class="s4-phase" id="([^"]+)"[^>]*data-s4-card[^>]*>/g);
      assert.doesNotMatch(group, /<section class="s4-phase"[^>]* hidden/, 'Cards must be visible in the pre-JavaScript reading view');
      if (item.papers) {
        assert.equal(cards.size, item.papers.length + Number(item.kind === 'review'));
        assert.deepEqual([...group.matchAll(/data-question-id="([^"]+)"/g)].map(m => m[1]), item.papers);
        for (const id of item.papers) {
          const paper = papers.find(q => q.id === id);
          for (const kind of ['qp', 'ms']) for (const image of paper[kind].extracts) hasContent(group, image.asset);
          hasContent(group, paper.sourceRef);
        }
        continue;
      }
      assert.equal(cards.size, item.materials.length, item.id);
      const cardIds = [...cards.keys()];
      item.materials.forEach((material, index) => {
        if (material.cardId) assert.equal(cardIds[index], `${item.id}--${material.cardId}`);
      });
      const inCard = item.materials.flatMap((main, index) =>
        [main, main.companion].filter(Boolean).map(material => ({ material, index })));
      inCard.forEach(({ material: m, index }) => {
        const card = cards.get(cardIds[index]);
        assert.ok(card, item.id);
        for (const text of [m.title, m.caption, m.body, m.code].filter(Boolean)) hasContent(card, text);
        for (const citation of m.sources ?? []) {
          assert.equal(new URL(citation.url).protocol, 'https:');
          hasContent(card, citation.label);
          hasContent(card, citation.url);
        }
        if (m.type === 'table') {
          assert.ok(m.rows.length && m.headers.length);
          m.rows.forEach(row => assert.equal(row.length, m.headers.length));
          for (const cell of [...m.headers, ...m.rows.flat()]) hasContent(card, cell);
          for (const photo of m.socketPhotos ?? []) {
            assert.ok(card.includes(`<img class="s4-socket-thumbnail" src="../..${esc(photo.asset)}"`), photo.title);
            hasContent(card, photo.alt);
          }
        } else if (m.type === 'figure') {
          hasContent(card, m.alt);
          hasContent(card, m.asset);
          assert.ok(existsSync(join(root, 'web', m.asset)), m.asset);
        } else if (m.type === 'diagram') {
          assert.ok(card.includes(m.svg), m.title);
          assert.match(m.svg, /<svg[^>]*role="img"/);
          assert.match(m.svg, /<desc>[^<]+<\/desc>/);
        } else if (m.type === 'lab') {
          assert.ok(card.includes('data-s4-lab="' + m.lab + '"'), m.lab);
          hasContent(card, JSON.stringify(m.config ?? {}));
          if (m.controls) assert.ok(card.includes('data-s4-controls="' + esc(JSON.stringify(m.controls)) + '"'), m.title);
          const fallback = card.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1] ?? '';
          const configured = Object.entries(m.config ?? {}).reduce((s, [key, value]) => models.labAction(s, key, value), models.createLab(m.lab));
          for (const frame of models.frames(configured)) {
            hasContent(fallback, frame.title, `${m.title}: missing static step ${frame.title}`);
            hasContent(fallback, frame.message, `${m.title}: incomplete static step ${frame.title}`);
          }
          const frames = [...fallback.matchAll(/<svg\b[\s\S]*?<\/svg>/g)].map(match => match[0]);
          assert.ok(frames.length >= 2, `No illustrated keyframes for ${m.title}`);
          assert.ok(unique(frames).length >= 2, `Identical static frames for ${m.title}`);
        }
      });
    }
    const assigned = section4PapersForLesson(lesson, pool);
    for (const q of [...assigned, ...lesson.practice, ...lesson.optionalPractice]) {
      if (q.sourceType === 'past-paper') assert.ok(idsOnPage.includes(q.id.toLowerCase()), `No link target for ${q.id}`);
      assert.equal(html.split('data-question-id="' + q.id + '"').length - 1, 1, q.id);
    }
    assert.doesNotMatch(html, /<details\b[^>]*class="exam-reveal"[^>]*\bopen[\s=>]/);
    assert.doesNotMatch(html, /<(?:script|link|img)\b[^>]*(?:src|href)="https?:\/\//);
  });
}

test('moved cross-page bookmarks provide an explicit link to the new lesson anchor', () => {
  const moves = [
    [22, 'bus-transactions', 21, '4.1.5'], [22, 'unit-1', 21, '4.1.5'],
    [25, 'e035', 26, 'e035'], [25, 'past-paper-questions', 26, 'checkpoint-assembly'],
    [25, 'original-exam-style-question', 26, 'checkpoint-assembly'],
  ];
  for (const [oldPage, oldId, newPage, newId] of moves) {
    const expected = `../lesson-${String(newPage).padStart(3, '0')}/#${newId}`;
    const link = [...pageHtml.get(oldPage).matchAll(/<a\b[^>]+>/g)].find(m => m[0].includes(` id="${oldId}"`));
    assert.ok(link?.[0].includes(`href="${expected}"`), `${oldPage}#${oldId}`);
    assert.ok(pageHtml.get(newPage).includes(` id="${newId}"`), expected);
  }
});
