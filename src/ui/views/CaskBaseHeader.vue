<template>
  <q-header :class="mini ? 'top-semi-trans-header-base-mini' : 'top-semi-trans-header-base'"
            :style="globalState.screenMini ? 'margin: 1rem 1rem;' : ''"
  >

    <div class="top-semi-trans-header-base-content row justify-between items-center"
         :class="!alwaysShow && scrollState.scrollTop === 0 ?
         'top-semi-trans-header-base-top' : 'top-semi-trans-header-base-no-top'">

      <div class="row items-center justify-start col-4">
        <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs"
               @click="toSpecifyPage(thisRouter,'previous')">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_pre_version') }}
            </div>
          </div>
        </q-btn>
      </div>

      <div class="row items-center justify-center col-4">
        <q-btn v-if="centerElements.includes(CaskModuleElement.ARTICLE)" no-caps unelevated
               class="component-none-btn-grow q-mx-xs"
               @click="toSpecifyPage(thisRouter,'webArticleList')">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_articles') }}
            </div>
          </div>
        </q-btn>
        <q-btn v-if="centerElements.includes(CaskModuleElement.TOOL)" no-caps unelevated
               class="component-none-btn-grow q-mx-xs"
               @click="toSpecifyPage(thisRouter,'mainToolsList')">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_tools') }}
            </div>
          </div>
        </q-btn>
        <q-btn v-if="centerElements.includes(CaskModuleElement.HOME)" no-caps unelevated
               class="component-none-btn-grow q-mx-xs"
               @click="toSpecifyPage(thisRouter,'main')">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_home') }}
            </div>
          </div>
        </q-btn>
        <q-btn v-if="centerElements.includes(CaskModuleElement.VIDEO)" no-caps unelevated
               class="component-none-btn-grow q-mx-xs"
               @click="toSpecifyPage(thisRouter,'mainVideoCollection')">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_videos') }}
            </div>
          </div>
        </q-btn>
        <q-btn v-if="centerElements.includes(CaskModuleElement.GUEST_BOOK)" no-caps unelevated
               class="component-none-btn-grow q-mx-xs" @click="toSpecifyPage(thisRouter,'board')">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_board') }}
            </div>
          </div>
        </q-btn>
        <q-btn v-if="centerElements.includes(CaskModuleElement.CHATROOM)" no-caps unelevated
               class="component-none-btn-grow q-mx-xs"
               @click="toSpecifyPage(thisRouter, 'chatroom')">
          <div class="row items-center">
            <div class="q-ma-xs">
              {{ $t('main_chat_room') }}
            </div>
          </div>
          <q-badge floating v-show="socketChatState.unReadAllMessages.size > 0"
                   style="background-color: rgb(var(--negative));margin: 5px 2px 0 0; padding: 2px 5px;">
            {{ socketChatState.unReadAllMessages.size }}
          </q-badge>
          <!--          <q-badge floating v-show="!socketChatState.readAllMessages"-->
          <!--                   style="background-color: rgb(var(&#45;&#45;negative)); font-size: .6rem;-->
          <!--                    padding: 1px 3px; min-height: 8px; margin: 7px -4px 0 0">-->
          <!--            {{ $t('main_chat_new_message') }}-->
          <!--          </q-badge>-->
          <!--          <q-badge floating rounded v-show="!socketChatState.readAllMessages"-->
          <!--                   style="background-color: rgb(var(&#45;&#45;negative));-->
          <!--                    padding: 4px; min-height: 8px; margin: 8px 7px 0 0">-->
          <!--          </q-badge>-->
        </q-btn>
      </div>

      <div class="row items-center justify-end col-4">
        <div class="row col justify-end items-center">
          <q-btn v-show="!globalState.isLogin" no-caps unelevated class="component-none-btn-grow q-mx-xs"
                 v-morph:btn:withLogin:800.resize="morphWithLogin"
                 @click="delay(50).then(() => {
                   showHeaderLogin(true)
                 })">
            <div class="row items-center">
              <div class="q-ma-xs">
                {{ $t('main_login') }}
              </div>
            </div>
          </q-btn>
          <q-btn v-show="globalState.isLogin" no-caps unelevated class="component-none-btn-grow q-mx-xs"
                 @click="headerLogout">
            <div class="row items-center">
              <div class="q-ma-xs">
                {{ $t('main_logout') }}
              </div>
            </div>
          </q-btn>
          <q-btn no-caps unelevated class="component-none-btn-grow q-mx-xs" @click="switchLanguage()">
            <div class="row items-center q-ma-xs">
              <q-icon name="fa-solid fa-language" size="1.5rem" style="margin-top: 2px"/>
            </div>
          </q-btn>
        </div>

        <div class="row justify-end items-center" style="min-width: 3rem">
          <q-btn no-caps unelevated class="q-mx-xs" dense round
                 v-morph:btn:withSetting:800.resize="morphWithSetting"
                 @click="delay(50).then(() => {
                   showHeaderSetting(true)
                 })">
            <div class="row items-center">
              <q-icon name="fa-solid fa-gear" size="1.1rem" style="margin-top: 2px"/>
            </div>
          </q-btn>
        </div>

      </div>
    </div>


    <div v-click-outside="() => {showHeaderSetting(false)}"
         class="top-semi-trans-header-setting absolute-right"
         v-morph:page:withSetting:500.resize="morphWithSetting">

      <div v-show="morphWithSettingContentShow">
        <div class="row justify-end">
          <q-btn no-caps unelevated dense size="10px" class="q-mt-sm q-mr-sm q-pa-xs" round
                 icon="fa-solid fa-down-left-and-up-right-to-center"
                 @click="showHeaderSetting(false)"/>
        </div>

        <div class="row justify-center" style="margin-top: -15px !important">
          <h5>
            {{ $t('main_setting_title') }}
          </h5>
        </div>

        <div class="q-mx-md">

          <div class="q-mt-sm">
            <h6>
              {{ $t('main_setting_show_scroller') }}
            </h6>
          </div>
          <div class="q-mb-sm row justify-evenly">
            <q-radio v-model="globalState.hideScroller" :val="false" :label="$t('main_setting_yes')"
                     class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => hideScrollbar(it)"/>
            <q-radio v-model="globalState.hideScroller" :val="true" :label="$t('main_setting_no')"
                     class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => hideScrollbar(it)"/>
          </div>

          <div class="q-mt-sm">
            <h6>
              {{ $t('main_setting_theme') }}
            </h6>
          </div>
          <div class="q-mb-sm row justify-evenly">
            <q-radio v-model="globalState.curThemeName" val="light" :label="$t('main_setting_theme_light')"
                     class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateTheme(it)"/>
            <q-radio v-model="globalState.curThemeName" val="dark" :label="$t('main_setting_theme_dark')"
                     class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateTheme(it)"/>
            <q-radio v-model="globalState.curThemeName" val="green" :label="$t('main_setting_theme_green')"
                     class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateTheme(it)"/>
          </div>

          <div class="q-mt-sm">
            <h6>
              {{ $t('main_setting_save_login_data') }}
            </h6>
          </div>
          <div class="q-mb-sm row justify-evenly">
            <q-radio v-model="globalState.saveLoginData" :val="true" :label="$t('main_setting_yes')"
                     class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateSaveLoginData(it)"/>
            <q-radio v-model="globalState.saveLoginData" :val="false" :label="$t('main_setting_no')"
                     class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateSaveLoginData(it)"/>
          </div>

          <div class="q-mt-sm">
            <h6>
              {{ $t('main_setting_lang') }}
            </h6>
          </div>
          <div class="q-mb-sm row justify-evenly">
            <q-radio v-model="globalState.language" val="zh" label="中文" class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateLanguage(it)"/>
            <q-radio v-model="globalState.language" val="en" label="English" class="component-ratio-base"
                     checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                     @update:model-value="(it) => updateLanguage(it)"/>
          </div>

        </div>

      </div>
    </div>


    <div v-click-outside="() => {showHeaderLogin(false)}"
         class="top-semi-trans-header-login absolute-right"
         v-morph:page:withLogin:500.resize="morphWithLogin">
      <div v-show="morphWithLoginContentShow" class="full-height column justify-evenly">

        <div class="row justify-end">
          <q-btn no-caps unelevated dense size="10px" class="q-mt-sm q-mr-sm q-pa-xs" round
                 icon="fa-solid fa-down-left-and-up-right-to-center"
                 @click="showHeaderLogin(false)"/>
        </div>

        <div class="row justify-center" style="margin-top: -15px !important">
          <h5>
            astercasc.com
          </h5>
        </div>
        <div class="row justify-center q-mx-md text-center q-mb-md">
          <span style="opacity: .5">{{ $t('main_login_subtitle_pre') }}</span>
          <span @click="toSpecifyPage(thisRouter, 'previous')"
                class="cask-jump-link-in-text">&nbsp;{{ $t('main_login_subtitle_center') }}&nbsp;</span>
          <span style="opacity: .5"> {{ $t('main_login_subtitle_post') }}</span>
        </div>

        <div class="q-mx-md">
          <q-input v-model="inputAccount" tabindex="0" dense outlined
                   class="q-ma-md component-outline-input-grow-on-semi-trans">
            <template v-slot:prepend>
              <div class="row items-center justify-between">
                <q-icon class="q-mr-sm" name="fa-regular fa-address-card" size="1rem"/>
                <div style="opacity: 0.8">
                  {{ $t('main_login_account') }}
                </div>
              </div>
            </template>
          </q-input>

          <q-input v-model="inputPassword" tabindex="0" dense outlined type="password"
                   class="q-ma-md component-outline-input-grow-on-semi-trans">
            <template v-slot:prepend>
              <div class="row items-center justify-between">
                <q-icon class="q-mr-sm" name="fa-solid fa-unlock-keyhole" size="1rem"/>
                <div style="opacity: 0.8">
                  {{ $t('main_login_password') }}
                </div>

              </div>
            </template>
          </q-input>

          <div class="q-my-md row justify-start q-mx-md text-center items-center">
            <q-checkbox v-model="agreePrivacy" :val="true" class="component-ratio-base q-mr-sm" dense
                        checked-icon="task_alt" unchecked-icon="panorama_fish_eye" style="margin-top: 1px"/>
            <span style="opacity: .9">{{ $t('main_login_privacy_pre') }}</span>
            <span @click="toSpecifyPage(thisRouter, 'privacy')"
                  class="cask-jump-link-in-text">&nbsp;{{ $t('main_login_privacy_center') }}&nbsp;</span>
          </div>
        </div>


        <div class="row justify-center">
          <q-btn no-caps unelevated class="q-ma-md shadow-2 component-full-btn-grow"
                 style="background-color: rgb(var(--semi-bg-container-background-color)) !important"
                 @click="headerLogin">
            <div class="row items-center">
              <div class="q-mr-sm" style="font-size: 14px">
                {{ $t('main_login') }}
              </div>
              <q-icon name="fa-solid fa-arrow-right-to-bracket" size="15px"/>
            </div>
          </q-btn>
        </div>

        <div class="q-mx-md q-mb-md row justify-evenly items-center">
          <q-separator class="component-separator-base col-grow" inset size="1px"/>
          <div style="opacity:.9">
            {{ $t('main_login_more') }}
          </div>
          <q-separator class="component-separator-base col-grow" inset size="1px"/>
        </div>


        <div class="q-mb-md row justify-evenly items-center">
          <q-btn no-caps unelevated @click="notifyTopWarning($t('in_develop'))">
            <div class="row items-center q-my-sm">
              <q-icon name="fa-brands fa-github" size="1.8rem"/>
            </div>
          </q-btn>
          <q-btn no-caps unelevated @click="notifyTopWarning($t('in_develop'))">
            <div class="row items-center q-my-sm">
              <q-icon name="fa-brands fa-google" size="1.8rem" class="google-logo-text-color"/>
            </div>
          </q-btn>
          <q-btn no-caps unelevated @click="notifyTopWarning($t('in_develop'))">
            <div class="row items-center q-my-sm">
              <q-icon name="fa-brands fa-qq" size="1.8rem" style="color: rgb(0, 153, 255)"/>
            </div>
          </q-btn>

        </div>


      </div>
    </div>


  </q-header>


