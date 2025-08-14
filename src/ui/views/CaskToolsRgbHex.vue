<template>

  <div class="q-mx-xl">

    <h4>
      {{ $t('main_tools_title_rgb_hex') }}
    </h4>


    <div class="row">
      <div class="col-md-8 col-12 text-center">

        <h5 class="cask-color-positive">
          {{ $t('main_tools_hex_rgb_to_hex') }}
        </h5>

        <div>

          <div class="row justify-center items-center">
            <div v-show="rgbInputStyle === 'number'" class="cask-general-little-title">
              Red:
            </div>
            <q-input v-show="rgbInputStyle === 'number'" v-model="inputRed" tabindex="0" dense outlined mask="###"
                     class="q-ma-md component-outline-input-mini-est" style="margin: 12px"/>

            <div v-show="rgbInputStyle === 'number'" class="cask-general-little-title">
              Green:
            </div>
            <q-input v-show="rgbInputStyle === 'number'" v-model="inputGreen" tabindex="0" dense outlined mask="###"
                     class="q-ma-md component-outline-input-mini-est" style="margin: 12px"/>
            <div v-show="rgbInputStyle === 'number'" class="cask-general-little-title">
              Blue:
            </div>
            <q-input v-show="rgbInputStyle === 'number'" v-model="inputBlue" tabindex="0" dense outlined mask="###"
                     class="q-ma-md component-outline-input-mini-est" style="margin: 12px"/>
            <div v-show="rgbInputStyle === 'number'" class="cask-general-little-title">
              Alpha:
            </div>
            <q-input v-show="rgbInputStyle === 'number'" v-model="inputAlpha" tabindex="0" dense outlined mask="#.##"
                     class="q-ma-md component-outline-input-mini-est" style="margin: 12px"/>

            <div v-show="rgbInputStyle === 'rgb'" class="cask-general-little-title">
              RGB:
            </div>
            <q-input v-show="rgbInputStyle === 'rgb'" v-model="inputRgbCode" tabindex="0" dense outlined
                     class="q-ma-md component-outline-input-std" style="margin: 12px"/>

            <div v-show="rgbInputStyle === 'rgba'" class="cask-general-little-title">
              RGBA:
            </div>
            <q-input v-show="rgbInputStyle === 'rgba'" v-model="inputRgbaCode" tabindex="0" dense outlined
                     class="q-ma-md component-outline-input-std" style="margin: 12px"/>


            <q-btn no-caps unelevated class="shadow-2 component-full-btn-std q-ma-md"
                   @click="convertToHex">
              <div class="row items-center">
                <div class="q-mx-xs">
                  {{ $t('main_tools_convert') }}
                </div>
              </div>
            </q-btn>
          </div>

          <div class="row justify-center relative-position">
            <q-input v-model="hexOutput" tabindex="0" dense outlined readonly
                     class="q-ma-md component-outline-dash-input-std">
              <template v-slot:append>
                <q-icon name="fa-regular fa-copy" @click="copy(hexOutput)"
                        class="cursor-pointer cask-cursor-pointer" size="1rem"/>
              </template>
            </q-input>
          </div>

        </div>


        <div class="row justify-center">
          <div class="q-mt-lg q-mb-xl" style="width: 50%; height: 1.4rem; border-radius: 8px"
               :style="`background-color: ${hexOutput};`"
          />
        </div>


        <h5 class="cask-color-positive">
          {{ $t('main_tools_hex_rgb_to_rgb') }}
        </h5>

        <div>

          <div class="q-mt-md row items-center justify-center">
            <q-input v-model="hexInput" tabindex="0" dense outlined
                     class="q-ma-md component-outline-input-std"/>

            <q-btn no-caps unelevated class="shadow-2 component-full-btn-std q-ma-md"
                   @click="hexToRgba">
              <div class="row items-center">
                <div class="q-mx-xs">
                  {{ $t('main_tools_convert') }}
                </div>
              </div>
            </q-btn>
          </div>


          <div class="row justify-center items-center">
            <div class="cask-general-little-title">
              Red:
            </div>
            <q-input v-model="outputRed" tabindex="0" dense outlined readonly
                     class="q-ma-md component-outline-dash-input-mini-est" style="margin: 12px"/>

            <div class="cask-general-little-title">
              Green:
            </div>
            <q-input v-model="outputGreen" tabindex="0" dense outlined readonly
                     class="q-ma-md component-outline-dash-input-mini-est" style="margin: 12px"/>
            <div class="cask-general-little-title">
              Blue:
            </div>
            <q-input v-model="outputBlue" tabindex="0" dense outlined readonly
                     class="q-ma-md component-outline-dash-input-mini-est" style="margin: 12px"/>
            <div class="cask-general-little-title">
              Alpha:
            </div>
            <q-input v-model="outputAlpha" tabindex="0" dense outlined readonly
                     class="q-ma-md component-outline-dash-input-mini-est" style="margin: 12px"/>
            <div class="cask-general-little-title">
              Code:
            </div>
            <q-input v-model="outputRet" tabindex="0" dense outlined readonly
                     class="q-ma-md component-outline-dash-input-std">
              <template v-slot:append>
                <q-icon name="fa-regular fa-copy" @click="copy(outputRet)"
                        class="cursor-pointer cask-cursor-pointer" size="1rem"/>
              </template>
            </q-input>
          </div>
        </div>


        <div class="row justify-center q-mt-lg q-mb-xl">
          <div style="width: 50%; height: 1.4rem; border-radius: 8px"
               :style="`background-color: ${outputRet};`"
          />
        </div>

      </div>

      <div class="col-md-4 col-12 q-px-xl">

        <h5>
          {{ $t('main_tools_hex_rgb_to_hex_format') }}
        </h5>

        <div class="row justify-evenly">
          <q-radio v-model="rgbInputStyle" val="number" label="Number"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="rgbInputStyle" val="rgb" label="RGB"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="rgbInputStyle" val="rgba" label="RGBA"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
        </div>

      </div>

    </div>

  </div>

