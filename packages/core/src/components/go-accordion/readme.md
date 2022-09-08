---
title: Accordion
---

# Accordion <span class="text-size-0">`go-accordion`</span>

<!-- Description -->

<div class="text-size-1">Accordions help users reduce cluster by showing only the sections that they are interested in.</div>

## Accessibility

`go-accordion` and `go-accordion-item` components are implemented following the [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion) guidelines.


## Demo

### Single mode

By default only one `<go-accordion-item>` element inside a `<go-accordion>` can be expanded at any given time. When clicked on a different `<go-accordion-item>`, the active one will be collapsed and the clicked one will be expanded.

<demo-frame component="go-accordion" demo="single"></demo-frame>

### Multiple mode

There are times when you need multiple items to be open at the same time. Just add `multiple` attribute to the `<go-accordion>` element.

<demo-frame component="go-accordion" demo="multiple"></demo-frame>

### Nested

Nested accordions are also possible, the components will figure out which `<go-accordion>` component is being interacted with.

<demo-frame component="go-accordion" demo="nested"></demo-frame>

### Customisation

There are 2 slots you can use to customise each item. `slot="heading"` and `slot="arrow"`

<demo-frame component="go-accordion" demo="slots"></demo-frame>



<!-- Auto Generated Below -->


## Usage

### Multiple

<div class="container">
  <go-accordion multiple>
    <go-accordion-item heading="We"> Lorem ipsum dolor sit </go-accordion-item>
    <go-accordion-item heading="Are"> Lorem ipsum dolor sit </go-accordion-item>
    <go-accordion-item heading="Groot"> Lorem ipsum dolor sit </go-accordion-item>
  </go-accordion>
</div>


### Nested

<div class="container">
  <go-accordion>
    <go-accordion-item heading="Accordions can be nested too">
      Lorem ipsum dolor sit

      <go-accordion id="inner-accordion">
        <go-accordion-item heading="Nested">
          Lorem ipsum dolor sit
        </go-accordion-item>

        <go-accordion-item heading="Accordions">
          Lorem ipsum dolor sit
        </go-accordion-item>
        <go-accordion-item heading="Are pretty cool">
          Lorem ipsum dolor sit
        </go-accordion-item>
      </go-accordion>

    </go-accordion-item>
    <go-accordion-item heading="Yayyy"">
      Lorem ipsum dolor sit
    </go-accordion-item>
  </go-accordion>
</div>


### Single

<div class="container">
  <go-accordion id="inner-accordion">
    <go-accordion-item heading="I" active> Add <code>active</code> attribute to open an item by default. </go-accordion-item>
    <go-accordion-item heading="Am"> Lorem ipsum dolor sit </go-accordion-item>
    <go-accordion-item heading="Groot"> Lorem ipsum dolor sit </go-accordion-item>
  </go-accordion>
</div>


### Slots

<div class="container">
  <go-accordion>
    <go-accordion-item>
      <div slot="heading">
        <mark> Use <code>slot="heading"</code> to customise heading </mark>
      </div>
      Lorem ipsum dolor sit
    </go-accordion-item>
    <go-accordion-item heading="Customise arrow">
      <div slot="arrow" style="text-align: center; color: red; width: 60px; height: 60px; font-size: 60px; line-height: 60px">&#10084;</div>
      Use <code>slot="arrow"</code> to customise arrow
    </go-accordion-item>
  </go-accordion>
</div>



## Properties

| Property     | Attribute     | Description                                                                                                                                                           | Type      | Default |
| ------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `active`     | `active`      | If the accordion item should be opened by default                                                                                                                     | `boolean` | `false` |
| `autoHeight` | `auto-height` | If expanded height should be automatically calculated. If set, the `--go-accordion-item-body-max-height` CSS variable will be set automatically to the content height | `boolean` | `true`  |
| `heading`    | `heading`     | Heading text. This will be overwritten by `heading` slot                                                                                                              | `string`  | `null`  |
| `headingTag` | `heading-tag` | The HTML tag to be applied to the heading text. This will be overwritten by `heading` slot                                                                            | `string`  | `'h3'`  |


## Events

| Event     | Description                                 | Type               |
| --------- | ------------------------------------------- | ------------------ |
| `closed`  | Emitted when accordion item has closed      | `CustomEvent<any>` |
| `closing` | Emitted when accordion item started closing | `CustomEvent<any>` |
| `opened`  | Emitted when accordion item has opened      | `CustomEvent<any>` |
| `opening` | Emitted when accordion item started opening | `CustomEvent<any>` |


## Methods

### `close() => Promise<void>`

Closes the accordion item

#### Returns

Type: `Promise<void>`



### `focusOnControl() => Promise<void>`

Focus on header control

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the accordion item.

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggle open state of accordion item

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
