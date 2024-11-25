<template>
  <div class="row q-mx-xl q-mb-xl justify-center">

    <div class="col-12 row justify-center">
      <h2>
        {{ $t('main-nav-video') }}
      </h2>
    </div>

    <div class="col-12 text-center q-px-md" style="margin-bottom: 2rem; opacity: .5;max-width: 52rem">
      {{ $t('subtitle-6') }}
    </div>

    <div class="col-12 row justify-between q-mt-sm q-mb-lg items-center">

      <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs q-ml-md"
             style="background-color: rgb(var(--full-container-background-color-light))">
        <div class="row items-center q-my-xl">
          <q-icon name="fa-solid fa-chevron-left" size="1.5rem" style="margin-top: 2px"/>
        </div>
      </q-btn>

      <q-virtual-scroll :style="!globalState.screenMini ? 'width: 90%' : 'width: 60%'"
                        class="component-no-scroller"
                        virtual-scroll-item-size="0" virtual-scroll-horizontal
                        v-slot="{index}" :items="videoList">

        <div style="height: 20rem; width: 14rem; background-color: grey;" class="q-ma-md">
          {{ videoList[index].id }}
        </div>
      </q-virtual-scroll>


      <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs q-mr-md"
             style="background-color: rgb(var(--full-container-background-color-light))">
        <div class="row items-center q-my-xl">
          <q-icon name="fa-solid fa-chevron-right" size="1.5rem" style="margin-top: 2px"/>
        </div>
      </q-btn>


    </div>


    <div class="col-12 row justify-center">
      <q-btn no-caps unelevated class="shadow-2 component-full-btn-std">
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


const globalState = useGlobalStateStore();

const videoList = ref([])


onMounted(() => {
  getAllVideoCol(customPageNP(0, 10)).then(res => {
    console.log(res)
    if (!res || !res.data) {
      return
    }
    console.log(res.data)
    videoList.value.push(...res.data)
  })
})


</script>

<style scoped lang="scss">

</style>