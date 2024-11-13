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
               v-morph:btn:withSetting:1000.resize="morphWithSetting"
               @click="showHeaderSetting(true)">
          <div class="row items-center">
            <q-icon name="fa-solid fa-gear" size="1.1rem" style="margin-top: 2px"/>
          </div>
        </q-btn>

      </div>
    </div>


    <div
        class="top-semi-trans-header-setting absolute-right"
        v-morph:page:withSetting:1000.resize="morphWithSetting"
        @click="showHeaderSetting(false)">


    </div>


  </q-header>


</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {switchLanguage} from "@/utils/base-tools";

const headerInTop = ref(true);
const morphWithSetting = ref('btn')

const onScroll = () => {
  headerInTop.value = window.scrollY === 0;
};

const showHeaderSetting = (isShow) => {
  if (isShow) {
    morphWithSetting.value = 'page'
  } else {
    morphWithSetting.value = 'btn'
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
  height: 500px;
  width: 300px;

  color: var(--text-color);
  border-radius: 8px;
  background-color: var(--container-background-color);
  box-shadow: inset 0 0 1px 1px var(--background-color);
  backdrop-filter: saturate(200%) blur(30px);

}


</style>

<style lang="scss">
.top-semi-trans-header-base {
  .q-btn {
    font-size: 1rem;
  }
}

</style>