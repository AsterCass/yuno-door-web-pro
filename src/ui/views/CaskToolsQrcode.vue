<template>


  <div class="q-mx-xl">

    <h4>
      {{ $t('main_tools_title_qrcode') }}
    </h4>


    <div class="row">
      <div class="col-lg-8 col-12 text-center" style="padding: 0 8rem">

        <h5 class="cask-color-positive">
          {{$t('main_tools_qr_generate')}}
        </h5>
        <div style="opacity: .5">
          暂不支持中文值加密
        </div>

        <div class="q-mt-md row items-center">
          <div class="cask-general-little-title">
            {{$t('main_tools_qr_value')}}
          </div>

          <q-input v-model="qrValue" tabindex="0" dense outlined
                   class="q-ma-md component-outline-input-longest" style="margin: 12px"/>
        </div>

        <div class="row items-center">
          <div class="cask-general-little-title">
            {{$t('main_tools_qr_style')}}
          </div>
          <q-radio v-model="qrType" val="square" :label="$t('main_tools_qr_style_1')"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="qrType" val="extra-rounded" :label="$t('main_tools_qr_style_2')"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="qrType" val="dots" :label="$t('main_tools_qr_style_3')"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
        </div>

        <div class="row items-center">
          <div class="cask-general-little-title">
            {{$t('main_tools_qr_color')}}
          </div>
          <q-input v-model="qrColor" tabindex="0" dense outlined
                   class="q-ma-md component-outline-input-std" style="margin: 12px"/>
        </div>

        <div class="row items-center">
          <div class="cask-general-little-title">
            {{$t('main_tools_qr_bg_color')}}
          </div>
          <q-input v-model="qrBgColor" tabindex="0" dense outlined
                   class="q-ma-md component-outline-input-std" style="margin: 12px"/>
        </div>

        <div class="row items-center">
          <div class="cask-general-little-title">
            {{$t('main_tools_qr_image')}}
          </div>
          <q-input v-model="uploadImg" tabindex="0" dense outlined disable
                   class="q-ma-md component-outline-dash-input-longest" style="margin: 12px"/>
        </div>


      </div>

      <div class="col-lg-4 col-12 q-px-xl row justify-center relative-position">
        <QRCodeVue3
            :width="280"
            :height="280"
            :value="qrValue"
            :key="qrValue + qrType + qrColor + qrBgColor"
            :dotsOptions="{
                type: qrType,
                color: qrColor,
              }"
            :backgroundOptions="{
                color: qrBgColor
              }"
            :cornersSquareOptions="{
                color: qrColor,
                type: qrType,
              }"
            :cornersDotOptions="{
                color: qrColor,
              }"
            myclass="qrcode-generator-download-div"
            download
            downloadButton="shadow-1 qrcode-generator-download-btn"
            :downloadOptions="{
                name: qrValue + '.astercasc.qrcode',
              }"

        />
      </div>

    </div>

    <div class="row q-mt-xl">
      <div class="col-lg-8 col-12 text-center" style="padding: 0 8rem">

        <h5 class="cask-color-positive">
          {{$t('main_tools_qr_parse')}}
        </h5>

        <div class="q-mt-md row items-center">
          <div class="cask-general-little-title">
            {{$t('main_tools_qr_upload')}}
          </div>
          <cask-upload-input v-model="parseImg" :tips="qrCodeUploadTips" :is-mini="true"
                             accept=".jpg,.jpeg,.png,.webp" :max-file-size="2048000"/>
        </div>


        <div class="row items-center">
          <div class="cask-general-little-title">
            {{$t('main_tools_qr_parse_value')}}
          </div>

          <q-input v-model="parseImgText" tabindex="0" dense outlined readonly
                   class="q-ma-md component-outline-dash-input-longest" style="margin: 12px">
            <template v-slot:append>
              <q-icon name="fa-regular fa-copy" @click="copy(parseImgText)"
                      class="cursor-pointer cask-cursor-pointer" size="1rem"/>
            </template>
          </q-input>
        </div>

      </div>
    </div>

  </div>

</template>

<script setup>
import QRCodeVue3 from "qrcode-vue3";
import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {copy} from "@/utils/base-tools";
import CaskUploadInput from "@/ui/components/CaskUploadInput.vue";
import jsQR from "jsqr";

const {t} = useI18n()

//qrcode config
let qrType = ref("square")
let qrValue = ref("https://astercasc.com")
let qrColor = ref("#303030")
let qrBgColor = ref("Transparent")
let uploadImg = ref(t('in_develop'))

//qr parse

const qrCodeUploadTips = ["main_tools_qr_upload_tips1", "main_tools_qr_upload_tips2",]
let parseImg = ref(null)
let parseImgBase64 = ref("");
let parseImgText = ref("")


//init fileRead
let reader = new FileReader();
reader.onload = function () {
  parseImgBase64.value = this.result
  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height)
    if (code) {
      parseImgText.value = code.data
    } else {
      parseImgText.value = "二维码解析失败，请确认图片含有二维码"
    }
  };
  img.src = parseImgBase64.value
};
watch(parseImg, () => {
  if(parseImg.value) {
    reader.readAsDataURL(parseImg.value);
  } else {
    parseImgText.value = ""
  }
})


</script>

<style lang="scss">

.qrcode-generator-download-div {
  margin: 5rem 0 2rem 0;
}


.qrcode-generator-download-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-color: transparent;
  cursor: pointer;
  color: rgb(var(--full-container-text-color));
  background: rgb(var(--full-container-background-color));
  min-height: 2.4rem;
  height: 2.4rem;
  width: 6rem;
  border-radius: 4px
}

</style>