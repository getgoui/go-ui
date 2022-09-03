import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { Component, h, Prop, Watch } from '@stencil/core';
import Router from '../../router';

@Component({
  tag: 'sidebar-layout',
  styleUrl: 'sidebar-layout.scss',
})
export class SidebarLayout {
  @Prop() sidebarItems: INavItem[];

  @Prop() result: string;

  private tocEl: HTMLGoTocElement;

  @Watch('result')
  refreshToc() {
    if (!this.tocEl) {
      return;
    }
    this.tocEl.init();
  }

  render() {
    const { activePath } = Router;
    const { sidebarItems, result } = this;
    return (
      <fade-in activePath={activePath}>
        <div class="sidebar-layout">
          <aside>
            <div class="sidebar">
              <go-nav-list block items={sidebarItems}></go-nav-list>
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
        </div>
      </fade-in>
    );
  }
}
