# Media queries


## Customise breakpoints

You can customise media query breakpoints by importing the source scss file and overriding the `$breakpoints` variable.

```scss
// your/project/path/to/style.scss
$breakpoints = (
  phablet: '540px',
  tablet: '768px',
  desktop: '1024px',
  ultrawide: '1400px',
);
```
