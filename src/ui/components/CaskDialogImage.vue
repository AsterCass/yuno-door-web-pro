<template>
  <div>
    <q-dialog :model-value="showDialogImage" @hide="closeDialogImage"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-image-std row justify-center items-center overflow-hidden">
        <q-img :ratio="0" :src="src" fit="contain" style="width: 100%; height: 100%;"/>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {defineEmits, defineProps, ref, watch} from "vue";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
  src: {
    type: String,
    required: true,
  },
})

let showDialogImage = ref(props.modelValue);
watch(() => props.modelValue, () => {
  if (props.modelValue) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
  }
  showDialogImage.value = props.modelValue
})

function closeDialogImage() {
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = '';
  showDialogImage.value = false
  emit('update:modelValue', false);
}

</script>


<style lang="scss">
@import "@fontsource/roboto-slab/index.css";
@import "@/styles/base-components";
@import "@/styles/independence-components";


</style>