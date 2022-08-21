## go-progress API

<!-- Auto Generated Below -->


## Usage

### Go-progress

<div class="container" style="padding-right: 4rem">
  <h3>Determinate</h3>
  <go-progress class="determinate-progress" label="Determinate progress bar" value="10" max="100" label="10%"></go-progress>

  <p id="progress-2-label">Progress bar that shows percentage</p>
  <go-progress class="determinate-progress" labelledby="progress-2-label" value="10" max="100" label="10%" show-percentage></go-progress>
  <go-button-group class="center" connected>
    <go-button round type="button" id="add-btn">+10%</go-button>
    <go-button round outline-fill type="button" id="remove-btn">-10%</go-button>
  </go-button-group>

  <h3>Indeterminate</h3>
  <p>Neither <code>value</code> nor <code>indeterminate</code> is set</p>
  <go-progress></go-progress>
  <p>Both <code>value</code> nor <code>indeterminate</code> are set (with <code>indeterminate</code> set to true)</p>
  <go-progress label="Loading" value="10" max="100" indeterminate="true"></go-progress>
  <p>With <code>indeterminate</code> set to false</p>
  <go-progress max="100" indeterminate="false"></go-progress>
</div>
<script>
  document.getElementById('add-btn').addEventListener('click', function () {
    var progresses = document.querySelectorAll('.determinate-progress');
    progresses.forEach(function (progress) {
      const newVal = progress.value + 10;
      progress.setAttribute('value', newVal);
      progress.setAttribute('label', newVal + '%');
    });
  });
  // remove 10%
  document.getElementById('remove-btn').addEventListener('click', function () {
    var progresses = document.querySelectorAll('.determinate-progress');
    progresses.forEach(function (progress) {
      const newVal = progress.value - 10;
      progress.setAttribute('value', newVal);
      progress.setAttribute('label', newVal + '%');
    });
  });
</script>
<style>
  .center {
    display: flex;
    justify-content: center;
  }
</style>



## Properties

| Property         | Attribute         | Description                                                       | Type      | Default     |
| ---------------- | ----------------- | ----------------------------------------------------------------- | --------- | ----------- |
| `indeterminate`  | `indeterminate`   | Set progress to indeterminate state                               | `boolean` | `false`     |
| `label`          | `label`           | Descriptive label for screen readers to identify the progress bar | `string`  | `undefined` |
| `labelledby`     | `labelledby`      | Id of the label element for the progress bar                      | `string`  | `undefined` |
| `max`            | `max`             | Total amount of work required for progress to complete            | `number`  | `100`       |
| `min`            | `min`             | min value of the progress bar                                     | `number`  | `0`         |
| `showPercentage` | `show-percentage` | Display percentage of completion                                  | `boolean` | `false`     |
| `value`          | `value`           | How much of the task that has been completed                      | `number`  | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
