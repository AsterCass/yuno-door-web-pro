<template>
  <div class="component-cask-time q-mx-sm">
    <div class="component-cask-time-header flex flex-center no-wrap">
      <div class="component-cask-time-header-label row items-center no-wrap">
        <div>
          {{ hourInputStr }}
        </div>
        <div class="q-mx-xs">
          :
        </div>
        <div>
          {{ minuteInputStr }}
        </div>
      </div>
    </div>
    <div class="component-cask-time-main col column" tabindex="-1">
      <div class="col relative-position">
        <div class="component-cask-time-view">

          <div class="row justify-between">
            <h5>
              {{ $t('cask_time_hour') }}
            </h5>
            <h5 class="component-cask-time-selected text-center">
              {{ hourInputStr }}
            </h5>
          </div>

          <q-slider v-model="hourInput" :min="0" :max="23" @update:modelValue="syncHourStr" marker-labels>
            <template v-slot:marker-label-group="{ markerList }">
              <div
                  v-for="val in [0, 12, 23]"
                  :key="val"
                  class="cursor-pointer"
                  :class="markerList[val].classes"
                  :style="markerList[val].style"
                  @click="()=>{
                    hourInput = val
                    syncHourStr(val)
                  }"
              >{{ val }}
              </div>
            </template>
          </q-slider>

          <q-separator class="component-separator-base" spaced="1.5rem"/>

          <div class="row justify-between">
            <h5>
              Minute
            </h5>
            <h5 class="component-cask-time-selected text-center">
              {{ minuteInputStr }}
            </h5>
          </div>

          <q-slider v-model="minuteInput" :min="0" :max="59" @update:modelValue="syncMinuteStr" marker-labels>
            <template v-slot:marker-label-group="{ markerList }">
              <div
                  v-for="val in [0, 30, 59]"
                  :key="val"
                  class="cursor-pointer"
                  :class="markerList[val].classes"
                  :style="markerList[val].style"
                  @click="()=>{
                    minuteInput = val
                    syncMinuteStr(val)
                  }"
              >{{ val }}
              </div>
            </template>
          </q-slider>


        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {defineEmits, defineProps, ref} from "vue";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: '--:--'
  },
})

const indexOfColon = props.modelValue.indexOf(":")

const hourInput = ref(indexOfColon !== -1 ? Number(props.modelValue.substring(0, indexOfColon)) : 0)
const hourInputStr = ref(indexOfColon !== -1 ? props.modelValue.substring(0, indexOfColon) : "--")
const minuteInput = ref(indexOfColon !== -1 ? Number(props.modelValue.substring(indexOfColon + 1)) : 0)
const minuteInputStr = ref(indexOfColon !== -1 ? props.modelValue.substring(indexOfColon + 1) : "--")
const timeStr = ref(props.modelValue)
// watch(() => props.modelValue, () => {
//   timeStr.value = props.modelValue
// })

const syncHourStr = ((hour) => {
  hourInputStr.value = String(hour).padStart(2, '0')
  timeStr.value = hourInputStr.value + ":" + minuteInputStr.value
  emit('update:modelValue', timeStr.value);
})

const syncMinuteStr = ((minute) => {
  minuteInputStr.value = String(minute).padStart(2, '0')
  timeStr.value = hourInputStr.value + ":" + minuteInputStr.value
  emit('update:modelValue', timeStr.value);
})

</script>

<style lang="scss">
@import "@fontsource/roboto-slab/index.css";
@import "@/styles/base-components";
@import "@/styles/independence-components";

</style>