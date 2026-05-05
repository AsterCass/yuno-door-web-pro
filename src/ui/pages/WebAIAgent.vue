<template>
  <q-layout class="component-full-screen column" style="
  background-color: rgba(var(--background-color));background-image: url('/img/chatroom-bg.png');"
            view="hhh lpr fff">
    <cask-base-header :always-show="true" :center-elements="[
        CaskModuleElement.HOME,
    ]" :chatroom-select-first="true" :mini="true" :pre-suffix="''"/>


    <div class="col row" style="margin: 6rem 2% 1rem 2%">

      <div class="column items-center" style="width: 15rem">
        <q-btn no-caps unelevated class="shadow-2 component-full-btn-long" push
               @click="isOnlineMethod">
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
          <div v-if="deviceOnline" class="cask-color-positive">
            在线
          </div>
          <div v-else class="cask-color-negative">
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
            <q-btn no-caps unelevated class="shadow-2 component-full-btn-mini-grow" push
                   @click="loadHistoryMethod">
              载入对话
            </q-btn>
          </div>

          <q-btn no-caps unelevated class="shadow-2 q-mt-md component-full-btn-mini-error-full" push
                 @click="clearHistoryMethod">
            清除当前对话记录历史
          </q-btn>

          <div style="opacity: .5;" class="q-mt-sm">
            每天凌晨3点，自动清空所有对话历史记录
          </div>

        </div>


        <div class="col full-width">
        </div>


      </div>

      <div class="cask-ai-chatroom-chat-body col q-px-lg column" style="height: 100%">

        <div class="col">
          <div class="cask-ai-chatroom-chat-body-scroll-container" ref="aiChatBodyScroller">

            <div v-for="(thisMessage, index) in messageList"
                 :key="index" :style="0 === index
                  ? 'margin-bottom: 30px' : ''" class="q-my-sm q-mx-md">

              <div v-if="thisMessage.type === AiMessageTypeEnum.HUMAN" class="row justify-end">
                <div class="relative-position" style="margin-left: 15%;">
                  <div class="cask-chatroom-chat-body-mine">
                    {{ thisMessage.content }}
                  </div>
                </div>
              </div>

              <div v-else class="row justify-start">
                <div v-if="thisMessage.content" class="relative-position">
                  <div class="cask-chatroom-chat-body">
                    <CaskMarkdownRenderer :content="thisMessage.content" @img-click="handleImgClick"/>
                  </div>
                </div>
                <div v-else class="cask-chatroom-chat-body-thinking row items-center">
                  <q-spinner-bars size=".8rem"/>
                  <div class="q-mx-sm">
                    思考中
                  </div>
                  <q-spinner-bars size=".8rem"/>
                </div>
              </div>


            </div>

          </div>
        </div>


        <cask-long-text-input :elements="new Map([
                  [CaskLongTextInputElement.EMOJI, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
                  [CaskLongTextInputElement.CALL, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],])"
                              :sendCallback="sendMessage"
                              v-model="lastHumanInput"
                              @update:model-value="data => lastHumanInput = data"
                              :send-enable="sendMessageEnable"
        />
      </div>


      <div class="column items-center" style="width: 15rem">

      </div>

    </div>

    <cask-base-footer :simple="true"/>

  </q-layout>
</template>

<script setup>

import {CaskLongTextInputElement, CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {onMounted, ref} from "vue";
import {notifyTopWarning} from "@/utils/notification-tools";
import CaskLongTextInput from "@/ui/components/CaskLongTextInput.vue";
import {AiMessageTypeEnum} from "@/constant/enums/ai-message-type";
import {clearHistory, isOnline, loadHistory} from "@/api/ai";
import CaskMarkdownRenderer from "@/ui/components/CaskMarkdownRenderer.vue";

// const
const BASE_ADD = process.env.VUE_APP_BASE_ADD
// components
const aiChatBodyScroller = ref(null)
const sendMessageEnable = ref(true)
// data
const deviceOnline = ref(false)
const messageList = ref([])
const lastHumanInput = ref("")
const chatSessionId = ref("")

function handleImgClick(src) {
  console.log(src);
}

function loadHistoryMethod() {
  loadHistory({chatSessionId: chatSessionId.value}).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    messageList.value = res.data.data;
  })
}

function clearHistoryMethod() {
  clearHistory({chatSessionId: chatSessionId.value}).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    messageList.value = []
  })
}

function isOnlineMethod() {
  isOnline().then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    deviceOnline.value = res.data.data;
  })
}


function resetRandomSessionId() {
  chatSessionId.value = Math.random().toString(36).substring(2, 10);
}

function sendMessage() {
  const toSendStr = lastHumanInput.value
  lastHumanInput.value = ""
  sendMessageEnable.value = false
  messageList.value.unshift({type: AiMessageTypeEnum.HUMAN, content: toSendStr});
  messageList.value.unshift({type: AiMessageTypeEnum.AI, content: ""});

  const eventSource = new EventSource(
      `${BASE_ADD}yui/user/ai/stream?userInput=${toSendStr}&chatSessionId=${chatSessionId.value}`
  );

  eventSource.onmessage = (event) => {
    const data = event.data.trim();

    if (data === '[[DONE]]') {
      eventSource.close();
      sendMessageEnable.value = true;
      return;
    }

    if (data.startsWith('[[ERROR]]')) {
      eventSource.close();
      sendMessageEnable.value = true;
      return;
    }

    messageList.value[0].content += data
  };

  eventSource.onerror = () => {
    eventSource.close();
    sendMessageEnable.value = true;
  };

}

onMounted(() => {
  resetRandomSessionId()
  isOnlineMethod()
})

</script>

<style scoped lang="scss">

.cask-ai-chatroom-chat-body {


  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(var(--text-color-select));
  }

  .cask-ai-chatroom-chat-body-scroll-container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;


    .cask-chatroom-chat-body-mine {
      border-radius: 8px;
      padding: 8px;
      background-color: rgba(var(--positive), 0.92);
      cursor: zoom-in;
      color: #eee;
      overflow-wrap: break-word;
      word-break: break-word;
      white-space: break-spaces;
    }

    .cask-chatroom-chat-body {
      border-radius: 8px;
      padding: 12px 12px 2px 12px;
      background-color: rgba(var(--text-color), 0.1);
      cursor: zoom-in;
      overflow-wrap: break-word;
      word-break: break-all;
    }

    .cask-chatroom-chat-body-thinking {
      border-radius: 8px;
      padding: 12px 12px 12px 12px;
      background-color: rgba(var(--text-color), 0.1);
      cursor: zoom-in;
      overflow-wrap: break-word;
      word-break: break-all;
    }
  }
}



</style>