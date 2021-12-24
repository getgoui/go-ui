import { newSpecPage } from '@stencil/core/testing';
import { GoButtonGroup } from '../go-button-group';
describe('go-button-group', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [GoButtonGroup],
     html: `<go-button-group></go-button-group>`,
   });
   expect(page.root).toEqualHtml(`
     <go-button-group>
       <mock:shadow-root>
         <slot></slot>
       </mock:shadow-root>
     </go-button-group>
   `);
 });
});
