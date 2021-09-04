import { newE2EPage } from '@stencil/core/testing';

let html = '';
describe('confirm-button', () => {
  beforeAll(async () => {
    const fs = require('fs');
    const path = require('path');
    html = fs.readFileSync(path.resolve(__dirname, '../demo/confirm-buttons.html'), 'utf8');
  });
  // it('renders', async () => {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   console.log(TESTURL);
  //   await page.goto(TESTURL, { waitUntil: 'load' });
  //   await page.evaluate(() => {
  //     const root = document.querySelector('#root');
  //     root.innerHTML = html;
  //   });

  //   await page.screenshot({
  //     path: path.resolve(__dirname, 'screenshot.png'),
  //     fullPage: true,
  //   });

  //   const testcontent = await page.content();
  //   console.log(testcontent);
  //   await page.close();
  //   await browser.close();
  // });
  // it('matches screenshot', async () => {
  //   const page = await newE2EPage({ html });
  //   const compare = await page.compareScreenshot();
  //   expect(compare).toMatchScreenshot();
  // });
  it('passes automated a11y test', async () => {
    const page = await newE2EPage({ html });
    await expect(page).toPassA11y();
  });
});
