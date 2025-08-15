<template>
  <q-layout view="hhh lpr fff" class="component-full-screen column"
            style="background-color: rgba(var(--background-color));background-image: url('/img/video-play-bg.png');">
    <cask-base-header :chatroom-select-first="true" :center-elements="[
        CaskModuleElement.HOME, CaskModuleElement.CHATROOM,
    ]" :always-show="true" :mini="true"/>


    <div class="col row">

      <div v-if="!globalState.screenMini" class="col-3 column" style="padding: 8% 1% 2% 4%">

        <h3>
          播放列表
        </h3>

        <q-scroll-area delay="100" style="height: 60%;"
                       :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }">
          <cask-tabs-vertical :tabs="tabs" v-model="tab" width="90%" text-width="60%"
                              force-text-color="rgb(var(--text-color))" :i18n="false"/>

        </q-scroll-area>


      </div>

      <div class="col row items-center justify-center">
        <div id="mainPlayer" ref="mainPlayerRef"></div>
      </div>

      <div v-if="!globalState.screenMini" class="col-3">

      </div>

    </div>

    <cask-base-footer :simple="true"/>
  </q-layout>
</template>

<script setup>
import {CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {useI18n} from "vue-i18n";
import {defineProps, onBeforeUnmount, onMounted, ref} from "vue";
import CaskTabsVertical from "@/ui/components/CaskTabsVertical.vue";
import {notifyTopWarning} from "@/utils/notification-tools";
import {getVideoListByColId} from "@/api/video";
import Player from 'xgplayer';


const globalState = useGlobalStateStore();
const {t} = useI18n()

//prop
const props = defineProps({
  colId: {
    type: String,
    required: false,
    default: '',
  },
  vdoId: {
    type: String,
    required: false,
    default: '',
  },
})
// data
let vdoListData = ref([])
const tabs = ref([])
const tab = ref("base")
const mainPlayerRef = ref(null)

let player = null;

function resetPlayer(url) {

  if (mainPlayerRef.value && !player) {
    player = new Player({
      id: mainPlayerRef.value.id,
      url: [
        {
          src: 'https://api.astercasc.com/ushio/video/play/VC1648909883875288/1.mp4',
          type: 'video/mp4'
        },
        {
          src: 'https://api.astercasc.com/ushio/video/play/VC1648909883875288/2.mp4',
          type: 'video/mp4'
        },
      ]
    })
  }


}

onMounted(() => {
  if (!globalState.isLogin) {
    notifyTopWarning(t('no_login'))
    return
  }
  let param = {collectionId: props.colId}
  getVideoListByColId(param).then(res => {
    if (!res || !res.data) {
      return
    }
    vdoListData.value = res.data
    for (const vdo of vdoListData.value) {
      const newTab = {}
      newTab.value = vdo.id
      newTab.label = vdo.videoName
      newTab.color = 'rgb(var(--full-container-background-color))'
      tabs.value.push(newTab)
    }
    tab.value = vdoListData.value[0].id

    resetPlayer(vdoListData.value[0].videoRes)

  })
})


onBeforeUnmount(() => {
  // if (player) {
  //   player.dispose();
  // }
})


</script>

<style scoped lang="scss">
@import 'xgplayer/dist/index.min.css';

</style>