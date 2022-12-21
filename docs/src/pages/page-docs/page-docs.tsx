import { Component, Prop, State, h, Watch } from '@stencil/core';
import { isEmpty } from 'lodash-es';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { buildSidebar, prepareNavItems, loadContentByPath } from '../../utils/helpers';
import Router from '../../router';
import { IAItem } from '../../ia.interface';
import { JsonDocsProp, JsonDocsSlot, JsonDocsEvent, JsonDocsMethod } from '@go-ui/core/dist/docs/go-ui';

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

  /**
   * Render Props table
   */
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
          <go-table-wrapper striped hoverable bordered>
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
                      <td>{prop.default ? <code>{prop.default}</code> : null}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </go-table-wrapper>
        </section>
      );
    });
  }

  /**
   * Render Slots table
   */
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
          <go-table-wrapper striped hoverable bordered>
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
          </go-table-wrapper>
        </section>
      );
    });
  }

  /**
   * Render Events table
   */
  renderEvents(events: { [tag: string]: JsonDocsEvent[] }) {
    if (!events || isEmpty(events)) {
      return;
    }
    return Object.keys(events).map((tag) => {
      const compEvents = events[tag];
      if (!compEvents || !compEvents.length) {
        return;
      }
      return (
        <section>
          <h2 id={`${tag}-events`}>
            Events <code class="text-size-1">{tag}</code>
          </h2>
          <go-table-wrapper striped hoverable bordered>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Description</th>
                  <th>Bubbles</th>
                  <th>Cancelable</th>
                </tr>
              </thead>
              <tbody>
                {compEvents.map((event) => {
                  return (
                    <tr>
                      <td>
                        <code>
                          <b>{event.event}</b>
                        </code>
                      </td>
                      <td>
                        <go-md content={event.docs}></go-md>
                      </td>
                      <td>{String(event.bubbles)}</td>
                      <td>{String(event.cancelable)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </go-table-wrapper>
        </section>
      );
    });
  }

  /**
   * Render Methods table
   */
  renderMethods(methods: { [tag: string]: JsonDocsMethod[] }) {
    if (!methods || isEmpty(methods)) {
      return;
    }
    return Object.keys(methods).map((tag) => {
      const compMethods = methods[tag];
      if (!compMethods || !compMethods.length) {
        return;
      }
      return (
        <section>
          <h2 id={`${tag}-methods`}>
            Methods <code class="text-size-1">{tag}</code>
          </h2>
          <go-table-wrapper striped hoverable bordered>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Signature</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {compMethods.map((item) => {
                  return (
                    <tr>
                      <td>
                        <code>
                          <b>{item.name}</b>
                        </code>
                      </td>
                      <td>
                        <code>{item.signature}</code>
                      </td>
                      <td>
                        <go-md content={item.docs}></go-md>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </go-table-wrapper>
        </section>
      );
    });
  }

  /**
   * Render Styles table
   */
  renderStyles(styles: { [tag: string]: JsonDocsSlot[] }) {
    if (!styles || isEmpty(styles)) {
      return;
    }
    return Object.keys(styles).map((tag) => {
      const compStyles = styles[tag];
      if (!compStyles || !compStyles.length) {
        return;
      }
      return (
        <section>
          <h2 id={`${tag}-styles`}>
            Styles <code class="text-size-1">{tag}</code>
          </h2>
          <go-table-wrapper striped hoverable bordered>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Default value</th>
                </tr>
              </thead>
              <tbody>
                {compStyles.map((prop) => {
                  const [desc, defaultValue] = prop.docs.split('- default:');

                  return (
                    <tr>
                      <td>
                        <code>
                          <b>{prop.name}</b>
                        </code>
                      </td>
                      <td>
                        <go-md content={desc}></go-md>
                      </td>
                      <td>
                        <code>{defaultValue}</code>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </go-table-wrapper>
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
        <div class="mt-5 mb-5">
          <go-link href={editUrl}>Edit this page</go-link>
        </div>
        <go-content class="d-block mt-4">
          {this.renderProps(component?.props)}
          {this.renderSlots(component?.slots)}
          {this.renderEvents(component?.events)}
          {this.renderMethods(component?.methods)}
          {this.renderStyles(component?.styles)}
        </go-content>
      </sidebar-layout>,
    ];
  }
}
