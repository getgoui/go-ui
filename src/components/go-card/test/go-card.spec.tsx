import { newSpecPage } from '@stencil/core/testing';
import { GoCard } from '../go-card';
describe('go-card', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoCard],
     html: `<go-card></go-card>`,
   });
   expect(page.root).toBeTruthy();
 });
});
