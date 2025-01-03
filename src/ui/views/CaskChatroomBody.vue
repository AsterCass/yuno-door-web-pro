<template>
  <div class="cask-chatroom-chat-body-scroll-container" ref="chatBodyScroller" @scroll="chatBodyOnScroll">
    <div v-for="(chatRow, index) in socketChatState.webChattingFocusChat.userChattingData"
         :key="index" :style="0 === index
                  ? 'margin-bottom: 30px' : ''" class="q-my-sm q-mx-md">
      <div v-if="chatRow.webTimeLabel" class="q-my-md row justify-center">
        <div style="opacity:.5">
          {{ chatRow.webTimeLabel }}
        </div>
      </div>
      <div v-if="!globalState.userData || globalState.userData.id !== chatRow.sendUserId" class="row">
        <q-avatar class="q-mr-sm cask-cursor-pointer" size="40px"
                  @click="toSpecifyPageWithQuery( thisRouter, 'space',{id: chatRow.sendUserId})">
          <q-img :src="chatRow.sendUserAvatar" spinner-size="1rem"/>
        </q-avatar>
        <div class="row col">
          <div class="col-12 q-mb-sm q-pl-xs row items-center" style="font-size: .95rem">
            <div :class=" chatRow.webFocusThisMsg ?
                              'text-' + getRoleTypeObj(chatRow.sendUserRoleType).color : ''"
                 style=" transition: color .5s ease;">
              {{ chatRow.sendUserNickname }}
            </div>
            <div v-show="chatRow.webFocusThisMsg"
                 class="row q-mx-sm items-center animate__animated animate__fadeIn">
              <q-badge :color="getGenderObj(chatRow.sendUserGender).color"
                       :label="getGenderObj(chatRow.sendUserGender).label"
                       class="q-mx-xs"
                       style="font-size: .7rem; padding: 3px 6px;">
              </q-badge>
              <q-badge :color="getRoleTypeObj(chatRow.sendUserRoleType).color"
                       :label="getRoleTypeObj(chatRow.sendUserRoleType).label"
                       class="q-mx-xs"
                       style="font-size: .7rem; padding: 3px 6px;">
              </q-badge>
              <div class="q-mx-sm" style="font-size: .7rem; opacity: 0.5">
                {{ chatRow.sendDate }}
              </div>
            </div>
          </div>
          <div class="relative-position" style="margin-right: 15%;"
               v-on:mouseleave="chatRow.webFocusThisMsg=false"
               v-on:mouseover="chatRow.webFocusThisMsg=true">
            <img v-if="chatRow.webMessageFile" :src="chatRow.message"
                 alt=""
                 class="cask-chatroom-chat-body-img" @click="showImgSrc = chatRow.message; showImg = true"
                 @error="chatRow.message = '/img/main_expire.png'"
            />
            <div v-else class="cask-chatroom-chat-body"
                 style="white-space: break-spaces">
              {{ chatRow.message }}
            </div>
            <div v-show="chatRow.webFocusThisMsg"
                 class="chat-body-label row items-end animate__animated animate__fadeIn">
              <div class="chat-body-label-mine-body">
                <div v-if="chatRow.webMessageFile" class="row cask-jump-link-in-text-more"
                     @click="starThisEmoji(chatRow.message)">
                  {{ $t('main_chat_operation_star_emoji') }}
                </div>
                <div v-else class="cask-jump-link-in-text-more" @click="copy(chatRow.message)">
                  {{ $t('main_chat_operation_copy') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row justify-end">
        <div class="row col justify-end">
          <div class="col-12 q-mb-sm q-pr-xs row items-center justify-end"
               style="font-size: .95rem">
            <div v-show="chatRow.webFocusThisMsg"
                 class="q-mx-sm text-right row items-center animate__animated animate__fadeIn">
              <div class="q-mx-sm" style="font-size: .7rem; opacity: 0.5">
                {{ chatRow.sendDate }}
              </div>
              <q-badge :color="getGenderObj(chatRow.sendUserGender).color"
                       :label="getGenderObj(chatRow.sendUserGender).label"
                       class="q-mx-xs"
                       style="font-size: .7rem; padding: 3px 6px;">
              </q-badge>
              <q-badge :color="getRoleTypeObj(chatRow.sendUserRoleType).color"
                       :label="getRoleTypeObj(chatRow.sendUserRoleType).label"
                       class="q-mx-xs"
                       style="font-size: .7rem; padding: 3px 6px;">
              </q-badge>
            </div>
            <div :class=" chatRow.webFocusThisMsg ?
                             'text-' + getRoleTypeObj(chatRow.sendUserRoleType).color : ''" class="text-right"
                 style=" transition: color .5s ease;">
              {{ chatRow.sendUserNickname }}
            </div>
          </div>
          <div class="relative-position" style="margin-left: 15%;"
               v-on:mouseleave="chatRow.webFocusThisMsg=false"
               v-on:mouseover="chatRow.webFocusThisMsg=true">
            <img v-if="chatRow.webMessageFile" :src="chatRow.message"
                 alt=""
                 class="cask-chatroom-chat-body-img" @click="showImgSrc = chatRow.message; showImg = true"
                 @error="chatRow.message = '/img/main_expire.png'"/>
            <div v-else class="cask-chatroom-chat-body-mine"
                 style="white-space: break-spaces">
              {{ chatRow.message }}
            </div>
            <div v-show="chatRow.webFocusThisMsg"
                 class="chat-body-label-mine row items-end animate__animated animate__fadeIn">
              <div class="chat-body-label-mine-body">
                <div v-if="chatRow.webMessageFile" class="row cask-jump-link-in-text-more"
                     @click="starThisEmoji(chatRow.message)">
                  {{ $t('main_chat_operation_star_emoji') }}
                </div>
                <div v-else class="cask-jump-link-in-text-more" @click="copy(chatRow.message)">
                  {{ $t('main_chat_operation_copy') }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-avatar class="q-mx-sm cask-cursor-pointer" size="40px"
                  @click="toSpecifyPageWithQuery( thisRouter, 'space',{id: chatRow.sendUserId})">
          <q-img :src="chatRow.sendUserAvatar" spinner-size="1rem"/>
        </q-avatar>
      </div>


    </div>
    <div v-if="chatBodyScrollerInLoading" class="row justify-center q-my-md">
      <q-spinner-pie size="50px"/>
    </div>
  </div>


  <cask-dialog-image v-model="showImg" :src="showImgSrc"/>
</template>

<script setup>

import {socketChatState} from "@/utils/global-state-no-save";
import {toSpecifyPageWithQuery} from "@/router";
import {getRoleTypeObj} from "@/constant/enums/role-type";
import {getGenderObj} from "@/constant/enums/gender-opt";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import {copy} from "@/utils/base-tools";
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useGlobalStateStore} from "@/utils/global-state";
import {messageTimeLabelBuilder} from "@/utils/chat-socket";
import {moreMessage} from "@/api/chat";
import CaskDialogImage from "@/ui/components/CaskDialogImage.vue";
import {starEmoji} from "@/api/file";
import {useI18n} from "vue-i18n";
import emitter from "@/utils/bus";

const thisRouter = useRouter()
const globalState = useGlobalStateStore();

const showImg = ref(false)
const {t} = useI18n()
const showImgSrc = ref("")
const chatBodyScroller = ref(null)
const chatBodyScrollerInLoading = ref(false)

watch(
    () => socketChatState.webChattingFocusChat,
    () => {
      if (socketChatState.chattingDataWebSelected && socketChatState.webChattingFocusChat.chatId) {
        chatBodyScroller.value.scrollTop = 0
        if (socketChatState.webChattingFocusChat.userChattingData.length === 0) {
          loadMoreChatRecord()
        }
      }
    }
);

const chatBodyOnScroll = (info) => {
  const topDistant = info.target.scrollHeight - info.target.clientHeight - Math.abs(info.target.scrollTop)
  if (topDistant < 5 && socketChatState.webChattingFocusChat
      && !socketChatState.webChattingFocusChat.chatScrollDisable && !chatBodyScrollerInLoading.value) {
    //加载图标
    chatBodyScrollerInLoading.value = true
    //加载新数据
    loadMoreChatRecord()
  }
}

function loadMoreChatRecord() {
  //get last msg
  let lastMsgId = ""
  if (socketChatState.webChattingFocusChat && 0 !== socketChatState.webChattingFocusChat.userChattingData.length) {
    if (socketChatState.webChattingFocusChat.userChattingData.length < 10) {
      socketChatState.webChattingFocusChat.chatScrollDisable = true
      chatBodyScrollerInLoading.value = false
      return
    }
    const lastMsgIndex = socketChatState.webChattingFocusChat.userChattingData.length - 1
    lastMsgId = socketChatState.webChattingFocusChat.userChattingData[lastMsgIndex].messageId
  }
  moreMessage({lastMessage: lastMsgId, chatId: socketChatState.webChattingFocusChat.chatId}).then(res => {
    if (!res || !res.data || !res.data.data) {
      socketChatState.webChattingFocusChat.chatScrollDisable = true
      chatBodyScrollerInLoading.value = false
      return
    }
    if (0 === res.data.data.length) {
      socketChatState.webChattingFocusChat.chatScrollDisable = true
      chatBodyScrollerInLoading.value = false
      return
    }
    let inputData = res.data.data
    //加载数据
    socketChatState.webChattingFocusChat.userChattingData.push(...inputData)
    messageTimeLabelBuilder(socketChatState.webChattingFocusChat.userChattingData)
    //todo 当用户向上拉聊天框的时候，收到消息，此时未读（提示新消息），当用户拉到底部的时候，发送已读请求
    chatBodyScrollerInLoading.value = false
  })
}

function starThisEmoji(message) {
  if (!globalState.isLogin) {
    notifyTopWarning(t('no_login'))
    return
  }
  const lastSlashIndex = message.lastIndexOf('/');
  const lastDotIndex = message.lastIndexOf('.');
  if (lastSlashIndex === -1 || lastDotIndex === -1 || lastDotIndex < lastSlashIndex) {
    return
  }
  const emojiId = message.slice(lastSlashIndex + 1, lastDotIndex);
  starEmoji(emojiId).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    notifyTopPositive(t('main_login_success_star_file'))
    emitter.emit('reloadStarEmoji')
  })
}

