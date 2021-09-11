import { newE2EPage } from '@stencil/core/testing';

let html = '';
describe('grid', () => {
  // Set up html content
  beforeAll(async () => {
    const fs = require('fs');
    const path = require('path');
    html = fs.readFileSync(path.resolve(__dirname, '../demo/grid.html'), 'utf8');
  });

  it('renders', async () => {
    const page = await newE2EPage({html});
    const element = await page.find('.random-target');
    expect(element).toBeTruthy();
  });


  it('passes automated a11y test', async () => {
    const page = await newE2EPage({ html });
    await expect(page).toPassA11y();
  });
});
