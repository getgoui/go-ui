---
title: Dropdown
---

# Dropdown <span class="text-size-0">`go-dropdown`</span>

<!-- Description -->

<div class="text-size-1">Dropdown is a lower-level component that serves as a wrapper for presenting a popup widget in-place of the interaction.</div>

## Usage


The main purpose of using the `go-dropdown` component is to solve these problems:
1. open dropdown panel in place of interaction
2. focus on first focusable element inside dropdown
3. trap focus inside dropdown

The `go-dropdown` provides a generic dropdown mechanism that can be used by patterns like menu, select, multi-select etc.

:::info Dropdown menu

[`go-dropdown-menu`](go-dropdown-menu) provides an easy way to make accessible dropdown menus.

:::

## Accessibility

- The trigger element will have `aria-haspopup` and `aria-expanded` attributes automatically applied.

See [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/) WAI-ARIA for details on recommended Roles, States, and Properties for menu button (button that opens a menu). 

## Demo

<demo-frame component="go-dropdown" demo="go-dropdown"></demo-frame>


<!-- Auto Generated Below -->
