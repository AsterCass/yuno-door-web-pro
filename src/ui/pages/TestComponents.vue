<template>
  <div class="q-ma-lg">

    <q-btn @click="switchTheme" color="primary" label="Switch Theme"/>

    <q-separator class="q-my-md"/>

    <div class="row">

      <q-btn no-caps padding=".3rem .5rem" unelevated class="shadow-2 full-component-base" >
        <div class="row items-center">
          <q-icon name="fa-solid fa-arrow-down" size=".9rem"/>
          <div class="q-mx-xs">
            Import
          </div>
        </div>
      </q-btn>

    </div>


    <q-separator class="q-my-md"/>

    <div>
      This is Text
    </div>

    <q-separator class="q-my-md"/>

    <h1>
      This is h1
    </h1>

    <q-separator class="q-my-md"/>

    <h2>
      This is h2
    </h2>

    <q-separator class="q-my-md"/>

    <h3>
      This is h3
    </h3>

    <q-separator class="q-my-md"/>

    <h4>
      This is h4
    </h4>

    <q-separator class="q-my-md"/>

    <h5>
      This is h5
    </h5>

    <q-separator class="q-my-md"/>

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