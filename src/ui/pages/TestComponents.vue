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

    <div class="row items-center">

      <cask-upload-input class="q-ma-md" v-model="fileData" :tips="fileInputTips"
                         accept=".xls,.xlsx,.txt" :max-file-size="5120000"/>

      <div class="q-ma-md">
        <cask-announcement-block :text-list="[
          '活动创建完成后，默认为下架状态，仅已上架且进行中的活动会展示给租客',
          '进行中的活动不允许编辑/删除，仅允许上下架',
          '第一 ！绝不意气用事',
          '第二 ！绝对不漏抓任何一件坏事',
          '第三 ！绝对裁判的公正漂亮',
      ]"/>
      </div>


      <div class="q-ma-md cask-litter-title-asterisk row items-center">
        什么是蜻蜓队长
        <badge-tips style="margin-left: 3px" text="没有人知道它的真实身份，就连他是否真的如自称的那样是机器人都没有确凿证据的谜之存在。
        可以张开嘴吃东西，在第3话的食物对决和39话中分别吃过咖喱和豆大福"/>
      </div>

      <div class="q-ma-md col-4 cask-simple-quoted-title">
        <h4>
          个人设置子标题
        </h4>
      </div>


      <q-btn no-caps unelevated class="q-ma-md shadow-2 component-full-btn-grow" @click="showDialog = true">
        <div class="row items-center">
          <div class="q-mx-xs">
            {{ $t('test_component_show_dialog') }}
          </div>
        </div>
      </q-btn>

    </div>


    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <div class="row q-pa-md">
      <q-btn no-caps unelevated class="q-ma-md shadow-2 component-full-btn-grow"
             @click="tableDynamicData.multiple = !tableDynamicData.multiple">
        <div class="row items-center">
          <div v-if="tableDynamicData.multiple" class="q-mx-xs">
            {{ $t('test_component_multiple_close') }}
          </div>
          <div v-else>
            {{ $t('test_component_multiple_open') }}
          </div>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md shadow-2 component-full-btn-grow"
             @click="operationFinish">
        <div class="row items-center">
          <div class="q-mx-xs">
            Operation
          </div>
        </div>
      </q-btn>

      <div class="col-12 q-ma-md"/>


      <cask-complex-table class="col-12" :table-base-info="mockTableBaseInfoOrder"
                          :table-data="tableData"
                          :custom-table-operation="mockTableBaseInfoOrderOperation"
                          :table-dynamic-data="tableDynamicData"
                          :multiple-select-data="selectedData"

                          @multipleUpdate="(selectedArr) => {
                            selectedData = selectedArr
                          }"

                          @toSort="(name, status) => {
                            tableDynamicData.inLoading = true
                            delay(500).then(() => {
                              let sortedData = null
                              if(status === ComplexTableSortedStatus.ASC) {
                                sortedData = mockTableBaseInfoOrderData.slice()
                              .sort((a, b) => a[name].localeCompare(b[name]));
                              } else if (status === ComplexTableSortedStatus.DESC) {
                                sortedData = mockTableBaseInfoOrderData.slice()
                              .sort((a, b) => b[name].localeCompare(a[name]));
                              } else {
                                sortedData =mockTableBaseInfoOrderData
                              }
                              const start = (tableDynamicData.pageNo - 1) * tableDynamicData.pageSize;
                              const end = start + tableDynamicData.pageSize;
                              tableData = sortedData.slice(start, end)
                              tableDynamicData.inLoading = false
                            })
                          }"

                          @toNewPage="(pageObj) => {
                            tableDynamicData.inLoading = true

                            tableDynamicData.pageNo = pageObj.pageNo
                            tableDynamicData.pageSize = pageObj.pageSize
                            const start = (tableDynamicData.pageNo - 1) * tableDynamicData.pageSize;
                            const end = start + tableDynamicData.pageSize;

                            delay(500).then(() => {
                              tableData = mockTableBaseInfoOrderData.slice(start, end)
                              tableDynamicData.inLoading = false
                            })

                          }"

                          @columnClick="(name, row) => {
                            if(name === 'projectId') {
                              showTableProject.context = `${row.projectId} 被点击了`
                              showTableProject.isShow = true
                            }
                            if(name === 'bookUserName') {
                              showTableUser.context = `${row.bookUserName} 被点击了`
                              showTableUser.isShow = true
                            }
                          }"

                          @operationClick="(name, row) => {
                            if(name === 'detail') {
                              showTableOperation.context = `${row.projectHouseOrderId} 被点击详情了`
                              showTableOperation.isShow = true
                            }
                            if(name === 'delete') {
                              showTableOperation.context = `${row.projectHouseOrderId} 被点击删除了`
                              showTableOperation.isShow = true
                            }
                          }"
      />
    </div>


    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->


    <cask-dialog-judgment :dialog-judgment-data="{title: '和平星争夺战', content: '确认将卡布达设置为本次冠军吗',
                                                falseLabel: '取消', trueLabel: '确认'}"
                          :callback-method="(_) => { showDialog = false }"
                          v-model="showDialog"
    />
    <cask-dialog-judgment :dialog-judgment-data="{title: '表单数据列活动触发', content:`${showTableProject.context}`,
                                                falseLabel: '取消', trueLabel: '确认'}"
                          :callback-method="(_) => { showTableProject.isShow = false }"
                          v-model="showTableProject.isShow"
    />
    <cask-dialog-judgment :dialog-judgment-data="{title: '表单数据列用户触发', content:`${showTableUser.context}`,
                                                falseLabel: '取消', trueLabel: '确认'}"
                          :callback-method="(_) => { showTableUser.isShow = false }"
                          v-model="showTableUser.isShow"
    />
    <cask-dialog-judgment :dialog-judgment-data="{title: '表单操作列触发', content:`${showTableOperation.context}`,
                                                falseLabel: '取消', trueLabel: '确认'}"
                          :callback-method="(_) => { showTableOperation.isShow = false }"
                          v-model="showTableOperation.isShow"
    />

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
import CaskAnnouncementBlock from "@/ui/components/CaskAnnouncementBlock.vue";
import BadgeTips from "@/ui/components/BadgeTips.vue";
import CaskDialogJudgment from "@/ui/components/CaskDialogJudgment.vue";
import CaskComplexTable from "@/ui/components/CaskComplexTable.vue";
import {
  mockTableBaseInfoOrder,
  mockTableBaseInfoOrderData,
  mockTableBaseInfoOrderOperation
} from "@/mock/mock-table-data";
import {notifyTopNegative, notifyTopPositive} from "@/utils/notification-tools";
import {ComplexTableSortedStatus} from "@/constant/enums/component-enums";

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
const showDialog = ref(false)
const tableDynamicData = ref(
    {
      inLoading: false,
      pageNo: 1,
      pageSize: 10,
      dataSum: 6,
      multiple: false,
    }
)
const selectedData = ref([])
const tableData = ref(mockTableBaseInfoOrderData)
const showTableProject = ref({
  isShow: false,
  context: ""
})
const showTableUser = ref({
  isShow: false,
  context: ""
})
const showTableOperation = ref({
  isShow: false,
  context: ""
})
const operationFinish = () => {
  tableDynamicData.value.multiple = false;
  let ids = ""
  if (selectedData.value && selectedData.value.length > 0) {
    for (let obj of selectedData.value) {
      ids += (obj.projectHouseOrderId + ",")
    }
    notifyTopPositive(ids, 3000)
    selectedData.value = []
  } else {
    notifyTopNegative("no data selected", 3000)
  }
}


</script>

<style scoped lang="scss">


</style>