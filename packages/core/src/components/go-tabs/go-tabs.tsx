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
   * By default, tabs require user interaction (by clicking or pressing the `Enter` or `Space` key) to be activated.
   * if `auto` is true, tabs are automatically activated when they receive focus.
   */
  @Prop() auto?: boolean = false;

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

  initIconSlot(goTab, slotName) {
    const iconEl = goTab.querySelector(`[slot="${slotName}"]`);
    if (!iconEl) {
      return;
    }
    let iconSlot = null;
    iconSlot = document.createElement('span');
    iconSlot.setAttribute('aria-hidden', 'true'); // icons are decorative only
    iconSlot.classList.add(`go-tab-${slotName}`);
    iconEl.removeAttribute('slot');
    moveEl(iconEl, iconSlot);
    return iconSlot;
  }

  initialiseTabChildren() {
    const children = Array.from(this.el.querySelectorAll('go-tab')) as HTMLGoTabElement[];
    if (children.length === 0) {
      return;
    }

    this.tabChildren = children.map((goTab) => {
      if (!goTab.tabId) {
        const tId = uniqueId('tab-');
        goTab.tabId = tId;
      }
      if (!goTab.panelId) {
        const pId = goTab.tabId + '-panel';
        goTab.panelId = pId;
      }
      const iconSlot = this.initIconSlot(goTab, 'icon');
      const iconActiveSlot = this.initIconSlot(goTab, 'icon-active');

      const { tabId, panelId, label, active, iconPosition, iconOnly } = goTab;
      return {
        tabId,
        panelId,
        label,
        active,
        iconPosition,
        iconOnly,
        iconSlot,
        iconActiveSlot,
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

    const tab = this.tabChildren[index];
    this.tabActivated.emit({
      id: tab.tabId,
      label: tab.label,
      panelId: tab.panelId,
      index,
      tabEl: tabEl as unknown as HTMLElement,
      panelEl: this.panels[index] ?? null,
    });
  }

  render() {
    const { tabChildren, tabGroupLabel, vertical, auto, fill, justify } = this;

    return (
      <Host class={{ vertical }}>
        <go-tablist
          items={tabChildren}
          label={tabGroupLabel}
          auto={auto}
          fill={fill}
          vertical={vertical}
          justify={justify}
          onActivated={(e) => this.activateTab(e)}></go-tablist>
        <slot></slot>
      </Host>
    );
  }
}
