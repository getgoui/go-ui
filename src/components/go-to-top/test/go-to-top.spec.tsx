import { newSpecPage } from '@stencil/core/testing';
import { GoToTop } from '../go-to-top';
describe('go-to-top', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoToTop],
     html: `<go-to-top></go-to-top>`,
   });
   expect(page.root).toBeTruthy();
 });
});
