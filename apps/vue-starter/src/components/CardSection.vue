<template>
  <DemoSection name="Card">
    <GoCard border cardTitle="Counter example" media-position="left">
      <div class="d-flex" slot="media">
        <img :src="vuelogo" alt="vue logo" />
        <img :src="vitelogo" alt="vite logo" />
      </div>
      <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      <div slot="footer">
        <GoButton block="all" variant="primary" @click="count++"> count is {{ count }} </GoButton>
      </div>
    </GoCard>
  </DemoSection>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GoCard, GoButton } from '@go-ui/vue';
import vitelogo from '../assets/vite.svg';
import vuelogo from '../assets/vue.svg';
import DemoSection from './DemoSection.vue';
const count = ref(0);
</script>
