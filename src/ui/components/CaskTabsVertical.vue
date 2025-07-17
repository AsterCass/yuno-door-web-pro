<template>
  <div class="cask-tabs-vertical-body column">
    <div v-for="(inTab, index) in tabs" :key="index" :class="inTab.isStretch ? 'col' : ''">

      <div v-if="inTab.isStretch">
      </div>
      <div v-else class="cask-tabs-vertical-btn component-max-line-text "
           :class="inTab.value === tab ? 'btn-active shadow-1' : 'btn-normal'"
           :style="inTab.value === tab ? `background-color: ${inTab.color};border: 2px solid ${inTab.color};`
            : `color: ${forceTextColor ? forceTextColor : inTab.color};`"
           @click="updateCurrentTab(inTab.value)">
        {{ $t(inTab.label) }}
      </div>


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
  width: {
    type: String,
    required: false,
    default: '20rem'
  },
  textWidth: {
    type: String,
    required: false,
    default: '15rem'
  },
  forceTextColor: {
    type: String,
    required: false,
    default: ''
  }
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

.cask-tabs-vertical-body {
  width: v-bind(width);
}

.cask-tabs-vertical-btn {
  font-size: .95rem;
  margin: .5rem;
  padding: 4px 8px;
  cursor: pointer;

  transition: transform .3s linear .45s, width .3s linear, margin-left .15s linear .3s, background-color linear .6s;

  &.btn-active {
    color: #eee;
    width: v-bind(width);
    border-radius: 4px 4px 12px 4px;
    margin-left: .5rem;
    transform: translateX(-.5rem);

    &:hover, &:active {
      opacity: .8;
    }
  }

  &.btn-normal {
    width: v-bind(textWidth);
    border-radius: 4px;
    margin-left: 0;
    transform: translateX(0);
    border: 2px solid transparent;

    &:hover, &:active {
      background: rgba(var(--text-color), 0.05);
    }
  }
}


</style>