import { Component, Host, h, Element, Build } from '@stencil/core';

@Component({
  tag: 'go-dark-mode',
  styleUrl: 'go-dark-mode.scss',
  shadow: false,
})
export class GoDarkMode {
  @Element() el: HTMLElement;

  componentWillLoad() {
    // get user preference
    const theme = this.getUserPreference();

    this.setTheme(theme);

    // add event listener
    if (Build.isBrowser) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => this.setTheme(e.matches ? 'dark' : 'light'));
    }
  }

  getUserPreference(): 'light' | 'dark' {
    /**
     * get preferred theme,
     * 1. Check user settings:
     *    - check if localstorage has user-theme key
     *    - if so, check if value is either light or dark,
     *    - if so, return value
     *    - if value is neither light or dark, continue to next step
     * 2. Check system preference:
     *    - check if prefers-color-scheme is dark, if so, return dark
     *    - check if prefers-color-scheme is light, if so, return light
     *    - if neither, continue to next step
     * 3. default to light
     */
    const userTheme = localStorage.getItem('user-theme');
    if (userTheme === 'light' || userTheme === 'dark') {
      return userTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    // Default to light
    return 'light';
  }

  setTheme(theme: 'light' | 'dark') {
    localStorage.setItem('user-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
