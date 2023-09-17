<template>
  <Section name="Form controls">
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
      <GoSelect name="select-1" label="Select" hint="This is a hint message" v-model="selectVal" .options="options1">
      </GoSelect>
      <GoSelect
        name="select-2"
        label="Select"
        hint="This is a hint message"
        v-model="selectVal"
        .options="options2"></GoSelect>
      <GoSelect name="select-3" label="Select" hint="This is a hint message" v-model="selectVal" .options="options3">
      </GoSelect>

      <h2>Radio</h2>
      <pre>{{ radioValue }}</pre>
      <GoFieldset label="What fruit do you like?" hint="Select one" is-list>
        <GoRadio name="fruit" v-model="radioValue" label="Apple" value="apple" hint="Not the company"></GoRadio>
        <GoRadio name="fruit" v-model="radioValue" label="Banana" value="banana"></GoRadio>
        <GoRadio name="fruit" v-model="radioValue" label="Orange" value="orange"></GoRadio>
        <GoRadio name="fruit" v-model="radioValue" label="Kiwi" value="kiwi"></GoRadio>
        <GoRadio name="fruit" v-model="radioValue" label="Watermelon" value="watermelon"></GoRadio>
      </GoFieldset>

      <button type="reset">Reset</button>
    </form>
  </Section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GoDatepicker, GoFieldset, GoSelect, GoRadio } from '@go-ui/vue';
import Section from './Section.vue';

const date = ref('2020-01-31');

const selectVal = ref(undefined);

const options1 = ['Apple', 'Orange', 'Banana'];
const options2 = options1.map((item) => ({ value: item, label: item }));
const options3 = options1.toString(); // ''[] toString

const radioValue = ref(undefined);
</script>

<style scoped></style>
