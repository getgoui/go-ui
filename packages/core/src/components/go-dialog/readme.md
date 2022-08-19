## go-dialog API

<!-- Auto Generated Below -->


## Usage

### Go-dialog

<style>
  .skeleton {
    width: 100%;
    height: 120vh;
    background: var(--go-color-secondary-100);
    margin: 2rem 0;
  }
</style>
<div class="container">
  <p style="position: sticky; top: 0; background: var(--go-color-lightest)">
    <go-button block="mobile" id="btn">Show dialog</go-button>
    <br />
    <go-button block="mobile" id="btn-persistent">Show persistent dialog</go-button>
  </p>
  <p>A dialog should capture the keyboard focus.</p>
  <p>A dialog should also prevent body from scrolling when active.</p>
  <p>See <a href="https://www.w3.org/TR/wai-aria-practices/#dialog_modal" target="_blank" rel="nofollow noopener">WAI Design Pattern</a> for more details.</p>

  <a href="#">Focus</a>
  <a href="#">Focus</a>
  <a href="#">Focus</a>
  <a href="#">Focus</a>
  <a href="#">Focus</a>

  <div class="skeleton"></div>
</div>

<!-- dismissible dialog -->
<go-dialog id="normal" heading="Dialog content">
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. A eos, quidem sint perferendis suscipit
    <a href="#">Focus</a>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, sapiente.
    <a href="#">Trapped</a>
  </p>

  <div>
    <go-button id="close-btn" block="mobile">Close</go-button>
  </div>
</go-dialog>

<!-- persistent dialog -->
<go-dialog id="persistent" persistent="true" heading="Heading">
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. A eos, quidem sint perferendis suscipit
    <a href="#">Focus</a>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, sapiente.
    <a href="#">Focus Trapped</a>
  </p>

  <div>
    <go-button id="close-persistent-btn" block="mobile">Close</go-button>
  </div>
</go-dialog>

<script>
  const dialog = document.querySelector('#normal');
  const persistentDialog = document.querySelector('#persistent');

  document.querySelector('#btn').addEventListener('click', () => {
    dialog.open();
  });
  document.querySelector('#btn-persistent').addEventListener('click', () => {
    persistentDialog.open();
  });
  document.querySelector('#close-btn').addEventListener('click', () => {
    dialog.close();
  });
  document.querySelector('#close-persistent-btn').addEventListener('click', () => {
    persistentDialog.close();
  });
</script>



## Properties

| Property     | Attribute    | Description                                                                                                 | Type                        | Default     |
| ------------ | ------------ | ----------------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| `active`     | `active`     | If this dialog is active                                                                                    | `boolean`                   | `false`     |
| `heading`    | `heading`    | Heading of the overlay content                                                                              | `string`                    | `undefined` |
| `persistent` | `persistent` | If persistent, the overlay will not be closed when the user clicks outside of it or presses the escape key. | `boolean`                   | `false`     |
| `role`       | `role`       | Accessible role of the dialog, can be dialog or alertdialog                                                 | `"alertdialog" \| "dialog"` | `'dialog'`  |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [go-overlay](../go-overlay)
- [go-button](../go-button)

### Graph
```mermaid
graph TD;
  go-dialog --> go-overlay
  go-dialog --> go-button
  style go-dialog fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


