import { newSpecPage } from '@stencil/core/testing';
import { GoSkipLink } from '../go-skip-link';
describe('go-skip-link', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoSkipLink],
      html: `<go-skip-link target="[data-example='target']">Skip to target</go-skip-link>
     <div data-example="target">
       <p>This is a <a href="#">test</a></p>
     </div>
     `,
    });
    expect(page.root).toBeTruthy();
  });
});
