import { Component, Prop, State, h, Watch } from '@stencil/core';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { buildSidebar, prepareNavItems, loadContentByPath } from '../../utils/helpers';
import Router from '../../router';
import { IAItem } from '../../ia.interface';
import { JsonDocsProp } from '@go-ui/core/dist/docs/go-ui';

@Component({
  tag: 'page-docs',
  styleUrl: 'page-docs.scss',
})
export class PageDocs {
  @Prop() params: {
    [param: string]: string;
  };

  @State() notfound: boolean = false;
  @State() doc: IAItem = null;
  @State() sidebarNavItems = [] as INavItem[];
  // private source = '';

  private currentUrl = '';

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
    this.doc = content;
  }

  async loadSidebarNav() {
    this.sidebarNavItems = buildSidebar();
  }

  renderProps(props: JsonDocsProp[]) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Attribute</th>
            <th>Description</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => {
            return (
              <tr>
                <td>
                  <code>
                    <b>{prop.name}</b>
                  </code>
                </td>
                <td>
                  <code>{prop.attr}</code>
                </td>
                <td>
                  <go-md content={prop.docs}></go-md>
                </td>
                <td>
                  <code>{prop.default}</code>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const { doc, sidebarNavItems } = this;
    const { meta, editUrl, content, props } = doc;
    return [
      <seo-tags pageTitle={meta?.title}></seo-tags>,
      <sidebar-layout sidebarItems={prepareNavItems(sidebarNavItems, Router.activePath)} content={content} editUrl={editUrl}>
        <h2>Props</h2>
        {this.renderProps(props)}
        <h2>Slots</h2>
      </sidebar-layout>,
    ];
  }
}
