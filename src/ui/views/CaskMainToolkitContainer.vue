<template>
  <div class="row q-mx-xl q-mb-xl justify-center" :class="globalState.screenMini ? '' : 'q-mt-lg'">

    <div class="col-12 row justify-center items-center">


      <div class="col-11 col-lg-4 q-mb-lg q-mx-md row justify-center">

        <h2 class="col-12" :class="globalState.screenMini ? 'text-center' : ''">
          {{ $t('main-nav-toolkit') }}
        </h2>

        <div class="col-12" style="margin-bottom: 2rem; opacity: .5;max-width: 52rem"
             :class="globalState.screenMini ? 'text-center' : ''">
          {{ $t('subtitle-3') }}
        </div>

        <div class="column justify-center" style="min-height: 22rem" :class="globalState.screenMini ? '' : 'col-12'">
          <q-tabs class="component-vertical-tabs-with-container" style="height: 20rem" indicator-color="transparent"
                  v-model="toolkitView" no-caps switch-indicator vertical>
            <q-tab v-for="(view, index) in toolkitViewList" :key="index" :name="view.name"
                   style="justify-content: left" :ripple="false"
                   :style="view.name ===toolkitView ?
                   'border-left: 3px solid rgb(var(--text-color)' : 'border-left: 3px solid transparent'">

              <div class="text-left q-ml-sm">
                <h5>
                  {{ $t(view.name) }}
                </h5>
                <transition name="tabs-expand">
                  <div class="tabs-expandable-content" v-show="view.name === toolkitView">
                    <div
                        style="opacity: .5;" class="component-max-line-text-2">
                      {{ $t(view.name + "_desc") }}
                    </div>
                    <div class="row justify-end q-mt-sm q-mr-sm">
                      <q-btn no-caps unelevated class="component-none-btn-grow" :to="view.address">
                        <div class="row items-center">
                          <div class="q-mr-sm">
                            {{ $t('route-tool') }}
                          </div>
                          <q-icon name="fa-solid fa-align-right" size="15px"/>
                        </div>
                      </q-btn>
                    </div>
                  </div>

                </transition>
              </div>
            </q-tab>
          </q-tabs>
        </div>


      </div>

      <div v-if="!globalState.screenMini" class="col-lg-3 q-mb-lg">
        <div class="q-mx-lg q-pa-sm justify-between" style="border-radius: 8px">
          <q-img :no-native-menu="false" :ratio="16/9" fit="cover" class="shadow-2"
                 :src="`/img/main-toolkit.jpg`" style="height: 30rem;border-radius: 8px;">
          </q-img>
        </div>
      </div>


    </div>


    <div class="col-12 row justify-center">
      <q-btn no-caps unelevated class="shadow-2 component-full-btn-std" to="/tools/list">
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
import {useGlobalStateStore} from "@/utils/global-state";
import {ref} from "vue";
import {useI18n} from "vue-i18n";

const globalState = useGlobalStateStore();
const {t} = useI18n()

const toolkitView = ref("main_tools_qrcode_gen")
const toolkitViewList = ref(
    [
      {name: "main_tools_qrcode_gen", address: "/tools/qrcode"},
      {name: "main_tools_md5_gen", address: "/tools/md5"},
      {name: "main_tools_rgb_con", address: "/tools/rgbHex"},
      {name: "main_tools_base64_con", address: "/tools/imgBase64"},
    ]
)

</script>

<style scoped lang="scss">


</style>