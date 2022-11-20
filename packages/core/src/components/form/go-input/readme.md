---
title: Input
---


# Input <span class="text-size-0">`go-input`</span>

<!-- Description -->

<div class="text-size-1">
  Single-line input field for text, number, email, telephone, url.  
</div>


## Difference between go-input and html native input

`go-input` uses the html native input internally to rip the default accessibility benefits from the browser. However, not all `input` types are recommended to be used in `go-input` because a purposely built widget (think date picker, range picker etc) has a much better UX than the widget that is built into the browser.

### Recommended types

The recommended `type` attribute options to use are 
- `email`
- `number`
- `password` 
- `search` 
- `tel` 
- `text`

You'll notice all the types above are *single-line text inputs*, that's the rule of thumb.



## Accessibility

go-input requires a `label` prop and automatically generates the necessary ids for the internal `<label>` tag and other elements such as the `prefix` and `suffix`. 

### Announcing context
It is important for users with screen readers to understand what the expected format of input is.
The label will be announced to the screen readers. The prefix and suffix elements are also wired up to announce the necessary parts of the input so people get the full context when they type letters into the box.



## Demo
<demo-frame component="go-input" demo="go-input"></demo-frame>


<!-- Auto Generated Below -->
