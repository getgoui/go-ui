import { newSpecPage } from '@stencil/core/testing';
import { GoTooltip } from '../go-tooltip';
describe('go-tooltip', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoTooltip],
     html: `<go-tooltip></go-tooltip>`,
   });
   expect(page.root).toBeTruthy();
 });
});
