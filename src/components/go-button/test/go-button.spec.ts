import { newSpecPage } from '@stencil/core/testing';
import { GoButton } from '../go-button';
describe('go-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GoButton],
      html: `<go-button></go-button>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders native button', async () => {
    const page = await newSpecPage({
      components: [GoButton],
      html: `<go-button>Hello</go-button>`,
    });
    const button = (await page.root.querySelector('button')) as HTMLElement;
    expect(button.innerText).toBe('Hello');
  });

  it('renders the props passed in', async () => {
    const page = await newSpecPage({
      components: [GoButton],
      html: `
      <go-button
        outline
        outline-fill
        flat
        disabled
        class="custom-class"
        >Hello</go-button>`,
    });

    expect(page.root).toHaveClass('outline');
    expect(page.root).toHaveClass('outline-fill');
    const nativeButton = await page.root.querySelector('button');
    expect(nativeButton).toHaveAttribute('aria-disabled');
    expect(nativeButton).toHaveAttribute('disabled');
    expect(nativeButton).toHaveClass('custom-class');
  });

  it('renders <a> tag when href is passed in', async () => {
    const page = await newSpecPage({
      components: [GoButton],
      html: `
      <go-button
        href="https://www.google.com"
        class="custom-class"
        >Link</go-button>`,
    });
    const aTag = page.root.querySelector('a');
    expect(aTag).toBeTruthy();
    expect(aTag).toHaveClass('custom-class');
    expect(aTag).toHaveClass('inner-button');
    expect(aTag.getAttribute('href')).toEqual('https://www.google.com');
    expect(page.root.querySelector('button')).toBeFalsy();
  });
});