</template>

<script setup>
import {defineProps, onMounted, ref} from "vue";
import {hideScrollbar, switchLanguage, updateLanguage, updateSaveLoginData, updateTheme} from "@/utils/global-tools";
import {delay} from "@/utils/base-tools";
import {useGlobalStateStore} from "@/utils/global-state";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import {scrollState, socketChatState} from "@/utils/global-state-no-save";
import {useRouter} from "vue-router";
import {toSpecifyPage} from "@/router";
import {userLogin, userLogout} from "@/api/user";
import {useI18n} from "vue-i18n";
import {chattingDataInit, initChatSocket} from "@/utils/chat-socket";
import {CaskModuleElement} from "@/constant/enums/component-enums";

const props = defineProps({
  centerElements: {
    type: Array,
    required: false,
    default: () => {
      return []
    },
  },
  alwaysShow: {
    type: Boolean,
    required: false,
    default: false,
  },
  chatroomSelectFirst: {
    type: Boolean,
    required: false,
    default: false,
  },
  mini: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const globalState = useGlobalStateStore();
const thisRouter = useRouter()
const {t} = useI18n()

const morphWithSetting = ref('btn')
const morphWithSettingContentShow = ref(false)
const morphWithLogin = ref('btn')
const morphWithLoginContentShow = ref(false)

const inputAccount = ref('')
const inputPassword = ref('')
const agreePrivacy = ref(false)

const showHeaderSetting = (isShow) => {
  if (isShow) {
    showHeaderLogin(false)
    morphWithSetting.value = 'page'
    delay(500).then(() => {
      morphWithSettingContentShow.value = true
    })
  } else {
    morphWithSetting.value = 'btn'
    morphWithSettingContentShow.value = false
  }
}

const showHeaderLogin = (isShow) => {
  if (isShow) {
    showHeaderSetting(false)
    morphWithLogin.value = 'page'
    delay(500).then(() => {
      morphWithLoginContentShow.value = true
    })
  } else {
    morphWithLogin.value = 'btn'
    morphWithLoginContentShow.value = false
  }
}

const headerLogin = () => {
  if (!agreePrivacy.value) {
    notifyTopWarning(t('main_login_message_check'))
    return
  }
  if (!inputAccount.value || !inputPassword.value) {
    notifyTopWarning(t('main_login_message_empty'))
    return
  }
  let currentBody = {accountMail: inputAccount.value, passwd: inputPassword.value}
  userLogin(currentBody).then(res => {
    if (!res || !res.data || !res.data.data) {
      return
    }
    globalState.updateUserData(res.data.data)
    notifyTopPositive(t('main_login_success'))
    morphWithLogin.value = 'btn'
  })
}

const headerLogout = () => {
  userLogout().then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    notifyTopPositive(t('main_login_success_logout'))
    globalState.updateToken(null)
  })
}

