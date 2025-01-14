<template>
  <div class="row component-cask-cascade-selector">

    <div class="row" v-for="thisLevel in cascadeLevel" :key="thisLevel">
      <q-select borderless clearable class="component-none-input-grow"
                dropdown-icon="fa-solid fa-caret-down"
                popup-content-class="component-extra-card-std"
                clear-icon="fa-solid fa-xmark"
                menu-anchor="bottom start" :menu-offset="[0, 5]"
                v-model="selected[thisLevel-1]" :options="props.cascadeOptions[thisLevel-1]"
                :disable="1 !== thisLevel && !ableArray[thisLevel - 1]"
                @update:modelValue="it => updateSelect(thisLevel , it)" for=""
      >
        <template v-slot:prepend>
          <q-inner-loading
              :showing="1 !== thisLevel && ableArray[thisLevel - 1] && !props.cascadeOptions[thisLevel-1]"
              style="background: transparent"
              size="1rem"
          />
        </template>
      </q-select>

      <q-separator v-if="cascadeLevel !== thisLevel"
                   class="component-separator-base q-my-sm" spaced=".5rem" vertical/>

    </div>

  </div>
</template>

<script setup>
import {defineEmits, defineProps, ref} from "vue";

const emit = defineEmits(['update:modelValue', 'nextList']);
const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: () => [],
  },
  cascadeLevel: {
    type: Number,
    required: true,
  },
  cascadeOptions: {
    type: Array,
    required: true,
    default: () => [[]],
  },
});

const selected = ref(props.modelValue)
const ableArray = ref([])

function updateSelect(level, opt) {
  for (let index = 0; index < props.cascadeLevel; index++) {
    if (index >= level) {
      selected.value[index] = null
    }
    ableArray.value[index] = opt ? index <= level : index < level
  }
  if (opt) {
    emit("nextList", level, opt)
  }
  emit("update:modelValue", selected.value)
}


</script>

<style lang="scss">
@import "@/styles/independence-components";


</style>