# copy-code-btn



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default |
| -------- | --------- | ----------- | -------- | ------- |
| `code`   | `code`    |             | `string` | `''`    |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `copyCode` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [code-block](../code-block)

### Depends on

- go-button
- go-tooltip

### Graph
```mermaid
graph TD;
  copy-code-btn --> go-button
  copy-code-btn --> go-tooltip
  go-button --> go-spinner
  code-block --> copy-code-btn
  style copy-code-btn fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
