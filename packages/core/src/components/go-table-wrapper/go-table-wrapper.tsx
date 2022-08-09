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

  // Store attributes inherited from the host element
  componentWillLoad() {}

  render() {
    const { striped, bordered, hoverable } = this;
    return (
      <Host
        class={{
          striped,
          bordered,
          hoverable,
        }}>
        <slot></slot>
      </Host>
    );
  }
}
