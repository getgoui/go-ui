import { newSpecPage } from '@stencil/core/testing';
import { GoTabs } from '../go-tabs';
describe('go-tabs', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoTabs],
     html: `<go-tabs></go-tabs>`,
   });
   expect(page.root).toBeTruthy();
 });
});
