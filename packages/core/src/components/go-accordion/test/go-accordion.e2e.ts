import { newE2EPage } from '@stencil/core/testing';

let html = '';
describe('go-accordion', () => {
  // Set up html content
  beforeAll(async () => {
    const fs = require('fs');
    const path = require('path');
    html = fs.readFileSync(path.resolve(__dirname, '../demo/single.html'), 'utf8');
  });

  it('renders', async () => {
    const page = await newE2EPage({ html });
    const element = await page.find('go-accordion');
    expect(element).toHaveClass('hydrated');
  });

  it('passes automated a11y test', async () => {
    const page = await newE2EPage({ html });
    await expect(page).toPassA11y();
  });

  it('can be navigated by keyboard', async () => {
    const page = await newE2EPage({ html });
    let firstItem = (await page.findAll('go-accordion-item'))[0];
    expect(firstItem).toHaveClass('active');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(1000);

    firstItem = (await page.findAll('go-accordion-item'))[0];
    expect(firstItem).not.toHaveClass('active');
    const secondItem = (await page.findAll('go-accordion-item'))[1];
    expect(secondItem).toHaveClass('active');

    const focusedBtn = await secondItem.find('button'); // 2nd accordion item
    const activeInnerText = await page.evaluate(() => (document.activeElement as HTMLElement).innerText);
    expect(focusedBtn.innerText).toEqual(activeInnerText);
  });

  it('supports multiple mode', async () => {
    const fs = require('fs');
    const path = require('path');
    const html = fs.readFileSync(path.resolve(__dirname, '../demo/multiple.html'), 'utf8');

    const page = await newE2EPage({ html });
    let firstItem = (await page.findAll('go-accordion-item'))[0];
    expect(firstItem).not.toHaveClass('active');
    // open first
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // open second
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(1000);

    // both should be active
    firstItem = (await page.findAll('go-accordion-item'))[0];
    expect(firstItem).toHaveClass('active');
    const secondItem = (await page.findAll('go-accordion-item'))[1];
    expect(secondItem).toHaveClass('active');
  });
});
