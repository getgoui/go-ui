import { Component, Host, h, Element } from '@stencil/core';
  import { inheritAttributes } from '../../utils/helper';

  @Component({
    tag: 'go-card',
    styleUrl: 'go-card.scss',
    shadow: false,
  })
  export class GoCard {
    @Element() el: HTMLElement;

   
    // Store attributes inherited from the host element
    private inheritedAttrs = {};
    componentWillLoad() {
      this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style'], false);
    }
    
    render() {
      return (
        <Host>
          <slot></slot>
        </Host>
      );
    }

  }
