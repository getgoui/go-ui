---
title: Progress
---

# Progress <span class="text-size-0">`go-progress`</span>

<!-- Description -->

<div class="text-size-1">Progress bar indicates the progress status for a tasks that might take a long time, this can be determinate or indeterminate.</div>

## Accessibility

The `go-progress` component implements the [ARIA Progress Bar](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role) role.

- The `label` attribute will be used for `aria-label` value applied to the progress bar element.
- Similarly the `labelledby` attribute will be passed on to fill the `aria-labelledby` attribute on the progress bar element.
- `aria-valuemin` is automatically filled with the value of `min` attribute, defaults to `0` if not provided.
- `aria-valuemax` is automatically filled with the value of `max` attribute, defaults to `100` if not provided.
- `aria-valuenow` is automatically filled with the value of `value` attribute, if not provided, progress bar will become [indeterminate](#determinate-vs-indeterminate)

### Why not use the `progress` element?

Although the native `progress` element provide a nice wrapper for the accessibility concerns above, it is difficult to style consistently cross browsers, the effort required to work through the various browser styles with vendor prefixes is more than implementing the custom element with `role="progressbar"`.

## Determinate vs Indeterminate

The `go-progress` component is determinate if:

1. `indeterminate` attribute is not set or set to `false` **AND**
2. `value` attribute is set to a valid value (number between `min` and `max`).

Otherwise, the progress bar will be _indeterminate_, which plays a looping animation.

::: info

For [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) users, we provide a different animation. 💖

:::

Open the source code of the demo to see how it works.

<!-- Demos, tips, variations, use cases -->

## Demo

<demo-frame component="go-progress" demo="go-progress"></demo-frame>

<!-- Auto Generated Below -->
