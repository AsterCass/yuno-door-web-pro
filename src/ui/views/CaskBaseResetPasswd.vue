<template>
  <q-dialog :model-value="showUserResetPassword"
            @update:model-value="(newValue) => {$emit('update:showUserResetPassword', newValue)}"
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
            <span style="opacity: .5">{{ $t('main_reset_passwd_subtitle') }}</span>
          </div>
        </div>

        <div class="q-mx-md">


          <q-input v-model="inputMail" tabindex="0" dense outlined
                   class="q-ma-md component-outline-input-grow-on-semi-trans">
            <template v-slot:prepend>
              <div class="row items-center justify-between">
                <q-icon class="q-mr-sm" name="fa-regular fa-envelope" size="1rem"/>
                <div style="opacity: 0.8">
                  {{ $t('main_register_mail') }}
                </div>
              </div>
            </template>
          </q-input>

          <q-input v-model="inputPassword" tabindex="0" dense outlined :type="passwdType"
                   class="q-mt-md q-mx-md component-outline-input-grow-on-semi-trans">
            <template v-slot:prepend>
              <div class="row items-center justify-between">
                <q-icon class="q-mr-sm" name="fa-solid fa-unlock-keyhole" size="1rem"/>
                <div style="opacity: 0.8">
                  {{ $t('main_register_passwd') }}
                </div>

              </div>
            </template>
          </q-input>


          <div class="q-mt-xs row justify-start q-mx-lg text-center items-center">
            <div class="cask-jump-link-in-text-more" style="opacity: .5; font-size: .75rem"
                 @click="updateShowPasswd"> {{ $t(showPasswdText) }}
            </div>
          </div>

          <div class="row justify-center items-center q-mt-md">

            <q-btn no-caps unelevated class="q-mx-xs shadow-2 component-full-btn-grow" :disable="inSendingMail"
                   style="background-color: rgb(var(--semi-bg-container-background-color)) !important"
                   @click="userSendCode">
              <div class="row items-center">
                <div class="q-mr-sm" style="font-size: 14px">
                  {{ mailWaitSecond ? mailWaitSecond : $t('main_register_code_send') }}
                </div>
                <q-icon name="fa-regular fa-paper-plane" size="15px"/>
              </div>
            </q-btn>

            <q-input v-model="inputCode" tabindex="0" dense outlined
                     class="q-mx-xs component-outline-input-grow-on-semi-trans-mini">
              <template v-slot:prepend>
                <div class="row items-center justify-between">
                  <q-icon class="q-mr-sm" name="fa-regular fa-envelope" size="1rem"/>
                  <div style="opacity: 0.8">
                    {{ $t('main_register_code') }}
                  </div>
                </div>
              </template>
            </q-input>

          </div>


        </div>


        <div class="row justify-center q-mt-md">
          <q-btn no-caps unelevated class="q-ma-md shadow-2 component-full-btn-grow" :disable="inReseting"
                 style="background-color: rgb(var(--semi-bg-container-background-color)) !important"
                 @click="userResetPasswd">
            <div class="row items-center">
              <div class="q-mr-sm" style="font-size: 14px">
                {{ $t('main_reset_passwd_btn') }}
              </div>
              <q-icon name="fa-solid fa-arrow-right-to-bracket" size="15px"/>
            </div>
          </q-btn>
        </div>

        <div class="q-mb-md row justify-center q-mx-md text-center items-center">
          <q-checkbox v-model="agreePrivacy" :val="true" class="component-ratio-base q-mr-sm" dense
                      checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
          <span style="opacity: .9">{{ $t('main_login_privacy_pre') }}</span>
          <span @click="toSpecifyPage(thisRouter, 'privacy')"
                class="cask-jump-link-in-text">&nbsp;{{ $t('main_login_privacy_center') }}&nbsp;</span>
        </div>


      </div>
    </div>

  </q-dialog>
</template>

<script setup>
import {defineEmits, defineProps, ref} from "vue";
import {toSpecifyPage} from "@/router";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useGlobalStateStore} from "@/utils/global-state";
import {checkAccount, checkIsMail, checkIsPasswd} from "@/utils/format-check";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import {registry, resetPasswd, sendRegMail, sendResetMail, userLogin} from "@/api/user";
import {generalOneWayEncryptStr} from "@/utils/crypto";

const globalState = useGlobalStateStore();
const {t} = useI18n()
const thisRouter = useRouter()

const props = defineProps({
  showUserResetPassword: {
    type: Boolean,
    required: false,
    default: () => {
      return false
    }
  },
})

const emit = defineEmits(['update:showUserResetPassword'])

const inputMail = ref('')
const inputPassword = ref('')
const inputCode = ref('')
const agreePrivacy = ref(false)
const showPasswd = ref(false)
const passwdType = ref("password")
const showPasswdText = ref('main_register_show_passwd')

const inSendingMail = ref(false)
const mailWaitSecond = ref(0)
let sendMailTimer = 0

const inReseting = ref(false)

const updateShowPasswd = () => {
  if (showPasswd.value) {
    showPasswd.value = false;
    passwdType.value = 'password'
    showPasswdText.value = 'main_register_show_passwd'
  } else {
    showPasswd.value = true;
    passwdType.value = 'text'
    showPasswdText.value = 'main_register_hide_passwd'
  }
}

//生成发送邮箱定时器
function waitEmailSend(waitTimeSecond) {
  mailWaitSecond.value = waitTimeSecond;
  sendMailTimer = setInterval(() => {
    --mailWaitSecond.value
    if (0 >= mailWaitSecond.value) {
      waitStop()
    }
  }, 1000);
}

//删除发送邮箱定时器
function waitStop() {
  clearInterval(sendMailTimer);
  sendMailTimer = 0
  mailWaitSecond.value = 0
  inSendingMail.value = false
}

const userSendCode = () => {
  inSendingMail.value = true
  if (!checkIsMail(inputMail.value)) {
    notifyTopWarning(t('main_register_mail_check'))
    inSendingMail.value = false
    return
  }

  sendResetMail({mail: inputMail.value}).then(res => {
    if (!res || !res.data) {
      inSendingMail.value = false
      return
    }
    waitEmailSend(60)
  })
}

const userResetPasswd = async () => {
  let resetBody = {}
  if (!agreePrivacy.value) {
    notifyTopWarning(t('main_login_message_check'))
    return
  }
  if (!checkIsMail(inputMail.value)) {
    notifyTopWarning(t('main_register_mail_check'))
    return
  }
  resetBody.mail = inputMail.value
  if (!checkIsPasswd(inputPassword.value)) {
    notifyTopWarning(t('main_register_passwd_check'))
    return
  }
  if (!inputCode.value) {
    notifyTopWarning(t('main_register_code_check'))
    return
  }
  resetBody.confirmCode = inputCode.value
  // Call
  inReseting.value = true
  // passwd
  resetBody.passwdMail = await generalOneWayEncryptStr(inputPassword.value, inputMail.value)
  resetPasswd(resetBody).then(res => {
    if (!res || !res.data) {
      inReseting.value = false
      return
    }
    let currentBody = {accountMail:  resetBody.mail,
      passwd: resetBody.passwdMail}
    userLogin(currentBody).then(res => {
      if (!res || !res.data || !res.data.data) {
        inReseting.value = false
        return
      }
      globalState.updateUserData(res.data.data)
      emit('update:showUserResetPassword', false)
      notifyTopPositive(t('main_login_success'))
      inReseting.value = false
    })
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

</style>