import { Component, Host, h, Element } from '@stencil/core';
  import { inheritAttributes } from '../../utils/helper';

  @Component({
    tag: 'demo-playground',
    styleUrl: 'demo-playground.scss',
    shadow: false,
  })
  export class DemoPlayground {
    @Element() el: HTMLElement;

   
    render() {
      return (
        <Host>
          <slot></slot>
        </Host>
      );
    }

  }
