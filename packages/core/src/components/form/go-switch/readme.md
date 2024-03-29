---
title: Switch
---


# Switch <span class="text-size-0">`go-switch`</span>

<!-- Description -->

<div class="text-size-1">
  Switch is a widget that allows users to quickly choose between "on" and "off" values. Switch does not provide indeterminate state.
</div>

## Accessibility

Following checkpoints come from W3C's [ARIA Authoring Practice Guide](https://www.w3.org/WAI/ARIA/apg/patterns/switch/):

> - [x] The switch has role switch.
> - [x] The switch has an accessible label provided by one of the following:
>   - Visible text content contained within the element with role switch.
>   - A visible label referenced by the value of aria-labelledby set on the element with role switch.
>   - aria-label set on the element with role switch.
> - [x] If the switch element is an HTML input[type="checkbox"], it uses the HTML checked attribute instead of the aria-checked property.

**_To be implemented with fieldset_**

> - [ ] If a set of switches is presented as a logical group with a visible label, either:
>   - The switches are included in an element with role group that has the property aria-labelledby set to the ID of the element containing the group label.
>   - The set is contained in an HTML fieldset and the label for the set is contained in an HTML legend element.

<!-- Demos, tips, variations, use cases -->

## Demo

<demo-frame component="go-switch" demo="go-switch"></demo-frame>

<!-- Auto Generated Below -->

