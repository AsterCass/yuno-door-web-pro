<template>
  <q-layout class="component-full-screen column" style="
  background-color: rgba(var(--background-color));background-image: url('/img/chatroom-bg.png');"
            view="hhh lpr fff">
    <cask-base-header :always-show="true" :center-elements="[
        CaskModuleElement.HOME,
    ]" :chatroom-select-first="true" :mini="true"/>


    <div class="col row" style="margin: 5rem 0 1rem 2%">

      <cask-tabs-vertical :tabs="tabs" v-model="tab" width="12rem" text-width="10rem"
                          force-text-color="rgb(var(--text-color))"/>

      <q-tab-panels v-model="tab" animated class="bg-transparent col" transition-duration="500"
                    transition-prev="jump-down" transition-next="jump-up">

        <q-tab-panel v-for="(curTab, index) in tabs" :key="index" :name="curTab.value">
          <q-scroll-area class="full-width full-height" :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }">
            <div class="row full-height q-px-lg">
              <div class="col-6 q-pr-md">
                <h4>
                  {{ $t(curTab.title) }}
                </h4>
                <div style="opacity: .75; white-space: pre-wrap; " class="q-mt-md">
                  {{ $t(curTab.desc) }}
                </div>

                <q-separator class="component-separator-base" spaced="18px" style="opacity: .15" />

                <h5>
                  {{$t('main_download_source_url')}}
                </h5>

                <div class="q-mt-md">
                  {{$t('main_download_no_proxy')}}
                  <a class="cask-jump-link-in-text"
                     target="_blank"
                     :href="curTab.source1">
                    {{$t('main_download_click')}}
                  </a>
                </div>

                <div class="q-mt-md">
                  {{$t('main_download_proxy')}}
                  <a class="cask-jump-link-in-text"
                     target="_blank"
                     :href="curTab.source2">
                    {{$t('main_download_click')}}
                  </a>
                </div>

                <q-separator class="component-separator-base" spaced="18px" style="opacity: .15" />

                <h5>
                  {{$t('main_download_download_url')}}
                </h5>

                <div class="q-mt-md">
                  {{$t('main_download_no_proxy')}}
                  <a class="cask-jump-link-in-text"
                     target="_blank"
                     :href="curTab.download1">
                    {{$t('main_download_click')}}
                  </a>
                </div>

                <div class="q-mt-md">
                  {{$t('main_download_proxy')}}
                  <a class="cask-jump-link-in-text"
                     target="_blank"
                     :href="curTab.download2">
                    {{$t('main_download_click')}}
                  </a>
                </div>

              </div>
              <div class="col">

              </div>

            </div>
          </q-scroll-area>


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
    color: 'rgb(var(--full-container-background-color))',
    source1: 'https://gitee.com/astercass/general-of-the-red-panda/tree/develop/The%20Book%20of%20Grudges',
    source2: 'https://github.com/AsterCass/General-of-the-Red-Panda/tree/develop/The%20Book%20of%20Grudges',
    download1: 'https://pan.baidu.com/s/5P4zJnQ1tJkycI24FEcJC4Q',
    download2: 'https://github.com/AsterCass/General-of-the-Red-Panda/releases',
  },
  {
    value: 'reader',
    label: 'main_download_reader',
    title: 'main_download_reader_title',
    desc: 'main_download_reader_desc',
    color: 'rgb(var(--full-container-background-color))',
    source1: 'https://gitee.com/astercass/general-of-the-red-panda/tree/develop/Meow%20Reader',
    source2: 'https://github.com/AsterCass/General-of-the-Red-Panda/tree/develop/Meow%20Reader',
    download1: 'https://pan.baidu.com/s/5P4zJnQ1tJkycI24FEcJC4Q',
    download2: 'https://github.com/AsterCass/General-of-the-Red-Panda/releases',
  },
  {
    value: 'piano',
    label: 'main_download_piano',
    title: 'main_download_piano_title',
    desc: 'main_download_piano_desc',
    color: 'rgb(var(--full-container-background-color))',
    source1: 'https://gitee.com/astercass/general-of-the-red-panda/tree/develop/Meow%20Piano',
    source2: 'https://github.com/AsterCass/General-of-the-Red-Panda/tree/develop/Meow%20Piano',
    download1: 'https://pan.baidu.com/s/5P4zJnQ1tJkycI24FEcJC4Q',
    download2: 'https://github.com/AsterCass/General-of-the-Red-Panda/releases',
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