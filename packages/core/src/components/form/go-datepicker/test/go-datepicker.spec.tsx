import { newSpecPage } from '@stencil/core/testing';
import { GoDatepicker } from '../go-datepicker';
describe('go-datepicker', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoDatepicker],
     html: `<go-datepicker></go-datepicker>`,
   });
   expect(page.root).toBeTruthy();
 });
});
