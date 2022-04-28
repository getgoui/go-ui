import { newSpecPage } from '@stencil/core/testing';
import { GoMd } from '../go-md';
describe('go-md', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoMd],
     html: `<go-md></go-md>`,
   });
   expect(page.root).toBeTruthy();
 });
});
