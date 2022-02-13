import { Component, Host, h, Element } from '@stencil/core';
  import { inheritAttributes } from '../../utils/helper';

  @Component({
    tag: 'go-link',
    styleUrl: 'go-link.scss',
    shadow: false,
  })
  export class GoLink {
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
