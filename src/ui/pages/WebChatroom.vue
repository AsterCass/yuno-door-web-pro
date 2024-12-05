<template>
  <q-layout view="hhh lpr fff" class="component-full-screen column">
    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
    ]" :always-show="true"/>


    <div class="col-grow row">

      <div class="col-lg-2 column">

        <div class="col-1"/>
        <div class="col-9 column">
          <div class="col-grow column q-mx-lg">
            <h2>
              AsterCasc
            </h2>

            <q-input v-model="chatNameSearch" tabindex="0" dense outlined placeholder="查询"
                     class="q-mb-md component-outline-input-grow">
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-magnifying-glass" size="1rem"/>
              </template>
            </q-input>

            <q-scroll-area class="col" :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }">
              <q-tree
                  class="component-base-tree"
                  :nodes="socketChatState.chattingDataWeb"
                  node-key="id"
                  no-connectors
                  icon="fa-solid fa-caret-right"
                  v-model:expanded="socketChatState.chattingDataWebExpand"
                  v-model:selected="currentChat">
                <template v-slot:default-header="prop">
                  <div :style="prop.node.noContent ? 'opacity: 0.5' : ''">
                    {{ prop.node.label }}
                  </div>
                </template>
              </q-tree>
            </q-scroll-area>



          </div>
          <q-separator class="component-separator-base q-my-md" inset/>
        </div>
        <div class="col-2 column q-mx-md">

          <div class="row q-mb-xs">
            <q-btn no-caps unelevated style="width: 100%" dense>
              <div class="row items-center full-width">
                <div class="col-2">
                  <q-avatar size="2.2rem" style="border-radius: 2.2rem;">
                    <q-img width="2.2rem" height="2.2rem"
                           style="border-radius: 2.2rem;border: 2px solid black;"
                           :src="globalState.userData.avatar"/>
                  </q-avatar>
                </div>
                <div class="col-9 row items-center q-px-sm" style="height: 2rem">
                  {{ globalState.userData.nickName }}
                </div>
              </div>
            </q-btn>
          </div>

          <div class="row q-mb-sm">
            <q-btn no-caps unelevated style="width: 100%" dense>
              <div class="row items-center full-width">
                <q-icon class="col-2" name="fa-solid fa-sliders" size="1.2rem"/>
                <div class="col-9 row items-center q-px-sm" style="height: 2rem">
                  聊天设置
                </div>
              </div>
            </q-btn>
          </div>

          <div class="row">
            <q-btn no-caps unelevated class="component-full-btn-full">
              <div class="row items-center">
                <div class="q-mx-md">
                  发起群聊
                </div>
                <q-icon name="fa-solid fa-rocket" size="1.2rem"/>
              </div>
            </q-btn>
          </div>


        </div>

      </div>

      <div class="col-12 col-lg-8 row relative-position">
        <q-separator class="component-separator-base" vertical style="margin: 5rem 2rem 0 0"/>

        <div class="col-grow">

        </div>
        <q-separator class="component-separator-base" vertical style="margin: 5rem 0 0 2rem"/>

        <cask-long-text-input id="comment-reply-input" :elements="new Map([
                  [CaskLongTextInputElement.FILE, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
                  [CaskLongTextInputElement.IMG, {callback: (data)=> {src=data}}],
                  [CaskLongTextInputElement.EMOJI, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
                  [CaskLongTextInputElement.CALL, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
                  ])" :placeholder="chatroomPlace" :sendCallback="callback" v-model="chatroomInput"
                              @update:model-value="data => chatroomInput = data"
                              style="right: 10%; left: 10%; bottom: .5rem" class="absolute"/>
      </div>

      <div v-show="!globalState.screenMini" class="col-lg-2 column justify-end">

        <div class="col-11 column">

          <div class="col-grow q-mx-lg">
            <h2>
              当前群头像
            </h2>

            <h3>
              当前群标题
            </h3>

            <h5 style="font-weight: 600 !important;">
              群聊基本信息
            </h5>

          </div>

          <q-separator class="component-separator-base q-my-md" inset/>

          <div class="q-mx-md q-pb-md">
            <h5 style="font-weight: 600 !important;">
              小贴士
            </h5>
            <div style="opacity: .75">
              1. 删除聊天框不会导致聊天记录删除，再次发起聊天或者有新消息时会重新载入之前记录
            </div>
            <div style="opacity: .75">
              2. 无法收到通知？如果您确认已经打开了浏览器通知权限，但是没有收到消息通知，
              请确认操作系统是否允许浏览器通知，以及操作系统中通知的全局设置：比如Windows中专注助手的相关设置
            </div>
            <div style="opacity: .75">
              3. 由于服务器资源有限，每人最多添加20张表情包，但是将他人已上传的表情包添加到自己的列表中不消耗该计数
            </div>
          </div>


        </div>


      </div>


    </div>

    <cask-base-footer :simple="true"/>

  </q-layout>
</template>

<script setup>

import {onBeforeUnmount, onMounted, ref} from "vue";
import {browserNotificationCheck, notifyTopWarning} from "@/utils/notification-tools";
import {chattingDataInit, initChatSocket} from "@/utils/chat-socket";
import {socketChatState} from "@/utils/global-state-no-save";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {CaskLongTextInputElement, CaskModuleElement} from "@/constant/enums/component-enums";
import {useGlobalStateStore} from "@/utils/global-state";
import CaskLongTextInput from "@/ui/components/CaskLongTextInput.vue";

const globalState = useGlobalStateStore();

const chatNameSearch = ref("")
const currentChat = ref("")
const chatroomPlace = ref("")
const chatroomInput = ref("")
const src = ref("")

const callback = () => {

}

function handleVisibilityChange() {
  socketChatState.needBrowserNotification = document.hidden
}

onMounted(() => {
  browserNotificationCheck()
  chattingDataInit()
  initChatSocket()
  document.addEventListener("visibilitychange", handleVisibilityChange);
})

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange);
})



</script>

<style scoped lang="scss">

</style>