## go-nav-link API

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                       | Type       | Default     |
| ----------- | ------------ | --------------------------------- | ---------- | ----------- |
| `block`     | `block`      | full width                        | `boolean`  | `false`     |
| `item`      | --           | navigation item                   | `INavItem` | `undefined` |
| `showArrow` | `show-arrow` | show arrow at the end of the link | `boolean`  | `false`     |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `navigate` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [go-breadcrumb](../../go-breadcrumb)
 - [go-card-row](../../../patterns/go-card-row)
 - [go-main-nav](../go-main-nav)
 - [go-nav-list](../go-nav-list)
 - [go-toc](../../go-toc)

### Depends on

- [go-icon](../../go-icon)

### Graph
```mermaid
graph TD;
  go-nav-link --> go-icon
  go-breadcrumb --> go-nav-link
  go-card-row --> go-nav-link
  go-main-nav --> go-nav-link
  go-nav-list --> go-nav-link
  go-toc --> go-nav-link
  style go-nav-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


