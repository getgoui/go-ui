import { Component, Host, h, Element, Prop, State, Method } from '@stencil/core';
import { INavItem } from '../../interfaces';
import uniqueId from 'lodash.uniqueid';

export interface TocProps {
  label?: string;
  scope?: string;
  selector?: string;
}

@Component({
  tag: 'go-toc',
  styleUrl: 'go-toc.scss',
  shadow: false,
})
export class GoToc implements TocProps {
  @Element() el: HTMLElement;

  /**
   * Label for the TOC
   */
  @Prop() label?: string = 'On this page';

  /**
   * Specify the scope to get TOC items from
   */
  @Prop() scope?: string = 'main';

  /**
   * Selector for the TOC items
   */
  @Prop() selector?: string = 'h2';

  @State() tocItems?: INavItem[];

  labelId: string = uniqueId('go-toc-heading-');

  componentWillLoad() {
    this.init();
  }

  /**
   * Query the DOM and generate TOC
   * If content in scope is dynamically loaded, it may not be available when this toc component loads.
   * call this `init` method and have the toc regenerate the links
   * @returns void
   */
  @Method()
  async init() {
    const scopeEl = document.querySelector(this.scope);
    if (!scopeEl) {
      return;
    }
    const items = scopeEl.querySelectorAll(this.selector);
    if (!items.length) {
      return;
    }
    this.setupItems(items);
  }

  /**
   * Initialise the TOC items from the given list of elements
   * If the element doesn't have a `id` attribute, generate an unique id and set it to the element
   * Finally set the tocItems state with url and label
   */
  private setupItems(items: NodeListOf<Element>) {
    const tocItems: INavItem[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item.id) {
        item.id = `toc-item-${i}`;
      }
      item.setAttribute('tabindex', '-1');

      tocItems.push({
        url: `#${item.id}`,
        label: item.textContent,
      });
    }

    this.tocItems = tocItems;
  }

  render() {
    const { labelId } = this;
    return (
      <Host>
        {this.tocItems && this.tocItems.length ? (
          <div class="go-toc">
            <nav aria-labelledby={labelId}>
              <div class="go-toc-line" aria-hidden="true"></div>
              <div id={labelId} class="go-toc-title h4">
                {this.label}
              </div>
              <ul class="go-toc-list">
                {this.tocItems.map(({ label, url }) => (
                  <li class="go-toc-item">
                    <go-nav-link item={{ label, url }}></go-nav-link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ) : null}
      </Host>
    );
  }
}
