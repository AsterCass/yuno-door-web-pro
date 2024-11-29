<template>


  <div class="component-long-text-input">

    <q-input
        v-model="mainInput" type="textarea"
        placeholder="吾有一言，请诸位静听" borderless/>
    <div class="component-long-text-input-bottom row justify-between">
      <div class="row">
        <div v-if="elements.has(CaskLongTextInputElement.FILE)">

        </div>
        <div v-if="elements.has(CaskLongTextInputElement.IMG)">

        </div>
        <div v-if="elements.has(CaskLongTextInputElement.EMOJI)">

        </div>
        <div v-if="elements.has(CaskLongTextInputElement.CALL)">

        </div>
      </div>

      <div>

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