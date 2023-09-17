import { Component, Host, h, Prop, Element } from '@stencil/core';
import { hasSlot } from '../../utils/helper';

/**
 * @slot default - Card content
 * @slot heading - Slot for custom card heading
 * @slot pre-heading - Slot for content above the card heading
 * @slot media - Slot for media markup for media card
 * @slot footer - Slot for card footer markup
 */
@Component({
  tag: 'go-card',
  styleUrl: 'go-card.scss',
  shadow: false,
})
export class GoCard {
  @Element() el: HTMLElement;

  /**
   * Heading of the card
   */
  @Prop()
  heading?: string;

  /**
   * Sub heading of the card
   */
  @Prop()
  subHeading?: string;

  /**
   * Position of featured media in the card
   */
  @Prop() mediaPosition?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'start' // responsive top left
    | 'end' = 'top'; // responsive bottom right

  /**
   * For cards that link to destinations, one card can only link to one destination.
   * Note: The link (`a` tag) will be applied to the heading, so if you don't have a `card-heading` prop, you will need to manually add the `a` tag in one of the slots provided.
   */
  @Prop() href?: string;
  /**
   * when href is present, `target` attribute to be applied to the card link
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * Flat card without box-shadow
   */
  @Prop() flat: boolean = false;

  /**
   * Show border on card
   */
  @Prop() border: boolean = false;

  hasCustomHeading: boolean;

  hasMedia: boolean;

  hasPreHeading: boolean;

  hasFooter: boolean;

  componentWillLoad() {
    this.hasCustomHeading = hasSlot(this.el, 'heading');
    this.hasMedia = hasSlot(this.el, 'media');
    this.hasPreHeading = hasSlot(this.el, 'pre-heading');
    this.hasFooter = hasSlot(this.el, 'footer');
    console.log(this.heading);
  }

  render() {
    const {
      hasMedia,
      mediaPosition,
      hasCustomHeading,
      heading,
      subHeading,
      hasPreHeading,
      hasFooter,
      href,
      target,
      flat,
      border,
    } = this;
    return (
      <Host class={{ [`media ${mediaPosition}`]: hasMedia, 'has-link': !!href, flat, border }}>
        {hasMedia && (
          <div class="card-media">
            <slot name="media"></slot>
          </div>
        )}
        <section class="card-inner">
          {hasCustomHeading || heading || subHeading ? (
            <div class="card-heading-section">
              {hasPreHeading ? <slot name="pre-heading"></slot> : null}
              <slot name="heading">
                {heading ? (
                  <h2 class="card-heading">
                    {href ? (
                      <go-link href={href} target={target ? target : null} expand-clickable-area={true}>
                        {heading}
                      </go-link>
                    ) : (
                      heading
                    )}
                  </h2>
                ) : null}
                {subHeading ? <h3 class="card-subheading">{subHeading}</h3> : null}
              </slot>
            </div>
          ) : null}

          <div class="card-content">
            <slot></slot>
          </div>

          {hasFooter ? (
            <div class="card-footer">
              <slot name="footer"></slot>
            </div>
          ) : null}
        </section>
      </Host>
    );
  }
}
