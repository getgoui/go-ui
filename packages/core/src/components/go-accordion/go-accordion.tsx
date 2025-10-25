import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';
import { selectDirectChildren } from '../../utils/helper';

/**
 *
 */
@Component({
  tag: 'go-accordion',
  styleUrl: 'go-accordion.scss',
  shadow: false,
})
export class GoAccordion {
  @Element() el: HTMLElement;
  /**
   * If true, multiple `<go-accordion-item>`s can be opened at the same time
   */
  @Prop() multiple?: boolean = false;

  activeItem: HTMLGoAccordionItemElement;

  items: HTMLGoAccordionItemElement[];

  componentWillLoad() {
    this.items = Array.from(this.el.children) as HTMLGoAccordionItemElement[];
  }
  componentDidLoad() {
    // if there's any active accordion item, show them by default and close the rest.
    if (!this.multiple) {
      this.activeItem = selectDirectChildren(this.el, 'go-accordion-item[active]')[0] as unknown as HTMLGoAccordionItemElement;
      if (this.activeItem) {
        this.activeItem.open();
      }
      this.closeNonActive();
    }
  }

  @Listen('opened')
  openHandler(e: Event) {
    e.stopPropagation();
    const eventTarget = e.target as HTMLGoAccordionItemElement;
    if (!this.multiple) {
      this.activeItem = eventTarget;
      this.closeNonActive();
    }
  }

  closeNonActive() {
    this.items.forEach((item) => {
      if (!item.isSameNode(this.activeItem)) {
        item.close();
      }
    });
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
