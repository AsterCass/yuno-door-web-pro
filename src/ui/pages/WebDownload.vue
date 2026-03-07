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

        <q-tab-panel v-for="(curTab, index) in tabs" :key="index" :name="curTab.value">
          <div class="row full-height">
            <div class="col-6 q-px-lg">
              <h4>
                {{ $t(curTab.title) }}
              </h4>
              <div style="opacity: .75; white-space: pre-wrap; " class="q-mt-md">
                {{ $t(curTab.desc) }}
              </div>
            </div>
            <div class="col">

            </div>

          </div>

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
import {onMounted, ref} from "vue";

const globalState = useGlobalStateStore();


const tabs = ref([
  {
    value: 'grudges',
    label: 'main_download_grudges',
    title: 'main_download_grudges_title',
    desc: 'main_download_grudges_desc',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'reader',
    label: 'main_download_reader',
    title: 'main_download_reader_title',
    desc: 'main_download_reader_desc',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'piano',
    label: 'main_download_piano',
    title: 'main_download_piano_title',
    desc: 'main_download_piano_desc',
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