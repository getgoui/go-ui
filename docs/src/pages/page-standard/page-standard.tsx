import { Component, Prop, State, h, Watch } from '@stencil/core';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { md, prepareNavItems, removeLeadingSlash, siteUrl } from '../../utils/helpers';
import Router from '../../router';
import ia from '../../generated-ia';

@Component({
  tag: 'page-standard',
  styleUrl: 'page-standard.scss',
})
export class PageStandard {
  @Prop() params: {
    [param: string]: string;
  };

  @State() notfound: boolean = false;
  @State() result = '';

  // private source = '';
  private sidebarNavItems = [] as INavItem[];

  private currentPath = '';
  private meta = null;

  private tocEl: HTMLGoTocElement;

  async componentWillLoad() {
    await this.init();
  }

  @Watch('params')
  async init() {
    window.scrollTo({ top: 0 });
    let url = this.params[0];
    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }
    this.currentPath = removeLeadingSlash(url);
    await this.loadPage();
    await this.loadSidebarNav();
  }

  async loadPage() {
    // fetch content dir
    try {
      let response = await fetch(siteUrl('/assets/content/' + this.currentPath + '.md'));
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
    const category = this.currentPath.split('/')[0];
    this.sidebarNavItems = ia[category];
  }

  @Watch('result')
  refreshToc() {
    if (!this.tocEl) {
      return;
    }
    this.tocEl.init();
  }

  render() {
    const { result, sidebarNavItems, meta, notfound } = this;
    if (notfound) {
      return <page-notfound></page-notfound>;
    }
    return [
      <seo-tags pageTitle={meta?.title}></seo-tags>,
      <div class="sidebar-layout">
        <aside>
          <div class="sidebar">
            <go-nav-list block items={prepareNavItems(sidebarNavItems, Router.activePath)}></go-nav-list>
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
