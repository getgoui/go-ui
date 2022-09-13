import { Component, Prop, State, h, Watch } from '@stencil/core';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { buildSidebar, prepareNavItems, loadContentByPath } from '../../utils/helpers';
import Router from '../../router';
import siteConfig from '../../../config';

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
  @State() sidebarNavItems = [] as INavItem[];
  @State() editUrl = '';
  // private source = '';

  private currentUrl = '';
  private meta = null;

  async componentWillLoad() {
    console.log('Docs page');
    await this.init();
  }

  @Watch('params')
  async init() {
    window.scrollTo({ top: 0 });
    this.currentUrl = this.params[0];
    if (this.currentUrl.endsWith('/')) {
      this.currentUrl = this.currentUrl.substring(0, this.currentUrl.length - 1);
    }
    await this.loadPage();
    await this.loadSidebarNav();
  }

  async loadPage() {
    const content = await loadContentByPath(this.currentUrl);
    this.result = content.content;
    this.meta = content.meta;
    this.editUrl = content.editUrl;
  }

  async loadSidebarNav() {
    this.sidebarNavItems = buildSidebar();
  }

  render() {
    const { result, sidebarNavItems, meta, editUrl } = this;
    return [
      <seo-tags pageTitle={meta?.title} image={siteConfig.logo}></seo-tags>,
      <sidebar-layout sidebarItems={prepareNavItems(sidebarNavItems, Router.activePath)} result={result} editUrl={editUrl}></sidebar-layout>,
    ];
  }
}
