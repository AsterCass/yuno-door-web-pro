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
            当前设备在线状态：
          </div>
          <div v-if="cpuDeviceOnline" class="cask-color-positive">
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

          <div style="opacity: .5;" class="q-mt-md">
            Demo 测试完后会接入聊天页面，支持对话
          </div>

          <div class="cask-color-negative q-mt-md">
            如果很快失败，并提示稍后重试，一般是由于 CPU 跑小模型导致的幻觉数据没有通过验证，请直接重新发送消息即可
            （正常来说大模型不会出现这个问题，而且即使出现也可以加入异常节点循环机制，这里是 Demo 就不加了）
          </div>


        </q-scroll-area>


      </div>

      <div class="cask-ai-chatroom-chat-body col q-px-lg column" style="height: 100%">

        <div class="col">
          <div class="cask-ai-chatroom-chat-body-scroll-container" ref="aiChatBodyScroller">

            <div v-if="!sendMessageEnable" class="q-ml-md row items-center cask-color-pointer" >
              <q-spinner-bars size=".8rem"/>
              <div class="q-mx-sm">
                思考中
              </div>
              <q-spinner-bars size=".8rem"/>
            </div>


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


      <div class="column" style="width: 20rem">
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
          <q-radio v-model="agentModel" val="rag" label="知识库问答"
                   class="component-ratio-base" @update:model-value="updateAgentModel"
                   checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
        </div>
        <div class="ai-agent-config col full-width full-height">
          <q-tab-panels class="full-height full-width bg-transparent" v-model="agentModel" animated>

            <q-tab-panel name="chat" class="full-width full-height column">
              <div style="opacity: .5;" class="q-ml-sm">
                本模式流式工作
              </div>
              <div class="col full-width row items-center justify-center">
                <h5 style="opacity: .5">
                  无需配置项
                </h5>
              </div>

            </q-tab-panel>

            <q-tab-panel name="project">

              <q-scroll-area :thumb-style="globalState.curThemeName === 'dark' ?
                                       { background: 'white', width: '6px' } :
                                        { background: 'black', width: '6px' }"
                             class="full-height full-width q-px-md" :visible="true">

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
                         @click="()=>{showProjectBg = true}">
                    配置宣传页面背景资源
                  </q-btn>

                </div>

                <div style="opacity: .5;" class="q-mt-md">
                  本模式非流式工作
                </div>

                <div style="opacity: .5;" class="q-mt-md">
                  本智能体工作流为：给出推广项目的自然语言描述，自动选择资源库中的人物资源以及合适商品资源，以及背景资源，并完成内容脚本。
                  后续对话可以针对相关输出进行调整，最终确认后，重置当前工作流状态
                  （实际正常为调用外部接口或者导出相关内容，这里演示，故而仅总结项目并重置状态）
                </div>

                <div class="q-mt-md cask-color-negative">
                  示例输入：帮我创建一个面向年轻女性的新品推广内容项目，风格要轻松、有种草感，预算控制在 300 元以内
                </div>

                <div class="q-mt-md">
                  演示截图：
                  <a class="cask-jump-link-in-text"
                     target="_blank"
                     href='https://api.astercasc.com/public/resources/agent/demo1.png'>
                   截图1
                  </a>
                  &nbsp;&nbsp;
                  <a class="cask-jump-link-in-text"
                     target="_blank"
                     href='https://api.astercasc.com/public/resources/agent/demo2.png'>
                    截图2
                  </a>
                </div>


                <div style="opacity: .5;" class="q-mt-md">
                  这里仅为演示，所以不存储资源数据在服务端，直接前端传入，也因此不处理对话过程中的配置修改。
                  仅在成功创建的项目的对话将所有配置资源统一传入服务端分析。
                  除非项目创建完成，开始新一轮项目，否则后续对话不再观察资源配置的变换
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

                  <div class="q-mt-md">
                    本模式还在开发中
                  </div>

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
      <q-card class="component-cask-dialog-judgement-large column">

        <h5 style="font-weight: 600!important; margin-left: .5rem !important;">
          配置虚拟人物资源
        </h5>

        <div style="opacity: .5; margin-left: .5rem">
          只会从勾选的资源当中选择合适的人物构建项目
        </div>

        <q-separator class="component-separator-base" inset spaced="1rem"/>

        <q-scroll-area :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }"
                       class="col full-width q-px-sm " :visible="true">
          <div class="row">
            <div v-for="(avatar, index) in avatarList" :key="index"
                 class="q-ml-sm q-mt-sm q-mb-lg q-mr-md column items-center"
                 @click="()=>{avatar.enable = !avatar.enable}">
              <div class="relative-position cask-cursor-pointer q-mb-md">
                <q-img :ratio="1" fit="contain" :src="avatar.url"
                       style="height: 14rem; width: 14rem; border-radius: 8px;"
                       :style="avatar.enable ? 'outline: 4px solid rgb(var(--positive));': ''"
                >
                </q-img>
                <div v-if="avatar.enable" class="cask-ai-chatroom-switch-btn">
                  <q-icon size="20px" name="fa-solid fa-circle-check" style="color: rgb(var(--positive));"/>
                </div>
              </div>
              <div>
                {{ avatar.name }}
              </div>

            </div>
          </div>

        </q-scroll-area>

      </q-card>
    </q-dialog>

    <q-dialog :model-value="showProjectProduct" @hide="()=>{showProjectProduct= false}"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-large column">

        <div class="row justify-between items-center">

          <h5 style="font-weight: 600!important; margin-left: .5rem !important;">
            配置商品资源
          </h5>

          <q-btn no-caps unelevated class="shadow-2 component-full-btn-mini-grow q-mr-md"
                 push @click="()=>{showNewProduct = true}">
            新增
          </q-btn>
        </div>

        <div style="opacity: .5; margin-left: .5rem">
          只会从勾选的资源当中选择合适的商品构建项目
        </div>

        <q-separator class="component-separator-base" inset spaced="1rem"/>

        <q-scroll-area :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }"
                       class="col full-width q-px-sm " :visible="true">
          <div v-for="(product, index) in productList" :key="index">
            <div class="row items-center">
              <h6 class="col text-center">
                {{ product.name }}
              </h6>
              <div class="col text-center">
                {{ product.price }}&nbsp;元
              </div>
              <div class="col row justify-center">
                <q-checkbox v-model="product.enable" class="component-ratio-base"
                            checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
              </div>

            </div>
          </div>

        </q-scroll-area>

      </q-card>
    </q-dialog>

    <q-dialog :model-value="showProjectBg" @hide="()=>{showProjectBg= false}"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-large column">

        <h5 style="font-weight: 600!important; margin-left: .5rem !important;">
          配置宣传页面背景资源
        </h5>

        <div style="opacity: .5; margin-left: .5rem">
          只会从勾选的资源当中选择合适的背景构建项目
        </div>

        <q-separator class="component-separator-base" inset spaced="1rem"/>

        <q-scroll-area :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }"
                       class="col full-width q-px-sm " :visible="true">
          <div class="row">
            <div v-for="(bg, index) in bgList" :key="index"
                 class="q-ml-sm q-mt-sm q-mb-lg q-mr-md column items-center"
                 @click="()=>{bg.enable = !bg.enable}">
              <div class="relative-position cask-cursor-pointer q-mb-md">
                <q-img :ratio="1" fit="contain" :src="bg.url"
                       style="height: 14rem; width: 14rem; border-radius: 8px;"
                       :style="bg.enable ? 'outline: 4px solid rgb(var(--positive));': ''"
                >
                </q-img>
                <div v-if="bg.enable" class="cask-ai-chatroom-switch-btn">
                  <q-icon size="20px" name="fa-solid fa-circle-check" style="color: rgb(var(--positive));"/>
                </div>
              </div>
              <div>
                {{ bg.name }}
              </div>

            </div>
          </div>

        </q-scroll-area>

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
            开发中
          </div>

        </div>

      </q-card>
    </q-dialog>


    <q-dialog :model-value="showNewProduct" @hide="()=>{showNewProduct= false}"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-std">

        <h5 style="font-weight: 600!important; margin-left: .5rem !important;">
          新增商品
        </h5>

        <q-separator class="component-separator-base" inset spaced="1rem"/>

        <div class="q-mx-lg q-mt-lg q-mb-xs">

          <div class="row items-center">
            <div class="col-6">
              <h6>
                商品名称：
              </h6>
            </div>
            <q-input v-model="newProductName" tabindex="0" dense outlined
                     class="component-outline-input-mini-est-short" style="opacity: .92">
            </q-input>
          </div>

          <div class="row items-center q-mt-md">
            <div class="col-6">
              <h6>
                商品价格（元）：
              </h6>
            </div>
            <q-input v-model="newProductPrice" tabindex="0" dense outlined mask="#####"
                     class="component-outline-input-mini-est-short" style="opacity: .92">
            </q-input>
          </div>

          <div class="row q-mt-xl q-mb-md justify-center">
            <div class="q-mx-md">

              <q-btn no-caps unelevated class=" shadow-1 component-outline-btn-grow"
                     @click="()=>{showNewProduct= false}" label="取消"/>

            </div>
            <div class="q-mx-md">
              <q-btn no-caps unelevated class=" shadow-1 component-full-btn-grow"
                     @click="newProduct" label="确定"/>
            </div>
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
const RES_ADD = process.env.VUE_APP_RES_ADD

