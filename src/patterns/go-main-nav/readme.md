## go-main-nav API

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute      | Description                                                                                                                     | Type                   | Default     |
| ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `fullMenuAt` | `full-menu-at` | Specify at what breakpoint (see [scss breakpoints](/docs/patterns/global-styles/grid#breakpoints)) should desktop menu be shown | `string`               | `'desktop'` |
| `items`      | `items`        | Navigation items to be rendered                                                                                                 | `INavItem[] \| string` | `undefined` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `init(items: INavItem[]) => Promise<void>`

Initialise the menu

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------


