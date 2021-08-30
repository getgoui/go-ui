const puppeteer = require('puppeteer');

(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://localhost:3333', { waitUntil: 'domcontentloaded' });

    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('done');
    await browser.close();
  } catch (e) {
    console.log('Err', e);
  }
})();
