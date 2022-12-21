import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { Component, h, Prop, Watch, State } from '@stencil/core';
import Router from '../../router';

@Component({
  tag: 'sidebar-layout',
  styleUrl: 'sidebar-layout.scss',
})
export class SidebarLayout {
  @Prop() sidebarItems: INavItem[];

  @Prop() content: string;

  @Prop() editUrl?: string;

  @State() isMobileSidebarOpen = false;

  private tocEl: HTMLGoTocElement;

  @Watch('content')
  refreshToc() {
    if (!this.tocEl) {
      return;
    }
    this.tocEl.init();
  }

  openMobileSidebar() {
    this.isMobileSidebarOpen = true;
  }
  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }

  render() {
    const { activePath } = Router;
    const { sidebarItems, content, isMobileSidebarOpen, editUrl } = this;
    return (
      <page-transition activePath={activePath}>
        <div class="sidebar-layout">
          <aside>
            <go-nav-drawer
              active={isMobileSidebarOpen}
              label="Sidebar navigation"
              items={sidebarItems}
              autoClose={true}
              onClose={() => this.closeMobileSidebar()}></go-nav-drawer>
            <div class="container d-none-desktop">
              <go-button
                class="mobile-sidebar-trigger"
                aria-label="Open sidebar navigation"
                compact
                flat
                variant="text"
                type="button"
                onClick={() => this.openMobileSidebar()}>
                <go-icon iconSet="bx" name="chevrons-right" size="1.5rem"></go-icon>
                Open sidebar
              </go-button>
            </div>
            <div class="d-none d-block-desktop sidebar">
              <go-nav-list block items={sidebarItems}></go-nav-list>
            </div>
          </aside>
          <section class="main">
            <div class="container">
              <div class="row">
                <div class="col-12 col-desktop-9 content-container">
                  <go-content innerHTML={content}></go-content>
                  <slot></slot>
                  <div class="pt-5">{editUrl && <go-link href={editUrl}>Edit this page</go-link>}</div>
                </div>
                <div class="d-none d-block-desktop col-desktop-3">
                  <go-toc ref={(el) => (this.tocEl = el)} class="toc" selector=".content-container h2" label-class="h6"></go-toc>
                </div>
              </div>
            </div>

            <go-to-top></go-to-top>
          </section>
        </div>
      </page-transition>
    );
  }
}
