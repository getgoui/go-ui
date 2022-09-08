---
title: Table
---

# Table <span class="text-size-0">`go-table-wrapper`</span>

<!-- Description -->

<div class="text-size-1">Table component displays tabular data.</div>

## Usage

The usage of this component is just wrapping the `go-table-wrapper` tag around the normal use of the `table` element.

Why do a `go-table-wrapper` rather than a `go-table` component that replaces/enhances the HTML `table` element?

Due to the [HTML table standards](https://html.spec.whatwg.org/multipage/tables.html#the-table-element) the table elements such as `tbody` `thead` `tr` `td` `th` are meant to be used together and if used in a `table` equivalent custom element with the use of slots, the browsers will simply refuse to treat it as valid HTML.

## Accessibility

## Demo

<demo-frame component="go-table-wrapper" demo="go-table-wrapper"></demo-frame>

<!-- Auto Generated Below -->
