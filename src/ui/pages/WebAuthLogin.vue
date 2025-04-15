<template>

  <div class="row justify-center q-mt-xl">


    <div class="full-width row justify-center q-my-xl">
      <div style="width: 30%" class="text-center">
        {{ loginText }}
      </div>
    </div>

    <q-btn no-caps unelevated class="q-ma-md shadow-2 component-full-btn-grow" @click="backToHome(thisRouter)"
           :disable="disableHomeBtn">
      <div class="q-mx-xs">
        {{ $t('back_home') }}
      </div>
    </q-btn>

  </div>
  <div>


  </div>
</template>

<script setup>


import {defineProps, onMounted, ref} from "vue";
import {backToHome} from "@/router";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import {userLoginGoogle} from "@/api/user";
import {useI18n} from "vue-i18n";
import {useGlobalStateStore} from "@/utils/global-state";
import {useRouter} from "vue-router";

const globalState = useGlobalStateStore();
const {t} = useI18n()
const thisRouter = useRouter()

const props = defineProps({
  code: {
    type: String,
    required: false,
    default: ""
  },
  brand: {
    type: String,
    required: false,
    default: "google"
  }
})

const disableHomeBtn = ref(true);

const inLoginText = t('main_in_login_auth')
const loginFail = t('main_login_failed')
const loginSuccess = t('main_login_success')
const loginText = ref(inLoginText)


function googleLoginCallback(code) {
  userLoginGoogle({code: code}).then(res => {
    if (!res || !res.data || !res.data.data) {
      loginText.value = loginFail
      disableHomeBtn.value = false
      return
    }
    globalState.updateUserData(res.data.data)
    loginText.value = loginSuccess
    disableHomeBtn.value = false
    notifyTopPositive(t('main_login_success'))
    backToHome()
  })
}

onMounted(() => {
  if (!props.code) {
    loginText.value = loginFail
    disableHomeBtn.value = false
    notifyTopWarning(t('main_login_google_client_fail'));
    return;
  }
  if ('google' === props.brand) {
    googleLoginCallback(props.code);
  }
})


</script>

<style scoped lang="scss">


</style>