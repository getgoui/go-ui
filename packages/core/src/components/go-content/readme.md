---
title: Content
---

# Content <span class="text-size-0">`go-content`</span>

<!-- Description -->

<div class="text-size-1">Container to apply generic content styling.</div>

## Styling for generic content

This component provides a container for generic content styling, this means you don't necessarily have all the control over the html structure, as long as the structure is simple and flat, this component could be used. A really good use case is for when you have some "rich-text" content loaded from a content management system (CMS).


By default, the spacing style will be applied to the *direct* children of `go-content`, and if you use the [`go-md`](/docs/components/go-md) component inside `go-content`, the *direct* children of the `go-md` will also have the same spacing style.

### The Lobotomised owls selector 

We use the [*lobotomized owls*](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/) (credit goes to Heydon Pickering) selector to create the spacing style, this allows us to have a simple rule for all elements inside a container while having a low specificity level so if consuming apps wish to overwrite it, they can easily negate the rule by doing something like this:

```css
.my-special-container * {
  margin-top: 0;
}
```


::: info

The `iframe` tag is controlled to have 16/9 aspect ratio by default, if you need it in other aspect ratio, please use the `--iframe-embed-aspect-ratio` CSS variable to customise, e.g.

```css
iframe.square {
  --iframe-embed-aspect-ratio: 1/1
}
```

:::

## Demo

<demo-frame component="go-content" demo="go-content"></demo-frame>

<!-- Auto Generated Below -->