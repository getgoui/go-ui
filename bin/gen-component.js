import { pascalCase, sentenseCase } from './utils';
import prompts from 'prompts';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export default async function component(args) {
  const questions = [
    {
      type: 'text',
      name: 'tagname',
      message: 'Component tag name (dash-case):',
      initial: 'go-',
    },
    {
      type: 'confirm',
      name: 'inheritAttrs',
      message: 'Inherit attributes from host element?',
      initial: true,
    },
  ];

  const { tagname, inheritAttrs } = await prompts(questions);
  await writeBoilerplate(tagname, inheritAttrs);
}

function createComponentFolders(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  // Create the demo directory if it doesn't exist.
  const usageDir = path.resolve(`${dir}/usage/`);
  if (!fs.existsSync(usageDir)) {
    fs.mkdirSync(usageDir);
  }
  // Create the test directory if it doesn't exist.
  const testDir = path.resolve(`${dir}/test/`);
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }
}

/**
 * Get the boilerplate content and write them to the file.
 * @param {string} tagName  The tag name of the component.
 * @param {boolean} inheritAttrs  Whether to inherit attributes from the host element.
 */
function writeBoilerplate(tagName, inheritAttrs) {
  const rootPath = '../packages/core';
  const dir = path.resolve(__dirname, `${rootPath}/src/components/${tagName}/`);
  // Create the directory if it doesn't exist.
  createComponentFolders(dir);

  const fileContent = getComponentFileContent(tagName, inheritAttrs);
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

  // write the readme file
  const readmeContent = getReadmeContent(tagName);
  const readmePath = path.resolve(dir, `readme.md`);
  try {
    fs.writeFileSync(readmePath, readmeContent);
    console.log(chalk.green('√ README file generated'));
  } catch (err) {
    console.error(chalk.red(err));
  }

  // write the spec test file
  const specTestContent = getSpecTestContent(tagName);
  const specTestPath = path.resolve(`${dir}/test/`, `${tagName}.spec.tsx`);
  try {
    fs.writeFileSync(specTestPath, specTestContent);
    console.log(chalk.green('√ Spec test file generated'));
  } catch (err) {
    console.error(chalk.red(err));
  }

  // write the demo html file
  const demoHtmlContent = getDemoHtmlContent(tagName);
  const demoHtmlPath = path.resolve(`${dir}/usage/`, `${tagName}.md`);
  try {
    fs.writeFileSync(demoHtmlPath, demoHtmlContent);
    console.log(chalk.green('√ Demo usage file generated'));
  } catch (err) {
    console.error(chalk.red(err));
  }
}

/**
 * Get a component file boilerplate.
 */
function getComponentFileContent(tagName, inheritAttrs) {
  return `import { Component, Host, h, Element } from '@stencil/core';
  ${
    inheritAttrs
      ? `
  import { inheritAttributes } from '../../utils/helper';`
      : ''
  }

  @Component({
    tag: '${tagName}',
    styleUrl: '${tagName}.scss',
    shadow: false,
  })
  export class ${pascalCase(tagName)} {
    @Element() el: HTMLElement;

   ${
     inheritAttrs
       ? `
    // Store attributes inherited from the host element
    private inheritedAttrs = {};
    componentWillLoad() {
      this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style'], false);
    }
    `
       : ''
   }
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
 * Get the boilerplate for a spec test.
 */
const getSpecTestContent = (tagName) =>
  `import { newSpecPage } from '@stencil/core/testing';
import { ${pascalCase(tagName)} } from '../${tagName}';
describe('${tagName}', () => {
 it('renders', async () => {
   const page = await newSpecPage({
     components: [${pascalCase(tagName)}],
     html: \`<${tagName}></${tagName}>\`,
   });
   expect(page.root).toBeTruthy();
 });
});
`;

const getDemoHtmlContent = (name) => `
<${name}></${name}>
`;

const getReadmeContent = (tagname) => {
  const title = sentenseCase(tagname.replace('go-', ''));
  return `---
title: ${title}
---

# ${title} <span class="text-size-0">\`${tagname}\`</span>

<!-- Description -->
<div class="text-size-1">
  ${title} is a Go UI component.
</div>

## Overview



## Accessibility

<!-- Provide relevant a11y information here. -->



<!-- Demos, tips, variations, use cases -->


## Demo

<demo-frame component="${tagname}" demo="${tagname}"></demo-frame>

<!-- Auto Generated Below -->
`;
};
