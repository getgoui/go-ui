import { Component, Prop, State, h } from '@stencil/core';
import MarkdownIt from 'markdown-it';
import meta from 'markdown-it-meta';
import hljs from 'highlight.js';
import docs from '@go-ui/core/dist/docs/go-ui';

const routePrefix = 'docs/';
const highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(str, { language: lang }).value;
    } catch (__) {}
  }

  return ''; // use external default escaping
};

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
});
md.use(meta);

@Component({
  tag: 'page-docs',
  styleUrl: 'page-docs.scss',
})
export class PageDocs {
  @Prop() params: {
    [param: string]: string;
  };

  @State() notfound: boolean = false;
  @State() result = '';

  // private source = '';
  private componentName = '';

  async componentWillLoad() {
    let url = this.params[0];
    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }

    const pathParts = url.replace(routePrefix, '').split('/');

    this.componentName = pathParts[pathParts.length - 1];

    await this.loadPage();
  }

  async loadPage() {
    const compDocs = docs.components.find(comp => comp.tag === this.componentName);
    this.result = md.render(compDocs.usage.readme);
  }

  render() {
    const { result } = this;
    return (
      <div>
        <div class="sidebar"></div>
        <div class="container">
          <div class="row">
            <div class="col-12 col-desktop-10">
              <main innerHTML={result}></main>
            </div>
            <div class="d-none d-block-desktop col-desktop-2">
              <go-toc class="sticky" selector="main h2" label-class="h6"></go-toc>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
