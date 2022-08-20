import { Component, Host, h, Element, Prop, State, Method } from '@stencil/core';
import { INavItem } from '../../interfaces';
import uniqueId from 'lodash.uniqueid';
import { warning } from '../../utils/helper';

export interface TocProps {
  label?: string;
  selector?: string;
  labelClass?: string;
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
   * Selector for the TOC items
   */
  @Prop() selector?: string = 'h2';

  /**
   * Custom classes to be applied to the label
   */
  @Prop() labelClass?: string = '';

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
    const items = document.querySelectorAll(this.selector);
    if (!items.length) {
      warning('TOC selector (' + this.selector + ') yield no result.');
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
    const { labelId, labelClass } = this;
    return (
      <Host>
        {this.tocItems && this.tocItems.length ? (
          <div class="go-toc">
            <nav aria-labelledby={labelId}>
              <div class="go-toc-line" aria-hidden="true"></div>
              <div id={labelId}>
                <slot name="label">
                  <span class={`go-toc-title h5 ${labelClass}`}>{this.label}</span>
                </slot>
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
