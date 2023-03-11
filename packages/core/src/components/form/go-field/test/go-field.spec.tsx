import { newSpecPage } from '@stencil/core/testing';
import { GoField } from '../go-field';
describe('go-field', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoField],
      html: `
     <go-field label='Test' controlId='input'>
     <input id="input" class="control" />
     </go-field>`,
    });
    expect(page.root).toBeTruthy();
  });
});
