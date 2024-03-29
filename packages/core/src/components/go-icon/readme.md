---
title: Icon
---


# Icon <span class="text-size-0">`go-icon`</span>

<!-- Description -->

<div class="text-size-1">
  Icons serve multiple purposes in a UI, they can convey information (e.g. icon button, icon tab) or they can be used as a visual representation.
</div>

::: info Icon font CSS

Before using the `go-icon` component, you need to have the icon font CSS available in your application.

**Go UI does not bundle any icon fonts**. This is to keep the bundle size small for cases when icons are not required.

This documentation site references the Material Icons (Filled) hosted via [Google Fonts](https://fonts.google.com/icons), which is the default icon set for `go-icon` component.

The demo contains example of how to include the icon font CSS in your application.

:::

## Accessibility

There are two types of icons and they should be used in different ways.

- **Decorative icons** are purely for visual purposes, they should not be announced by screen readers, `go-icon` will add `aria-hidden` attribute to the by default.

- **Semantic icons** are meant to convey information and should be announced by screen readers, provide a `label` attribute to the `go-icon` component and the appropriate aria attributes will be applied.

## Supported icon sets

### Material Icons

[Official site](https://fonts.google.com/icons)

The following values can be used to render material icons:

- `material-icons` (Filled)
- `material-icons-outlined` (Outlined)
- `material-icons-round` (Rounded)
- `material-icons-sharp` (Sharp)

### Font Awesome

[Official site](https://fontawesome.com/v5.15/icons)

The following values can be used to render Font Awesome icons ([See official docs](https://fontawesome.com/v5.15/how-to-use/on-the-web/referencing-icons/basic-use)):

- `fas`
- `far`
- `fal`
- `fad`
- `fab`

### Boxicons

[Official site](https://boxicons.com/)

The following values can be used to render Boxicons icons ([See official docs](https://boxicons.com/usage)):

- `bx` (Regular)
- `bxs` (Solid)
- `bxl` (Logo)


<!-- Demos, tips, variations, use cases -->

## Usage

The following example shows how you can integrate and customise different supported icon sets.

<demo-frame component="go-icon" demo="go-icon"></demo-frame>

<!-- Auto Generated Below -->
