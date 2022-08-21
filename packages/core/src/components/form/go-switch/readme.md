## go-switch API

<!-- Auto Generated Below -->


## Usage

### Go-switch

<div class="container">
  <go-switch checked name="switch1" label="Switch"></go-switch>
  <br />
  <go-switch checked name="switch2" label="Stacked switch" stack></go-switch>
  <br />
  <go-switch checked name="switch3" label="Full-width switch" full-width></go-switch>
  <br />
  <go-switch checked name="switch4" label="On off switch" show-on-off></go-switch>
  <br />
  <go-switch checked name="switch5" label="Yes no switch" show-on-off active-label="Yes" inactive-label="No"></go-switch>
  <br />
  <go-switch checked name="switch5" label="On off outside switch" show-on-off-outside active-label="Yes" inactive-label="No"></go-switch>
</div>



## Properties

| Property           | Attribute             | Description                                          | Type      | Default     |
| ------------------ | --------------------- | ---------------------------------------------------- | --------- | ----------- |
| `activeLabel`      | `active-label`        | "on" label to show when `showOnOff*` is set to true  | `string`  | `'On'`      |
| `checked`          | `checked`             |                                                      | `boolean` | `undefined` |
| `disabled`         | `disabled`            |                                                      | `boolean` | `undefined` |
| `fullWidth`        | `full-width`          | make this field full width                           | `boolean` | `false`     |
| `inactiveLabel`    | `inactive-label`      | "off" label to show when `showOnOff*` is set to true | `string`  | `'Off'`     |
| `label`            | `label`               |                                                      | `string`  | `undefined` |
| `name`             | `name`                |                                                      | `string`  | `undefined` |
| `showOnOff`        | `show-on-off`         | show on/off text in switch toggle                    | `boolean` | `false`     |
| `showOnOffOutside` | `show-on-off-outside` | show on/off text next to the switch toggle           | `boolean` | `false`     |
| `stack`            | `stack`               | Display label on top of switch                       | `boolean` | `false`     |
| `value`            | `value`               |                                                      | `any`     | `undefined` |


## CSS Custom Properties

| Name                        | Description                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------- |
| `--switch-bg-color`         | default background color of switch control - default: var(--go-color-neutral-500)      |
| `--switch-bg-color-checked` | background color of switch control when checked - default: var(--go-color-primary-600) |
| `--switch-handle-color`     | color of the switch handle - default: #fff                                             |
| `--switch-handle-gap`       | gap between handle circle and the edge of the switch - default: 4px                    |
| `--switch-handle-shadow`    | box shadow for the handle circle - default: var(--shadow-2)                            |
| `--switch-height`           | height of switch control - default: 2rem                                               |
| `--switch-label-gap`        | gap between label and switch control - default: 1rem                                   |
| `--switch-radius`           | border radius of switch control - default: var(--radius-round)                         |
| `--switch-shadow`           | shadow on the switch track - default: var(--inner-shadow-1)                            |
| `--switch-text-color`       | Text color for on off label - default: #fff                                            |
| `--switch-width`            | width of switch control - default: 4rem                                                |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
