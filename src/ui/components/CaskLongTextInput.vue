<template>


  <div class="component-long-text-input position-relative">

    <div v-if="elements.has(CaskLongTextInputElement.EMOJI)" v-click-outside="hideEmojiBoard"
         :class="showEmojiBoard ? 'emoji-show' : 'emoji-hide'" class="absolute cask-long-text-input-emoji row q-pa-sm">

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
    </div>

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
                 @click="elements.get(CaskLongTextInputElement.IMG).callback">
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
import {EmojiExampleList} from "@/constant/enums/emoji-ex";
import {socketChatState} from "@/utils/global-state-no-save";
import {useGlobalStateStore} from "@/utils/global-state";
import {delay} from "@/utils/base-tools";

const globalState = useGlobalStateStore();

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

watch(() => props.modelValue, () => {
  mainInput.value = props.modelValue
})

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
      const file = item.getAsFile();
      const reader = new FileReader();
      reader.onload = (data) => {
        if (props.elements.has(CaskLongTextInputElement.IMG)) {
          props.elements.get(CaskLongTextInputElement.IMG).callback(data.target.result);
        }
      };
      reader.readAsDataURL(file);
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
  delay(100).then(() => {
    showEmojiBoard.value = !showEmojiBoard.value
  })
}

function addEmoji(emoji) {
  mainInput.value += emoji
  emit('update:modelValue', mainInput.value)
}

onMounted(() => {
  if (props.elements.has(CaskLongTextInputElement.FILE) || props.elements.has(CaskLongTextInputElement.IMG)) {
    caskLongTextInputRef.value.$el.addEventListener('paste', pasteEventHandle)
  }
})

onBeforeUnmount(() => {
  caskLongTextInputRef.value.$el.removeEventListener('paste', pasteEventHandle)
})


</script>

<style scoped lang="scss">

.cask-long-text-input-emoji {
  top: -20rem;
  left: 50%;
  right: 0;
  height: 20rem;
  border-radius: 8px;
  transition: opacity .5s ease, transform .5s ease;
  background-color: rgba(var(--text-color), .07);
  backdrop-filter: saturate(200%) blur(30px);

  &.emoji-show {
    opacity: 1;
    transform: translateY(0);
  }

  &.emoji-hide {
    pointer-events: none;
    transform: translateY(50%);
    opacity: 0;
  }

}


</style>