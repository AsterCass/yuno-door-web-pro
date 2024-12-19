<template>
  <div>
    当前页面的新版页面正在开发中... {{ count }} 秒后跳转到旧版页面
    <q-btn @click="routePrevious">
      直接跳转
    </q-btn>
  </div>
</template>

<script setup>


import {defineProps, onBeforeUnmount, onMounted, ref} from "vue";
import {openLink} from "@/utils/base-tools";
import {toBack} from "@/router";
import {useRouter} from "vue-router";

const PRE_ADD = process.env.VUE_APP_PREVIOUS_ADD
const thisRouter = useRouter()

const count = ref(10)
let timer = null

const props = defineProps({
  path: {
    type: String,
    required: false,
    default: ""
  },
})

function startCountdown() {
  // 启动一个 10 秒的定时器
  timer = setInterval(() => {
    if (count.value > 0) {
      --count.value
    } else {
      clearInterval(timer); // 清除定时器
      routePrevious()
    }
  }, 1000);
}

function routePrevious() {
  clearInterval(timer)
  openLink(PRE_ADD + props.path)
  toBack(thisRouter)
}

onMounted(() => {
  startCountdown()
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

</script>

<style scoped lang="scss">


</style>