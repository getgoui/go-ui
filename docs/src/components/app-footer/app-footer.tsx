import { Component, h } from '@stencil/core';
import siteConfig from '../../../config';
@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.scss',
})
export class AppFooter {
  render() {
    const { footer } = siteConfig;
    return <go-footer dark={footer.isDark} links={footer.links}></go-footer>;
  }
}
