import MarkdownIt from 'markdown-it';
// @ts-ignore
import meta from 'markdown-it-meta';
// @ts-ignore
import MarkdownItTitle from 'markdown-it-title';
// import { any } from '@go-ui/core/dist/types/interfaces';
// import { goUiPlugin } from '@go-ui/core';
import ia from '../ia/generated-ia';
import { IAItem } from '../ia/ia.interface';

export const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(meta)
  .use(MarkdownItTitle);
// .use(goUiPlugin);

export function getDocsPrefix() {
  return siteConfig?.docsRoutePrefix ? siteConfig.docsRoutePrefix : 'docs/';
}

export function removeLeadingSlash(str: string): string {
  if (!str) {
    return str;
  }
  return str.replace(/^\/+/, '');
}

export function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const href = (url?: string) => {
  if (!url) {
    return null;
  }
  return {
    href: url,
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      navigateTo(url);
    },
  };
};

// sidebar helpers

export function buildSidebarItemUrl(component: any, withPrefix = true): string {
  return component?.filePath
    ? component.filePath
        .substring(0, component.filePath.lastIndexOf('/'))
        .replace('./src/', withPrefix ? getDocsPrefix() : '')
    : '';
}

export function buildSidebar(): IAItem[] {
  const route = useRoute();
  const prefix = getDocsPrefix();
  const activePath = removeLeadingSlash(route.fullPath.replace(prefix, ''));
  const activeCategory = activePath.split('/')[0]; // patterns/components
  const cat = ia.docs.children.find((category) => category.id === activeCategory);
  if (!cat?.children) {
    return [];
  }
  const sidebar = cat.children as unknown as IAItem[];
  return applyRouterLink(sidebar);
}

function applyRouterLink(iaItems: IAItem[]): any[] {
  return iaItems.map((item: IAItem) => ({
    ...item,
    linkAttrs: {
      ...href(item.url),
    },
    children: item.children && item.children.length > 0 ? applyRouterLink(item.children) : null,
  }));
}

// code helper
export function executeScriptElements(containerElement: HTMLElement) {
  const scriptElements = containerElement.querySelectorAll('script') as NodeListOf<HTMLScriptElement>;

  Array.from(scriptElements).forEach((scriptElement) => {
    const clonedElement = document.createElement('script');

    Array.from(scriptElement.attributes).forEach((attribute) => {
      clonedElement.setAttribute(attribute.name, attribute.value);
    });

    clonedElement.text = scriptElement.text;

    scriptElement.parentNode?.replaceChild(clonedElement, scriptElement);
  });
}

export function buildContentPageSidebar(iaItems: any[], currentPath: string): any[] {
  return iaItems.map((item) => {
    const isCurrent = currentPath.includes(item.url);
    if (item.children) {
      return {
        ...item,
        label: item.label,
        isCurrent,
        linkAttrs: { ...href(item.url) },
        children: buildContentPageSidebar(item.children, currentPath),
      };
    }
    return {
      ...item,
      label: item.label,
      isCurrent,
      linkAttrs: { ...href(item.url) },
    };
  });
}

export async function loadContentByPath(path: string): Promise<IAItem | undefined> {
  let cleanPath = removeLeadingSlash(path);
  let parts = cleanPath.split('/');
  if (parts.length < 1) {
    return;
  }
  const rootIaItem = (ia as any)[parts[0]];

  return findMatchingItem(rootIaItem, `/${cleanPath}`);
}

function findMatchingItem(obj: { url: any; children: any }, url: string): any {
  if (!obj) return null; // Return null if the object is falsy (e.g. null, undefined)
  if (obj.url === url) return obj; // Return the object if the url property matches

  // If the object has children, search for a match in each child
  if (obj.children) {
    for (const child of obj.children) {
      const result = findMatchingItem(child, url);
      if (result) {
        return result; // Return the result if a match was found
      }
    }
  }

  // Return null if no match was found in this object or its children
  return null;
}

export function findIaItemByPath(iaCategory: { url: any; children: any }, path: any): any {
  if (!iaCategory) return null; // Return null if the iaCategoryect is falsy (e.g. null, undefined)
  if (iaCategory.url === path) return iaCategory; // Return the iaCategoryect if the url property matches

  // If the iaCategoryect has children, search for a match in each child
  if (iaCategory.children) {
    for (const child of iaCategory.children) {
      const result = findIaItemByPath(child, path);
      if (result) return result; // Return the result if a match was found
    }
  }

  // Return null if no match was found in this object or its children
  return null;
}
