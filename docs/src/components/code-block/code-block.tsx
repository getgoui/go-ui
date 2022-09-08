import { Component, h, Prop, Watch, Build } from '@stencil/core';
import hljs from 'highlight.js';

@Component({
  tag: 'code-block',
  styleUrl: 'code-block.scss',
})
export class CodeBlock {
  @Prop() code = '';
  @Prop() language = 'html';

  componentDidLoad() {
    if (Build.isBrowser) {
      this.highlight();
    }
  }

  @Watch('code')
  highlight() {
    hljs.configure({ ignoreUnescapedHTML: true });
    hljs.highlightAll();
  }
  render() {
    const { code, language } = this;
    if (!code) {
      return null;
    }
    return (
      <pre class="code-block">
        <copy-code-btn code={code}></copy-code-btn>
        <code class={`language-${language}`}>{code}</code>
      </pre>
    );
  }
}
