import { newSpecPage } from '@stencil/core/testing';
import { GoSpinner } from '../go-spinner';
describe('go-spinner', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoSpinner],
     html: `<go-spinner></go-spinner>`,
   });
   expect(page.root).toBeTruthy();
 });
});
