import { getUserTheme, setCurrentTheme } from './utils';

export { Components, JSX } from './components';
export * from './utils';
export function initGo() {
  setCurrentTheme(getUserTheme());
}
