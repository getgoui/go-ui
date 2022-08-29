#!/usr/bin/env ts-node
import path from 'path';
import { createSpinner } from 'nanospinner';

import MarkdownIt from 'markdown-it';
import meta from 'markdown-it-meta';
import MarkdownItTitle from 'markdown-it-title';
import { goUiPlugin } from '@go-ui/core';

import fs from 'fs';
import { IA, IAItem } from '../src/ia.interface';
import dirTree from 'directory-tree';
import startCase from 'lodash.startcase';
import sortBy from 'lodash.sortby';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function(str, lang) {
    return '<pre class="d-none"></pre><code-block code="' + md.utils.escapeHtml(str) + '" language="' + lang + '"></code-block>';
  },
})
  .use(meta)
  .use(goUiPlugin)
  .use(MarkdownItTitle);

/**
 * go through content folder and generate sidebar based on frontmatter
 */
const rootPath = path.resolve(__dirname, '..');
const contentPath = path.resolve(`${rootPath}/content`);
const srcPath = path.resolve(`${rootPath}/src`);
const iAFile = `${srcPath}/generated-ia.ts`;

async function generateIA(): Promise<void> {
  const spinner = createSpinner('Reading content folder').start();
  const contentDir = dirTree(
    contentPath,
    {
      extensions: /\.(md)$/,
      attributes: ['type'],
    },
    (item, path) => {
      let url = path.replace(contentPath, '').replace(/\\/g, '/');
      url = url.substring(0, url.lastIndexOf('.')); // remove file extensions
      if (url.endsWith('/index')) {
        url = url.substring(0, url.lastIndexOf('/')); // remove /index
      }

      (item as any).url = url;
      const id = item.name.substring(0, item.name.lastIndexOf('.'));

      const str = fs.readFileSync(path, 'utf8');
      md['meta'] = null; // reset meta for each file
      let env = { title: '', excerpt: [] };
      const content = md.render(str, env);
      const meta = (md as any).meta;
      (item as any).meta = meta;
      (item as any).label = meta?.title || env.title || startCase(id);
      (item as any).description = env.excerpt[0];
      (item as any).content = content;
      (item as any).id = id;
    },
  );

  const ia = categorise(sortNavItems(toNavItems(contentDir.children)));

  try {
    const content = `export default ${JSON.stringify(ia, null, 2)}`;
    fs.writeFileSync(iAFile, content);
    spinner.success();
  } catch (err) {
    spinner.error();
  }
}

const isIndexItem = (item: IAItem): boolean => item.id === 'index';

function toNavItems(array): IAItem[] {
  return array.map(item => {
    const isIndex = isIndexItem(item);
    if (item.type === 'file') {
      return {
        id: item.id,
        label: item['label'],
        url: item['url'],
        meta: item['meta'],
        description: item['description'],
        content: item['content'],
        isIndex: isIndex,
      };
    }

    // dir
    const dirName = item.name;
    const rootContent = item.children.find(isIndexItem);
    const trueChildren = item.children.filter(item => !isIndexItem(item));
    if (!rootContent) {
      return {
        id: dirName,
        label: startCase(dirName),
        children: toNavItems(trueChildren),
      };
    }
    return {
      ...rootContent,
      id: dirName,
      children: toNavItems(trueChildren),
    };
  });
}

function sortNavItems(array: IAItem[]): IAItem[] {
  let result = sortBy(array, [item => !item.isIndex, 'meta.order', 'label']);
  return result.map(item =>
    item.children?.length > 0
      ? {
          ...item,
          children: sortNavItems(item.children),
        }
      : item,
  );
}

function categorise(navItems: IAItem[]): IA {
  let results = {};
  navItems.forEach(rootItem => {
    results[rootItem.id] = rootItem;
  });
  return results;
}

generateIA();
