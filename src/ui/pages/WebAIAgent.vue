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

        <div class="full-width row justify-between q-mt-md q-px-sm">
          <div>
            当前 CPU 设备在线状态：
          </div>
          <div v-if="cpuDeviceOnline" class="cask-color-positive">
            在线
          </div>
          <div v-else class="cask-color-negative">
            离线
          </div>
        </div>

        <div class="full-width row justify-between q-px-sm">
          <div>
            当前 GPU 设备在线状态：
          </div>
          <div v-if="gpuDeviceOnline" class="cask-color-positive">
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

          <q-separator class="component-separator-base"  spaced="1rem"/>

        </div>



        <q-scroll-area :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }"
                       class="col full-width q-px-sm" :visible="true">

          <div class="cask-color-negative">
            如果思考时间过久一般是由于当前有多人在测试，请稍后再进行尝试
          </div>

          <div style="opacity: .5;" class="q-mt-md ">
            本 Demo 优先使用 GPU 进行推理。由于性能预算限制，设备不能保证一直启动状态。
            如果要进行 Demo 测试，页面底部联系管理员开启设备以及穿透后正常进行工作，
            但是由于是消费级显卡，性能有限，结果仅供参考。
          </div>

          <div style="opacity: .5;" class="q-mt-md">
            GPU 设备一般在下午2点-7点在线
          </div>

          <div style="opacity: .5;" class="q-mt-md">
            当 GPU 设备不在线，默认使用服务器 CPU 进行推理，性能以及速度非常有限，
            并且只支持聊天模式，不支持右侧边栏的其他 AI Agent 工作流
          </div>

          <div style="opacity: .5;" class="q-mt-md">
            Demo 测试完后会接入聊天页面，支持对话
          </div>


        </q-scroll-area>


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
                    <CaskMarkdownRenderer :content="thisMessage.content"/>
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


      <div class="column" style="width: 15rem">
        <h6>
          <cask-badge-tips text="如果设备不在线则只能选择【聊天】模式，且使用CPU推理，性能非常有限，仅供参考。
【聊天】的【记录id】和其他工作模式不共享，因为运行机器不同"/>
          AI 工作模式：
        </h6>
        <div class="q-mb-md row">
          <q-radio v-model="agentModel" val="chat" label="聊天"
                   class="component-ratio-base" @update:model-value="updateAgentModel"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="agentModel" val="project" label="项目方案构建"
                   class="component-ratio-base" @update:model-value="updateAgentModel"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <q-radio v-model="agentModel" val="rag" label="知识库问答（开发中）"
                   class="component-ratio-base" @update:model-value="updateAgentModel"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
        </div>
        <div class="ai-agent-config col full-width full-height">
          <q-tab-panels class="full-height full-width bg-transparent" v-model="agentModel" animated>

            <q-tab-panel name="chat" class="full-width full-height">
              <div class="full-height full-width row items-center justify-center">
                <h5 style="opacity: .5">
                  无需配置项
                </h5>
              </div>
            </q-tab-panel>

            <q-tab-panel name="project">

              <q-scroll-area :thumb-style="globalState.curThemeName === 'dark' ?
                                       { background: 'white', width: '6px' } :
                                        { background: 'black', width: '6px' }"
                             class="full-height full-width" :visible="true">

                <div class="column items-center ">

                  <q-btn no-caps unelevated class="shadow-2 component-full-btn-long q-my-sm" push
                         @click="()=>{showProjectAvatar = true}">
                    配置虚拟人物资源
                  </q-btn>

                  <q-btn no-caps unelevated class="shadow-2 component-full-btn-long q-my-sm" push
                         @click="()=>{showProjectProduct = true}">
                    配置商品资源
                  </q-btn>

                  <q-btn no-caps unelevated class="shadow-2 component-full-btn-long q-my-sm" push
                         @click="()=>{showProjectComponent = true}">
                    配置宣传页面组件资源
                  </q-btn>

                </div>

                <div style="opacity: .5;" class="q-mt-md">
                  这里是工作流说明（生成方案说明以及推荐理由后，用户点击确认生成最后图片）
                </div>

              </q-scroll-area>
            </q-tab-panel>


            <q-tab-panel name="rag">

              <q-scroll-area :thumb-style="globalState.curThemeName === 'dark' ?
                                       { background: 'white', width: '6px' } :
                                        { background: 'black', width: '6px' }"
                             class="full-height full-width" :visible="true">

                <div class="column items-center ">

                  <q-btn no-caps unelevated class="shadow-2 component-full-btn-long q-my-sm" push
                         @click="()=>{showRagDoc = true}">
                    配置知识库文档
                  </q-btn>
                </div>

              </q-scroll-area>
            </q-tab-panel>

          </q-tab-panels>
        </div>


      </div>

    </div>

    <cask-base-footer :simple="true"/>


    <q-dialog :model-value="showProjectAvatar" @hide="()=>{showProjectAvatar= false}"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-std">

        <h5 style="font-weight: 600!important; margin-left: .5rem !important;">
          配置虚拟人物资源
        </h5>

        <q-separator class="component-separator-base" inset spaced="1rem"/>

        <div class="q-mx-lg q-mt-lg q-mb-xs">

          <div class="text-center">
            1234
          </div>

        </div>

      </q-card>
    </q-dialog>

    <q-dialog :model-value="showProjectProduct" @hide="()=>{showProjectProduct= false}"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-std">

        <h5 style="font-weight: 600!important; margin-left: .5rem !important;">
          配置商品资源
        </h5>

        <q-separator class="component-separator-base" inset spaced="1rem"/>

        <div class="q-mx-lg q-mt-lg q-mb-xs">

          <div class="text-center">
            1234
          </div>

        </div>

      </q-card>
    </q-dialog>

    <q-dialog :model-value="showProjectComponent" @hide="()=>{showProjectComponent= false}"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-std">

        <h5 style="font-weight: 600!important; margin-left: .5rem !important;">
          配置宣传页面组件资源
        </h5>

        <q-separator class="component-separator-base" inset spaced="1rem"/>

        <div class="q-mx-lg q-mt-lg q-mb-xs">

          <div class="text-center">
            1234
          </div>

        </div>

      </q-card>
    </q-dialog>

    <q-dialog :model-value="showRagDoc" @hide="()=>{showRagDoc= false}"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-std">

        <h5 style="font-weight: 600!important; margin-left: .5rem !important;">
          配置知识库文档
        </h5>

        <q-separator class="component-separator-base" inset spaced="1rem"/>

        <div class="q-mx-lg q-mt-lg q-mb-xs">

          <div class="text-center">
            1234
          </div>

        </div>

      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script setup>

