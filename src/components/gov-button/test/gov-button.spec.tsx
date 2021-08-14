import { newSpecPage } from '@stencil/core/testing';
import { GovButton } from '../gov-button';

describe('gov-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GovButton],
      html: `<gov-button></gov-button>`,
    });
    expect(page.root).toEqualHtml(`
      <gov-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gov-button>
    `);
  });
});
