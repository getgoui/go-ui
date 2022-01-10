import { newSpecPage } from '@stencil/core/testing';
import { GoNavDrawer } from '../go-nav-drawer';
describe('go-nav-drawer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoNavDrawer],
      html: `<go-nav-drawer></go-nav-drawer>`,
    });
    expect(page.root).toBeTruthy();
  });
  // it('renders items', async () => {
  //   const page = await newSpecPage({
  //     components: [GoNavDrawer],
  //     html: `<go-nav-drawer id="nav" items="[{label: 'yo'}]"></go-nav-drawer>`,
  //   });
  //   expect(page.root).toBeTruthy();
  //   const drawer = page.root.querySelector('#nav') as HTMLGoNavDrawerElement;
  //   await drawer.open();

  //   expect(drawer.querySelectorAll('.nav-item').length).toBe(1);
  // });
});
