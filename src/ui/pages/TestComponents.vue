<template>
  <div class="q-ma-lg">

    <q-btn @click="switchTheme" color="primary" label="Switch Theme"/>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <div class="row items-center">

      <q-btn no-caps unelevated class="q-ma-md shadow-2 component-full-btn-std ">
        <div class="row items-center">
          <q-icon name="fa-solid fa-arrow-down" size=".9rem"/>
          <div class="q-mx-xs">
            Import
          </div>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md shadow-1 component-outline-btn-std">
        <div class="row items-center">
          <q-icon name="fa-solid fa-arrow-up" size=".9rem"/>
          <div class="q-mx-xs">
            Upload
          </div>
        </div>
      </q-btn>


      <q-btn no-caps unelevated class="q-ma-md shadow-1 component-outline-btn-mini">
        <div class="row items-center">
          <q-icon name="fa-solid fa-angle-left" size=".9rem"/>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md shadow-1 component-outline-btn-mini">
        <div class="row items-center">
          <q-icon name="fa-solid fa-angle-right" size=".9rem"/>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md component-none-btn-std">
        <div class="row items-center">
          <q-icon name="fa-solid fa-bell" size="1.5rem"/>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md component-none-btn-std" icon="fa-solid fa-wand-sparkles"/>

      <q-btn no-caps unelevated class="q-ma-md  component-none-btn-std">
        <div class="row items-center">
          <div class="q-mx-xs">
            Show more
          </div>
          <q-icon name="fa-solid fa-caret-down" size="1rem"/>
        </div>
      </q-btn>

      <q-input v-model="input" tabindex="0" dense outlined placeholder="Search"
               class="q-ma-md component-outline-input-std">
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-magnifying-glass" size="1rem"/>
        </template>
      </q-input>

      <!--      selected class use component-outline-input-std, no selected component-outline-input-std-->


      <q-select outlined clearable class="q-ma-md component-outline-input-grow"
                dropdown-icon="fa-solid fa-caret-down"
                popup-content-class="component-extra-card-std"
                clear-icon="fa-solid fa-xmark"
                menu-anchor="bottom start" :menu-offset="[0, 5]"
                v-model="selected" :options="options">
        <template v-slot:prepend>
          Go to
        </template>
      </q-select>

      <q-select outlined clearable class="q-ma-md component-outline-select-grow"
                dropdown-icon="fa-solid fa-caret-down"
                popup-content-class="component-extra-card-std"
                clear-icon="fa-solid fa-xmark"
                menu-anchor="bottom start" :menu-offset="[0, 5]"
                v-model="selected" :options="options">
        <template v-slot:prepend>
          Go to
        </template>
      </q-select>

      <q-select outlined clearable multiple use-chips class="q-ma-md component-outline-input-grow"
                dropdown-icon="fa-solid fa-caret-down"
                popup-content-class="component-extra-card-std"
                clear-icon="fa-solid fa-xmark"
                menu-anchor="bottom start" :menu-offset="[0, 5]"
                v-model="selectedMulti" :options="options">
        <template v-slot:prepend>
          Multiple Go to
        </template>
      </q-select>

      <cask-tabs class="q-ma-md" :tabs="tabs" v-model="tab"/>

      <cask-date-picker class="q-ma-md" v-model="dateInput"/>

      <cask-time-picker class="q-ma-md" v-model="timeInput"/>

    </div>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <div>
      This is Text
    </div>

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h1>-->
    <!--      This is h1-->
    <!--    </h1>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h2>-->
    <!--      This is h2-->
    <!--    </h2>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h3>-->
    <!--      This is h3-->
    <!--    </h3>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h4>-->
    <!--      This is h4-->
    <!--    </h4>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h5>-->
    <!--      This is h5-->
    <!--    </h5>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size=".15rem"/>-->

    <!--    <h6>-->
    <!--      This is h6-->
    <!--    </h6>-->


  </div>

</template>

<script setup>
import {switchTheme} from "@/utils/base-tools";
import {ref} from "vue";
import CaskTabs from "@/ui/components/CaskTabs.vue";
import CaskDatePicker from "@/ui/components/CaskDatePicker.vue";
import CaskTimePicker from "@/ui/components/CaskTimePicker.vue";

const input = ref("")
const selected = ref("")
const selectedMulti = ref([])
const options = ref(["Beijing", "Shanghai", "Hangzhou", "Shenzhen-Long",])
const tabs = ref([
  {code: 'Beijing', label: 'Beijing-TianAnMeng',},
  {code: 'Shanghai', label: 'Shanghai-DongFangMingZhu',},
  {code: 'Hangzhou', label: 'Hangzhou', icon: 'mail'},
  {code: 'Shenzhen', label: 'Shenzhen',}
])
const tab = ref('Beijing');
const dateInput = ref('')
const timeInput = ref('')


</script>

<style scoped lang="scss">


</style>