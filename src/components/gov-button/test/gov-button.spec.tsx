import { newSpecPage } from '@stencil/core/testing';
import { GovButton } from '../gov-button';
describe('gov-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GovButton],
      html: `<gov-button>Test</gov-button>`,
    });
    expect(page.root.querySelector('button')).toBeTruthy();
    expect(page.root.querySelector('button').textContent).toEqual('Test');
  });
});
