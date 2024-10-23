<template>
  <div class="q-ma-lg">

    <q-btn @click="switchTheme" color="primary" label="Switch Theme"/>

    <q-separator class="base-component-separator" spaced="2rem" size=".12rem"/>

    <div class="row">
      <q-btn no-caps padding=".3rem .5rem" unelevated class="shadow-2 base-component-full">
        <div class="row items-center">
          <q-icon name="fa-solid fa-arrow-down" size=".9rem"/>
          <div class="q-mx-xs">
            Import
          </div>
        </div>
      </q-btn>
    </div>

    <q-separator class="base-component-separator" spaced="2rem" size="0.16rem"/>

    <div>
      This is Text
    </div>

    <q-separator class="base-component-separator" spaced="2rem" size=".12rem"/>

    <h1>
      This is h1
    </h1>

    <q-separator class="base-component-separator" spaced="2rem" size=".12rem"/>

    <h2>
      This is h2
    </h2>

    <q-separator class="base-component-separator" spaced="2rem" size=".12rem"/>

    <h3>
      This is h3
    </h3>

    <q-separator class="base-component-separator" spaced="2rem" size=".12rem"/>

    <h4>
      This is h4
    </h4>

    <q-separator class="base-component-separator" spaced="2rem" size=".12rem"/>

    <h5>
      This is h5
    </h5>

    <q-separator class="base-component-separator" spaced="2rem" size=".12rem"/>

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