# go-button-group

<!-- Auto Generated Below -->


## Usage

### Button-group

<div class="container">
  <div class="row">
    <div class="col-12">
      <go-button-group block="mobile">
        <go-button variant="primary">Primary action</go-button>
        <go-button variant="secondary" outline-fill flat>Secondary action</go-button>
      </go-button-group>
    </div>
  </div>
</div>


### Button-group-connected

<div class="container">
  <div class="row">
    <div class="col-tablet-6">
      <p>Connected button group</p>
      <go-button-group connected>
        <go-button variant="primary">Button</go-button>
        <go-button variant="primary">Button</go-button>
        <go-button variant="primary">Button</go-button>
      </go-button-group>
    </div>
    <div class="col-tablet-6">
      <p>Connected compact buttons</p>
      <go-button-group connected>
        <go-button variant="secondary" compact>Button</go-button>
        <go-button variant="secondary" compact>Button</go-button>
        <go-button variant="secondary" compact>Button</go-button>
      </go-button-group>
    </div>
  </div>
</div>



## Properties

| Property    | Attribute   | Description                                                                                                                                                                                                                                        | Type                                                    | Default     |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------- |
| `block`     | `block`     | If specified, buttons within group will be full width on smaller devices and auto-width going forward. e.g. having `block="tablet"` will make all buttons in group take up full width on mobile and tablet sizes and auto-width on larger devices. | `"all" \| "desktop" \| "large" \| "mobile" \| "tablet"` | `undefined` |
| `connected` | `connected` | No gap between buttons.                                                                                                                                                                                                                            | `boolean`                                               | `false`     |


## CSS Custom Properties

| Name                    | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| `--go-button-group-gap` | gap size between buttons inside the group - default: 1rem |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
