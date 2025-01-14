<template>
  <div>
    <q-dialog :model-value="showDialogImage" @hide="closeDialogImage"
              transition-show="fade" transition-hide="fade">
      <div class="component-cask-dialog-image-std">
        <img :src="src" alt=""/>
      </div>
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
@import "@/styles/independence-components";

</style>