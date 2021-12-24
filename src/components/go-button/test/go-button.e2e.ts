import { newE2EPage } from '@stencil/core/testing';

let html = '';
describe('go-button', () => {
  // Set up html content
  beforeAll(async () => {
    const fs = require('fs');
    const path = require('path');
    html = fs.readFileSync(path.resolve(__dirname, '../demo/go-button.html'), 'utf8');
  });

  it('renders', async () => {
    const page = await newE2EPage({ html });
    const element = await page.find('go-button');
    expect(element).toBeTruthy();
  });

  it('passes automated a11y test', async () => {
    const page = await newE2EPage({ html });
    await expect(page).toPassA11y();
  });
});
