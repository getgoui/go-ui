import { Component, Host, h, Element, Prop, Watch, State } from '@stencil/core';

@Component({
  tag: 'go-spinner',
  styleUrl: 'go-spinner.scss',
  shadow: false,
})
export class GoSpinner {
  @Element() el: HTMLElement;

  /**
   * Set the ring color of the spinner.
   */
  @Prop() ringColor?: string;

  /**
   * Set the base color of the spinner.
   */
  @Prop() baseColor?: string;

  /**
   * Set the width and height of the spinner.
   */
  @Prop() size?: string;

  /**
   * Set the width of the spinner ring
   */
  @Prop() ringWidth?: string;

  /**
   * Set how long it should take to complete one full rotation in milliseconds.
   */
  @Prop() duration?: number;

  /**
   * If true, spinner and label will be stacked.
   */
  @Prop() stacked?: boolean = false;

  /**
   * set the loading state
   */
  @Prop({ reflect: true }) loading: boolean = true;

  /**
   * screen reader announcement when loading
   */
  @Prop() loadingAnnouncement: string = 'Loading';

  @State() isLoading: boolean;

  componentWillLoad() {
    this.isLoading = this.loading;
  }

  @Watch('loading')
  loadingChanged(value: boolean) {
    this.isLoading = value;
  }

  render() {
    const { ringColor, baseColor, size, ringWidth, duration, stacked, isLoading, loadingAnnouncement } = this;
    let styles = {};
    if (ringColor) {
      styles['--spinner-ring-color'] = ringColor;
    }
    if (baseColor) {
      styles['--spinner-base-color'] = baseColor;
    }
    if (size) {
      styles['--spinner-size'] = size;
    }
    if (ringWidth) {
      styles['--spinner-ring-width'] = ringWidth;
    }
    if (duration) {
      styles['--spinner-duration'] = duration;
    }
    return (
      <Host style={styles} role="status" class={{ stacked, 'visually-hidden': !isLoading }}>
        {isLoading
          ? [
              <div aria-hidden="true" class="spinner"></div>,
              <slot>
                <span class="visually-hidden">{loadingAnnouncement}</span>
              </slot>,
            ]
          : null}
      </Host>
    );
  }
}
