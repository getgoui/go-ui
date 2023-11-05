import { newSpecPage } from '@stencil/core/testing';
import { GoBreadcrumb } from '../go-breadcrumbs';
describe('go-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoBreadcrumb],
      html: `<go-breadcrumbs></go-breadcrumbs>`,
    });
    expect(page.root).toBeTruthy();
  });
});
