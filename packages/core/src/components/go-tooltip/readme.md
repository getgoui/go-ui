---
title: Tooltip
---

# Tooltip <span class="text-size-0">`go-tooltip`</span>

<!-- Description -->

<div class="text-size-1">
  Tooltip is a popup that displays additional information related to an element when the element receives focus or hovered over.
</div>

## Accessibility

> ### Best practices summary
>
> - Tooltips should directly describe the UI control that triggers them (i.e. do not create a control purely to trigger a tooltip) ✓
> - Use aria-describedby or aria-labelledby to associate the UI control with the tooltip. Avoid aria-haspopup and aria-live ✓
> - Provide a means to dismiss the tooltip with both keyboard and pointer ✓
> - Allow the mouse to easily move over the tooltip without dismissing it ✓
> - Do not use a timeout to hide the tooltip ✓
> - Only interactive elements should trigger tooltips
> - Do not use the title attribute to create a tooltip
> - Do not put essential information in tooltips
>
> [Tooltips in the time of WCAG 2.1](https://sarahmhigley.com/writing/tooltips-in-wcag-21/) by [Sarah Higley](https://sarahmhigley.com/)

✓ _handled by `go-tooltip` out of the box._

## Demo

<demo-frame component="go-tooltip" demo="go-tooltip"></demo-frame>

<!-- Auto Generated Below -->
