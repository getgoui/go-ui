import { newSpecPage } from '@stencil/core/testing';
import { GoTextarea } from '../go-textarea';
describe('go-textarea', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoTextarea],
     html: `<go-textarea></go-textarea>`,
   });
   expect(page.root).toBeTruthy();
 });
});
