<template>
  <div>
    <GoHero :breadcrumbs="breadcrumbs" preHeading="Vite + Vue + GoUI" heading="Develop with happiness">
      <img
        src="https://images.unsplash.com/photo-1599811392833-a39014faf967?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="Beach"
        slot="full-width-bg" />
      <p>Check out the full documentation of Go UI at <GoLink href="https://go-ui.com">go-ui.com</GoLink></p>
    </GoHero>

    <main class="container" style="position: relative">
      <div class="row">
        <div class="col-desktop-3">
          <GoToc style="position: sticky; top: 0" />
        </div>
        <div class="col">
          <CardSection />
          <FormControlsSection />
        </div>
      </div>
    </main>

    <!-- <GoCard class="mt-4" heading="Form components"> -->
    <!-- <h2>Checkbox</h2>
        <pre>{{ { selectedFruits } }}</pre>
        <GoFieldset label="What fruit do you like?" hint="Select one or more">
          <GoCheckbox
            v-model="selectedFruits.apple"
            name="fruit"
            label="Apple"
            value="apple"
            hint="Not the company"></GoCheckbox>
          <GoCheckbox v-model="selectedFruits.banana" name="fruit" label="Banana" value="banana"></GoCheckbox>
          <GoCheckbox v-model="selectedFruits.orange" name="fruit" label="Orange" value="orange"></GoCheckbox>
          <GoCheckbox v-model="selectedFruits.kiwi" name="fruit" label="Kiwi" value="kiwi"></GoCheckbox>
          <GoCheckbox
            v-model="selectedFruits.watermelon"
            name="fruit"
            label="Watermelon"
            value="watermelon"></GoCheckbox>
        </GoFieldset>

        <h3>Error state</h3>
        <GoFieldset
          label="What fruit do you like?"
          error="[This is an error message]"
          hint="Select one or more"
          is-list>
          <GoCheckbox name="fruit2" label="Apple" value="apple" hint="Not the company"></GoCheckbox>
          <GoCheckbox name="fruit2" label="Banana" value="banana"></GoCheckbox>
          <GoCheckbox name="fruit2" label="Orange" value="orange"></GoCheckbox>
          <GoCheckbox name="fruit2" label="Kiwi" value="kiwi"></GoCheckbox>
          <GoCheckbox name="fruit2" label="Watermelon" value="watermelon"></GoCheckbox>
        </GoFieldset> -->
    <!-- 
        <h2>Datepicker</h2>
        <pre>{{ { date } }}</pre>
        <GoDatepicker
          id="test"
          name="datepicker1"
          type="text"
          label="Date picker"
          hint="Please enter a date"
          auto-flip
          v-model="date"></GoDatepicker> -->
    <!-- <GoDatepicker
          type="text"
          label="Error state"
          hint="Please enter a date"
          error="This is an error"></GoDatepicker>
        <GoDatepicker type="text" label="Disabled state" value="2000-01-01" disabled></GoDatepicker>
        <GoDatepicker id="readonly-test" type="text" label="Readonly state" value="2000-01-01" readonly></GoDatepicker>
        <GoDatepicker type="text" label="Custom icon">
          <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
          <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
        </GoDatepicker>

        <GoDatepicker type="text" label="Prefix slot">
          <div slot="prefix">https://go-ui.com/</div>

          <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
          <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
        </GoDatepicker>
        <GoDatepicker type="text" label="Suffix slot">
          <div slot="suffix">.com.au</div>
          <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
          <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
        </GoDatepicker> -->

    <!-- <h2>Input</h2>
        <pre>{{ text }}</pre>
        <go-input id="test" type="text" v-model="text" label="Input field" hint="Please enter some text"></go-input>
        <go-input type="text" label="Error state" hint="Please enter some text" error="This is an error"></go-input>
        <go-input type="text" label="Disabled state" value="I'm not editable" disabled></go-input>
        <go-input type="text" label="Readonly state" value="I'm not editable" readonly></go-input>
        <go-input type="text" label="Custom icon">
          <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
          <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
        </go-input>

        <go-input type="text" label="Prefix slot">
          <div slot="prefix">https://go-ui.com/</div>

          <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
          <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
        </go-input>
        <go-input type="text" label="Suffix slot">
          <div slot="suffix">.com.au</div>
          <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
          <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
        </go-input>

        <h2>Radio</h2>
        <GoFieldset label="What fruit do you like?" hint="Select one" is-list>
          <go-radio name="fruit" label="Apple" value="apple" hint="Not the company"></go-radio>
          <go-radio name="fruit" label="Banana" value="banana"></go-radio>
          <go-radio name="fruit" label="Orange" value="orange"></go-radio>
          <go-radio name="fruit" label="Kiwi" value="kiwi"></go-radio>
          <go-radio name="fruit" label="Watermelon" value="watermelon"></go-radio>
        </GoFieldset>

        <p>Error state</p>
        <GoFieldset label="What fruit do you like?" error="[This is an error message]" hint="Select one" is-list>
          <go-radio name="fruit2" label="Apple" value="apple" hint="Not the company"></go-radio>
          <go-radio name="fruit2" label="Banana" value="banana"></go-radio>
          <go-radio name="fruit2" label="Orange" value="orange"></go-radio>
          <go-radio name="fruit2" label="Kiwi" value="kiwi"></go-radio>
          <go-radio name="fruit2" label="Watermelon" value="watermelon"></go-radio>
        </GoFieldset>
 -->
    <!-- <go-select
          name="select-4"
          label="Prefix slot"
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
          <div slot="prefix">https://go-ui.com/</div>
          <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
          <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
        </go-select>
        <go-select
          name="select-3"
          label="Suffix slot"
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
          <div slot="suffix">.com.au</div>

          <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
          <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
        </go-select> -->

    <!-- <h2>Switch</h2>
        <pre>{{ { switchVal } }}</pre>
        <go-switch v-model="switchVal" name="switch1" label="Switch"></go-switch>
        <br />
        <go-switch v-model="switchVal" name="switch2" label="Stacked switch" stack></go-switch>
        <br />
        <go-switch v-model="switchVal" name="switch3" label="Full-width switch" full-width></go-switch>
        <br />
        <go-switch v-model="switchVal" name="switch4" label="On off switch" show-on-off></go-switch>
        <br />
        <go-switch
          v-model="switchVal"
          name="switch5"
          label="Yes no switch"
          show-on-off
          active-label="Yes"
          inactive-label="No"></go-switch>
        <br />
        <go-switch
          v-model="switchVal"
          name="switch5"
          label="On off outside switch"
          show-on-off-outside
          active-label="Yes"
          inactive-label="No"></go-switch>

        <h2>Textarea</h2>
        <go-textarea
          id="txt-1"
          v-model="text"
          auto-grow
          label="Textarea"
          hint="This is a textarea field"
          maxlength="1000"></go-textarea>
        <go-textarea
          label="Error state"
          hint="Please enter some text"
          error="This is an error"
          maxlength="1000"></go-textarea>
        <go-textarea label="Disabled state" value="I'm not editable" disabled></go-textarea>
        <go-textarea label="Readonly state" value="I'm not editable" readonly></go-textarea>
        <go-textarea label="Custom icon">
          <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
          <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
        </go-textarea>

        <go-textarea label="Prefix slot">
          <div slot="prefix">https://go-ui.com/</div>
          <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
          <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
        </go-textarea>
        <go-textarea label="Suffix slot">
          <div slot="suffix">.com.au</div>
          <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
          <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
        </go-textarea>
         -->
    <!-- </GoCard> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  GoButton,
  GoCard,
  GoHero,
  GoLink,
  GoSelect,
  GoInput,
  GoDatepicker,
  GoCheckbox,
  GoRadio,
  GoFieldset,
  GoIcon,
  GoTextarea,
  GoSwitch,
  GoToc,
} from '@go-ui/vue';

import FormControlsSection from './components/FormControlsSection.vue';
import CardSection from './components/CardSection.vue';
const text = ref('v-model supported');

const selectedFruits = ref({
  apple: true,
  orange: true,
  watermelon: false,
});

const switchVal = ref(false);

const breadcrumbs = `[
  {
    label: 'Home',
    url: '#',
  }
]`;
</script>
