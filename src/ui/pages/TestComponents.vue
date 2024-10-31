<template>
  <div class="q-ma-lg">

    <q-btn no-caps @click="switchTheme" class="q-ma-md" color="primary"
           :label="$t('test_component_switch_theme') "/>
    <q-btn no-caps @click="switchLanguage" class="q-ma-md" color="primary"
           :label="$t('test_component_switch_lang')"/>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <div class="row items-center">

      <q-btn no-caps unelevated class="q-ma-md shadow-2 component-full-btn-std">
        <div class="row items-center">
          <q-icon name="fa-solid fa-arrow-down" size=".9rem"/>
          <div class="q-mx-xs">
            {{ $t('test_component_import') }}
          </div>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md shadow-1 component-outline-btn-std">
        <div class="row items-center">
          <q-icon name="fa-solid fa-arrow-up" size=".9rem"/>
          <div class="q-mx-xs">
            {{ $t('test_component_upload') }}
          </div>
        </div>
      </q-btn>


      <q-btn no-caps unelevated class="q-ma-md shadow-1 component-outline-btn-mini">
        <div class="row items-center">
          <q-icon name="fa-solid fa-angle-left" size=".9rem"/>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md shadow-1 component-outline-btn-mini">
        <div class="row items-center">
          <q-icon name="fa-solid fa-angle-right" size=".9rem"/>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md component-none-btn-std">
        <div class="row items-center">
          <q-icon name="fa-solid fa-bell" size="1.5rem"/>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md component-none-btn-std" icon="fa-solid fa-wand-sparkles"/>

      <q-btn no-caps unelevated class="q-ma-md  component-none-btn-std">
        <div class="row items-center">
          <div class="q-mx-xs">
            {{ $t('test_component_show_more') }}
          </div>
          <q-icon name="fa-solid fa-caret-down" size="1rem"/>
        </div>
      </q-btn>

      <q-input v-model="input" tabindex="0" dense outlined placeholder="Search"
               class="q-ma-md component-outline-input-std">
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-magnifying-glass" size="1rem"/>
        </template>
      </q-input>

      <q-select outlined clearable class="q-ma-md component-outline-input-grow"
                dropdown-icon="fa-solid fa-caret-down"
                popup-content-class="component-extra-card-std"
                clear-icon="fa-solid fa-xmark"
                menu-anchor="bottom start" :menu-offset="[0, 5]"
                v-model="selected" :options="options">
        <template v-slot:prepend>
          {{ $t('test_component_go_to') }}
        </template>
      </q-select>

      <q-select outlined clearable multiple use-chips class="q-ma-md component-outline-input-grow"
                dropdown-icon="fa-solid fa-caret-down"
                popup-content-class="component-extra-card-std"
                clear-icon="fa-solid fa-xmark"
                menu-anchor="bottom start" :menu-offset="[0, 5]"
                v-model="selectedMulti" :options="options">
        <template v-slot:prepend>
          {{ $t('test_component_m_go_to') }}
        </template>
      </q-select>

      <cask-tabs class="q-ma-md" :tabs="tabs" v-model="tab"/>

      <cask-date-picker class="q-ma-md" v-model="dateInput"/>

      <cask-time-picker class="q-ma-md" v-model="timeInput"/>

      <cask-date-time-picker class="q-ma-md" v-model="datetimeInput"/>

      <cask-cascade-selector class="q-ma-md" v-model="cascadeInput"
                             :cascadeLevel="3"
                             :cascade-options="cascadeOptions"
                             @next-list="cascadeOptionsMore"
      />

    </div>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <cask-upload-input v-model="fileData" :tips="fileInputTips"
                       accept=".xls,.xlsx,.txt" max-file-size="5120000"/>


    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <div>
      This is Text
    </div>

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h1>-->
    <!--      This is h1-->
    <!--    </h1>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h2>-->
    <!--      This is h2-->
    <!--    </h2>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h3>-->
    <!--      This is h3-->
    <!--    </h3>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h4>-->
    <!--      This is h4-->
    <!--    </h4>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h5>-->
    <!--      This is h5-->
    <!--    </h5>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size=".15rem"/>-->

    <!--    <h6>-->
    <!--      This is h6-->
    <!--    </h6>-->


  </div>

</template>

<script setup>
import {switchTheme, switchLanguage, delay} from "@/utils/base-tools";
import {ref} from "vue";
import CaskTabs from "@/ui/components/CaskTabs.vue";
import CaskDatePicker from "@/ui/components/CaskDatePicker.vue";
import CaskTimePicker from "@/ui/components/CaskTimePicker.vue";
import CaskDateTimePicker from "@/ui/components/CaskDateTimePicker.vue";
import CaskCascadeSelector from "@/ui/components/CaskCascadeSelector.vue";
import CaskUploadInput from "@/ui/components/CaskUploadInput.vue";

const input = ref("")
const selected = ref("")
const selectedMulti = ref([])
const options = ref(["Beijing", "Shanghai", "Hangzhou", "Shenzhen-Long",])
const tabs = ref([
  {value: 'Beijing', label: 'Beijing-TianAnMeng',},
  {value: 'Shanghai', label: 'Shanghai-DongFangMingZhu',},
  {value: 'Hangzhou', label: 'Hangzhou', icon: 'mail'},
  {value: 'Shenzhen', label: 'Shenzhen',}
])
const tab = ref('Beijing');
const dateInput = ref('')
const timeInput = ref('')
const datetimeInput = ref('')
const cascadeInput = ref([])
const cascadeOptions = ref([[
  {value: '110000', label: '北京市',},
  {value: '120000', label: '天津市',},
  {value: '140000', label: '山西省',},
]])
const cascadeOptionsMore = (level, opt) => {
  delay(500).then(() => {
    if (level === 1) {
      cascadeOptions.value[level] = [
        {value: '150100', label: "鄂尔多斯市",},
        {value: '150600', label: "乌兰察布市",},
        {value: '152900', label: "阿拉善",},
      ]
    } else {
      cascadeOptions.value[level] = [
        {value: '150702', label: "莫力达瓦达斡尔族自治旗",},
        {value: '150701', label: "扎赉诺尔区",},
        {value: '150724', label: "新巴尔虎右旗",},
      ]
    }
  })
}
const fileData = ref(null)
const fileInputTips = ref(["仅支持xls、xlsx、txt格式", "文件大小不得超过5MB", "文件中数据不能超过3000行",])


</script>

<style scoped lang="scss">


</style>