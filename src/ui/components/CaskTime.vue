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
            <div>
              Hour
            </div>
            <div>
              {{ hourInputStr }}
            </div>
          </div>

          <q-slider v-model="hourInput" :min="0" :max="24" @update:modelValue="syncHourStr"/>

          <div class="row justify-between">
            <div>
              00
            </div>
            <div>
              12
            </div>
            <div>
              23
            </div>
          </div>

          <div class="row justify-between">
            <div>
              Minute
            </div>
            <div>
              {{ minuteInputStr }}
            </div>
          </div>

          <q-slider v-model="minuteInput" :min="0" :max="59" @update:modelValue="syncMinuteStr"/>

          <div class="row justify-between">
            <div>
              00
            </div>
            <div>
              30
            </div>
            <div>
              59
            </div>
          </div>

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
    default: ''
  },
})

const hourInput = ref(0)
const hourInputStr = ref("--")
const minuteInput = ref(0)
const minuteInputStr = ref("--")
const timeStr = ref("--:--")
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