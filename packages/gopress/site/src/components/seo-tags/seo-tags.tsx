import { Component, h, Prop } from '@stencil/core';
import Helmet from '@stencil/helmet';
import siteConfig from '../../../config';
@Component({
  tag: 'seo-tags',
})
export class SeoTags {
  @Prop() pageTitle: string;
  @Prop() description: string = siteConfig.tagline;
  @Prop() image: string = siteConfig.logoSocial;

  render() {
    const { pageTitle, description, image } = this;
    const imgUrl = window.location.protocol + '//' + window.location.host + image;
    return (
      <Helmet>
        <title>{pageTitle ? `${pageTitle} | ${siteConfig.name}` : siteConfig.name}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteConfig.social.twitter} />
        <meta name="twitter:creator" content={siteConfig.social.twitter} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imgUrl} />
        <meta name="twitter:image:src" content={imgUrl} />

        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />

        <meta property="og:image" content={imgUrl} />
        <meta property="og:image:url" content={imgUrl} />
        <meta property="og:image:secure_url" content={imgUrl} />
        <meta property="og:image:alt" content={siteConfig.name + ' logo'} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={siteConfig.name} />
      </Helmet>
    );
  }
}
