import { newSpecPage } from '@stencil/core/testing';
import { GoIcon } from '../go-icon';
describe('go-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoIcon],
      html: `<go-icon icon-set="material-icons" name="favorite" size="3rem" color="var(--go-color-error-500)"></go-icon>`,
    });
    expect(page.root.querySelector('span.material-icons').innerText).toEqual('favorite');
  });
});
