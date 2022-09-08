---
title: Footer
tags:
  - Layout
  - Navigation
---

# Footer <span class="text-size-0">`go-footer`</span>

<!-- Description -->

::: info Self contained

`go-footer` is a self-contained pattern, do not put it inside a `.container`

:::

Footer is located at the bottom of the page to provide supplementary information such as copyright, contact information and links to help users find what they need.

## Accessibility

`<footer>` landmark is used to help assistive technology to quickly identify and navigate to the appropriate section.

Each page should only have one `<footer>` landmark hence only one `go-footer` element.

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/contentinfo_role

## Related components

- [go-nav-list](../components/navigation/go-nav-list)

<!-- Demos, tips, variations, use cases -->

## Demo

<demo-frame component="go-footer" demo="footer"></demo-frame>

## Dark variant

`<go-footer>` not only self adjust based on the user's `prefer-color-scheme` setting, but also comes with a `dark` variant out of the box. This dark variant will _not_ change based on user's `prefer-color-scheme` setting.

<demo-frame component="go-footer" demo="dark"></demo-frame>

### Custom colours

You can customise the footer colours by overriding these CSS variables:

(snippet below shows the default values.)

```css
go-footer {
  // colours
  --footer-bg-color: var(--go-color-lightest);
  --footer-text-color: var(--go-color-text);
  --footer-link-color: var(--footer-text-color);
  --footer-link-color-hover: var(--go-color-success-900);
  --footer-link-bg-color-hover: transparent;
}
```

## Custom slots

You can also custom build the entire footer html structure by omitting the `links` property and just write your own html inside the `<go-footer>` component.

<demo-frame component="go-footer" demo="custom"></demo-frame>

<!-- Auto Generated Below -->
