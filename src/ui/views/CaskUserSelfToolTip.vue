<template>
  <div ref="userToolTipRef">
    <q-menu class="userToolTipFrame shadow-1" no-parent-event self="center middle"
            :offset="[20, 200]"
            v-model="showTooltip"
            @pointerenter="handleMouseEnter"
            @pointerleave="handleMouseLeave"
            transition-show="scale"
            transition-hide="scale"
            transition-duration="300"
    >
      <div class="row justify-center">
        <q-avatar size="8rem">
          <q-img :src="userInfo.userAvatar"/>
        </q-avatar>
      </div>

      <div class="row justify-center items-center q-mt-sm">
        <div class="row justify-center text-center items-center" style="font-size:.95rem;">
          {{ userInfo.userNickname }}
        </div>
      </div>


      <div class="q-mt-sm row justify-center">
        <q-badge class="q-mx-xs" style="font-size: .6rem"
                 :color="getGenderObj(userInfo.userGender).color"
                 :label="getGenderObj(userInfo.userGender).label">
        </q-badge>
        <q-badge class="q-mx-xs" style="font-size: 0.6rem"
                 :color="getRoleTypeObj(userInfo.userRoleType).color"
                 :label="getRoleTypeObj(userInfo.userRoleType).label">
          <q-icon :name="getRoleTypeObj(userInfo.userRoleType).logo"
                  class="q-ma-xs"/>
        </q-badge>
      </div>

      <div class="row q-mx-sm q-mt-lg q-mb-sm">
        <q-btn no-caps unelevated class="shadow-2 component-full-btn-full"
               @click="toSpecifyPageWithQuery(
                  thisRouter, 'space', {id: userInfo.userId})">
          <div class="q-mx-xs">
            {{ $t('main_user_detail_detail') }}
          </div>
        </q-btn>
      </div>
      <div class="row q-ma-sm">
        <q-btn no-caps unelevated class="shadow-2 component-full-btn-error-full"
               @click="headerLogout">
          <div class="q-mx-xs">
            {{ $t('main_logout') }}
          </div>
        </q-btn>
      </div>


    </q-menu>
  </div>

</template>

<script setup>

import {defineProps, onBeforeUnmount, onMounted, ref} from "vue";
import {delay} from "@/utils/base-tools";
import {toSpecifyPageWithQuery} from "@/router";
import {useRouter} from "vue-router";
import {notifyTopPositive} from "@/utils/notification-tools";
import {useGlobalStateStore} from "@/utils/global-state";
import {useI18n} from "vue-i18n";
import {getRoleTypeObj} from "@/constant/enums/role-type";
import {userLogout} from "@/api/user";
import {getGenderObj} from "@/constant/enums/gender-opt";


const props = defineProps({
  userInfo: {
    type: Object,
    required: false,
    default: () => {
      return {
        userId: "",
        userMotto: "",
        userAvatar: "",
        userNickname: "",
        userGender: 0,
        userRoleType: 0,
      };
    },
  },
})

const thisRouter = useRouter()
const {t} = useI18n()
const globalState = useGlobalStateStore();

const userToolTipRef = ref(null)
const showTooltip = ref(false)
let parentElement = null;
const prepareToHide = ref(false)
const prepareToShow = ref(false)


const handleMouseEnter = () => {
  prepareToShow.value = true;
  prepareToHide.value = false;
  delay(100).then(() => {
    if (prepareToShow.value) {
      showTooltip.value = true;
      prepareToHide.value = false;
      prepareToShow.value = false;
    }
  })
};

const handleMouseLeave = () => {
  prepareToShow.value = false;
  prepareToHide.value = true;
  delay(750).then(() => {
    if (prepareToHide.value) {
      showTooltip.value = false;
      prepareToHide.value = false;
      prepareToShow.value = false;
    }
  })
};

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
  parentElement = userToolTipRef.value.parentElement;
  if (parentElement) {
    parentElement.addEventListener('mouseenter', handleMouseEnter);
    parentElement.addEventListener('mouseleave', handleMouseLeave);
  }

});


onBeforeUnmount(() => {
  if (parentElement) {
    parentElement.removeEventListener('mouseenter', handleMouseEnter);
    parentElement.removeEventListener('mouseleave', handleMouseLeave);
  }
});


</script>

<style lang="scss">

.userToolTipFrame {
  width: 15rem;

  color: rgb(var(--text-color)) !important;
  border-radius: 8px;
  background-color: rgb(var(--container-background-color)) !important;
  backdrop-filter: blur(30px);
  padding: 15px 10px !important;
}

</style>