<template>
  <SidebarLayout :sidebarItems="sidebarNavItems" :content="result" :editUrl="editUrl">
    <div class="component-api" v-if="compDocs">
      <h2>Component API</h2>
      <PropsTable class="component-table" v-if="compDocs.props" :docs="compDocs.props" />
      <SlotsTable class="component-table" v-if="compDocs.slots" :docs="compDocs.slots" />
      <EventsTable class="component-table" v-if="compDocs.events" :docs="compDocs.events" />
      <MethodsTable class="component-table" v-if="compDocs.methods" :docs="compDocs.methods" />
    </div>
    <NotFound v-if="notfound" />
  </SidebarLayout>
</template>
<script setup lang="ts">
import { IAItem } from '~/ia/ia.interface';
import ia from '../../ia/generated-ia';
import PropsTable from '../../components/tables/PropsTable.vue';
import SlotsTable from '~/components/tables/SlotsTable.vue';
import EventsTable from '~/components/tables/EventsTable.vue';
import MethodsTable from '~/components/tables/MethodsTable.vue';

const route = useRoute();

const result = ref<any>(null);
const meta = ref<any>(null);
const notfound = ref(false);
const editUrl = ref<string | undefined>('');
const compDocs = ref<IAItem['component'] | null>(null);
async function loadPage() {
  // fetch content dir
  try {
    const iAItem = await loadContentByPath(route.path);
    if (iAItem?.meta?.hidden) {
      notfound.value = true;
      return;
    }

    result.value = (iAItem as IAItem).content;
    compDocs.value = (iAItem as IAItem).component;
    meta.value = (iAItem as IAItem).meta;
    editUrl.value = (iAItem as IAItem).editUrl;
  } catch (error) {
    notfound.value = true;
  }
}

const sidebarNavItems = ref<any>([]);
async function loadSidebarNav() {
  const activeCategory = removeLeadingSlash(route.path).split('/')[1]; // patterns/components
  const cat = ia.docs.children.find((category) => category.id === activeCategory);
  if (!cat?.children) {
    return [];
  }
  const sidebar = cat.children;
  return buildContentPageSidebar(sidebar, route.path);
}

async function init() {
  await loadPage();
  sidebarNavItems.value = (await loadSidebarNav()).filter((item) => item);
}

onMounted(async () => {
  await init();
  if (notfound.value) {
    return;
  }
  const title = meta.value?.title ? `${meta.value?.title} | Go UI` : 'Go UI';
  const description = result.value.substring(0, 100);
  useSeoMeta({
    title,
    ogTitle: title,
    description: description,
    ogDescription: description,
    ogImage: siteConfig.logoSocial,
    twitterCard: 'summary_large_image',
  });
});
</script>
<style lang="scss">
.component-table {
  code {
    font-size: 0.8rem;
    white-space: nowrap;
  }
}

.component-api {
  section {
    margin-bottom: 2rem;
  }
}
</style>
