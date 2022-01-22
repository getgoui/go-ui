## go-main-nav API

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                     | Type                   | Default     |
| -------- | --------- | ------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `items`  | `items`   | Navigation items to be rendered if provided, slot content will not be rendered. | `INavItem[] \| string` | `undefined` |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `navigate` |             | `CustomEvent<any>` |


## Methods

### `parseItems(items: INavMenu | string) => Promise<INavMenu>`

parse items prop passed into the menu component

#### Returns

Type: `Promise<INavMenu>`




## Dependencies

### Depends on

- [go-icon](../../components/go-icon)

### Graph
```mermaid
graph TD;
  go-main-nav --> go-icon
  style go-main-nav fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


