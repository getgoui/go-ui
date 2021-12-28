import { newSpecPage } from '@stencil/core/testing';
import { GoSearchBar } from '../go-search-bar';
describe('go-search-bar', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoSearchBar],
     html: `<go-search-bar></go-search-bar>`,
   });
   expect(page.root).toBeTruthy();
 });
});
