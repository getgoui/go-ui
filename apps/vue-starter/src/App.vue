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
} from '@go-ui/vue';
import vitelogo from './assets/vite.svg';
import vuelogo from './assets/vue.svg';
let count = ref(0);
</script>

<template>
  <div>
    <GoHero
      :breadcrumbs="[
        {
          label: 'Home',
          url: '#',
        },
      ]"
      preHeading="Vite + Vue + GoUI"
      heading="Develop with happiness">
      <img
        src="https://images.unsplash.com/photo-1599811392833-a39014faf967?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="Beach"
        slot="full-width-bg" />
      <p>Check out the full documentation of Go UI at <GoLink href="https://go-ui.com">go-ui.com</GoLink></p>
    </GoHero>

    <div class="container pt-5">
      <GoInput label="TEST" />
      <GoCard border cardTitle="Counter example" media-position="left">
        <div class="d-flex" slot="media">
          <img :src="vuelogo" alt="vue logo" />
          <img :src="vitelogo" alt="vite logo" />
        </div>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
        <div slot="footer">
          <GoButton block="all" variant="primary" @click="count++"> count is {{ count }} </GoButton>
        </div>
      </GoCard>
    </div>

    <h2>Checkbox</h2>
    <go-fieldset label="What fruit do you like?" hint="Select one or more" is-list>
      <go-checkbox name="fruit" label="Apple" value="apple" hint="Not the company"></go-checkbox>
      <go-checkbox name="fruit" label="Banana" value="banana"></go-checkbox>
      <go-checkbox name="fruit" label="Orange" value="orange"></go-checkbox>
      <go-checkbox name="fruit" label="Kiwi" value="kiwi"></go-checkbox>
      <go-checkbox name="fruit" label="Watermelon" value="watermelon"></go-checkbox>
    </go-fieldset>

    <h3>Error state</h3>
    <go-fieldset label="What fruit do you like?" error="[This is an error message]" hint="Select one or more" is-list>
      <go-checkbox name="fruit2" label="Apple" value="apple" hint="Not the company"></go-checkbox>
      <go-checkbox name="fruit2" label="Banana" value="banana"></go-checkbox>
      <go-checkbox name="fruit2" label="Orange" value="orange"></go-checkbox>
      <go-checkbox name="fruit2" label="Kiwi" value="kiwi"></go-checkbox>
      <go-checkbox name="fruit2" label="Watermelon" value="watermelon"></go-checkbox>
    </go-fieldset>

    <h2>Datepicker</h2>
    <go-datepicker
      id="test"
      type="text"
      label="Date picker"
      hint="Please enter a date"
      auto-flip
      value="2000-01-01"></go-datepicker>
    <go-datepicker type="text" label="Error state" hint="Please enter a date" error="This is an error"></go-datepicker>
    <go-datepicker type="text" label="Disabled state" value="2000-01-01" disabled></go-datepicker>
    <go-datepicker id="readonly-test" type="text" label="Readonly state" value="2000-01-01" readonly></go-datepicker>
    <go-datepicker type="text" label="Custom icon">
      <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
      <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
    </go-datepicker>

    <go-datepicker type="text" label="Prefix slot">
      <div slot="prefix">https://go-ui.com/</div>

      <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
      <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
    </go-datepicker>
    <go-datepicker type="text" label="Suffix slot">
      <div slot="suffix">.com.au</div>
      <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
      <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
    </go-datepicker>

    <h2>Input</h2>
    <go-input id="test" type="text" label="Input field" hint="Please enter some text"></go-input>
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
    <go-fieldset label="What fruit do you like?" hint="Select one" is-list>
      <go-radio name="fruit" label="Apple" value="apple" hint="Not the company"></go-radio>
      <go-radio name="fruit" label="Banana" value="banana"></go-radio>
      <go-radio name="fruit" label="Orange" value="orange"></go-radio>
      <go-radio name="fruit" label="Kiwi" value="kiwi"></go-radio>
      <go-radio name="fruit" label="Watermelon" value="watermelon"></go-radio>
    </go-fieldset>

    <p>Error state</p>
    <go-fieldset label="What fruit do you like?" error="[This is an error message]" hint="Select one" is-list>
      <go-radio name="fruit2" label="Apple" value="apple" hint="Not the company"></go-radio>
      <go-radio name="fruit2" label="Banana" value="banana"></go-radio>
      <go-radio name="fruit2" label="Orange" value="orange"></go-radio>
      <go-radio name="fruit2" label="Kiwi" value="kiwi"></go-radio>
      <go-radio name="fruit2" label="Watermelon" value="watermelon"></go-radio>
    </go-fieldset>

    <h2>Select</h2>

    <go-select
      name="select-1"
      label="Select"
      hint="This is a hint message"
      value="Banana"
      options="['Apple', 'Banana', 'Blueberry', 'Boysenberry', 'Cherry', 'Durian', 'Eggplant', 'Fig', 'Grape', 'Guava', 'Huckleberry']">
    </go-select>
    <go-select
      name="select-4"
      label="Prefix slot"
      options="['Apple', 'Banana', 'Blueberry', 'Boysenberry', 'Cherry', 'Durian', 'Eggplant', 'Fig', 'Grape', 'Guava', 'Huckleberry']">
      <div slot="prefix">https://go-ui.com/</div>
      <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
      <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
    </go-select>
    <go-select
      name="select-3"
      label="Suffix slot"
      options="['Apple', 'Banana', 'Blueberry', 'Boysenberry', 'Cherry', 'Durian', 'Eggplant', 'Fig', 'Grape', 'Guava', 'Huckleberry']">
      <div slot="suffix">.com.au</div>

      <go-icon icon-set="material-icons" name="search" slot="icon-before"></go-icon>
      <go-icon icon-set="material-icons" name="star_outline" slot="icon-after"></go-icon>
    </go-select>
    <h2>Switch</h2>
    <div class="container">
      <go-switch checked name="switch1" label="Switch"></go-switch>
      <br />
      <go-switch checked name="switch2" label="Stacked switch" stack></go-switch>
      <br />
      <go-switch checked name="switch3" label="Full-width switch" full-width></go-switch>
      <br />
      <go-switch checked name="switch4" label="On off switch" show-on-off></go-switch>
      <br />
      <go-switch
        checked
        name="switch5"
        label="Yes no switch"
        show-on-off
        active-label="Yes"
        inactive-label="No"></go-switch>
      <br />
      <go-switch
        checked
        name="switch5"
        label="On off outside switch"
        show-on-off-outside
        active-label="Yes"
        inactive-label="No"></go-switch>
    </div>

    <h2>Textarea</h2>
    <go-textarea id="txt-1" auto-grow label="Textarea" hint="This is a textarea field" maxlength="1000"></go-textarea>
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
  </div>
</template>
