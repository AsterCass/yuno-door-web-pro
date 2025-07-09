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
import {userDetailSimple} from "@/api/user";
import {ZodiacSign} from "@/utils/date-to-zodiac";

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


onMounted(() => {
  if (props.id) {
    userDetailSimple({userId: props.id}).then(res => {
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