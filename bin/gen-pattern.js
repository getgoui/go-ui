import prompts from "prompts";
import fs from "fs";
import path, { dirname } from "path";
import chalk from "chalk";
import kebabCase from "lodash.kebabcase";
import { pascalCase, sentenseCase } from "./utils";
import { PATTERN_PREFIX } from "./const.js";

export default async function pattern(args) {
  const questions = [
    {
      type: "text",
      name: "patternName",
      message: "Pattern name (dash-case):",
    },
    {
      type: "confirm",
      name: "createElement",
      message: "Do you wish to encapsulate this pattern in a custom element?",
      initial: true,
    },
    {
      type: "multiselect",
      name: "tags",
      message: "Pick tags for this pattern.",
      hint: "- Space to select. Return to submit",
      choices: [
        { title: "Layout", value: "Layout" },
        { title: "Navigation", value: "Navigation" },
        { title: "Form", value: "Form" },
        { title: "A11y", value: "A11y" },
        { title: "Utility", value: "Utility" },
        { title: "Global styles", value: "Global styles" },
      ],
    },
  ];

  const { patternName, createElement, tags } = await prompts(questions);
  await writeBoilerplate(kebabCase(patternName), createElement, tags);
}

/**
 * Get the boilerplate content and write them to the file.
 * @param {string} patternName  The tag name of the component.
 * @param {boolean} createElement  Whether to create a custom element to encapsulate this pattern.
 */
function writeBoilerplate(patternName, createElement, tags) {
  const tagName = getTagName(patternName);
  const rootPath = path.resolve(__dirname, "../");
  const dir = `${rootPath}/packages/core/src/patterns/${patternName}/`;
  const docsDir = `${rootPath}/docs/docs/patterns/`;
  // Create the directory if it doesn't exist.
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir);
      // Create the demo directory if it doesn't exist.
      fs.mkdirSync(`${dir}demo/`);
      // Create the test directory if it doesn't exist.
      fs.mkdirSync(`${dir}test/`);
    } catch (e) {
      console.log(chalk.red(`Could not create new directory ${dir}`));
      console.error(e);
      return;
    }
  }

  // create docs directory if it doesn't exist
  if (!fs.existsSync(docsDir)) {
    try {
      fs.mkdirSync(docsDir);
    } catch (e) {
      console.log(chalk.red(`Could not create new directory ${docsDir}`));
      console.error(e);
      return;
    }
  }

  if (createElement) {
    const fileContent = getComponentFileContent(tagName);
    // write the component file
    const filePath = path.resolve(dir, `${tagName}.tsx`);
    try {
      fs.writeFileSync(filePath, fileContent);
      console.log(chalk.green("√ Component file generated"));
    } catch (err) {
      console.error(chalk.red(err));
    }

    // write the style file
    const styleContent = getStyleContent(tagName);
    const stylePath = path.resolve(dir, `${tagName}.scss`);
    try {
      fs.writeFileSync(stylePath, styleContent);
      console.log(chalk.green("√ Style file generated"));
    } catch (err) {
      console.error(chalk.red(err));
    }

    // write the readme file
    const readmeContent = getReadmeContent(patternName);
    const readmePath = path.resolve(dir, `readme.md`);
    try {
      fs.writeFileSync(readmePath, readmeContent);
      console.log(chalk.green("√ README file generated"));
    } catch (err) {
      console.error(chalk.red(err));
    }
  }

  // write the e2e test file
  const e2eTestContent = getE2eTestContent(patternName, createElement);
  const e2eTestPath = path.resolve(`${dir}/test/`, `${patternName}.e2e.ts`);
  try {
    fs.writeFileSync(e2eTestPath, e2eTestContent);
    console.log(chalk.green("√ E2E test file generated"));
  } catch (err) {
    console.error(chalk.red(err));
  }

  // write the demo html file
  const demoHtmlContent = getDemoHtmlContent(patternName, createElement);
  const demoHtmlPath = path.resolve(`${dir}/demo/`, `${patternName}.html`);
  try {
    fs.writeFileSync(demoHtmlPath, demoHtmlContent);
    console.log(chalk.green("√ Demo html file generated"));
  } catch (err) {
    console.error(chalk.red(err));
  }

  // write the docs file
  const docsContent = getDocsContent(patternName, tags, createElement);
  const docsPath = path.resolve(docsDir, `${patternName}.mdx`);
  try {
    fs.writeFileSync(docsPath, docsContent);
    console.log(chalk.green("√ Docs file generated"));
  } catch (err) {
    console.error(chalk.red(err));
  }
}

// get dash-case tag name from given pattern name
// if pattern name doesn't start with go-, prepend go-
const getTagName = (patternName) => {
  if (!patternName.startsWith(PATTERN_PREFIX)) {
    patternName = PATTERN_PREFIX + patternName;
  }
  return patternName;
};

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
const getE2eTestContent = (name, createElement) =>
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
    const element = await page.find('${
      createElement ? name : ".random-target"
    }');
    ${
      createElement
        ? 'expect(element).toHaveClass("hydrated");'
        : "expect(element).toBeTruthy();"
    }
  });


  it('passes automated a11y test', async () => {
    const page = await newE2EPage({ html });
    await expect(page).toPassA11y();
  });
});
`;

const getDemoHtmlContent = (name, createElement) => {
  return createElement
    ? `<${name}></${name}>`
    : `<!-- Pattern html here -->
<div class="random-target"></div>`;
};

const getReadmeContent = (tagname) => `## ${tagname} API

<!-- Auto Generated Below -->`;

const getTagsFrontmatter = (tags) => {
  if (!tags.length) {
    return "";
  }
  return `tags:
  - ${tags.join("\n  - ")}`;
};

const getDocsContent = (patternName, tags, createElement) => {
  const title = sentenseCase(patternName);
  return `---
title: ${title}
hide_title: true
hide_table_of_contents: true
${getTagsFrontmatter(tags)}
---

import Demo from '@/components/Demo';
import demoSource from '!!raw-loader!@/go-ui/patterns/${patternName}/demo/${patternName}.html';

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
${
  createElement
    ? `
<!-- API -->

{@include: ../../../src/patterns/${patternName}/readme.md}
`
    : ""
}
`;
};
