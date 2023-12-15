<template>
  <GoHero
    pre-heading="Oops..."
    heading="Page not found"
    img-src="/img/puppy.png"
    img-alt="3d puppy looking confused"
    :style="{
      '--hero-bg-color': 'transparent',
      '--hero-padding-top': '4rem',
      '--hero-padding-bottom': '4rem',
      '--hero-img-fit': 'contain',
      '--hero-img-position': 'bottom right',
    }">
    <p class="text-size-1">
      It seems like that page doesn't exist. Try using the site search (<code>Ctrl</code> + <code>K</code>) to find what
      you're looking for.
    </p>
  </GoHero>
</template>

<script setup lang="ts">
import { GoHero } from '@go-ui/vue';
</script>
