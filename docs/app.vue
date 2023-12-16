<template>
  <ClientOnly>
    <AppHeader />
  </ClientOnly>
  <Transition name="fade">
    <NuxtPage />
  </Transition>
</template>

<script lang="ts" setup></script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s, filter 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
