<template>
  <div class="component-cask-tabs">
    <q-tabs ref="tabsRef" v-model="tab"
            indicator-color="transparent"
            @update:modelValue="it => updateCurrentTab(it)"
    >
      <!--animation-->
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
          :style="dense ? 'min-height: 38px' : ''"
          :ripple="false"
          v-for="tabItem in tabs"
          :key="tabItem.value"
          :name="tabItem.value"
          :label="$t(tabItem.label)"
          :ref="el => setTabRef(el, tabItem.value)">
      </q-tab>

    </q-tabs>
  </div>
</template>

<script setup>
import {defineEmits, defineProps, onBeforeUnmount, onMounted, ref, watch} from 'vue'
import {delay} from "@/utils/base-tools";
import emitter from "@/utils/bus";

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
  dense: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const tab = ref(props.modelValue)
const tabsRef = ref(null)
const tabRefs = ref({})
const indicatorWidth = ref(0)
const indicatorLeft = ref(0)

const updateIndicator = () => {
  delay(0).then(() => {
    const activeTab = tabRefs.value[tab.value]?.$el
    const tabsContainer = tabsRef.value.$el

    if (activeTab && tabsContainer) {
      const containerRect = tabsContainer.getBoundingClientRect()
      const activeRect = activeTab.getBoundingClientRect()

      indicatorLeft.value = activeRect.left - containerRect.left
      indicatorWidth.value = activeRect.width
    }
  })
}

const setTabRef = (el, value) => {
  if (el) {
    tabRefs.value[value] = el
  }
}

function updateCurrentTab(thisTab) {
  emit('update:modelValue', thisTab);
  updateIndicator()
}

watch(() => props.modelValue, () => {
  tab.value = props.modelValue
})

onMounted(() => {
  updateIndicator()
  emitter.on("screenResizeEvent", updateIndicator)
})

onBeforeUnmount(() => {
  emitter.off("screenResizeEvent", updateIndicator)
})


</script>

<style lang="scss">
@import "@/styles/independence-components";


</style>