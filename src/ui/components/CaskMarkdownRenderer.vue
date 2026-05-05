<template>
  <div v-html="html"></div>
</template>

<script setup>
import {defineProps, nextTick, ref, watch} from 'vue'
import {marked} from "@/utils/marked-tools"

const props = defineProps({
  content: {type: String, default: ''}
})

const html = ref('')

watch(
    () => props.content,
    async (val) => {
      await nextTick()
      html.value = marked.parse(val || '')
    },
    {immediate: true}
)
</script>
