import { newSpecPage } from '@stencil/core/testing';
import { GoFieldset } from '../go-fieldset';
describe('go-fieldset', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoFieldset],
     html: `<go-fieldset></go-fieldset>`,
   });
   expect(page.root).toBeTruthy();
 });
});
