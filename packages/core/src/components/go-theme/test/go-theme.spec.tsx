import { newSpecPage } from '@stencil/core/testing';
import { GoTheme } from '../go-theme';
describe('go-theme', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoTheme],
     html: `<go-theme></go-theme>`,
   });
   expect(page.root).toBeTruthy();
 });
});
