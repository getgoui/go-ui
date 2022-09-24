import { newSpecPage } from '@stencil/core/testing';
import { GoActionMenu } from '../go-action-menu';
describe('go-action-menu', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoActionMenu],
     html: `<go-action-menu></go-action-menu>`,
   });
   expect(page.root).toBeTruthy();
 });
});