// mock data
const avatarList = ref([
  {name: "人物图片1", url: `${RES_ADD}agent/avatarImage1.jpg`, enable: true},
  {name: "人物图片2", url: `${RES_ADD}agent/avatarImage2.jpg`, enable: true},
  {name: "人物图片3", url: `${RES_ADD}agent/avatarImage3.jpg`, enable: true},
  {name: "人物图片4", url: `${RES_ADD}agent/avatarImage4.jpg`, enable: true},
  {name: "人物图片5", url: `${RES_ADD}agent/avatarImage5.jpg`, enable: true},
  {name: "人物图片6", url: `${RES_ADD}agent/avatarImage6.jpg`, enable: true},
])
const productList = ref([
  {name: "矿泉水", price: "1", enable: true},
  {name: "牛奶", price: "3", enable: true},
  {name: "咖啡", price: "5", enable: false},
  {name: "洗发水", price: "20", enable: true},
  {name: "洗衣液", price: "30", enable: true},
  {name: "口红", price: "200", enable: true},
  {name: "护肤水", price: "50", enable: true},
  {name: "湿巾", price: "3", enable: true},
  {name: "垃圾桶", price: "50", enable: true},
  {name: "衣架", price: "30", enable: true},
  {name: "保鲜袋", price: "10", enable: true},
  {name: "电池", price: "20", enable: true},
  {name: "雨伞", price: "45", enable: true},
  {name: "中性笔", price: "2", enable: true},
  {name: "耳机", price: "35", enable: true},
  {name: "胶带", price: "2", enable: true},
  {name: "剪刀", price: "8", enable: true},
  {name: "鼠标垫", price: "12", enable: true},
  {name: "SK2神仙水", price: "2000", enable: true},
])
const bgList = ref([
  {name: "背景图片1", url: `${RES_ADD}agent/bgImage01.jpg`, enable: true},
  {name: "背景图片2", url: `${RES_ADD}agent/bgImage02.jpg`, enable: true},
  {name: "背景图片3", url: `${RES_ADD}agent/bgImage03.jpg`, enable: true},
  {name: "背景图片4", url: `${RES_ADD}agent/bgImage04.jpg`, enable: true},
  {name: "背景图片5", url: `${RES_ADD}agent/bgImage05.jpg`, enable: true},
  {name: "背景图片6", url: `${RES_ADD}agent/bgImage06.jpg`, enable: true},
  {name: "背景图片7", url: `${RES_ADD}agent/bgImage07.jpg`, enable: true},
  {name: "背景图片8", url: `${RES_ADD}agent/bgImage08.jpg`, enable: true},
  {name: "背景图片9", url: `${RES_ADD}agent/bgImage09.jpg`, enable: true},
  {name: "背景图片10", url: `${RES_ADD}agent/bgImage10.jpg`, enable: true},
])
// components
const aiChatBodyScroller = ref(null)
const sendMessageEnable = ref(true)
const showProjectAvatar = ref(false)
const showProjectProduct = ref(false)
const showProjectBg = ref(false)
const showRagDoc = ref(false)
const showNewProduct = ref(false)
// new data
const newProductName = ref("")
const newProductPrice = ref(0)
// data
const agentModel = ref("chat")
const cpuDeviceOnline = ref(false)
const messageList = ref([])
const lastHumanInput = ref("")
const chatSessionId = ref("")


