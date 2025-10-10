<template>
  <q-layout view="hhh lpr fff" class="component-full-screen column"
            style="background-color: rgba(var(--background-color));background-image: url('/img/chatroom-bg.png');">
    <cask-base-header :chatroom-select-first="true" :center-elements="[
        CaskModuleElement.HOME,
    ]" :always-show="true" :mini="true"/>


    <div class="col row">

      <div v-show="!globalState.screenMini" style="width: 20.5%" class="column">

        <div class="col-1"/>
        <div class="col-9 column">
          <div class="col-grow column q-mx-md">

            <q-input v-model="chatNameFilter" tabindex="0" dense outlined :placeholder="$t('component_search')"
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
        <q-scroll-area class="col-2 q-mx-md" :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }">


          <div class="row q-mb-xs">
            <q-btn v-if="globalState.isLogin" no-caps unelevated style="width: 100%" dense
                   @click="toSpecifyPageWithQuery( thisRouter, 'space',{id: globalState.userData.id})">
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
            <q-btn v-else no-caps unelevated style="width: 100%" dense
                   @click="toSpecifyPageWithQuery( thisRouter, 'space',{id: 'UV1'})">
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
            <q-btn no-caps unelevated style="width: 100%" dense @click="openChatSetting = true">
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

        </q-scroll-area>


      </div>

      <div class="col-12 col-md row relative-position" style="height: 100%">
        <q-separator class="component-separator-base" vertical style="margin: 5rem 2% 0 0"/>

        <div v-show="!socketChatState.webChattingFocusChat
        || !socketChatState.webChattingFocusChat.userChattingData">
          <q-spinner-bars style="position: absolute; top: 50%;right: 50%" size="40px"/>
        </div>


        <div v-show="openChatSetting" class="col column animate__animated animate__fadeIn"
             style="height: 100%; padding: 5rem 0 2rem 0">
          <div class="row q-mb-md justify-between q-mx-sm">
            <div style="font-size: 1.4rem; font-weight: 600">
              {{ $t('main_chat_setting') }}
            </div>
          </div>

          <div class="col column justify-between">

            <q-scroll-area class="col q-mx-sm q-pb-xl"
                           :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }">
              <div class="q-mt-sm">
                <h6>
                  {{ $t('main_chat_setting_hide_no_detail') }}
                </h6>
              </div>
              <div class="q-mb-sm row justify-evenly">
                <q-radio v-model="chatSetting.hideNotificationDetail" :val="true" :label="$t('main_setting_yes')"
                         class="component-ratio-base"
                         checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                         @update:model-value="(it) => updateHideNotificationDetail(it)"/>
                <q-radio v-model="chatSetting.hideNotificationDetail" :val="false" :label="$t('main_setting_no')"
                         class="component-ratio-base"
                         checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                         @update:model-value="(it) => updateHideNotificationDetail(it)"/>
              </div>

              <div class="q-mt-sm">
                <h6>
                  {{ $t('main_chat_setting_emoji_pro') }}
                </h6>
                <div class="q-mb-sm" style="opacity: .5; font-size: .75rem">
                  {{ $t('main_chat_setting_emoji_tips') }}
                </div>
              </div>
              <div class="q-mb-sm row justify-start">
                <div class="row">
                  <div v-for="(emoji, index) in globalState.starEmojiList" :key="index">
                    <div class="relative-position"
                         @mouseenter="emoji.show = true"
                         @mouseleave="emoji.show = false">
                      <q-img :ratio="1" fit="contain" :src="emoji.readAddress" class="q-ma-sm"
                             style="height: 5.5rem; width: 5.5rem; border-radius: 8px">
                      </q-img>
                      <div v-show="emoji.show" @click="deleteEmojiPro(emoji)"
                           class="cask-chatroom-setting-emoji-delete-btn
                           row justify-end items-start cask-jump-link-neg">
                        <q-icon size="20px" name="fa-solid fa-circle-xmark" style="opacity: .95;"/>
                      </div>
                    </div>
                  </div>
                  <div class="q-ma-xs cask-cursor-pointer column justify-center items-center"
                       @click="showEmojiUpload = true"
                       style="height: 5rem; width: 5rem; border-radius: 8px; border: 2px dashed rgb(var(--text-color));">
                    <q-icon class="q-my-xs" size="1rem" name="fa-solid fa-upload" style="opacity: .95;"/>
                    <div class="q-my-xs" style="opacity: .95; font-size: .72rem">
                      {{ $t('main_long_text_upload_emoji') }}
                    </div>
                  </div>
                </div>
              </div>
            </q-scroll-area>


            <div class="row justify-between" style="margin: 1% 20%">
              <q-btn no-caps unelevated class="shadow-2 component-full-btn-std" @click="updateChatSetting">
                <div class="row items-center">
                  <div class="q-mx-xs">
                    {{ $t('main_setting_save') }}
                  </div>
                </div>
              </q-btn>
              <q-btn no-caps unelevated class="shadow-2 component-full-btn-std" @click="cancelChatSetting">
                <div class="row items-center">
                  <div class="q-mx-xs">
                    {{ $t('main_setting_cancel') }}
                  </div>
                </div>
              </q-btn>
            </div>
          </div>
        </div>


        <div v-show="!openChatSetting" class="col column animate__animated animate__fadeIn"
             style="height: 100%; padding: 5rem 0 10rem 0">

          <div class="row q-mb-md justify-between q-mx-sm">
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
            <cask-chatroom-body :reset-rely-data="updateChatReply"/>
          </div>

        </div>

        <q-separator class="component-separator-base" vertical style="margin: 5rem 0 0 2%"/>

        <div v-show="!openChatSetting">
          <div style="height: 15px;color: rgb(var(--pointer)); right: 3%; left: 3%; bottom: 10rem"
               class="absolute bg-transparent row items-center justify-between q-px-sm">
            <div v-if="replyChatUserName" style="font-size: 0.95rem" class="cask-cursor-pointer">
              @{{ replyChatUserName }}&nbsp;:
            </div>
            <div v-if="replyChatUserName" style="font-size: 0.85rem" class="q-mr-sm cask-jump-link-in-text-origin"
                 @click="cancelReplySub">
              {{ $t('main_article_cancel_reply') }}
            </div>
          </div>
          <cask-long-text-input v-if="socketChatState.webChattingFocusChat" is-absolute
                                id="comment-reply-input" :elements="new Map([
                  [CaskLongTextInputElement.FILE, {callback: sendFile}],
                  [CaskLongTextInputElement.IMG, {callback: sendImg}],
                  [CaskLongTextInputElement.EMOJI, {callback: sendEmoji}],
                  [CaskLongTextInputElement.CALL, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
                  ])" :sendCallback="sendChatMsg" v-model="socketChatState.webChattingFocusChat.webInputText"
                                :placeholder="replyChatContent"
                                @update:model-value="data => socketChatState.webChattingFocusChat.webInputText = data"
                                style="right: 3%; left: 3%; bottom: .5rem" class="absolute"/>
        </div>

      </div>

      <div v-show="!globalState.screenMini" style="width: 20.5%" class="column justify-end">

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

            <div class="text-center q-mt-sm cask-cursor-pointer" style="font-size: 1.4rem; font-weight: 600"
                 @click="toSpecifyPageWithQuery( thisRouter, 'space',{id:
                 socketChatState.webChattingFocusChat.chatUserId})">
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
                  <q-btn v-if="socketChatState.webChattingFocusChat.chatGroupUsers &&
                  socketChatState.webChattingFocusChat.chatGroupUsers.length "
                         round style="height: 40px; width: 40px" no-wrap flat class="q-mt-xs q-ml-xs">
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

    <cask-dialog-upload-file ref="uploadEmojiDialog" :dialog-judgment-data="{
      title: 'main_long_text_input_emoji_title', content: 'main_long_text_input_image_content',
      uploadAccept: '.webp,.png,.jpg,.jpeg,.gif',uploadMaxSize: 20480,
      falseLabel: 'main_long_text_input_cancel', trueLabel: 'main_long_text_input_emoji_upload', tips:
      ['main_long_text_input_emoji_tip1','main_long_text_input_emoji_tip2','main_long_text_input_emoji_tip3',]}"
                             :callback-method="uploadEmojiCallback"
                             v-model="showEmojiUpload"
    />

  </q-layout>
