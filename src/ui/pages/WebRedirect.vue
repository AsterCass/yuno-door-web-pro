<template>

  <div class="row justify-center q-mt-xl">


    <div class="full-width row justify-center q-my-xl">
      <div style="width: 30%" class="text-center">
        {{ $t('main_redirect_pre') }} &nbsp; {{ count }} &nbsp;{{ $t('main_redirect_post') }}
      </div>
    </div>

    <q-btn no-caps unelevated class="q-ma-md shadow-2 component-full-btn-grow" @click="routePrevious">
      <div class="q-mx-xs">
        {{ $t('main_redirect_now') }}
      </div>
    </q-btn>

  </div>
  <div>


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
  timer = setInterval(() => {
    if (count.value > 0) {
      --count.value
    } else {
      clearInterval(timer); // 清除定时器
      // routePrevious()
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