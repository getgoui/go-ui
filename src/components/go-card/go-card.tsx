import { Component, Host, h, Prop, Element } from '@stencil/core';
import { hasSlot } from '../../utils/helper';
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


  hasCustomTitle: boolean;

  hasMedia: boolean;

  componentWillLoad() {
    this.hasCustomTitle = hasSlot(this.el, 'title');
    this.hasMedia = hasSlot(this.el, 'media');
  }

  render() {
    const { hasMedia, mediaPosition } = this;

    return (
      <Host class={{ [`media ${mediaPosition}`]: hasMedia }}>
        {hasMedia && (
          <div class="card-media">
            <slot name="media"></slot>
          </div>
        )}
        <section class="card-inner">
          {this.hasCustomTitle || this.cardTitle || this.cardSubtitle ? (
            <div class="card-title-section">
              {this.hasCustomTitle ? (
                <slot name="title"></slot>
              ) : (
                [
                  this.cardTitle ? <h2 class="card-title">{this.cardTitle}</h2> : null,
                  this.cardSubtitle ? <h3 class="card-subtitle">{this.cardSubtitle}</h3> : null,
                ]
              )}
            </div>
          ) : null}

          <div class="card-content">
            <slot></slot>
          </div>
        </section>
      </Host>
    );
  }
}
