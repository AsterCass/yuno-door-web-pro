<template>
  <q-badge class="transparent no-padding component-cask-badge-tips">
    <q-icon size=".9rem" name="fa-regular fa-circle-question"/>
    <q-tooltip class="component-cask-badge-tips-tooltip"
               :anchor="isTop ? 'top middle' : 'bottom middle'"
               :self="isTop ? 'bottom middle' : 'top middle'">
      <div class="q-pa-sm" style="max-width: 15rem;font-size: .9rem">
        {{ text }}
      </div>
    </q-tooltip>
  </q-badge>
</template>

<script setup>

import {defineProps} from "vue";

defineProps({
  isTop: {
    type: Boolean,
    required: false,
    default: true,
  },
  text: {
    type: String,
    required: true,
  },
})


</script>

<style lang="scss">
@import "@/styles/independence-components";

</style>