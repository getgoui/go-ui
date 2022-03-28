import { Component, Host, h, Element, Prop, State } from '@stencil/core';
import uniqueId from 'lodash.uniqueid';

interface Tab {
  tabId: string;
  panelId: string;
  label: string;
  active: boolean;
}
@Component({
  tag: 'go-tabs',
  styleUrl: 'go-tabs.scss',
  shadow: false,
})
export class GoTabs {
  @Element() el: HTMLElement;

  /**
   * Provides a label that describes the purpose of the set of tabs.
   */
  @Prop() tabGroupLabel?: string;

  /**
   * Set tabs orientation to vertical
   */
  @Prop() vertical: boolean = false;

  @State() tabChildren: Tab[];

  tabs: HTMLElement[] = [];
  panels: HTMLGoTabElement[] = [];
  tablistEl: HTMLElement;

  componentWillLoad() {
    this.initialiseTabs();
  }

  initialiseTabs() {
    const children = Array.from(this.el.querySelectorAll('go-tab')) as HTMLGoTabElement[];
    if (children.length === 0) {
      return;
    }

    this.tabChildren = children.map((goTab) => {
      const tabId = uniqueId('tab-');
      const panelId = tabId + '-panel';
      goTab.tabId = tabId;
      goTab.panelId = panelId;
      return {
        tabId: goTab.tabId || tabId,
        panelId: goTab.panelId || panelId,
        label: goTab.label,
        active: goTab.active,
      };
    });
    this.panels = children;
    // if no active tab set, activate first tab
    const activeIndex = this.tabChildren.findIndex((tab) => tab.active);
    if (activeIndex === -1) {
      this.tabChildren = this.tabChildren.map((tab, i) => ({ ...tab, active: i === 0 }));
      this.panels[0].active = true;
    }
  }

  componentDidLoad() {
    if (!this.tabChildren?.length) {
      return;
    }
    // load rect for indicator
    const activeTabId = this.tabChildren.findIndex((tab) => tab.active);
    setTimeout(() => {
      this.activeTabRect = this.tabs[activeTabId].getBoundingClientRect();
    }, 10);
  }

  deactivateTabs() {
    this.panels.forEach((panel) => (panel.active = false));
    this.tabChildren = this.tabChildren.map((tab) => {
      return {
        ...tab,
        active: false,
      };
    });
  }

  @State() activeTabRect: DOMRect;

  // Activates any given tab panel
  activateTab(tabEl: HTMLElement, setFocus = true) {
    this.deactivateTabs();
    const tabId = tabEl.getAttribute('id');

    this.activeTabRect = tabEl.getBoundingClientRect();

    this.tabChildren = this.tabChildren.map((tab, i) => {
      if (tab.tabId === tabId) {
        this.panels[i].active = true;
        return {
          ...tab,
          active: true,
        };
      }
      return tab;
    });

    // Set focus when required
    if (setFocus) {
      tabEl.focus();
    }
  }

  // When a tab is clicked, activateTab is fired to activate it
  onTabClick(e) {
    const tabEl = e.target as HTMLElement;
    this.activateTab(tabEl, false);
  }

  /**********************************
   * Keyboard support
   ***********************************/

  onTabKeyDown(event: KeyboardEvent) {
    const key = event.code;
    switch (key) {
      case 'End':
        event.preventDefault();
        // Activate last tab
        this.focusLastTab();
        break;
      case 'Home':
        event.preventDefault();
        // Activate first tab
        this.focusFirstTab();
        break;

      // Up and down are in keydown
      // because we need to prevent page scroll >:)
      case 'ArrowUp':
      case 'ArrowDown':
        if (this.vertical) {
          event.preventDefault();
          this.switchTabOnArrowPress(event);
        }
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        event.preventDefault();
        this.switchTabOnArrowPress(event);
        break;
    }
  }

  // Add or subtract depending on key pressed
  private direction = {
    ArrowUp: -1,
    ArrowLeft: -1,
    ArrowDown: 1,
    ArrowRight: 1,
  };

  // Either focus the next, previous, first, or last tab
  // depending on key pressed
  switchTabOnArrowPress(event) {
    var pressed = event.code;
    const currentIndex = this.tabs.findIndex((tab) => event.target.isSameNode(tab));
    if (this.direction[pressed] && currentIndex !== -1) {
      const targetIndex = currentIndex + this.direction[pressed];
      if (this.tabs[targetIndex]) {
        this.tabs[targetIndex].focus();
      } else if (pressed === 'ArrowLeft' || pressed === 'ArrowUp') {
        this.focusLastTab();
      } else if (pressed === 'ArrowRight' || pressed == 'ArrowDown') {
        this.focusFirstTab();
      }
    }
  }

  // Focus on the first tab
  focusFirstTab() {
    this.tabs[0].focus();
  }

  // Focus on the last tab
  focusLastTab() {
    this.tabs[this.tabs.length - 1].focus();
  }

  render() {
    const { tabChildren, tabGroupLabel, vertical, activeTabRect, tablistEl } = this;

    const tablistScrollLeft = tablistEl?.scrollLeft || 0;
    const tablistScrollTop = tablistEl?.scrollTop || 0;
    const tablistRect = tablistEl?.getBoundingClientRect();

    const activeOffsetLeft = tablistScrollLeft - tablistRect?.left || 0;
    const activeOffsetTop = tablistScrollTop - tablistRect?.top || 0;
    console.log({
      tablistScrollLeft,
      tablistRect,
      activeTabRect,
    });
    return (
      <Host
        class={{ tabs: true, vertical }}
        style={
          vertical
            ? {
                '--tabs-active-indicator-top': `${activeTabRect?.top + activeOffsetTop || 0}px`,
                '--tabs-active-indicator-height': `${activeTabRect?.height || 0}px`,
              }
            : {
                '--tabs-active-indicator-left': `${activeTabRect?.left + activeOffsetLeft || 0}px`,
                '--tabs-active-indicator-width': `${activeTabRect?.width || 0}px`,
              }
        }>
        <div role="tablist" ref={(el) => (this.tablistEl = el)} aria-label={tabGroupLabel} aria-orientation={vertical ? 'vertical' : undefined}>
          {tabChildren
            ? tabChildren.map((tab, index) => {
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab.active ? 'true' : 'false'}
                    tabindex={tab.active ? undefined : '-1'}
                    aria-controls={tab.panelId}
                    id={tab.tabId}
                    onClick={(e) => this.onTabClick(e)}
                    onKeyDown={(e) => this.onTabKeyDown(e)}
                    key={index}
                    class={{ active: tab.active }}
                    ref={(el) => this.tabs.push(el)}>
                    {tab.label}
                  </button>
                );
              })
            : null}
          <div class="tabs-active-indicator-track" aria-hidden="true">
            <div class="tabs-active-indicator"></div>
          </div>
        </div>
        <slot></slot>
      </Host>
    );
  }
}
