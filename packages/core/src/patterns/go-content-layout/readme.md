---
title: Content layout
tags:
  - Layout
---

# Content layout

<!-- Description -->

Content layout provide built-in accessible regions and helps developers to create common layouts easily.

## Demo

<demo-frame component="go-content-layout" demo="go-content-layout"></demo-frame>

## With table of content

Simply add the `toc` boolean attribute to generate a table of content on the fly.

If you need to target a different section or use different selectors, use `tocProps` (see [`go-toc`](/docs/components/go-toc) component)

If you have a sidebar slotted in, the position of the table of content navigation element is going to respect the sidebar's positioning ([see below](#sidebar-position)), if there is no sidebar, the table of content element is placed on top of the main content section.

<demo-frame component="go-content-layout" demo="toc"></demo-frame>

## With sidebar

The `sidebar` slot is provided to place any HTML elements besides the main content (stacked on mobile).

### Sidebar position

By default the sidebar is positioned on the `start` side (left if ltr, right if rtl) and you can customise this by specify `start` or `end` in the `sidebarMobilePosition` and `sidebarDesktopPosition` attributes.

<demo-frame component="go-content-layout" demo="sidebar"></demo-frame>

<!-- Auto Generated Below -->
