<template>

  <div v-show="props.textList.length > 0" class="component-cask-announcement-block">
    <ul>
      <li v-for="(text, index) in textList" :key="index">
        <p>{{ text }}</p>
      </li>
    </ul>
  </div>

</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({
  textList: {
    type: Array,
    required: true,
  },
})

</script>

<style lang="scss">
@import "@/styles/independence-components";


</style>