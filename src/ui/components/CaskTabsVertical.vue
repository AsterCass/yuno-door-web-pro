<template>
  <div>

    <div class="cask-tabs-vertical-body row">
      <div v-for="(inTab, index) in tabs" :key="index">

        <div class="cask-tabs-vertical-btn "
             :class="inTab.value === tab ? 'btn-active shadow-1' : 'btn-normal'"
             :style="inTab.value === tab ? `background-color: ${inTab.color};border: 2px solid ${inTab.color};`
            : `color: ${inTab.color};`"
             @click="updateCurrentTab(inTab.value)">
          {{ inTab.label }}
        </div>


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
  width: 20rem;
}

.cask-tabs-vertical-btn {
  font-size: .95rem;
  margin: .5rem;
  padding: 2px 5px;
  cursor: pointer;

  transition: transform .3s linear .45s, width .3s linear, margin-left .15s linear .3s, background-color linear .6s;

  &.btn-active {
    color: #eee;
    width: 20rem;
    border-radius: 4px 4px 12px 4px;
    margin-left: .5rem;
    transform: translateX(-.5rem);

    &:hover, &:active {
      opacity: .8;
    }
  }

  &.btn-normal {
    width: 15rem;
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