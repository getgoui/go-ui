import { newSpecPage } from '@stencil/core/testing';
import { GoOverlay } from '../go-overlay';
describe('go-overlay', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoOverlay],
     html: `<go-overlay></go-overlay>`,
   });
   expect(page.root).toBeTruthy();
 });
});
