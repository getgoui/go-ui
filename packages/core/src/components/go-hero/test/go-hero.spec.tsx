import { newSpecPage } from '@stencil/core/testing';
import { GoHero } from '../go-hero';
describe('go-hero', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoHero],
     html: `<go-hero></go-hero>`,
   });
   expect(page.root).toBeTruthy();
 });
});
