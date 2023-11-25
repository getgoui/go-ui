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

  <!-- quickSaveDialog -->
  <GoDialog ref="quickSaveDialog" heading="Quick save" active>
    <h1>demo</h1>
  </GoDialog>
</template>

<script setup lang="ts">
import { GoToc, GoDialog } from '@';
import FormSections from './components/FormSections.vue';
</script>
