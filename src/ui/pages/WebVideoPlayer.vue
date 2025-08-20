<template>
  <q-layout view="hhh lpr fff" class="component-full-screen column"
            style="background-color: rgba(var(--background-color));background-image: url('/img/video-play-bg.png');">
    <cask-base-header :chatroom-select-first="true" :center-elements="[
        CaskModuleElement.HOME, CaskModuleElement.CHATROOM, CaskModuleElement.VIDEO,
    ]" :always-show="true" :mini="true"/>


    <div class="col row">

      <div v-if="!globalState.screenMini" class="col-3 column" style="padding: 8% 1% 2% 4%">

        <h3>
          {{ $t('main_video_playlist') }}
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

        <div id="player-wrapper" class="main-player relative-position">
          <div v-show="!inLoading && !inLoadingDanmaku">
            <video
                id="mainPlayer"
                ref="mainPlayerRef"
                class="plyr"
                playsinline
                controls
            >
            </video>
          </div>

          <q-spinner-tail v-show="inLoading || inLoadingDanmaku" class="absolute-top-left q-ma-md"
                          style="color: #eee" size="30px">
          </q-spinner-tail>
        </div>

        <div class="main-player-post row items-center">

          <div class="q-ml-md" @click="playLast"
               :class="!currentVideoData || currentVideoData.videoNum <= 1 ?
            'cask-cursor-disabled' : 'cask-cursor-pointer' ">
            <q-icon name="fa-solid fa-backward-step" color="white" size="22px"/>
          </div>

          <div class="q-ml-md" @click="playNext"
               :class="!currentVideoData || currentVideoData.videoNum >= vdoListData.length ?
            'cask-cursor-disabled' : 'cask-cursor-pointer' ">
            <q-icon name="fa-solid fa-forward-step" color="white" size="22px"/>
          </div>


          <div class="q-ml-md row items-center text-white cask-cursor-pointer" style="font-size: 13px"
               :style="autoPlay ? '' : 'opacity: .5'" @click="updateAutoPlay">
            <div class="q-mr-xs">
              {{ $t('main_video_autoplay') }}
            </div>
            <q-icon v-show="autoPlay" name="fa-solid fa-check" size="14px"/>
            <q-icon v-show="!autoPlay" name="fa-solid fa-xmark" size="14px"/>
          </div>


          <div class="q-ml-md row items-center text-white cask-cursor-pointer" style="font-size: 13px"
               :style="autoNext ? '' : 'opacity: .5'" @click="updateAutoNext">
            <div class="q-mr-xs">
              {{ $t('main_video_auto_next') }}
            </div>
            <q-icon v-show="autoNext" name="fa-solid fa-check" size="14px"/>
            <q-icon v-show="!autoNext" name="fa-solid fa-xmark" size="14px"/>
          </div>

          <div class="q-ml-md row items-center text-white cask-cursor-pointer" style="font-size: 13px;"
               :style="enableDanmaku ? '' : 'opacity: .5'" @click="updateDanmaku">
            <div class="q-mr-xs">
              {{ $t('main_video_enable_danmaku') }}
            </div>
            <q-icon v-show="enableDanmaku" name="fa-solid fa-check" size="14px"/>
            <q-icon v-show="!enableDanmaku" name="fa-solid fa-xmark" size="14px"/>
          </div>

          <q-input class="main-danmaku-input q-mx-md col" v-model="danmakuInput"
                   @keydown.enter.prevent="forLineBreakSend"
                   type="textarea" :placeholder="$t('main_long_text_input_placeholder')" borderless/>


        </div>

      </div>

      <div v-if="!globalState.screenMini" class="col-2">
        <!--        todo comment -->
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
import {defineProps, onBeforeUnmount, onMounted, ref, watch} from "vue";
import CaskTabsVertical from "@/ui/components/CaskTabsVertical.vue";
import {getVideoListByColId} from "@/api/video";
import Plyr from "plyr";
import {toReplacePage, toSpecifyPage} from "@/router";
import {useRouter} from "vue-router";
import {loadCCL} from "@/utils/use-ccl";
import {getVideoBarrage} from "@/api/barrage";
import {notifyTopWarning} from "@/utils/notification-tools";

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
const inLoadingDanmaku = ref(true);
const autoPlay = ref(globalState.curPlayerAutoPlay);
const autoNext = ref(globalState.curPlayerAutoNext);
const enableDanmaku = ref(globalState.curPlayerEnableDanmaku);
const danmakuInput = ref("")

let player = null
let danmakuPlayer = null
let lastVdoId = null

watch(
    () => globalState.language,
    () => {
      initPlayer()
      resetPlayer(currentVideoData.value)
    }
);

watch(
    () => currentVideoData.value,
    () => {
      toReplacePage(thisRouter, {colId: props.colId, vdoId: currentVideoData.value.id})
      tab.value = currentVideoData.value.id
      resetPlayer(currentVideoData.value)
      if (currentVideoData.value && currentVideoData.value.id !== lastVdoId) {
        lastVdoId = currentVideoData.value.id
        if (lastVdoId) {
          inLoadingDanmaku.value = true
          getVideoBarrage(lastVdoId).then(res => {
            if (!res || !res.data) {
              inLoadingDanmaku.value = false
              return
            }
            if (!danmakuPlayer) {
              inLoadingDanmaku.value = false
              return
            }
            const objs = res.data.map(d => ({
              mode: d.type === 0 ? 1 : 5,
              dur: 6000,
              text: d.text,
              stime: d.time * 1000,
              size: 20,
              color: d.color
            }));
            danmakuPlayer.load(objs)
            inLoadingDanmaku.value = false
          })
        }
      }
    }
);

