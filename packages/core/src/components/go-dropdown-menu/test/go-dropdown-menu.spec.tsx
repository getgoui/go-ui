import { newSpecPage } from '@stencil/core/testing';
import { GoDropdownMenu } from '../go-dropdown-menu';
describe('go-dropdown-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoDropdownMenu],
      html: `<go-button id="test">Toggle Dropdown</go-button>
     <go-dropdown-menu id="dd" trigger-selector="#test">
       <go-dropdown-item>Item 1</go-dropdown-item>
       <go-dropdown-item>Item 2</go-dropdown-item>
       <go-dropdown-item>Item 3</go-dropdown-item>
     </go-dropdown-menu>`,
    });
    expect(page.root).toBeTruthy();
  });
});
