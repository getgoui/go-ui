## go-main-nav API

<!-- Auto Generated Below -->


## Usage

### Go-main-nav

<!-- material icons -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<!-- vue 3 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3.2.26"></script>

<div id="app"></div>

<script>
  const { createApp } = Vue;
  const Root = {
    data() {
      return {
        navItems: [
          {
            label: 'Home',
            url: '#',
            icon: 'home',
            isCurrent: true,
          },
          {
            label: 'Components',
            url: '#',
            icon: 'view_module',
            description: 'lorem ipsum dolor sit amet consectetur adipisicing elit',
            children: [
              {
                label: 'Sub menu 1',
                url: '#submenu',
                icon: 'text_fields',
              },
              {
                label: 'Colors',
                url: '#',
                icon: 'color_lens',
              },
              {
                label: 'Icons',
                url: '#',
                icon: 'image',
              },
              {
                label: 'Buttons',
                url: '#',
                icon: 'touch_app',
              },
            ],
          },
          {
            label: 'Styleguide',
            url: '#',
            icon: 'style',
            children: [
              {
                label: 'Typography',
                url: '#',
                icon: 'text_fields',
                children: [
                  {
                    label: 'Headings',
                    url: '#',
                    icon: 'text_fields',
                    children: [
                      {
                        label: 'Heading 1',
                        url: '#',
                      },
                      {
                        label: 'Heading 2',
                        url: '#',
                      },
                    ],
                  },
                  {
                    label: 'Paragraphs',
                    url: '#',
                    icon: 'text_fields',
                  },
                  {
                    label: 'Lists',
                    url: '#',
                    icon: 'text_fields',
                  },
                  {
                    label: 'Code',
                    url: '#',
                    icon: 'text_fields',
                  },
                  {
                    label: 'Tables',
                    url: '#',
                    icon: 'text_fields',
                  },
                ],
              },
              {
                label: 'Colors',
                url: '#',
                icon: 'color_lens',
                children: [
                  {
                    label: 'Primary',
                    url: '#',
                    icon: 'color_lens',
                  },
                ],
              },
              {
                label: 'Icons',
                url: '#',
                icon: 'image',
              },
              {
                label: 'Buttons',
                url: '#',
                icon: 'touch_app',
              },
              {
                label: 'Forms',
                url: '#',
                icon: 'text_fields',
              },
            ],
          },
          {
            label: 'About',
            url: '#',
            icon: 'info',
          },
        ],
      };
    },
    methods: {
      onNav(e) {
        // traverse the navItems array, clear isCurrent property and set it to true for the clicked item
        const newCurrentItem = e.detail.item;
        console.log({ newCurrentItem });
        this.navItems = this.navItems.map((item) => this.traverseNavItems(item, newCurrentItem));
      },
      traverseNavItems(item, newCurrent) {
        let isCurrent = false;
        if (item === newCurrent) {
          console.log('item === newCurrent', item, newCurrent);
          isCurrent = true;
        }
        const children = item?.children?.map((child) => this.traverseNavItems(child, newCurrent));
        return {
          ...item,
          isCurrent,
          children,
        };
      },
    },
    mounted() {},
    template: `
  <h6>Mega menu rendered from <code>items</code> JSON data</h6>
  <go-main-nav :items.prop="navItems" @navigate="(e) => onNav(e)"></go-main-nav>
  <pre><code>{{navItems}}</code></pre>
  `,
  };

  const app = createApp(Root);
  app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('go-');
  app.mount('#app');
</script>



## Properties

| Property | Attribute | Description                                                                     | Type                   | Default     |
| -------- | --------- | ------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `items`  | `items`   | Navigation items to be rendered if provided, slot content will not be rendered. | `INavItem[] \| string` | `undefined` |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `navigate` |             | `CustomEvent<any>` |


## Methods

### `init(newItems: INavItem[] | string) => Promise<void>`

Initialise the menu

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [go-icon](../../go-icon)
- [go-nav-link](../go-nav-link)

### Graph
```mermaid
graph TD;
  go-main-nav --> go-icon
  go-main-nav --> go-nav-link
  go-nav-link --> go-icon
  style go-main-nav fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


