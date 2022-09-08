---
title: Web Components
---

# Web Components

Go UI components are Web Components, which essentially is a way to create custom HTML elements.

> Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.
> 
> https://developer.mozilla.org/en-US/docs/Web/Web_Components

## Why **not** Shadow DOM?

Shadow DOM provides a **great** way to isolate the logic and styles of a component from the rest of the page and there are cases when you want to use it to reduce many headaches (e.g. add footer with new design into a page that uses old styles). 

However, _with great power comes great responsibility_, when you have a few shadow DOM components that share similar styles, it's difficult to share the code and hence creating duplications. There are also complications when it comes to event handling, form submissions and third-party supports.

Go UI components do **not** use Shadow DOM, but instead use only the [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) aspect of the Web Components specification. This gives us the flexibility to encapsulate styles using normal [CSS type selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors) to scope the styles and allows us to use the native DOM more easily.


## Benefits of Web Components

Almost all modern JS frameworks strive to support Web Components, if you have teams using different frameworks, they can share the same component library without redeveloping the whole library in their preferred framework. You can [check the state of framework support](https://custom-elements-everywhere.com/)

Using CSS custom properties, Go UI components provide their own "styling API", which allows you to easily customise the look and feel of individual components as well as global styles.

Supported by the browser, adding components into your app do not introduce huge dependencies and do not increase your bundle size by much. 

Additionally, framework-specific component libraries are vulnerable to breaking changes, which requires time and effort to update, sometimes a new major version of the framework comes out and the library needs to be re-written. Web Components are built on the browsers' specifications, so they are more stable.