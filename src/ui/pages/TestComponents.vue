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

      <q-btn no-caps unelevated class="q-mx-md component-outline-btn-std">
        <div class="row items-center">
          <q-icon name="fa-solid fa-arrow-up" size=".9rem"/>
          <div class="q-mx-xs">
            Upload
          </div>
        </div>
      </q-btn>


      <q-btn no-caps unelevated class="q-mx-md component-outline-btn-short">
        <div class="row items-center">
          <q-icon name="fa-solid fa-ellipsis" size=".9rem"/>
        </div>
      </q-btn>


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

</script>

<style scoped lang="scss">

</style>