---
title: Fieldset
---

# Fieldset <span class="text-size-0">`go-fieldset`</span>

<!-- Description -->

<div class="text-size-1">
  Fieldset is used to group form controls such as checkboxes and radio buttons. You can also use this to group relevant fields together in a semantically meaningful way.
</div>


## Accessibility
- Fieldset is announced as a "grouping"
- `label` prop is injected into the native `<legend>` tag to provide description
- `hint` prop is inject into legend so it is announced when the group receives focus
- `error` prop is announced (prefixed with "Invalid: ") when the fieldset receives focus
- Use `is-list` attribute to group checkboxes or radio buttons into a list so screen readers announce the semantic structure including number of options available.

This is what NVDA reads when the first item of the demo below receives focus:

> What fruit do you like? Select one or more  grouping  list  with 3 items  Apple  check box  not checked  

## Demo

<demo-frame component="go-fieldset" demo="go-fieldset"></demo-frame>

<!-- Auto Generated Below -->
