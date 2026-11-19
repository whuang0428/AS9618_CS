import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { section8NewPapers } from './course-v3-section8-new-papers.mjs';
import { renderPastPaperQuestion } from './course-v3-past-paper-render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const archive = process.env.AS9618_PAST_PAPER_ROOT ?? '/Users/kw/Documents/Teaching/AS CS 9618/past-papers';
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const identities = [
  ['E8N01', 2025, 'Oct/Nov', 11, '2(b)', 2, ['S8.04.A04']],
  ['E8N02', 2023, 'May/June', 12, '2(a)', 4, ['S8.05.A01', 'S8.05.A03', 'S8.06.A01', 'S8.06.A02']],
  ['E8N03', 2025, 'Oct/Nov', 11, '2(c)(i)', 2, ['S8.11.A02']],
  ['E8N04', 2023, 'May/June', 12, '2(c)(iii)', 4, ['S8.08.A01', 'S8.08.A02', 'S8.10.A02', 'S8.10.A05', 'S8.10.A06']],
  ['E8N05', 2025, 'May/June', 13, '6(b)', 4, ['S8.11.A01']],
];
// Freeze the reviewed PDF identities independently of the editable selection metadata.
const pdfHashes = {
  '2025-Oct-Nov/9618_w25_qp_11.pdf': '2fe1691a0eff789ac686121aac0ae4e7cb3852f9bd321a6542dc6b82fbedf616',
  '2025-Oct-Nov/9618_w25_ms_11.pdf': '64b2928b1348598cd0be2cda8014405264f0a4303b73665633e4e297217056f4',
  '2023-May-June/9618_s23_qp_12.pdf': '2ce09e20a3bdc23506591fd65a99df636065d1a16a9939d4ad382660325a7d89',
  '2023-May-June/9618_s23_ms_12.pdf': 'bc0db739175ead33ca2acb9af7fc46cdc2f8153a05ac867b943ccb1ad09f5a2c',
  '2025-May-June/9618_s25_qp_13.pdf': 'b341d6829ba4baf47dbd8d272cb7fd49b448d04a2a16a028e4fb3178c3c64554',
  '2025-May-June/9618_s25_ms_13.pdf': 'a334bec016c753451ae53c56fdfc0b0758b8f2b5a7a06a86307ac100bb7ebd8e',
};

test('five new selections retain exact original parts, marks and assessment targets', () => {
  assert.deepEqual(section8NewPapers.map(q => [q.id, q.year, q.series, q.component, q.parts[0].part, q.marks, q.objectiveIds]), identities);
  for (const q of section8NewPapers) {
    assert.equal(q.sourceType, 'past-paper');
    assert.equal(q.syllabusCode, '9618');
    assert.equal(q.parts.length, 1);
    assert.equal(q.parts[0].marks, q.marks);
    assert.equal(q.extractReview.status, 'verified');
    assert.match(q.extractReview.method, /visually reviewed every final PNG/);
    for (const field of ['reading', 'solution', 'marking', 'mistakes', 'assessmentFocus', 'coverageNotes']) assert.ok(q[field]?.length, `${q.id}: missing ${field}`);
    for (const kind of ['qp', 'ms']) assert.equal(q[kind].sha256, pdfHashes[q[kind].sourcePdf], `${q.id}: changed ${kind} source identity`);
  }
});

test('rendered selections retain all context and independently collapsed official answers', () => {
  for (const q of section8NewPapers) {
    const html = renderPastPaperQuestion(q, 0, { separateExamGuidance: true });
    for (const extract of [...q.qp.extracts, ...q.ms.extracts]) assert.ok(html.includes(extract.asset), `${q.id}: dropped source extract`);
    for (const role of ['original-question', 'reading', 'solution', 'mark-scheme', 'marking-explanation', 'mistakes']) assert.ok(html.includes(`data-exam-role="${role}"`), `${q.id}: missing ${role}`);
    assert.doesNotMatch(html, /<details\b[^>]*\sopen(?:\s|>)/);
    assert.ok(html.includes(q.parts[0].part));
  }
  assert.deepEqual(section8NewPapers.find(q => q.id === 'E8N04').qp.extracts.map(e => e.page), [5, 6, 7], 'SQL correction needs scenario, definitions/date convention and the full four-error script');
  assert.deepEqual(section8NewPapers.find(q => q.id === 'E8N05').qp.extracts.map(e => e.page), [14, 15], 'INSERT needs the original PRODUCT definition and requested new values');
});

test('local original PDFs match the reviewed immutable source identities', async t => {
  for (const [path, sha256] of Object.entries(pdfHashes)) {
    await t.test(path, subtest => {
      const filename = join(archive, path);
      if (!existsSync(filename)) return subtest.skip(`Original PDF unavailable: ${filename}`);
      assert.equal(digest(readFileSync(filename)), sha256, path);
    });
  }
});

test('published pixels reproduce the original PDF regions and no crop intersects text', t => {
  if (!Object.keys(pdfHashes).every(path => existsSync(join(archive, path)))) return t.skip('Local source PDFs unavailable; source/image hashes remain checked.');
  const python = [process.env.AS9618_PDF_PYTHON, '/Users/kw/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3', 'python3'].filter(Boolean).find(candidate => spawnSync(candidate, ['-c', 'import pdfplumber; from PIL import Image'], { encoding: 'utf8' }).status === 0);
  if (!python) return t.skip('pdfplumber and Pillow unavailable; use AS9618_PDF_PYTHON or the bundled runtime for source-pixel verification.');
  const script = String.raw`
import json,sys
from pathlib import Path
import pdfplumber
from PIL import Image,ImageChops
root,archive=map(Path,sys.argv[1:])
questions=json.loads((root/'scripts/course-v3-section8-new-papers.json').read_text())
count=0
for q in questions:
 for kind in ['qp','ms']:
  with pdfplumber.open(archive/q[kind]['sourcePdf']) as pdf:
   for e in q[kind]['extracts']:
    p=pdf.pages[e['page']-1]
    left,top,right,bottom=e['bbox']
    assert 0<=left<right<=p.width and 0<=top<bottom<=p.height,e['asset']
    cuts=[c for c in p.chars if c.get('upright',True) and c['text'].strip() and left<c['x0']<right and (c['top']<top<c['bottom'] or c['top']<bottom<c['bottom'])]
    cuts += [c for c in p.chars if c.get('upright',True) and c['text'].strip() and top<c['top']<bottom and (c['x0']<left<c['x1'] or c['x0']<right<c['x1'])]
    assert not cuts,(e['asset'],'crop intersects printed text')
    source=p.crop(tuple(e['bbox'])).to_image(resolution=144).original.convert('RGB')
    published=Image.open(root/'web'/e['asset'].lstrip('/')).convert('RGB')
    assert source.size==published.size,e['asset']
    assert ImageChops.difference(source,published).getbbox() is None,(e['asset'],'pixels differ from the original PDF crop')
    count+=1
assert count==15,count
print(f'Checked {count} unchanged source crops.')
`;
  const result = spawnSync(python, ['-c', script, root, archive], { encoding: 'utf8', timeout: 30000 });
  assert.equal(result.status, 0, result.stderr || result.error?.message || result.stdout);
  assert.match(result.stdout, /Checked 15 unchanged source crops/);
});
