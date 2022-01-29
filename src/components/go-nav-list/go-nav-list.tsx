import { Component, h, Element, Prop } from '@stencil/core';
import { INavItem } from '../../types';
@Component({
  tag: 'go-nav-list',
  styleUrl: 'go-nav-list.scss',
  shadow: false,
})
export class GoNavList {
  @Element() el: HTMLElement;

  /**
   * list of navigation items to be displayed
   */
  @Prop() items: INavItem[];

  /**
   * Heading navigation item
   */
  @Prop() headingItem: INavItem;

  /**
   * Heading text
   */
  @Prop() heading: string;

  /**
   * Make the list full width
   */
  @Prop({ reflect: true }) block: boolean = false;

  render() {
    const { items, headingItem, heading, block } = this;
    let label = 'Navigation list';
    if (headingItem?.label) {
      label = headingItem.label;
    }
    if (heading) {
      label = heading;
    }

    return (
      <nav aria-label={label}>
        {headingItem ? (
          <div class="nav-list-header">
            <go-nav-link block={block} class="nav-list-header-text" item={headingItem}></go-nav-link>
          </div>
        ) : null}

        {heading ? (
          <div class="nav-list-header">
            <span class="nav-list-header-text">{heading}</span>
          </div>
        ) : null}

        <slot name="heading"></slot>

        {items?.length > 0 ? (
          <ul class="nav-list">
            {items.map((item) => (
              <li>
                <go-nav-link block={block} item={item}></go-nav-link>
              </li>
            ))}
          </ul>
        ) : (
          <slot></slot>
        )}
      </nav>
    );
  }
}
