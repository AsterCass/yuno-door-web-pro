<template>
  <q-layout view="hhh lpr fff" class="component-full-screen column">
    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
    ]" :always-show="true"/>


    <div class="col-grow row">

      <div v-show="!globalState.screenMini" style="width: 420px" class="column">

        <div class="col-1"/>
        <div class="col-9 column">
          <div class="col-grow column q-mx-md">

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
                  no-connectors no-selection-unset
                  icon="fa-solid fa-caret-right"
                  v-model:expanded="socketChatState.chattingDataWebExpand"
                  v-model:selected="socketChatState.chattingDataWebSelected">
                <template v-slot:default-header="prop">
                  <div v-if="prop.node.noContent" style="opacity: .5;color: rgb(var(--text-color))">
                    {{ prop.node.label }}
                  </div>
                  <div v-else-if="!prop.node.avatar">
                    {{ prop.node.label }}
                  </div>
                  <div v-else class="row items-center full-width">
                    <div class="q-mr-sm q-ml-xs cask-chatroom-chat-list-avatar"
                         :style="{backgroundImage: `url(${prop.node.avatar})`}">
                    </div>
                    <div class="col">
                      <div class="component-max-line-text q-mb-sm">
                        {{ prop.node.label }}
                      </div>
                      <div class="component-max-line-text" style="font-size: .8rem; opacity: .5">
                        {{ prop.node.lastMessageText }}
                      </div>
                    </div>
                    <div class="q-ml-sm q-mr-xs">
                      <div class="q-mb-sm row justify-end">
                        <div v-if="!prop.node.latestRead" style="width: 8px;height: 8px;border-radius: 50%;
                        background-color: rgba(var(--negative), .8)"/>
                      </div>
                      <div style="font-size: .8rem; opacity: .5">
                        {{ prop.node.lastMessageTimeWeb }}
                      </div>
                    </div>
                  </div>
                </template>
              </q-tree>
            </q-scroll-area>

            <q-scroll-area
                class="relative-position cask-chatroom-pinned-chat q-mt-md"
                :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }">
              <h5 class="absolute-center" style="opacity: .5; ">
                Pinned Chat
              </h5>
            </q-scroll-area>



          </div>
          <q-separator class="component-separator-base q-my-md" inset/>
        </div>
        <div class="col-2 column q-mx-md">

          <div class="row q-mb-xs">
            <q-btn v-if="globalState.isLogin" no-caps unelevated style="width: 100%" dense>
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
            <q-btn v-else no-caps unelevated style="width: 100%" dense>
              <div class="row items-center full-width">
                <div class="col-2">
                  <q-avatar size="2.2rem" style="border-radius: 2.2rem;">
                    <q-img width="2.2rem" height="2.2rem" spinner-size="1rem"
                           style="border-radius: 2.2rem;border: 2px solid black;"
                           src="https://picsum.photos/50/50"/>
                  </q-avatar>
                </div>
                <div class="col-9 row items-center q-px-sm" style="height: 2rem;">
                  未登录用户
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
            <q-btn no-caps unelevated class="component-full-btn-full" push>
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

      <div class="col-12 col-lg row relative-position">
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

        <div class="q-px-md col-11 column">
          <q-scroll-area class="col q-mx-lg" v-if="socketChatState.webChattingFocusChat"
                         :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }">

            <div class="row justify-center q-mt-md">
              <div class="relative-position" style="width: 220px; height: 220px">
                <q-avatar size="220px" style="filter: blur(3px); position: absolute;">
                  <q-img :src="socketChatState.webChattingFocusChat.chatAvatar"/>
                </q-avatar>
                <q-avatar size="200px" style=" position: absolute; left: 10px; top: 10px">
                  <q-img :src="socketChatState.webChattingFocusChat.chatAvatar"/>
                </q-avatar>
              </div>
            </div>

            <div class="text-center q-mt-md" style="font-size: 1.4rem; font-weight: 600">
              {{ socketChatState.webChattingFocusChat.chatName }}
            </div>

            <div v-if="!socketChatState.webChattingFocusChat.chatType">
              <div class="q-mt-md row justify-center">
                <q-badge class="q-mx-xs" style="font-size: .8rem"
                         :color="getGenderObj(socketChatState.webChattingFocusChat.chatUserGender).color"
                         :label="getGenderObj(socketChatState.webChattingFocusChat.chatUserGender).label">
                </q-badge>
                <q-badge class="q-mx-xs" style="font-size: 0.8rem"
                         :color="getRoleTypeObj(socketChatState.webChattingFocusChat.chatUserRoleType).color"
                         :label="getRoleTypeObj(socketChatState.webChattingFocusChat.chatUserRoleType).label">
                  <q-icon :name="getRoleTypeObj(socketChatState.webChattingFocusChat.chatUserRoleType).logo"
                          class="q-ma-xs"/>
                </q-badge>
              </div>

              <div>
                关注、粉丝、好友数量
              </div>

              <div>
                用户签名
              </div>

              <div>
                邮箱和github
              </div>

            </div>


            <div v-else>
              <div>
                群描述：
              </div>

              <div>
                群成员：
              </div>

              <div>
                群文件：
              </div>
            </div>


          </q-scroll-area>

          <q-btn v-if="socketChatState.webChattingFocusChat && socketChatState.webChattingFocusChat.chatType"
                 no-caps unelevated class=" component-full-btn-error-full">
            <div class="row items-center">
              <div class="q-mx-md">
                退出群聊
              </div>
              <q-icon name="fa-solid fa-door-open" size="1rem"/>
            </div>
          </q-btn>


          <q-separator class="component-separator-base q-my-md"/>

          <div class="q-pb-md">
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
import {getRoleTypeObj} from "@/constant/enums/role-type";
import {getGenderObj} from "@/constant/enums/gender-opt";

const globalState = useGlobalStateStore();

const chatNameSearch = ref("")
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

.cask-chatroom-pinned-chat {
  height: 8rem;
  border: dashed 2px rgba(var(--text-color), 0.8);
  border-radius: 8px;
  background: repeating-linear-gradient(
          45deg,
          rgba(var(--text-color), 0.1),
          rgba(var(--text-color), 0.1) 30px,
          transparent 20px,
          transparent 50px
  );
}

.cask-chatroom-chat-list-avatar {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

</style>