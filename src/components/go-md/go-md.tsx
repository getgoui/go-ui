import { Component, Host, h, Element, Prop, Watch } from '@stencil/core';
import { MarkdownElement } from 'md-block';
import { extension as MarkdownBlockExtension } from 'md-block';
import 'md-block';

@Component({
  tag: 'go-md',
  styleUrl: 'go-md.scss',
  shadow: false,
})
export class GoMd {
  @Element() el: HTMLElement;

  /**
   * Render inline markdown
   */
  @Prop() inline?: boolean = false;

  /**
   * Markdown content to be rendered
   */
  @Prop() content: string;

  /**
   * Sanitize content
   * [Read more](https://md-block.verou.me/#api)
   */
  @Prop() untrusted? = false;

  /**
   * External Markdown file to load.
   * If specified, original element content will be rendered and displayed while the file is loading (or if it fails to load).
   * [Read more](https://md-block.verou.me/#api)
   */
  @Prop() src?: string;

  /**
   * Minimum heading level
   * [Read more](https://md-block.verou.me/#api)
   */
  @Prop() hmin?: number;

  /**
   * Whether to linkify headings.
   * If present with no value, the entire heading text becomes the link, otherwise the symbol provided becomes the link.
   * Note that this is only about displaying links, headings will get ids anyway
   * [Read more](https://md-block.verou.me/#api)
   */
  @Prop() hlinks?: string;

  componentWillLoad() {
    MarkdownBlockExtension.extend = (marked, defaultRenderer) => {
      marked.use({
        renderer: {
          ...defaultRenderer,
          heading(text, level) {
            return `<h${level}>🎉🎉${text}</h${level}>`;
          },
        },
      });
      return marked;
    };
  }

  private mdEl: MarkdownElement;

  @Watch('content')
  handleContentChange(content) {
    if (!this.mdEl) {
      return;
    }
    this.mdEl.mdContent = content;
  }

  render() {
    const { inline, content, untrusted, src, hmin, hlinks } = this;
    const attrs = {
      untrusted,
      src,
      hmin,
      hlinks,
    };
    return (
      <Host>
        {inline ? (
          <md-span {...attrs} ref={(el) => (this.mdEl = el)}>
            {content}
            <slot></slot>
          </md-span>
        ) : (
          <md-block {...attrs} ref={(el) => (this.mdEl = el)}>
            {content}
            <slot></slot>
          </md-block>
        )}
      </Host>
    );
  }
}
