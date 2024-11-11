<template>


  <q-layout>


    <q-img class="index-img"
           :no-native-menu="false"
           src="/img/bg-1.jpg"
           alt=""
           :ratio="4/3"
           :fit="'cover'">
    </q-img>


    <q-toggle v-model="hideScroller" @update:model-value="it => hideScrollbar(it)"/>


    <h6 v-for="index in 15" :key="index">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro.
      Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
    </h6>

  </q-layout>





</template>

<script setup>

import {ref} from "vue";
import {hideScrollbar} from "@/utils/base-tools";

const hideScroller = ref(false)


</script>

<style lang="scss">


</style>