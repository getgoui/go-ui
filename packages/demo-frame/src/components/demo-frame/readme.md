# demo-frame



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                | Type      | Default     |
| ------------ | ------------- | ------------------------------------------ | --------- | ----------- |
| `code`       | `code`        | custom code to be injected into demo frame | `string`  | `undefined` |
| `component`  | `component`   |                                            | `string`  | `undefined` |
| `demo`       | `demo`        |                                            | `string`  | `undefined` |
| `hideSource` | `hide-source` |                                            | `boolean` | `false`     |


## Dependencies

### Depends on

- [go-demo-box](../go-demo-box)

### Graph
```mermaid
graph TD;
  demo-frame --> go-demo-box
  go-demo-box --> go-button-group
  go-demo-box --> go-button
  go-demo-box --> go-tooltip
  go-demo-box --> go-switch
  go-demo-box --> go-accordion
  go-demo-box --> go-accordion-item
  go-demo-box --> code-block
  go-button --> go-spinner
  code-block --> copy-code-btn
  copy-code-btn --> go-button
  copy-code-btn --> go-tooltip
  style demo-frame fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
