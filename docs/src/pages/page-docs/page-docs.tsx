import { Component, Prop, State, h, Watch } from '@stencil/core';
import { isEmpty } from 'lodash-es';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { buildSidebar, prepareNavItems, loadContentByPath } from '../../utils/helpers';
import Router from '../../router';
import { IAItem } from '../../ia.interface';
import { JsonDocsProp, JsonDocsSlot } from '@go-ui/core/dist/docs/go-ui';

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

  renderProps(props: { [tag: string]: JsonDocsProp[] }) {
    if (!props || isEmpty(props)) {
      return;
    }
    return Object.keys(props).map((tag) => {
      const compProps = props[tag];
      if (isEmpty(compProps)) {
        return;
      }
      return (
        <section>
          <h2 id={`${tag}-props`}>
            Props <code class="text-size-1">{tag}</code>
          </h2>
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
              {compProps.map((prop) => {
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
        </section>
      );
    });
  }

  renderSlots(slots: { [tag: string]: JsonDocsSlot[] }) {
    if (!slots || isEmpty(slots)) {
      return;
    }
    return Object.keys(slots).map((tag) => {
      const compSlots = slots[tag];
      if (!compSlots || !compSlots.length) {
        return;
      }
      return (
        <section>
          <h2 id={`${tag}-slots`}>
            Slots <code class="text-size-1">{tag}</code>
          </h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {compSlots.map((prop) => {
                return (
                  <tr>
                    <td>
                      <code>
                        <b>{prop.name}</b>
                      </code>
                    </td>
                    <td>
                      <go-md content={prop.docs}></go-md>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      );
    });
  }

  render() {
    const { doc, sidebarNavItems } = this;
    if (!doc) {
      return;
    }
    const { meta, editUrl, content, component } = doc;
    return [
      <seo-tags pageTitle={meta?.title}></seo-tags>,
      <sidebar-layout sidebarItems={prepareNavItems(sidebarNavItems, Router.activePath)} content={content}>
        <div class="mb-5">
          <go-link href={editUrl}>Edit this page</go-link>
        </div>
        <hr aria-label="Auto generated below" />
        <go-content class="d-block mt-4">
          {this.renderProps(component?.props)}
          {this.renderSlots(component?.slots)}
        </go-content>
      </sidebar-layout>,
    ];
  }
}
