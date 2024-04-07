# go-playground-header



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description | Type  | Default     |
| --------- | ---------- | ----------- | ----- | ----------- |
| `logoSrc` | `logo-src` |             | `any` | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `darkModeChange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [go-playground](.)

### Depends on

- go-banner
- go-gov-au-logo
- go-dark-mode
- go-switch
- go-button
- go-dialog
- go-input

### Graph
```mermaid
graph TD;
  go-playground-header --> go-banner
  go-playground-header --> go-gov-au-logo
  go-playground-header --> go-dark-mode
  go-playground-header --> go-switch
  go-playground-header --> go-button
  go-playground-header --> go-dialog
  go-playground-header --> go-input
  go-banner --> go-button
  go-button --> go-spinner
  go-dialog --> go-overlay
  go-dialog --> go-button
  go-input --> go-field
  go-playground --> go-playground-header
  style go-playground-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