onMounted(() => {
  //将内部 ref 绑定到外部引用
  socketChatState.chatBodyScrollerOut = chatBodyScroller
})

</script>

<style lang="scss" scoped>

::-webkit-scrollbar {
  width: 14px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(var(--text-color-select));
}

.cask-chatroom-chat-body-scroll-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}

.cask-chatroom-chat-body {
  border-radius: 8px;
  padding: 8px;
  background-color: rgba(var(--text-color), 0.1);
  cursor: zoom-in;
  overflow-wrap: break-word;
  word-break: break-all;
}

.chat-body-label {
  white-space: nowrap;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(100%, 0);
  padding-left: 5px;

  .chat-body-label-mine-body {
    padding: 1px 8px;
    border-radius: 4px;
    background-color: rgba(var(--text-color), .07);
    backdrop-filter: saturate(200%) blur(30px);
  }
}

.cask-chatroom-chat-body-mine {
  border-radius: 8px;
  padding: 8px;
  background-color: rgba(var(--positive), 0.92);
  cursor: zoom-in;
  color: #eee;
  overflow-wrap: break-word;
  word-break: break-word;
}

.chat-body-label-mine {
  white-space: nowrap;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(-100%, 0);
  padding-right: 5px;

  .chat-body-label-mine-body {
    padding: 1px 8px;
    border-radius: 4px;
    background-color: rgba(var(--text-color), .07);
    backdrop-filter: saturate(200%) blur(30px);
  }
}

.cask-chatroom-chat-body-img {
  border-radius: 8px;
  max-height: 400px;
  max-width: 300px;
  width: auto;
  cursor: zoom-in;
  height: auto;
  object-fit: contain
}

</style>