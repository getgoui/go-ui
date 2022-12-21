import { Component, Prop, State, h, Watch } from '@stencil/core';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { buildContentPageSidebar, loadContentByPath, prepareNavItems, removeLeadingSlash } from '../../utils/helpers';
import Router from '../../router';
import ia from '../../generated-ia';
import { IAItem } from '../../ia.interface';
import siteConfig from '../../../config';

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
  @State() iAItem: IAItem;

  // private source = '';

  private currentPath = '';
  private category = '';
  private meta = null;

  private tocEl: HTMLGoTocElement;

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
      this.iAItem = await loadContentByPath(this.currentPath);
      this.result = this.iAItem.content;
      this.meta = this.iAItem.meta;
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
    const { result, sidebarNavItems, meta, notfound, iAItem } = this;
    if (notfound) {
      return <page-notfound></page-notfound>;
    }
    return [
      <seo-tags pageTitle={meta?.title} image={siteConfig.logo}></seo-tags>,
      <sidebar-layout sidebarItems={prepareNavItems(sidebarNavItems, Router.activePath)} content={result} editUrl={iAItem.editUrl}></sidebar-layout>,
    ];
  }
}
