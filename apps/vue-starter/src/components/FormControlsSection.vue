<template>
  <DemoSection name="Form controls">
    <form>
      <pre>{{ { date } }}</pre>
      <GoDatepicker
        id="test"
        name="datepicker1"
        type="text"
        label="Date picker"
        hint="Please enter a date"
        v-model="date"></GoDatepicker>

      <h2>Select</h2>
      <pre>{{ { selectVal } }}</pre>
      <GoSelect
        name="select-1"
        label="Select"
        hint="This is a hint message"
        v-model="selectVal"
        :options="[
          'Apple',
          'Banana',
          'Blueberry',
          'Boysenberry',
          'Cherry',
          'Durian',
          'Eggplant',
          'Fig',
          'Grape',
          'Guava',
          'Huckleberry',
        ]">
      </GoSelect>
    </form>
  </DemoSection>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GoDatepicker, GoSelect } from '@go-ui/vue';
import DemoSection from './DemoSection.vue';

const date = ref('2020-01-31');

const selectVal = ref('');
</script>

<style scoped></style>
