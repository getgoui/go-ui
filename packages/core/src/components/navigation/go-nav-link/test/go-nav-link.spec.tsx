import { newSpecPage } from '@stencil/core/testing';
import { GoNavLink } from '../go-nav-link';
describe('go-nav-link', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoNavLink],
     html: `<go-nav-link></go-nav-link>`,
   });
   expect(page.root).toBeTruthy();
 });
});
