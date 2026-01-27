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


      </div>

      <div class="col column items-center justify-center">

        <div class="main-player-pre">

        </div>

        <div id="player-wrapper" class="main-player relative-position">
          <div>
            <video
                id="mainPlayer"
                ref="mainPlayerRef"
                class="plyr"
                playsinline
                controls
                autoplay
            >
            </video>
          </div>
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
import {defineProps, onBeforeUnmount, onMounted, watch, ref} from "vue";
import {toSpecifyPage} from "@/router";
import {useRouter} from "vue-router";
import flvjs from 'flv.js'

const thisRouter = useRouter()
const globalState = useGlobalStateStore();
const {t} = useI18n()

const mainPlayerRef = ref(null)
let flvPlayer = null

//prop
const props = defineProps({
  streamId: {
    type: String,
    required: false,
    default: '',
  },
})


watch(
    () => globalState.language,
    () => {
    }
);


onMounted(async () => {
  if (!globalState.isLogin) {
    toSpecifyPage(thisRouter, "401")
    return
  }
  console.log(props.streamId);
  if (flvjs.isSupported() && mainPlayerRef.value) {
    flvPlayer = flvjs.createPlayer(
        {
          type: 'flv',
          url: 'https://api.astercasc.com/live',
          isLive: true
        },
        {
          enableStashBuffer: false, // 关键：降低延迟
          stashInitialSize: 128
        }
    )

    flvPlayer.attachMediaElement(mainPlayerRef.value)
    flvPlayer.load()
    flvPlayer.play()
  } else {
    console.error('FLV is not supported in this browser')
  }
})


onBeforeUnmount(() => {
  if (flvPlayer) {
    flvPlayer.pause()
    flvPlayer.unload()
    flvPlayer.detachMediaElement()
    flvPlayer.destroy()
    flvPlayer = null
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