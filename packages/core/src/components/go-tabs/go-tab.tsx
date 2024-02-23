import { Component, h, Prop, Element, Host, Method } from '@stencil/core';
import { TabIconPosition } from './tabs.type';
@Component({
  tag: 'go-tab',
  styleUrl: 'go-tab.scss',
})
export class GoTab {
  @Element() el: HTMLElement;

  /**
   * Label displayed on the tab
   */
  @Prop() label: string;

  /**
   * If this tab is currently active
   * if multiple `go-tab` are active in the same `go-tabs`, first one is active.
   */
  @Prop({ mutable: true }) active: boolean;

  /**
   * `id` for the tab button element.
   * If not provided, a unique id will be generated.
   */
  @Prop({ mutable: true }) tabId?: string;

  /**
   * id for the tab panel element
   * If not provided, a unique id will be generated.
   */
  @Prop({ mutable: true }) panelId?: string;

  @Prop() iconPosition?: TabIconPosition = 'before';

  @Method()
  async setActive(active: boolean) {
    this.active = active;
  }

  render() {
    const { panelId, tabId, active } = this;
    return (
      <Host tabindex="0" role="tabpanel" id={panelId} aria-labelledby={tabId} class={{ 'tab-panel': true, active }}>
        <slot></slot>
      </Host>
    );
  }
}
