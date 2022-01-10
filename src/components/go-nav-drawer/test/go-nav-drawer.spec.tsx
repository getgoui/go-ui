import { newSpecPage } from '@stencil/core/testing';
import { GoNavDrawer } from '../go-nav-drawer';
describe('go-nav-drawer', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoNavDrawer],
     html: `<go-nav-drawer></go-nav-drawer>`,
   });
   expect(page.root).toBeTruthy();
 });
});
