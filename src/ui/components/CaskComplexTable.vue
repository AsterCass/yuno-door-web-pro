<template>


  <!--todo 支持自动卡片形态-->
  <!--todo 支持图片放大-->
  <!--todo 支持显示列配置 （右上角加个螺丝）-->

  <q-table card-class="component-cask-complex-table-std"
           table-header-class="component-cask-complex-table-std-header"
           :loading="tableDynamicData.inLoading"
           :rows="tableData"
           :columns="tableBaseInfo.tableColumns"
           :row-key="tableBaseInfo.tableKey"
           :pagination="{rowsPerPage: 0}"
           v-model:selected="localMultiSelect"
  >
    <template v-slot:bottom>
      <div class="component-cask-complex-table-std-bottom">
        <div class="row justify-between items-center q-mx-lg">
          <div class="row justify-start items-center">
            <div>
              {{ $t('complex_table_page_size') }} :
            </div>
            <q-btn v-for="val in [5, 10, 20, 30, 50]" :key="val"
                   :class="pageSize === val ? 'component-cask-complex-table-std-bottom-contain' : ''"
                   flat round dense class="q-mx-sm" :label="val" @click="updatePageSize(val)"/>
          </div>
          <div class="row justify-end items-center">
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

    <template v-for="(thisSlot, index) in customSlot" :key="index" v-slot:[thisSlot.slotName]="props">
      <q-td :props="props">
        <div v-if="thisSlot.slotType === ComplexTableColumnTypeEnum.POINT"
             style="color: var(--pointer); cursor: pointer"
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
                 :src="props.row[`${thisSlot.name}WebImageUrl`]" fit="cover">
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
               style="color: var(--pointer); cursor: pointer; margin: 0 .2rem"
               @click="emit('operationClick', operation.name, props.row) ">
            {{ operation.label }}
          </div>
        </div>
      </q-td>
    </template>

  </q-table>


</template>


<script setup>

import {defineEmits, defineProps, onMounted, ref} from "vue";
import {ComplexTableColumnIconSiteEnum, ComplexTableColumnTypeEnum} from "@/constant/enums/component-enums";

const emit = defineEmits(['columnClick', 'operationClick', 'toNewPage']);
const props = defineProps({
  //表基本参数
  tableBaseInfo: {
    type: Object,
    required: true,
    default: () => {
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
      }
    },
  },
  //当前表存储数据
  tableData: {
    type: Array,
    required: false,
    default: () => [],
  },
})

let pageSize = ref(props.tableDynamicData.pageSize)
let pageNo = ref(props.tableDynamicData.pageNo)
let localMultiSelect = ref([])
let customSlot = ref([])

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
          imageSize: column.imageSize
        })
      }
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