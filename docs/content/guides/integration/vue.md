---
order: 2
title: Vue
---

# Vue integration

The `@go-ui/vue` package provides a wrapper library for easy integration with Vue 3 projects. Here's how you can use it.

## Starter template

Example starter template can be viewed at [this codesandbox](https://codesandbox.io/p/sandbox/distracted-villani-k2rs0o?file=%2Fpackage.json&selection=%5B%7B%22endColumn%22%3A5%2C%22endLineNumber%22%3A14%2C%22startColumn%22%3A5%2C%22startLineNumber%22%3A14%7D%5D)

## Installation

The `@go-ui/core` package is a dependency of `@go-ui/vue` so you don't have to specifically install it in your project, **only install the `@go-ui/vue` library is all you need to do** (unless component requires external dependencies).


<go-tabs>
  <go-tab label="npm">

```bash
npm i @go-ui/vue
```
  
  </go-tab>
  <go-tab label="pnpm">

```bash
pnpm add @go-ui/vue
```
  
  </go-tab>
  <go-tab label="yarn">

```bash
yarn add @go-ui/vue
```
  
  </go-tab>
</go-tabs>

## Usage


1. import CSS from dist

```ts
import '@go-ui/vue/dist/go-ui.css';
// you can then customise the CSS variables to suit your needs
```

2. import the component(s) you wish to use


```html
<script lang="ts" setup>
import { GoButton } from '@go-ui/vue';
</script>

<template>
  <GoButton variant="primary">Hello world</GoButton>
</template>
```

```html
<script lang="ts">
import { defineComponent } from 'vue';
import { GoButton } from '@go-ui/vue';
export default defineComponent({
  components: {
    GoButton,
    //... other components you might need
  },
  //...
})
</script>
<template>
  <GoButton variant="primary">Hello world</GoButton>
</template>
```



<!-- @todo ## Form -->