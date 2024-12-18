<template>


  <div class="component-long-text-input position-relative">

    <div v-if="elements.has(CaskLongTextInputElement.EMOJI)" v-click-outside="hideEmojiBoard"
         :class="showEmojiBoard ? 'emoji-show' : 'emoji-hide'"
         class="absolute cask-long-text-input-emoji column q-pa-sm">

      <div class="full-width">
        <cask-tabs :tabs="emojiTabs" v-model="currentEmojiTab" dense/>
      </div>

      <q-tab-panels v-model="currentEmojiTab" animated class="col bg-transparent">
        <q-tab-panel name="emoji" class="no-padding bg-transparent">
          <q-scroll-area v-if="socketChatState.webChattingFocusChat" :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }"
                         class="full-width full-height">
            <div class="row">
              <div v-for="(emoji, index) in EmojiExampleList" :key="index">
                <div class="q-ma-sm cask-cursor-pointer" style="font-size: 1.5rem" @click="addEmoji(emoji)">
                  {{ emoji }}
                </div>
              </div>
            </div>
          </q-scroll-area>
        </q-tab-panel>

        <q-tab-panel name="kaomoji" class="no-padding bg-transparent">
          <q-scroll-area v-if="socketChatState.webChattingFocusChat" :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }"
                         class="full-width full-height">
            <div class="row">
              <div v-for="(emoji, index) in KaomojiExampleList" :key="index">
                <q-btn no-caps unelevated class="component-none-btn-mini-grow q-ma-xs"
                       style="font-size: 1.2rem" @click="addEmoji(emoji)">
                  <div class="row items-center">
                    <div class="q-mx-xs">
                      {{ emoji }}
                    </div>
                  </div>
                </q-btn>
              </div>
            </div>
          </q-scroll-area>
        </q-tab-panel>

        <q-tab-panel name="emojipro" class="no-padding bg-transparent">
          <q-scroll-area v-if="socketChatState.webChattingFocusChat" :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }"
                         class="full-width full-height">
            <div class="row">
              <div v-for="(emoji, index) in starEmojiList" :key="index"
                   @click="hideEmojiBoard(); elements.get(CaskLongTextInputElement.EMOJI).callback(emoji.readAddress)">
                <q-img :ratio="1" fit="contain" :src="emoji.readAddress" class="q-ma-xs cask-cursor-pointer"
                       style="height: 5rem; width: 5rem; border-radius: 8px">
                </q-img>
              </div>
            </div>
          </q-scroll-area>
        </q-tab-panel>

      </q-tab-panels>


    </div>

    <cask-dialog-upload-file ref="uploadFileDialog" :dialog-judgment-data="{
      title: 'main_long_text_input_image_title', content: 'main_long_text_input_image_content',
      uploadAccept: '.webp,.png,.jpg,.jpeg,.gif',uploadMaxSize: 5242880,
      falseLabel: 'main_long_text_input_cancel', trueLabel: 'main_long_text_input_send', tips:
      ['main_long_text_input_image_tip1','main_long_text_input_image_tip2','main_long_text_input_image_tip3',
      'main_long_text_input_image_tip4',]}"
                             :callback-method="uploadFileCallback"
                             v-model="showImageUpload"
    />

    <q-input ref="caskLongTextInputRef" @keydown.enter.prevent="forLineBreakSend"
        v-model="mainInput" type="textarea" @update:model-value="emit('update:modelValue', mainInput);"
             :placeholder="placeholder ? placeholder :  $t('main_long_text_input_placeholder')" borderless/>
    <div class="component-long-text-input-bottom row justify-between q-px-sm">
      <div class="row items-center">
        <div v-if="elements.has(CaskLongTextInputElement.FILE)" class="q-mr-sm">
          <q-btn class="component-none-btn-mini-grow" no-caps style="padding: 0!important;" unelevated
                 @click="elements.get(CaskLongTextInputElement.FILE).callback">
            <div class="row items-center q-ma-xs">
              <q-icon name="fa-solid fa-paperclip" size="1.2rem"/>
            </div>
          </q-btn>
        </div>
        <div v-if="elements.has(CaskLongTextInputElement.IMG)" class="q-mr-sm">
          <q-btn class="component-none-btn-mini-grow" no-caps style="padding: 0!important;" unelevated
                 @click="imageHandler">
            <div class="row items-center q-ma-xs">
              <q-icon name="fa-regular fa-image" size="1.2rem"/>
            </div>
          </q-btn>
        </div>
        <div v-if="elements.has(CaskLongTextInputElement.EMOJI)" class="q-mr-sm">
          <q-btn class="component-none-btn-mini-grow" no-caps style="padding: 0!important;" unelevated
                 @click="emojiHandler">
            <div class="row items-center q-ma-xs">
              <q-icon name="fa-regular fa-face-smile" size="1.2rem"/>
            </div>
          </q-btn>
        </div>
        <div v-if="elements.has(CaskLongTextInputElement.CALL)" class="q-mr-sm">
          <q-btn class="component-none-btn-mini-grow" no-caps style="padding: 0!important;" unelevated
                 @click="elements.get(CaskLongTextInputElement.CALL).callback">
            <div class="row items-center q-mx-xs" style="font-size: 20.3px; margin: -2.33px 4.5px 5.5px 4.6px;">
              @
            </div>
          </q-btn>
        </div>
      </div>

      <div>
        <q-btn :disable="!sendEnable" no-caps unelevated class="component-full-btn-mini-grow items-center"
               style="padding: 0!important;" @click="sendCallback">
          <div class="row items-center">
            <div class="q-mx-sm" style="font-size: .9rem">
              {{$t('main_long_text_input_send')}}
            </div>
            <q-icon class="q-mr-sm" name="fa-regular fa-paper-plane" size=".9rem"/>
          </div>
        </q-btn>


      </div>
    </div>

  </div>

