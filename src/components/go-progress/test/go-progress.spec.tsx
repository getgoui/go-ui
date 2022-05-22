import { newSpecPage } from '@stencil/core/testing';
import { GoProgress } from '../go-progress';
describe('go-progress', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoProgress],
     html: `<go-progress></go-progress>`,
   });
   expect(page.root).toBeTruthy();
 });
});
