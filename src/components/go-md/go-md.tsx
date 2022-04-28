import { Component, Host, h, Element, Prop, Watch } from '@stencil/core';
import { MarkdownElement } from 'md-block';
import 'md-block';
import { inheritAttributes } from '../../utils/helper';

@Component({
  tag: 'go-md',
  styleUrl: 'go-md.scss',
  shadow: false,
})
export class GoMd {
  @Element() el: HTMLElement;

  @Prop() inline?: boolean = false;

  @Prop() content: string;

  private attrs = {} as any;
  componentWillLoad() {
    // inherit parent attributes
    this.attrs = inheritAttributes(this.el, ['class', 'style', 'inline`', 'content']);
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
    const { inline, content, attrs } = this;

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
