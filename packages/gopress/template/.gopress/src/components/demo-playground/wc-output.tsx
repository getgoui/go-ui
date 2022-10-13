import { Component, h, Prop } from '@stencil/core';
@Component({
  tag: 'wc-output',
})
export class WcOutput {
  @Prop() usage: string = '';

  render() {
    const { usage } = this;
    return (
      <div class="usage">
        <go-accordion multiple>
          <go-accordion-item heading="Usage">
            <code-block code={usage}></code-block>
          </go-accordion-item>
        </go-accordion>
      </div>
    );
  }
}
