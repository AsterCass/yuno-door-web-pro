<template>
  <div>
    <q-dialog :model-value="showUserSpaceSetting" @hide="closeUserSpaceSetting"
              transition-show="fade" transition-hide="fade">
      <q-card class="component-cask-dialog-judgement-std row" style="max-width: 2000px !important">
        <cask-tabs-vertical :tabs="tabs" v-model="tab" width="12rem" text-width="10rem"/>
        <div class="col row" style="min-height: 35rem;">
          <q-separator class="component-separator-base q-mx-lg" vertical/>
          <q-tab-panels v-model="tab" animated class="bg-transparent col" transition-duration="500"
                        transition-prev="jump-down" transition-next="jump-up">
            <q-tab-panel name="base" style="min-width: 30rem; padding: 1rem 0 1rem 0">


              <div class="column full-height">
                <div class="row">
                  <div class="col">
                    <h6>
                      {{ $t('main_space_setting_account_mail') }}
                    </h6>
                    <div>
                      {{ userSettingData.mail }}
                    </div>
                    <h6 style="margin-top: 1rem !important">
                      {{ $t('main_space_setting_account_nickname') }}
                    </h6>
                    <q-input v-model="userSettingData.nickName" tabindex="0" dense outlined
                             class="component-outline-input-mini-grow q-mr-xl" style="opacity: .92">
                    </q-input>
                    <h6 style="margin-top: 1rem !important">
                      {{ $t('main_space_setting_account_gender') }}
                    </h6>
                    <q-select outlined clearable class="component-outline-input-mini-grow q-mr-xl" style="opacity: .92"
                              dropdown-icon="fa-solid fa-caret-down"
                              popup-content-class="component-extra-card-std shadow-0"
                              clear-icon="fa-solid fa-xmark"
                              menu-anchor="bottom start" :menu-offset="[0, 5]"
                              v-model="userSettingData.genderObj" :options="genderOptEnum">
                    </q-select>
                    <h6 style="margin-top: 1rem !important">
                      {{ $t('main_space_setting_account_birth') }}
                    </h6>
                    <cask-date-picker class="q-mr-xl" v-model="userSettingData.birth" style="opacity: .92"/>


                  </div>

                  <div style="width: 200px;" class="column items-center justify-center">
                    <div class="relative-position" style="width: 140px; height: 140px">
                      <q-avatar size="130px" style="filter: blur(3px); position: absolute;">
                        <q-img :src="isDbAvatar ? userSettingData.avatar : currentAvatarBase64"/>
                      </q-avatar>
                      <q-avatar size="120px" style=" position: absolute; left: 5px; top: 5px">
                        <q-img :src="isDbAvatar ? userSettingData.avatar : currentAvatarBase64"/>
                      </q-avatar>
                    </div>
                    <q-btn no-caps unelevated push class="component-full-btn-mini-mini-grow shadow-2 q-mt-sm"
                           style="font-size: 0.75rem !important" @click="startUploadAvatar">
                      {{ $t('main_space_setting_account_avatar_change') }}
                    </q-btn>
                    <q-file ref="avatarUpload" outlined v-model="currentAvatar" v-show="false"
                            accept=".jpg,.jpeg,.png" max-file-size="512000" @rejected="rejectAvatar"/>

                    <div style="font-size: 0.7rem; opacity: .75;" class="q-mt-sm text-center">
                      {{ $t('main_space_setting_account_avatar_tips') }}
                    </div>
                  </div>

                </div>
                <h6 style="margin-top: 1rem !important">
                  {{ $t('main_space_setting_account_motto') }}
                </h6>
                <cask-long-text-input-simple v-model:value="userSettingData.motto"
                                             input-height="5rem"/>


                <div class="col column justify-end">
                  <div class="row justify-evenly">
                    <q-btn no-caps unelevated class="component-full-btn-mini-grow shadow-2"
                           @click="saveUserData()">
                      <div class="row items-center">
                        <div class="q-mx-sm">
                          {{ $t('main_setting_save') }}
                        </div>
                        <q-spinner-ios v-if="inSaveData" size="1rem"/>
                      </div>
                    </q-btn>
                    <q-btn no-caps unelevated class="component-full-btn-mini-grow shadow-2"
                           @click="reloadData();closeUserSpaceSetting(); ">
                      {{ $t('main_setting_cancel') }}
                    </q-btn>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="pro" style="min-width: 30rem; padding: 0">
              <div class="row justify-center items-center full-height">
                {{ $t('in_develop') }}
              </div>
            </q-tab-panel>
            <q-tab-panel name="sec" style="min-width: 30rem; padding: 0">
              <div class="row justify-center items-center full-height">
                {{ $t('in_develop') }}
              </div>
            </q-tab-panel>
            <q-tab-panel name="account" style="min-width: 30rem; padding: 0">
              <div class="row justify-center items-center full-height">
                {{ $t('in_develop') }}
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>

