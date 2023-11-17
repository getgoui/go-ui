<template>
  <form>
    <GoInput type="number" name="input-1" label="Input" hint="This is a hint message" />
    <Datepickersection />
    <!-- <SelectSection /> -->
    <RadioSection />
    <hr />
    <button>Submit</button>
    <button type="reset">Reset</button>
  </form>
</template>

<script setup lang="ts">
import { GoInput } from '../../index';
import Datepickersection from './form-sections/DatePickerSection.vue';
import RadioSection from './form-sections/RadioSection.vue';
import SelectSection from './form-sections/SelectSection.vue';
</script>
