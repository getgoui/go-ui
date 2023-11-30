import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'go-center',
  styleUrl: 'go-center.scss',
  shadow: false,
})
export class GoCenter {
  @Element() el: HTMLElement;

  /**
   * Height of this container
   */
  @Prop() height: string = 'auto';

  /**
   * If true, the text-align: center will also be applied to the container
   */
  @Prop() alignText: boolean = false;

  render() {
    return (
      <Host class={{ 'align-text': this.alignText }} style={{ height: this.height }}>
        <slot></slot>
      </Host>
    );
  }
}
