import { newE2EPage } from '@stencil/core/testing';

let html = '';
describe('go-nav-bar', () => {
  // Set up html content
  beforeAll(async () => {
    const fs = require('fs');
    const path = require('path');
    html = fs.readFileSync(path.resolve(__dirname, '../usage/go-nav-bar.md'), 'utf8');
  });

  it('renders', async () => {
    const page = await newE2EPage({ html });
    const element = await page.find('go-nav-bar');
    expect(element).toHaveClass('hydrated');
  });
});
