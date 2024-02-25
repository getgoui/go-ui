import { Component, h, Host, Prop, State, Element, Event, EventEmitter, Watch, Method } from '@stencil/core';
import { ActiveTab, JustifyOption, TabItem } from './tabs.type';
import { JUSTIFY_VALUES_MAP } from './tabs.const';

@Component({
  tag: 'go-tablist',
  styleUrl: 'go-tablist.scss',
})
export class GoTablist {
  @Element() el: HTMLElement;
  /**
   * Set tabs orientation to vertical
   */
  @Prop() vertical?: boolean = false;

  /**
   * Provides a label that describes the purpose of the set of tabs.
   */
  @Prop() label?: string;

  /**
   * By default, tabs require user interaction (by clicking or pressing the `Enter` or `Space` key) to be activated.
   * if `auto` is true, tabs are automatically activated when they receive focus.
   */
  @Prop() auto: boolean = false;

  /**
   * Fix tabs control to the bottom of screen
   */
  @Prop() bottom?: boolean = false;

  /**
   * fill available width
   * not applicable for vertical tabs
   */
  @Prop() fill?: boolean = false;

  /**
   * tab items array
   */
  @Prop() items: TabItem[];

  /**
   * applies justify-content property to tablist
   * ie. `justify="between"` applies `justify-content: space-between`
   */
  @Prop() justify?: JustifyOption = 'normal';

  @State() activeTabRect: DOMRect;
  @State() tabsState: TabItem[];

  activeIndex = -1;
  tablistEl: HTMLElement;
  tabEls: HTMLElement[] = [];

  /**
   * Tab activated event
   * @param ActiveTab {index, tabEl} currently active tab
   */
  @Event({
    eventName: 'activated',
  })
  activated: EventEmitter<ActiveTab>;

  componentWillLoad() {
    this.loadItemsState();
  }

  @Watch('items')
  loadItemsState() {
    if (!this.items?.length) {
      return;
    }
    this.tabsState = [...this.items];
  }

  componentDidLoad() {
    if (!this.tabsState?.length) {
      return;
    }
    // load rect for indicator
    this.activeIndex = this.tabsState.findIndex((tab) => tab.active);

    requestAnimationFrame(() => {
      this.activeTabRect = this.tabEls[this.activeIndex].getBoundingClientRect();
      this.tabsState.forEach((tab, i) => {
        // add icon container
        if (!tab.iconSlot && !tab.iconActiveSlot) {
          return;
        }
        const iconContainer = document.createElement('span');
        iconContainer.classList.add('go-tab-icon-slot');
        if (tab.iconSlot) iconContainer.append(tab.iconSlot);
        if (tab.iconActiveSlot) iconContainer.append(tab.iconActiveSlot);
        if (tab.iconPosition === 'before') {
          this.tabEls[i].prepend(iconContainer);
        }
        if (tab.iconPosition === 'after') {
          this.tabEls[i].append(iconContainer);
        }
      });
    });
  }

  deactivateTabs() {
    this.tabsState = this.tabsState.map((tab) => {
      return {
        ...tab,
        active: false,
      };
    });
  }

  // Activates any given tab panel
  @Method()
  async activateTab(tabEl: HTMLElement, setFocus = true, isOnload = false) {
    // if tab is already active, do nothing
    if (tabEl.getAttribute('aria-selected') === 'true' && isOnload) {
      // emit event
      this.activated.emit({
        index: this.activeIndex,
        tabEl,
      });
      return;
    }

    this.deactivateTabs();
    const tabId = tabEl.getAttribute('id');

    this.tabsState = this.tabsState.map((tab, i) => {
      if (tab.tabId === tabId) {
        this.activeIndex = i;
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

    // emit event
    this.activated.emit({
      index: this.activeIndex,
      tabEl,
    });

    requestAnimationFrame(() => {
      this.activeTabRect = tabEl.getBoundingClientRect();
    });
  }

  // When a tab is clicked, activateTab is fired to activate it
  onTabClick(i) {
    this.activateTab(this.tabEls[i]);
  }

  // Focus on the first tab
  focusFirstTab() {
    this.tabEls[0].focus();
  }

  // Focus on the last tab
  focusLastTab() {
    this.tabEls[this.tabEls.length - 1].focus();
  }

  activateFirstTab() {
    this.activateTab(this.tabEls[0]);
  }

  activateLastTab() {
    this.activateTab(this.tabEls[this.tabEls.length - 1]);
  }

  /**********************************
   * Keyboard support
   ***********************************/

  onKeydown(event: KeyboardEvent) {
    const key = event.code;
    switch (key) {
      case 'End':
        event.preventDefault();
        // Activate last tab
        if (!this.auto) {
          this.focusLastTab();
        } else {
          this.activateLastTab();
        }
        break;
      case 'Home':
        event.preventDefault();
        // Activate first tab
        if (!this.auto) {
          this.focusFirstTab();
        } else {
          this.activateFirstTab();
        }
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
  switchTabOnArrowPress(event): void {
    var pressed = event.code;
    const currentIndex = this.tabEls.findIndex((tab) => event.target.isSameNode(tab));
    if (this.direction[pressed] && currentIndex !== -1) {
      const targetIndex = currentIndex + this.direction[pressed];
      if (this.tabEls[targetIndex]) {
        if (!this.auto) {
          this.tabEls[targetIndex].focus();
          return;
        }
        this.activateTab(this.tabEls[targetIndex]);
        return;
      }

      // target index out of range
      if (pressed === 'ArrowLeft' || pressed === 'ArrowUp') {
        if (!this.auto) {
          console.log('yo!!');
          this.focusLastTab();
          return;
        }
        this.activateLastTab();
        return;
      }

      if (pressed === 'ArrowRight' || pressed == 'ArrowDown') {
        if (!this.auto) {
          this.focusFirstTab();
          return;
        }
        this.activateFirstTab();
        return;
      }
    }
  }
  render() {
    const { label, tabsState, vertical, tablistEl, activeTabRect, justify, fill } = this;

    const tablistScrollLeft = tablistEl?.scrollLeft || 0;
    const tablistScrollTop = tablistEl?.scrollTop || 0;
    const tablistRect = tablistEl?.getBoundingClientRect();

    const activeOffsetLeft = tablistScrollLeft - tablistRect?.left || 0;
    const activeOffsetTop = tablistScrollTop - tablistRect?.top || 0;

    return (
      <Host
        class={{ vertical, fill }}
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
        <div
          role="tablist"
          ref={(el) => (this.tablistEl = el)}
          aria-label={label}
          aria-orientation={vertical ? 'vertical' : undefined}
          style={{ 'justify-content': JUSTIFY_VALUES_MAP[justify] }}>
          {tabsState
            ? tabsState.map((tab, index) => {
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab.active ? 'true' : 'false'}
                    tabindex={tab.active ? undefined : '-1'}
                    aria-controls={tab.panelId}
                    id={tab.tabId}
                    onClick={() => this.onTabClick(index)}
                    onKeyDown={(e) => this.onKeydown(e)}
                    key={index}
                    class={{
                      'active': tab.active,
                      'has-active-icon': !!tab.iconActiveSlot,
                    }}
                    ref={(el) => this.tabEls.push(el)}>
                    <span>{tab.label}</span>
                  </button>
                );
              })
            : null}
          <div class="tabs-active-indicator-track" aria-hidden="true">
            <div class="tabs-active-indicator"></div>
          </div>
        </div>
      </Host>
    );
  }
}
