<template>
  <div ref="container" v-html="html"></div>
</template>


<script setup>
import {computed, nextTick, ref, watch, defineProps, defineEmits} from 'vue'
import {marked} from "@/utils/marked-tools";

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['imgClick'])

const container = ref(null)
const html = computed(() => {
  return marked.parse(props.content || '')
})

watch(html, async () => {
  await nextTick()
  if (!container.value) return

  let imgList = container.value.getElementsByTagName("img");
  for (let i = 0; i < imgList.length; i++) {
    if (imgList[i].classList.length > 0) {
      continue
    }
    imgList[i].onclick = () => {
      emit('imgClick', imgList[i])
    }
    imgList[i].style.cursor = 'zoom-in'
  }
})
</script>

<style lang="scss">
@import "@/styles/base-marked";

</style>