<template>
  <div>
    <q-input v-model="pickTime" tabindex="0" dense outlined
             class="component-outline-input-mini" :placeholder="placeholder"
             no-error-icon mask="time"
    >
      <template v-slot:append>
        <q-icon name="fa-regular fa-clock" size="1.1rem" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                         style="background-color:transparent; border:0; padding:1rem;
                                   box-shadow: none; backdrop-filter: none"
                         @hide="saveTime()"
          >
            <div>
              <div class="row">
                <cask-time v-model="timeUiInput" @update:modelValue="it => {timeUiInput = it}"/>
              </div>
            </div>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>

</template>

<script setup>
import {defineEmits, defineProps, ref} from "vue";
import CaskTime from "@/ui/components/CaskTime.vue";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: ''
  },
  placeholder: {
    type: String,
    required: false,
    default: '00:00'
  },
})

const pickTime = ref(props.modelValue)
// watch(() => props.modelValue, () => {
//   pickTime.value = props.modelValue
// })

let timeUiInput = ref("")

function saveTime() {
  if (timeUiInput.value) {
    pickTime.value = timeUiInput.value
    emit("update:modelValue", timeUiInput.value)
  }
}

</script>

<style lang="scss">
@import "@fontsource/roboto-slab/index.css";
@import "@/styles/base-components";
@import "@/styles/independence-components";


</style>

