<template>
  <q-layout view="hhh lpr fff" class="component-full-screen column">
    <cask-base-header :chatroom-select-first="true" :center-elements="[
        CaskModuleElement.HOME,
    ]" :always-show="true" :mini="true"/>


    <div class="col row">

      <div v-show="!globalState.screenMini" style="width: 400px" class="column">

        <div class="col-1"/>
        <div class="col-9 column">
          <div class="col-grow column q-mx-md">

            <q-input v-model="chatNameFilter" tabindex="0" dense outlined placeholder="查询"
                     class="q-mb-md component-outline-input-grow">
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-magnifying-glass" size="1rem"/>
              </template>
            </q-input>

            <q-scroll-area class="col" :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }">
              <q-tree
                  :no-results-label="$t('main_chat_no_content_match')"
                  :filter="chatNameFilter"
                  :filter-method="searchChatName"
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
                  <div v-else-if="!prop.node.avatar" class="full-width row justify-between items-center">
                    <div>
                      {{ prop.node.label }}
                    </div>
                    <div v-if="false === prop.node.latestRead" class="q-mr-sm"
                         style="font-size: .78rem; color: rgb(var(--negative))">
                      {{ $t('main_chat_new_message') }}
                    </div>
                  </div>
                  <div v-else class="row items-center full-width">
                    <div class="q-mr-sm q-ml-xs cask-chatroom-chat-list-avatar"
                         :style="{backgroundImage: `url(${prop.node.avatar})`}">
                    </div>

                    <div class="col row justify-between">
                      <div class="col-12 row">

                        <div class="col component-max-line-text">
                          {{ prop.node.label }}
                        </div>

                        <div class="q-mx-md q-pt-sm">
                          <div v-if="!prop.node.latestRead" style="width: 8px;height: 8px;border-radius: 50%;
                        background-color: rgba(var(--negative), .8)"/>
                        </div>

                      </div>

                      <div class="col-12 row" style="font-size: .78rem">
                        <div class="col component-max-line-text cask-chatroom-chat-list-subtitle"
                             style="white-space: break-spaces;overflow-wrap: break-word; word-break: break-all;">
                          {{ prop.node.lastMessageText }}
                        </div>

                        <div class="q-mx-sm cask-chatroom-chat-list-subtitle">
                          {{ prop.node.lastMessageTimeWeb }}
                        </div>

                        <div class="absolute cask-chatroom-chat-list-delete row items-center">
                          <div v-if="prop.node.id === socketChatState.chattingDataWebSelected
                          && !globalState.pinChatIdMap[prop.node.id]"
                               class="cask-cursor-pointer" @click="globalState.addPinChat(prop.node.id, {
                                 id: prop.node.id,
                                 name: prop.node.label,
                                 read: prop.node.latestRead,
                               })"
                               style="color: rgb(var(--pointer)); margin-right: 15px">
                            {{ $t('main_chat_chat_pin') }}
                          </div>
                          <div v-if="prop.node.id === socketChatState.chattingDataWebSelected"
                               class="cask-cursor-pointer" @click="deleteChat(prop.node.id)"
                               style="color: rgb(var(--negative));">
                            {{ $t('main_chat_chat_delete') }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </q-tree>
            </q-scroll-area>

            <q-scroll-area
                class="relative-position q-mt-md"
                :class="pinChatIdMapArr.length === 0 ?
                 'cask-chatroom-pinned-chat' : 'cask-chatroom-pinned-chat-pinned' "
                :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }">
              <h5 v-if="pinChatIdMapArr.length === 0" class="absolute-center"
                  style="opacity: .5; ">
                {{ $t('main_chat_chat_pinned') }}
              </h5>
              <div v-else class="row" style="margin: 10px">
                <div class="q-mb-sm col-12 row items-center cask-chatroom-pinned-chat-pinned-cell"
                     v-for="([key, value]) in pinChatIdMapArr" :key="key">
                  <q-btn v-if="key && value" no-caps unelevated class="col component-none-btn-grow"
                         @click="socketChatState.chattingDataWebSelected = key">
                    <div class="col-12 row justify-between q-pa-xs">
                      <div class="col row items-center">
                        <q-icon name="fa-solid fa-thumbtack" size=".9rem"/>
                        <div class="col text-left q-mx-sm component-max-line-text">
                          {{ value.name }}
                        </div>
                      </div>
                      <div v-if="!value.read" style="font-size: .78rem; color: rgb(var(--negative))">
                        {{ $t('main_chat_new_message') }}
                      </div>
                    </div>
                  </q-btn>

                  <div style="color: rgb(var(--pointer));" class="cask-jump-link-in-text-origin q-ml-md"
                       @click="globalState.deletePinChat(key)">
                    {{ $t('main_chat_chat_pin_cancel') }}
                  </div>

                </div>

              </div>
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
                  {{ $t('main_user_detail_not_login') }}
                </div>
              </div>
            </q-btn>
          </div>

          <div class="row q-mb-sm">
            <q-btn no-caps unelevated style="width: 100%" dense @click="notifyTopWarning($t('in_develop'))">
              <div class="row items-center full-width">
                <q-icon class="col-2" name="fa-solid fa-sliders" size="1.2rem"/>
                <div class="col-9 row items-center q-px-sm" style="height: 2rem">
                  {{ $t('main_chat_setting') }}
                </div>
              </div>
            </q-btn>
          </div>

          <div class="row">
            <q-btn no-caps unelevated class="component-full-btn-full" push
                   @click="notifyTopWarning($t('no_auth'))">
              <div class="row items-center">
                <div class="q-mx-md">
                  {{ $t('main_chat_launch_group') }}
                </div>
                <q-icon name="fa-solid fa-rocket" size="1.2rem"/>
              </div>
            </q-btn>
          </div>


        </div>

      </div>

      <div class="col-12 col-lg row relative-position" style="height: 100%">
        <q-separator class="component-separator-base" vertical style="margin: 5rem 3% 0 0"/>

        <div class="col column" style="height: 100%; padding: 5rem 0 10rem 0">

          <div class="row q-mb-md justify-between">
            <div v-if="socketChatState.webChattingFocusChat" style="font-size: 1.4rem; font-weight: 600">
              {{ socketChatState.webChattingFocusChat.chatName }}
            </div>

            <div v-if="socketChatState.webChattingFocusChat" class="row justify-end items-center">
              <q-btn v-if="globalState.pinChatIdMap[socketChatState.webChattingFocusChat.chatId]" no-caps
                     unelevated class="component-none-btn-grow q-mx-xs"
                     @click="globalState.deletePinChat(socketChatState.webChattingFocusChat.chatId)">
                <div class="row items-center">
                  <div class="q-mr-sm q-ml-xs q-my-xs">
                    {{ $t('main_chat_chat_pin_cancel') }}
                  </div>
                  <q-icon name="fa-regular fa-trash-can" size=".9rem"/>
                </div>
              </q-btn>
              <q-btn v-else
                     no-caps unelevated class="component-none-btn-grow q-mx-xs"
                     @click="globalState.addPinChat(socketChatState.webChattingFocusChat.chatId, {
                                 id: socketChatState.webChattingFocusChat.chatId,
                                 name: socketChatState.webChattingFocusChat.chatName,
                                 read: socketChatState.webChattingFocusChat.latestRead,
                               })">
                <div class="row items-center">
                  <div class="q-mr-sm q-ml-xs q-my-xs">
                    {{ $t('main_chat_chat_pin') }}
                  </div>
                  <q-icon name="fa-regular fa-life-ring" size=".9rem"/>
                </div>
              </q-btn>

              <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs"
                     @click="notifyTopWarning($t('in_develop'))">
                <div class="row items-center">
                  <div class="q-mr-sm q-ml-xs q-my-xs">
                    {{ $t('main_chat_chat_no_message_notify') }}
                  </div>
                  <q-icon name="fa-regular fa-bell-slash" size=".9rem"/>
                </div>
              </q-btn>
            </div>
          </div>

          <div v-if="socketChatState.webChattingFocusChat" class="col">

            <div v-for="(chat, index) in socketChatState.chattingData" :key="index" class="cask-chatroom-chat-main"
                 :id="`chat-body-infinite-id-${chat.chatId}`" style="max-height: 100%;overflow: auto;"
            >
              <q-infinite-scroll v-if="chat.chatId === socketChatState.webChattingFocusChat.chatId"
                                 @load="loadMoreChatRecord" :offset="600" reverse
                                 :scroll-target="`#chat-body-infinite-id-${chat.chatId}`"
                                 :disable="socketChatState.webChattingFocusChat.chatScrollDisable">
                <template v-slot:loading>
                  <div class="row justify-center q-my-md">
                    <q-spinner-pie size="50px"/>
                  </div>
                </template>
                <div v-for="(chatRow, index) in socketChatState.webChattingFocusChat.userChattingData"
                     :key="index" class="q-my-sm" :style="
                     socketChatState.webChattingFocusChat.userChattingData.length -1 === index
                      ? 'margin-bottom: 30px' : ''">
                  <div v-if="chatRow.webTimeLabel" class="q-my-md row justify-center">
                    <div style="opacity:.5">
                      {{ chatRow.webTimeLabel }}
                    </div>
                  </div>
                  <div v-if="!globalState.userData || globalState.userData.id !== chatRow.sendUserId" class="row">
                    <q-avatar size="40px" class="q-mr-sm">
                      <q-img spinner-size="1rem" :src="chatRow.sendUserAvatar"/>
                    </q-avatar>
                    <div class="row col">
                      <div class="col-12 q-mb-sm q-pl-xs" style="font-size: .95rem">
                        {{ chatRow.sendUserNickname }}
                      </div>
                      <img v-if="chatRow.webMessageFile" :src="chatRow.message"
                           class="cask-chatroom-chat-body-img" alt=""/>
                      <div v-else class="cask-chatroom-chat-body" style="white-space: break-spaces">
                        {{ chatRow.message }}
                      </div>
                    </div>
                  </div>
                  <div v-else class="row justify-end">
                    <div class="row col justify-end">
                      <div class="col-12 q-mb-sm q-pr-xs text-right" style="font-size: .95rem">
                        {{ chatRow.sendUserNickname }}
                      </div>
                      <img v-if="chatRow.webMessageFile" :src="chatRow.message"
                           class="cask-chatroom-chat-body-img" alt=""/>
                      <div v-else class="cask-chatroom-chat-body-mine">
                        {{ chatRow.message }}
                      </div>
                    </div>
                    <q-avatar size="40px" class="q-mx-sm">
                      <q-img spinner-size="1rem" :src="chatRow.sendUserAvatar"/>
                    </q-avatar>
                  </div>


                </div>
              </q-infinite-scroll>
            </div>
          </div>

        </div>

        <q-separator class="component-separator-base" vertical style="margin: 5rem 0 0 3%"/>

        <cask-long-text-input v-if="socketChatState.webChattingFocusChat"
                              id="comment-reply-input" :elements="new Map([
                  [CaskLongTextInputElement.FILE, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
                  [CaskLongTextInputElement.IMG, {callback: sendImg}],
                  [CaskLongTextInputElement.EMOJI, {callback: sendEmoji}],
                  [CaskLongTextInputElement.CALL, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
                  ])" :sendCallback="sendChatMsg" v-model="socketChatState.webChattingFocusChat.webInputText"
                              @update:model-value="data => socketChatState.webChattingFocusChat.webInputText = data"
                              style="right: 3%; left: 3%; bottom: .5rem" class="absolute"/>
      </div>

      <div v-show="!globalState.screenMini" style="width: 400px" class="column justify-end">

        <div class="q-px-md col-11 column">
          <q-scroll-area class="col" v-if="socketChatState.webChattingFocusChat"
                         :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }">

            <div class="row justify-center q-mt-sm">
              <div class="relative-position" style="width: 200px; height: 200px">
                <q-avatar size="200px" style="filter: blur(3px); position: absolute;">
                  <q-img :src="socketChatState.webChattingFocusChat.chatAvatar"/>
                </q-avatar>
                <q-avatar size="180px" style=" position: absolute; left: 10px; top: 10px">
                  <q-img :src="socketChatState.webChattingFocusChat.chatAvatar"/>
                </q-avatar>
              </div>
            </div>

            <div class="text-center q-mt-sm" style="font-size: 1.4rem; font-weight: 600">
              {{ socketChatState.webChattingFocusChat.chatName }}
            </div>

            <div v-if="!socketChatState.webChattingFocusChat.chatType">
              <div class="q-mt-sm row justify-center">
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

              <div class="q-mt-md row justify-center">
                <div>
                  {{ socketChatState.webChattingFocusChat.chatUserBirth.substr(0, 10) }}
                </div>

                <q-separator class="component-separator-base" vertical style="margin: 5px 8px"/>

                <div>
                  {{ socketChatState.webChattingFocusChat.chatUserStar }}
                </div>

                <q-separator class="component-separator-base" vertical style="margin: 5px 8px"/>

                <div>
                  {{ socketChatState.webChattingFocusChat.chatUserZodiac }}
                </div>
              </div>

              <div v-if="socketChatState.webChattingFocusChat.chatUserMotto"
                   class="q-mt-sm text-center" style="opacity: .75;">
                {{ socketChatState.webChattingFocusChat.chatUserMotto }}
              </div>
              <div v-else class="q-mt-sm text-center" style="opacity: .75;">
                {{ $t('main_user_detail_no_motto') }}
              </div>

              <div>

                <div class="q-mt-md row justify-center items-center">
                  <q-icon :color="socketChatState.webChattingFocusChat.socialLink.wechat? 'green-6' : 'grey-6' "
                          name="fa-brands fa-weixin" class="q-mr-sm" size="1.25rem"/>
                  <div :style="socketChatState.webChattingFocusChat.socialLink.wechat ? '' : 'opacity: .75'">
                    &nbsp;{{
                      socketChatState.webChattingFocusChat.socialLink.wechat ?
                          socketChatState.webChattingFocusChat.socialLink.wechat : $t('main_user_detail_no_community')
                    }}
                  </div>
                </div>

                <div class="q-mt-sm row justify-center items-center">
                  <q-icon :color="socketChatState.webChattingFocusChat.socialLink.github ? 'black' : 'grey-6' "
                          name="eva-github" class="q-mr-sm" size="1.25rem"/>

                  <div :style="socketChatState.webChattingFocusChat.socialLink.github ? '' : 'opacity: .75'">
                    &nbsp;{{
                      socketChatState.webChattingFocusChat.socialLink.github ?
                          socketChatState.webChattingFocusChat.socialLink.github : $t('main_user_detail_no_community')
                    }}
                  </div>
                </div>

              </div>

            </div>

            <div v-else>
              <div class="q-mt-sm text-center" style="font-size: .85rem; opacity: .75;">
                {{ socketChatState.webChattingFocusChat.chatGroupDesc }}
              </div>

              <div class="row q-mt-sm justify-center ">

                <div class="col-12 row">
                  <q-avatar
                      v-for="(thisUser, index) in socketChatState.webChattingFocusChat.chatGroupUsers" :key="index"
                      size="40px" class="q-ma-xs">
                    <q-img spinner-size="1rem" :src="thisUser.userAvatar"/>
                  </q-avatar>
                  <q-btn round style="height: 40px; width: 40px" no-wrap flat class="q-mt-xs q-ml-xs">
                    <div style="padding-bottom: 13px; font-size: 25px">
                      ...
                    </div>
                  </q-btn>
                </div>


              </div>

            </div>


          </q-scroll-area>

          <q-btn v-if="socketChatState.webChattingFocusChat &&
          0 !== socketChatState.webChattingFocusChat.chatType &&
          2 !== socketChatState.webChattingFocusChat.chatType" @click="notifyTopWarning($t('in_develop'))"
                 no-caps unelevated class=" component-full-btn-error-full">
            <div class="row items-center">
              <div class="q-mx-md">
                {{ $t('main_chat_chat_exit') }}
              </div>
              <q-icon name="fa-solid fa-door-open" size="1rem"/>
            </div>
          </q-btn>

          <q-btn v-if="socketChatState.webChattingFocusChat && 0 === socketChatState.webChattingFocusChat.chatType"
                 no-caps unelevated class=" component-full-btn-error-full"
                 @click="notifyTopWarning($t('in_develop'))">
            <div class="row items-center">
              <div class="q-mx-md">
                {{ $t('main_chat_chat_block') }}
              </div>
              <q-icon name="fa-solid fa-door-open" size="1rem"/>
            </div>
          </q-btn>


          <q-separator v-if="socketChatState.webChattingFocusChat" class="component-separator-base q-my-md"/>

          <div class="q-pb-md">
            <h5 style="font-weight: 600 !important;">
              {{ $t('main_chat_no_tips') }}
            </h5>
            <div style="opacity: .75">
              <div>
                {{ $t('main_chat_no_tip_1') }}
              </div>
              <div>
                {{ $t('main_chat_no_tip_2') }}
              </div>
              <div>
                {{ $t('main_chat_no_tip_3') }}
              </div>
            </div>

          </div>


        </div>


      </div>


    </div>

    <cask-base-footer :simple="true"/>

  </q-layout>
