import { Component, h, Host, Prop, State } from '@stencil/core';
import docs from '@go-ui/core/docs/go-ui';
import pretty from 'pretty';

@Component({
  tag: 'demo-frame',
  styleUrl: 'demo-frame.scss',
  shadow: false,
})
export class DemoFrame {
  @Prop() component: string;
  @Prop() demo: string;

  /**
   * custom code to be injected into demo frame
   */
  @Prop() code: string;

  @Prop() hideSource: boolean = false;

  @State() demoSource: string;

  componentWillLoad() {
    if (!this.code && (!this.component || !this.demo)) {
      console.warn(
        'demo-frame need both component and demo props to be specified.',
      );
      return;
    }

    if (this.code) {
      this.demoSource = pretty(this.code);
      return;
    }
    let component = this.component;
    let demo = this.demo;

    const target = docs.components.find(comp => comp.tag === component);
    this.demoSource = pretty(target?.usage[demo]);
  }

  render() {
    const { demoSource, hideSource } = this;
    if (!demoSource) {
      return (
        <p class="text-size--1">
          <em>Source code not found.</em>
        </p>
      );
    }
    return (
      <Host>
        <go-demo-box
          head={`
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <!-- inception, this loads the playground inside the demo frame -->
    <script type="module" src="https://cdn.jsdelivr.net/npm/@go-ui/demo-frame/dist/demo-frame/demo-frame.esm.js"></script>
    `}
          darkModeSwitch={true}
          code={demoSource}
          hideSource={hideSource}
        ></go-demo-box>
      </Host>
    );
  }
}
