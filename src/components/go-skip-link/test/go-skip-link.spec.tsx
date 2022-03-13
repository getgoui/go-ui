import { newSpecPage } from '@stencil/core/testing';
import { GoSkipLink } from '../go-skip-link';
describe('go-skip-link', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoSkipLink],
     html: `<go-skip-link></go-skip-link>`,
   });
   expect(page.root).toBeTruthy();
 });
});
