import { newE2EPage } from '@stencil/core/testing';

let html = '';
describe('typography', () => {
  // Set up html content
  beforeAll(async () => {
    const fs = require('fs');
    const path = require('path');
    html = fs.readFileSync(path.resolve(__dirname, '../demo/typography.html'), 'utf8');
  });

  it('passes automated a11y test', async () => {
    const page = await newE2EPage({ html });
    await expect(page).toPassA11y();
  });
});
