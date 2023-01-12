---
title: Dropdown menu
---

# Dropdown menu <span class="text-size-0">`go-dropdown-menu`</span>

<!-- Description -->

<div class="text-size-1">
  Dropdown menu allows users to choose from a predefined list of options in order to perform an action.
</div>

## Trigger button

A dropdown menu requires a trigger element, this can be set by using `trigger-selector` similar to [`go-dropdown`](go-dropdown).


## Persistent

A dropdown menu can be `persistent` in order to allow users to interact with the widget continuously.


## Accessibility

WAI [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/) pattern aligns closely to the `go-dropdown-menu` component.

### Menu button
- The trigger element has role button (attribute will apply if trigger element is not a `go-button` or a native `button` tag).
- The trigger element has `aria-haspopup` set to the id of the menu.
- When the menu is displayed, the trigger element has `aria-expanded` set to true. When the menu is hidden, `aria-expanded` is removed. If aria-expanded is specified when the menu is hidden, it is set to false.
- The trigger element has a value specified for `aria-controls` that refers to the element with role menu.


#### Keyboard
When trigger button has focus:
- <kbd>Enter</kbd>: opens the menu and places focus on the first menu item.
- <kbd>Space</kbd>: opens the menu and places focus on the first menu item.
- <kbd>Down Arrow</kbd>: opens the menu and moves focus to the first menu item.
- <kbd>Up Arrow</kbd>: opens the menu and moves focus to the last menu item.

When focus is inside the dropdown menu:
- <kbd>Down Arrow</kbd>: move focus to the next menu item, if current item is the last one, move focus to the first menu item.
- <kbd>Up Arrow</kbd>: move focus to the previous menu item, if current item is the first one, move focus to the last menu item.
- <kbd>Esc</kbd>: closes the menu.

::: info Note

The keyboard interaction of the menu follows the WAI guideline for [Keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_general_within), which means <kbd>Tab</kbd> and <kbd>Shift + Tab</kbd> do not move focus between menu items, instead, they are only used to focus in and out of the dropdown menu.

:::


## Demo

<demo-frame component="go-dropdown-menu" demo="go-dropdown-menu"></demo-frame>

<!-- Auto Generated Below -->
