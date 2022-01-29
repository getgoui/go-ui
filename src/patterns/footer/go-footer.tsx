import { Component, Host, h, Element, Prop } from '@stencil/core';
import { INavItem } from '../../types';

@Component({
  tag: 'go-footer',
  styleUrl: 'go-footer.scss',
  shadow: false,
})
export class GoFooter {
  @Element() el: HTMLElement;

  @Prop() items: INavItem[];

  render() {
    return (
      <Host>
        <footer>
          <nav></nav>

          <div class="external-links">
            <slot name="external-links"></slot>
          </div>
          <div class="copyright">
            <slot name="copyright"></slot>
          </div>
        </footer>
      </Host>
    );
  }
}
