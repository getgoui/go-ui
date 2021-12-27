import { newSpecPage } from '@stencil/core/testing';
import { GoButtonGroup } from '../go-button-group';
describe('go-button-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoButtonGroup],
      html: `<go-button-group></go-button-group>`,
    });
    expect(page.root).toBeTruthy();
  });
});
