## API

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                                                                                                                                                                 | Type                                                                         | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------- |
| `block`       | `block`        | If set, the button will take up the full width of its parent If block="{breakpoint}" is set, the button will take up the full width for the specified breakpoint. e.g. a `block="mobile"` button will display full width on mobile devices. If block="all", the button will take full width on all devices. | `"all" \| "desktop" \| "large" \| "mobile" \| "tablet"`                      | `undefined` |
| `compact`     | `compact`      | Reduce inner gaps and outer paddings                                                                                                                                                                                                                                                                        | `boolean`                                                                    | `false`     |
| `disabled`    | `disabled`     | If this button is disabled                                                                                                                                                                                                                                                                                  | `boolean`                                                                    | `null`      |
| `flat`        | `flat`         | If `flat` is set, the button will have no shadow and will be filled with the background color of the selected variant                                                                                                                                                                                       | `boolean`                                                                    | `false`     |
| `href`        | `href`         | If the button has an href, it will be rendered as an anchor tag                                                                                                                                                                                                                                             | `string`                                                                     | `undefined` |
| `icon`        | `icon`         | Circle shaped icon only button that has min size of 40px for touch devices                                                                                                                                                                                                                                  | `boolean`                                                                    | `false`     |
| `outline`     | `outline`      | If `outline` is true, the button will have a border based on selected variant                                                                                                                                                                                                                               | `boolean`                                                                    | `false`     |
| `outlineFill` | `outline-fill` | Outline style with filled background                                                                                                                                                                                                                                                                        | `boolean`                                                                    | `false`     |
| `round`       | `round`        | If button should have pill-shaped corners                                                                                                                                                                                                                                                                   | `boolean`                                                                    | `false`     |
| `stack`       | `stack`        | Stack elements inside the button                                                                                                                                                                                                                                                                            | `boolean`                                                                    | `false`     |
| `type`        | `type`         | Html type of the button                                                                                                                                                                                                                                                                                     | `"button" \| "reset" \| "submit"`                                            | `'button'`  |
| `variant`     | `variant`      | Button variants                                                                                                                                                                                                                                                                                             | `"critical" \| "neutral" \| "primary" \| "secondary" \| "success" \| "text"` | `'neutral'` |


## Slots

| Slot        | Description                                     |
| ----------- | ----------------------------------------------- |
| `"default"` | Button text                                     |
| `"prefix"`  | Use this slot to prepend content to the button. |
| `"suffix"`  | Use this slot to append content to the button.  |


## CSS Custom Properties

| Name                        | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| `--go-btn-bg-color`         | Background colour for the button. - default: transparent |
| `--go-btn-icon-size`        | Outer size of the icon button. - default: 3rem           |
| `--go-btn-inline-icon-size` | Size of the icon inside the button. - default: 1.5rem    |


## Dependencies

### Used by

 - [go-banner](../go-banner)
 - [go-dialog](../go-dialog)
 - [go-nav-drawer](../navigation/go-nav-drawer)
 - [go-search-bar](../go-search-bar)
 - [go-to-top](../go-to-top)

### Graph
```mermaid
graph TD;
  go-banner --> go-button
  go-dialog --> go-button
  go-nav-drawer --> go-button
  go-search-bar --> go-button
  go-to-top --> go-button
  style go-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


