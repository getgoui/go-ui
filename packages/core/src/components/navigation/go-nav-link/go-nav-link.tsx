import { Component, h, Host, Prop, Element, Event, EventEmitter, State, Watch } from '@stencil/core';
import { IIcon, INavItem, UnknownObject } from '../../../interfaces';
import { $attrs, parseJsonProp } from '../../../utils/helper';

@Component({
  tag: 'go-nav-link',
  styleUrl: 'go-nav-link.scss',
  shadow: false,
})
export class GoNavLink {
  @Element() el: HTMLElement;

  /**
   * navigation item
   */
  @Prop() item?: INavItem | string;

  @State() parsedItem: INavItem;

  // developers can also chose to not pass in an item prop
  // but use the following INavItem keys as props to construct the link

  @Prop() label?: string;
  @Prop() url?: string;
  @Prop() icon?: IIcon | string;
  @Prop() description?: string;
  @Prop() isCurrent?: boolean;
  @Prop() linkAttrs?: UnknownObject | string;

  @Watch('item')
  parseNavItem() {
    if (this.item) {
      this.parsedItem = parseJsonProp(this.item);
    }

    // component props will override item data if both are present
    const icon = parseJsonProp(this.icon) ?? this.parsedItem?.icon;
    const linkAttrs = parseJsonProp(this.linkAttrs) ?? this.parsedItem?.linkAttrs;
    this.parsedItem = {
      ...this.parsedItem,
      label: this.label ?? this.parsedItem?.label,
      url: this.url ?? this.parsedItem?.url,
      icon,
      description: this.description ?? this.parsedItem?.description,
      isCurrent: this.isCurrent ?? this.parsedItem?.isCurrent,
      linkAttrs,
    };
  }

  /**
   * show arrow at the end of the link
   */
  @Prop() showArrow?: boolean = false;

  /**
   * full width
   */
  @Prop({ reflect: true }) block = false;

  @Event({
    eventName: 'navigate',
    cancelable: true,
    bubbles: true,
  })
  navEvent: EventEmitter;

  private inheritedAttrs = {};
  componentWillLoad() {
    this.inheritedAttrs = $attrs.bind(this)();
    this.parseNavItem();
  }

  render() {
    const { inheritedAttrs } = this;
    if (!this.parsedItem) {
      return (
        <a {...inheritedAttrs}>
          <slot></slot>
        </a>
      );
    }
    const { isCurrent, url, icon, label, description } = this.parsedItem;

    const isSpan = isCurrent || !url;

    let Tag = isSpan ? 'span' : 'go-link';
    let attrs = {
      ...this.parsedItem.linkAttrs,
      ...inheritedAttrs,
    };
    attrs = !isSpan
      ? {
          href: url,
          onClick: (event) => {
            this.navEvent.emit({ event, item: this.item });
          },
          ...attrs,
        }
      : { ...attrs };
    attrs['class'] = ` nav-item-link ${attrs['class'] ? attrs['class'] : ''}${isCurrent ? ' current' : ''}`;
    return (
      <Host>
        <Tag {...attrs}>
          {icon ? typeof icon === 'string' ? <go-icon name={icon}></go-icon> : <go-icon {...icon}></go-icon> : null}
          <span class="nav-link-text">
            <span class="nav-link-text-label">{label}</span>
            {description ? <span class="nav-link-text-description">{description}</span> : null}
          </span>

          {url && this.showArrow ? (
            <svg
              class="arrow"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24"
              focusable="false"
              aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          ) : null}
        </Tag>
      </Host>
    );
  }
}
