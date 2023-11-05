<template>
  <main class="container" style="position: relative">
    <div class="row">
      <div class="col-desktop-3">
        <GoToc style="position: sticky; top: 0" />
      </div>
      <div class="col">
        <FormSections />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { GoToc } from '@';
import FormSections from './components/FormSections.vue';
</script>
