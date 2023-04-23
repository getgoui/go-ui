import { Component, h, Element, Prop } from '@stencil/core';
import { hasSlot } from '../../utils';

/**
 * @slot media - slot for media content (similar to [go-card](/docs/components/go-card#go-card-slots))
 * @slot heading - slot for heading text
 * @slot description - slot for description text
 * @slot actions - slot for actions
 */
@Component({
  tag: 'go-callout-section',
  styleUrl: 'go-callout-section.scss',
  shadow: false,
})
export class GoCalloutSection {
  @Element() el: HTMLElement;

  /**
   * Heading text
   */
  @Prop() heading: string;

  /**
   * HTML tag to use for heading
   */
  @Prop() headingTag: string = 'h2';

  /**
   * Description text
   */
  @Prop() description: string;

  /**
   * Url of image
   */
  @Prop() imgSrc: string;
  /**
   * Alt text of image (default '' which marks the image decorative)
   */
  @Prop() imgAlt: string = '';

  /**
   * Image position, possible values are `start` and `end`
   */
  @Prop() imgPos?: 'start' | 'end' = 'start';

  private parts = {
    media: false,
    heading: false,
    description: false,
    actions: false,
  };

  componentWillLoad() {
    (Object.keys(this.parts) as Array<keyof typeof this.parts>).forEach((key) => {
      this.parts[key] = this.shouldShow(key);
    });
  }

  private shouldShow(key: keyof typeof this.parts) {
    const isSlotPresent = hasSlot(this.el, key);

    if (key === 'heading') {
      return isSlotPresent || !!this.heading;
    }
    if (key === 'media') {
      return isSlotPresent || !!this.imgSrc;
    }
    if (key === 'description') {
      return isSlotPresent || !!this.description;
    }
    return isSlotPresent;
  }

  render() {
    const { parts, heading, headingTag: HeadingTag, description, imgSrc, imgAlt, imgPos } = this;
    return (
      <div class={{ callout: true, reverse: imgPos === 'end' }}>
        {parts.media ? (
          <div class="media">
            <slot name="media">
              <img src={imgSrc} alt={imgAlt} />
            </slot>
          </div>
        ) : null}
        <div class="text">
          {parts.heading ? (
            <div class="heading">
              <slot name="heading">
                <HeadingTag class="heading-text">{heading}</HeadingTag>
              </slot>
            </div>
          ) : null}
          {parts.description ? (
            <div class="description">
              <slot name="description">
                <div innerHTML={description}></div>
              </slot>
            </div>
          ) : null}
          {parts.actions ? (
            <div class="actions">
              <slot name="actions"></slot>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