function newProduct() {
  if (!newProductName.value) {
    notifyTopWarning("商品名称不能为空")
    return
  }
  if (newProductPrice.value <= 0) {
    notifyTopWarning("商品价格需要大于0")
    return
  }
  productList.value.push({name: newProductName.value, price: newProductPrice.value, enable: true})
  newProductName.value = ''
  newProductPrice.value = 0
  showNewProduct.value = false
}

function updateAgentModel() {
  notifyTopPositive("工作模式切换成功，不同工作模式记忆暂时不兼容，已重新生成新对话记录id", 8000)
  resetRandomSessionId()
  messageList.value = []
}

function loadHistoryMethod() {
  if (!cpuDeviceOnline.value) {
    notifyTopWarning("设备不在线，联系管理员开启设备")
    return
  }
  if (!chatSessionId.value) {
    notifyTopWarning("对话记录id不能为空")
    return
  }
  loadHistory({chatSessionId: chatSessionId.value}).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    messageList.value = res.data.data;
  })
}

function clearHistoryMethod() {
  if (!cpuDeviceOnline.value) {
    notifyTopWarning("设备不在线，联系管理员开启设备")
    return
  }
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
    cpuDeviceOnline.value = res.data.data;
  })
}


function resetRandomSessionId() {
  chatSessionId.value = Math.random().toString(36).substring(2, 10);
}

