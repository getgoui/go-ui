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

  @State() tabChildren: Tab[];

  @State() panels: HTMLElement[];

  componentWillLoad() {
    this.refreshTabs();
  }

  refreshTabs() {
    const children = Array.from(this.el.querySelectorAll('go-tab')) as HTMLGoTabElement[];
    this.tabChildren = children.map((goTab, index) => {
      const tabId = uniqueId('tab-');
      const panelId = tabId + '-panel';

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
    this.tabChildren.forEach((tab) => {
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

  // function focusFirstTab() {
  //   tabs[0].focus();
  // }

  // function focusLastTab() {
  //   tabs[tabs.length - 1].focus();
  // }

  render() {
    const { tabChildren, tabGroupLabel } = this;
    return (
      <Host>
        <div class="tabs">
          <div role="tablist" aria-label={tabGroupLabel}>
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
                  key={index}>
                  {tab.tabId}.{tab.panelId}.{tab.label}
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
