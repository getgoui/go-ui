## go-hero API

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                              | Type                   | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------ | ---------------------- | ----------- |
| `breadcrumb` | `breadcrumb`  |                                                                          | `INavItem[] \| string` | `undefined` |
| `heading`    | `heading`     |                                                                          | `string`               | `undefined` |
| `imgAlt`     | `img-alt`     | hero image alt text (requires img-src attribute to be present to render) | `string`               | `undefined` |
| `imgSrc`     | `img-src`     | hero image src url (requires img-alt attribute to be present to render)  | `string`               | `undefined` |
| `preHeading` | `pre-heading` |                                                                          | `string`               | `undefined` |


## Dependencies

### Depends on

- [go-breadcrumb](../go-breadcrumb)

### Graph
```mermaid
graph TD;
  go-hero --> go-breadcrumb
  go-breadcrumb --> go-nav-link
  go-nav-link --> go-icon
  style go-hero fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


