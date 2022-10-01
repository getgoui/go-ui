import { newSpecPage } from '@stencil/core/testing';
import { GoMenu } from '../go-menu';
describe('go-menu', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoMenu],
     html: `<go-menu></go-menu>`,
   });
   expect(page.root).toBeTruthy();
 });
});
