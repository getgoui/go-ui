## go-skip-link API

<!-- Auto Generated Below -->


## Usage

### Go-skip-link

<go-skip-link target="[data-example='target']">Skip to target</go-skip-link>

<ul>
  <li><a href="#">Link to skip</a></li>
  <li><a href="#">Link to skip</a></li>
  <li><a href="#">Link to skip</a></li>
  <li><a href="#">Link to skip</a></li>
</ul>

<div data-example="target">
  <p>This is a <a href="#">test</a></p>
</div>



## Properties

| Property | Attribute | Description                                                         | Type     | Default  |
| -------- | --------- | ------------------------------------------------------------------- | -------- | -------- |
| `target` | `target`  | Tell skip link which element to focus (supports any query selector) | `string` | `'main'` |


## CSS Custom Properties

| Name                     | Description                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `--skip-link-bg-color`   | Background color for the skip link focusable area - default: var(--go-color-secondary-700) |
| `--skip-link-padding`    | Padding to apply to the skip link focusable area - default: 1rem 2rem                      |
| `--skip-link-text-color` | Text color for the skip link focusable area - default: var(--go-color-lightest)            |


----------------------------------------------


