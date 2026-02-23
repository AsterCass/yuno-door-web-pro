<template>
  <q-layout class="component-full-screen column" style="
  background-color: rgba(var(--background-color));background-image: url('/img/chatroom-bg.png');"
            view="hhh lpr fff">
    <cask-base-header :always-show="true" :center-elements="[
        CaskModuleElement.HOME,
    ]" :chatroom-select-first="true" :mini="true"/>


    <div class="col row" style="margin: 5rem 2% 5rem 2%">


    </div>

    <cask-base-footer :simple="true"/>

  </q-layout>
</template>

<script setup>
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {CaskModuleElement} from "@/constant/enums/component-enums";
import {useGlobalStateStore} from "@/utils/global-state";

const globalState = useGlobalStateStore();


</script>

<style lang="scss" scoped>

.wheel-container {
  overflow: hidden;
  height: 95%;
  aspect-ratio: 1;
}


</style>