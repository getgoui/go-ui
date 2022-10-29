import { newSpecPage } from '@stencil/core/testing';
import { GoInput } from '../go-input';
describe('go-input', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoInput],
     html: `<go-input></go-input>`,
   });
   expect(page.root).toBeTruthy();
 });
});
