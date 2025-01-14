<template>

  <div class="component-cask-upload-input">
    <q-file v-if="fileData" class="q-ma-md component-outline-input-large"
            v-model="fileData" borderless label-slot clearable clear-icon="fa-solid fa-xmark"
            :accept="accept" :max-file-size="maxFileSize"
            @rejected="notifyTopNegative(
                errorMessage ? errorMessage : $t('file_upload_error_message'), 3000)"
            @update:model-value="updateFile"
    >
      <template v-slot:label>
        <div>
          <div style="padding-left: 1rem; font-size: 1.1rem; opacity: .5">
            {{ title ? title : $t('file_upload_title') }}
          </div>
          <ul>
            <li v-for="tip in tips" :key="tip" style="opacity: .5;white-space: normal;">
              {{ $t(tip) }}
            </li>
          </ul>
        </div>
      </template>
      <template v-slot:file="{index, file}">
        <div v-if="index === 0" style="margin-top: 5rem; font-size: 1rem">
          {{ file.name }}
        </div>
      </template>
    </q-file>
    <q-file v-else class="q-ma-md component-outline-select-large"
            v-model="fileData" borderless label-slot clearable clear-icon="fa-solid fa-xmark"
            :accept="accept" :max-file-size="maxFileSize"
            @rejected="notifyTopNegative(
                errorMessage ? errorMessage : $t('file_upload_error_message'), 3000)"
            @update:model-value="updateFile">
      <template v-slot:label>
        <div>
          <div style="padding-left: 1rem; font-size: 1.1rem">
            {{ title ? title : $t('file_upload_title') }}
          </div>
          <ul>
            <li v-for="tip in tips" :key="tip" style="opacity: .8;white-space: normal; ">
              {{ $t(tip) }}
            </li>
          </ul>
        </div>
      </template>
    </q-file>
  </div>


</template>

<script setup>
import {notifyTopNegative} from "@/utils/notification-tools";
import {defineEmits, defineProps, ref} from "vue";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    required: true,
  },
  tips: {
    type: Array,
    required: false,
    default: () => [],
  },
  accept: {
    type: String,
    required: false,
    default: '*'
  },
  maxFileSize: {
    type: Number,
    required: false,
    default: undefined,
  },
  title: {
    type: String,
    required: false,
    default: ""
  },
  errorMessage: {
    type: String,
    required: false,
    default: ""
  },
})
const fileData = ref(props.modelValue)

const updateFile = () => {
  emit('update:modelValue', fileData.value);
}

</script>


<style lang="scss">
@import "@/styles/independence-components";


</style>