</template>

<script setup>

import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {browserNotificationCheck, notifyTopWarning} from "@/utils/notification-tools";
import {
  chattingDataInit,
  deleteChattingData,
  initChatSocket,
  messageTimeLabelBuilder,
  rebuildChattingDataWeb,
  socketSend
} from "@/utils/chat-socket";
import {socketChatState} from "@/utils/global-state-no-save";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {CaskLongTextInputElement, CaskModuleElement} from "@/constant/enums/component-enums";
import {useGlobalStateStore} from "@/utils/global-state";
import CaskLongTextInput from "@/ui/components/CaskLongTextInput.vue";
import {getRoleTypeObj} from "@/constant/enums/role-type";
import {getGenderObj} from "@/constant/enums/gender-opt";
import {hideChat, moreMessage} from "@/api/chat";
import {useI18n} from "vue-i18n";
import {delay} from "@/utils/base-tools";
import {uploadUserFile} from "@/api/file";

const globalState = useGlobalStateStore();
const {t} = useI18n()

const chatNameFilter = ref("")
const pinChatIdMapArr = computed(() => {
  return Object.entries(globalState.pinChatIdMap).filter(([key, value]) => value !== undefined);
});

watch(
    () => globalState.language,
    () => {
      if (socketChatState.webChattingFocusChat) {
        messageTimeLabelBuilder(socketChatState.webChattingFocusChat.userChattingData)
      }
      rebuildChattingDataWeb()
    }
);