import {CaskLongTextInputElement, CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {onMounted, ref} from "vue";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import CaskLongTextInput from "@/ui/components/CaskLongTextInput.vue";
import {AiMessageTypeEnum} from "@/constant/enums/ai-message-type";
import {clearHistory, isOnline, loadHistory} from "@/api/ai";
import CaskMarkdownRenderer from "@/ui/components/CaskMarkdownRenderer.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import CaskBadgeTips from "@/ui/components/CaskBadgeTips.vue";

// const
const globalState = useGlobalStateStore();
const BASE_ADD = process.env.VUE_APP_BASE_ADD
// components
const aiChatBodyScroller = ref(null)
const sendMessageEnable = ref(true)
const showProjectAvatar = ref(false)
const showProjectProduct = ref(false)
const showProjectComponent = ref(false)
const showRagDoc = ref(false)
// data
const agentModel = ref("chat")
const cpuDeviceOnline = ref(false)
const gpuDeviceOnline = ref(false)
const messageList = ref([])
const lastHumanInput = ref("")
const chatSessionId = ref("")

function updateAgentModel() {
  notifyTopPositive("工作模式切换成功，不同工作模式记忆暂时不兼容，已重新生成新对话记录id", 8000)
  resetRandomSessionId()
  messageList.value = []
}

function loadHistoryMethod() {
  if (!cpuDeviceOnline.value && !gpuDeviceOnline.value) {
    notifyTopWarning("设备均不在线，联系管理员开启设备")
    return
  }
  loadHistory({chatSessionId: chatSessionId.value, isCore: !gpuDeviceOnline.value}).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    messageList.value = res.data.data;
  })
}

function clearHistoryMethod() {
  if (!cpuDeviceOnline.value && !gpuDeviceOnline.value) {
    notifyTopWarning("设备均不在线，联系管理员开启设备")
    return
  }
  clearHistory({chatSessionId: chatSessionId.value, isCore: !gpuDeviceOnline.value}).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    messageList.value = []
  })
}

function isOnlineMethod() {
  isOnline({isCore: true}).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    cpuDeviceOnline.value = res.data.data;
  })
  isOnline({isCore: false}).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    gpuDeviceOnline.value = res.data.data;
  })
}


function resetRandomSessionId() {
  chatSessionId.value = Math.random().toString(36).substring(2, 10);
}

function sendMessage() {
  if (!cpuDeviceOnline.value && !gpuDeviceOnline.value) {
    notifyTopWarning("设备均不在线，联系管理员开启设备")
    return
  }
  const toSendStr = lastHumanInput.value
  lastHumanInput.value = ""
  sendMessageEnable.value = false
  messageList.value.unshift({type: AiMessageTypeEnum.HUMAN, content: toSendStr});
  messageList.value.unshift({type: AiMessageTypeEnum.AI, content: ""});

  const eventSource = new EventSource(
      `${BASE_ADD}yui/user/ai/stream?userInput=${toSendStr}
      &chatSessionId=${chatSessionId.value}&isCore=${!gpuDeviceOnline.value}`
  );

  eventSource.onmessage = (event) => {
    const data = event.data;

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

<style lang="scss">

.ai-agent-config {
  .q-tab-panel {
    padding: 0 !important;
  }
}


</style>