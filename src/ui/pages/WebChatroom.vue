<template>
  <q-layout view="hhh lpr fff" class="component-full-screen column">
    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
    ]" :always-show="true"/>


    <div class="col-grow row">

      <div v-show="!globalState.screenMini" class="col-lg-2 cask-chatroom-left column">

        <div class="col-1">

        </div>
        <div class="col-9 column justify-between">

          <q-separator class="component-separator-base q-my-sm" inset/>

          <cask-dynamic-card
              :data-image="globalState.userData.avatar">
            <template v-slot:header>
              <h1>
                Canyons
              </h1>
            </template>
            <template v-slot:content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </template>
          </cask-dynamic-card>

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

      <div class="col-12 col-lg-8 relative-position">


        <cask-long-text-input id="comment-reply-input" :elements="new Map([
                  [CaskLongTextInputElement.FILE, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
                  [CaskLongTextInputElement.IMG, {callback: (data)=> {src=data}}],
                  [CaskLongTextInputElement.EMOJI, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
                  [CaskLongTextInputElement.CALL, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
                  ])" :placeholder="chatroomPlace" :sendCallback="callback" v-model="chatroomInput"
                              @update:model-value="data => chatroomInput = data"
                              style="right: 10%; left: 10%; bottom: .5rem" class="absolute"/>
      </div>

      <div v-show="!globalState.screenMini">

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
import CaskDynamicCard from "@/ui/components/CaskDynamicCard.vue";

const globalState = useGlobalStateStore();

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