import { Component, h, Host, Element, Prop } from '@stencil/core';

@Component({
  tag: 'go-blockquote',
  styleUrl: 'go-blockquote.scss',
  shadow: false,
})
export class GoBlockquote {
  @Element() el: HTMLElement;

  /**
   * A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.
   * See also: [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote#attr-cite)
   */
  @Prop() citeUrl?: string;

  @Prop() hideQuoteMark?: boolean = false;

  render() {
    return (
      <Host class={{ 'quote-mark': !this.hideQuoteMark }}>
        <figure>
          <blockquote cite={this.citeUrl}>
            <slot></slot>
          </blockquote>
          <figcaption>
            <span>&#8212;</span>
            <slot name="caption"></slot>
          </figcaption>
        </figure>
      </Host>
    );
  }
}
