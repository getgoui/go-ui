import { newSpecPage } from '@stencil/core/testing';
import { GoContent } from '../go-content';
describe('go-content', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoContent],
     html: `<go-content></go-content>`,
   });
   expect(page.root).toBeTruthy();
 });
});
