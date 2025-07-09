<template>
  <q-layout view="hhh lpr fff">

    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
        CaskModuleElement.ARTICLE,
        CaskModuleElement.CHATROOM,
    ]"/>

    <div class="row justify-center">
      <q-img fit="cover" src="/img/space.jpg"
             placeholder-src="/img/space-pre.jpg" class="cask-user-space-bg-image">
      </q-img>
    </div>

    <div class="cask-user-space-main row">
      <div class="col-lg-4 col-12 q-px-xl">

        <q-btn round unelevated style="background-color: rgb(var(--background-color))">
          <q-avatar size="100px" style="margin: 3px">
            <q-img :src="userDetailData.avatar"/>
          </q-avatar>
        </q-btn>

        <h2 class="q-mt-md">
          {{ userDetailData.nickName }}
        </h2>

        <div class="q-mt-md row items-center">
          <q-icon name="fa-solid fa-cake-candles" class="q-mr-sm" style="opacity: .8"/>
          {{ userDetailData.birth ? userDetailData.birth : t('main_space_lack_data') }}
          <q-separator class="q-mx-md q-my-xs" vertical/>
          <q-icon name="fa-solid fa-star-and-crescent" class="q-mr-sm" style="opacity: .8"/>
          {{ userDetailData.start ? userDetailData.start : t('main_space_lack_data') }}
          <q-separator class="q-mx-md q-my-xs" vertical/>
          <q-icon name="fa-solid fa-paw" class="q-mr-sm" style="opacity: .8"/>
          {{ userDetailData.zodiac ? userDetailData.zodiac : t('main_space_lack_data') }}
        </div>

        <div class="q-mt-sm row items-center">
          <q-icon name="fa-solid fa-envelope" class="q-mr-sm" style="opacity: .8"/>
          {{ userDetailData.mail ? userDetailData.mail : t('main_space_lack_data') }}
        </div>

        <div class="q-mt-sm row items-center">
          <q-icon name="fa-brands fa-qq" class="q-mr-sm" style="opacity: .8"/>
          {{ userDetailData.socialLink.qq ? userDetailData.socialLink.qq : t('main_space_lack_data') }}
        </div>

        <div class="q-mt-sm row items-center">
          <q-icon name="fa-brands fa-weixin" class="q-mr-sm" style="opacity: .8"/>
          {{ userDetailData.socialLink.wechat ? userDetailData.socialLink.wechat : t('main_space_lack_data') }}
        </div>

        <div class="q-mt-sm row items-center">
          <q-icon name="fa-brands fa-github" class="q-mr-sm" style="opacity: .8"/>
          {{ userDetailData.socialLink.github ? userDetailData.socialLink.github : t('main_space_lack_data') }}
        </div>

        <div style="padding-right: 8rem; margin-top: 2.2rem">
          <q-btn v-if="isAlreadyFollow" no-caps unelevated class="component-full-btn-full" push :disable="isFollowing"
                 @click="followMethod">
            <div class="row items-center">
              <q-icon name="fa-solid fa-user-slash" size="1rem"/>
              <div class="q-mx-sm">
                {{ $t('main_space_unfollow') }}
              </div>
            </div>
          </q-btn>
          <q-btn v-else no-caps unelevated class="component-full-btn-full" push :disable="isFollowing"
                 @click="followMethod">
            <div class="row items-center">
              <q-icon name="fa-solid fa-plus" size="1rem"/>
              <div class="q-mx-sm">
                {{ $t('main_space_follow') }}
              </div>
            </div>
          </q-btn>

        </div>

        <div style="padding-right: 8rem; margin-top: .75rem">
          <q-btn no-caps unelevated class="component-outline-btn-full" push :disable="isPrivacyChatting"
                 @click="privateChat(userDetailData.id)">
            <div class="row items-center">
              <q-icon name="fa-regular fa-message" size="1rem"/>
              <div class="q-mx-sm">
                {{ $t('main_space_send_message') }}
              </div>
            </div>
          </q-btn>
        </div>

      </div>

      <div class="col-lg-8 col-12">

      </div>

    </div>

    <cask-base-footer/>

  </q-layout>
</template>

<script setup>
import {CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {defineProps, onMounted, ref, watch} from "vue";
import {follow, isFollow, userDetailSimple} from "@/api/user";
import {ZodiacSign} from "@/utils/date-to-zodiac";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import {privateInitChat} from "@/api/chat";
import {socketChatState} from "@/utils/global-state-no-save";
import {toSpecifyPage} from "@/router";

const {t} = useI18n()
const globalState = useGlobalStateStore();
const thisRouter = useRouter()

const userDetailData = ref({
  id: "",
  avatar: "",
  avatarOriginal: "",
  birth: "",
  community: {},
  friendList: [],
  gender: -1,
  mail: "",
  motto: "",
  nickName: "",
  roleType: "",
  socialLink: {},
})
const isAlreadyFollow = ref(false);
const isFollowing = ref(false);
const isPrivacyChatting = ref(false);

const props = defineProps({
  id: {
    type: String,
    default: ""
  },
})

watch(
    () => globalState.language,
    () => {
      if (userDetailData.value.birth) {
        userDetailData.value.start = new ZodiacSign(new Date(userDetailData.value.birth), globalState.language).sign
        userDetailData.value.zodiac = new ZodiacSign(new Date(userDetailData.value.birth), globalState.language).chinese.sign
      }
    }
);

function getUserDetail(id) {
  userDetailSimple({userId: id}).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    userDetailData.value = res.data.data;
    if (userDetailData.value.birth) {
      userDetailData.value.start = new ZodiacSign(new Date(userDetailData.value.birth), globalState.language).sign
      userDetailData.value.zodiac = new ZodiacSign(new Date(userDetailData.value.birth), globalState.language).chinese.sign
    }
  })
}

function getFollowing(id) {
  isFollow({mainId: id}).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    isAlreadyFollow.value = res.data.data
  })
}

function followMethod() {
  isFollowing.value = true
  follow({isFollow: !isAlreadyFollow.value, userId: userDetailData.value.id}).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      isFollowing.value = false
      return
    }
    isAlreadyFollow.value = !isAlreadyFollow.value
    notifyTopPositive(isAlreadyFollow.value ? t('main_space_follow_success') : t('main_space_unfollow_success'))
    isFollowing.value = false
  })
}

const privateChat = (id) => {
  if (globalState.isLogin && globalState.userData) {
    if (!id || id.startsWith('UV')) {
      notifyTopWarning(t('main_chat_to_chat_null'))
      return;
    }
    isPrivacyChatting.value = true
    privateInitChat({toUserId: id}).then(res => {
      if (!res || !res.data || 200 !== res.data.status) {
        isPrivacyChatting.value = false
        return
      }
      socketChatState.forceFocusChat = res.data.data
      if (thisRouter.currentRoute.value.name !== 'chatroom') {
        toSpecifyPage(thisRouter, 'chatroom')
      }
      isPrivacyChatting.value = false
    })
  } else {
    notifyTopWarning(t('no_login'))
  }
}


onMounted(() => {
  if (props.id) {
    getUserDetail(props.id)
    getFollowing(props.id)
  }
})




</script>

<style scoped lang="scss">

.cask-user-space-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 25rem;
  z-index: -1 !important;
  opacity: 0.9;

  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 95%, rgba(0, 0, 0, 0));
}

.cask-user-space-main {
  margin: 20rem 2rem 5rem 2rem;
  min-height: 50rem;
}



</style>