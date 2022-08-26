---
title: Link
---

# Link <span class="text-size-0">`go-link`</span>

<!-- Description -->

<div class="text-size-1">Link is a fundamental component of HTML, it is important to get this right.</div>

<!-- Demos, tips, variations, use cases -->

## Demo

<demo-frame component="go-link" demo="go-link"></demo-frame>

## Tabnabbing

It should be noted that [links to cross-origin destinations are unsafe](https://web.dev/external-anchors-use-rel-noopener/), this phishing technique is called [tabnabbing](https://en.wikipedia.org/wiki/Tabnabbing), so whenever you need to link to an external site, you should add `rel="noopener noreferrer"` to the link, `go-link` will take care of this for you when it detects the link is external.

:::tip

All modern browsers now automatically apply the `noopener` behaviour to links with `target="_blank"`.
https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noopener

:::

## Accessibility

### Keyboard accessible

All links must be keyboard accessible for users who navigate with keyboard only. `a` tags with empty `href` attribute are not keyboard accessible. If you need to trigger an action with the `a` tag, use a button instead (see [buttons vs links](./go-button#buttons-vs-links)).

### Provide meaningful text

> Links are more useful when they make sense out of context. Authors should avoid non-informative link phrases such as:
>
> - click here
> - here
> - more
> - read more
>
> https://webaim.org/techniques/hypertext/link_text

> Success Criterion 2.4.4 Link Purpose (In Context) (Level A): The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.
> https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html

### Open in new tab

The WCAG advises against opening new tabs in general, of course special cases apply for good reasons like the ones listed in [this article by Chris Coyier](https://css-tricks.com/use-target_blank/). Open link in new tab only for good reasons and provide sufficient warning to screen reader users.

> In general, it is better not to open new windows and tabs since they can be disorienting for people, especially people who have difficulty perceiving visual content.
> https://www.w3.org/TR/WCAG20-TECHS/G200.html

## Internal vs External

Many developers who believes that any link that points to a domain that's different to the current site should open a new tab. We agree with this pattern in that since you are not in control of the user's destination of a site, you should offer a "clean start". However it is important to let the users know they are about to open a new tab, so they can decide if they want to continue. `go-link` will automatically insert the screen-reader-only text "Opens in new window/tab".

## References

- https://web.dev/external-anchors-use-rel-noopener/
- https://codersblock.com/blog/external-links-new-tabs-and-accessibility/
- https://css-tricks.com/use-target_blank/
- https://webaim.org/techniques/hypertext/link_text
- https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html
- https://www.w3.org/TR/WCAG20-TECHS/G200.html

<!-- Auto Generated Below -->
