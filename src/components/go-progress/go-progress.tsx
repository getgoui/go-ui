import { Component, Host, h, Element, Prop, Watch, State } from '@stencil/core';

@Component({
  tag: 'go-progress',
  styleUrl: 'go-progress.scss',
  shadow: false,
})
export class GoProgress {
  @Element() el: HTMLElement;
  /**
   * min value of the progress bar
   */
  @Prop() min?: number = 0;
  /**
   * Total amount of work required for progress to complete
   */
  @Prop() max: number;
  /**
   * How much of the task that has been completed
   */
  @Prop({ mutable: true }) value?: number;

  /**
   * Show label at the end of progress bar
   */
  @Prop() label: string;

  /**
   * Set progress to indeterminate state
   */
  @Prop({ mutable: true }) indeterminate: boolean;

  @State() percentage: number;

  @Watch('value')
  updatePercentage(newValue: number) {
    if (typeof newValue !== 'number' || !this.max) {
      this.percentage = 0;
      this.indeterminate = true;
    }
    const total = this.max - this.min;
    if (newValue > this.max) {
      this.percentage = 100;
      return;
    }
    this.percentage = Math.round((newValue / total) * 100);
  }

  componentWillLoad() {
    this.updatePercentage(this.value);
  }

  render() {
    const { percentage, indeterminate, label, value, max, min } = this;
    return (
      <Host>
        <div class={{ track: true, indeterminate }} aria-label={label} role="progressbar" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}>
          <slot></slot>
          <span class="bar" style={indeterminate ? null : { transform: `translateX(-${100 - percentage}%` }}></span>
        </div>
        {label ? <span class="label">{label}</span> : null}
      </Host>
    );
  }
}
