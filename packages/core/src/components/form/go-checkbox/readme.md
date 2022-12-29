---
title: Checkbox
---

# Checkbox <span class="text-size-0">`go-checkbox`</span>

<!-- Description -->

<div class="text-size-1">
Checkboxes allow users to select one or more options.
</div>

::: info Group checkboxes
A common use case is to group checkboxes together in a `fieldset` along with a `legend` to provide context. See how you can achieve this easily with [`go-fieldset`](go-fieldset)
:::

## Accessibility
- `label` announced by screen readers along with the "checked", "half checked" (`indeterminate` prop) or "not checked" state
- `hint` prop or slot are announced by screen readers if present
- `error` prop is announced by screen readers if present
### Keyboard navigation
- `Space` key - select and deselect an option when it has focus
- `Tab` key - navigate to next focusable item (a `disabled` item doesn't receive focus)
- `Shift` + `Tab` - navigate to previous focusable item (a `disabled` item doesn't receive focus)

## Demo

<demo-frame component="go-checkbox" demo="go-checkbox"></demo-frame>

<!-- Auto Generated Below -->
