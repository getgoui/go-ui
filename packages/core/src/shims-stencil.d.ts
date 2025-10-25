// Type shims for Stencil component interfaces
import { Components } from './components';
import { JSX } from './components';

// Re-export named types so they're available to consumers
export * from './interfaces';
export * from './components/go-tabs/tabs.type';
export * from './utils';
export * from './components';

// Export custom event types that React proxies need
export interface GoChangeEventDetail<T = any> {
  value: T;
  name: string;
}

export interface GoDarkModeCustomEvent<T> extends CustomEvent<T> {}
export interface GoDatepickerCustomEvent<T> extends CustomEvent<T> {}
export interface GoDropdownItemCustomEvent<T> extends CustomEvent<T> {}
export interface GoNavDrawerCustomEvent<T> extends CustomEvent<T> {}
export interface GoSelectCustomEvent<T> extends CustomEvent<T> {}
export interface GoTablistCustomEvent<T> extends CustomEvent<T> {}
export interface GoTabsCustomEvent<T> extends CustomEvent<T> {}

// Core DOM augmentations
declare global {
  // Global base type that all Stencil elements must extend
  interface HTMLStencilElement extends HTMLElement {
    autocorrect: boolean;
  }

  // Add all component interfaces to the global namespace
  interface HTMLElementTagNameMap {
    // Add all Go components from the Components namespace
    'go-accordion': HTMLGoAccordionElement;
    'go-accordion-item': HTMLGoAccordionItemElement;
    // Add other components as needed...
  }
}
