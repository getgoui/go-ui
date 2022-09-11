import { Env } from '@stencil/core';
import siteConfig from '../../config';
import MarkdownIt from 'markdown-it';
import meta from 'markdown-it-meta';
import MarkdownItTitle from 'markdown-it-title';
import { JsonDocsComponent } from '@go-ui/core/dist/docs/go-ui';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import { href } from 'stencil-router-v2';
import Router from '../router';
import { goUiPlugin } from '@go-ui/core';
import ia from '../generated-ia';
import { IAItem } from '../ia.interface';

export const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(meta)
  .use(MarkdownItTitle)
  .use(goUiPlugin);

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
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// sidebar helpers

export function buildSidebarItemUrl(comp: JsonDocsComponent, withPrefix = true): string {
  return comp.filePath.substring(0, comp.filePath.lastIndexOf('/')).replace('./src/', withPrefix ? getDocsPrefix() : '');
}

export function buildSidebar(): IAItem[] {
  const prefix = getDocsPrefix();
  const activePath = removeLeadingSlash(Router.activePath.replace(prefix, ''));
  const activeCategory = activePath.split('/')[0]; // patterns/components

  const cat = ia.docs.children.find((category) => category.id === activeCategory);
  const sidebar = cat.children as IAItem[];
  return applyRouterLink(sidebar);
}

function applyRouterLink(iaItems: IAItem[]) {
  return iaItems.map((item) => ({
    ...item,
    linkAttrs: {
      ...href(item.url),
    },
    children: item.children?.length > 0 ? applyRouterLink(item.children) : null,
  }));
}

// code helper
export function executeScriptElements(containerElement) {
  const scriptElements = containerElement.querySelectorAll('script') as NodeListOf<HTMLScriptElement>;

  Array.from(scriptElements).forEach((scriptElement) => {
    const clonedElement = document.createElement('script');

    Array.from(scriptElement.attributes).forEach((attribute) => {
      clonedElement.setAttribute(attribute.name, attribute.value);
    });

    clonedElement.text = scriptElement.text;

    scriptElement.parentNode.replaceChild(clonedElement, scriptElement);
  });
}

export function prepareNavItems(items: INavItem[], activePath: string): INavItem[] {
  return items.map((item) => {
    const cleanPathname = removeLeadingSlash(activePath);
    const cleanUrl = removeLeadingSlash(item?.url);
    const isCurrent = cleanPathname.includes(cleanUrl);
    if (item.children?.length > 0) {
      return {
        ...item,
        label: item.label,
        linkAttrs: { ...href(item.url) },
        isCurrent,
        children: prepareNavItems(item.children, activePath),
      };
    }
    return {
      ...item,
      label: item.label,
      linkAttrs: { ...href(item.url) },
      isCurrent,
    };
  });
}

export function buildContentPageSidebar(iaItems: INavItem[]): INavItem[] {
  return iaItems.map((item) => {
    if (item.children) {
      return {
        ...item,
        linkAttrs: { ...href(item.url) },
        children: buildContentPageSidebar(item.children),
      };
    }
    return {
      ...item,
      linkAttrs: { ...href(item.url) },
    };
  });
}

export async function loadContentByPath(path: string): Promise<IAItem> {
  let cleanPath = removeLeadingSlash(path);
  let parts = cleanPath.split('/');
  if (parts.length < 1) {
    return;
  }
  let targetItem = ia[parts[0]];
  let targetGroup = targetItem?.children;
  if (targetGroup) {
    for (let i = 1; i < parts.length; i++) {
      const key = parts[i];
      targetItem = targetGroup.find((item) => item.id === key);
      if (targetItem?.children) {
        targetGroup = targetItem.children;
      }
    }
  }
  return targetItem;
}

export type Theme = 'light' | 'dark';

export function getCurrentTheme(): Theme {
  let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('go-ui-theme');
  if (storedTheme) {
    isDark = storedTheme === 'dark';
  }
  return isDark ? 'dark' : 'light';
}
