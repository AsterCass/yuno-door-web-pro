<template>
  <q-layout view="hhh lpr fff">

    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
        CaskModuleElement.ARTICLE,
        CaskModuleElement.PLAY,
        CaskModuleElement.CHATROOM,
    ]"/>


    <cask-base-footer/>

  </q-layout>
</template>

<script setup>
import {CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const globalState = useGlobalStateStore();
const thisRouter = useRouter()


</script>

<style scoped lang="scss">


</style>