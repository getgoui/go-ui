import { newSpecPage } from '@stencil/core/testing';
import { GoNavList } from '../go-nav-list';
describe('go-nav-list', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoNavList],
     html: `<go-nav-list></go-nav-list>`,
   });
   expect(page.root).toBeTruthy();
 });
});
