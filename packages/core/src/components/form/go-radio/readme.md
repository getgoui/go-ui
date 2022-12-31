---
title: Radio button
---

# Radio <span class="text-size-0">`go-radio`</span>

<!-- Description -->

<div class="text-size-1">
  Radio buttons allow users to select a single item from a list.
</div>

::: info Note

Once a radio button is selected, it cannot be deselected. So for optional fields, it is good practice to include a "none" option and have it selected by default.

:::


## Accessibility
- `label` announced by screen readers along with the "checked" or "not checked" state
- `hint` prop or slot are announced by screen readers if present
- `error` prop is announced by screen readers if present
### Keyboard navigation
- `Up` or `Down` arrow keys - select the previous/next option when the one of the option has focus
- `Space` key - select an option when it has focus
- `Tab` key - navigate to next focusable element outside of the current radio button group
## Demo

<demo-frame component="go-radio" demo="go-radio"></demo-frame>

### Usage in fieldset

<demo-frame component="go-radio" demo="radio-fieldset"></demo-frame>

<!-- Auto Generated Below -->
