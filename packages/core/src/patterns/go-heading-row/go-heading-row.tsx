import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'go-heading-row',
  styleUrl: 'go-heading-row.scss',
  shadow: false,
})
export class GoHeadingRow {
  @Element() el: HTMLElement;

  /**
   * Heading for this card row section
   */
  @Prop() heading?: string;

  /**
   * HTML tag to use for heading
   */
  @Prop() headingTag?: string = 'h2';

  /**
   * View more link href
   */
  @Prop() moreLinkHref?: string;

  /**
   * View more link text
   */
  @Prop() moreLinkText?: string;

  hasHeadingSlot: boolean;

  render() {
    const { heading, moreLinkHref, moreLinkText, hasHeadingSlot, headingTag: HeadingTag } = this;
    const shouldRenderHeading = heading || hasHeadingSlot;
    const shouldRenderMoreLink = moreLinkHref && moreLinkText;
    return (
      <Host>
        {shouldRenderHeading || shouldRenderMoreLink ? (
          <div class="heading-row">
            {shouldRenderHeading ? (
              <slot>
                <HeadingTag>{heading}</HeadingTag>
              </slot>
            ) : (
              <span></span>
            )}
            {shouldRenderMoreLink ? (
              <go-nav-link
                item={{
                  url: moreLinkHref,
                  label: moreLinkText,
                }}
                showArrow={true}></go-nav-link>
            ) : null}
          </div>
        ) : null}
      </Host>
    );
  }
}
