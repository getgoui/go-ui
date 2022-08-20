import { Build, Component, Prop, State, Watch, h } from '@stencil/core';

import siteConfig from '../../../config';

declare global {
  var docsearch: any;
}

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss',
  shadow: false,
})
export class AppHeader {
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

  mobileMenu: HTMLGoNavDrawerElement;

  handleMobileTriggerClick() {
    this.mobileMenu.open();
  }

  componentDidLoad() {
    if (Build.isBrowser && siteConfig.algolia) {
      const { appId, apiKey, indexName } = siteConfig.algolia;
      docsearch({
        appId,
        apiKey,
        indexName,
        container: '#algolia-search',
        debug: false, // Set debug to true if you want to inspect the modal
      });
    }
  }

  render() {
    return (
      <header>
        <go-nav-drawer ref={el => (this.mobileMenu = el)} label="Menu" items={siteConfig.navbar.main}></go-nav-drawer>
        <go-header-bar breakpoint="tablet">
          <go-button slot="mobile-menu-trigger" aria-labelledby="menu-label" compact flat stack variant="text" onClick={() => this.handleMobileTriggerClick()}>
            <go-icon name="menu" slot="prefix"></go-icon>
            <span id="menu-label">Menu</span>
          </go-button>

          <go-gov-au-logo href="/" slot="logo">
            <img slot="main-brand" src={siteConfig.logo} alt={siteConfig.name} />
            <img slot="main-brand-on-dark" src={siteConfig.logoDark} alt={siteConfig.name} />
            <div slot="co-brand">
              <div class="text-size-1">
                <b>{siteConfig.name}</b>
              </div>
              {siteConfig.tagline && <div class="text-size-0 d-none d-block-desktop">{siteConfig.tagline}</div>}
            </div>
          </go-gov-au-logo>

          <div class="nav-actions" slot="actions">
            <go-button href={siteConfig.repoLink.url} variant="text" icon round flat aria-label={siteConfig.repoLink.label}>
              <go-icon size="1.5rem" icon-set="bxl" name="github"></go-icon>
            </go-button>
            {siteConfig.darkThemeSwitch && (
              <go-button variant="text" icon round flat onClick={() => this.toggleDarkMode()}>
                <go-icon size="1.5rem" icon-set="bx" name={this.isDark ? 'moon' : 'sun'}></go-icon>
              </go-button>
            )}
            {siteConfig?.algolia ? <div id="algolia-search" class="algolia"></div> : null}
          </div>

          <go-main-nav slot="main-nav" items={siteConfig.navbar.main}></go-main-nav>
        </go-header-bar>
      </header>
    );
  }
}
