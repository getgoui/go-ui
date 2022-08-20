---
title: Button
---

# Button <span class="text-size-0">`go-button`</span>

<div class="text-size-1">A button is a simple way to call on the attention of the user.</div>

## When to use

Use a button when you want to:

- Call on the user's attention.
- Provide a way to initiate an action or a navigation (see [buttons vs links](#buttons-vs-links)).
- Provide a command that the user can execute, such as saving data or submitting a form.

## Accessibility

- Buttons must have discernible text. (https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14)

  Most of the time, the text within button slot will be sufficient, when using icon buttons, we check if there is a `aria-label` or `aria-labelledby` attribute on the button, and a console warning will be thrown if there is not.

- Elements must have significant color contrast.


## Demo

<demo-frame component="go-button" demo="go-button" no-source></demo-frame>

## Block level

It is often nice to make the button more prominent on mobile devices by making it a full-width. This accommodates for the limited screen real-estate. You can specify at which device/breakpoint you want the button to be full-width by passing the breakpoint keyword into the `block` attribute. (If `block` attribute is present but no value is specified, the button will be full-width at all breakpoints.)

<demo-frame component="go-button" demo="block"></demo-frame>

## Icons

Button can be icon-only, the only caveat is that you'll need to provide `aria-label` or `aria-labelledby` attributes for accessibility.

<demo-frame component="go-button" demo="icons"></demo-frame>

## Buttons vs links

For a comprehensive breakdown of buttons and links, see [A Complete Guide to Links and Buttons](https://css-tricks.com/a-complete-guide-to-links-and-buttons/) from CSS Tricks.
Buttons and links may feel similar but they serve different purposes and have different accessibility requirements.

> Buttons are used for actions that affect the website's front-end or back-end; links are used for navigation and actions that don't affect the website at all.
>
> -- <cite>[UX Office](https://ux.iu.edu/writings/buttons-vs-links-basic/)</cite>

<demo-frame component="go-button" demo="button-link"></demo-frame>
