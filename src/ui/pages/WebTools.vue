<template>
  <q-layout view="hhh lpr fff">

    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
        CaskModuleElement.ARTICLE,
        CaskModuleElement.PLAY,
        CaskModuleElement.CHATROOM,
    ]"/>

    <div class="row justify-center">
      <q-img :no-native-menu="false" :ratio="1/6" fit="cover"
             :src="globalState.curThemeName !== 'dark' ? '/img/tools-list.jpg' : '/img/bg-2-fixed.jpg'"
             class="cask-article-detail-bg-image">
      </q-img>
    </div>

    <q-page-container>

      <div class="row q-my-xl q-mx-md">

        <div class="col-md-3 col-12 row justify-center">
          <cask-tabs-vertical :tabs="tabs" v-model="tab" @update:model-value="updateTab"/>
        </div>

        <div class="col-md-9 col-12">
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

    <q-footer class="bg-transparent">
      <cask-base-footer/>
    </q-footer>

  </q-layout>
</template>

<script setup>
import {CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {ref, watch} from "vue";
import CaskTabsVertical from "@/ui/components/CaskTabsVertical.vue";
import {toSpecifyPage} from "@/router";
import {useRouter} from "vue-router";

const globalState = useGlobalStateStore();
const thisRouter = useRouter()

const tabs = ref([
  {value: 'mainToolsSql2kotlin', label: 'main_tools_title_sql_kotlin', color: 'rgb(211, 47, 47)'},
  {value: 'mainToolsTimestamp', label: 'main_tools_title_timestamp', color: 'rgb(194, 24, 91)'},
  {value: 'mainToolsQrcode', label: 'main_tools_title_qrcode', color: 'rgb(123, 32, 163)'},
  {value: 'mainToolsMd5', label: 'main_tools_title_md5', color: 'rgb(81, 45, 168)'},
  {value: 'mainToolsImgBase64', label: 'main_tools_title_base64', color: 'rgb(48, 63, 159)'},
  {value: 'mainToolsRgbHex', label: 'main_tools_title_rgb_hex', color: 'rgb(25, 118, 210)'},
  {value: 'mainToolsCnIdCard', label: 'main_tools_title_cn_id_card', color: 'rgb(2, 136, 209)'},
])
const tab = ref(thisRouter.currentRoute.value.name);

watch(thisRouter.currentRoute, () => {
  tab.value = thisRouter.currentRoute.value.name
});

const updateTab = (newTabValue) => {
  toSpecifyPage(thisRouter, newTabValue)
}


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