import { newSpecPage } from '@stencil/core/testing';
import { GoBlockquote } from '../go-blockquote';
describe('go-blockquote', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoBlockquote],
     html: `<go-blockquote></go-blockquote>`,
   });
   expect(page.root).toBeTruthy();
 });
});