import {useGlobalStateStore} from "@/utils/global-state";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {defineEmits, defineProps, onMounted, ref, watch} from "vue";
import CaskTabsVertical from "@/ui/components/CaskTabsVertical.vue";
import {genderOptEnum, getGenderObj} from "@/constant/enums/gender-opt";
import CaskDatePicker from "@/ui/components/CaskDatePicker.vue";
import CaskLongTextInputSimple from "@/ui/components/CaskLongTextInputSimple.vue";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import {updateAvatar, updateInfo, userDetail} from "@/api/user";
import {checkMotto, checkNickName} from "@/utils/format-check";


const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
})
const showUserSpaceSetting = ref(props.modelValue);

const userSettingData = ref({
  nickName: "",
  gender: 0,
  genderObj: {},
  birth: "",
  motto: "",
})

watch(() => props.modelValue, () => {
  if (props.modelValue) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
  }
  showUserSpaceSetting.value = props.modelValue
})

const {t} = useI18n()
const globalState = useGlobalStateStore();
const thisRouter = useRouter()


const tabs = ref([
  {
    value: 'base',
    label: 'main_space_setting_profile',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'pro',
    label: 'main_space_setting_developer',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'sec',
    label: 'main_space_setting_privacy',
    color: 'rgb(var(--full-container-background-color))'
  },
  {
    value: 'stretch',
    isStretch: true,
  },
  {
    value: 'account',
    label: 'main_space_setting_account',
    color: 'rgb(var(--full-container-background-color))'
  },
])
const tab = ref("base");

const inSaveData = ref(false)

// avatar
const avatarUpload = ref(null);
const isDbAvatar = ref(true)
const currentAvatar = ref(null);
const currentAvatarBase64 = ref("")
const reader = new FileReader();
reader.onload = function () {
  currentAvatarBase64.value = this.result
};

watch(thisRouter.currentRoute, () => {
  tab.value = thisRouter.currentRoute.value.name
});

watch(currentAvatar, () => {
  isDbAvatar.value = false
  reader.readAsDataURL(currentAvatar.value);
})

const startUploadAvatar = () => {
  if (avatarUpload.value) {
    avatarUpload.value.pickFiles()
  }
}

const rejectAvatar = () => {
  notifyTopWarning(t('main_space_setting_account_avatar_tips'))
}

function saveUserData() {
  if (!checkNickName(userSettingData.value.nickName)) {
    notifyTopWarning(t('main_space_setting_account_error_nickname'))
    return
  }
  if (!checkMotto(userSettingData.value.motto)) {
    notifyTopWarning(t('main_space_setting_account_error_motto'))
    return
  }

  inSaveData.value = true

  const updateUserData = {
    id: globalState.userData.id,
    nickName: userSettingData.value.nickName,
    gender: userSettingData.value.genderObj.value,
    birth: userSettingData.value.birth.replaceAll("/", "-"),
    motto: userSettingData.value.motto,
  }

  updateInfo(updateUserData).then(res => {
    if (!res || !res.data) {
      inSaveData.value = false
      return
    }
    notifyTopPositive(t('main_space_setting_account_data_suc'))
    if (!isDbAvatar.value) {
      let formData = new FormData();
      formData.append('file', currentAvatar.value, currentAvatar.value.name)
      updateAvatar(formData).then(res => {
        if (!res || !res.data) {
          inSaveData.value = false
          return
        }
        notifyTopPositive(t('main_space_setting_account_avatar_suc'))
        saveFinish()
      })
    } else {
      saveFinish()
    }
  })

}

function saveFinish() {
  userDetail().then(res => {
    if (!res || !res.data || !res.data.data) {
      return
    }
    globalState.updateUserData(res.data.data)
    reloadData()
  })
  isDbAvatar.value = true
  inSaveData.value = false
  closeUserSpaceSetting()
}

function closeUserSpaceSetting() {
  document.body.style.overflow = 'auto'
  document.body.style.paddingRight = ''
  showUserSpaceSetting.value = false
  emit('update:modelValue', false)
}

function reloadData() {
  isDbAvatar.value = true
  if (globalState.userData && globalState.userData.id) {
    userSettingData.value = structuredClone(globalState.userData)
    userSettingData.value.genderObj = getGenderObj(userSettingData.value.gender)
    userSettingData.value.birth = userSettingData.value.birth.replaceAll("-", "/")
  }
}

onMounted(() => {
  reloadData()
})

</script>

<style scoped lang="scss">


</style>