<template>
  <Section name="Datepicker">
    <pre>{{ { date } }}</pre>
    <GoDatepicker
      id="test"
      name="datepicker1"
      type="text"
      label="Date picker"
      hint="Please enter a date"
      v-model="date"></GoDatepicker>
  </Section>
</template>

<script setup lang="ts">
import { GoDatepicker } from '@go-ui/vue';
import { ref } from 'vue';
import Section from '../Section.vue';

const date = ref('2020-01-31');
</script>
