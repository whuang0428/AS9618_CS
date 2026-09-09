// Run against a local server with Playwright and Chrome available.
// PLAYWRIGHT_MODULE may point to an existing shared installation.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.COURSE_BASE_URL || 'http://127.0.0.1:8770';

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (['warning', 'error'].includes(message.type())) errors.push(message.text());
    });
    page.on('response', response => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    let pages = 0;
    let transitions = 0;
    async function checkWidth(label) {
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, label);
    }
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
      for (let number = 1; number <= 93; number++) {
        await page.goto(`${base}/course-v3/lesson-${String(number).padStart(3, '0')}/`);
        await page.evaluate(async () => {
          document.documentElement.style.scrollBehavior = 'auto';
          for (const image of document.images) image.loading = 'eager';
          await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
        });
        assert(await page.locator('h1').innerText());
        await checkWidth(`Lesson ${number}, whole page, ${width}px`);
        assert.equal(await page.locator('img').evaluateAll(images => images.filter(image => !image.naturalWidth).length), 0);
        const total = await page.locator('.knowledge-unit').count();
        await page.locator('[data-classroom-toggle]').click();
        for (let index = 0; index < total; index++) {
          await page.locator('#classroom-unit').selectOption(String(index));
          for (const stage of ['visual-and-core', 'practice', 'original-exam-style-question', 'summary']) {
            await page.locator(`[data-unit-stage="${stage}"]`).click();
            assert.equal(await page.locator('.lesson-stage:visible').getAttribute('id'), stage);
            if (stage === 'visual-and-core') {
              assert.equal(await page.locator('.knowledge-unit:visible').count(), 1);
              assert.equal(await page.locator('.knowledge-unit:visible').getAttribute('data-unit-index'), String(index + 1));
            }
            if (stage === 'practice' || stage === 'original-exam-style-question') {
              const ownership = await page.evaluate(({ index, stage }) => {
                const unitIds = new Set(document.querySelectorAll('.knowledge-unit')[index].dataset.objectives.split(' '));
                return [...document.getElementById(stage).querySelectorAll('.practice-question,.exam-question')].map(question => ({
                  visible: question.getBoundingClientRect().height > 0,
                  related: question.dataset.objectives.split(' ').some(id => unitIds.has(id)),
                }));
              }, { index, stage });
              assert(ownership.every(question => question.visible === question.related), `Question ownership: lesson ${number}, unit ${index + 1}`);
            }
            await checkWidth(`Lesson ${number}, unit ${index + 1}, ${stage}, ${width}px`);
            transitions++;
          }
        }
        await page.locator('[data-classroom-toggle]').click();
        assert.equal(await page.locator('.knowledge-unit:visible').count(), total);
        assert.equal(await page.locator('.lesson-stage:visible').count(), 4);
        pages++;
      }
      await page.goto(`${base}/resources/practical-labs/`);
      assert.equal(await page.locator('.lab').count(), 7);
      await checkWidth(`Practical labs, ${width}px`);
      const headerContrast = await page.locator('.lab th').evaluateAll(headers => {
        function luminance(color) {
          const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => {
            const channel = value / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
          });
          return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
        }
        return headers.map(header => {
          const style = getComputedStyle(header);
          const foreground = luminance(style.color);
          const background = luminance(style.backgroundColor);
          return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
        });
      });
      assert(headerContrast.every(ratio => ratio >= 4.5), 'Practical table header contrast');
      assert.equal(await page.locator('details[open]').count(), 0);
      await page.locator('#arrays details').last().locator('summary').click();
      assert.notEqual(await page.locator('#arrays details').last().getAttribute('open'), null);
      // Published downloads must really be available, including all references.
      for (const link of await page.locator('a[download]').evaluateAll(links => links.map(link => link.href))) {
        assert.equal((await page.request.get(link)).status(), 200, link);
      }
      pages++;
    }
    await page.goto(`${base}/course-v3/lesson-064/`);
    await page.locator('[data-classroom-toggle]').click();
    await page.locator('[data-unit-next]').click();
    assert.equal(await page.locator('#classroom-unit').inputValue(), '1');
    await page.locator('[data-unit-previous]').click();
    await page.locator('[data-unit-stage="original-exam-style-question"]').click();
    const answer = page.locator('.exam-question:visible details').first();
    await answer.locator('summary').click();
    assert.notEqual(await answer.getAttribute('open'), null);
    await page.locator('[data-unit-next]').click();
    assert.equal(await page.locator('.lesson-stage details[open]').count(), 0);
    await page.evaluate(() => { location.hash = 'unit-1'; });
    await page.waitForFunction(() => document.querySelector('#unit-1').getBoundingClientRect().height > 0);
    await page.emulateMedia({ media: 'print' });
    assert.equal(await page.locator('.knowledge-unit:visible').count(), 2);
    await page.emulateMedia({ media: 'screen' });
    const noScript = await browser.newContext({ javaScriptEnabled: false });
    const fallback = await noScript.newPage();
    await fallback.goto(`${base}/course-v3/lesson-064/`);
    assert.equal(await fallback.locator('.classroom-toolbar:visible').count(), 0);
    assert.equal(await fallback.locator('.knowledge-unit:visible').count(), 2);
    assert.equal(await fallback.locator('.lesson-stage:visible').count(), 4);
    await noScript.close();
    assert.deepEqual(errors, []);
    console.log(`Classroom verified: ${pages} page/viewport checks; ${transitions} unit/stage transitions; answer, print, download and no-JavaScript checks passed.`);
  } finally {
    await browser.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
