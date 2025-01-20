<template>

  <div class="q-mx-xl">

    <h4>
      {{ $t('main_tools_title_md5') }}
    </h4>


    <div class="row">

      <div class="col-lg-7 col-12 text-center">

        <h5 class="cask-color-positive">
          {{ $t('main_tools_md5_input') }}
        </h5>

        <div class="row q-mt-md items-center">
          <div class="cask-general-little-title">
            {{ $t('main_tools_md5_input_value_title') }}
          </div>

          <div class="col">
            <q-input v-model="waitStr" tabindex="0" dense outlined
                     class="q-ma-md component-outline-input-grow" style="margin: 12px"/>
          </div>
        </div>


        <q-btn no-caps unelevated class="q-mt-lg shadow-2 component-full-btn-std"
               @click="waitStrEncrypt">
          <div class="row items-center">
            <div class="q-mx-xs">
              {{ $t('main_tools_generate') }}
            </div>
          </div>
        </q-btn>

      </div>

      <div class="col-lg-5 col-12 relative-position q-mt-xl">

        <div v-if="!globalState.screenMini" class="row justify-center relative-position q-mt-lg">
          <q-img v-show="showPic" class="col-7" :no-native-menu="false" :ratio="1" fit="cover"
                 src="/img/article-bg.jpg"
                 style="border-radius: 32px; position: absolute; translate: -3%; scale: .95">
            <template v-slot:loading/>
          </q-img>

          <q-img class="col-7" :no-native-menu="false" :ratio="1" fit="cover"
                 :src="globalState.curThemeName === 'dark' ? '/img/article-bg-dark.svg' : '/img/article-bg-light.svg'"
                 style="position: absolute; translate: -3%; scale: 0.96">
            <template v-slot:loading/>
          </q-img>
        </div>

      </div>

      <div v-show="showRet" class="col-lg-7 col-12 text-center q-mt-lg">

        <h5 class="cask-color-positive">
          {{ $t('main_tools_md5_output_md') }}
        </h5>

        <div class="row q-mt-xs items-center" v-for="(result, index) in md5ResultList" :key="index">
          <div class="cask-general-little-title">
            {{ $t(result.key) }}
          </div>

          <div class="col">
            <q-input v-model="result.value" tabindex="0" dense outlined readonly
                     class="q-ma-md component-outline-input-grow" style="margin: 12px">
              <template v-slot:append>
                <q-icon name="fa-regular fa-copy" @click="copy(result.value)"
                        class="cursor-pointer cask-cursor-pointer" size="1rem"/>
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <div v-show="showRet" class="col-lg-7 col-12 text-center q-mt-lg">

        <h5 class="cask-color-positive">
          {{ $t('main_tools_md5_output_sha') }}
        </h5>

        <div class="row q-mt-xs items-center" v-for="(result, index) in sha1ResultList" :key="index">
          <div class="cask-general-little-title">
            {{ $t(result.key) }}
          </div>

          <div class="col">
            <q-input v-model="result.value" tabindex="0" dense outlined readonly
                     class="q-ma-md component-outline-input-grow" style="margin: 12px">
              <template v-slot:append>
                <q-icon name="fa-regular fa-copy" @click="copy(result.value)"
                        class="cursor-pointer cask-cursor-pointer" size="1rem"/>
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <div v-show="showRet" class="col-lg-7 col-12 text-center q-mt-lg">

        <h5 class="cask-color-positive">
          {{ $t('main_tools_md5_output_keccak') }}
        </h5>

        <div class="row q-mt-xs items-center" v-for="(result, index) in keccak256ResultList" :key="index">
          <div class="cask-general-little-title">
            {{ $t(result.key) }}
          </div>

          <div class="col">
            <q-input v-model="result.value" tabindex="0" dense outlined readonly
                     class="q-ma-md component-outline-input-grow" style="margin: 12px">
              <template v-slot:append>
                <q-icon name="fa-regular fa-copy" @click="copy(result.value)"
                        class="cursor-pointer cask-cursor-pointer" size="1rem"/>
              </template>
            </q-input>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {copy, delay} from "@/utils/base-tools";
import {notifyTopWarning} from "@/utils/notification-tools";
import CryptoJS from "crypto-js";
import {useI18n} from "vue-i18n";

const globalState = useGlobalStateStore();
const {t} = useI18n()

const waitStr = ref("")
const showPic = ref(false)
const showRet = ref(false)

//ret
const md5ResultList = ref([
  {
    key: "main_tools_md5_output_low_16",
    value: "",
  },
  {
    key: "main_tools_md5_output_up_16",
    value: "",
  },
  {
    key: "main_tools_md5_output_low_32",
    value: "",
  },
  {
    key: "main_tools_md5_output_up_32",
    value: "",
  },
])

const sha1ResultList = ref([
  {
    key: "main_tools_md5_output_low",
    value: "",
  },
  {
    key: "main_tools_md5_output_up",
    value: "",
  },
])

const keccak256ResultList = ref([
  {
    key: "main_tools_md5_output_low",
    value: "",
  },
  {
    key: "main_tools_md5_output_up",
    value: "",
  },
])


function waitStrEncrypt() {
  if (!waitStr.value) {
    notifyTopWarning(t('main_tools_md5_input_empty_error'))
    showRet.value = false
    return
  }
  let md5Ret = CryptoJS.MD5(waitStr.value).toString()
  md5ResultList.value[0].value = md5Ret.substring(8, 24).toLowerCase()
  md5ResultList.value[1].value = md5Ret.substring(8, 24).toUpperCase()
  md5ResultList.value[2].value = md5Ret.toLowerCase()
  md5ResultList.value[3].value = md5Ret.toUpperCase()

  let sha1Ret = CryptoJS.SHA1(waitStr.value).toString()
  sha1ResultList.value[0].value = sha1Ret.toLowerCase()
  sha1ResultList.value[1].value = sha1Ret.toUpperCase()

  let keccak256Ret = CryptoJS.SHA3(waitStr.value, {outputLength: 256}).toString()
  keccak256ResultList.value[0].value = keccak256Ret.toLowerCase()
  keccak256ResultList.value[1].value = keccak256Ret.toUpperCase()

  showRet.value = true
}


onMounted(() => {
  delay(300).then(() => {
    showPic.value = true
  })
})



</script>

<style scoped lang="scss">

</style>