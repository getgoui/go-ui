## go-nav-list API

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute | Description                              | Type         | Default     |
| ------------- | --------- | ---------------------------------------- | ------------ | ----------- |
| `block`       | `block`   | Make the list full width                 | `boolean`    | `false`     |
| `heading`     | `heading` | Heading text                             | `string`     | `undefined` |
| `headingItem` | --        | Heading navigation item                  | `INavItem`   | `undefined` |
| `items`       | --        | list of navigation items to be displayed | `INavItem[]` | `undefined` |


## Dependencies

### Depends on

- [go-nav-link](../go-nav-link)

### Graph
```mermaid
graph TD;
  go-nav-list --> go-nav-link
  go-nav-link --> go-icon
  style go-nav-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

