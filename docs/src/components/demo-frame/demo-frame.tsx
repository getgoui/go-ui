import { Component, h, Host, Prop, State } from '@stencil/core';
import docs from '@go-ui/core/dist/docs/go-ui';
import pretty from 'pretty';
import hljs from 'highlight.js';

@Component({
  tag: 'demo-frame',
  styleUrl: 'demo-frame.scss',
  shadow: false,
})
export class DemoFrame {
  @Prop() component: string;
  @Prop() demo: string;

  @Prop() hideSource: boolean = false;

  @State() demoSource: string;
  componentWillLoad() {
    if (!this.component || !this.demo) {
      console.warn('demo-frame need both component and demo props to be specified.');
      return;
    }
    let component = this.component;
    let demo = this.demo;

    const target = docs.components.find(comp => comp.tag === component);
    this.demoSource = pretty(target?.usage[demo]);
  }

  componentDidLoad() {
    hljs.configure({ ignoreUnescapedHTML: true });
    hljs.highlightAll();
  }

  render() {
    const { demoSource, hideSource } = this;
    if (!demoSource) {
      return null;
    }
    return (
      <Host>
        <div class="demo-frame">
          <div class="demo-container">
            <div innerHTML={demoSource}></div>
          </div>
          {!hideSource && (
            <go-accordion>
              <go-accordion-item heading="Source">
                <pre class="code-block">
                  <copy-code-btn code={demoSource}></copy-code-btn>
                  <code class="language-html">{demoSource}</code>
                </pre>
              </go-accordion-item>
            </go-accordion>
          )}
        </div>
      </Host>
    );
  }
}
