<template>
  <Section name="Datepicker">
    <pre>{{ { date } }}</pre>
    <GoDatepicker
      id="test"
      name="datepicker1"
      type="text"
      label="Date picker"
      hint="Please enter a date"
      v-model="date"
      .options="options"></GoDatepicker>
  </Section>
</template>

<script setup lang="ts">
import { GoDatepicker } from '@';
import { ref } from 'vue';
import Section from '../Section.vue';

const date = ref('2020-01-31');
const options = {
  min: '1990-01-01',
};
</script>
