import { newE2EPage } from '@stencil/core/testing';
// import puppeteer from 'puppeteer';

// import axe from 'axe-core';

const fs = require('fs');
const path = require('path');
// const frameHtml = fs.readFileSync(path.resolve(__dirname, '../../../index.html'), 'utf8');
// const frameStyles = fs.readFileSync(path.resolve(__dirname, '../../../../www/build/gov-components.css'), 'utf8');
// const frameJs = fs.readFileSync(path.resolve(__dirname, '../../../../www/build/gov-components.js'), 'utf8');
const html = fs.readFileSync(path.resolve(__dirname, '../demo/confirm-buttons.html'), 'utf8');

describe('confirm-button', () => {
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
    const page = (await newE2EPage({ html })) as any;
    console.log(page.content());
    // const results = await axe(await page.content(), {
    //   rules: {
    //     tags: ['wcag2a', 'wcag2aa'],
    //   },
    // });
    // console.log(page.url());
    // console.log(results);
    // expect(results.issues.length).toBe(0);
  });
});
