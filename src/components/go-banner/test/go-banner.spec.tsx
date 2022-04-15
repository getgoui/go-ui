import { newSpecPage } from '@stencil/core/testing';
import { GoBanner } from '../go-banner';
describe('go-banner', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoBanner],
     html: `<go-banner></go-banner>`,
   });
   expect(page.root).toBeTruthy();
 });
});
