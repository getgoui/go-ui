<!-- material icons -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<!-- vue 3 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3.2.26"></script>

<div id="app" style="height: 500px"></div>

<script>
  const { createApp } = Vue;
  const Root = {
    data() {
      return {
        leftOpen: false,
        rightOpen: false,
        customOpen: false,
        items: [
          {
            label: 'Home',
            url: '/',
            icon: 'home',
          },
          {
            label: 'Components',
            url: '/components',
            icon: 'view_module',
            isCurrent: true,
          },
          {
            label: 'Styleguide',
            url: '/styleguide',
            icon: 'style',
            children: [
              {
                label: 'Typography',
                url: '/styleguide/typography',
                icon: 'text_fields',
                children: [
                  {
                    label: 'Headings',
                    url: '/styleguide/typography/headings',
                    icon: 'text_fields',
                    children: [
                      {
                        label: 'Heading 1',
                        url: '/styleguide/typography/headings/heading-1',
                      },
                      {
                        label: 'Heading 2',
                        url: '/styleguide/typography/headings/heading-2',
                      },
                    ],
                  },
                  {
                    label: 'Paragraphs',
                    url: '/styleguide/typography/paragraphs',
                    icon: 'text_fields',
                  },
                  {
                    label: 'Lists',
                    url: '/styleguide/typography/lists',
                    icon: 'text_fields',
                  },
                ],
              },
              {
                label: 'Colors',
                url: '/styleguide/colors',
                icon: 'color_lens',
              },
              {
                label: 'Icons',
                url: '/styleguide/icons',
                icon: 'image',
              },
              {
                label: 'Buttons',
                url: '/styleguide/buttons',
                icon: 'touch_app',
              },
            ],
          },
          {
            label: 'About',
            url: '/about',
            icon: 'info',
          },
        ],
        items2: [
          {
            label: 'Home',
            url: '/',
          },
          {
            label: 'Components',
            url: '/components',
            isCurrent: true,
          },
          {
            label: 'Styleguide',
            url: '/styleguide',
            children: [
              {
                label: 'Typography',
                url: '/styleguide/typography',
                children: [
                  {
                    label: 'Headings',
                    url: '/styleguide/typography/headings',
                    children: [
                      {
                        label: 'Heading 1',
                        url: '/styleguide/typography/headings/heading-1',
                      },
                      {
                        label: 'Heading 2',
                        url: '/styleguide/typography/headings/heading-2',
                      },
                    ],
                  },
                  {
                    label: 'Paragraphs',
                    url: '/styleguide/typography/paragraphs',
                  },
                  {
                    label: 'Lists',
                    url: '/styleguide/typography/lists',
                  },
                ],
              },
              {
                label: 'Colors',
                url: '/styleguide/colors',
              },
              {
                label: 'Icons',
                url: '/styleguide/icons',
              },
              {
                label: 'Buttons',
                url: '/styleguide/buttons',
              },
            ],
          },
          {
            label: 'About',
            url: '/about',
          },
        ],
      };
    },
    methods: {
      handleClick() {
        this.$refs.leftMenu.open();
      },
      handleClick2() {
        this.rightOpen = !this.rightOpen;
      },
      handleClick3() {
        this.customOpen = !this.customOpen;
      },
    },
    template: `
  <div class="container">
    <go-button block class="mb-2" @click="handleClick">Open left menu (via component method)</go-button>
    <go-nav-drawer
      ref="leftMenu"
      label="Left menu"
      :items.prop="items"></go-nav-drawer>
    <br />
    <go-button block class="mb-2" @click="handleClick2">
      Open right menu (via reactive prop change)
    </go-button>
    <go-nav-drawer
      :active="rightOpen"
      label="Right menu"
      position="right"
      :items.prop="items2"
      @close="rightOpen = false"></go-nav-drawer>
    <br />
    <go-button block class="mb-2" @click="handleClick3">
      Open custom menu
    </go-button>
    <go-nav-drawer
      :active="customOpen"
      label="Custom menu"
      @close="customOpen = false">
      <h2>Custom menu</h2>
      <go-button @click="customOpen = false">Close</go-button>
      <p>Esc keypress still works.</p></go-nav-drawer>
  </div>
  `,
  };

  const app = createApp(Root);
  app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('go-');
  app.mount('#app');
</script>
