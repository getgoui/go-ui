## go-to-top API

<!-- Auto Generated Below -->


## Usage

### Go-to-top

<div class="container" style="height: 400px">
  <go-md sanitise="true" md-options="{html: true}" src="//raw.githubusercontent.com/getgoui/go-ui/main/README.md">Fallback content.</go-md>

  <go-to-top></go-to-top>
</div>



## Properties

| Property | Attribute | Description                                                         | Type     | Default |
| -------- | --------- | ------------------------------------------------------------------- | -------- | ------- |
| `offset` | `offset`  | how far from the top of the page the button should be shown (in px) | `number` | `200`   |


## CSS Custom Properties

| Name                 | Description                                    |
| -------------------- | ---------------------------------------------- |
| `--go-to-top-bottom` | Bottom position of the button. - default: 2rem |
| `--go-to-top-right`  | Right position of the button. - default: 2rem  |


## Dependencies

### Depends on

- [go-button](../go-button)
- [go-tooltip](../go-tooltip)

### Graph
```mermaid
graph TD;
  go-to-top --> go-button
  go-to-top --> go-tooltip
  style go-to-top fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
