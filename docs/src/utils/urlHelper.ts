import siteConfig from '../../config';

export const siteUrl = relativePath => {
  let baseUrl = siteConfig.baseUrl;
  if (!baseUrl.endsWith('/')) {
    baseUrl = `${baseUrl}/`;
  }
  return `${baseUrl}${relativePath}`;
};
