<template>
  <h5>{{ $route.params.slug }}</h5>
</template>

<script setup>
const route = useRoute();
console.log(route.params);
</script>
