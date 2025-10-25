/* Ambient augmentations for component types */

export {};

declare global {
  // Augment HTMLStencilElement to match HTMLElement's autocorrect property
  interface HTMLStencilElement {
    autocorrect: boolean;
  }

  // For specific components that need it
  interface HTMLGoTabElement {
    autocorrect: boolean;
  }
}
