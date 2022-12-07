import { Component, Element } from '@stencil/core';

@Component({
  tag: 'go-theme',
  shadow: false,
})
export class GoTheme {
  @Element() el: HTMLElement;
}
