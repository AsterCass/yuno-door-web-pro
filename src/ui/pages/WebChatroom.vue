<template>
  <q-layout view="hhh lpr fff" class="component-full-screen-with-header column">
    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
    ]"/>


    <div class="col-grow">

      <cask-long-text-input id="comment-reply-input" :elements="new Map([
          [CaskLongTextInputElement.FILE, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
          [CaskLongTextInputElement.IMG, {callback: (data)=> {src=data}}],
          [CaskLongTextInputElement.EMOJI, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
          [CaskLongTextInputElement.CALL, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
          ])" :placeholder="chatroomPlace" :sendCallback="callback" v-model="chatroomInput"
                            @update:model-value="data => chatroomInput = data"
      />
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
import CaskLongTextInput from "@/ui/components/CaskLongTextInput.vue";
import {CaskLongTextInputElement, CaskModuleElement} from "@/constant/enums/component-enums";

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