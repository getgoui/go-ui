import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'go-badge',
  styleUrl: 'go-badge.scss',
  shadow: false,
})
export class GoBadge {
  @Element() el: HTMLElement;
  /**
   * Number to be displayed on the badge
   */
  @Prop() count: number;

  /**
   * minimum number displayable on the badge, if count is less than min, the badge will not be displayed
   */
  @Prop() min: number = 0;

  /**
   * maximum number displayable on the badge, if count is greater than max, `{max}+` is displayed
   */
  @Prop() max: number = 99;

  /**
   * Provide a meaningful label for the badge
   */
  @Prop() label?: string;

  /**
   * If true, the badge will be displayed only as a dot, no number will be shown
   */
  @Prop() dotOnly? = false;

  render() {
    const { count, min, max, label, dotOnly } = this;
    let displayCount: string = `${count}`;
    if (count < min) {
      return <slot></slot>;
    }
    if (count > max) {
      displayCount = `${max}+`;
    }

    return (
      <Host>
        <slot></slot>
        <span aria-label={label ? label : null} class={{ 'badge-count': true, 'dot-only': dotOnly }}>
          {count && !dotOnly ? displayCount : null}
        </span>
      </Host>
    );
  }
}
