import { Component, Host, h, Element } from '@stencil/core';
  

  @Component({
    tag: 'go-menu',
    styleUrl: 'go-menu.scss',
    shadow: false,
  })
  export class GoMenu {
    @Element() el: HTMLElement;

   
    render() {
      return (
        <Host>
          <slot></slot>
        </Host>
      );
    }

  }
