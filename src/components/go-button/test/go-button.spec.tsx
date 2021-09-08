import { newSpecPage } from '@stencil/core/testing';
import { GovButton } from '../go-button';
describe('go-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GovButton],
      html: `<go-button>Test</go-button>`,
    });
    expect(page.root.querySelector('button')).toBeTruthy();
    expect(page.root.querySelector('button').textContent).toEqual('Test');
  });
});
