<template>
  <q-header class="top-semi-trans-header-base">

    <div class="top-semi-trans-header-base-content row justify-between items-center"
         :class="headerInTop ? 'top-semi-trans-header-base-top' : 'top-semi-trans-header-base-no-top'">

      <div class="row items-center justify-center">
        <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_pre_version') }}
            </div>
          </div>
        </q-btn>
      </div>

      <div class="row items-center justify-center">
        <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_articles') }}
            </div>
          </div>
        </q-btn>
        <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_tools') }}
            </div>
          </div>
        </q-btn>
        <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_videos') }}
            </div>
          </div>
        </q-btn>
        <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_board') }}
            </div>
          </div>
        </q-btn>
      </div>

      <div class="row items-center justify-center">
        <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_login') }}
            </div>
          </div>
        </q-btn>
        <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_create_account') }}
            </div>
          </div>
        </q-btn>
        <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs" @click="switchLanguage()">
          <div class="row items-center q-ma-xs">
            <q-icon name="fa-solid fa-language" size="1.5rem" style="margin-top: 2px"/>
          </div>
        </q-btn>
        <q-btn no-caps unelevated class="q-mx-xs" dense round
               v-morph:btn:withSetting:800.resize="morphWithSetting"
               @click="showHeaderSetting(true)">
          <div class="row items-center">
            <q-icon name="fa-solid fa-gear" size="1.1rem" style="margin-top: 2px"/>
          </div>
        </q-btn>
      </div>
    </div>


    <div
        class="top-semi-trans-header-setting absolute-right"
        v-morph:page:withSetting:800.resize="morphWithSetting">

      <div v-show="morphWithSettingContentShow">
        <div class="row justify-end">
          <q-btn no-caps unelevated dense size="10px" class="q-mt-sm q-mr-sm q-pa-xs" round
                 icon="fa-solid fa-down-left-and-up-right-to-center"
                 @click="showHeaderSetting(false)"/>
        </div>

        <div class="row justify-center" style="margin-top: -15px !important">
          <h5>
            基础设置
          </h5>
        </div>

        <div class="q-mx-md">

          <div class="q-mt-sm">
            <h6>
              全屏页仍展示拖动条：
            </h6>
          </div>
          <div class="q-mb-sm row justify-evenly">
            <q-radio v-model="globalState.hideScroller" :val="false" label="Yes" class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => hideScrollbar(it)"/>
            <q-radio v-model="globalState.hideScroller" :val="true" label="No" class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => hideScrollbar(it)"/>
          </div>

          <div class="q-mt-sm">
            <h6>
              主题选择：
            </h6>
          </div>
          <div class="q-mb-sm row justify-evenly">
            <q-radio v-model="globalState.curThemeName" val="light" label="Light" class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateTheme(it)"/>
            <q-radio v-model="globalState.curThemeName" val="dark" label="Dark" class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateTheme(it)"/>
            <q-radio v-model="globalState.curThemeName" val="green" label="Green" class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateTheme(it)"/>
          </div>

          <div class="q-mt-sm">
            <h6>
              是否保存登录状态：
            </h6>
          </div>
          <div class="q-mb-sm row justify-evenly">
            <q-radio v-model="globalState.saveLoginData" :val="true" label="Yes" class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateSaveLoginData(it)"/>
            <q-radio v-model="globalState.saveLoginData" :val="false" label="No" class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateSaveLoginData(it)"/>
          </div>

          <div class="q-mt-sm">
            <h6>
              页面语言：
            </h6>
          </div>
          <div class="q-mb-sm row justify-evenly">
            <q-radio v-model="globalState.language" val="zh" label="中文" class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateLanguage(it)"/>
            <q-radio v-model="globalState.language" val="en" label="English" class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateLanguage(it)"/>
          </div>

        </div>

      </div>
    </div>
  </q-header>


</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {hideScrollbar, switchLanguage, updateLanguage, updateSaveLoginData, updateTheme} from "@/utils/global-tools";
import {delay} from "@/utils/base-tools";
import {useGlobalStateStore} from "@/utils/global-state";

const globalState = useGlobalStateStore();

const headerInTop = ref(true);
const morphWithSetting = ref('btn')
const morphWithSettingContentShow = ref(false)

const onScroll = () => {
  headerInTop.value = window.scrollY === 0;
};

const showHeaderSetting = (isShow) => {
  if (isShow) {
    morphWithSetting.value = 'page'
    delay(500).then(() => {
      morphWithSettingContentShow.value = true
    })
  } else {
    morphWithSetting.value = 'btn'
    morphWithSettingContentShow.value = false
  }
}


onMounted(() => {
  window.addEventListener('scroll', onScroll);
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
})


</script>

<style scoped lang="scss">

.top-semi-trans-header-base {
  background-color: transparent;
  left: 0;
  right: 0;
  margin: 1rem 4rem;
  min-height: 5rem;
  position: fixed;


  .top-semi-trans-header-base-content {
    min-height: 3rem;
    padding: 0 1rem;
    border-radius: 8px;
    transition: background-color 1s ease, box-shadow 1s ease;
  }
}

.top-semi-trans-header-base-top {
  color: var(--full-container-text-color);
  background-color: transparent;
}

.top-semi-trans-header-base-no-top {
  color: var(--text-color);
  background-color: var(--container-background-color);
  box-shadow: inset 0 0 1px 1px var(--background-color);
  backdrop-filter: saturate(200%) blur(30px);
}

.top-semi-trans-header-setting {
  top: 5rem;
  height: 410px;
  width: 300px;

  color: var(--text-color);
  border-radius: 8px;
  background-color: var(--container-background-color);
  box-shadow: inset 0 0 1px 1px var(--background-color);
  backdrop-filter: blur(30px);
  padding: 2px;

  font-size: .9rem;
}


</style>

<style lang="scss">
.top-semi-trans-header-base {
  .q-btn {
    font-size: 1rem;
  }
}

</style>