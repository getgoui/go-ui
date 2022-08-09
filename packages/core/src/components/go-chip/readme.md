## go-chip API

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                            | Type                                                               | Default     |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------- |
| `clickable`   | `clickable`   | Make chip clickable, `chipClick` event will be emitted on click                                                        | `boolean`                                                          | `false`     |
| `dismissible` | `dismissible` | Make chip dismissible, close button will be shown and `chipDismiss` event will be emitted when close button is clicked | `boolean`                                                          | `false`     |
| `outline`     | `outline`     | If `outline` is true, the button will have a border based on selected variant                                          | `boolean`                                                          | `false`     |
| `variant`     | `variant`     | Colour variant of the chip                                                                                             | `"critical" \| "neutral" \| "primary" \| "secondary" \| "success"` | `'neutral'` |


## Events

| Event           | Description                                            | Type               |
| --------------- | ------------------------------------------------------ | ------------------ |
| `chipClick`     | Emitted on chip click, only if `clickable` is true     | `CustomEvent<any>` |
| `chipDismissed` | Emitted on chip dismiss, only if `dismissible` is true | `CustomEvent<any>` |


## CSS Custom Properties

| Name                         | Description                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `--go-chip-border-width`     | Border width of the chip - default: 2px                                                                     |
| `--go-chip-color-bg`         | Background color of chip - default: var(--go-color-neutral-100)                                             |
| `--go-chip-color-bg-hover`   | Background color on hover for `clickable` chips - default: var(--go-color-neutral-200)                      |
| `--go-chip-color-border`     | Border color of the chip - default: transparent                                                             |
| `--go-chip-color-fg`         | Foreground color of chip - default: var(--go-color-text)                                                    |
| `--go-chip-dismiss-btn-gap`  | Gap between chip content and the dismiss button (only applicable when `dismissable` is `true`) - default: 0 |
| `--go-chip-dismiss-btn-size` | Width and height of the dismiss button - default: calc(1.5em + 2 * var(--go-chip-padding-y))                |
| `--go-chip-font-size`        | Font size of chip - default: var(--go-size--1)                                                              |
| `--go-chip-gap`              | Gap between label, prefix and suffix. - default: 0.5em                                                      |
| `--go-chip-padding`          | Padding of the chip - default: var(--go-chip-padding-y) var(--go-chip-padding-x)                            |
| `--go-chip-padding-x`        | Horizontal padding of the chip - default: 0.75em                                                            |
| `--go-chip-padding-y`        | Vertical padding of the chip - default: 0.25em                                                              |
| `--go-chip-radius`           | Radius of chip - default: var(--radius-2)                                                                   |


----------------------------------------------


