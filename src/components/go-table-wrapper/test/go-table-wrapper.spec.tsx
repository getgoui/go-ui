import { newSpecPage } from '@stencil/core/testing';
import { GoTableWrapper } from '../go-table-wrapper';
describe('go-table-wrapper', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoTableWrapper],
     html: `<go-table-wrapper></go-table-wrapper>`,
   });
   expect(page.root).toBeTruthy();
 });
});
