import { newSpecPage } from '@stencil/core/testing';
import { GoSelect } from '../go-select';
describe('go-select', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoSelect],
     html: `<go-select></go-select>`,
   });
   expect(page.root).toBeTruthy();
 });
});
