---
title: Datepicker
---

# Datepicker <span class="text-size-0">`go-datepicker`</span>

<!-- Description -->

<div class="text-size-1">
  Datepicker is a widget that enables users to select a date from a calendar display.
</div>

Datepickers are commonly used in forms that require users to select a date for a reservation, appointment, or event. They provide an intuitive and standardised way for users to input date information and prevent errors and confusion that can arise from manual entry.

::: success

`go-datepicker` uses [Duet Date Picker](https://github.com/duetds/date-picker) under the hood, the Duet team made a great component that handles a lot of the accessibility concerns. `go-datepicker` accepts an `options` attribute where you can pass `duet-date-picker` options as a JSON object with key-value pairs.

:::

## Accessibility

- Datepicker widget screen reader support ([See Duet Date Picker](https://github.com/duetds/date-picker#screen-reader-support))

## Demo

<demo-frame component="go-datepicker" demo="go-datepicker"></demo-frame>

::: info

**Note:** the value of the datepicker component is the same as what's displayed in the input field. The format is by default the ISO format `yyyy-mm-dd` same as the native HTML `<input type="date" ...>` element. The difference is when you provide a custom `format` prop, the displayed value **and** the form data value use the specified format to convert the internal Date object into the string.

:::

<!-- Auto Generated Below -->
