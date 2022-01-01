import { Component, Host, h, Element } from '@stencil/core';
  import { inheritAttributes } from '../../utils/helper';

  @Component({
    tag: 'go-main-nav',
    styleUrl: 'go-main-nav.scss',
    shadow: false,
  })
  export class GoMainNav {
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
