<template>
  <q-layout view="hhh lpr fff">

    <cask-base-header/>

    <div class="cask-main-top-container row justify-center">
      <q-img :no-native-menu="false" :ratio="16/9" fit="cover"
             :src="globalState.curThemeName !== 'dark' ?
             '/img/bg-1-fixed.jpg' : '/img/bg-2-fixed.jpg'" class="cask-main-bg-image">
      </q-img>

      <div class="cask-main-top-content">
        <div style="font-size: 5rem">
          {{ $t('main_title') }}
        </div>
        <div style="font-size: 1.5rem" class="q-my-md">
          {{ $t('main_subtitle') }}
        </div>
        <div style="font-size: 1.1rem; opacity: .8">
          {{ $t('main_top_content') }}
        </div>
      </div>

    </div>

    <h6 v-for="index in 30" :key="index">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro.
      Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
    </h6>


    <cask-base-footer/>


  </q-layout>
</template>

<script setup>
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";

const globalState = useGlobalStateStore();


</script>

<style scoped lang="scss">

.cask-main-top-container {
  position: relative;
  min-height: 70rem;
  padding: 5rem 1rem 0 1rem;

  .cask-main-top-content {
    padding-top: 2rem;

    color: var(--full-container-text-color);
    width: 60%
  }
}

.cask-main-bg-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1 !important;
  opacity: 0.85;

  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0));
}


</style>