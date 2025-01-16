<template>

  <div class="q-mx-xl">

    <h4>
      {{ $t('main_tools_title_timestamp') }}
    </h4>

    <div class="row">
      <div class="col-lg-8 col-12 text-center">

        <h5 class="cask-color-positive">
          {{ $t('main_tools_timestamp_to_timestamp') }}
        </h5>

        <div class="row q-my-xl items-center">

          <div class="col-4 row justify-center">
            <cask-date-time-picker v-model="inputDate"/>
          </div>


          <div class="col-4 row justify-center">
            <q-btn no-caps unelevated class="shadow-2 component-full-btn-std"
                   @click="date2Timestamp">
              <div class="row items-center">
                <div class="q-mx-xs">
                  {{ $t('main_tools_generate') }}
                </div>
              </div>
            </q-btn>
          </div>

          <div class="col-4 row justify-center relative-position">
            <q-input v-model="outputTimestamp" tabindex="0" dense outlined readonly
                     class="q-ma-md component-outline-dash-input-std">
              <template v-slot:append>
                <q-icon name="fa-regular fa-copy" @click="copy(outputTimestamp)"
                        class="cursor-pointer cask-cursor-pointer" size="1rem"/>
              </template>
            </q-input>
          </div>

        </div>


        <h5 class="cask-color-positive">
          {{ $t('main_tools_timestamp_to_date') }}
        </h5>

        <div class="row justify-evenly q-my-xl items-center">

          <div class="col-4 row justify-center">
            <q-input v-model="inputTimestamp" tabindex="0" dense outlined
                     class="q-ma-md component-outline-input-std"/>
          </div>


          <div class="col-4 row justify-center">
            <q-btn no-caps unelevated class="shadow-2 component-full-btn-std"
                   @click="timestamp2Date">
              <div class="row items-center">
                <div class="q-mx-xs">
                  {{ $t('main_tools_generate') }}
                </div>
              </div>
            </q-btn>
          </div>

          <div class="col-4 row justify-center">
            <q-input v-model="outputDate" tabindex="0" dense outlined readonly
                     class="q-ma-md component-outline-dash-input-std">
              <template v-slot:append>
                <q-icon name="fa-regular fa-copy" @click="copy(outputDate)"
                        class="cursor-pointer cask-cursor-pointer" size="1rem"/>
              </template>
            </q-input>
          </div>

        </div>

      </div>

      <div class="col-lg-4 col-12 q-px-xl">

        <h5>
          {{ $t('main_tools_timestamp_ms') }}
        </h5>

        <div class="row justify-evenly">
          <q-radio v-model="isMs" :val="1" :label="$t('main_setting_yes')"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="isMs" :val="0" :label="$t('main_setting_no')"
                   class="component-ratio-base"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
        </div>

      </div>

    </div>

  </div>

</template>

<script setup>

import {ref} from "vue";
import CaskDateTimePicker from "@/ui/components/CaskDateTimePicker.vue";
import {date} from "quasar";
import {copy} from "@/utils/base-tools";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const isMs = ref(1)
const initComponentTime = new Date()

const inputDate = ref(date.formatDate(initComponentTime, 'YYYY/MM/DD HH:mm'))
const outputTimestamp = ref(Number(date.formatDate(initComponentTime, 'x')));

const inputTimestamp = ref(outputTimestamp.value);
const outputDate = ref(date.formatDate(initComponentTime, 'YYYY/MM/DD HH:mm:ss'));

function date2Timestamp() {
  //这里的thisDate不一定对，需要自动矫正
  if (!inputDate.value || inputDate.value.length < 16) {
    notifyTopWarning(t('main_tools_timestamp_error'))
    return
  }
  const thisDate = date.extractDate(inputDate.value, 'YYYY/MM/DD HH:mm')
  if (isMs.value) {
    outputTimestamp.value = Number(date.formatDate(thisDate, 'x'))
  } else {
    outputTimestamp.value = Number(date.formatDate(thisDate, 'X'))
  }
  notifyTopPositive(t('main_tools_timestamp_success'))
}

function timestamp2Date() {
  let timeStamp
  if (isMs.value) {
    timeStamp = new Date(inputTimestamp.value * 1)
  } else {
    timeStamp = new Date(inputTimestamp.value * 1000)
  }
  outputDate.value = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
  if (!outputDate.value) {
    notifyTopWarning(t('main_tools_timestamp_error'))
  }
}


</script>

<style scoped lang="scss">

</style>