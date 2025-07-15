<template>
  <div>
    <q-dialog :model-value="showUserSpaceSetting" @hide="closeUserSpaceSetting"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-std row">
        <cask-tabs-vertical :tabs="tabs" v-model="tab"/>
        <div class="col" style="min-height: 20rem;">

        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>

import {useGlobalStateStore} from "@/utils/global-state";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {defineEmits, defineProps, ref, watch} from "vue";
import CaskTabsVertical from "@/ui/components/CaskTabsVertical.vue";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
})
const showUserSpaceSetting = ref(props.modelValue);

watch(() => props.modelValue, () => {
  if (props.modelValue) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
  }
  showUserSpaceSetting.value = props.modelValue
})

const {t} = useI18n()
const globalState = useGlobalStateStore();
const thisRouter = useRouter()


const tabs = ref([
  {
    value: 'mainToolsSql2kotlin',
    label: 'main_tools_title_sql_kotlin',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'mainToolsTimestamp',
    label: 'main_tools_title_timestamp',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'mainToolsQrcode',
    label: 'main_tools_title_qrcode',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'stretch',
    isStretch: true,
  },
  {
    value: 'mainToolsCnIdCard',
    label: 'main_tools_title_cn_id_card',
    color: 'rgb(var(--full-container-background-color))'
  },
])
const tab = ref("mainToolsSql2kotlin");

watch(thisRouter.currentRoute, () => {
  tab.value = thisRouter.currentRoute.value.name
});


function closeUserSpaceSetting() {
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = '';
  showUserSpaceSetting.value = false
  emit('update:modelValue', false);
}

</script>

<style scoped lang="scss">


</style>