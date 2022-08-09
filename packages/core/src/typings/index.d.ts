export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toPassA11y(): R;
    }
  }
}
