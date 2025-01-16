<template>
  <div>
    <q-input v-model="pickDatetime" tabindex="0" dense outlined
             class="component-outline-input-std" :placeholder="placeholder"
             no-error-icon mask="datetime" @update:modelValue="updateUiInput"
    >
      <template v-slot:append>
        <q-icon name="fa-regular fa-clock" size="1.1rem" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                         style="background-color:transparent; border:0; padding:1rem;
                                   box-shadow: none; backdrop-filter: none"
                         @hide="saveTime()"
          >
            <div>
              <div class="row">
                <q-date class="q-mx-sm" v-model="dateUiInput"/>
                <cask-time v-model="timeUiInput" @update:modelValue="it => {timeUiInput = it}"/>
              </div>
            </div>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>

</template>

<script setup>
import {defineEmits, defineProps, onMounted, ref} from "vue";
import CaskTime from "@/ui/components/CaskTime.vue";
import {date} from "quasar";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: ''
  },
  placeholder: {
    type: String,
    required: false,
    default: '1970/01/01 00:00'
  },
})

const pickDatetime = ref(props.modelValue)
// watch(() => props.modelValue, () => {
//   pickTime.value = props.modelValue
// })

let dateUiInput = ref("")
let timeUiInput = ref("")

function updateUiInput() {
  if (pickDatetime.value && pickDatetime.value.length >= 16) {
    const thisDate = date.extractDate(pickDatetime.value, 'YYYY/MM/DD HH:mm')
    //这里的thisDate不一定对，需要自动矫正
    const thisDateStr = date.formatDate(thisDate, 'YYYY/MM/DD HH:mm')
    pickDatetime.value = thisDateStr
    dateUiInput.value = thisDateStr.substring(0, 10)
    timeUiInput.value = thisDateStr.substring(11)
  }
  emit("update:modelValue", pickDatetime.value)
}

function saveTime() {
  if (timeUiInput.value && dateUiInput.value) {
    pickDatetime.value = dateUiInput.value + " " + timeUiInput.value
    emit("update:modelValue", pickDatetime.value)
  }
}

onMounted(() => {
  updateUiInput()
})

</script>

<style lang="scss">
@import "@/styles/independence-components";
@import "@/styles/override-components";


</style>

