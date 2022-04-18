import { newSpecPage } from '@stencil/core/testing';
import { GoBadge } from '../go-badge';
describe('go-badge', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoBadge],
     html: `<go-badge></go-badge>`,
   });
   expect(page.root).toBeTruthy();
 });
});