const searchChatName = (node, filter) => {
  const filterLow = filter.toLowerCase()
  return node.label && node.label.toLowerCase().indexOf(filterLow) > -1 && node.avatar
}

function deleteChat(chatId) {
  if (!chatId) {
    return
  }
  if (globalState.isLogin) {
    deleteChattingData(chatId)
    rebuildChattingDataWeb(false)
    delay(0).then(() => {
      socketChatState.chattingDataWebSelected = null
    })
    hideChat({hideChatId: chatId})
  } else {
    notifyTopWarning(t('no_login'))
  }
}

const sendImg = async (data) => {
  if (!globalState.isLogin) {
    notifyTopWarning(t('no_login'))
    return false
  }
  //build
  let formData = new FormData();
  formData.append('file', data, data.name)
  const res = await uploadUserFile({fileType: 2}, formData)
  if (!res || !res.data || !res.data.data) {
    return false
  }
  const readAddress = res.data.data.readAddress
  socketSend(socketChatState.webChattingFocusChat.chatId, readAddress)
  return true
}

const sendEmoji = (url) => {
  if (globalState.isLogin) {
    socketSend(socketChatState.webChattingFocusChat.chatId, url)
  } else {
    notifyTopWarning(t('main_chat_not_login_message'))
  }
}

const sendChatMsg = () => {
  if (socketChatState.webChattingFocusChat.webInputText) {
    if (globalState.isLogin) {
      socketSend(socketChatState.webChattingFocusChat.chatId, socketChatState.webChattingFocusChat.webInputText)
      socketChatState.webChattingFocusChat.webInputText = ""
    } else {
      notifyTopWarning(t('main_chat_not_login_message'))
    }
  } else {
    notifyTopWarning(t('main_article_cancel_reply_error'))
  }
}

