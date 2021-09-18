---
sidebar_position: 1
---

# Sass 

Go Components are built with [Sass](https://sass-lang.com/) preprocessor. Although CSS variables in modern browsers gives us a lot of flexibility, there are cases where pre-processing and post-processing are required, such as defining breakpoints for media queries. 

This means if your project supports sass, you can utilise our built-in customisation options to customise your global stylesheet.

## Importing sass source into your project

```scss
@import '~go-components/src/global/styles.scss';
```

If you only need to utilise the variables and mixins, you can import the utils partial like this:

```scss
@import '~go-components/src/global/scss/utils.scss';
```


## Overriding Sass variables

Unlike other languages, overriding sass variables needs to happen *before* your imports. For example, if you wish to add custom breakpoints to the grid system, you can do so like this:

```scss
$breakpoints: (
  phablet: 540px,
  laptop: 1200px,
  4k: 2560px
);
// This will generate classes such as `.container-phablet` and `.col-4k-1` to `.col-4k-12`
@import '~go-components/src/global/styles.scss';
```
