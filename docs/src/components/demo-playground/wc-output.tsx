import { Component, Watch, h, Prop, State } from '@stencil/core';
import hljs from 'highlight.js';

@Component({
  tag: 'wc-output',
})
export class WcOutput {
  @Prop() usage: string = '';

  @State() output: string = '';

  componentWillLoad() {
    this.renderOutput(this.usage);
  }

  @Watch('usage')
  renderOutput(newValue) {
    this.output = hljs.highlight(newValue, { language: 'xml' }).value;
  }

  render() {
    const { usage, output } = this;
    return (
      <div class="usage">
        <go-accordion multiple>
          <go-accordion-item heading="Usage">
            <pre class="code-block">
              <copy-code-btn code={usage}></copy-code-btn>
              <code innerHTML={output}></code>
            </pre>
          </go-accordion-item>
        </go-accordion>
      </div>
    );
  }
}
