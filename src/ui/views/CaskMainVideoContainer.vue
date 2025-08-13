<template>
  <div class="row q-mx-xl q-mb-xl justify-center">

    <div class="col-12 row justify-center">
      <h2>
        {{ $t('main-nav-video') }}
      </h2>
    </div>

    <div class="col-12 text-center q-px-md" style="opacity: .5;max-width: 52rem">
      {{ $t('subtitle-6') }}
    </div>


    <div v-if="0 === videoList.length" class="col-12 row justify-center q-mt-sm q-mb-xl items-center">
      <q-spinner-bars size="40px"/>
    </div>

    <div v-if="0 !== videoList.length" class="col-12 row justify-between q-mt-sm q-mb-lg items-center">

      <div class="q-mx-xs q-ml-md cask-cursor-pointer" @click="scrollVideoStep(false)"
           style="background-color: rgb(var(--full-container-background-color-light)); border-radius: 4px">
        <div class="row items-center q-my-xl q-mx-sm">
          <q-icon name="fa-solid fa-chevron-left" size="1.5rem" style="margin-top: 2px"/>
        </div>
      </div>

      <div ref="videoScrollerRef" :style="!globalState.screenMini ? 'width: 88%' : 'width: 60%'">
        <q-virtual-scroll
            class="component-no-scroller"
            virtual-scroll-item-size="0" virtual-scroll-horizontal
            v-slot="{index}" :items="videoList">
          <div :id="videoList[index].id" style="margin: 5rem 1rem 2rem 1rem;">
            <cask-video-card-pro
                :cover-image="videoList[index].collectionImg"
                :character-image="videoList[index].collectionImgExtra"
                :name="videoList[index].collectionName"
                :on-click="()=> {toSpecifyPageWithQueryNewTab(thisRouter, 'mainVideoPlay',
                 {colId: videoList[index].id})}"
            />
          </div>
        </q-virtual-scroll>
      </div>

      <div class="q-mx-xs q-mr-md cask-cursor-pointer" @click="scrollVideoStep(true)"
           style="background-color: rgb(var(--full-container-background-color-light)); border-radius: 4px">
        <div class="row items-center q-my-xl q-mx-sm">
          <q-icon name="fa-solid fa-chevron-right" size="1.5rem" style="margin-top: 2px"/>
        </div>
      </div>


    </div>


    <div class="col-12 row justify-center">
      <q-btn no-caps unelevated class="shadow-2 component-full-btn-std"
             @click="toSpecifyPage(thisRouter,'mainVideoCollection')">
        <div class="row items-center">
          <div class="q-mx-xs">
            {{ $t('route-more-list') }}
          </div>
        </div>
      </q-btn>
    </div>


  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {getAllVideoCol} from "@/api/video";
import {customPageNP} from "@/utils/page";
import {toSpecifyPage, toSpecifyPageWithQueryNewTab} from "@/router";
import {useRouter} from "vue-router";
import CaskVideoCardPro from "@/ui/views/CaskVideoCardPro.vue";

const thisRouter = useRouter()
const globalState = useGlobalStateStore();

const videoCurrent = ref(0)
const videoList = ref([])
const videoScrollerRef = ref(null)

function scrollVideoStep(isNext) {
  //cal
  let toVideoIndex = isNext ? videoCurrent.value + 1 : videoCurrent.value - 1
  let rellyIndex = toVideoIndex > videoList.value.length - 1 ? videoList.value.length - 1 : toVideoIndex
  rellyIndex = rellyIndex < 0 ? 0 : rellyIndex

  //assign
  const container = videoScrollerRef.value
  if (container) {
    const targets = container.querySelectorAll('.q-virtual-scroll');
    if (targets.length > 0) {
      //parent and child
      const target = targets[0]
      const maxScrollOffset = target.scrollWidth - target.clientWidth
      const childTarget = document.getElementById(videoList.value[rellyIndex].id);
      //offset
      const targetLeft = target.getBoundingClientRect().left;
      const childTargetLeft = childTarget.getBoundingClientRect().left;
      let scrollOffset = childTargetLeft - targetLeft + target.scrollLeft;
      //set
      target.scrollTo({
        left: (rellyIndex === 0) ? 0 : scrollOffset,
        behavior: 'smooth',
      })
      if (scrollOffset < maxScrollOffset) {
        videoCurrent.value = rellyIndex
      }
    }
  }
}

onMounted(() => {
  getAllVideoCol(customPageNP(0, 10)).then(res => {
    if (!res || !res.data) {
      return
    }
    videoList.value.push(...res.data)
  })
})


</script>

<style scoped lang="scss">

</style>