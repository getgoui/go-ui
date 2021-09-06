import { pascalCase, sentenseCase } from './utils';
import prompts from 'prompts';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export default async function pattern(args) {
  const questions = [
    {
      type: 'text',
      name: 'patternName',
      message: 'Pattern name (dash-case):',
    },
    {
      type: 'confirm',
      name: 'createElement',
      message: 'Do you wish to encapsulate this pattern in a custom element?',
      initial: true,
    },
    {
      type: 'multiselect',
      name: 'tags',
      message: 'Pick tags for this pattern.',
      hint: '- Space to select. Return to submit',
      choices: [
        { title: 'Layout', value: 'Layout' },
        { title: 'Form', value: 'Form' },
        { title: 'A11y', value: 'A11y' },
      ],
    },
  ];

  const { patternName, createElement, tags } = await prompts(questions);
  await writeBoilerplate(patternName, createElement, tags);
}

/**
 * Get the boilerplate content and write them to the file.
 * @param {string} patternName  The tag name of the component.
 * @param {boolean} createElement  Whether to create a custom element to encapsulate this pattern.
 */
function writeBoilerplate(patternName, createElement, tags) {
  const tagName = patternName;
  const dir = `./src/patterns/${patternName}/`;
  const docsDir = `./docs/docs/patterns/`;
  // Create the directory if it doesn't exist.
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    // Create the demo directory if it doesn't exist.
    fs.mkdirSync(`${dir}demo/`);
    // Create the test directory if it doesn't exist.
    fs.mkdirSync(`${dir}test/`);
  }

  // create docs directory if it doesn't exist
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
  }

  if (createElement) {
    const fileContent = getComponentFileContent(tagName);
    // write the component file
    const filePath = path.resolve(dir, `${tagName}.tsx`);
    try {
      fs.writeFileSync(filePath, fileContent);
      console.log(chalk.green('√ Component file generated'));
    } catch (err) {
      console.error(chalk.red(err));
    }

    // write the style file
    const styleContent = getStyleContent(tagName);
    const stylePath = path.resolve(dir, `${tagName}.scss`);
    try {
      fs.writeFileSync(stylePath, styleContent);
      console.log(chalk.green('√ Style file generated'));
    } catch (err) {
      console.error(chalk.red(err));
    }
  }

  // write the readme file
  const readmeContent = getReadmeContent(tagName);
  const readmePath = path.resolve(dir, `${tagName}.md`);
  try {
    fs.writeFileSync(readmePath, readmeContent);
    console.log(chalk.green('√ README file generated'));
  } catch (err) {
    console.error(chalk.red(err));
  }

  // write the e2e test file
  const e2eTestContent = getE2eTestContent(tagName);
  const e2eTestPath = path.resolve(`${dir}/test/`, `${tagName}.e2e.ts`);
  try {
    fs.writeFileSync(e2eTestPath, e2eTestContent);
    console.log(chalk.green('√ E2E test file generated'));
  } catch (err) {
    console.error(chalk.red(err));
  }

  // write the demo html file
  const demoHtmlContent = getDemoHtmlContent(tagName);
  const demoHtmlPath = path.resolve(`${dir}/demo/`, `${tagName}.html`);
  try {
    fs.writeFileSync(demoHtmlPath, demoHtmlContent);
    console.log(chalk.green('√ Demo html file generated'));
  } catch (err) {
    console.error(chalk.red(err));
  }

  // write the docs file
  const docsContent = getDocsContent(tagName, tags);
  const docsPath = path.resolve(docsDir, `${tagName}.mdx`);
  try {
    fs.writeFileSync(docsPath, docsContent);
    console.log(chalk.green('√ Docs file generated'));
  } catch (err) {
    console.error(chalk.red(err));
  }
}

/**
 * Get a component file boilerplate.
 */
function getComponentFileContent(tagName) {
  return `import { Component, Host, h, Element } from '@stencil/core';

  @Component({
    tag: '${tagName}',
    styleUrl: '${tagName}.scss',
    shadow: false,
  })
  export class ${pascalCase(tagName)} {
    @Element() el: HTMLElement;

    render() {
      return (
        <Host>
          <slot></slot>
        </Host>
      );
    }

  }
`;
}

/**
 * Get the boilerplate for style.
 */
const getStyleContent = (tagname) =>
  `${tagname} {
  display: block;
}
`;

/**
 * Get the boilerplate for an E2E test.
 */
const getE2eTestContent = (name) =>
  `import { newE2EPage } from '@stencil/core/testing';

let html = '';
describe('${name}', () => {
  // Set up html content
  beforeAll(async () => {
    const fs = require('fs');
    const path = require('path');
    html = fs.readFileSync(path.resolve(__dirname, '../demo/${name}.html'), 'utf8');
  });

  it('renders', async () => {
    const page = await newE2EPage({html});
    const element = await page.find('${name}');
    expect(element).toHaveClass('hydrated');
  });


  it('passes automated a11y test', async () => {
    const page = await newE2EPage({ html });
    await expect(page).toPassA11y();
  });
});
`;

const getDemoHtmlContent = (name) => `
<${name}></${name}>
`;

const getReadmeContent = (tagname) => `## ${tagname} API

<!-- Auto Generated Below -->`;

const getTagsFrontmatter = (tags) => {
  if (!tags.length) {
    return '';
  }
  return `tags:
  - ${tags.join('\n  - ')}`;
};

const getDocsContent = (tagname, tags) => {
  const title = sentenseCase(tagname);
  return `---
title: ${title}
hide_title: true
${getTagsFrontmatter(tags)}
---

import Demo from '@/components/Demo';
import demoSource from '!!raw-loader!../../../src/patterns/${tagname}/demo/${tagname}.html';

# ${title}

<!-- Description -->

${title} is a pattern.

## When to use

-
-

## A11y

(Provide relevant a11y information here.)



## Related components
- [Component 1](../components/component-1)

<!-- Demos, tips, variations, use cases -->


## Demo

<Demo code={demoSource} />

<!-- API -->

{@include: ../../../src/patterns/${tagname}/readme.md}
`;
};
