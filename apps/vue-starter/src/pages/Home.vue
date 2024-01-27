<template>
  <div>
    <GoHero :breadcrumbs="breadcrumbs" preHeading="Vite + Vue + GoUI" heading="Develop with happiness">
      <img
        src="https://images.unsplash.com/photo-1698417749491-72bba47caf07?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Mountain view"
        slot="full-width-bg" />
      <p>Check out the full documentation of Go UI at <GoLink href="https://go-ui.com">go-ui.com</GoLink></p>
    </GoHero>

    <div class="container">
      <GoCardRow :colsDesktop="2" colsTablet="2" :cols="1">
        <GoCard heading="Card 1" href="#" border></GoCard>
      </GoCardRow>
    </div>

    <div class="container">
      <GoMd :content="readme" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import readme from '../../README.md?raw';
import { GoCard, GoCardRow, GoHero, GoLink, GoMd } from '@go-ui/vue';

console.log({ readme });
const text = ref('v-model supported');

const selectedFruits = ref({
  apple: true,
  orange: true,
  watermelon: false,
});

const switchVal = ref(false);

const breadcrumbs = `[
  {
    label: 'Home',
    url: '#',
  }
]`;
</script>
