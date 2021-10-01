import { Component, Host, h, Element } from '@stencil/core';

  @Component({
    tag: 'go-color',
    styleUrl: 'go-color.scss',
    shadow: false,
  })
  export class GoColor {
    @Element() el: HTMLElement;

    render() {
      return (
        <Host>
          <slot></slot>
        </Host>
      );
    }

  }
