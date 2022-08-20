import { Component, h, Prop } from '@stencil/core';
import Helmet from '@stencil/helmet';
import siteConfig from '../../../config';
@Component({
  tag: 'seo-tags',
})
export class SeoTags {
  @Prop() pageTitle: string;
  @Prop() description: string = siteConfig.tagline;
  @Prop() image: string = siteConfig.logo;

  render() {
    const { pageTitle, description, image } = this;
    return (
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@seanwuapps" />
        <meta name="twitter:creator" content="@seanwuapps" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:src" content={image} />

        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />

        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Sean Wu" />
        <meta property="og:locale" content="en_AU" />
      </Helmet>
    );
  }
}
