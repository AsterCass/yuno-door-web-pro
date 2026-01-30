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
            <div class="col-4 full-height q-pa-xl column items-center">
              <q-btn no-caps unelevated class="shadow-2 component-full-btn-full"
                     @click="startBirth">
                {{ $t('main_play_birth_start') }}
              </q-btn>

              <div v-if="currentItem" class="full-width q-mt-xl">
                <h5>
                  {{ inRotate ? $t('main_play_birth_ing') : $t('main_play_birth_ed') }}
                </h5>
                <h6 style="color: rgb(var(--pointer))">
                  {{currentItem.label}}
                </h6>
                <div v-if="currentItem.desc" style="opacity: .75" class="q-mt-xl">
                  {{currentItem.desc}}
                </div>
              </div>

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
          {{ tab === 'setting' ? $t('main_play_tips') : $t('main_play_instructions') }}
        </h4>

        <q-tab-panels v-model="tab" class="bg-transparent full-height" animated transition-duration="500"
                      transition-prev="jump-right" transition-next="jump-left">
          <q-tab-panel name="birth">
            <div class="q-mt-md"/>
            <div>
              {{ $t('main_play_birth_desc') }}
            </div>
            <div class="q-mt-md"/>
            <h6>
              {{ $t('main_play_birth_ref_1') }}
            </h6>
            <a class="cask-jump-link-in-text"
               target="_blank"
               href="https://github.com/CrazyTim/spin-wheel">
              spin-wheel
            </a>
            <div class="q-mt-md"/>
            <h6>
              {{ $t('main_play_birth_ref_2') }}
            </h6>
            <a class="cask-jump-link-in-text"
               target="_blank"
               href="https://www.worldometers.info/world-population/population-by-country/">
              Countries in the world by population
            </a>
          </q-tab-panel>
          <q-tab-panel name="tetris">
            <h6 class="row justify-center items-center full-height">
              {{ $t('in_develop') }}
            </h6>
          </q-tab-panel>
          <q-tab-panel name="hextris">
            <h6 class="row justify-center items-center full-height">
              {{ $t('in_develop') }}
            </h6>
          </q-tab-panel>
          <q-tab-panel name="setting">

          </q-tab-panel>
        </q-tab-panels>
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
import CaskTabsVertical from "@/ui/components/CaskTabsVertical.vue";
import {nextTick, onMounted, ref, watch} from "vue";
import { Wheel } from 'spin-wheel';
import {wheelPropsEn, wheelPropsZh} from "@/constant/play-birth";

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
const wheel = ref(null)
const currentItem = ref(null)
const inRotate = ref(false)
let modifier = 0;


watch(() => tab.value, async () => {
  await nextTick()
  gameInit()
})

watch(() => globalState.language,async () => {
  await nextTick()
  gameInit()
})

function gameInit() {
  if(tab.value === "birth") {
    buildWheel()
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function calcSpinToValues() {
  const duration = 3000;
  const winningItemRotaion = getRandomInt(360, 360 * 2) + modifier;
  modifier += 360 * 2;
  return {duration, winningItemRotaion};
}

function startBirth() {
  const {duration, winningItemRotaion} = calcSpinToValues();
  wheel.value.spinTo(winningItemRotaion, duration);
}

function buildWheel() {
  if(wheel.value) {
    wheel.value.remove()
    currentItem.value = null
  }
  const conf = globalState.language === 'zh' ? wheelPropsZh : wheelPropsEn
  const container = document.querySelector('.wheel-container');
  wheel.value = new Wheel(container, conf);
  wheel.value.onCurrentIndexChange = event => {
    currentItem.value = conf.items[event.currentIndex]
  }
  wheel.value.onRest = event => {
    inRotate.value = false
  }
  wheel.value.onSpin = event => {
    inRotate.value = true
  }
}

onMounted(() => {
  gameInit()
})


</script>

<style lang="scss" scoped>

.wheel-container {
  overflow: hidden;
  height: 95%;
  aspect-ratio: 1;
}


</style>