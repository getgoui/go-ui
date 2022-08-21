## go-md API

<!-- Auto Generated Below -->


## Usage

### Extend

<script
  src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it-emoji/2.0.2/markdown-it-emoji.min.js"
  integrity="sha512-tJ1QQaPYuPI8KC68gOLzHsp8l2hZB08FHzALKpjaGt+3I6x9ZaDzxdL67NKfliSg60yTq1dd7Kfor5rNjRbE0g=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>
<go-md
  id="test"
  content="
  :tada::balloon: emoji supported with markdown-it-emoji plugin
"
>
</go-md>
<script>
  document.querySelector('#test').addEventListener('init', (e) => {
    let md = e.detail;
    md.use(window.markdownitEmoji);
  });
</script>


### Go-md

<div class="container">
  <go-md
    content="
[Basic markdown syntax](https://commonmark.org/help/)

*Italic*

**Bold**

# Heading 1

## Heading 2

### Heading 3

###### Heading 6

[Link](http://a.com)

![Image](https://picsum.photos/id/870/400/200)

> Blockquote
>
> multiple lines
>
> This is a quoted text

- List
- List
- List

1. One
1. Two
1. Three

---

`Inline code` with backticks

```
# code block
print '3 backticks or'
print 'indent 4 spaces'
```
"
  ></go-md>
</div>


### Remote-source

<div class="container">
  <go-md sanitise="true" md-options="{html: true}" src="//raw.githubusercontent.com/getgoui/go-ui/main/README.md">Fallback content.</go-md>
</div>


### Use-go-ui

<div class="container">
  <go-md
    use-go-ui="true"
    content="
[Basic markdown syntax](https://commonmark.org/help/)


## Banners

::: info hello world

This is an info [banner](/docs/components/go-banner).

:::


::: critical Error

Something went wrong.

:::


::: success Success

Operation was successful.

:::

---

## Links

Links are rendered with `go-link` component.

https://google.com

https://go-ui.com

I'm a [link](#) to id

This is an [external link](https://www.google.com)

---

## Table

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
"
  >
  </go-md>
</div>



## Properties

| Property    | Attribute    | Description                                                                                                                                                                                                                                                                                            | Type                | Default     |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ----------- |
| `content`   | `content`    | Markdown content to be rendered                                                                                                                                                                                                                                                                        | `string`            | `undefined` |
| `inline`    | `inline`     | Render inline markdown                                                                                                                                                                                                                                                                                 | `boolean`           | `false`     |
| `mdOptions` | `md-options` | [markdown-it](https://github.com/markdown-it/markdown-it) options **Note**: if `use-go-ui` is set to true, these options will be overwritten                                                                                                                                                           | `Options \| string` | `undefined` |
| `sanitise`  | `sanitise`   | If set to true, `go-md` will use [DOMPurify](https://nodei.co/npm/dompurify/) to sanitise the output HTML before inserting it into the DOM                                                                                                                                                             | `boolean`           | `false`     |
| `src`       | `src`        | url to load remote markdown content if `src` is set, content in the `content` prop will be overwritten                                                                                                                                                                                                 | `string`            | `undefined` |
| `useGoUi`   | `use-go-ui`  | Use go-ui markdown renderer: - Only `typographer` is enabled in markdown-it options  - linkify with [`go-link`](https://go-ui.com/docs/components/go-link) - [container](https://github.com/markdown-it/markdown-it-container) banners with [`go-banner`](https://go-ui.com/docs/components/go-banner) | `boolean`           | `false`     |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `init`     |             | `CustomEvent<any>` |
| `rendered` |             | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
