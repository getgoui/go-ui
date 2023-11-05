<template>
  <section>
    <GoHeadingRow :heading="name" more-link-href="#" more-link-text="View docs" />
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { GoHeadingRow } from '@';

export default {
  props: {
    name: {
      type: String,
    },
    docsUrl: {
      type: String,
    },
  },
  components: { GoHeadingRow },
};
</script>
