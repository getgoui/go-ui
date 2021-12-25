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

/**
 * Get the boilerplate content and write them to the file.
 * @param {string} tagName  The tag name of the component.
 * @param {boolean} inheritAttrs  Whether to inherit attributes from the host element.
 */
function writeBoilerplate(tagName, inheritAttrs) {
  const rootPath = path.resolve(__dirname, '../');
  const dir = `${rootPath}/src/components/${tagName}/`;
  const docsDir = `${rootPath}/docs/docs/components/`;
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
  const readmePath = path.resolve(dir, `${tagName}.md`);
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
  const demoHtmlPath = path.resolve(`${dir}/demo/`, `${tagName}.html`);
  try {
    fs.writeFileSync(demoHtmlPath, demoHtmlContent);
    console.log(chalk.green('√ Demo html file generated'));
  } catch (err) {
    console.error(chalk.red(err));
  }

  // write the docs file
  const docsContent = getDocsContent(tagName);
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
function getComponentFileContent(tagName, inheritAttrs) {
  return `import { Component, Host, h, Element } from '@stencil/core';

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
    private interitedAttributes = {};
    componentWillLoad() {
      this.interitedAttributes = inheritAttributes(this.button, ['aria-checked']);
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
   expect(page.root).toEqualHtml(\`
     <${tagName}>
       <mock:shadow-root>
         <slot></slot>
       </mock:shadow-root>
     </${tagName}>
   \`);
 });
});
`;

const getDemoHtmlContent = (name) => `
<${name}></${name}>
`;

const getReadmeContent = (tagname) => `## ${tagname} API

<!-- Auto Generated Below -->`;

const getDocsContent = (tagname) => {
  const title = sentenseCase(tagname.replace('go-', ''));
  return `---
title: ${title}
hide_title: true
---

import Demo from '@/components/Demo';
import demoSource from '!!raw-loader!@/go-ui/components/${tagname}/demo/${tagname}.html';

# ${title} <span class="text-size-0">\`${tagname}\`</span>

<!-- Description -->
<div class="text-size-1">
  ${title} is a component in Go UI.
</div>

## When to use

-
-

## A11y

(Provide relevant a11y information here.)



## Related patterns

<!-- Patterns that uses this component -->

- [Pattern 1](#)
- [Pattern 2](#)

<!-- Demos, tips, variations, use cases -->


## Demo

<Demo code={demoSource} />

<!-- API -->

{@include: ../../../src/components/${tagname}/readme.md}
`;
};
