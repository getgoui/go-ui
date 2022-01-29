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
          <div class="container">
            <go-nav-list items={this.items}></go-nav-list>
          </div>
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
