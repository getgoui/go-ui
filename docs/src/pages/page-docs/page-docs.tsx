import { Component, Prop, State, h, Watch } from '@stencil/core';
import MarkdownIt from 'markdown-it';
import meta from 'markdown-it-meta';
import docs from '@go-ui/core/dist/docs/go-ui';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { goUiPlugin } from '@go-ui/core';
import { getDocsPrefix, siteUrl, buildSidebar } from '../../utils/helpers';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});
md.use(meta).use(goUiPlugin);

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
  private pageName = '';
  private sidebarNavItems = [] as INavItem[];

  private currentPath = '';
  private meta = null;

  private tocEl: HTMLGoTocElement;

  async componentWillLoad() {
    await this.init();
  }

  @Watch('params')
  async init() {
    let url = this.params[0];
    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }
    this.currentPath = url.replace(getDocsPrefix(), '');
    const pathParts = this.currentPath.split('/');
    this.pageName = pathParts.pop();
    await this.loadPage();
    await this.loadSidebarNav();
  }

  async loadPage() {
    const compDocs = docs.components.find(comp => comp.tag === this.pageName);
    if (compDocs) {
      this.result = md.render(compDocs.readme);
      this.meta = (md as any).meta;
      return;
    }

    // not found, fetch content dir
    try {
      console.log('doc not found, looking for content pages' + `/assets/content/docs/${this.currentPath}.md`);
      let response = await fetch(siteUrl('/assets/content/docs/' + this.currentPath + '.md'));
      if (response.status !== 200) {
        throw new Error("Page doesn't exist");
      }

      this.notfound = false;
      let text = await response.text();
      this.result = md.render(text);
      this.meta = (md as any).meta;
    } catch (error) {
      this.notfound = true;
    }
  }

  async loadSidebarNav() {
    this.sidebarNavItems = buildSidebar();
  }

  @Watch('result')
  refreshToc() {
    console.log('docs result changed');
    if (!this.tocEl) {
      return;
    }
    this.tocEl.init();
  }

  render() {
    const { result, sidebarNavItems, meta } = this;
    return [
      <seo-tags pageTitle={meta?.title}></seo-tags>,
      <div class="sidebar-layout">
        <aside>
          <div class="sidebar">
            <go-nav-list items={sidebarNavItems}></go-nav-list>
          </div>
        </aside>
        <main>
          <div class="container">
            <div class="row">
              <div class="col-12 col-desktop-9">
                <div class="content-container" innerHTML={result}></div>
              </div>
              <div class="d-none d-block-desktop col-desktop-3">
                <go-toc ref={el => (this.tocEl = el)} class="toc" selector=".content-container h2" label-class="h6"></go-toc>
              </div>
            </div>
          </div>
        </main>
      </div>,
    ];
  }
}
