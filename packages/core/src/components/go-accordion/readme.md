## go-accordion API

<!-- Auto Generated Below -->


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


