<template>
  <q-layout class="component-full-screen column" style="
  background-color: rgba(var(--background-color));background-image: url('/img/chatroom-bg.png');"
            view="hhh lpr fff">
    <cask-base-header :always-show="true" :center-elements="[
        CaskModuleElement.HOME,
    ]" :chatroom-select-first="true" :mini="true" :pre-suffix="''"/>


    <div class="col row" style="margin: 6rem 2% 1rem 2%">

      <div class="column items-center" style="width: 15rem">
        <q-btn no-caps unelevated class="shadow-2 component-full-btn-long" push>
          检查设备在线情况
        </q-btn>

        <div style="opacity: .5;" class="q-mt-md q-mx-sm">
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

        <div class="full-width q-mt-md q-px-sm">
          <div>
            对话记录id：
          </div>
          <div style="opacity: .5;">
            对话记录id一致则可以载入相同的对话的历史记录
          </div>
          <q-input v-model="chatSessionId" tabindex="0" dense outlined
                   class="q-mt-sm component-outline-input-grow">
          </q-input>
          <div class="row justify-between q-mt-md">
            <q-btn no-caps unelevated class="shadow-2 component-full-btn-mini-grow"
                   push @click="resetRandomSessionId">
              重新随机
            </q-btn>
            <q-btn no-caps unelevated class="shadow-2 component-full-btn-mini-grow" push>
              重新载入
            </q-btn>
          </div>

          <q-btn no-caps unelevated class="shadow-2 q-mt-md component-full-btn-mini-error-full" push>
            清除当前对话记录历史
          </q-btn>

          <div style="opacity: .5;" class="q-mt-sm">
            每天凌晨3点，自动清空所有对话历史记录
          </div>

        </div>


        <div class="col full-width">
        </div>


      </div>

      <div class="col">

      </div>


      <div class="column items-center" style="width: 15rem">

      </div>

    </div>

    <cask-base-footer :simple="true"/>

  </q-layout>
</template>

<script setup>

import {CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {onMounted, ref} from "vue";


const newMessages = ref("")
const newInput = ref("")
const chatSessionId = ref("")

function resetRandomSessionId() {
  chatSessionId.value = Math.random().toString(36).substring(2, 10);
}

function getMessages() {

  const eventSource = new EventSource(
      `http://localhost:8004/user/ai/stream?userInput=${newInput.value}&chatSessionId=${chatSessionId.value}`
  );

  eventSource.onmessage = (event) => {
    const data = event.data.trim();

    if (data === '[[DONE]]') {
      eventSource.close();
      return;
    }

    if (data.startsWith('[[ERROR]]')) {
      eventSource.close();
      return;
    }

    newMessages.value += data;
  };

  eventSource.onerror = (err) => {
    // console.warn('EventSource 错误:', err);
    // eventSource.close();
  };

  eventSource.onopen = () => {
    // console.log('EventSource 已连接');
  };
}

onMounted(() => {
  resetRandomSessionId()
})

</script>

<style scoped lang="scss">

</style>