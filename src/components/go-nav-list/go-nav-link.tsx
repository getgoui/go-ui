import { Component, h, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { INavItem } from '../../types';
import { inheritAttributes } from '../../utils/helper';

@Component({
  tag: 'go-nav-link',
  styleUrl: 'go-nav-link.scss',
  shadow: false,
})
export class GoNavLink {
  @Element() el: HTMLElement;

  @Prop() item: INavItem;

  @Prop() showArrow = false;

  @Event({
    eventName: 'navigate',
    cancelable: true,
    bubbles: true,
  })
  navEvent: EventEmitter;

  private inheritedAttrs = {};
  componentWillLoad() {
    this.inheritedAttrs = inheritAttributes(this.el, [], true);
  }

  render() {
    const { inheritedAttrs } = this;
    const { isCurrent, url, icon, label } = this.item;

    let Tag = this.item.isCurrent ? 'span' : 'a';
    let attrs = url
      ? {
          href: url,
          onClick: (event) => {
            this.navEvent.emit({ event, item: this.item });
          },
          ...inheritedAttrs,
        }
      : {};

    attrs['class'] = ` nav-item-link ${attrs['class'] ? attrs['class'] : ''}${isCurrent ? ' current' : ''}`;
    return (
      <Tag {...attrs}>
        {icon && <go-icon name={icon}></go-icon>}
        <span>{label}</span>
        {this.showArrow ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        ) : null}
      </Tag>
    );
  }
}
