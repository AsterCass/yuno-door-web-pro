<template>


  <div class="component-long-text-input-simple">

    <q-input ref="caskLongTextInputRef" :input-style="`height: ${inputHeight}`"
             v-model="mainInput" type="textarea" @update:model-value="emit('update:value', mainInput);"
             :placeholder="placeholder ? placeholder : ''" borderless/>
  </div>

</template>

<script setup>

import {defineEmits, defineProps, ref, watch} from "vue";


const emit = defineEmits(['update:value']);
const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: ""
  },
  value: {
    type: String,
    required: true,
  },
  inputHeight: {
    type: String,
    required: false,
    default: "2.4rem"
  }
})

const mainInput = ref(props.value)
const caskLongTextInputRef = ref(null)

watch(() => props.value, () => {
  mainInput.value = props.value
})


</script>

<style scoped lang="scss">


</style>