---
order: 1
---
# Getting started

## Installation

Depending on your use case, you may want to install different packages under the `@go-ui/` namespace. 

### Vanilla JS 

If you're not using any JS framework and just want to use the Go UI goodness with the power of the browser platform, you can absolutely do so!

Installation can be done with the `@go-ui/core` package which includes our component loaders and global stylesheet.

```bash
npm i @go-ui/core
```

Other packages are wrappers for this with framework-friendly syntax.


## Importing components into your app

```js
import '@go-ui/core/dist/go-ui/go-ui.css';
import { defineCustomElements } from '@go-ui/core/dist/loader';
defineCustomElements();
```

## Framework setup

You can use our patterns and components within your preferred JavaScript framework or *no framework at all* 

- [Angular](./integration/angular)
- [React](./integration/react)
- [Vue](./integration/vue)
- [No framework](./integration/no-framework)
<!-- [Suggest another integration] -->

## Browser support

Go UI supports latest 2 major versions of all modern browsers (and more), [view the list of supported browsers](https://browserslist.dev/?q=PiAwLjUlLCBsYXN0IDIgbWFqb3IgdmVyc2lvbnMsIG5vdCBkZWFkLCBDaHJvbWUgPj0gNjAsIEZpcmVmb3ggPj0gNjAsIEZpcmVmb3ggRVNSLCBpT1MgPj0gMTIsIFNhZmFyaSA%2BPSAxMiwgbm90IGllID4gMCwgbm90IG9wX21pbmkgYWxs) or see our `.browserslistrc` [source file](https://github.com/getgoui/go-ui/blob/main/.browserslistrc) (this covers 94% of overall browser usage). 

::: critical  No IE support

Please note that Go UI does not support IE or non-chromium Edge. This is a conscious decision to help us concentrate on serving the best experiences to the majority of users while reducing a ton of efforts required to support legacy browsers.

:::
