import { Component, Host, h, Element } from '@stencil/core';

  @Component({
    tag: 'go-footer',
    styleUrl: 'go-footer.scss',
    shadow: false,
  })
  export class GoFooter {
    @Element() el: HTMLElement;

    render() {
      return (
        <Host>
          <slot></slot>
        </Host>
      );
    }

  }
