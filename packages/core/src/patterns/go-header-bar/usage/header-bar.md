<!-- material icons -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<!-- vue 3 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3.2.26"></script>

<style>
  .custom-search-form-container {
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
  }
  .custom-search-form {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .custom-search-form input {
    background: transparent;
    border: none;
    padding: 0.5em 1em;
    height: 2.5em;
    border-bottom: 4px solid transparent;
    border-right: none;
    color: var(--go-text-bg);
    width: 12rem;
    border-radius: var(--radius-2);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: var(--go-color-bg);
  }
  .custom-search-form input:focus {
    outline: none;
    border-bottom-color: var(--go-color-primary-400);
  }
  .custom-search-form go-button .inner-button {
    border-radius: 0;
    border-top-right-radius: var(--radius-2);
    border-bottom-right-radius: var(--radius-2);
    border: 2px solid var(--go-color-bg);
  }
</style>

<div id="app"></div>

<script>
  const { createApp } = Vue;
  const Root = {
    data() {
      return {
        menuOpen: false,
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
          },
          {
            label: 'Styleguide',
            url: '/styleguide',
            icon: 'style',
            isCurrent: true,
            children: [
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
      };
    },
    methods: {
      handleClick() {
        this.$refs.mobileMenu.open();
      },
    },
    template: `
      <go-nav-drawer ref="mobileMenu" label="Menu" .items="items"></go-nav-drawer>

      <go-header-bar breakpoint="tablet">
        <go-button slot="mobile-menu-trigger" aria-labelledby="menu-label" compact flat stack variant="text" @click="handleClick">
          <go-icon name="menu" slot="prefix"></go-icon>
          <span id="menu-label">Menu</span>
        </go-button>

        <go-gov-au-logo href="/" slot="logo">
          <img
            slot="main-brand"
            src="https://www.dfat.gov.au/sites/default/files/australian-government-stacked-black_168791ec-96ad-3bcc-817b-27e71beb4522.png"
            alt="Australian government"
          />
          <img
            slot="main-brand-on-dark"
            src="https://www.dfat.gov.au/sites/default/files/australian-government-stacked-white_a422272d-3c74-31dc-8361-65d308194362.png"
            alt="Australian government on dark background"
          />
          <div slot="co-brand">
            <div class="text-size-1"><b>Go UI</b></div>
            <div class="text-size-0">A design system for everyone</div>
          </div>
        </go-gov-au-logo>

        <go-search-bar slot="actions">
          <div class="custom-search-form-container" slot="search-form">
            <div class="custom-search-form">
              <input type="search" placeholder="Search" />
              <go-button flat variant="primary" outline-fill icon ><go-icon name="search" slot="start"></go-icon></go-button>
            </div>
          </div>
        </go-search-bar>

        <go-nav-bar slot="nav-bar" .items="items"></go-nav-bar>

      </go-header-bar>
  `,
  };

  const app = createApp(Root);
  app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('go-');
  app.mount('#app');
</script>
