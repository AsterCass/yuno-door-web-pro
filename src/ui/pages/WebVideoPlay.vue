<template>
  <q-layout view="hhh lpr fff">
    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
        CaskModuleElement.TOOL,
        CaskModuleElement.CHATROOM,
    ]"/>


    <div style="min-height: 50rem">
      hello | {{ vdoId }} | {{ colId }}
    </div>

    <cask-base-footer/>

  </q-layout>
</template>

<script setup>
import {CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {useI18n} from "vue-i18n";

const globalState = useGlobalStateStore();
const {t} = useI18n()


//prop
const props = defineProps({
  colId: {
    type: String,
    required: false,
    default: '',
  },
  vdoId: {
    type: String,
    required: false,
    default: '',
  },
})


</script>

<style scoped lang="scss">


</style>