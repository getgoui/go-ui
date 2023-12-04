import { newSpecPage } from '@stencil/core/testing';
import { GoDarkMode } from '../go-dark-mode';
describe('go-dark-mode', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoDarkMode],
     html: `<go-dark-mode></go-dark-mode>`,
   });
   expect(page.root).toBeTruthy();
 });
});
