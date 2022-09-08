import { newSpecPage } from '@stencil/core/testing';
import { GoToc } from '../go-toc';
describe('go-toc', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoToc],
     html: `<go-toc></go-toc>`,
   });
   expect(page.root).toBeTruthy();
 });
});
