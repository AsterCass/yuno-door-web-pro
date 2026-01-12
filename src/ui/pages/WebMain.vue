<template>
  <q-layout view="hhh lpr fff">

    <cask-base-header :center-elements="[
        CaskModuleElement.ARTICLE,
        CaskModuleElement.TOOL,
        CaskModuleElement.VIDEO,
        CaskModuleElement.GUEST_BOOK,
        CaskModuleElement.PLAY,
        CaskModuleElement.CHATROOM,
    ]"/>

    <div class="cask-main-top-container row justify-center">
      <q-img :no-native-menu="false" :ratio="16/9" fit="cover"
             :src="globalState.curThemeName !== 'dark' ?
             '/img/bg-1-fixed.jpg' : '/img/bg-2-fixed.jpg'" class="cask-main-bg-image">
      </q-img>

      <div class="cask-main-top-content"
           :style="globalState.screenMini ? 'padding-top: 8rem; width: 90%' : 'padding-top: 2rem; width: 60%'">
        <div :style="globalState.screenMini ? 'font-size: 3rem' : 'font-size: 5rem'">
          {{ $t('main_title') }}
        </div>
        <div style="font-size: 1.5rem" class="q-my-md">
          <span id="typing-text"></span>
        </div>
        <div style="font-size: 1.1rem; opacity: .8" v-if="!globalState.screenMini">
          {{ $t('main_top_content') }}
        </div>


        <div v-show="scrollState.scrollTop === 0" ref="downingAnimationRef"
             class="absolute cursor-pointer"
             @click="togoElementCenter('main-first-element')"
             style="height: 6rem; position: fixed; bottom: 50px; left: 50%;transform: translateX(-50%);"/>


      </div>


    </div>

    <div>

      <div id="main-first-element"/>

      <div class="row justify-center">
        <cask-main-article-container class="col-md-11 col-12"/>
      </div>

      <q-separator class="component-separator-base" style="margin: 0 5rem 2rem 5rem; opacity: .2"/>

      <div class="row justify-center">
        <cask-main-essay-container class="col-md-11 col-12"/>
      </div>

      <q-separator class="component-separator-base" style="margin: 0 5rem 2rem 5rem; opacity: .2"/>


      <div class="row justify-center">
        <cask-main-toolkit-container class="col-md-11 col-12"/>
      </div>

      <q-separator class="component-separator-base" style="margin: 0 5rem 2rem 5rem; opacity: .2"/>

      <div class="row justify-center">
        <cask-main-game-container class="col-md-11 col-12"/>
      </div>

      <q-separator class="component-separator-base" style="margin: 0 5rem 2rem 5rem; opacity: .2"/>


      <div class="row justify-center">
        <cask-main-video-container class="col-md-11 col-12"/>
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
import CaskMainEssayContainer from "@/ui/views/CaskMainEssayContainer.vue";
import {onBeforeMount, onMounted, ref, watch} from "vue";
import {createTypingEffect} from "@/utils/auto-typing";
import {useI18n} from 'vue-i18n';
import CaskMainToolkitContainer from "@/ui/views/CaskMainToolkitContainer.vue";
import lottie from "lottie-web";
import {togoElementCenter} from "@/utils/base-tools";
import {scrollState} from "@/utils/global-state-no-save";
import CaskMainGameContainer from "@/ui/views/CaskMainGameContainer.vue";
import CaskMainVideoContainer from "@/ui/views/CaskMainVideoContainer.vue";
import {CaskModuleElement} from "@/constant/enums/component-enums";


const globalState = useGlobalStateStore();
const {t} = useI18n()

let currentTyping = ref(null)
let downingAnimationRef = ref(null)
let downingAnimationName = ref("mainDowningAnimation")


watch(
    () => globalState.language,
    () => {
      currentTyping.value.reset(t('main_subtitle'))
    }
);

function initTyping() {
  currentTyping.value = createTypingEffect(
      document.querySelector('#typing-text'),
      t('main_subtitle'),
      {
        typeSpeed: 50,
      }
  );
}

function initDowningAnimation() {
  lottie.loadAnimation({
    name: downingAnimationName.value,
    container: downingAnimationRef.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: "/animation/down.json",
  });

}

onMounted(() => {
  initTyping()
  initDowningAnimation()
})

onBeforeMount(() => {
  //destroy typing
  if (currentTyping.value) {
    currentTyping.value.destroy()
  }
  //destroy animation
  lottie.destroy(downingAnimationName.value)
})

</script>

<style scoped lang="scss">

.cask-main-top-container {
  position: relative;
  min-height: 70rem;
  padding: 5rem 1rem 0 1rem;

  .cask-main-top-content {
    color: rgb(var(--full-container-text-color));
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