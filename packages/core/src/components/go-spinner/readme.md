## go-spinner API

<!-- Auto Generated Below -->


## Usage

### Go-spinner

<div class="container">
  <go-card card-title="Spinner">
    <p>Click the button below to toggle loading states.</p>
    <go-spinner></go-spinner>
    <br />
    <go-spinner style="--spinner-size: 2rem; --spinner-ring-color: var(--go-color-success-500); --spinner-ring-width: 0.5rem">Making doughnut</go-spinner>
    <br />
    <go-spinner stacked="true" style="--spinner-size: 4rem; --spinner-ring-color: var(--go-color-secondary-600)">Stacked label</go-spinner>

    <go-button slot="footer" type="button" id="toggle-btn">
      <go-spinner></go-spinner>
      Toggle loading state
    </go-button>
  </go-card>
</div>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    const spinners = document.querySelectorAll('go-spinner');
    const toggleBtn = document.getElementById('toggle-btn');
    toggleBtn.addEventListener('click', function () {
      // toggle loading state
      for (let i = 0; i < spinners.length; i++) {
        spinners[i].loading = !spinners[i].loading;
      }
    });
  });
</script>



## Properties

| Property    | Attribute    | Description                                                                | Type      | Default     |
| ----------- | ------------ | -------------------------------------------------------------------------- | --------- | ----------- |
| `baseColor` | `base-color` | Set the base color of the spinner.                                         | `string`  | `undefined` |
| `duration`  | `duration`   | Set how long it should take to complete one full rotation in milliseconds. | `number`  | `undefined` |
| `loading`   | `loading`    | set the loading state                                                      | `boolean` | `true`      |
| `ringColor` | `ring-color` | Set the ring color of the spinner.                                         | `string`  | `undefined` |
| `ringWidth` | `ring-width` | Set the width of the spinner ring                                          | `string`  | `undefined` |
| `size`      | `size`       | Set the width and height of the spinner.                                   | `string`  | `undefined` |
| `stacked`   | `stacked`    | If true, spinner and label will be stacked.                                | `boolean` | `false`     |


----------------------------------------------


