---
title: Tabs
---

# Tabs <span class="text-size-0">`go-tabs`</span>

<!-- Description -->

<div class="text-size-1">Tabs are used commonly to organise related content and switch between different views.</div>

## When to use

Tabs are a great way to organize content and make it easy for users to move between related sections or views at the same level of hierarchy. Tabs facilitate user interaction with specific content while maintaining a clear understanding of the overall context of the screen.

References:

- [Tabs](https://digitalnsw.github.io/nsw-design-system/components/tabs/index.html) - NSW Digital Design System
- [Tabs, Used Right](https://www.nngroup.com/articles/tabs-used-right/) - Nielsen Norman Group

## Accessibility

- `go-tabs` and `go-tab` components are built based on the [W3C tabs design pattern](https://www.w3.org/TR/wai-aria-practices/#tabpanel).
- By default, the [Tabs With Automatic Activation](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html) pattern is used, where a tab is automatically activated and its associated panel is displayed when the tab receives focus.
- If the panel content cannot be displayed instantly, add `manual="true"` attribute to adopt the [Tabs With Manual Activation](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html) pattern.

References:

- [Tabs design pattern](https://www.w3.org/TR/wai-aria-practices/#tabpanel) - WAI-ARIA

## Demo

<demo-frame component="go-tabs" demo="go-tabs"></demo-frame>

## Vertical tabs

<demo-frame component="go-tabs" demo="go-tabs-vertical"></demo-frame>

## Manual activation

<demo-frame component="go-tabs" demo="go-tabs-manual"></demo-frame>

<!-- Auto Generated Below -->