</template>

<script setup>
import {copy} from "@/utils/base-tools";
import {ref} from "vue";
import {notifyTopWarning} from "@/utils/notification-tools";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

let inputRgbCode = ref("rgb(180, 130, 40)")
let inputRgbaCode = ref("rgba(180, 130, 40, 1)")

let inputRed = ref('180')
let inputGreen = ref('130')
let inputBlue = ref('40')
let inputAlpha = ref("1.00")
let hexOutput = ref("#b48228")

let hexInput = ref("#2882b4")
let outputRed = ref(40)
let outputGreen = ref(130)
let outputBlue = ref(180)
let outputAlpha = ref("1.00")
let outputRet = ref("rgb(40, 130, 180)")

let rgbInputStyle = ref("number")


function convertToHex() {
  let redNum = 0, greenNum = 0, blueNum = 0, alphaNum = 1;
  if ('number' === rgbInputStyle.value) {
    redNum = parseInt(inputRed.value);
    greenNum = parseInt(inputGreen.value);
    blueNum = parseInt(inputBlue.value);
    alphaNum = parseFloat(inputAlpha.value);
  } else if ('rgb' === rgbInputStyle.value) {
    let rgbCheck = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/
    let input = inputRgbCode.value.toLowerCase().replaceAll(" ", "")
    if (!input || !input.match(rgbCheck)) {
      notifyTopWarning(t('main_tools_hex_rgb_to_hex_error'))
      return
    }
    let inputList = input.replace(/[a-z()]/g, '').split(',')
    redNum = parseInt(inputList[0])
    greenNum = parseInt(inputList[1])
    blueNum = parseInt(inputList[2])
  } else if ('rgba' === rgbInputStyle.value) {
    let rgbaCheck = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/
    let input = inputRgbaCode.value.toLowerCase().replaceAll(" ", "")
    if (!input || !input.match(rgbaCheck)) {
      notifyTopWarning(t('main_tools_hex_rgb_to_hex_error'))
      return
    }
    let inputList = input.replace(/[a-z()]/g, '').split(',')
    redNum = parseInt(inputList[0])
    greenNum = parseInt(inputList[1])
    blueNum = parseInt(inputList[2])
    alphaNum = parseFloat(inputList[3])
  } else {
    return
  }
  rgbaConvertToHex(redNum, greenNum, blueNum, alphaNum)
}

function rgbaConvertToHex(redNum, greenNum, blueNum, alphaNum) {
  //check
  if (redNum > 255 || greenNum > 255 || blueNum > 255 || alphaNum > 1) {
    notifyTopWarning(t('main_tools_hex_rgb_to_rgb_error'))
    return
  }
  //convert
  const redHex = redNum.toString(16).padStart(2, '0');
  const greenHex = greenNum.toString(16).padStart(2, '0');
  const blueHex = blueNum.toString(16).padStart(2, '0');
  const alphaHex = Math.round(alphaNum * 255).toString(16).padStart(2, '0');
  if ('ff' === alphaHex) {
    hexOutput.value = `#${redHex}${greenHex}${blueHex}`
  } else {
    hexOutput.value = `#${redHex}${greenHex}${blueHex}${alphaHex}`
  }
}

function hexToRgba() {
  let hexCode = hexInput.value
  if (hexCode.startsWith('#')) {
    hexCode = hexCode.slice(1);
  }
  let hexCheck = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/
  if (!hexCode || !hexCode.match(hexCheck)) {
    notifyTopWarning(t('main_tools_hex_rgb_to_rgb_error'))
    return
  }
  // Parse
  let redNum, greenNum, blueNum, alphaNum = 1;
  if (hexCode.length === 3) {
    redNum = parseInt(hexCode[0] + hexCode[0], 16);
    greenNum = parseInt(hexCode[1] + hexCode[1], 16);
    blueNum = parseInt(hexCode[2] + hexCode[2], 16);
  } else if (hexCode.length === 6) {
    redNum = parseInt(hexCode.slice(0, 2), 16);
    greenNum = parseInt(hexCode.slice(2, 4), 16);
    blueNum = parseInt(hexCode.slice(4, 6), 16);
  } else if (hexCode.length === 8) {
    redNum = parseInt(hexCode.slice(0, 2), 16);
    greenNum = parseInt(hexCode.slice(2, 4), 16);
    blueNum = parseInt(hexCode.slice(4, 6), 16);
    alphaNum = (parseInt(hexCode.slice(6, 8), 16) / 255).toFixed(2);
  } else {
    notifyTopWarning(t('main_tools_hex_rgb_to_rgb_error'))
  }
  //ret
  outputRed.value = parseInt(`${redNum}`)
  outputGreen.value = parseInt(`${greenNum}`)
  outputBlue.value = parseInt(`${blueNum}`)
  outputAlpha.value = `${alphaNum}`
  if (1 === alphaNum) {
    outputRet.value = `rgb(${redNum}, ${greenNum}, ${blueNum})`;
  } else {
    outputRet.value = `rgba(${redNum}, ${greenNum}, ${blueNum}, ${alphaNum})`;
  }

}

</script>

<style scoped lang="scss">

</style>