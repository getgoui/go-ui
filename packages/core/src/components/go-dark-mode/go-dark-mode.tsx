import { Component, Prop, Build, EventEmitter, Event, Method } from '@stencil/core';

export type Theme = 'light' | 'dark';
@Component({
  tag: 'go-dark-mode',
  styleUrl: 'go-dark-mode.scss',
  shadow: false,
})
export class GoDarkMode {
  /**
   * Attribute name on html element that will be used to store theme
   */
  @Prop() attribute: string = 'data-theme';

  async componentWillLoad() {
    // get user preference
    const theme = await this.getUserPreference();

    this.setTheme(theme);

    // add event listener
    if (Build.isBrowser) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async (e) => {
        await this.setTheme(e.matches ? 'dark' : 'light');
      });
    }
  }

  /**
   * get preferred theme,
   * 1. Check user settings:
   *    - check if localstorage has user-theme key
   *    - if so, check if value is either light or dark,
   *    - if so, return value
   *    - if value is neither light or dark, continue to next step
   * 2. Check system preference:
   *    - check if prefers-color-scheme is dark, if so, return dark
   * 3. default to light
   */
  @Method()
  async getUserPreference(): Promise<Theme> {
    const userTheme = localStorage.getItem('user-theme');
    if (userTheme === 'light' || userTheme === 'dark') {
      return userTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // Default to light
    return 'light';
  }

  @Event({
    eventName: 'themechange',
  })
  changeEvent: EventEmitter<{ theme: Theme }>;

  /**
   * set the current theme and change the html attribute
   * @param theme theme to set
   */
  @Method()
  async setTheme(theme: Theme): Promise<void> {
    localStorage.setItem('user-theme', theme);
    this.changeEvent.emit({ theme });
    document.documentElement.setAttribute(this.attribute, theme);
  }
}
