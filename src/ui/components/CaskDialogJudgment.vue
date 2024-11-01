<template>
  <div>
    <q-dialog :model-value="showDialogJudgment" @hide="closeDialogJudgment"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-std">

        <h5 style="font-weight: 600!important; margin-left: .5rem !important;">
          {{ dialogJudgmentData.title }}
        </h5>

        <q-separator class="component-separator-base" inset spaced="1rem"/>

        <div class="q-mx-lg q-mt-lg q-mb-xs">

          <div class="text-center">
            {{ dialogJudgmentData.content }}
          </div>

          <div class="row q-mt-xl q-mb-md justify-center">
            <div class="q-mx-md">

              <q-btn no-caps unelevated class=" shadow-1 component-outline-btn-grow"
                     @click="callbackMethod(false)" :label="dialogJudgmentData.falseLabel"/>

            </div>
            <div class="q-mx-md">
              <q-btn no-caps unelevated class=" shadow-1 component-full-btn-grow"
                     @click="callbackMethod(true)" :label="dialogJudgmentData.trueLabel"/>
            </div>
          </div>


        </div>

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
  dialogJudgmentData: {
    type: Object,
    required: true,
    default: () => {
      return {title: "", content: "", falseLabel: "", trueLabel: ""}
    },
  },
  callbackMethod: {
    type: Function,
    required: true,
  },
})

let showDialogJudgment = ref(props.modelValue);
watch(() => props.modelValue, () => {
  showDialogJudgment.value = props.modelValue
})

function closeDialogJudgment() {
  showDialogJudgment.value = false
  emit('update:modelValue', false);
}


</script>


<style lang="scss">
@import "@fontsource/roboto-slab/index.css";
@import "@/styles/base-components";
@import "@/styles/independence-components";


</style>