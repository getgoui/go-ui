import { Component, h, Host, State } from '@stencil/core';

@Component({
  tag: 'dev-demo',
  styleUrl: 'dev-demo.scss',
  shadow: false,
})
export class DevDemo {
  @State() isDark = false;

  componentWillLoad() {
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }

  render() {
    return (
      <Host>
        {/* dark mode toggle */}
        <go-button class="dark-mode-toggle" icon color="secondary" flat round onClick={() => this.toggleDarkMode()}>
          <go-icon name={this.isDark ? 'dark_mode' : 'light_mode'}></go-icon>
        </go-button>
      </Host>
    );
  }
}
