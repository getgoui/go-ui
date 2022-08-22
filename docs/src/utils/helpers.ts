import { Env } from '@stencil/core';

export function siteUrl(relativePath) {
  console.log(Env.baseUrl);
  let baseUrl = Env.baseUrl;
  if (!baseUrl.endsWith('/')) {
    baseUrl = `${baseUrl}/`;
  }
  return `${baseUrl}${relativePath}`;
}

export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
