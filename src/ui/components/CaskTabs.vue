<template>
  <div class="component-cask-tabs">
    <q-tabs ref="tabsRef" v-model="tab"
            indicator-color="transparent"
            inline-label
            @update:modelValue="it => updateCurrentTab(it)"
    >
      <!--动画-->
      <div
          class="component-cask-tab-mask"
          :style="{
            width: `${indicatorWidth}px`,
            left: `0px`,
            transform: `translateX(${indicatorLeft}px)`,
          }"
      />

      <q-tab
          :icon="tabItem.icon"
          no-caps
          class="component-cask-tabs-btn"
          :ripple="false"
          v-for="tabItem in tabs"
          :key="tabItem.code"
          :name="tabItem.code"
          :label="tabItem.label"
          :ref="el => setTabRef(el, tabItem.code)">
      </q-tab>

    </q-tabs>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, defineProps, defineEmits} from 'vue'

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
const tabsRef = ref(null)
const tabRefs = ref({})
const indicatorWidth = ref(0)
const indicatorLeft = ref(0)

const updateIndicator = () => {
  const activeTab = tabRefs.value[tab.value]?.$el
  const tabsContainer = tabsRef.value.$el

  if (activeTab && tabsContainer) {
    const containerRect = tabsContainer.getBoundingClientRect()
    const activeRect = activeTab.getBoundingClientRect()

    indicatorLeft.value = activeRect.left - containerRect.left
    indicatorWidth.value = activeRect.width
  }
}

const setTabRef = (el, code) => {
  if (el) {
    tabRefs.value[code] = el
  }
}

function updateCurrentTab(thisTab) {
  emit('update:modelValue', thisTab);
  updateIndicator()
}

watch(() => props.modelValue, name => {
  tab.value = props.modelValue
})

// onBeforeUpdate(() => {
//   tabRefs.value = {}
// })

// resizeEvent(updateIndicator);


onMounted(() => {
  updateIndicator()
})


</script>

<style lang="scss">
@import "@fontsource/roboto-slab/index.css";
@import "@/styles/base-components";
@import "@/styles/independence-components";


</style>