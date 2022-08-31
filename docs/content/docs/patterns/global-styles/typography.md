---
title: Typography
order: 4
tags:
  - Global styles
  - Utility
---

import Demo from '@/components/Demo';
import demoSource from '!!raw-loader!@/go-ui/patterns/typography/demo/typography.html';
import headingDemo from '!!raw-loader!@/go-ui/patterns/typography/demo/headings.html';
import positionDemo from '!!raw-loader!@/go-ui/patterns/typography/demo/positions.html';

# Typography

GO UI provides a simple and flexible typography system.

## Font families

You can use `--go-heading-font-family` and `--go-body-font-family` CSS variables to set the heading and body font families. e.g.

```css
/* Assuming Open Sans and Roboto fonts are loaded */
:root {
  --go-heading-font-family: 'Open Sans', sans-serif;
  --go-body-font-family: 'Roboto', sans-serif;
}
```

## Fluid type scale

### Fluid typography

Fluid typography means the font size changes depending on the screen size. The benefit of this technique is that the text is readable on all screen sizes.

Go UI uses the [CSS clamp](<https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()>) function to give the fluid font sizes a minimum and a maximum limit. By default, on _mobile_ screens (`<768px`), the base font size is set to the minimum value (`16px/1rem`), from _tablet_ to _large_ sizes (`>=768px, <1400px`), they fluidly increases, then from _large_ screens (`>1400px`) onwards the base font size is set to the maximum value.

:::tip
We used the [utopia type calculator](https://utopia.fyi/type/calculator/?c=768,16,1.2,1440,16,1.25,8,1,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l) to produce our default font sizes, use it to find the best fit for your project and remember to replace the css variable names `--step-*` with `--go-size-*`.
:::

### Type scales

The scale factor we chose as default is `1.2` on min viewport and `1.25` on max viewport. This means starting from the base font-size (16px/1rem), each step goes up (or down) by 20% and 25% respectively.

There are 10 scale steps in total:

| Scale step | Description                                                            | Utility class               |
| ---------- | ---------------------------------------------------------------------- | --------------------------- |
| -1         | The smallest _readable_ font size                                      | `.text-size--1`             |
| 0          | The base font size used in body (also used by `h6`)                    | `.text-size-0` `.text-body` |
| 1          | A slightly bigger size to provide emphasis (also used by `h5`)         | `.text-size-1`              |
| 2          | Heading 4 equivalent                                                   | `.text-size-2`              |
| 3          | Heading 3 equivalent                                                   | `.text-size-3`              |
| 4          | Heading 2 equivalent                                                   | `.text-size-4`              |
| 5          | Heading 1 equivalent                                                   | `.text-size-5`              |
| 6          | A size for display purposes rather than structural (e.g. hero heading) | `.text-size-6`              |
| 7          | Large font size (e.g. hero heading)                                    | `.text-size-7`              |
| 8          | Largest font size on site (e.g. landing page hero heading)             | `.text-size-8`              |

### Type scale utility classes

You can use the _`.text-size-{n}`_ utility classes to set the text scale to a specific level (-1 to 8).

<!-- Demos, tips, variations, use cases -->

## Demo

Here's what the typography looks like in action:

<Demo code={demoSource} />

## Utility classes

Go UI is **_not_** an atomic CSS framework, meaning we don't want to reinvent the wheel. We only provide some basic utility classes help with 80% of the use cases. You can still use your preferred utility framework such as Tailwind alongside Go UI.

Here are the basic typography utility classes that come with Go:

### Headings

You can use the following utility classes to style non-heading elements as headings:

`.h1`, `.h2`, `.h3`, `.h4`, `.h5`, `.h6`

:::tip
Some times you might want an "extra large" heading. You can use the `.text-display-1` and `.text-display-2` utility classes to enlarge the font size. Notice these 2 classes are not coupled with any heading tag.
:::

<Demo code={headingDemo} />

### Positioning

Basic positioning utility classes:

`.text-start`, `.text-center`, `.text-end`, `text-justify`

<Demo code={positionDemo} />
