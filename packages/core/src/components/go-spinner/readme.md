---
title: Spinner
---

# Spinner <span class="text-size-0">`go-spinner`</span>

<!-- Description -->

<div class="text-size-1">A spinner is a visual indication that a background process is running.</div>

:::warning Always in DOM

In order to have assistive technologies pick up the loading state changes, `go-spinner` should be in the DOM from the beginning.
You can set the `loading` property to either `true` or `false` to control the visibility of the spinner.

:::

## Accessibility

- The component will render with `role="status"`, this triggers the screen reader to announce the loading state as it changes.
- If slot has content, the content will be displayed as the loading label, the slot content will be announced by the screen reader.
- If slot has no content, the default "Loading" label will be announced by the screen reader.

<!-- Demos, tips, variations, use cases -->

## Demo

<demo-frame component="go-spinner" demo="go-spinner"></demo-frame>

<!-- Auto Generated Below -->