function initdanmaku() {
  if (danmakuPlayer) {
    danmakuPlayer.stop()
    danmakuPlayer = null
  }
  danmakuPlayer = new window.CommentManager(document.getElementById('main-danmaku'));
  danmakuPlayer.init();
  danmakuPlayer.start();
}

function initPlayer() {
  if (player) {
    player.destroy()
    player = null
  }
  if (mainPlayerRef.value) {
    player = new Plyr('#mainPlayer',
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
          autoplay: autoPlay.value,
          keyboard: {focused: true, global: true},
          i18n: {
            speed: t('main_video_speed'),
            normal: t('main_video_speed_normal'),
          },
          blankVideo: "",
          iconUrl: "/img/plyr.more.svg",
        }
    )
    player.on("play", () => {
      if (danmakuPlayer && enableDanmaku.value) {
        danmakuPlayer.setBounds();
        danmakuPlayer.start()
      }
    })
    player.on("pause", () => {
      if (danmakuPlayer && enableDanmaku.value) {
        danmakuPlayer.stop()
      }
    })
    player.on("seeked", () => {
      if (danmakuPlayer && enableDanmaku.value) {
        // danmakuPlayer.clear()
        danmakuPlayer.time(player.currentTime * 1000)
      }
    })
    player.on("timeupdate", () => {
      if (danmakuPlayer && enableDanmaku.value) {
        danmakuPlayer.time(player.currentTime * 1000)
      }
    })
    player.on('ended', () => {
      if (!autoNext.value) {
        return
      }
      if (danmakuPlayer) {
        danmakuPlayer.clear()
      }
      playNext()
    });
    player.on('ready', () => {
      inLoading.value = true
      if (danmakuPlayer) {
        danmakuPlayer.clear()
      } else {
        const container = player.elements.container
        const danmakuContainer = document.createElement('div');
        danmakuContainer.id = "main-danmaku";
        danmakuContainer.classList.add("container")
        danmakuContainer.style.cssText = `
        pointer-events: none;
        `;
        container.appendChild(danmakuContainer);
        initdanmaku()
      }
    });
    player.on('canplay', (event) => {
      const instance = event.detail.plyr;
      if (instance.duration > 0) {
        inLoading.value = false
      }
    });
  }
}

function playLast() {
  if (vdoListData.value && vdoListData.value.length > 0) {
    const lastCount = currentVideoData.value.videoNum - 2
    if (lastCount >= 0) {
      currentVideoData.value = vdoListData.value[lastCount]
    }
  }
}

function playNext() {
  if (vdoListData.value && vdoListData.value.length > 0) {
    const nextCount = currentVideoData.value.videoNum
    if (vdoListData.value.length > nextCount) {
      currentVideoData.value = vdoListData.value[nextCount]
    }
  }
}

function updateAutoPlay() {
  autoPlay.value = !autoPlay.value;
  globalState.updateCurPlayerAutoPlay(autoPlay.value)
  if (player) {
    player.autoplay = autoPlay.value
  }
}

function updateAutoNext() {
  autoNext.value = !autoNext.value;
  globalState.updateCurPlayerAutoNext(autoNext.value)
}

function updateDanmaku() {
  enableDanmaku.value = !enableDanmaku.value;
  globalState.updateCurPlayerEnableDanmaku(enableDanmaku.value)
  if (danmakuPlayer) {
    danmakuPlayer.clear()
  }
}

function updateVdo(newVdoId) {
  for (const vdo of vdoListData.value) {
    if (vdo.id === newVdoId) {
      currentVideoData.value = vdo
      break;
    }
  }
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

function forLineBreakSend(event) {
  if (event.ctrlKey) {
    danmakuInput.value += '\n'
  } else {
    notifyTopWarning(t('in_develop'))
  }
}

function thisScreenEventHandler() {
  if (danmakuPlayer) {
    danmakuPlayer.setBounds();
  }
}

onMounted(async () => {
  if (!globalState.isLogin) {
    toSpecifyPage(thisRouter, "401")
    return
  }
  window.addEventListener("resize", thisScreenEventHandler);
  await loadCCL()
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
  })
})


onBeforeUnmount(() => {
  window.removeEventListener("resize", thisScreenEventHandler);
  if (player) {
    player.destroy()
    player = null
  }
  if (danmakuPlayer) {
    danmakuPlayer.stop()
    danmakuPlayer = null
  }
})


</script>

<style scoped lang="scss">

.main-player-pre {
  height: 1.5rem;
  background: rgb(var(--full-container-background-color));
  border-radius: 8px 8px 0 0;
  width: 95%;
}

.main-player-post {
  min-height: 3.3rem;
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

.plyr {
  --plyr-color-main: rgb(var(--full-container-background-color));
  aspect-ratio: 16 / 9;
  width: 100%;
}

.main-danmaku-input {
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;

  textarea {
    resize: none !important;
    height: 1.8rem;
    font-size: .8rem;
    color: white;
    letter-spacing: 0.023rem;
    line-height: 1.1rem;
    min-height: 1.1rem !important;
    background-color: transparent;
    margin: 0;
    padding: 6px 12px !important;
    border-radius: 4px;
    overflow-wrap: anywhere;
  }
}

</style>

<style lang="scss">
@import "@/styles/comment-core-lib.css";

</style>