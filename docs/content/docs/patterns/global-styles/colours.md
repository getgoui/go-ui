---
title: Colours
order: 1
tags:
  - Utility
  - Global styles
---

# Colours

We found that the most common colours used in the web can be categorised in these groups:

- Layout colours (e.g. background, text, border)
- Interactive colours (e.g. primary & secondary)
- Signal colours (e.g. success message, error message)
- Neutral colours (e.g. greys)
- Lightest and darkest colours (e.g. white, black)

The colour system we use includes these colours as global tokens, our component-specific css variables utilise these tokens and make them customisable at different level of consumption. Their relationship can be represented as below:

![Colour levels diagram, from tokens to global css variables to component styles](/colour-levels.png)

## Tokens

Colour tokens are the atomic pieces of our colour system, they form the following categories:

- primary (100 - 900)
- secondary (100 - 900)
- success (100 - 900)
- critical (100 - 900)
- neutral (100 - 900)
- lightest
- darkest

These tokens represent the values of individual colours and made available as CSS variables (e.g. --go-token-primary-100).

Due to the limitation of browsers ability to [manipulate relative colours](https://www.w3.org/TR/css-color-5/#relative-colors), for ease of use, the tokens store only the values of the colours.
i.e. for the `darkest` token:

`--go-token-darkest` = `0, 0, 0`
and the CSS variable that maps to this token
`--go-color-darkest` = `rgb(var(--go-token-darkest))`.

One benefit of this is it allows us to simply remap the 100-900 levels in reverse (900-100) when it comes to dark theme (with tweaks in components to make them look nice)

When light theme (default) is used, 100 means lightest shade of this color, while 900 means darkest shade; in dark theme the opposite is true.

## Global CSS Variables

Tokens are only the values for the css colour functions, using these values we create the set of global CSS variables for our components to use.

The format of the names of these CSS variables is `--go-color-${color-name}-${level}`

For example: `background: var(--go-color-primary-800)` will give you a background with `--go-token-primary-800` in light theme and `--go-token-primary-200` in dark theme.
