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
                   style="justify-content: left"
                   :style="view.name ===toolkitView ? 'border-left: 3px solid rgb(var(--text-color)' : ''">

              <div style="max-width: 30rem" class="text-left q-ml-sm">
                <h5>
                  {{ view.title }}
                </h5>
                <transition name="tabs-expand">
                  <div class="tabs-expandable-content" v-show="view.name === toolkitView" style="opacity: .5;">
                    {{ view.subTitle }}
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
import {useGlobalStateStore} from "@/utils/global-state";
import {ref} from "vue";
import {useI18n} from "vue-i18n";

const globalState = useGlobalStateStore();
const {t} = useI18n()

const toolkitView = ref("id-card-gen4")
const toolkitViewList = ref(
    [
      {name: "id-card-gen4", title: "This is Tool 1", subTitle: t('subtitle-4'),},
      {name: "id-card-gen5", title: "This is Tool 2", subTitle: t('subtitle-5'),},
      {name: "id-card-gen6", title: "This is Tool 3", subTitle: t('subtitle-6'),},
      {name: "id-card-gen7", title: "This is Tool 4", subTitle: t('subtitle-7'),},
    ]
)

</script>

<style scoped lang="scss">


</style>