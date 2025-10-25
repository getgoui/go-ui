/**
 * Ambient type declarations to unblock React package build
 */

// Declare runtime module for Stencil React output-target
declare module '@stencil/react-output-target/runtime' {
  // Minimal type declarations to satisfy React proxy generation
  export interface StencilReactExternalProps<PropType, ElementType>
    extends Omit<React.HTMLAttributes<ElementType>, 'style'> {
    [key: string]: any;
  }

  export interface ReactProps<ElementType extends HTMLElement> {
    ref?: React.Ref<ElementType>;
  }

  export type StencilReactForwardedRef<T> = React.RefObject<T>;

  export function createReactComponent<PropType, ElementType extends HTMLElement>(
    tagName: string,
    manipulatePropsFunction?: Function,
  ): React.ForwardRefExoticComponent<React.PropsWithoutRef<PropType>>;
}

// Declare missing types from @go-ui/core
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
    [key: string]: any;
  }

  export interface GoDatepickerCustomEvent<T> extends CustomEvent<T> {}
  export interface GoDarkModeCustomEvent<T> extends CustomEvent<T> {}
  export interface GoDropdownItemCustomEvent<T> extends CustomEvent<T> {}
  export interface GoNavDrawerCustomEvent<T> extends CustomEvent<T> {}
  export interface GoSelectCustomEvent<T> extends CustomEvent<T> {}
  export interface GoTablistCustomEvent<T> extends CustomEvent<T> {}
  export interface GoTabsCustomEvent<T> extends CustomEvent<T> {}
}
