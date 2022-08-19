## go-content-layout API

<!-- Auto Generated Below -->


## Usage

### Go-content-layout

<go-content-layout
  breadcrumbs="[
 {
   label: 'Home',
   url: '#',
 },
 {
   label: 'Top level content page',
   url: '#',
 },
 {
   label: 'Parent page',
   url: '#',
 }
 ]"
  pre-heading="Content template"
  page-heading="Example page"
  intro="This page's layout is managed by go-content-layout, the content below comes from the readme markdown file of this project."
  id="layout">
  <go-md id="main" sanitise="true" md-options="{html: true}" src="//raw.githubusercontent.com/getgoui/go-ui/main/README.md">
    <p>
      Sorry the content of this page couldn't be loaded,
      <a href="//raw.githubusercontent.com/getgoui/go-ui/main/README.md" target="_blank">see the source here</a>.
    </p>
  </go-md>
</go-content-layout>

<script>
  const main = document.querySelector('#main');
  const layout = document.querySelector('#layout');
  main.addEventListener('rendered', () => {
    layout.initToc();
  });
</script>


### Sidebar

<go-content-layout
  breadcrumbs="[
 {
   label: 'Home',
   url: '#',
 },
 {
   label: 'Top level content page',
   url: '#',
 },
 {
   label: 'Parent page',
   url: '#',
 }
 ]"
  pre-heading="Content template"
  page-heading="Example page"
  intro="This page's layout is managed by go-content-layout, the content below comes from the readme markdown file of this project."
  toc
  id="layout"
  sidebar-sticky
  sidebar-mobile-position="start"
  sidebar-desktop-position="end">
  <go-md id="main" sanitise="true" md-options="{html: true}" src="//raw.githubusercontent.com/getgoui/go-ui/main/README.md">
    <p>
      Sorry the content of this page couldn't be loaded,
      <a href="//raw.githubusercontent.com/getgoui/go-ui/main/README.md" target="_blank">see the source here</a>.
    </p>
  </go-md>

  <div slot="sidebar">
    <go-card card-title="Sidebar card" card-subtitle="Subtitle">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque natus autem veritatis architecto facilis

      <div slot="footer">
        <go-button variant="primary">Button</go-button>
      </div>
      <img src="//images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&amp;fit=crop&amp;w=600&amp;h=600&amp;q=80" alt="Photo" slot="media" />
      <div slot="pre-title">Active 2 hours ago</div>
    </go-card>
  </div>
</go-content-layout>


### Toc

<go-content-layout
  breadcrumbs="[
 {
   label: 'Home',
   url: '#',
 },
 {
   label: 'Top level content page',
   url: '#',
 },
 {
   label: 'Parent page',
   url: '#',
 }
 ]"
  pre-heading="Content template"
  page-heading="Example page"
  intro="This page's layout is managed by go-content-layout, the content below comes from the readme markdown file of this project."
  toc
  id="layout">
  <go-md id="main" sanitise="true" md-options="{html: true}" src="//raw.githubusercontent.com/getgoui/go-ui/main/README.md">
    <p>
      Sorry the content of this page couldn't be loaded,
      <a href="//raw.githubusercontent.com/getgoui/go-ui/main/README.md" target="_blank">see the source here</a>.
    </p>
  </go-md>
</go-content-layout>

<script>
  const main = document.querySelector('#main');
  const layout = document.querySelector('#layout');
  main.addEventListener('rendered', () => {
    layout.initToc();
  });
</script>



## Properties

| Property                 | Attribute                  | Description | Type                   | Default     |
| ------------------------ | -------------------------- | ----------- | ---------------------- | ----------- |
| `breadcrumbs`            | `breadcrumbs`              |             | `INavItem[] \| string` | `undefined` |
| `heroImgAlt`             | `hero-img-alt`             |             | `string`               | `undefined` |
| `heroImgSrc`             | `hero-img-src`             |             | `string`               | `undefined` |
| `intro`                  | `intro`                    |             | `string`               | `undefined` |
| `pageHeading`            | `page-heading`             |             | `string`               | `undefined` |
| `preHeading`             | `pre-heading`              |             | `string`               | `undefined` |
| `sidebarDesktopPosition` | `sidebar-desktop-position` |             | `"end" \| "start"`     | `'start'`   |
| `sidebarMobilePosition`  | `sidebar-mobile-position`  |             | `"end" \| "start"`     | `'start'`   |
| `sidebarSticky`          | `sidebar-sticky`           |             | `boolean`              | `false`     |
| `toc`                    | `toc`                      |             | `boolean`              | `undefined` |
| `tocProps`               | --                         |             | `TocProps`             | `undefined` |


## Methods

### `initToc() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot      | Description             |
| --------- | ----------------------- |
| `"intro"` | Hero section intro text |
| `"main"`  | Main section            |


## Dependencies

### Depends on

- [go-toc](../../components/go-toc)
- [go-hero](../../components/go-hero)

### Graph
```mermaid
graph TD;
  go-content-layout --> go-toc
  go-content-layout --> go-hero
  go-toc --> go-nav-link
  go-nav-link --> go-icon
  go-hero --> go-breadcrumb
  go-breadcrumb --> go-nav-link
  style go-content-layout fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


