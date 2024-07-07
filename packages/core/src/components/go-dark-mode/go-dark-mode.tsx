import { getUserTheme, rememberUserTheme, setCurrentTheme, Theme, THEME_ATTRIBUTE } from '@/utils';
import { Component, Build, EventEmitter, Event, Method } from '@stencil/core';

@Component({
  tag: 'go-dark-mode',
  styleUrl: 'go-dark-mode.scss',
  shadow: false,
})
export class GoDarkMode {
  async componentWillLoad() {
    // get user preference
    const theme = getUserTheme();

    this.setTheme(theme);

    // add event listener
    if (Build.isBrowser) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async (e) => {
        await this.setTheme(e.matches ? 'dark' : 'light');
      });
    }
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
    this.changeEvent.emit({ theme });
    setCurrentTheme(theme);
    rememberUserTheme(theme);
  }
}
