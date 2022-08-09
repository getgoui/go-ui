import { newSpecPage } from '@stencil/core/testing';
import { GoChip } from '../go-chip';
describe('go-chip', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoChip],
     html: `<go-chip></go-chip>`,
   });
   expect(page.root).toBeTruthy();
 });
});
