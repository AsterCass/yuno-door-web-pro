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

    <div>

      <div class="row justify-center">
        <cask-main-article-container class="col-lg-11 col-12"/>
      </div>

      <q-separator class="component-separator-base" style="margin: 0 5rem 2rem 5rem; opacity: .2" />

      <div class="row justify-center">
        <cask-main-eassay-container class="col-lg-11 col-12"/>
      </div>


      <div>
        工具
      </div>

      <div>
        该模块副标题
      </div>

      <div>
        内容
      </div>


      <div>
        游戏
      </div>

      <div>
        该模块副标题
      </div>

      <div>
        内容
      </div>


      <div>
        视频
      </div>

      <div>
        该模块副标题
      </div>

      <div>
        内容
      </div>

    </div>


    <cask-base-footer/>


  </q-layout>
</template>

<script setup>
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import CaskMainArticleContainer from "@/ui/views/CaskMainArticleContainer.vue";
import CaskMainEassayContainer from "@/ui/views/CaskMainEassayContainer.vue";

const globalState = useGlobalStateStore();


</script>

<style scoped lang="scss">

.cask-main-top-container {
  position: relative;
  min-height: 70rem;
  padding: 5rem 1rem 0 1rem;

  .cask-main-top-content {
    padding-top: 2rem;

    color: rgb(var(--full-container-text-color));
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