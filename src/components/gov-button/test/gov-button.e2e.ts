import { newE2EPage } from '@stencil/core/testing';

describe('gov-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gov-button></gov-button>');

    const element = await page.find('gov-button');
    expect(element).toHaveClass('hydrated');
  });
});
