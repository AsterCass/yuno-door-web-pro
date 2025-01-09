<template>
  <q-layout view="hhh lpr fff">

    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
        CaskModuleElement.ARTICLE,
        CaskModuleElement.CHATROOM,
    ]"/>

    <div class="row justify-center">
      <q-img :no-native-menu="false" :ratio="1/6" fit="cover"
             :src="globalState.curThemeName !== 'dark' ? '/img/tools-list.jpg' : '/img/bg-2-fixed.jpg'"
             class="cask-article-detail-bg-image">
      </q-img>
    </div>

    <q-page-container>

      <div class="row q-my-xl q-mx-md" style="min-height: 50rem">

        <div class="col-3">

        </div>

        <div class="col">
          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <div :key="route.name">
                <component :is="Component"></component>
              </div>
            </transition>
          </router-view>
        </div>


      </div>

    </q-page-container>


    <cask-base-footer/>

  </q-layout>
</template>

<script setup>
import {CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {useGlobalStateStore} from "@/utils/global-state";

const globalState = useGlobalStateStore();
</script>

<style scoped lang="scss">

.fade-enter-from {
  opacity: 0;
  transform: scale(.95);
}

.fade-enter-active {
  transition: all .5s ease;
}

.fade-leave-active {
  transition: all .5s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: scale(.95);
}

.cask-article-detail-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 12rem;
  z-index: -1 !important;
  opacity: 0.9;

  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0));
}

</style>