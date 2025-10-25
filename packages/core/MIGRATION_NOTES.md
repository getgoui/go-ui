# Sass to PostCSS Migration - Global Styles and Utils

## Overview
This migration replaces Sass with PostCSS for global styles and utilities as per issue #278. Component-level SCSS files remain unchanged and continue to use Sass.

## What Was Migrated

### Global Styles (now in `src/global/css/`)
- ✅ `normalize.css` - Browser normalization styles
- ✅ `css_variables.css` - CSS custom properties (font sizes, spacing, colors, etc.)
- ✅ `colors.css` - Color scheme definitions (light/dark mode)
- ✅ `base.css` - Base HTML element styles
- ✅ `typography.css` - Typography utilities and styles
- ✅ `spacing.css` - Margin, padding, and gap utilities
- ✅ `display.css` - Display utilities
- ✅ `flex.css` - Flexbox utilities
- ✅ `grid.css` - Grid system
- ✅ `breakpoint_sync.css` - Breakpoint synchronization
- ✅ `misc.css` - Miscellaneous styles (tables, etc.)

### PostCSS Mixins (in `src/global/css/utils/mixins.css`)
Converted Sass mixins to PostCSS mixins:
- Media query mixins (`min-query`, `tablet`, `desktop`)
- Utility mixins (`reset-btn`, `visually-hidden`, `underline`)
- Theme mixins (`theme-light`, `theme-dark`, `prefer-light`, `prefer-dark`)
- Accessibility mixins (`focus-outline`, `reduced-motion`)
- Component mixins (`clickable`, `unstyled-list`, `text-size`)

## What Remains in Sass

### Component Styles
- All component `.scss` files continue to use Sass
- Form-related SCSS files (`src/global/scss/form/`)
- Component-specific mixins and utilities

### Utility Files (for component use)
- `src/global/scss/_utils.scss` - Still injected globally for components
- `src/global/scss/utils/_mixins.scss` - Sass mixins for components
- `src/global/scss/utils/_scss_vars.scss` - Sass variables for components

## Technical Changes

### Dependencies Added
```json
{
  "postcss-import": "^16.1.1",
  "postcss-nested": "^7.0.2",
  "postcss-mixins": "^11.0.3"
}
```

### Stencil Configuration
Updated `stencil.config.ts`:
- Added PostCSS plugins: `postcss-import`, `postcss-mixins`, `postcss-nested`
- Configured `postcss-import` to handle `~` prefix for node_modules
- Kept Sass plugin for component SCSS files
- Global style entry point: `src/global/styles.scss` (imports CSS files)

### File Structure
```
src/global/
├── styles.scss          # Main entry point (imports styles.css + form SCSS)
├── styles.css           # New CSS-based global styles
├── css/                 # New PostCSS-based files
│   ├── normalize.css
│   ├── css_variables.css
│   ├── colors.css
│   ├── base.css
│   ├── typography.css
│   ├── spacing.css
│   ├── display.css
│   ├── flex.css
│   ├── grid.css
│   ├── breakpoint_sync.css
│   ├── misc.css
│   ├── themes/
│   │   └── tokens.css
│   └── utils/
│       └── mixins.css
└── scss/                # Remaining Sass files
    ├── _utils.scss      # Still used by components
    ├── form/            # Form styles (not migrated)
    └── utils/           # Sass utilities for components
```

## Key Differences

### Sass Loops → Static CSS
Sass `@for` and `@each` loops were expanded into static CSS classes:
- Typography size utilities (`.text-size--1` through `.text-size-8`)
- Spacing utilities (`.p-0` through `.p-10`, `.m-0` through `.m-10`, etc.)
- Display utilities (`.d-none`, `.d-flex`, etc.)
- Flex utilities (`.align-items-*`, `.justify-content-*`)
- Grid columns (`.col-1` through `.col-12`)
- Responsive variants for all breakpoints

### Sass Variables → CSS Custom Properties
All Sass variables converted to CSS custom properties:
```scss
// Before (Sass)
$spacer: 0.5rem;

// After (CSS)
--go-base-spacing: 0.25rem;
```

### Sass Mixins → PostCSS Mixins
```scss
// Before (Sass)
@mixin tablet {
  @media (min-width: 600px) {
    @content;
  }
}

// After (PostCSS)
@define-mixin tablet {
  @media (min-width: 600px) {
    @mixin-content;
  }
}
```

### Color Scheme Generation
Sass loops for color generation were expanded into explicit CSS custom properties for all color categories (primary, secondary, success, critical, neutral) and shades (100-900).

## Breaking Changes
None - this is a build-time migration. The generated CSS output remains functionally identical.

## Benefits
1. ✅ Removes Sass deprecation warnings for global styles
2. ✅ Simplifies build process for global styles
3. ✅ Uses modern CSS features (custom properties, nesting)
4. ✅ Maintains backward compatibility
5. ✅ Keeps component flexibility with Sass

## Future Work
- Migrate form styles from Sass to PostCSS
- Migrate component SCSS files to CSS (separate issues)
- Remove Sass dependency entirely once all files are migrated

## Testing
Build tested successfully:
```bash
pnpm --filter @go-ui/core build
# Build finished in ~21s with no errors
```
