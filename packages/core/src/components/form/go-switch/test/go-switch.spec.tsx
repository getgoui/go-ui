import { newSpecPage } from '@stencil/core/testing';
import { GoSwitch } from '../go-switch';
describe('go-switch', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoSwitch],
     html: `<go-switch></go-switch>`,
   });
   expect(page.root).toBeTruthy();
 });
});
