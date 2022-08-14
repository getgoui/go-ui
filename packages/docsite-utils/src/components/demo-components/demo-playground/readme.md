## demo-playground API

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                        | Type                | Default     |
| -------- | --------- | -------------------------------------------------- | ------------------- | ----------- |
| `block`  | `block`   |                                                    | `boolean`           | `false`     |
| `code`   | `code`    |                                                    | `string`            | `''`        |
| `props`  | `props`   |                                                    | `IProp[] \| string` | `undefined` |
| `slots`  | `slots`   |                                                    | `ISlot[] \| string` | `undefined` |
| `tag`    | `tag`     | query selector for the component to apply props to | `string`            | `undefined` |


## Events

| Event    | Description | Type                       |
| -------- | ----------- | -------------------------- |
| `loaded` |             | `CustomEvent<HTMLElement>` |


## Dependencies

### Depends on

- go-button
- go-accordion
- go-accordion-item
- [props-panel](.)
- [slots-panel](.)
- [wc-output](.)

### Graph
```mermaid
graph TD;
  wc-playground --> go-button
  wc-playground --> go-accordion
  wc-playground --> go-accordion-item
  wc-playground --> props-panel
  wc-playground --> slots-panel
  wc-playground --> wc-output
  wc-output --> go-accordion
  wc-output --> go-accordion-item
  wc-output --> go-button
  style wc-playground fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


