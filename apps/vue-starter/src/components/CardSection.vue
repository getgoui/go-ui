<template>
  <Section name="Card">
    <GoCard
      aff-asdf="fff"
      heading-tag="h3"
      heading="Go UI ❤️ Vue"
      sub-heading="Install package @go-ui/vue to get started">
      <div class="logos">
        <img :src="vuelogo" alt="vue logo" />
        <img :src="gouilogo" alt="go ui logo" />
        <p>Edit <code>src/demo/App.vue</code> and save to test HMR</p>
      </div>
      <div slot="footer">
        <GoButton block="all" variant="primary" @click="count++"> count is {{ count }} </GoButton>
      </div>
    </GoCard>
  </Section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GoCard, GoButton } from '@';
import gouilogo from '@/assets/go-ui.svg';
import vuelogo from '@/assets/vue.svg';
import Section from './Section.vue';
const count = ref(0);
</script>

<style lang="scss"></style>
