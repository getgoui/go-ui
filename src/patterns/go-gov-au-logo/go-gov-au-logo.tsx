import { Component, Host, h, Element, Prop } from '@stencil/core';
import { hasSlot, inheritAttributes } from '../../utils/helper';

/**
 * @slot crest - This should be where you reference the Australian Government crest img resource (on light background).
 * @slot crest-on-dark - This should be where you reference the Australian Government crest img resource (on dark background).
 * @slot co-brand - Add co-branding agency logo / elements here.
 */
@Component({
  tag: 'go-gov-au-logo',
  styleUrl: 'go-gov-au-logo.scss',
  shadow: false,
})
export class GoGovAuLogo {
  @Element() el: HTMLElement;

  /**
   * Set height of the logo group. Slots will be scaled to this height.
   * Width is set to auto to avoid image distortion.
   */
  @Prop() height: string = '4rem';

  /**
   * If href is provided, logo will be wrapped inside an anchor (`a`) tag. By default, all attributes except `class` and `style` are passed through to the anchor tag.
   */
  @Prop() href?: string;

  private inheritedAttributes = {} as any;
  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['class', 'style'], false);
  }

  render() {
    const { height, inheritedAttributes } = this;
    const Tag = this.href ? 'a' : 'div';
    return (
      <Host>
        <Tag {...inheritedAttributes} class="logo-wrapper" style={{ '--logo-height': height }} href={this.href}>
          <span class="crest light-only">
            <slot name="crest"></slot>
          </span>
          <span class="crest dark-only">
            <slot name="crest-on-dark"></slot>
          </span>
          {hasSlot(this.el, 'co-brand') ? <span class="divider"></span> : null}
          <slot name="co-brand"></slot>
        </Tag>
      </Host>
    );
  }
}
