---
title: Navigation bar
---

# Navigation bar <span class="text-size-0">`go-nav-bar`</span>

<!-- Description -->

<div class="text-size-1">The navigation bar helps users navigate the site's top level information architecture.</div>

## Accessibility

- Uses `<nav>` landmark
- Ability to set nav label easily with the `label` attribute (defaults to "Main")

## Related patterns

<!-- Patterns that uses this component -->

- [Header](../../patterns/header-bar)

<!-- Demos, tips, variations, use cases -->

## Data-driven navigation bar

If you use a CMS or an API to manage the source of the navigation menu structure, the easiest way to use the navigation bar is probably going to be data-driven.

<demo-frame component="go-nav-bar" demo="go-nav-bar"></demo-frame>

In the example above, the `items` prop of the `go-nav-bar` component gets parsed (JSON5 format) and rendered automatically, as a developer, you need to pass the menu structure in the following format:

```ts
export interface INavItem {
  label: string;
  url?: string;
  icon?: IIcon; // see go-icon
  description?: string;
  children?: INavItem[];
  columns?: number;
  isCurrent?: boolean;
}
```

## Composable navigation bar

You can also compose the navigation bar in a more traditional way, which gives you more control over what goes into the slots of the compoents.

<demo-frame component="go-nav-bar" demo="composable"></demo-frame>

<!-- Auto Generated Below -->
