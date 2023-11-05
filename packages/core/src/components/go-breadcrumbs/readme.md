---
title: Breadcrumbs
---

# Breadcrumbs <span class="text-size-0">`go-breadcrumbs`</span>

<!-- Description -->

<div class="text-size-1">Breadcrumbs provide a quick way to help users understand where they are in the website's information hierarchy.</div>

## Usage and guidance

Always place breadcrumbs at the top of a page, and have the [skip link](../go-skip-link) target an element below the breadcrumbs so that screen readers can skip this navigation area.

- On desktop devices, the breadcrumbs should start with "Home" even though the logo should also link to the home page.
- Labels of the breadcrumb items should reflect their page headings in the actual information architecture.
- On mobile devices, due to the limited screen real estate, the breadcrumb items are condensed into only having the direct parent of the current page (and the current page title if `show-current` attribute is set to `"true"`). User should be able to click on the logo to go back to the home page.
- If items in breadcrumb get too long, the items will wrap into the next line. This is an sign that the information architecture (IA) might need to be updated.

## Accessibility

- Breadcrumbs are contained within a `<nav>` landmark region labelled as "Breadcrumbs" (you can change this by setting the `label` attribute).
- If item has `url` and `hide-current` attribute is not set, the current page will be rendered as a link, in this scenario `aria-current="page"` is set to the link element.

<!-- Demos, tips, variations, use cases -->

## Demo

<demo-frame component="go-breadcrumbs" demo="go-breadcrumbs"></demo-frame>

<!-- Auto Generated Below -->