</template>

<script setup>

import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {browserNotificationCheck, notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
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
import {hideChat} from "@/api/chat";
import {useI18n} from "vue-i18n";
import {delay} from "@/utils/base-tools";
import {unstarEmoji, uploadUserFile} from "@/api/file";
import {toSpecifyPageWithQuery} from "@/router";
import {useRouter} from "vue-router";
import CaskChatroomBody from "@/ui/views/CaskChatroomBody.vue";
import {getChatSettingObj, updateChatSettingJson} from "@/utils/global-tools";
import {updateStarEmoji} from "@/utils/biz";
import CaskDialogUploadFile from "@/ui/components/CaskDialogUploadFile.vue";
import emitter from "@/utils/bus";

const thisRouter = useRouter()
const globalState = useGlobalStateStore();
const {t} = useI18n()
const RES_ADD = process.env.VUE_APP_RES_ADD

const showEmojiUpload = ref(false)
const openChatSetting = ref(false)
const chatNameFilter = ref("")
const chatSetting = ref(getChatSettingObj())
const pinChatIdMapArr = computed(() => {
  return Object.entries(globalState.pinChatIdMap).filter(([key, value]) => value !== undefined);
});
// reply
const replyChatMessageId = ref("")
const replyChatMessage = ref("")
const replyChatContent = ref("")
const replyChatUserName = ref("")


watch(() => socketChatState.chattingDataWebSelected, () => {
  cancelReplySub()
})

watch(
    () => globalState.language,
    () => {
      if (socketChatState.webChattingFocusChat) {
        messageTimeLabelBuilder(socketChatState.webChattingFocusChat.userChattingData)
      }
      if (replyChatMessage.value) {
        if (replyChatMessage.value.startsWith(RES_ADD)) {
          replyChatContent.value = t('main_chat_operation_reply') + ": " + t('main_chat_body_file_in_tree')
        } else {
          replyChatContent.value = t('main_chat_operation_reply') + ": " + replyChatMessage.value
        }
      }
      rebuildChattingDataWeb()
    }
);

watch(
    () => socketChatState.forceFocusChat,
    () => {
      if (socketChatState.forceFocusChat.chatId &&
          socketChatState.forceFocusChat.chatId !== socketChatState.chattingDataWebSelected) {
        chattingDataInit(true)
      }
    }
)

function updateChatReply(id, userName, message) {
  replyChatMessageId.value = id
  replyChatMessage.value = message
  replyChatUserName.value = userName
  if (message && message.startsWith(RES_ADD)) {
    replyChatContent.value = t('main_chat_operation_reply') + ": " + t('main_chat_body_file_in_tree')
  } else {
    replyChatContent.value = t('main_chat_operation_reply') + ": " + message
  }
}

function cancelReplySub() {
  replyChatMessageId.value = ""
  replyChatMessage.value = ""
  replyChatUserName.value = ""
  replyChatContent.value = ""
}

const searchChatName = (node, filter) => {
  const filterLow = filter.toLowerCase()
  return node.label && node.label.toLowerCase().indexOf(filterLow) > -1 && node.avatar
}

function updateHideNotificationDetail(data) {
  chatSetting.value.hideNotificationDetail = data
}

const cancelChatSetting = () => {
  chatSetting.value = getChatSettingObj()
  openChatSetting.value = false
}

const updateChatSetting = () => {
  updateChatSettingJson(chatSetting.value)
  openChatSetting.value = false
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
    globalState.deletePinChat(chatId)
  } else {
    notifyTopWarning(t('no_login'))
  }
}