function sendMessage() {
  if (!cpuDeviceOnline.value) {
    notifyTopWarning("设备不在线，联系管理员开启设备")
    return
  }
  if (!chatSessionId.value) {
    notifyTopWarning("对话记录id不能为空")
    return
  }
  if (!lastHumanInput.value) {
    notifyTopWarning("发送内容不能为空")
    return
  }

  if (agentModel.value === 'chat') {
    const toSendStr = lastHumanInput.value
    lastHumanInput.value = ""
    sendMessageEnable.value = false
    messageList.value.unshift({type: AiMessageTypeEnum.HUMAN, content: toSendStr});
    messageList.value.unshift({type: AiMessageTypeEnum.AI, content: ""});

    const eventSource = new EventSource(
        `${BASE_ADD}yui/user/ai/stream?userInput=${toSendStr}
&chatSessionId=${chatSessionId.value}`);

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
  } else if (agentModel.value === 'project') {


    const sendAvatarList = avatarList.value
        .filter(item => item.enable === true)
        .map(({ enable, ...rest }) => rest);
    const sendBgList = bgList.value
        .filter(item => item.enable === true)
        .map(({ enable, ...rest }) => rest);
    const sendProductList  = productList.value
        .filter(item => item.enable === true)
        .map(({ enable, ...rest }) => rest);

    if (sendAvatarList.length === 0) {
      notifyTopWarning("虚拟人物配置不能为空")
      return
    }
    if (sendProductList.length === 0) {
      notifyTopWarning("商品配置不能为空")
      return
    }
    if (sendBgList.length === 0) {
      notifyTopWarning("宣传背景不能为空")
      return
    }

    const toSendStr = lastHumanInput.value
    lastHumanInput.value = ""
    sendMessageEnable.value = false
    messageList.value.unshift({type: AiMessageTypeEnum.HUMAN, content: toSendStr});
    messageList.value.unshift({type: AiMessageTypeEnum.AI, content: ""});

    const params = new URLSearchParams({
      userInput: toSendStr,
      chatSessionId: chatSessionId.value,
      model: "PROJECT",
      projectRes: JSON.stringify({
        avatarList: sendAvatarList,
        bgList: sendBgList,
        productList: sendProductList
      }),
    })

    const eventSource = new EventSource(
        `${BASE_ADD}yui/user/ai/stream?${params}`
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
        messageList.value[0].content += "\n\n\n系统繁忙，请稍后再试"
        sendMessageEnable.value = true;
        return;
      }

      messageList.value[0].content += data
    };

    eventSource.onerror = () => {
      eventSource.close();
      messageList.value[0].content = "系统繁忙，请稍后再试"
      sendMessageEnable.value = true;
    };

  } else if (agentModel.value === 'rag') {
    notifyTopWarning("当前模式正在开发中")
  }


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


.cask-ai-chatroom-switch-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
}


</style>

<style lang="scss">

.ai-agent-config {
  .q-tab-panel {
    padding: 0 !important;
  }
}


</style>