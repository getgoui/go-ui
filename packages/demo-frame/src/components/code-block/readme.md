# code-block



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type     | Default  |
| ---------- | ---------- | ----------- | -------- | -------- |
| `code`     | `code`     |             | `string` | `''`     |
| `language` | `language` |             | `string` | `'html'` |


## Dependencies

### Used by

 - [go-demo-box](../go-demo-box)
 - [wc-output](../demo-playground)

### Depends on

- [copy-code-btn](../copy-code-btn)

### Graph
```mermaid
graph TD;
  code-block --> copy-code-btn
  copy-code-btn --> go-button
  copy-code-btn --> go-tooltip
  go-button --> go-spinner
  go-demo-box --> code-block
  wc-output --> code-block
  style code-block fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
