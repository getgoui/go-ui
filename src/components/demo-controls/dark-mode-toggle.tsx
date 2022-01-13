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
          {this.isDark ? '🌞' : '🌙'}
        </go-button>

        {/* component usage code here */}
      </Host>
    );
  }
}
