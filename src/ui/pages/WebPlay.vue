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
        <q-tab-panel name="birth">
          <div class="row justify-around items-center full-height">
            <div class="wheel-container"></div>
            <div class="col-4 full-height q-pa-xl">
              game start
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="tetris">
          <h5 class="row justify-center items-center full-height">
            {{ $t('in_develop') }}
          </h5>
        </q-tab-panel>
        <q-tab-panel name="hextris">
          <h5 class="row justify-center items-center full-height">
            {{ $t('in_develop') }}
          </h5>
        </q-tab-panel>
        <q-tab-panel name="setting">
          <h5 class="row justify-center items-center full-height">
            {{ $t('in_develop') }}
          </h5>
        </q-tab-panel>
      </q-tab-panels>

      <div style="width: 18rem;">
        <h4 class="row justify-center items-center">
          {{ $t('main_play_instructions') }}
        </h4>
      </div>

    </div>

    <cask-base-footer :simple="true"/>

  </q-layout>
</template>

<script setup>
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {CaskModuleElement} from "@/constant/enums/component-enums";
import {useGlobalStateStore} from "@/utils/global-state";
import {useRouter} from "vue-router";
import CaskTabsVertical from "@/ui/components/CaskTabsVertical.vue";
import {onMounted, ref} from "vue";
import { Wheel } from 'spin-wheel';

const thisRouter = useRouter()
const globalState = useGlobalStateStore();


const tabs = ref([
  {
    value: 'birth',
    label: 'main_play_birth',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'tetris',
    label: 'main_play_tetris',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'hextris',
    label: 'main_play_hextris',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'stretch',
    isStretch: true,
  },
  {
    value: 'setting',
    label: 'main_play_setting',
    color: 'rgb(var(--full-container-background-color))'
  },
])
const tab = ref("birth");

onMounted(() => {

  const wheelProps = {
    items: [
      {
        label: 'one',
      },
      {
        label: 'two',
      },
      {
        label: 'three',
      },
    ]
  }

  const container = document.querySelector('.wheel-container');
  const wheel = new Wheel(container, wheelProps);

})


</script>

<style lang="scss" scoped>

.wheel-container {
  overflow: hidden;
  height: 90%;
  aspect-ratio: 1;
}


</style>