## go-toc API

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                             | Type     | Default          |
| ---------- | ---------- | --------------------------------------- | -------- | ---------------- |
| `label`    | `label`    | Label for the TOC                       | `string` | `'On this page'` |
| `scope`    | `scope`    | Specify the scope to get TOC items from | `string` | `'main'`         |
| `selector` | `selector` | Selector for the TOC items              | `string` | `'h2'`           |


## Dependencies

### Depends on

- [go-nav-link](../navigation/go-nav-link)

### Graph
```mermaid
graph TD;
  go-toc --> go-nav-link
  go-nav-link --> go-icon
  style go-toc fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


