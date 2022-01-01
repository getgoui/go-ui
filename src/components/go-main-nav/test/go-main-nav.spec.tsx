import { newSpecPage } from '@stencil/core/testing';
import { GoMainNav } from '../go-main-nav';
describe('go-main-nav', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoMainNav],
     html: `<go-main-nav></go-main-nav>`,
   });
   expect(page.root).toBeTruthy();
 });
});
