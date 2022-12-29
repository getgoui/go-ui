import { newSpecPage } from '@stencil/core/testing';
import { GoCheckbox } from '../go-checkbox';
describe('go-checkbox', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoCheckbox],
     html: `<go-checkbox></go-checkbox>`,
   });
   expect(page.root).toBeTruthy();
 });
});
