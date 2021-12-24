/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Breakpoints, ColorVariants } from "./types";
export namespace Components {
    interface GoButton {
        /**
          * If set, the button will take up the full width of its parent If block="{breakpoint}" is set, the button will take up the full width for the specified breakpoint. e.g. a `block="mobile"` button will display full width on mobile devices.
         */
        "block"?: Breakpoints | '';
        /**
          * Color variants
         */
        "color"?: ColorVariants;
        /**
          * If this button is disabled
         */
        "disabled"?: boolean;
        /**
          * If `flat` is set, the button will have no shadow and will be filled with the background color of the selected variant
         */
        "flat"?: boolean;
        /**
          * If the button has an href, it will be rendered as an anchor tag
         */
        "href"?: string;
        /**
          * If `outlined` is true, the button will have a border based on selected variant
          * @see  `variant` property
         */
        "outlined"?: boolean;
        "rounded"?: boolean;
        /**
          * Html type of the button
         */
        "type": 'submit' | 'reset' | 'button';
    }
    interface GoButtonGroup {
    }
}
declare global {
    interface HTMLGoButtonElement extends Components.GoButton, HTMLStencilElement {
    }
    var HTMLGoButtonElement: {
        prototype: HTMLGoButtonElement;
        new (): HTMLGoButtonElement;
    };
    interface HTMLGoButtonGroupElement extends Components.GoButtonGroup, HTMLStencilElement {
    }
    var HTMLGoButtonGroupElement: {
        prototype: HTMLGoButtonGroupElement;
        new (): HTMLGoButtonGroupElement;
    };
    interface HTMLElementTagNameMap {
        "go-button": HTMLGoButtonElement;
        "go-button-group": HTMLGoButtonGroupElement;
    }
}
declare namespace LocalJSX {
    interface GoButton {
        /**
          * If set, the button will take up the full width of its parent If block="{breakpoint}" is set, the button will take up the full width for the specified breakpoint. e.g. a `block="mobile"` button will display full width on mobile devices.
         */
        "block"?: Breakpoints | '';
        /**
          * Color variants
         */
        "color"?: ColorVariants;
        /**
          * If this button is disabled
         */
        "disabled"?: boolean;
        /**
          * If `flat` is set, the button will have no shadow and will be filled with the background color of the selected variant
         */
        "flat"?: boolean;
        /**
          * If the button has an href, it will be rendered as an anchor tag
         */
        "href"?: string;
        /**
          * If `outlined` is true, the button will have a border based on selected variant
          * @see  `variant` property
         */
        "outlined"?: boolean;
        "rounded"?: boolean;
        /**
          * Html type of the button
         */
        "type"?: 'submit' | 'reset' | 'button';
    }
    interface GoButtonGroup {
    }
    interface IntrinsicElements {
        "go-button": GoButton;
        "go-button-group": GoButtonGroup;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "go-button": LocalJSX.GoButton & JSXBase.HTMLAttributes<HTMLGoButtonElement>;
            "go-button-group": LocalJSX.GoButtonGroup & JSXBase.HTMLAttributes<HTMLGoButtonGroupElement>;
        }
    }
}
