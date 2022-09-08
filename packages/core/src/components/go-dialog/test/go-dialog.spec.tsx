import { newSpecPage } from '@stencil/core/testing';
import { GoDialog } from '../go-dialog';
describe('go-dialog', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoDialog],
     html: `<go-dialog></go-dialog>`,
   });
   expect(page.root).toBeTruthy();
 });
});
