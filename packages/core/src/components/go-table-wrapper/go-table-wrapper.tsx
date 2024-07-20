import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'go-table-wrapper',
  styleUrl: 'go-table-wrapper.scss',
  shadow: false,
})
export class GoTableWrapper {
  @Element() el: HTMLElement;

  /**
   * Striped rows
   */
  @Prop() striped: boolean = false;

  /**
   * Bordered table
   */
  @Prop() bordered: boolean = false;

  /**
   * Hoverable rows
   */
  @Prop() hoverable: boolean = false;

  /**
   * Full width table
   */
  @Prop() fullWidth: boolean = false;

  // Store attributes inherited from the host element
  componentWillLoad() {}

  render() {
    const { striped, bordered, hoverable, fullWidth } = this;
    return (
      <Host
        class={{
          striped,
          bordered,
          hoverable,
          'full-width': fullWidth,
        }}>
        <slot></slot>
      </Host>
    );
  }
}
