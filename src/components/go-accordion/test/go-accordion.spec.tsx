import { newSpecPage } from '@stencil/core/testing';
import { GoAccordion } from '../go-accordion';
describe('go-accordion', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoAccordion],
     html: `<go-accordion></go-accordion>`,
   });
   expect(page.root).toBeTruthy();
 });
});
