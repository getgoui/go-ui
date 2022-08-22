import { Component, Prop, State, h } from '@stencil/core';
import MarkdownIt from 'markdown-it';
import meta from 'markdown-it-meta';
import docs, { JsonDocsComponent } from '@go-ui/core/dist/docs/go-ui';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { siteUrl } from '../../utils/helpers';

const routePrefix = 'docs/';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
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
  private sidebarNavItems = [] as INavItem[];

  async componentWillLoad() {
    let url = this.params[0];
    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }

    const pathParts = url.replace(routePrefix, '').split('/');

    this.componentName = pathParts[pathParts.length - 1];

    await this.loadPage();

    await this.loadSidebarNav();
  }

  async loadPage() {
    const compDocs = docs.components.find(comp => comp.tag === this.componentName);
    this.result = md.render(compDocs.readme);
  }
  async loadSidebarNav() {
    this.sidebarNavItems = docs.components.map((comp: JsonDocsComponent) => {
      const url = siteUrl(this.buildSidebarItemUrl(comp));
      return {
        url,
        label: comp.tag,
      };
    });
  }

  buildSidebarItemUrl(comp: JsonDocsComponent): string {
    return comp.filePath.substring(0, comp.filePath.lastIndexOf('/')).replace('./src/', 'docs/');
  }

  render() {
    const { result, sidebarNavItems } = this;

    return (
      <div class="sidebar-layout">
        <aside class="sidebar">
          <go-nav-list items={sidebarNavItems}></go-nav-list>
        </aside>
        <main>
          <div class="container">
            <div class="row">
              <div class="col-12 col-desktop-9">
                <div class="content-container" innerHTML={result}></div>
              </div>
              <div class="d-none d-block-desktop col-desktop-3">
                <go-toc class="sticky" selector=".content-container h2" label-class="h6"></go-toc>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
