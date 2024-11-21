<template>
  <router-view/>
</template>

<script setup>
import {RouterView} from "vue-router";
import {onMounted, onBeforeUnmount} from "vue";
import {initGlobalState, updateScreenSizeMini} from "@/utils/global-tools";
import {isMiniScreenMethod} from "@/utils/base-tools";

//todo 最开始展示主页可以做一个开门的动画，点击后，类似柯南开门的效果，可以做成移门不做推门
//todo 当然，也可以在页面间跳转的做类似的动画
//todo 如果觉得开门动画不好看，可以做类似卷帘门的动画，点击后，幕布上拉，，幕布上可以放一些简单的元素，这样相比更简约一些
//todo 类似舞台幕布的动画效果也可以考虑


//todo 大致兼容手机屏幕，不用完全兼容，完全兼容有点累，没必要


function screenEventHandler() {
  let isThisMiniScreen = isMiniScreenMethod()
  updateScreenSizeMini(isThisMiniScreen)
}

onMounted(() => {
  initGlobalState()
  window.addEventListener("resize", screenEventHandler);
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", screenEventHandler);

})
</script>

<style lang="scss">
@import "@fontsource/roboto-slab/index.css";
@import "@/styles/base-components";
@import "@/styles/extra-components";


</style>