function handleVisibilityChange() {
  socketChatState.needBrowserNotification = document.hidden
}

function loadMoreChatRecord(index, done) {
  //get last msg
  let lastMsgId = ""
  if (socketChatState.webChattingFocusChat && 0 !== socketChatState.webChattingFocusChat.userChattingData.length) {
    if (socketChatState.webChattingFocusChat.userChattingData.length < 10) {
      socketChatState.webChattingFocusChat.chatScrollDisable = true
      return
    }
    lastMsgId = socketChatState.webChattingFocusChat.userChattingData[0].messageId
  }
  moreMessage({lastMessage: lastMsgId, chatId: socketChatState.webChattingFocusChat.chatId}).then(res => {
    if (!res || !res.data || !res.data.data) {
      done()
      return
    }
    if (0 === res.data.data.length) {
      socketChatState.webChattingFocusChat.chatScrollDisable = true
      return
    }
    let inputData = res.data.data.reverse()
    socketChatState.webChattingFocusChat.userChattingData.splice(0, 0, ...inputData)
    messageTimeLabelBuilder(socketChatState.webChattingFocusChat.userChattingData)
    //todo 当用户向上拉聊天框的时候，收到消息，此时未读（提示新消息），当用户拉到底部的时候，发送已读请求
    done()
  })
}

onMounted(() => {
  browserNotificationCheck()
  chattingDataInit(true)
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

.cask-chatroom-pinned-chat-pinned {
  height: 8rem;

  .cask-chatroom-pinned-chat-pinned-cell {
    border: solid 2px rgba(var(--text-color), 0.8);
    padding-right: 8px;
    border-radius: 4px
  }
}


.cask-chatroom-chat-list-avatar {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.cask-chatroom-chat-body {
  border-radius: 8px;
  padding: 8px;
  background-color: rgba(var(--text-color), 0.1);
  margin-right: 15%;
  overflow-wrap: break-word;
  word-break: break-all;
}

.cask-chatroom-chat-body-mine {
  border-radius: 8px;
  padding: 8px;
  background-color: rgba(var(--positive), 0.92);
  color: #eee;
  margin-left: 15%;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-line;
}

.cask-chatroom-chat-body-img {
  border-radius: 8px;
  max-height: 400px;
  max-width: 300px;
  width: auto;
  height: auto;
  object-fit: contain
}

.cask-chatroom-chat-main {

  &::-webkit-scrollbar {
    width: 14px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(var(--text-color), 0.75)
  }
}
</style>