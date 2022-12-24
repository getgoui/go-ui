<script setup>
import { ref } from 'vue';
import { GoButton, GoCard, GoHero, GoLink } from '@go-ui/vue';
import vitelogo from './assets/vite.svg';
import vuelogo from './assets/vue.svg';
let count = ref(0);
</script>

<template>
  <div>
    <GoHero
      :breadcrumbs="[
        {
          label: 'Home',
          url: '#',
        },
      ]"
      preHeading="Vite + Vue + GoUI"
      heading="Develop with happiness">
      <img
        src="https://images.unsplash.com/photo-1599811392833-a39014faf967?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="Beach"
        slot="full-width-bg" />
      <p>Check out the full documentation of Go UI at <GoLink href="https://go-ui.com">go-ui.com</GoLink></p>
    </GoHero>

    <div className="container pt-5">
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
    </div>
  </div>
</template>
