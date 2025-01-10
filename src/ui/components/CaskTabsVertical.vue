<template>
  <div>

    <div v-for="(inTab, index) in tabs" :key="index" class="row justify-end">

      <q-btn v-if="inTab.value === tab" no-caps unelevated class="shadow-1 component-full-btn-grow q-my-sm"
             :label=" inTab.label "/>

      <q-btn v-else no-caps unelevated class=" shadow-1 component-outline-btn-grow q-my-sm"
             @click="updateCurrentTab(inTab.value)" :label=" inTab.label "/>


    </div>

  </div>
</template>

<script setup>
import {defineEmits, defineProps, ref, watch} from 'vue'

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: ''
  },
  tabs: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const tab = ref(props.modelValue)

watch(() => props.modelValue, () => {
  tab.value = props.modelValue
})

function updateCurrentTab(thisTab) {
  tab.value = thisTab
  emit('update:modelValue', thisTab);
}


</script>

<style scoped lang="scss">


</style>