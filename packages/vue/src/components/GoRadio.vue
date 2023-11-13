<template>
  <go-radio ref="radio" :checked="checked"></go-radio>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { GoRadio } from '@go-ui/core/dist/components/go-radio';
export default defineComponent({
  name: 'GoRadio',
  props: {
    modelValue: {
      type: [String, Object, Boolean],
    },
  },
  computed: {
    checked() {
      if (typeof this.$attrs.checked !== 'undefined') {
        return this.$attrs.checked;
      }
      return this.modelValue === this.$attrs.value;
    },
  },
  mounted() {
    (this.$refs.radio as GoRadio).addEventListener('change', (event: Event) => {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
    });
  },
});
</script>
