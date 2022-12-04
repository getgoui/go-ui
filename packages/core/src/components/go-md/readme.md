---
title: Markdown
---

# Markdown <span class="text-size-0">`go-md`</span>

<div class="text-size-1">
  Renders markdown into HTML, uses
  <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">
    markdown-it
  </a>
  under the hood.
</div>

## Demo

Set the `content` prop to the markdown you want to render, and set `inline="true"` to render the markdown inline.

<demo-frame component="go-md" demo="go-md"></demo-frame>

## Remote content

Load remote markdown file by passing the url to the `src` prop.

::: info Rendering HTML

If your remote content uses html tags, you can add `md-options="{html: true}"` to enable HTML rendering.

If you do not trust the author, but needing to enable HTML, you can also set `sanitize="true"`, this uses [DOMPurify](https://github.com/cure53/DOMPurify) to sanitize the rendered output.

:::

### Security

`go-md` uses [`markdown-it`](https://github.com/markdown-it/markdown-it) under the hood and the developers have [2 strategies for ensuring safe output](https://github.com/markdown-it/markdown-it/blob/master/docs/security.md)
:

- Don't enable html (default mode)
- Enable html and sanitize output

`go-md` ships with a `sanitize` prop to enable sanitize output (default to `false`).

::: info Rule of thumb

If HTML enabled, add `sanitize="true"`, otherwise it's not necessary

:::

<demo-frame component="go-md" demo="remote-source"></demo-frame>

## Extendability

`go-md` is extendable as it exposes the `markdown-it` object in the custom `init` event.

<demo-frame component="go-md" demo="extend"></demo-frame>

## Integrate with other Go UI components

If `use-go-ui` is set to `true`, `go-md` will render the markdown with extended support for Go UI components.

<demo-frame component="go-md" demo="use-go-ui"></demo-frame>

<!-- Auto Generated Below -->
