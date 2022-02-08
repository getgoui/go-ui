## API

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                                     | Type                                                                                                                                                                       | Default            |
| ------------ | ------------ | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `color`      | `color`      | Color of the icon,  supports CSS units and variables. Default: `currentColor`                                   | `string`                                                                                                                                                                   | `undefined`        |
| `decorative` | `decorative` | Mark this icon to be hidden from screen reader                                                                  | `boolean`                                                                                                                                                                  | `false`            |
| `iconSet`    | `icon-set`   | Specify the icon set being referenced. Icon font CSS files must be included in the page.                        | `"bx" \| "bxl" \| "bxs" \| "fab" \| "fad" \| "fal" \| "far" \| "fas" \| "material-icons" \| "material-icons-outlined" \| "material-icons-round" \| "material-icons-sharp"` | `'material-icons'` |
| `name`       | `name`       | Name of the icon                                                                                                | `string`                                                                                                                                                                   | `undefined`        |
| `size`       | `size`       | Size of the icon, supports CSS units and variables. Default: 1.5em for material icons, 1em for other icon sets. | `string`                                                                                                                                                                   | `undefined`        |


## Dependencies

### Used by

 - [go-main-nav](../navigation/go-main-nav)
 - [go-nav-drawer](../navigation/go-nav-drawer)
 - [go-nav-link](../navigation/go-nav-link)

### Graph
```mermaid
graph TD;
  go-main-nav --> go-icon
  go-nav-drawer --> go-icon
  go-nav-link --> go-icon
  style go-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


