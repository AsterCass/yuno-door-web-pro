<template>

  <!--todo 支持自动卡片形态-->

  <div class="row">
    <q-table card-class="col-12 component-cask-complex-table-std"
             table-header-class="component-cask-complex-table-std-header"
             :loading="tableDynamicData.inLoading"
             :rows="tableData"
             :columns="tableBaseInfo.tableColumns"
             :row-key="tableBaseInfo.tableKey"
             :pagination="{rowsPerPage: 0}"
             v-model:selected="selectedData"
             class="shadow-0"
             :selection="tableBaseInfo.selectType"
             :visible-columns="visibleColumns"
             @update:selected="updateSelect"
    >

      <template v-slot:header-selection="scope">
        <q-checkbox v-show="tableDynamicData.multiple" keep-color
                    v-model="scope.selected"/>
      </template>

      <template v-slot:body-selection="scope">
        <q-checkbox v-show="tableDynamicData.multiple" keep-color
                    v-model="scope.selected"/>
      </template>

      <template v-slot:bottom="props">
        <div class="component-cask-complex-table-std-bottom">
          <div class="row justify-between items-center q-mx-lg">
            <div class="row justify-start items-center q-mb-md">
              <div>
                {{ $t('complex_table_page_size') }} :
              </div>
              <q-btn v-for="val in [5, 10, 20, 30, 50]" :key="val"
                     :class="pageSize === val ? 'component-cask-complex-table-std-bottom-contain shadow-2' : ''"
                     flat round dense class="q-mx-sm" :label="val" @click="updatePageSize(val)"/>
            </div>

            <div class="row justify-end items-center q-mb-md">
              <q-btn v-if="tableBaseInfo.showTableSetting" no-caps unelevated
                     class="q-mr-md component-none-btn-grow no-padding">
                <div class="row items-center q-ma-sm">
                  <q-icon name="fa-solid fa-gear" size="1.1rem"/>
                </div>
                <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                               style="background-color:transparent; border:0;
                               box-shadow: none; backdrop-filter: none">
                  <div class="row component-cask-complex-table-std-setting q-pa-md">
                    <div class="col-12 cask-simple-quoted-title q-mb-md"
                         style="font-size: .95rem;  opacity: .9">
                      {{ $t('complex_table_change_column_visible') }}
                    </div>

                    <div class="col-12">
                      <q-checkbox v-for="(thisSlot, index) in allRowSlot" :key="index"
                                  v-model="thisSlot.visible" checked-icon="task_alt"
                                  unchecked-icon="panorama_fish_eye" :label="thisSlot.label"
                                  @update:model-value="(val) => updateColVisible(thisSlot, val)"
                      />
                    </div>

                    <div class="col-12 cask-simple-quoted-title q-my-md"
                         style="font-size: .95rem;  opacity: .9">
                      {{ $t('complex_table_more_setting') }}
                    </div>
                    <div class="q-mx-xs">
                      {{ $t('in_develop') }}
                    </div>
                  </div>
                </q-popup-proxy>
              </q-btn>
              <q-btn v-if="tableBaseInfo.showFullSize" no-caps unelevated
                     class="q-mr-md component-none-btn-grow no-padding"
                     @click="props.toggleFullscreen">
                <div class="row items-center q-ma-sm">
                  <q-icon :name="props.inFullscreen ? 'fa-solid fa-compress' : 'fa-solid fa-expand'" size="1.1rem"/>
                </div>
              </q-btn>
              <div class="q-mr-md">
                {{ $t('complex_table_total_data') }} : {{ tableDynamicData.dataSum }}
              </div>
              <div>
                <q-pagination
                    v-model="pageNo" :max="Math.ceil(tableDynamicData.dataSum / pageSize)" :max-pages="8"
                    boundary-numbers directionLinks size=".85rem"
                    @update:modelValue="toNewPage()"
                />
              </div>
            </div>
          </div>
          <div class="component-cask-complex-table-std-bottom-line"/>
        </div>
      </template>

      <template v-slot:no-data>
        <div class="full-width row flex-center q-mt-md q-mb-lg items-center">
          <q-icon size="18px" class="q-mr-sm" name="fa-regular fa-folder-open"/>
          <h6>
            {{ $t('complex_table_no_data') }}
          </h6>
        </div>
      </template>

      <template v-for="(thisSlot, index) in allRowSlot" :key="index" v-slot:[thisSlot.slotName]>
        <th :class="`text-${thisSlot.align}`">
          {{ thisSlot.label }}
          <q-icon v-if="thisSlot.sortableLite" name="fa-solid fa-sort-up" size="16px"
                  style="margin-bottom: 3px; transition: opacity 0.3s ease;"
                  :style="ComplexTableSortedStatus.ASC === thisSlot.sortStatus ? 'opacity: 1' : 'opacity: .5'"/>
          <q-icon v-if="thisSlot.sortableLite" name="fa-solid fa-sort-down" size="16px" class="cursor-pointer"
                  style="margin-left: -16px; margin-bottom: 3px; transition: opacity 0.3s ease;"
                  :style="ComplexTableSortedStatus.DESC === thisSlot.sortStatus ? 'opacity: 1' : 'opacity: .5'"
                  @click="doSort(thisSlot.name)"/>
        </th>
      </template>

      <template v-for="(thisSlot, index) in customSlot" :key="index" v-slot:[thisSlot.slotName]="props">
        <q-td :props="props">
          <div v-if="thisSlot.slotType === ComplexTableColumnTypeEnum.POINT"
               style="color: rgb(var(--pointer)); cursor: pointer"
               @click="emit('columnClick', thisSlot.name, props.row)">
            {{ props.row[thisSlot.name] }}
          </div>
          <div class="row justify-center items-center"
               v-else-if="thisSlot.slotType === ComplexTableColumnTypeEnum.ICON_COLOR"
               :style="`color: ${props.row[`${thisSlot.name}WebColorName`]}`">

            <q-icon v-if="props.row[`${thisSlot.name}WebIconName`]
          && thisSlot.iconSite === ComplexTableColumnIconSiteEnum.START"
                    :name="props.row[`${thisSlot.name}WebIconName`]" style="margin-right: 2px"/>
            <div>
              {{ props.row[thisSlot.name] }}
            </div>
            <q-icon v-if="props.row[`${thisSlot.name}WebIconName`]
          && thisSlot.iconSite === ComplexTableColumnIconSiteEnum.End"
                    :name="props.row[`${thisSlot.name}WebIconName`]" style="margin-left: 2px"/>
          </div>
          <div v-else-if="thisSlot.slotType === ComplexTableColumnTypeEnum.IMAGE">
            <q-img :style="thisSlot.imageSize ? `height: ${thisSlot.imageSize}; width: ${thisSlot.imageSize}` : ''"
                   :src="props.row[`${thisSlot.name}WebImageUrl`]" fit="cover" class="cursor-pointer"
                   @click="showImgSrc = props.row[`${thisSlot.name}WebImageUrl`];  showImg = true; ">
              <template v-slot:loading>
                <q-spinner size="1rem"/>
              </template>
            </q-img>
          </div>
          <div v-else>
            {{ props.row[thisSlot.name] }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-operation="props">
        <q-td :props="props">
          <div class="row justify-center">
            <div v-show="!operation.condition ||  props.row[operation.condition]"
                 v-for="(operation, index) in customTableOperation" :key="index"
                 style="color: rgb(var(--pointer)); cursor: pointer; margin: 0 .2rem"
                 @click="emit('operationClick', operation.name, props.row) ">
              {{ operation.label }}
            </div>
          </div>
        </q-td>
      </template>

    </q-table>

    <cask-dialog-image v-model="showImg" :src="showImgSrc"/>

  </div>


</template>


<script setup>

import {defineEmits, defineProps, onMounted, ref, watch} from "vue";
import {
  ComplexTableColumnIconSiteEnum,
  ComplexTableColumnTypeEnum,
  ComplexTableSortedStatus
} from "@/constant/enums/component-enums";
import CaskDialogImage from "@/ui/components/CaskDialogImage.vue";
import {notifyTopWarning} from "@/utils/notification-tools";
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const emit = defineEmits(['columnClick', 'operationClick', 'toNewPage', 'toSort', 'multipleUpdate']);
const props = defineProps({
  //表基本参数
  tableBaseInfo: {
    type: Object,
    required: true,
    default: () => {
      return {
        tableColumns: [],
        tableKey: "",
        selectType: "",
        showFullSize: true,
        showVisibleCol: true,
      }
    },
  },
  //表操作按键
  customTableOperation: {
    type: Array,
    required: false,
    default: () => [],
  },
  //表动态参数
  tableDynamicData: {
    type: Object,
    required: false,
    default: () => {
      return {
        inLoading: false,
        pageNo: 1,
        pageSize: 10,
        dataSum: 0,
        multiple: false,
      }
    },
  },
  //当前表存储数据
  tableData: {
    type: Array,
    required: false,
    default: () => [],
  },
  //多选
  multipleSelectData: {
    type: Array,
    required: false,
    default: () => [],
  }
})

const pageSize = ref(props.tableDynamicData.pageSize)
const pageNo = ref(props.tableDynamicData.pageNo)
const selectedData = ref(props.multipleSelectData)
const customSlot = ref([])
const allRowSlot = ref([])
const showImg = ref(false)
const showImgSrc = ref("")
const visibleColumns = ref([])

watch(() => props.multipleSelectData, () => {
  selectedData.value = props.multipleSelectData
})

const toNewPage = () => {
  emit('toNewPage', {pageNo: pageNo.value, pageSize: pageSize.value})
}

const buildCustomSlot = () => {
  if (props.tableBaseInfo && props.tableBaseInfo.tableColumns
      && props.tableBaseInfo.tableColumns.length > 0) {
    for (const column of props.tableBaseInfo.tableColumns) {
      if (column.type && column.type !== ComplexTableColumnTypeEnum.DEFAULT) {
        customSlot.value.push({
          name: column.name,
          slotName: `body-cell-${column.name}`,
          slotType: column.type,
          iconSite: column.iconSite ? column.iconSite : ComplexTableColumnIconSiteEnum.START,
          imageSize: column.imageSize,
        })
      }
      allRowSlot.value.push({
        align: column.align ? column.align : 'center',
        name: column.name,
        label: column.label,
        slotName: `header-cell-${column.name}`,
        sortableLite: column.sortableLite,
        sortStatus: ComplexTableSortedStatus.DEFAULT,
        visible: true,
      })
      visibleColumns.value.push(column.name)
    }
  }
}

const updateSelect = () => {
  emit('multipleUpdate', selectedData.value)
}

const updateColVisible = (col, val) => {
  if (visibleColumns.value.length <= 1 && val === false) {
    notifyTopWarning(t('complex_table_at_least_column'))
    col.visible = true
    return
  }
  if (val && !visibleColumns.value.includes(col.name)) {
    visibleColumns.value.push(col.name)
  }
  if (!val && visibleColumns.value.includes(col.name)) {
    visibleColumns.value = visibleColumns.value.filter(str => str !== col.name);
  }

}

const doSort = (name) => {
  for (const column of allRowSlot.value) {
    if (column.name === name) {
      column.sortStatus = (column.sortStatus + 1) % 3
      emit('toSort', name, column.sortStatus)
    } else {
      column.sortStatus = ComplexTableSortedStatus.DEFAULT
    }
  }
}

const updatePageSize = (updatePageSize) => {
  pageSize.value = updatePageSize;
  pageNo.value = 1
  toNewPage()
}

onMounted(() => {
  buildCustomSlot()
})


</script>

<style lang="scss">
@import "@fontsource/roboto-slab/index.css";
@import "@/styles/base-components";
@import "@/styles/independence-components";


</style>