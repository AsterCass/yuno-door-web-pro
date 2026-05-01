<template>
  <q-layout class="component-full-screen column" style="
  background-color: rgba(var(--background-color));background-image: url('/img/chatroom-bg.png');"
            view="hhh lpr fff">
    <cask-base-header :always-show="true" :center-elements="[
        CaskModuleElement.HOME,
    ]" :chatroom-select-first="true" :mini="true" :pre-suffix="''"/>


    <div class="col row" style="margin: 6rem 2% 1rem 2%">

      <div class="column items-center" style="width: 15rem">
        <q-btn no-caps unelevated class="shadow-2 component-full-btn-long">
          检查设备在线情况
        </q-btn>
        <div style="opacity: .5; white-space: pre-wrap;" class="q-mt-md q-mx-sm">
          本Demo使用的内网设备，消费级显卡进行推理。由于性能预算限制，设备不能保证一直启动状态。
          如果要进行Demo测试，页面底部联系管理员开启设备以及穿透后正常进行工作，
          但是由于是消费级显卡，性能有限，结果仅供参考
        </div>
        <div class="full-width row justify-between q-mt-md q-px-sm">
          <div>
            当前设备在线状态：
          </div>
          <div class="cask-color-negative">
            离线
          </div>
        </div>
      </div>

      <div class="col">

      </div>

    </div>

    <cask-base-footer :simple="true"/>

  </q-layout>
</template>

<script setup>

import {CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
</script>

<style scoped lang="scss">

</style>