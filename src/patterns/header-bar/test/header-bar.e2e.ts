import { newE2EPage } from '@stencil/core/testing';

let html = '';
describe('header-bar', () => {
  // Set up html content
  beforeAll(async () => {
    const fs = require('fs');
    const path = require('path');
    html = fs.readFileSync(path.resolve(__dirname, '../demo/header-bar.html'), 'utf8');
  });

  it('renders', async () => {
    const page = await newE2EPage({html});
    const element = await page.find('header-bar');
    expect(element).toHaveClass("hydrated");
  });


  it('passes automated a11y test', async () => {
    const page = await newE2EPage({ html });
    await expect(page).toPassA11y();
  });
});
