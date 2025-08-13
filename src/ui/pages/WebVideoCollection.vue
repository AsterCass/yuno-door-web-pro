<template>
  <q-layout view="hhh lpr fff">
    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
        CaskModuleElement.TOOL,
        CaskModuleElement.CHATROOM,
    ]"/>

    <div class="row justify-center">
      <q-img :no-native-menu="false" :ratio="1/6" fit="cover"
             :src="globalState.curThemeName !== 'dark' ? '/img/video-collection.jpg' : '/img/bg-2-fixed.jpg'"
             class="cask-video-collection-bg-image">
      </q-img>
    </div>


    <div class="cask-base-simple-main" style="padding: 4rem; min-height: 50rem">

      <h4 style="margin-top: 1rem!important;">
        {{ $t('main_video_public') }}
      </h4>

      <div style="margin-bottom: 2rem; opacity: .5;">
        {{ $t('main_video_public_tips') }}
      </div>

      <div class="row">
        <cask-video-card-pro v-for="(video, index) in publicVideoColList" :key="index" class="q-mr-lg q-mb-lg"
                             :cover-image="video.collectionImg"
                             :character-image="video.collectionImgExtra"
                             :name="video.collectionName"
                             :on-click="()=> {toSpecifyPageWithQueryNewTab(thisRouter, 'mainVideoPlay',
                 {colId: video.id})}"
        />

      </div>


      <h4 style="margin-top: 1rem!important;">
        {{ $t('main_video_shared') }}
      </h4>

      <div style="margin-bottom: 2rem; opacity: .5;">
        {{ $t('main_video_shared_tips') }}
      </div>

      <div class="row">
        <cask-video-card-pro v-for="(video, index) in shareVideoColList" :key="index" class="q-mr-lg q-mb-lg"
                             :cover-image="video.collectionImg"
                             :character-image="video.collectionImgExtra"
                             :name="video.collectionName"
                             :on-click="()=> {toSpecifyPageWithQueryNewTab(thisRouter, 'mainVideoPlay',
                 {colId: video.id})}"
        />
      </div>


      <h4 style="margin-top: 1rem!important;">
        {{ $t('main_video_my') }}
      </h4>

      <div style="margin-bottom: 2rem; opacity: .5;">
        {{ $t('main_video_my_tips') }}
      </div>


      <div class="video-collection-upload column justify-center items-center" @click="uploadUserVideo">
        <q-icon class="q-my-sm" name="fa-solid fa-arrow-up-from-bracket" size="1.1rem"/>
        <div class="q-my-sm">
          {{ $t('main_video_upload') }}
        </div>
      </div>


    </div>

    <cask-base-footer/>

  </q-layout>
</template>

<script setup>
import {CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import CaskVideoCardPro from "@/ui/views/CaskVideoCardPro.vue";
import {getAdminVideoCol, getPersonVideoCol} from "@/api/video";
import {customPageNP} from "@/utils/page";
import {onMounted, ref} from "vue";
import {notifyTopWarning} from "@/utils/notification-tools";
import {useI18n} from "vue-i18n";
import {toSpecifyPageWithQueryNewTab} from "@/router";
import {useRouter} from "vue-router";

const globalState = useGlobalStateStore();
const thisRouter = useRouter()
const {t} = useI18n()

// public video
const publicVideoColList = ref([])
// share video
const shareVideoColList = ref([])

function getVideoCollections() {

  getAdminVideoCol(customPageNP(0, 100)).then(res => {
    if (!res || !res.data) {
      return
    }
    shareVideoColList.value = res.data
  })

  getPersonVideoCol().then(res => {
    if (!res || !res.data) {
      return
    }
    publicVideoColList.value = res.data

  })
}

function uploadUserVideo() {
  if (!globalState.isLogin) {
    notifyTopWarning(t('no_login'))
    return
  }
  notifyTopWarning(t('no_auth'))
}

onMounted(() => {
  getVideoCollections();
})



</script>

<style scoped lang="scss">

.cask-video-collection-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  z-index: -1 !important;
  opacity: 0.9;

  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0));
}

.video-collection-upload {
  cursor: pointer;
  height: 15rem;
  width: 10rem;
  border-radius: 8px;
  border: 2px dashed rgb(var(--full-container-background-color))
}


</style>