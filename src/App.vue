<template>
  <router-view/>
</template>

<script setup>
import {RouterView} from "vue-router";
import {onMounted} from "vue";
import {initGlobalState} from "@/utils/global-tools";


onMounted(() => {
  initGlobalState()
})
</script>

<style lang="scss">
@import "@fontsource/roboto-slab/index.css";
@import "@/styles/base-components";
@import "@/styles/extra-components";


</style>
