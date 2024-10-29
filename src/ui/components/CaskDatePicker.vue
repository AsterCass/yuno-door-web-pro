<template>
  <div>
    <q-input v-model="pickTime" tabindex="0" dense outlined
             class="component-outline-input-mini" :placeholder="placeholder"
             no-error-icon mask="date"
    >
      <template v-slot:append>
        <q-icon name="fa-regular fa-calendar" size="1rem" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                         style="background-color:transparent; border:0; padding:1rem;
                                   box-shadow: none; backdrop-filter: none"
                         @hide="saveDate()"
          >
            <div>
              <div class="row">
                <q-date class="q-mx-sm" v-model="dateUiInput">
                </q-date>
              </div>
            </div>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>

</template>

<script setup>
import {defineEmits, defineProps, ref} from "vue";
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
    default: '1970/01/01'
  },
})

const pickTime = ref(props.modelValue)
// watch(() => props.modelValue, () => {
//   pickTime.value = props.modelValue
// })

let dateUiInput = ref("")

function saveDate() {
  if (dateUiInput.value) {
    const timeStamp = new Date(dateUiInput.value)
    const dateStr = date.formatDate(timeStamp, 'YYYY-MM-DD')
    pickTime.value = dateStr
    emit('update:modelValue', dateStr);
  }
}

</script>

<style lang="scss">
@import "@fontsource/roboto-slab/index.css";
@import "@/styles/base-components";
@import "@/styles/independence-components";
@import "@/styles/override-components";


</style>

