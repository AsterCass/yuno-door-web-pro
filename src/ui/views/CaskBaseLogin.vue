<template>
  <q-dialog :model-value="showUserLogin"
            @update:model-value="(newValue) => {$emit('update:showUserLogin', newValue)}"
            transition-show="fade" transition-hide="fade">

    <div class="top-semi-trans-header-login">
      <div class="full-height column justify-evenly">

        <div class="row justify-center" style="margin-top: -15px !important">
          <h4>
            astercasc.com
          </h4>
        </div>
        <div class="row justify-center q-mx-md text-center q-mb-md">
          <div>
            <span style="opacity: .5">{{ $t('main_login_subtitle_pre') }}</span>
            <span @click=" emit('update:showUserLogin', false); showUserRegister = true"
                  class="cask-jump-link-in-text">{{ $t('main_login_subtitle_center') }}</span>
            <!--            <span style="opacity: .5"> {{ $t('main_login_subtitle_reset_pre') }}</span>-->
            <!--            <span @click="showUserReset = true"-->
            <!--                  class="cask-jump-link-in-text">{{ $t('main_login_subtitle_reset_center') }}</span>-->
          </div>
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
                   class="q-mt-md q-mx-md component-outline-input-grow-on-semi-trans">
            <template v-slot:prepend>
              <div class="row items-center justify-between">
                <q-icon class="q-mr-sm" name="fa-solid fa-unlock-keyhole" size="1rem"/>
                <div style="opacity: 0.8">
                  {{ $t('main_login_password') }}
                </div>

              </div>
            </template>
          </q-input>

          <div class="q-mx-lg q-mt-sm" style="opacity: .5; font-size: .75rem">
            {{ $t('main_login_passwd_tips') }}
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

          <q-icon name="fa-brands fa-github" size="2rem" class="cursor-pointer"
                  @click="githubLogin"/>


          <div class="relative-position">
            <button class="gsi-material-button" @click="openLink(googleLoginUrl, false)">
              <div class="gsi-material-button-state"></div>
              <div class="gsi-material-button-content-wrapper">
                <div class="gsi-material-button-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                       xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                    <path fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
              </div>
            </button>
            <div v-show="!agreePrivacy"
                 class="absolute bg-transparent gsi-material-button-mask cursor-pointer "
                 @click="notifyTopWarning($t('main_login_message_check'))">
            </div>
          </div>


          <q-icon name="fa-brands fa-qq" size="2rem" class="cursor-pointer"
                  @click="notifyTopWarning($t('in_develop'))" style="color: rgb(0, 153, 255)"/>

        </div>


      </div>

      <div class="q-my-md row justify-center q-mx-md text-center items-center">
        <q-checkbox v-model="agreePrivacy" :val="true" class="component-ratio-base q-mr-sm" dense
                    checked-icon="task_alt" unchecked-icon="panorama_fish_eye" style="margin-top: 1px"/>
        <span style="opacity: .9">{{ $t('main_login_privacy_pre') }}</span>
        <span @click="toSpecifyPage(thisRouter, 'privacy')"
              class="cask-jump-link-in-text">&nbsp;{{ $t('main_login_privacy_center') }}&nbsp;</span>
      </div>
    </div>

  </q-dialog>

  <CaskBaseRegister v-model:showUserRegister="showUserRegister"/>

</template>

<script setup>
import {defineEmits, defineProps, ref} from "vue";
import {toSpecifyPage} from "@/router";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import {userLogin} from "@/api/user";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useGlobalStateStore} from "@/utils/global-state";
import {openLink} from "@/utils/base-tools";
import CaskBaseRegister from "@/ui/views/CaskBaseRegister.vue";

const globalState = useGlobalStateStore();
const {t} = useI18n()
const thisRouter = useRouter()

const props = defineProps({
  showUserLogin: {
    type: Boolean,
    required: false,
    default: () => {
      return false
    }
  },
})

const emit = defineEmits(['update:showUserLogin'])

const googleLoginUrl = "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=1040525610111-i83lfidjd5bhfi6m5v1amoeasdbal02s.apps.googleusercontent.com" +
    "&redirect_uri=https://www.astercasc.com/auth/google/callback" +
    "&response_type=code&scope=email profile&access_type=offline"

const githubLoginUrl = "https://github.com/login/oauth/authorize?" +
    "client_id=Ov23liujVlKgU8PoEOfb&redirect_uri=https://www.astercasc.com/auth/github/callback&scope=user user:email"
const inputAccount = ref('')
const inputPassword = ref('')
const agreePrivacy = ref(false)

const showUserRegister = ref(false)
// const showUserReset = ref(false)

const githubLogin = () => {
  if (!agreePrivacy.value) {
    notifyTopWarning(t('main_login_message_check'))
    return
  }
  openLink(githubLoginUrl, false)
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
    emit('update:showUserLogin', false)
    notifyTopPositive(t('main_login_success'))
  })
}

</script>

<style scoped lang="scss">

.top-semi-trans-header-login {
  transform: translateY(-2rem);
  width: 400px;

  color: rgb(var(--text-color));
  border-radius: 8px;
  background-color: rgb(var(--container-background-color));
  backdrop-filter: blur(30px);
  padding: 40px 2px 10px 2px;

  font-size: .9rem;
}


.gsi-material-button {
  background-color: transparent;
  background-image: none;
  border: none;
  -webkit-border-radius: 20px;
  border-radius: 20px;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-align: center;
  -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  max-width: 400px;
  min-width: min-content;
  height: 2rem;
  width: 2rem;
}

.gsi-material-button-mask {
  top: -1rem;
  left: -1rem;
  height: 4rem;
  width: 4rem;
}


</style>