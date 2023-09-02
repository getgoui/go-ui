<template>
  <section class="mt-4 mb-4">
    <h2 class="mb-2">{{ name }}</h2>
    <hr />
    <div>
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
  },
});
</script>
