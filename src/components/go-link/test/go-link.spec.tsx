import { newSpecPage } from '@stencil/core/testing';
import { GoLink } from '../go-link';
describe('go-link', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoLink],
     html: `<go-link></go-link>`,
   });
   expect(page.root).toBeTruthy();
 });
});
