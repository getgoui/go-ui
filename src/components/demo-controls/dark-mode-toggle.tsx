import { Component, h, State, Host, Watch } from '@stencil/core';

@Component({
  tag: 'dark-mode-toggle',
})
export class DarkModeToggle {
  @State() isDark = false;

  componentWillLoad() {
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
  }

  @Watch('isDark')
  darkModeChanged(newValue: boolean) {
    document.documentElement.setAttribute('data-theme', newValue ? 'dark' : 'light');
  }

  render() {
    return (
      <Host>
        {/* dark mode toggle */}
        <go-button class="dark-mode-toggle" icon color="secondary" flat round onClick={() => this.toggleDarkMode()}>
          {this.isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </go-button>

        {/* component usage code here */}
      </Host>
    );
  }
}
