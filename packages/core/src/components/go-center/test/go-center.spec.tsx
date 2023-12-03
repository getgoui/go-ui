import { newSpecPage } from '@stencil/core/testing';
import { GoCenter } from '../go-center';
describe('go-center', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoCenter],
     html: `<go-center></go-center>`,
   });
   expect(page.root).toBeTruthy();
 });
});
