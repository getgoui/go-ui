---
order: 1
title: React
---

# React integration


The `@go-ui/react` package provides a wrapper library for easy integration with React projects. Here's how you can use it.


## Installation

The `@go-ui/core` package is a dependency of `@go-ui/react` so you don't have to specifically install it in your project, **only install the `@go-ui/react` library is all you need to do** (unless component requires external dependencies).


<go-tabs>
  <go-tab label="npm">

```bash
npm i @go-ui/react
```
  
  </go-tab>
  <go-tab label="pnpm">

```bash
pnpm add @go-ui/react
```
  
  </go-tab>
  <go-tab label="yarn">

```bash
yarn add @go-ui/react
```
  
  </go-tab>
</go-tabs>



## Usage


1. import CSS from dist

```ts
import '@go-ui/react/dist/go-ui.css';
// you can then customise the CSS variables to suit your needs
```

2. import the component(s) you wish to use

```js
import { GoButton } from "@go-ui/react";

function App() {
  return <GoButton :variant={'primary'}>Hello world</GoButton>
}

```
<!-- @todo ## Form -->