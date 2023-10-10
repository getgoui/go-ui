<template>
  <form>
    <!-- <Datepickersection /> -->
    <!-- <SelectSection /> -->
    <RadioSection />
    <hr />
    <button>Submit</button>
    <button type="reset">Reset</button>
  </form>
</template>

<script setup lang="ts">
import Datepickersection from './form-sections/DatePickerSection.vue';
import RadioSection from './form-sections/RadioSection.vue';
import SelectSection from './form-sections/SelectSection.vue';
</script>
