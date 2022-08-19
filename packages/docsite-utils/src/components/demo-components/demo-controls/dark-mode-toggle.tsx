import { Component, h, State, Host, Watch, Prop } from '@stencil/core';

@Component({
  tag: 'dark-mode-toggle',
  styleUrl: 'dark-mode-toggle.scss',
  shadow: false,
})
export class DarkModeToggle {
  @State() isDark = false;

  @Prop() inline = false;

  componentWillLoad() {
    // match OS preference
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // check if there's any local storage override
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (localStorage.getItem('theme') === 'dark') {
      this.isDark = true;
    } else {
      this.isDark = false;
    }
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
        <go-switch
          checked={this.isDark}
          name="dark-toggle"
          full-width
          onChange={() => this.toggleDarkMode()}
          show-on-off
          active-label="🌙"
          inactive-label="🌞"
        ></go-switch>
      </Host>
    );
  }
}
