<template>
  <q-layout view="hhh lpr fff">

    <cask-base-header/>

    <div class="cask-main-top-container">
      <q-img :no-native-menu="false" :ratio="16/9" fit="cover"
             src="/img/bg-1-fixed.jpg" class="cask-main-bg-image">
      </q-img>

      <q-toggle v-model="hideScroller" @update:model-value="it => hideScrollbar(it)"/>

      <q-btn no-caps @click="switchTheme" class="q-ma-md" color="primary"
             :label="$t('test_component_switch_theme') "/>

      <h6 v-for="index in 10" :key="index">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro.
        Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
      </h6>

    </div>


  </q-layout>
</template>

<script setup>

import {ref} from "vue";
import {hideScrollbar, switchTheme} from "@/utils/base-tools";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";

const hideScroller = ref(false)


</script>

<style scoped lang="scss">

.cask-main-top-container {
  position: relative;
  min-height: 70rem;
  padding: 5rem 1rem 0 1rem;
}

.cask-main-bg-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1 !important;
  opacity: 0.8;
}


</style>