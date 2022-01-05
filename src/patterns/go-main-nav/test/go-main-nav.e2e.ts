import { newE2EPage } from '@stencil/core/testing';

let html = '';
describe('go-main-nav', () => {
  // Set up html content
  beforeAll(async () => {
    const fs = require('fs');
    const path = require('path');
    html = fs.readFileSync(path.resolve(__dirname, '../demo/go-main-nav.html'), 'utf8');
  });

  it('renders', async () => {
    const page = await newE2EPage({ html });
    const element = await page.find('go-main-nav');
    expect(element).toHaveClass('hydrated');
  });
});
