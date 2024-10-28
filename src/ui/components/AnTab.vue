<template>
  <div>
    <q-tabs ref="tabsRef" v-model="tab">
      <div
          class="custom-indicator"
          :style="{  width: `${indicatorWidth}px`,
          transform: `translateX(${indicatorLeft}px)`,
        }"
      ></div>
      <q-tab v-for="tabItem in tabs"
             :key="tabItem.name"
             :name="tabItem.name"
             :label="tabItem.label"
             :ref="el => setTabRef(el, tabItem.name)">
      </q-tab>
      <!--动画-->

    </q-tabs>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, onUnmounted, onBeforeUpdate} from 'vue'

const tabs = [
  {name: 'tab1', label: '标签一'},
  {name: 'tab2', label: '标签二'},
  {name: 'tab3', label: '标签三'},
  {name: 'tab4', label: '标签四'}
]

const tab = ref('tab1')


const tabsRef = ref(null)
const tabRefs = ref({})
const indicatorWidth = ref(0)
const indicatorLeft = ref(0)

// 更新指示器位置和宽度
const updateIndicator = () => {
  // 获取当前激活的标签元素
  const activeTab = tabRefs.value[tab.value]?.$el
  const tabsContainer = tabsRef.value.$el


  if (activeTab && tabsContainer) {
    const containerRect = tabsContainer.getBoundingClientRect()
    const activeRect = activeTab.getBoundingClientRect()

    indicatorLeft.value = activeRect.left - containerRect.left
    indicatorWidth.value = activeRect.width
  }
}

const setTabRef = (el, name) => {
  if (el) {
    tabRefs.value[name] = el
  }
}

watch(() => tab.value, () => {
  updateIndicator()
})

onBeforeUpdate(() => {
  tabRefs.value = {}
})

onMounted(() => {
  window.addEventListener('resize', updateIndicator)
  updateIndicator()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIndicator)
})

</script>

<style scoped>

.custom-indicator {

  position: absolute;
  height: calc(100% - 8px);
  top: 4px;
  background-color: #4caf50;
  border-radius: 6px;
  transition: all .5s ease;
  z-index: 0;

}

:deep(.q-tab) {
  min-height: 50px;
}

:deep(.q-tab__content) {
  z-index: 1;
}

:deep(.q-tab--active) {
  color: white;
}

:deep(.q-tab:not(.q-tab--active)) {
  color: #666;
}

</style>