import { Component, Host, h, Element, Prop, State } from '@stencil/core';
import uniqueId from 'lodash.uniqueid';

interface Tab {
  tabId: string;
  panelId: string;
  panelEl: HTMLGoTabElement;
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

  @State() panels: HTMLElement[];

  componentWillLoad() {
    this.initialiseTabs();
  }

  initialiseTabs() {
    const children = Array.from(this.el.querySelectorAll('go-tab')) as HTMLGoTabElement[];
    this.tabChildren = children.map((goTab, index) => {
      const tabId = uniqueId('tab-');
      const panelId = tabId + '-panel';
      goTab.tabId = tabId;
      goTab.panelId = panelId;
      return {
        panelEl: goTab,
        tabId: goTab.tabId || tabId,
        panelId: goTab.panelId || panelId,
        label: goTab.label,
        active: goTab.active || index === 0,
      };
    });
  }

  componentDidLoad() {
    // activate the active tab
    this.tabChildren.forEach((tab) => {
      if (tab.active) {
        tab.panelEl.active = true;
      }
    });
  }

  async deactivateTabs() {
    this.tabChildren = this.tabChildren.map((tab) => {
      tab.panelEl.active = false;

      return {
        ...tab,
        active: false,
      };
    });
  }

  // Activates any given tab panel
  async activateTab(tabEl, setFocus = true) {
    await this.deactivateTabs();
    const tabId = tabEl.getAttribute('id');
    this.tabChildren = this.tabChildren.map((tab) => {
      if (tab.tabId === tabId) {
        tab.panelEl.active = true;
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
  private tabs = [];

  onTabKeyDown(event: KeyboardEvent) {
    const key = event.code;
    console.log({ key });
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
      } else if (pressed === 'Left' || pressed === 'Up') {
        this.focusLastTab();
      } else if (pressed === 'Right' || pressed == 'Down') {
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
    const { tabChildren, tabGroupLabel, vertical } = this;
    return (
      <Host>
        <div class="tabs">
          <div role="tablist" aria-label={tabGroupLabel} aria-orientation={vertical ? 'vertical' : undefined}>
            {tabChildren.map((tab, index) => {
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
                  ref={(el) => this.tabs.push(el)}>
                  {tab.label}
                </button>
              );
            })}
          </div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
