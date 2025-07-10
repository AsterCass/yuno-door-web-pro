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

        <h2 class="q-mt-md" style="padding-right: 6rem;">
          {{ userDetailData.nickName }}
          <q-badge class="q-mx-xs q-py-xs q-px-sm" style="transform: translateY(-.13rem)"
                   :color="getRoleTypeObj(userDetailData.roleType).color"
                   :label="getRoleTypeObj(userDetailData.roleType).label">
            <q-icon
                :name="getRoleTypeObj(userDetailData.roleType).logo"
                class="q-ml-xs"
            />
          </q-badge>
        </h2>

        <div style="opacity: .75; padding-right: 6rem;">
          {{ userDetailData.motto ? userDetailData.motto : t('main_user_detail_no_motto') }}
        </div>

        <div class="q-mt-md row items-center">
          <q-icon name="fa-solid fa-cake-candles" class="q-mr-sm" style="opacity: .8"/>
          {{ userDetailData.birth ? userDetailData.birth : t('main_space_lack_data') }}
          <q-separator class="q-mx-md q-my-xs component-separator-base" style="opacity: .2;" vertical/>
          <q-icon name="fa-solid fa-star-and-crescent" class="q-mr-sm" style="opacity: .8"/>
          {{ userDetailData.start ? userDetailData.start : t('main_space_lack_data') }}
          <q-separator class="q-mx-md q-my-xs component-separator-base" style="opacity: .2;" vertical/>
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

        <div style="padding-right: 6rem; margin-top: 2.2rem">
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

        <div style="padding-right: 6rem; margin-top: .75rem">
          <q-btn no-caps unelevated class="component-outline-btn-full" push :disable="isPrivacyChatting"
                 @click="privateChat(userDetailData.id)">
            <div class="row items-center">
              <q-icon name="fa-regular fa-message" size="1rem"/>
              <div class="q-mx-sm">
                {{ isPrivacyChatting ? $t('main_space_send_message_connect') : $t('main_space_send_message') }}
              </div>
              <q-spinner-ios v-if="isPrivacyChatting" size="1rem"/>
            </div>
          </q-btn>
        </div>

        <div class="full-width row">
          <div class="cask-user-space-invite q-px-md q-py-xs">

            <h5>
              {{ t('main_space_invite') }}
            </h5>

            <q-separator class="component-separator-base" style="opacity: 0.1"/>


            <div class="row items-center q-py-md q-my-sm full-width cask-cursor-pointer"
                 @click="notifyTopWarning($t('main_space_invite_error'))">
              <q-icon name="fa-regular fa-calendar-plus" class="q-mr-md" size="1.5rem"/>
              <div style="min-width: 15rem">
                <div style="font-size: .9rem">
                  {{ t('main_space_invite_btn') }}
                </div>
                <div style="font-size: .8rem; opacity: .8">
                  {{ t('main_space_invite_tips') }}
                </div>
              </div>
              <q-icon name="fa-solid fa-chevron-right" class="q-ml-md" size="1.2rem"/>
            </div>
          </div>
        </div>

        <div style="padding-right: 20rem; margin-top: 2.2rem; font-size: 0.9rem">
          <div class="row items-center justify-between q-my-xs">
            <div>
              {{ t('main_space_follower') }}
            </div>
            <div>
              {{ userDetailData.community.followNum ? userDetailData.community.followNum : 0 }}
            </div>
          </div>
          <div class="row items-center justify-between q-my-xs">
            <div>
              {{ t('main_space_following') }}
            </div>
            <div>
              {{ userDetailData.community.fansNum ? userDetailData.community.fansNum : 0 }}
            </div>
          </div>
          <div class="row items-center justify-between q-my-xs">
            <div>
              {{ t('main_space_article') }}
            </div>
            <div>
              {{ userDetailData.articleNum ? userDetailData.articleNum : 0 }}
            </div>
          </div>
          <div class="row items-center justify-between q-my-xs">
            <div>
              {{ t('main_space_essay') }}
            </div>
            <div>
              {{ userDetailData.essayNum ? userDetailData.essayNum : 0 }}
            </div>
          </div>
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
import {getRoleTypeObj} from "@/constant/enums/role-type";

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
  articleNum: 0,
  essayNum: 0,
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
  margin: 20rem 2rem 10rem 2rem;
}

.cask-user-space-invite {
  margin-top: 2.2rem;
  border-radius: 4px;
  border: 1px solid rgb(var(--text-color), 0.1);
}



</style>