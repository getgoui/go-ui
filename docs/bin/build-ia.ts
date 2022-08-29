#!/usr/bin/env ts-node
import path from 'path';
import { createSpinner } from 'nanospinner';

import MarkdownIt from 'markdown-it';
import meta from 'markdown-it-meta';
import MarkdownItTitle from 'markdown-it-title';
import { goUiPlugin } from '@go-ui/core';

import fs from 'fs';
import { INavItem } from '@go-ui/core/dist/types/interfaces';
import dirTree from 'directory-tree';

import startCase from 'lodash.startcase';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(meta)
  .use(goUiPlugin)
  .use(MarkdownItTitle);

interface IA {
  [category: string]: INavItem[];
}

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

  const ia = categorise(toNavItems(contentDir.children));

  try {
    const content = `export default ${JSON.stringify(ia, null, 2)}`;
    fs.writeFileSync(iAFile, content);
    spinner.success();
  } catch (err) {
    spinner.error();
  }
}

function toNavItems(array) {
  return array.map(item => {
    if (item.type === 'file') {
      return {
        id: item.id,
        label: item['label'],
        url: item['url'],
        meta: item['meta'],
        description: item['description'],
        content: item['content'],
      };
    }

    // dir
    const dirName = item.name;
    const rootContent = item.children.find(item => item.id === 'index');
    const trueChildren = item.children.filter(child => child.id !== 'index');
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

function categorise(navItems) {
  let results = {};
  navItems.forEach(rootItem => {
    results[rootItem.id] = rootItem;
  });
  return results;
}

generateIA();
