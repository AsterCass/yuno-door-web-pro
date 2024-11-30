<template>


  <div class="component-long-text-input">

    <q-input
        v-model="mainInput" type="textarea" @update:model-value="emit('update:modelValue', mainInput);"
        :placeholder="placeholder" borderless/>
    <div class="component-long-text-input-bottom row justify-between q-px-sm">
      <div class="row items-center">
        <div v-if="elements.has(CaskLongTextInputElement.FILE)" class="q-mr-sm">
          <q-btn no-caps unelevated class="component-none-btn-grow" style="padding: 0!important;">
            <div class="row items-center q-ma-xs">
              <q-icon name="fa-solid fa-paperclip" size="1.2rem"/>
            </div>
          </q-btn>
        </div>
        <div v-if="elements.has(CaskLongTextInputElement.IMG)" class="q-mr-sm">
          <q-btn no-caps unelevated class="component-none-btn-grow" style="padding: 0!important;">
            <div class="row items-center q-ma-xs">
              <q-icon name="fa-regular fa-image" size="1.2rem"/>
            </div>
          </q-btn>
        </div>
        <div v-if="elements.has(CaskLongTextInputElement.EMOJI)" class="q-mr-sm">
          <q-btn no-caps unelevated class="component-none-btn-grow" style="padding: 0!important;">
            <div class="row items-center q-ma-xs">
              <q-icon name="fa-regular fa-face-smile" size="1.2rem"/>
            </div>
          </q-btn>
        </div>
        <div v-if="elements.has(CaskLongTextInputElement.CALL)" class="q-mr-sm">
          <q-btn no-caps unelevated class="component-none-btn-grow" style="padding: 0!important;">
            <div class="row items-center q-mx-xs" style="font-size: 20.3px; margin: -2.33px 4.5px 5.5px 4.6px;">
              @
            </div>
          </q-btn>
        </div>
      </div>

      <div>
        <q-btn no-caps unelevated class="component-full-btn-mini-grow items-center"
               style="padding: 0!important;" @click="sendCallback">
          <div class="row items-center">
            <div class="q-mx-sm" style="font-size: .9rem">
              发送
            </div>
            <q-icon class="q-mr-sm" name="fa-regular fa-paper-plane" size=".9rem"/>
          </div>
        </q-btn>


      </div>
    </div>

  </div>

</template>

<script setup>

import {defineEmits, defineProps, ref, watch} from "vue";
import {CaskLongTextInputElement} from "@/constant/enums/component-enums";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  elements: {
    type: Map,
    required: false,
    default: () => {
      return new Map()
    },
  },
  placeholder: {
    type: String,
    required: false,
    default: ""
  },
  sendCallback: {
    type: Function,
    required: false,
    default: () => {
    }
  },
  modelValue: {
    type: String,
    required: true,
  },
})

watch(() => props.modelValue, () => {
  mainInput.value = props.modelValue
})

const mainInput = ref(props.modelValue)


</script>

<style scoped lang="scss">

</style>