<template>


  <q-table card-class="astercasc-simple-table-pri"
           table-header-class="astercasc-simple-table-header-pri"
           :loading="tableWatchData.inLoading"
           :rows="tableData"
           :columns="tableBaseInfo.tableColumns"
           :row-key="tableBaseInfo.tableKey"
           :pagination="{rowsPerPage: 0}"
           :selection="tableBaseInfo.selectType"
           v-model:selected="localMultiSelect"
  >
    <template v-slot:bottom>
      <div class="astercasc-simple-table-bottom-pri">

        <div class="row justify-between items-center q-mx-lg">
          <div class="row justify-start items-center">
            <div>
              单页容量：
            </div>
            <q-btn :class="pageSize === 5 ? 'astercasc-simple-table-bottom-selected-contain' : ''"
                   flat round dense class="q-mx-sm" label="5" @click="updatePageSize(5)"/>
            <q-btn :class="pageSize === 10 ? 'astercasc-simple-table-bottom-selected-contain' : ''"
                   flat round dense class="q-mx-sm" label="10" @click="updatePageSize(10)"/>
            <q-btn :class="pageSize === 20 ? 'astercasc-simple-table-bottom-selected-contain' : ''"
                   flat round dense class="q-mx-sm" label="20" @click="updatePageSize(20)"/>
            <q-btn :class="pageSize === 30 ? 'astercasc-simple-table-bottom-selected-contain' : ''"
                   flat round dense class="q-mx-sm" label="30" @click="updatePageSize(30)"/>
            <q-btn :class="pageSize === 50 ? 'astercasc-simple-table-bottom-selected-contain' : ''"
                   flat round dense class="q-mx-sm" label="50" @click="updatePageSize(50)"/>
          </div>


          <div class="row justify-end items-center">
            <div class="q-mr-md">
              数据总条数：{{ tableDataSum }}
            </div>
            <div>
              <q-pagination
                  v-model="pageNo" :max="Math.ceil(tableDataSum / pageSize)" :max-pages="8"
                  boundary-numbers directionLinks size=".85rem"
                  @update:modelValue="toNewPage()"
              />
            </div>
          </div>
        </div>
        <div class="astercasc-simple-table-bottom-line"/>
      </div>
    </template>

    <template v-slot:header-selection="scope">
      <q-checkbox class="astercasc-header-checkbox" keep-color v-model="scope.selected"/>
    </template>

    <template v-slot:no-data>
      <div class="full-width row flex-center q-mt-md q-mb-lg items-center">
        <q-icon size="1.2rem" class="q-mr-sm" name="fa-solid fa-triangle-exclamation"/>
        <h6>
          无可获得数据
        </h6>
      </div>
    </template>

    <template v-for="(thisSlot, index) in customSlot" :key="index" v-slot:[thisSlot.slotName]="props">
      <q-td :props="props">
        <div v-if="thisSlot.type === ComplexTableColumnEnum.POINTED" style="color: #1976D2; cursor: pointer"
             @click="emitter.emit(thisSlot.emitStr, props.row)">
          {{ props.row[thisSlot.name] }}
        </div>
        <div v-else-if="thisSlot.type === ComplexTableColumnEnum.STYLE"
             :style="thisSlot.style[props.row[thisSlot.name]].style">
          {{ thisSlot.style[props.row[thisSlot.name]].content }}
        </div>
        <div v-else-if="thisSlot.type === ComplexTableColumnEnum.EDIT_ICON">
          <div class="row justify-center items-center">
            <div>
              {{ props.row[thisSlot.name] }}
            </div>
            <q-btn class="q-mx-xs" round size=".5rem" dense flat icon="fa-solid fa-pen-to-square"
                   style="color: #1976D2"
                   @click="emitter.emit(thisSlot.emitStr, props.row)"/>
          </div>
        </div>
        <div v-else>
          {{ props.row[thisSlot.name] }}
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-operation="props">
      <q-td :props="props">
        <div class="row justify-center">
          <div v-show="!operation.showCondition ||  props.row[operation.showCondition]"
               v-for="(operation, index) in customTableOperation" :key="index"
               style="color: #1976D2; cursor: pointer; margin: 0 .2rem"
               @click="emitter.emit(operation.emitStr, props.row)">
            {{ operation.label }}
          </div>
        </div>

      </q-td>
    </template>

  </q-table>


</template>


<script setup>

import {defineProps, ref} from "vue";


const props = defineProps({
  tableBaseInfo: {
    type: Object,
    required: true,
    default: () => {
    },
  },
  customSlot: {
    type: Array,
    required: false,
    default: () => [],
  },
  customTableOperation: {
    type: Array,
    required: false,
    default: () => [],
  },
  tableWatchData: {
    type: Object,
    required: false,
    default: () => {
      return {inLoading: false}
    },
  },
  tableData: {
    type: Array,
    required: false,
    default: () => [],
  },
  tableDataSum: {
    type: Number,
    required: false,
    default: 0,
  },
})

let pageSize = ref(10)
let pageNo = ref(1)
let localMultiSelect = ref([])

</script>

<style lang="scss">
@import "@fontsource/roboto-slab/index.css";
@import "@/styles/base-components";
@import "@/styles/independence-components";


</style>