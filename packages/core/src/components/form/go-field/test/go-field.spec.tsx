import { newSpecPage } from '@stencil/core/testing';
import { GoField } from '../go-field';
describe('go-field', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoField],
     html: `<go-field></go-field>`,
   });
   expect(page.root).toBeTruthy();
 });
});
