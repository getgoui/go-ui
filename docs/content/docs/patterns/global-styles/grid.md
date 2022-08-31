---
title: Grid
order: 2
tags:
  - Layout
  - Global styles
  - Utility
---

import Demo from '@/components/Demo';
import demoSource from '!!raw-loader!@/go-ui/patterns/grid/demo/grid.html';
import offsetDemoSource from '!!raw-loader!@/go-ui/patterns/grid/demo/grid-offset.html';

# Grid

<!-- Description -->

Go Components provides a familar 12-column grid system, with a few key differences to simplify the usage:

## breakpoints

There are less breakpoints in GO than other popular CSS frameworks, as we often realise we used 50% of the breakpoints for most of our usecases. Hence, we've reduced the number of breakpoints to 4:

- `mobile` (< 768px)
- `tablet` (768px - 1199px)
- `desktop` (1200px - 1399px)
- `large` (>= 1400px)

The reason for naming them based on device types is that we often find teams communicate easier with these names than with arbitrary numbers or T-shirt sizes.

You can add more breakpoints by overriding the `$breakpoints` sass variable. [See how to override sass variables](../../guides/theming/sass#overriding-sass-variables).

## Media query modifiers

The media query modifiers are based on the device names you have in the `$breakpoints` varialbe. (e.g. `col-tablet-6`, `col-desktop-4`)

## Gutter/gap sizes

There is no default gap between columns, you can add it by changing the `--go-grid-gap` and `--go-outer-gutter` css variable.

- `--go-col-gap` changes the gap size in between columns
- `--go-outer-gutter` applies left/right paddings on the `container`.

## Demo

<Demo code={demoSource} />

## Offset

<Demo code={offsetDemoSource} />
