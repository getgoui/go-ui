import { newSpecPage } from '@stencil/core/testing';
import { GoBreadcrumb } from '../go-breadcrumb';
describe('go-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoBreadcrumb],
      html: `<go-breadcrumb></go-breadcrumb>`,
    });
    expect(page.root).toBeTruthy();
  });
});
