#!/usr/bin/env ts-node
import path from 'path';
import { createSpinner } from 'nanospinner';

import MarkdownIt from 'markdown-it';
import meta from 'markdown-it-meta';
import MarkdownItTitle from 'markdown-it-title';
import { goUiPlugin } from '@go-ui/core';

import fs from 'fs';
import util from 'util';
import dirTree from 'directory-tree';
import startCase from 'lodash.startcase';
import sortBy from 'lodash.sortby';
import groupBy from 'lodash.groupby';
import uniqBy from 'lodash.uniqby';
import chokidar from 'chokidar';
import chalk from 'chalk';

import { JsonDocsComponent } from '@go-ui/core/dist/docs/go-ui';
import { IA, IAItem } from '../src/ia.interface';
import siteConfig from '../config';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
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

const isIndexItem = (item: IAItem): boolean => item.id === 'index';
const getContentEditUrl = (item) => siteConfig.repoLink.url + '/blob/main/docs/content' + item.url + '.md';
function toNavItems(array): IAItem[] {
  return array.map((item) => {
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
        editUrl: item['editUrl'],
      };
    }

    // dir
    const dirName = item.name;
    const rootContent = item.children.find(isIndexItem);
    const trueChildren = item.children.filter((item) => !isIndexItem(item));
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
  let result = sortBy(array, [(item) => !item.isIndex, 'meta.order', 'label']);
  return result.map((item) =>
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
  navItems.forEach((rootItem) => {
    results[rootItem.id] = rootItem;
  });
  return results;
}

function removeExt(filename: string): string {
  return filename.substring(0, filename.lastIndexOf('.'));
}

export function getDocsPrefix() {
  return siteConfig?.docsRoutePrefix ? siteConfig.docsRoutePrefix : 'docs/';
}

function buildSidebarItemUrl(comp: JsonDocsComponent, withPrefix = true): string {
  return comp.filePath.substring(0, comp.filePath.lastIndexOf('/')).replace('./src/', withPrefix ? getDocsPrefix() : '');
}
function parseCompDocs(components: JsonDocsComponent[]): IAItem[] {
  const iaItems = components.map((comp) => {
    let url = '/' + buildSidebarItemUrl(comp);
    md['meta'] = null; // reset meta for each file
    let env = { title: '', excerpt: [] };
    try {
      const content = md.render(comp?.readme || `---\ntitle: ${comp.tag}\n---\n\n`, env);
      const meta = md.meta;
      const editUrl = siteConfig.repoLink.url + '/edit/main/packages/core/src/' + buildSidebarItemUrl(comp, false) + '/readme.md';
      return {
        url: url,
        directory: path.dirname(comp.filePath),
        meta: meta,
        label: meta?.title || env.title || siteConfig.sidebar.tagToLabel(comp.tag),
        description: env.excerpt[0],
        content: content,
        id: comp.tag,
        editUrl,
        component: {
          slots: {
            [comp.tag]: comp.slots,
          },
          props: {
            [comp.tag]: comp.props,
          },
          styles: comp.styles,
          methods: comp.methods,
          events: comp.events,
          listeners: comp.listeners,
        },
      } as IAItem;
    } catch (error) {
      console.log('error parsing component docs');
      console.log(comp.readme);
    }
  });

  const result = [] as IAItem[];
  iaItems.forEach((iaItem) => {
    // check if component with same directory exists
    // if so, add props, slots etc to parent
    const parentItem = result.find((item) => item.directory === iaItem.directory);
    if (parentItem) {
      // map props into parent item
      parentItem.component.props[iaItem.id] = iaItem.component.props[iaItem.id];
      return;
    }
    result.push(iaItem);
  });
  return result;
}

function parseContents() {
  const contentDir = dirTree(
    contentPath,
    {
      extensions: /\.(md)$/,
      attributes: ['type'],
    },
    (item, path) => {
      let url = path.replace(contentPath, '').replace(/\\/g, '/');
      url = removeExt(url); // remove file extensions
      if (url.endsWith('/index')) {
        url = url.substring(0, url.lastIndexOf('/')); // remove /index
      }

      (item as any).url = url;
      const id = removeExt(item.name);

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
      (item as any).editUrl = getContentEditUrl(item);
    },
  );
  return toNavItems(contentDir.children);
}

function mergeTree(to: IAItem[], from: IAItem[]): IAItem[] {
  // console.log('===============FROM==================');
  // console.log(JSON.stringify(from, null, 2));
  // console.log('===============TO==================');
  // console.log(JSON.stringify(to, null, 2));
  return to.concat(from);
}

function mergeDocs(contentItems: IAItem[], componentDocs: IAItem[]): IAItem[] {
  const categorisedComps = componentDocs.map((comp) => {
    const category = comp.url.split('/')[2];
    return {
      ...comp,
      category,
    };
  });
  const groups = groupBy(categorisedComps, 'category');

  let docsIndex = contentItems.findIndex((item) => item.id === 'docs');
  if (docsIndex === -1) {
    contentItems.push({
      id: 'docs',
      label: 'Docs',
      content: '',
      children: [],
    });
  }
  docsIndex = contentItems.findIndex((item) => item.id === 'docs');
  Object.keys(groups).forEach((category) => {
    const subDocs = groups[category];
    let categoryIndex = contentItems[docsIndex].children.findIndex((item) => item.id === category);
    if (categoryIndex === -1) {
      contentItems[docsIndex].children.push({
        id: category,
        label: startCase(category),
        content: '',
        children: [],
      });
    }
    categoryIndex = contentItems[docsIndex].children.findIndex((item) => item.id === category);
    contentItems[docsIndex].children[categoryIndex].children = mergeTree(contentItems[docsIndex].children[categoryIndex].children, subDocs);
  });

  return contentItems;
}

const docsFile = path.resolve(__dirname + '/../node_modules/@go-ui/core/dist/docs/go-ui.json');

const readFile = util.promisify(fs.readFile);

async function generateIA(): Promise<void> {
  const spinner = createSpinner('Reading content folder').start();
  const content = parseContents();
  const docsRaw = await readFile(docsFile, 'utf8');
  const docs = JSON.parse(docsRaw.toString());
  const componentDocs = parseCompDocs(docs.components);
  const combinedItems = mergeDocs(content, componentDocs);
  const ia = categorise(sortNavItems(combinedItems));

  try {
    const content = `export default ${JSON.stringify(ia, null, 2)}`;
    fs.writeFileSync(iAFile, content);
    spinner.success({ text: 'IA generated!', mark: '✅' });
  } catch (err) {
    spinner.error();
  }
}

generateIA();

if (process.argv.includes('--watch')) {
  console.log(chalk.green('Start watching IA...'));
  const watcher = chokidar
    .watch([path.resolve(__dirname + '/../node_modules/@go-ui/core/dist/docs/go-ui.json'), path.resolve(__dirname + '/../content/**/*')], {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: true,
    })
    .on('all', (event, file) => {
      console.log(chalk.yellow(`${file} changed`));
      generateIA();
    });
  process.on('SIGINT', function () {
    watcher.close();
    console.log(chalk.green('Stopped watching IA...'));
  });
}
