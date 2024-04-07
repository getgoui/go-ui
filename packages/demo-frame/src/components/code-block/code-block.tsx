import { Component, h, Prop, Watch, Build, State } from '@stencil/core';
import hljs from 'highlight.js';

@Component({
  tag: 'code-block',
  styleUrl: 'code-block.scss',
})
export class CodeBlock {
  @Prop() code = '';
  @Prop() language = 'html';

  @State() result = '';

  componentWillLoad() {
    if (Build.isBrowser) {
      this.highlight();
    }
  }

  @Watch('code')
  highlight() {
    this.result = hljs.highlight(this.code.trim(), { language: this.language }).value;
  }
  render() {
    const { code, language, result } = this;
    if (!code) {
      return null;
    }
    return (
      <pre class="code-block">
        <copy-code-btn code={code}></copy-code-btn>
        <code class={`hljs language-${language}`} innerHTML={result}></code>
      </pre>
    );
  }
}
