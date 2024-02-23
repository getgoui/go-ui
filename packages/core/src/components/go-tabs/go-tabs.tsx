import { Component, Host, h, Element, Prop, State, Event, EventEmitter } from '@stencil/core';
import { uniqueId } from 'lodash-es';
import { ActiveTabWithPanel, JustifyOption, TabItem } from './tabs.type';
import { moveEl } from '@/utils';

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
  @Prop() vertical?: boolean = false;

  /**
   * By default, tabs are automatically activated and their panel is displayed when they receive focus.
   * If `manual` is true, users need to activate a tab by pressing the Enter or Space key.
   */
  @Prop() manual?: boolean = false;

  /**
   * Applies justify-content property to tablist (horizontal only)
   * ie. `justify="between"` applies `justify-content: space-between`
   */
  @Prop() justify?: JustifyOption = 'normal';

  /**
   * fill available space (horizontal only)
   */
  @Prop() fill?: boolean = false;

  /**
   * Tab activated event
   * @param ActivatedTab {index, tabEl, panelEl}
   */
  @Event({
    eventName: 'tabactivated',
  })
  tabActivated: EventEmitter<ActiveTabWithPanel>;

  @State() tabChildren: TabItem[] = [];

  @State() activeTabRect: DOMRect;

  activeIndex = -1;
  tabs: HTMLElement[] = [];
  panels: HTMLGoTabElement[] = [];
  tablistEl: HTMLElement;

  componentWillLoad() {
    this.initialiseTabChildren();
  }

  initialiseTabChildren() {
    const children = Array.from(this.el.querySelectorAll('go-tab')) as HTMLGoTabElement[];
    if (children.length === 0) {
      return;
    }

    this.tabChildren = children.map((goTab) => {
      const tabId = uniqueId('tab-');
      const panelId = tabId + '-panel';
      goTab.tabId = tabId;
      goTab.panelId = panelId;
      const iconEl = goTab.querySelector('[slot="icon"]');
      let iconSlot = null;

      if (iconEl) {
        iconSlot = document.createElement('span');
        iconSlot.setAttribute('aria-hidden', 'true'); // icons are decorative only
        iconSlot.classList.add('icon');
        iconEl.removeAttribute('slot');
        moveEl(iconEl, iconSlot);
      }
      return {
        tabId: goTab.tabId || tabId,
        panelId: goTab.panelId || panelId,
        label: goTab.label,
        active: goTab.active,
        iconSlot,
        iconPosition: goTab.iconPosition,
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

  activateTab(event) {
    const { index, tabEl } = event.detail;

    this.panels.forEach((panel, i) => {
      if (i === index) {
        panel.setActive(true);
      } else {
        panel.setActive(false);
      }
    });

    this.tabActivated.emit({
      index,
      tabEl,
      panelEl: this.panels[index] ?? null,
    });
  }

  render() {
    const { tabChildren, tabGroupLabel, vertical, manual, fill, justify } = this;

    return (
      <Host class={{ vertical }}>
        <go-tablist
          items={tabChildren}
          label={tabGroupLabel}
          manual={manual}
          fill={fill}
          vertical={vertical}
          justify={justify}
          onActivated={(e) => this.activateTab(e)}></go-tablist>
        <slot></slot>
      </Host>
    );
  }
}