onMounted(() => {
  chattingDataInit(props.chatroomSelectFirst)
  initChatSocket()
})


</script>

<style scoped lang="scss">

.top-semi-trans-header-base {
  background-color: transparent;
  left: 0;
  right: 0;
  margin: 1rem 4rem;
  min-height: 5rem;
  position: fixed;


  .top-semi-trans-header-base-content {
    min-height: 3rem;
    padding: 0 1rem;
    border-radius: 8px;
    transition: background-color 1s ease, box-shadow 1s ease;
  }
}

.top-semi-trans-header-base-mini {
  background-color: transparent;
  left: 0;
  right: 0;
  margin: 1rem 4rem;
  min-height: 3rem;
  position: fixed;

  .top-semi-trans-header-base-content {
    min-height: 3rem;
    padding: 0 1rem;
    border-radius: 8px;
    transition: background-color 1s ease, box-shadow 1s ease;
  }
}

.top-semi-trans-header-base-top {
  color: rgb(var(--full-container-text-color));
  background-color: transparent;
}

.top-semi-trans-header-base-no-top {
  color: rgb(var(--text-color));
  background-color: rgb(var(--container-background-color));
  box-shadow: inset 0 0 1px 1px rgb(var(--background-color));
  backdrop-filter: saturate(200%) blur(30px);
}

.top-semi-trans-header-setting {
  top: 5rem;
  height: 410px;
  width: 300px;

  color: rgb(var(--text-color));
  border-radius: 8px;
  background-color: rgb(var(--container-background-color));
  border: solid 2px rgba(var(--text-color), .8);
  backdrop-filter: blur(30px);
  padding: 2px;

  font-size: .9rem;
}

.top-semi-trans-header-login {
  top: 5rem;
  height: 500px;
  width: 390px;

  color: rgb(var(--text-color));
  border-radius: 8px;
  background-color: rgb(var(--container-background-color));
  border: solid 2px rgba(var(--text-color), .8);
  backdrop-filter: blur(30px);
  padding: 2px;

  font-size: .9rem;
}


</style>

<style lang="scss">
.top-semi-trans-header-base {
  .q-btn {
    font-size: 1rem;
  }
}

.top-semi-trans-header-base-mini {
  .q-btn {
    font-size: 1rem;
  }
}

.google-logo-text-color {
  background: linear-gradient(180deg,
      #EA4335 0%, #EA4335 30%,
      #4285F4 30%, #4285F4 70%,
      #34A853 70%, #34A853 100%
  );
  -webkit-background-clip: text;
  color: transparent;
}

</style>