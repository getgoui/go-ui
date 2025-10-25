// Ambient type declarations for Stencil React output-target runtime

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

// Re-export named types from core
declare module '@go-ui/core' {
  export interface GoChangeEventDetail<T = any> {
    value: T;
    name: string;
  }

  export interface INavItem {
    label: string;
    url?: string;
    children?: INavItem[];
  }

  export interface GoDarkModeCustomEvent<T> extends CustomEvent<T> {}
  export interface GoDatepickerCustomEvent<T> extends CustomEvent<T> {}
  export interface GoDropdownItemCustomEvent<T> extends CustomEvent<T> {}
  export interface GoNavDrawerCustomEvent<T> extends CustomEvent<T> {}
  export interface GoSelectCustomEvent<T> extends CustomEvent<T> {}
  export interface GoTablistCustomEvent<T> extends CustomEvent<T> {}
  export interface GoTabsCustomEvent<T> extends CustomEvent<T> {}
}
