<template>
  <header class="app-header">
    <GoNavDrawer
      ref="mobileMenu"
      label="Mobile"
      :items="navItems"
      auto-close
    ></GoNavDrawer>

    <GoHeaderBar breakpoint="tablet">
      <GoButton
        slot="mobile-menu-trigger"
        aria-label="menu"
        icon
        flat
        variant="text"
        @click="handleMobileTriggerClick"
      >
        <GoIcon decorative icon-set="bx" name="menu" size="1.5rem"></GoIcon>
      </GoButton>

      <NuxtLink custom to="/" v-slot="{ href, navigate }">
        <GoGovAuLogo slot="logo" :href="href" @click="navigate">
          <img
            slot="main-brand"
            src="~/assets/img/logo.svg"
            :alt="siteConfig.name"
          />
          <img
            slot="main-brand-on-dark"
            src="~/assets/img/logo.svg"
            :alt="siteConfig.name"
          />
          <div slot="co-brand">
            <div class="text-size-1">
              <b>{{ siteConfig.name }}</b>
            </div>
            <div class="text-size-0 d-none d-block-tablet">
              {{ siteConfig.tagline }}
            </div>
          </div>
        </GoGovAuLogo>
      </NuxtLink>

      <div class="nav-actions" slot="actions">
        <GoButton
          v-bind="repoLinkProps"
          variant="text"
          icon
          round
          flat
          compact
          :aria-label="siteConfig.repoLink.label"
        >
          <GoIcon
            decorative
            size="1.5rem"
            icon-set="bxl"
            name="github"
          ></GoIcon>
        </GoButton>

        <GoDarkMode ref="themer" @themechange="updateThemeIcon"></GoDarkMode>

        <GoButton
          variant="text"
          icon
          round
          flat
          compact
          @click="toggleDarkMode"
        >
          <GoIcon size="1.5rem" icon-set="bx" :name="themeIcon"></GoIcon>
        </GoButton>
        <div
          v-if="siteConfig?.algolia"
          id="algolia-search"
          class="algolia"
        ></div>
      </div>

      <GoNavBar slot="main-nav" :items="navItems"></GoNavBar>
    </GoHeaderBar>
  </header>
</template>

<script lang="ts" setup>
import {
  GoNavDrawer,
  GoHeaderBar,
  GoButton,
  GoIcon,
  GoGovAuLogo,
  GoDarkMode,
  GoNavBar,
} from "@go-ui/vue";

const repoLinkProps = {
  target: "_blank",
  href: siteConfig.repoLink.url,
  rel: "noopener noreferrer nofollow",
};

const navItems = computed(() => {
  return buildContentPageSidebar(siteConfig.navbar.main, useRoute().path);
});
</script>

<script lang="ts">
declare global {
  var docsearch: any;
}
export default defineComponent({
  data() {
    return {
      currentTheme: "light",
    };
  },
  computed: {
    themeIcon() {
      return this.currentTheme === "light" ? "sun" : "moon";
    },
  },
  mounted() {
    if (siteConfig.algolia && typeof docsearch === "function") {
      const { appId, apiKey, indexName } = siteConfig.algolia;
      docsearch({
        appId,
        apiKey,
        indexName,
        container: "#algolia-search",
        debug: false, // Set debug to true if you want to inspect the modal
      });
    }
  },
  methods: {
    handleMobileTriggerClick() {
      (this.$refs.mobileMenu as any).$el.open();
    },
    toggleDarkMode() {
      (this.$refs.themer as any).$el.setTheme(
        this.currentTheme === "light" ? "dark" : "light"
      );
    },
    updateThemeIcon(e: any) {
      this.currentTheme = e.detail.theme;
    },
  },
});
</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  background: var(--go-color-bg);
  z-index: var(--layer-3);
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
