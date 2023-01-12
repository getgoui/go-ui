import { newSpecPage } from '@stencil/core/testing';
import { GoDropdownMenu } from '../go-dropdown-menu';
describe('go-dropdown-menu', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoDropdownMenu],
     html: `<go-dropdown-menu></go-dropdown-menu>`,
   });
   expect(page.root).toBeTruthy();
 });
});
