<template>
  <Section name="Select">
    <pre>{{ { selectVal } }}</pre>
    <GoSelect name="select-1" label="Select" hint="This is a hint message" v-model="selectVal" .options="OPTIONS">
    </GoSelect>
    <GoSelect
      name="select-2"
      label="Select with Object options"
      hint="This is a hint message"
      v-model="selectVal"
      .options="OBJECT_OPTIONS"></GoSelect>
    <GoSelect
      name="select-3"
      label="Select with String options"
      hint="This is a hint message"
      v-model="selectVal"
      .options="STRING_OPTIONS">
    </GoSelect>
  </Section>
</template>

<script setup lang="ts">
import { GoSelect } from '@go-ui/vue';
import { ref } from 'vue';
import Section from '../Section.vue';
import { OPTIONS, OBJECT_OPTIONS, STRING_OPTIONS } from './constants';

const selectVal = ref(undefined);
</script>
