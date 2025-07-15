<template>
  <div>
    <q-dialog :model-value="showUserSpaceSetting" @hide="closeUserSpaceSetting"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-std row" style="max-width: 2000px !important">
        <cask-tabs-vertical :tabs="tabs" v-model="tab" width="12rem" text-width="10rem"/>
        <div class="col row" style="min-height: 30rem;">
          <q-separator class="component-separator-base q-mx-lg" vertical/>
          <q-tab-panels v-model="tab" animated class="bg-transparent col" transition-duration="500"
                        transition-prev="jump-down" transition-next="jump-up">
            <q-tab-panel name="base" style="min-width: 30rem; padding: 0">
              1111
            </q-tab-panel>
            <q-tab-panel name="pro" style="min-width: 30rem; padding: 0">
              2222
            </q-tab-panel>
            <q-tab-panel name="sec" style="min-width: 30rem; padding: 0">
              3333
            </q-tab-panel>
            <q-tab-panel name="account" style="min-width: 30rem; padding: 0">
              4444
            </q-tab-panel>
          </q-tab-panels>
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
    value: 'base',
    label: 'main_space_setting_profile',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'pro',
    label: 'main_space_setting_developer',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'sec',
    label: 'main_space_setting_privacy',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'stretch',
    isStretch: true,
  },
  {
    value: 'account',
    label: 'main_space_setting_account',
    color: 'rgb(var(--full-container-background-color))'
  },
])
const tab = ref("base");

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