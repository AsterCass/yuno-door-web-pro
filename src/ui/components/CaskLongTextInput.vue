<template>


  <div class="component-long-text-input">

    <q-input
        v-model="mainInput" type="textarea"
        placeholder="吾有一言，请诸位静听" borderless/>
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
               style="padding: 0!important;">
          <div class="row items-center">
            <div class="q-mx-sm" style="font-size: .9rem">
              提交
            </div>
            <q-icon class="q-mr-sm" name="fa-regular fa-paper-plane" size=".9rem"/>
          </div>
        </q-btn>


      </div>
    </div>

  </div>

</template>

<script setup>

import {defineProps, ref} from "vue";
import {CaskLongTextInputElement} from "@/constant/enums/component-enums";

const props = defineProps({
  elements: {
    type: Map,
    required: false,
    default: () => {
      return new Map()
    },
  },
})

const mainInput = ref("")


</script>

<style scoped lang="scss">

</style>