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
  @Prop() max?: number = 100;
  /**
   * How much of the task that has been completed
   */
  @Prop({ mutable: true }) value?: number;

  /**
   * Descriptive label for screen readers to identify the progress bar
   */
  @Prop() label?: string;

  /**
   * Id of the label element for the progress bar
   */
  @Prop() labelledby?: string;

  /**
   * Set progress to indeterminate state
   */
  @Prop({ mutable: true }) indeterminate?: boolean = false;

  /**
   * Display percentage of completion
   */
  @Prop() showPercentage?: boolean = false;

  @State() percentage: number;

  @Watch('value')
  updatePercentage(newValue: number) {
    if (typeof newValue !== 'number' || !this.max) {
      this.percentage = 0;
      this.indeterminate = true;
    }
    const total = this.max - this.min;
    this.percentage = Math.round((newValue / total) * 100);
  }

  componentWillLoad() {
    this.updatePercentage(this.value);
  }

  render() {
    const { percentage, indeterminate, label, labelledby, value, max, min, showPercentage } = this;
    let ariaAttrs = {
      'aria-valuenow': indeterminate ? null : value,
      'aria-valuemin': indeterminate ? null : min,
      'aria-valuemax': indeterminate ? null : max,
    };
    return (
      <Host>
        <div class={{ track: true, indeterminate }} aria-label={label} aria-labelledby={labelledby} role="progressbar" {...ariaAttrs}>
          <slot></slot>
          <span class="bar" style={indeterminate ? null : { transform: `translateX(-${100 - percentage}%` }}></span>
        </div>
        {showPercentage ? <span class="percentage">{percentage}%</span> : null}
      </Host>
    );
  }
}
