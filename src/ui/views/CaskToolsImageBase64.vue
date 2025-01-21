<template>

  <div class="q-mx-xl">

    <h4>
      {{ $t('main_tools_title_base64') }}
    </h4>


    <div class="row">

      <div class="col-lg-6 col-12 text-center q-mb-xl">

        <h5 class="cask-color-positive">
          {{ $t('main_tools_base64_img_to_img') }}
        </h5>

        <div class="row q-mt-md items-center">
          <div class="col" id="inputBase64Div">
            <q-input v-model="base64Str" tabindex="0" dense borderless type="textarea" hide-bottom-space
                     class="q-ma-md component-outline-input-textarea-grow"
                     :placeholder="$t('main_tools_base64_to_img_placeholder')"/>
          </div>
        </div>

        <q-btn no-caps unelevated class="q-mt-md q-mx-md shadow-2 component-full-btn-std"
               @click="convertToImg">
          <div class="row items-center">
            <div class="q-mx-xs">
              {{ $t('main_tools_convert') }}
            </div>
          </div>
        </q-btn>

        <q-btn v-show="base64StrConverted" no-caps unelevated class="q-mt-md q-mx-md shadow-2 component-full-btn-std"
               @click="download(base64StrOutput, 'output', base64StrType)">
          <div class="row items-center">
            <div class="q-mx-xs">
              {{ $t('main_tools_download') }}
            </div>
          </div>
        </q-btn>

        <div v-show="base64StrConverted" class="row justify-center q-mt-xl">
          <q-img height="20rem" fit="contain"
                 :src="base64StrOutput"/>
        </div>
      </div>

      <div class="col-lg-6 col-12 text-center">
        <h5 class="cask-color-positive">
          {{ $t('main_tools_base64_img_to_base64') }}
        </h5>


        <div class="row q-mt-md items-center justify-center">
          <cask-upload-input v-model="parseImg" :tips="qrCodeUploadTips" :is-mini="true"
                             accept=".jpg,.jpeg,.png,.webp" :max-file-size="5120000"/>
        </div>


        <div v-show="parseImgConverted" class="row q-mt-md items-center">
          <div class="col">
            <q-input v-model="parseImgStr" tabindex="0" dense borderless type="textarea" hide-bottom-space readonly
                     class="q-ma-md component-outline-input-textarea-grow-dash"/>
          </div>
        </div>

        <div class="row justify-evenly">
          <q-btn v-show="parseImgConverted" no-caps unelevated class="q-mt-md q-mx-md shadow-2 component-full-btn-grow"
                 @click="copy(parseImgStr)">
            <div class="row items-center">
              <div class="q-mx-xs">
                {{ $t('main_tools_base64_copy_data_url') }}
              </div>
            </div>
          </q-btn>

          <q-btn v-show="parseImgConverted" no-caps unelevated class="q-mt-md q-mx-md shadow-2 component-full-btn-grow"
                 @click="copyPureBase64">
            <div class="row items-center">
              <div class="q-mx-xs">
                {{ $t('main_tools_base64_copy_base64') }}
              </div>
            </div>
          </q-btn>
        </div>

      </div>


    </div>

  </div>

</template>

<script setup>
import {ref, watch} from "vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {useI18n} from "vue-i18n";
import {notifyTopWarning} from "@/utils/notification-tools";
import CaskUploadInput from "@/ui/components/CaskUploadInput.vue";
import {copy, download} from "@/utils/base-tools";

const globalState = useGlobalStateStore();
const {t} = useI18n()
const qrCodeUploadTips = ["main_tools_base64_upload_tip1", "main_tools_base64_upload_tip2",]

// Base 64 to Img
const base64Str = ref("")
const base64StrConverted = ref(false)
const base64StrOutput = ref("")
const base64StrType = ref("")
// Img to base64
const parseImg = ref(null)
const parseImgStr = ref("")
const parseImgConverted = ref(false)

// Init fileRead
let reader = new FileReader();
reader.onload = function () {
  parseImgStr.value = this.result
  parseImgConverted.value = true
};

//监控文件上传
watch(parseImg, () => {
  if (parseImg.value) {
    reader.readAsDataURL(parseImg.value);
  } else {
    parseImgStr.value = ""
    parseImgConverted.value = false
  }
})

//check base64
async function isBase64UrlImage(base64String) {
  if (!base64String) {
    base64StrConverted.value = false
    base64StrOutput.value = ""
    return
  }
  try {
    //check prefix
    const replacePat = /^data:image\/((jpg)|(jpeg)|(png)|(gif)|(webp));base64,/
    base64String = base64String.replace(replacePat, '')
    //check base
    window.atob(base64String);
    //check img
    let knownTypes = {
      '/': 'data:image/jpg;base64,',
      'i': 'data:image/png;base64,',
      'R': 'data:image/gif;base64,',
      'U': 'data:image/webp;base64,',
    }
    let knownTypesSimple = {
      '/': 'jpg',
      'i': 'png',
      'R': 'gif',
      'U': 'webp',
    }
    if (!knownTypes[base64String[0]]) {
      notifyTopWarning(t('main_tools_base64_to_img_error_type'))
    } else {
      let image = new Image()
      image.src = knownTypes[base64String[0]] + base64String

      return await (new Promise((resolve) => {
        image.onload = function () {
          if (image.height === 0 || image.width === 0) {
            notifyTopWarning(t('main_tools_base64_to_img_error_code'))
            resolve(false)
            return;
          }
          resolve(true)
          base64StrType.value = knownTypesSimple[base64String[0]]
          base64StrOutput.value = image.src
          base64StrConverted.value = true
        }
        image.onerror = () => {
          resolve(false)
          notifyTopWarning(t('main_tools_base64_to_img_error_code'))
        }
      }))
    }
  } catch (e) {
    notifyTopWarning(t('main_tools_base64_to_img_error_code_type'))
  }
}

const copyPureBase64 = () => {
  const replacePat = /^data:image\/((jpg)|(jpeg)|(png)|(gif)|(webp));base64,/
  if (parseImgStr.value) {
    const pureBase64 = parseImgStr.value.replace(replacePat, '')
    copy(pureBase64)
  }
}

const convertToImg = () => {
  //fix site
  const inputBase64Div = document.getElementById('inputBase64Div');
  let inputBaseTextArea = inputBase64Div.getElementsByClassName('q-placeholder')[0]
  inputBaseTextArea.scrollTop = inputBaseTextArea.scrollHeight;
  inputBaseTextArea.scrollLeft = 0
  //convert
  isBase64UrlImage(base64Str.value)
}

</script>

<style scoped lang="scss">

</style>