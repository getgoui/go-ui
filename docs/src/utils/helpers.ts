import { Env } from '@stencil/core';
import siteConfig from '../../config';
import docs, { JsonDocsComponent } from '@go-ui/core/dist/docs/go-ui';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { href } from 'stencil-router-v2';
import Router from '../router';
import { uniqBy } from 'lodash-es';

export function getDocsPrefix() {
  return siteConfig?.docsRoutePrefix ? siteConfig.docsRoutePrefix : 'docs/';
}

export function removeLeadingSlash(str: string): string {
  if (str && str.startsWith('/')) {
    return str.substring(1);
  }
  return str;
}

export function siteUrl(relativePath: string): string {
  let baseUrl = Env.baseUrl;
  if (!baseUrl.endsWith('/')) {
    baseUrl = `${baseUrl}/`;
  }

  return `${baseUrl}${removeLeadingSlash(relativePath)}`;
}

export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// sidebar helpers

export function buildSidebarItemUrl(comp: JsonDocsComponent, withPrefix = true): string {
  return comp.filePath.substring(0, comp.filePath.lastIndexOf('/')).replace('./src/', withPrefix ? getDocsPrefix() : '');
}

export function buildSidebar(): INavItem[] {
  const prefix = getDocsPrefix();
  const activePath = Router.activePath.replace(prefix, '');
  let sidebar = docs.components
    .map((comp: JsonDocsComponent) => {
      const path = buildSidebarItemUrl(comp, false);
      const parents = path.split('/');
      parents.pop();
      const category = parents[0]; // patterns/components

      const url = siteUrl(prefix + path);
      return {
        url,
        label: siteConfig.sidebar.tagToLabel(comp.tag),
        linkAttrs: {
          ...href(url),
        },
        category,
        path,
        parents,
        parentKey: parents.join('.'),
      };
    })
    .filter(item => activePath.includes(item.category)); //only relevant to current category

  sidebar = uniqBy(sidebar, 'url'); // no duplicated urls
  return sidebar;
}

// code helper
export function executeScriptElements(containerElement) {
  const scriptElements = containerElement.querySelectorAll('script') as NodeListOf<HTMLScriptElement>;

  Array.from(scriptElements).forEach(scriptElement => {
    const clonedElement = document.createElement('script');

    Array.from(scriptElement.attributes).forEach(attribute => {
      clonedElement.setAttribute(attribute.name, attribute.value);
    });

    clonedElement.text = scriptElement.text;

    scriptElement.parentNode.replaceChild(clonedElement, scriptElement);
  });
}

export function prepareNavItems(items: INavItem[], activePath: string): INavItem[] {
  return items.map(item => {
    const cleanPathname = removeLeadingSlash(activePath);
    const cleanUrl = removeLeadingSlash(item?.url);
    const isCurrent = cleanPathname.includes(cleanUrl);
    return {
      ...item,
      linkAttrs: { ...href(item.url) },
      isCurrent,
    };
  });
}
