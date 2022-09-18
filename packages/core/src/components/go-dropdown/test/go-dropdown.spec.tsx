import { newSpecPage } from '@stencil/core/testing';
import { GoDropdown } from '../go-dropdown';
describe('go-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoDropdown],
      html: `<go-dropdown></go-dropdown>`,
    });
    expect(page.root).toBeTruthy();
  });
});