</template>

<script setup>

import {defineEmits, defineProps, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {CaskLongTextInputElement} from "@/constant/enums/component-enums";
import {EmojiExampleList, KaomojiExampleList} from "@/constant/enums/emoji-ex";
import {socketChatState} from "@/utils/global-state-no-save";
import {useGlobalStateStore} from "@/utils/global-state";
import {delay} from "@/utils/base-tools";
import CaskTabs from "@/ui/components/CaskTabs.vue";
import {getStarEmojiList} from "@/api/file";
import {customLargePage} from "@/utils/page";
import CaskDialogUploadFile from "@/ui/components/CaskDialogUploadFile.vue";
import {notifyTopWarning} from "@/utils/notification-tools";
import {useI18n} from "vue-i18n";

const globalState = useGlobalStateStore();
const {t} = useI18n()

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  elements: {
    type: Map,
    required: false,
    default: () => {
      return new Map()
    },
  },
  placeholder: {
    type: String,
    required: false,
    default: ""
  },
  sendCallback: {
    type: Function,
    required: false,
    default: () => {
    }
  },
  sendEnable: {
    type: Boolean,
    required: false,
    default: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
})

const mainInput = ref(props.modelValue)
const caskLongTextInputRef = ref(null)
const showEmojiBoard = ref(false)
const showImageUpload = ref(false)
const showImageUploadBtnEnable = ref(true)
const currentEmojiTab = ref('emoji');
const starEmojiList = ref([])
const emojiTabs = ref([
  {value: 'emoji', label: 'main_chat_emoji_tabs_emoji',},
  {value: 'kaomoji', label: 'main_chat_emoji_tabs_kaomoji',},
  {value: 'emojipro', label: 'main_chat_emoji_tabs_emoji_pro'},
])
const uploadFileDialog = ref(null)

watch(() => props.modelValue, () => {
  mainInput.value = props.modelValue
})

function getAllStarEmoji() {
  if (!globalState.isLogin) {
    starEmojiList.value = []
    return
  }
  getStarEmojiList(customLargePage({})).then(res => {
    if (!res || !res.data || !res.data.data) {
      return
    }
    starEmojiList.value = res.data.data.fileEmojis
  })
}

watch(
    () => globalState.isLogin,
    () => getAllStarEmoji()
);

function forLineBreakSend(event) {
  if (event.ctrlKey) {
    mainInput.value += '\n'
  } else {
    props.sendCallback()
  }
}

function pasteEventHandle(event) {
  const clipboardItems = event.clipboardData.items;
  for (const item of clipboardItems) {
    if (item.type.startsWith('image/')) {
      if (props.elements.has(CaskLongTextInputElement.IMG)) {
        const file = item.getAsFile();
        if (uploadFileDialog.value) {
          imageHandler()
          uploadFileDialog.value.insertDialogUploadFileData(file)
        }
      }
    } else if (!item.type.startsWith('text/')) {
      const file = item.getAsFile();
      const reader = new FileReader();
      reader.onload = (data) => {
        if (props.elements.has(CaskLongTextInputElement.FILE)) {
          props.elements.get(CaskLongTextInputElement.FILE).callback(file.name, data.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }
}

const hideEmojiBoard = () => {
  if (showEmojiBoard.value) {
    showEmojiBoard.value = false
  }
}
const emojiHandler = () => {
  if(showEmojiBoard.value) {
    showEmojiBoard.value = false
  } else {
    delay(100).then(() => {
      showEmojiBoard.value = true
    })
  }
}

const hideImageBoard = () => {
  if (showImageUpload.value) {
    showImageUpload.value = false
  }
}

const imageHandler = () => {
  if (showImageUpload.value) {
    showImageUpload.value = false
  } else {
    delay(100).then(() => {
      showImageUpload.value = true
    })
  }
}

const uploadFileCallback = async (isSend, data) => {
  if (!isSend) {
    hideImageBoard()
    return
  }
  if (!data) {
    notifyTopWarning(t('main_long_text_input_image_empty'))
    return
  }
  //todo 兼容文件发送
  showImageUploadBtnEnable.value = false
  const res = await props.elements.get(CaskLongTextInputElement.IMG).callback(data)
  showImageUploadBtnEnable.value = true
  if (res) {
    hideImageBoard()
  }
  return res
}

function addEmoji(emoji) {
  mainInput.value += emoji
  emit('update:modelValue', mainInput.value)
}

onMounted(() => {
  if (props.elements.has(CaskLongTextInputElement.FILE) || props.elements.has(CaskLongTextInputElement.IMG)) {
    caskLongTextInputRef.value.$el.addEventListener('paste', pasteEventHandle)
  }
  getAllStarEmoji()
})

onBeforeUnmount(() => {
  caskLongTextInputRef.value.$el.removeEventListener('paste', pasteEventHandle)
})


</script>

<style scoped lang="scss">

.cask-long-text-input-emoji {
  top: -27rem;
  left: 50%;
  right: 0;
  height: 1rem;
  border-radius: 8px;
  transition: opacity .5s ease, transform .5s ease, height .5s ease;
  background-color: rgba(var(--text-color), .07);
  backdrop-filter: saturate(200%) blur(30px);

  &.emoji-show {
    opacity: 1;
    height: 27rem;
    transform: translateY(0);
  }

  &.emoji-hide {
    pointer-events: none;
    transform: translateY(50%);
    opacity: 0;
  }

}


</style>