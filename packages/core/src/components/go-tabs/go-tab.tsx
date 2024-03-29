import { Component, h, Prop, Element, Host, Method } from '@stencil/core';
import { TabIconPosition } from './tabs.type';

/**
 * @slot icon - Slot for the tab icon (only 1 element allowed)
 * @slot icon-active - Slot for the tab icon (only 1 element allowed)
 */
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

  /**
   * Position of the icon, either 'before' or 'after'
   */
  @Prop() iconPosition?: TabIconPosition = 'before';

  /**
   * Only show `icon` and `icon-active` slot content
   * "Label" prop is still required for screen reader announcement, but will not be shown visually
   */
  @Prop() iconOnly?: boolean = false;

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
