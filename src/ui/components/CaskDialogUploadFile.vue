<template>
  <div>
    <q-dialog :model-value="showDialogJudgment" @hide="closeDialogJudgment"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-std" style="max-width: 1000px !important">

        <h5 style="font-weight: 600!important; margin-left: .5rem !important;">
          {{ $t(dialogJudgmentData.title) }}
        </h5>

        <q-separator class="component-separator-base" inset spaced="1rem"/>

        <div class="q-mx-lg q-mt-lg q-mb-xs">

          <div class="full-width row justify-center">
            <div class="text-center" style="max-width: 600px">
              {{ $t(dialogJudgmentData.content) }}
            </div>
          </div>

          <div class="row justify-center">

            <img v-if="uploadDataBase64" :src="uploadDataBase64"
                 class="q-mt-xl cask-dialog-upload-file-img" alt=""/>
            <div v-else-if="uploadDataName" class="q-mt-md">
              {{ uploadDataName }}
            </div>
            <cask-upload-input v-else class="q-mt-md" v-model="uploadData"
                               :tips="dialogJudgmentData.tips"
                               :accept="dialogJudgmentData.uploadAccept"
                               :max-file-size="dialogJudgmentData.uploadMaxSize"/>
          </div>

          <div class="row q-mt-xl q-mb-md justify-center">
            <div class="q-mx-md">

              <q-btn no-caps unelevated class=" shadow-1 component-outline-btn-grow"
                     @click="btnClick(false)"
                     :label="$t(dialogJudgmentData.falseLabel)"/>

            </div>
            <div class="q-mx-md">
              <q-btn no-caps unelevated class=" shadow-1 component-full-btn-grow" :disable="!trueBtnEnable"
                     @click="btnClick(true)">
                <div class="row items-center justify-center">
                  <div>
                    {{ $t(dialogJudgmentData.trueLabel) }}
                  </div>
                  <div v-if="!trueBtnEnable" class="q-ml-sm">
                    <q-spinner-ios size="15px"/>
                  </div>
                </div>
              </q-btn>
            </div>
          </div>


        </div>

      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {defineEmits, defineExpose, defineProps, ref, watch} from "vue";
import CaskUploadInput from "@/ui/components/CaskUploadInput.vue";

const emit = defineEmits(['update:modelValue']);
const reader = new FileReader();
reader.onload = (event) => {
  if (event && event.target) {
    const result = event.target.result;
    if (typeof result === 'string' && result.startsWith('data:image/')) {
      uploadDataBase64.value = result
    }
  } else {
    uploadDataBase64.value = null
  }
};

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
  dialogJudgmentData: {
    type: Object,
    required: true,
    default: () => {
      return {
        title: "",
        content: "",
        falseLabel: "",
        trueLabel: "",
        tips: [],
        uploadMaxSize: 1,
        uploadAccept: ""
      }
    },
  },
  callbackMethod: {
    type: Function,
    required: true,
  },
})

const showDialogJudgment = ref(props.modelValue);
const uploadData = ref(null)
const uploadDataBase64 = ref(null)
const uploadDataName = ref("")
const trueBtnEnable = ref(true)

watch(() => props.modelValue, () => {
  if (props.modelValue) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
  }
  showDialogJudgment.value = props.modelValue
})

watch(uploadData, () => {
  if (uploadData.value) {
    uploadDataName.value = uploadData.value.name
    reader.readAsDataURL(uploadData.value);
  } else {
    uploadDataBase64.value = null
    uploadDataName.value = ""
  }
})

//用于外部调用
const insertDialogUploadFileData = (data) => {
  uploadData.value = data
}

function btnClick(isTrue) {
  if (isTrue) {
    trueBtnEnable.value = false
    props.callbackMethod(true, uploadData.value).then(res => {
      if (res) {
        uploadData.value = null;
      }
      trueBtnEnable.value = true
    })
  } else {
    uploadData.value = null;
    props.callbackMethod(false)
  }
}

function closeDialogJudgment() {
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = '';
  showDialogJudgment.value = false
  emit('update:modelValue', false);
}

defineExpose({
  insertDialogUploadFileData
})

</script>


<style lang="scss">
@import "@/styles/independence-components";


</style>

<style scoped lang="scss">

.cask-dialog-upload-file-img {
  border-radius: 8px;
  max-height: 400px;
  max-width: 800px;
  width: auto;
  height: auto;
  object-fit: contain
}


</style>