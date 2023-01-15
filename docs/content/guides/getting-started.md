---
order: 1
---
# Getting started

## CDN

Easiest way to start playing with go-ui, just add these tags into your html.

```html

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@go-ui/core/dist/go-ui/go-ui.css" />
<script type="module" src='https://cdn.jsdelivr.net/npm/@go-ui/core/dist/go-ui/go-ui.esm.js'></script>

```

You can then start using any component or pattern, they will be lazy-loaded onto the page, for example:

```html

<go-md sanitise="true" md-options="{html: true}" src="//raw.githubusercontent.com/getgoui/go-ui/main/README.md">Fallback content.</go-md>

```


## Installation via package manager

::: info

Depending on your use case, you may want to install different packages under the `@go-ui/` namespace. See [integration](integration) docs for more details

:::

If you're not using any JS framework and just want to use the Go UI goodness with the power of the browser platform, you can absolutely do so!

Installation can be done with the `@go-ui/core` package which includes our component loaders and global stylesheet.

<go-tabs>
  <go-tab label="npm">

```bash
npm i @go-ui/core
```
  
  </go-tab>
  <go-tab label="pnpm">

```bash
pnpm add @go-ui/core
```
  
  </go-tab>
  <go-tab label="yarn">

```bash
yarn add @go-ui/core
```
  
  </go-tab>
</go-tabs>


## Importing Go UI

### Step 1. Import CSS

You need the global CSS file to provide the components with base CSS variables such as colors, shadows, spacings etc. 

This can be done via linking stylesheet (as shown above in CDN section) or various import methods depending on your build tools.

<go-tabs>

<go-tab label="JS">

```js
import '@go-ui/core/dist/go-ui/go-ui.css';
```

</go-tab>

<go-tab label="Sass/Scss">

```scss
@import '@go-ui/core/dist/go-ui/go-ui.css';
```

With Sass you get some options to choose what to import and overwrite, check out [Sass import options](theming/sass).

</go-tab>
</go-tabs>


### Step 2. Register components

Next we need to register our components for browsers to recognise them.

The following script will register all `go-*` custom elements in one go.

```js
import '@go-ui/core';
```

<!-- @todo test how tree shaking works in starter apps -->
<!-- @todo add example of registering single component -->


## Usage

At this point the go-ui components are available to be consumed. Check out our docs on [patterns](/docs/patterns) and [components](/docs/components) for code examples, demos and APIs.


## Browser support

Go UI supports latest 2 major versions of all modern browsers (and more), [view the list of supported browsers](https://browserslist.dev/?q=PiAwLjUlLCBsYXN0IDIgbWFqb3IgdmVyc2lvbnMsIG5vdCBkZWFkLCBDaHJvbWUgPj0gNjAsIEZpcmVmb3ggPj0gNjAsIEZpcmVmb3ggRVNSLCBpT1MgPj0gMTIsIFNhZmFyaSA%2BPSAxMiwgbm90IGllID4gMCwgbm90IG9wX21pbmkgYWxs) or see our `.browserslistrc` [source file](https://github.com/getgoui/go-ui/blob/main/.browserslistrc) (this covers 94% of overall browser usage). 

::: critical  No IE support

Please note that Go UI does not support IE or non-chromium Edge. This is a conscious decision to help us concentrate on serving the best experiences to the majority of users while reducing a ton of efforts required to support legacy browsers.

:::
