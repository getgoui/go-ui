import { Component, Prop, State, h, Watch } from '@stencil/core';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { buildContentPageSidebar, loadContentByPath, prepareNavItems, removeLeadingSlash } from '../../utils/helpers';
import Router from '../../router';
import ia from '../../generated-ia';
import { IAItem } from '../../ia.interface';

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
  @State() sidebarNavItems = [] as INavItem[];

  // private source = '';

  private currentPath = '';
  private category = '';
  private meta = null;

  private tocEl: HTMLGoTocElement;

  private iAItem: IAItem;

  async componentWillLoad() {
    console.log('Standard page');
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
    this.category = this.currentPath.split('/')[0];

    await this.loadPage();
    await this.loadSidebarNav();
  }

  async loadPage() {
    // fetch content dir
    try {
      this.iAItem = loadContentByPath(this.currentPath);
      this.result = this.iAItem.content;
    } catch (error) {
      this.notfound = true;
    }
  }

  async loadSidebarNav() {
    this.sidebarNavItems = ia[this.category]?.children ? buildContentPageSidebar(ia[this.category].children) : [];
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
