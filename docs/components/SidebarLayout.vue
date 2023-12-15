<template>
  <div class="sidebar-layout">
    <aside>
      <GoNavDrawer
        :active="isMobileSidebarOpen"
        label="Sidebar navigation"
        :items="sidebarItems"
        :autoClose="true"
        @close="closeMobileSidebar"></GoNavDrawer>
      <div class="container d-none-desktop">
        <GoButton
          class="mobile-sidebar-trigger"
          aria-label="Open sidebar navigation"
          compact
          flat
          variant="text"
          type="button"
          @click="openMobileSidebar">
          <GoIcon iconSet="bx" name="chevrons-right" size="1.5rem"></GoIcon>
          Open sidebar
        </GoButton>
      </div>
      <div class="d-none d-block-desktop sidebar">
        <GoNavList block :items="sidebarItems"></GoNavList>
      </div>
    </aside>
    <section class="main">
      <div class="container">
        <div class="row">
          <div class="col-12 col-desktop-9 content-container">
            <GoContent v-html="content"></GoContent>
            <slot></slot>
            <div class="pt-5" v-if="editUrl"><GoLink :href="editUrl">Edit this page</GoLink></div>
          </div>
          <div class="d-none d-block-desktop col-desktop-3">
            <GoToc ref="tocEl" class="toc" selector=".content-container h2" label-class="h6"></GoToc>
          </div>
        </div>
      </div>

      <GoToTop />
    </section>
  </div>
</template>

<script setup lang="ts">
import { GoButton, GoNavDrawer, GoIcon, GoNavList, GoToc, GoToTop, GoContent, GoLink } from '@go-ui/vue';

const props = defineProps({
  sidebarItems: { type: Array as PropType<any[]>, default: () => [] },
  content: { type: String },
  editUrl: { type: String },
});

watch(
  () => props.content,
  () => {
    if (tocEl.value?.$el) {
      (tocEl.value.$el as HTMLGoTocElement).init();
    }
  },
);

const tocEl = ref();

const isMobileSidebarOpen = ref(false);

function openMobileSidebar() {
  isMobileSidebarOpen.value = true;
}

function closeMobileSidebar() {
  isMobileSidebarOpen.value = false;
}
</script>

<style lang="scss">
.sidebar-layout {
  --sidebar-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  @include desktop() {
    --sidebar-width: 15rem;
    padding: 0;
    flex-direction: row;
    position: relative;
  }
  .mobile-sidebar-trigger {
    margin-top: 1rem;
  }
  aside {
    width: var(--sidebar-width);
  }
  .sidebar {
    width: var(--sidebar-width);
    min-height: calc(100vh - var(--header-height));
    overflow: auto;
    position: sticky;
    top: var(--header-height);
    bottom: 0;
    padding: 2rem;
    border-right: 1px solid var(--go-color-border);
  }
  .main {
    padding: 2rem 0;
    flex-grow: 1;
    width: 100%;
    @include desktop {
      width: calc(100% - var(--sidebar-width));
    }
    .toc {
      position: sticky;
      top: var(--header-height);
      .go-link {
        font-size: 14px;
      }
    }
  }
}
</style>
