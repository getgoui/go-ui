/**
 * Type declarations for Stencil React output target runtime and missing core types.
 */

declare module '@stencil/react-output-target/runtime' {
  import * as React from 'react';

  export interface StencilReactExternalProps<PropType, ElementType>
    extends Omit<React.HTMLAttributes<ElementType>, 'style'> {
    className?: string;
    style?: { [key: string]: any };
  }

  export interface ReactProps<ElementType extends HTMLElement> {
    ref?: React.Ref<ElementType>;
  }

  export function createReactComponent<PropType, ElementType extends HTMLElement>(
    tagName: string,
    manipulatePropsFunction?: Function,
  ): React.ForwardRefExoticComponent<React.PropsWithoutRef<PropType>>;
}

// Export missing core component types
declare module '@go-ui/core' {
  export interface GoChangeEventDetail<T = any> {
    value: T;
    name: string;
  }

  export interface ActiveTab {
    id: string;
    label: string;
  }

  export interface ActiveTabWithPanel extends ActiveTab {
    panelId: string;
  }

  export interface INavItem {
    label: string;
    url?: string;
    children?: INavItem[];
  }

  export interface GoDatepickerCustomEvent<T> extends CustomEvent<T> {}
  export interface GoDarkModeCustomEvent<T> extends CustomEvent<T> {}
  export interface GoDropdownItemCustomEvent<T> extends CustomEvent<T> {}
  export interface GoNavDrawerCustomEvent<T> extends CustomEvent<T> {}
  export interface GoSelectCustomEvent<T> extends CustomEvent<T> {}
  export interface GoTablistCustomEvent<T> extends CustomEvent<T> {}
  export interface GoTabsCustomEvent<T> extends CustomEvent<T> {}
}

// Patch HTMLStencilElement to include required autocorrect property
declare module '@stencil/core' {
  interface HTMLStencilElement extends HTMLElement {
    autocorrect: boolean;
  }
}
