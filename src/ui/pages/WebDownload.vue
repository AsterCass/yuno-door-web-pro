<template>
  <q-layout class="component-full-screen column" style="
  background-color: rgba(var(--background-color));background-image: url('/img/chatroom-bg.png');"
            view="hhh lpr fff">
    <cask-base-header :always-show="true" :center-elements="[
        CaskModuleElement.HOME,
    ]" :chatroom-select-first="true" :mini="true"/>


    <div class="col row" style="margin: 5rem 2% 5rem 2%">

      <cask-tabs-vertical :tabs="tabs" v-model="tab" width="12rem" text-width="10rem"
                          force-text-color="rgb(var(--text-color))"/>

      <q-tab-panels v-model="tab" animated class="bg-transparent col" transition-duration="500"
                    transition-prev="jump-down" transition-next="jump-up">
        <q-tab-panel name="grudges">
          <h5 class="row justify-center items-center full-height">
            {{ $t('in_develop') }}
          </h5>
        </q-tab-panel>
        <q-tab-panel name="reader">
          <h5 class="row justify-center items-center full-height">
            {{ $t('in_develop') }}
          </h5>
        </q-tab-panel>
        <q-tab-panel name="piano">
          <h5 class="row justify-center items-center full-height">
            {{ $t('in_develop') }}
          </h5>
        </q-tab-panel>
      </q-tab-panels>

    </div>

    <cask-base-footer :simple="true"/>

  </q-layout>
</template>

<script setup>
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {CaskModuleElement} from "@/constant/enums/component-enums";
import {useGlobalStateStore} from "@/utils/global-state";
import CaskTabsVertical from "@/ui/components/CaskTabsVertical.vue";
import {nextTick, onMounted, ref, watch} from "vue";
import { Wheel } from 'spin-wheel';
import {wheelPropsEn, wheelPropsZh} from "@/constant/play-birth";

const globalState = useGlobalStateStore();


const tabs = ref([
  {
    value: 'grudges',
    label: 'main_download_grudges',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'reader',
    label: 'main_download_reader',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'piano',
    label: 'main_download_piano',
    color: 'rgb(var(--full-container-background-color))'
  },
])
const tab = ref("grudges");


onMounted(() => {

})


</script>

<style lang="scss" scoped>

.wheel-container {
  overflow: hidden;
  height: 95%;
  aspect-ratio: 1;
}


</style>