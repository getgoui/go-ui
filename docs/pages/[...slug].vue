<template>
  <NotFound v-if="notfound" />
  <template v-else>
    <SidebarLayout :sidebarItems="sidebarNavItems" :content="result" :editUrl="editUrl" />
  </template>
</template>
<script setup lang="ts">
import { IAItem } from '~/ia/ia.interface';
import ia from '../ia/generated-ia';
import { INavItem } from '../../packages/core/dist/types/interfaces';

const route = useRoute();

const result = ref<any>(null);
const meta = ref<any>(null);
const notfound = ref(false);
const editUrl = ref<string | undefined>('');
async function loadPage() {
  // fetch content dir
  try {
    const iAItem = await loadContentByPath(route.path);
    result.value = (iAItem as IAItem).content;
    meta.value = (iAItem as IAItem).meta;
    editUrl.value = (iAItem as IAItem).editUrl;
  } catch (error) {
    notfound.value = true;
  }
}

const category = computed(() => route.params.slug[0]);

const sidebarNavItems = ref<INavItem[]>([]);
async function loadSidebarNav() {
  const children = (ia as any)[category.value]?.children;
  sidebarNavItems.value = children ? prepareNavItems(buildContentPageSidebar(children)) : [];
}

async function init() {
  await loadPage();
  await loadSidebarNav();
}

onMounted(async () => {
  await init();
});
</script>
