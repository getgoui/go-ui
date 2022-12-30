import { newSpecPage } from '@stencil/core/testing';
import { GoRadio } from '../go-radio';
describe('go-radio', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoRadio],
     html: `<go-radio></go-radio>`,
   });
   expect(page.root).toBeTruthy();
 });
});