const sendFile = async (data) => {
  if (!globalState.isLogin) {
    notifyTopWarning(t('no_login'))
    return false
  }
  //build
  let formData = new FormData();
  formData.append('file', data, data.name)
  const res = await uploadUserFile({fileType: 0}, formData)
  if (!res || !res.data || !res.data.data) {
    notifyTopWarning(t('file_no_limit'))
    return false
  }
  const readAddress = res.data.data.readAddress
  socketSend(socketChatState.webChattingFocusChat.chatId, readAddress,
      replyChatMessageId.value, replyChatUserName.value, replyChatMessage.value)
  cancelReplySub()
  return true
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
    notifyTopWarning(t('file_no_limit'))
    return false
  }
  const readAddress = res.data.data.readAddress
  socketSend(socketChatState.webChattingFocusChat.chatId, readAddress,
      replyChatMessageId.value, replyChatUserName.value, replyChatMessage.value)
  cancelReplySub()
  return true
}

const sendEmoji = (url) => {
  if (globalState.isLogin) {
    socketSend(socketChatState.webChattingFocusChat.chatId, url,
        replyChatMessageId.value, replyChatUserName.value, replyChatMessage.value)
    cancelReplySub()
  } else {
    notifyTopWarning(t('main_chat_not_login_message'))
  }
}

const sendChatMsg = () => {
  if (socketChatState.webChattingFocusChat.webInputText) {
    if (globalState.isLogin) {
      socketSend(socketChatState.webChattingFocusChat.chatId, socketChatState.webChattingFocusChat.webInputText,
          replyChatMessageId.value, replyChatUserName.value, replyChatMessage.value)
      cancelReplySub()
      socketChatState.webChattingFocusChat.webInputText = ""
    } else {
      notifyTopWarning(t('main_chat_not_login_message'))
    }
  } else {
    notifyTopWarning(t('main_article_cancel_reply_error'))
  }
}

const uploadEmojiCallback = async (isSend, data) => {
  if (!isSend) {
    showEmojiUpload.value = false
    return
  }
  if (!data) {
    notifyTopWarning(t('main_long_text_input_image_empty'))
    return
  }
  if (!globalState.isLogin) {
    notifyTopWarning(t('no_login'))
    return
  }
  //build
  let formData = new FormData();
  formData.append('file', data, data.name)
  const res = await uploadUserFile({fileType: 1}, formData)
  if (!res || !res.data || !res.data.data) {
    notifyTopWarning(t('file_no_limit'))
    return false
  } else {
    updateStarEmoji(true)
    showEmojiUpload.value = false
    notifyTopPositive(t('main_long_text_input_emoji_upload_success'))
    return true
  }
}

function deleteEmojiPro(emoji) {
  unstarEmoji(emoji.id).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    emitter.emit('reloadStarEmoji')
  })
}


function handleVisibilityChange() {
  socketChatState.needBrowserNotification = document.hidden
}

onMounted(() => {
  browserNotificationCheck()
  chattingDataInit(true)
  initChatSocket()
  updateStarEmoji(false)
  socketChatState.needBrowserNotification = false
  document.addEventListener("visibilitychange", handleVisibilityChange);
})

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  socketChatState.needBrowserNotification = true
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

.cask-chatroom-setting-emoji-delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
}

</style>