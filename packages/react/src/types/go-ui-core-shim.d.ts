// Local augmentation: ensure HTMLStencilElement has 'autocorrect' to satisfy updated DOM typings
export {};

declare global {
  interface HTMLStencilElement {
    autocorrect: any;
  }
}
