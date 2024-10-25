<template>
  <div class="q-ma-lg">

    <q-btn @click="switchTheme" color="primary" label="Switch Theme"/>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <div class="row items-center">

      <q-btn no-caps unelevated class="q-mx-md shadow-2 component-full-btn-std ">
        <div class="row items-center">
          <q-icon name="fa-solid fa-arrow-down" size=".9rem"/>
          <div class="q-mx-xs">
            Import
          </div>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-mx-md shadow-1 component-outline-btn-std">
        <div class="row items-center">
          <q-icon name="fa-solid fa-arrow-up" size=".9rem"/>
          <div class="q-mx-xs">
            Upload
          </div>
        </div>
      </q-btn>


      <q-btn no-caps unelevated class="q-mx-md shadow-1 component-outline-btn-mini">
        <div class="row items-center">
          <q-icon name="fa-solid fa-angle-left" size=".9rem"/>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-mx-md shadow-1 component-outline-btn-mini">
        <div class="row items-center">
          <q-icon name="fa-solid fa-angle-right" size=".9rem"/>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-mx-md  component-none-btn-std">
        <div class="row items-center">
          <div class="q-mx-xs">
            Show more
          </div>
          <q-icon name="fa-solid fa-caret-down" size="1.2rem"/>
        </div>
      </q-btn>

      <q-input v-model="input" tabindex="0" dense outlined
               class="q-mx-md component-outline-input-std">
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-magnifying-glass" size=".9rem"/>
        </template>
      </q-input>


    </div>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <div>
      This is Text
    </div>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <h1>
      This is h1
    </h1>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <h2>
      This is h2
    </h2>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <h3>
      This is h3
    </h3>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <h4>
      This is h4
    </h4>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <h5>
      This is h5
    </h5>

    <q-separator class="component-separator-base" spaced="2rem" size=".15rem"/>

    <h6>
      This is h6
    </h6>


  </div>

</template>

<script setup>
import {switchTheme} from "@/utils/base-tools";
import {ref} from "vue";

let input = ref("")

</script>

<style scoped lang="scss">

</style>