## go-badge API

<!-- Auto Generated Below -->


## Usage

### Go-badge

<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

<wc-playground
  tag="go-badge"
  props="[
  {name: 'count', type: 'number'},
  {name: 'min', type: 'number'},
  {name: 'max', type: 'number'},
  {name: 'dotOnly', type: 'boolean'},
  {name: 'label', type: 'string'},
  ]"
  slots='[
  {
    "name": "default",
    "docs": "Element to receive the badge"
  },
  ]'
  code='
  <go-badge label="You have 9 unread messages" count="9" min="1" max="1000">
    <go-button variant="primary" icon aria-label="Example Button">
      <go-icon decorative name="favorite"></go-icon>
    </go-button>
  </go-badge>'
>
</wc-playground>



## Properties

| Property  | Attribute  | Description                                                                                         | Type      | Default     |
| --------- | ---------- | --------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `count`   | `count`    | Number to be displayed on the badge                                                                 | `number`  | `undefined` |
| `dotOnly` | `dot-only` | If true, the badge will be displayed only as a dot, no number will be shown                         | `boolean` | `false`     |
| `label`   | `label`    | Provide a meaningful label for the badge                                                            | `string`  | `undefined` |
| `max`     | `max`      | maximum number displayable on the badge, if count is greater than max, `{max}+` is displayed        | `number`  | `99`        |
| `min`     | `min`      | minimum number displayable on the badge, if count is less than min, the badge will not be displayed | `number`  | `0`         |


----------------------------------------------


