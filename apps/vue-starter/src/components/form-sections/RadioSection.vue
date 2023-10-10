<template>
  <Section name="Radio">
    <pre>{{ { selected } }}</pre>
    <GoFieldset label="What fruit do you like?" hint="Select one" is-list>
      <GoRadio v-for="option in OPTIONS" name="fruit" v-model="selected" :label="option" :value="option"></GoRadio>
    </GoFieldset>
  </Section>
</template>

<script setup lang="ts">
import { GoFieldset, GoRadio } from '@go-ui/vue';
import Section from '../Section.vue';
import { OPTIONS } from './constants';
import { ref } from 'vue';
const selected = ref(undefined);
</script>
