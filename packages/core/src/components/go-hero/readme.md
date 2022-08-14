## go-hero API

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                              | Type                   | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------ | ---------------------- | ----------- |
| `breadcrumb` | `breadcrumb`  | Breadcrumb navigation items                                              | `INavItem[] \| string` | `undefined` |
| `heading`    | `heading`     | Hero heading (h1)                                                        | `string`               | `undefined` |
| `imgAlt`     | `img-alt`     | hero image alt text (requires img-src attribute to be present to render) | `string`               | `undefined` |
| `imgSrc`     | `img-src`     | hero image src url (requires img-alt attribute to be present to render)  | `string`               | `undefined` |
| `preHeading` | `pre-heading` | Pre heading text - use only when required                                | `string`               | `undefined` |


## Slots

| Slot        | Description                    |
| ----------- | ------------------------------ |
| `"default"` | content below the main heading |


## Dependencies

### Used by

 - [go-content-layout](../../patterns/go-content-layout)

### Depends on

- [go-breadcrumb](../go-breadcrumb)

### Graph
```mermaid
graph TD;
  go-hero --> go-breadcrumb
  go-breadcrumb --> go-nav-link
  go-nav-link --> go-icon
  go-content-layout --> go-hero
  style go-hero fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


