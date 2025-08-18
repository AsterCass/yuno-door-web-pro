<template>
  <q-layout view="hhh lpr fff" class="component-full-screen column"
            style="background-color: rgba(var(--background-color));background-image: url('/img/video-play-bg.png');">
    <cask-base-header :chatroom-select-first="true" :center-elements="[
        CaskModuleElement.HOME, CaskModuleElement.CHATROOM, CaskModuleElement.VIDEO,
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
          <cask-tabs-vertical :tabs="tabs" v-model="tab" width="90%" text-width="60%" @update:model-value="updateVdo"
                              force-text-color="rgb(var(--text-color))" :i18n="false"/>

        </q-scroll-area>


      </div>

      <div class="col column items-center justify-center">

        <div class="main-player-pre">

        </div>

        <div class="main-player relative-position">
          <div v-show="!inLoading">
            <video
                id="mainPlayer"
                ref="mainPlayerRef"
                class="plyr"
                playsinline
                controls
            >
            </video>
          </div>
          <q-spinner-tail v-show="inLoading" class="absolute-top-left q-ma-md"
                          style="color: #eee" size="30px">
          </q-spinner-tail>
        </div>

        <div class="main-player-post">

        </div>

      </div>

      <div v-if="!globalState.screenMini" class="col-3">
        <!--        <cask-base-comment-tree :main-id="colId"/>-->
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
import {getVideoListByColId} from "@/api/video";
import Plyr from "plyr";
import {toReplacePage, toSpecifyPage} from "@/router";
import {useRouter} from "vue-router";

const thisRouter = useRouter()
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
const vdoListData = ref([])
const tabs = ref([])
const tab = ref("base")
const mainPlayerRef = ref(null)
const currentVideoData = ref(
    {
      id: "",
      videoRes: "",
      videoName: "",
      videoNum: 0,
    }
)
const inLoading = ref(true);

let player = null

function initPlayer() {
  if (mainPlayerRef.value && !player) {
    player = new Plyr(mainPlayerRef.value,
        {
          controls: [
            'play-large', // The large play button in the center
            'play', // Play/pause playback
            'progress', // The progress bar and scrubber for playback and buffering
            'current-time', // The current time of playback
            'duration', // The full duration of the media
            'mute', // Toggle mute
            'volume', // Volume control
            'captions', // Toggle captions
            'settings', // Settings menu
            'fullscreen', // Toggle fullscreen
          ],
          autoplay: true,
          keyboard: {focused: true, global: true},
        }
    )
    player.on('ended', () => {
      if (vdoListData.value && vdoListData.value.length > 0) {
        const nextCount = currentVideoData.value.videoNum
        if (vdoListData.value.length > nextCount) {
          currentVideoData.value = vdoListData.value[nextCount]
          toReplacePage(thisRouter, {colId: props.colId, vdoId: currentVideoData.value.id})
          tab.value = currentVideoData.value.id
          resetPlayer(currentVideoData.value)
        }
      }
    });
    player.on('ready', () => {
      inLoading.value = true
    });
    player.on('canplay', (event) => {
      const instance = event.detail.plyr;
      if (instance.duration > 0) {
        inLoading.value = false
      }
    });
  }
}

function updateVdo(newVdoId) {
  for (const vdo of vdoListData.value) {
    if (vdo.id === newVdoId) {
      currentVideoData.value = vdo
      break;
    }
  }
  resetPlayer(currentVideoData.value)
}

function resetPlayer(data) {
  if (!mainPlayerRef.value || !player) {
    return
  }
  player.source = {
    type: "video",
    sources: [
      {
        src: data.videoRes,
        type: "video/mp4"
      }
    ]
  };
}

onMounted(() => {
  if (!globalState.isLogin) {
    toSpecifyPage(thisRouter, "401")
    return
  }
  initPlayer()
  let param = {collectionId: props.colId}
  getVideoListByColId(param).then(res => {
    if (!res || !res.data) {
      return
    }
    if (res.data.length <= 0) {
      toSpecifyPage(thisRouter, "403")
      return
    }
    // set current video
    if (!props.vdoId) {
      toReplacePage(thisRouter, {colId: props.colId, vdoId: res.data[0].id})
    }
    currentVideoData.value = props.vdoId ? {id: props.vdoId} : res.data[0]
    // load data
    vdoListData.value = res.data
    for (const vdo of vdoListData.value) {
      const newTab = {}
      newTab.value = vdo.id
      newTab.label = vdo.videoName
      newTab.color = 'rgb(var(--full-container-background-color))'
      tabs.value.push(newTab)
      if (vdo.id === currentVideoData.value.id) {
        currentVideoData.value = vdo
      }
    }
    tab.value = currentVideoData.value.id
    // play
    resetPlayer(currentVideoData.value)
  })
})


onBeforeUnmount(() => {
  if (player) {
    player.destroy()
  }
})


</script>

<style scoped lang="scss">

.main-player-pre {
  height: 2rem;
  background: rgb(var(--full-container-background-color));
  border-radius: 8px 8px 0 0;
  width: 95%;
}

.main-player-post {
  height: 2rem;
  background: rgb(var(--full-container-background-color));
  border-radius: 0 0 8px 8px;
  width: 95%;
}

.main-player {
  width: 95%;
  aspect-ratio: 16 / 9;
  background: black;
}

</style>

<style lang="scss">
@import "plyr/dist/plyr.css";

:root {
  --plyr-color-main: rgb(var(--full-container-background-color));
}

.plyr {
  aspect-ratio: 16 / 9;
  width: 100%;
}

</style>