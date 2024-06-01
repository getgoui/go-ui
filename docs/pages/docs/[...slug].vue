<template>
  <SidebarLayout
    :sidebarItems="sidebarNavItems"
    :content="result"
    :editUrl="editUrl"
  />
</template>
<script setup lang="ts">
import { IAItem } from "~/ia/ia.interface";
import ia from "../../ia/generated-ia";

const route = useRoute();

const result = ref<any>(null);
const meta = ref<any>(null);
const notfound = ref(false);
const editUrl = ref<string | undefined>("");
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

const sidebarNavItems = ref<any>([]);
async function loadSidebarNav() {
  const activeCategory = removeLeadingSlash(route.path).split("/")[1]; // patterns/components
  const cat = ia.docs.children.find(
    (category) => category.id === activeCategory
  );
  if (!cat?.children) {
    return [];
  }
  const sidebar = cat.children;
  return buildContentPageSidebar(sidebar, route.path);
}

async function init() {
  await loadPage();
  sidebarNavItems.value = await loadSidebarNav();
}

onMounted(async () => {
  await init();
  const title = meta.value?.title ? `${meta.value?.title} | Go UI` : "Go UI";
  const description = result.value.substring(0, 100);
  useSeoMeta({
    title,
    ogTitle: title,
    description: description,
    ogDescription: description,
    ogImage: siteConfig.logoSocial,
    twitterCard: "summary_large_image",
  });
});
</script>
