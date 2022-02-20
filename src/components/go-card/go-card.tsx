import { Component, Host, h, Prop, Element } from '@stencil/core';
import { hasSlot } from '../../utils/helper';

/**
 * @slot default - Card content
 * @slot custom-title - Slot for custom card title
 * @slot pre-title - Slot for content above the card title
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
   * Title of the card
   */
  @Prop()
  cardTitle?: string;

  /**
   * Subtitle of the card
   */
  @Prop()
  cardSubtitle?: string;

  /**
   * Position of featured media in the card
   */
  @Prop() mediaPosition:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'start' // responsive top left
    | 'end' = 'top'; // responsive bottom right

  /**
   * For cards that link to destinations, one card can only link to one destination.
   * Note: The link (`a` tag) will be applied to the card-title element, so if you don't have a `card-title` prop, you will need to manually add the `a` tag in one of the slots provided.
   */
  @Prop() href?: string;
  /**
   * when href is present, `target` attribute to be applied to the card link
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top';

  hasCustomTitle: boolean;

  hasMedia: boolean;

  hasPreTitle: boolean;

  hasFooter: boolean;

  componentWillLoad() {
    this.hasCustomTitle = hasSlot(this.el, 'title');
    this.hasMedia = hasSlot(this.el, 'media');
    this.hasPreTitle = hasSlot(this.el, 'pre-title');
    this.hasFooter = hasSlot(this.el, 'footer');
  }

  render() {
    const { hasMedia, mediaPosition, hasCustomTitle, cardTitle, cardSubtitle, hasPreTitle, hasFooter, href, target } = this;

    return (
      <Host class={{ [`media ${mediaPosition}`]: hasMedia, 'has-link': !!href }}>
        {hasMedia && (
          <div class="card-media">
            <slot name="media"></slot>
          </div>
        )}
        <section class="card-inner">
          {hasCustomTitle || cardTitle || cardSubtitle ? (
            <div class="card-title-section">
              {hasPreTitle ? <slot name="pre-title"></slot> : null}
              {hasCustomTitle ? (
                <slot name="title"></slot>
              ) : (
                [
                  cardTitle ? (
                    <h2 class="card-title">
                      {href ? (
                        <go-link href={href} target={target ? target : null} expand-clickable-area={true}>
                          {cardTitle}
                        </go-link>
                      ) : (
                        cardTitle
                      )}
                    </h2>
                  ) : null,
                  cardSubtitle ? <h3 class="card-subtitle">{cardSubtitle}</h3> : null,
                ]
              )}
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
