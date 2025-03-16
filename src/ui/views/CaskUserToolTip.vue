<template>
  <div ref="userToolTipRef">
    <q-menu class="userToolTipFrame shadow-1" no-parent-event anchor="center end" self="center left"
            :offset="[20, 20]"
            v-model="showTooltip"
            @pointerenter="handleMouseEnter"
            @pointerleave="handleMouseLeave"
            transition-show="scale"
            transition-hide="scale"
            transition-duration="300"
    >
      <!--      <div class="row justify-center">-->
      <!--        <q-avatar size="8rem">-->
      <!--          <q-img :src="userInfo.userAvatar"/>-->
      <!--        </q-avatar>-->
      <!--      </div>-->

      <div class="row justify-center items-center q-mt-sm">
        <div class="row justify-center text-center items-center" style="font-size:.95rem;">
          {{ userInfo.userNickname }}
          <q-badge v-if="userInfo.userRoleType" class="q-ma-xs" style="font-size: 0.72rem; padding: 5px 5px 4px 5px"
                   :color="getRoleTypeObj(userInfo.userRoleType).color"
                   :label="getRoleTypeObj(userInfo.userRoleType).label">
            <q-icon :name="getRoleTypeObj(userInfo.userRoleType).logo"/>
          </q-badge>
        </div>
      </div>


      <div class="row justify-evenly items-center q-mt-md">
        <q-btn no-caps unelevated class="shadow-2 component-full-btn-mini-mini-grow"
               @click="toSpecifyPageWithQuery(
                  thisRouter, 'space', {id: userInfo.userId})">
          <div class="q-mx-xs">
            {{ $t('main_user_detail_detail') }}
          </div>
        </q-btn>

        <q-btn no-caps unelevated class="shadow-2 component-full-btn-mini-mini-grow"
               @click="privateChat">
          <div class="q-mx-xs">
            {{ $t('main_chat_to_chat') }}
          </div>
        </q-btn>
      </div>

    </q-menu>
  </div>

</template>

<script setup>

import {defineProps, onBeforeUnmount, onMounted, ref} from "vue";
import {delay} from "@/utils/base-tools";
import {toSpecifyPage, toSpecifyPageWithQuery} from "@/router";
import {useRouter} from "vue-router";
import {notifyTopWarning} from "@/utils/notification-tools";
import {useGlobalStateStore} from "@/utils/global-state";
import {useI18n} from "vue-i18n";
import {privateInitChat} from "@/api/chat";
import {socketChatState} from "@/utils/global-state-no-save";
import {getGenderObj} from "@/constant/enums/gender-opt";
import {getRoleTypeObj} from "@/constant/enums/role-type";


const props = defineProps({
  isRight: {
    type: Boolean,
    required: false,
    default: true,
  },
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

const privateChat = () => {
  if (globalState.isLogin && globalState.userData) {
    if (!props.userInfo.userId || props.userInfo.userId.startsWith('UV')) {
      notifyTopWarning(t('main_chat_to_chat_null'))
      return;
    }
    if (globalState.userData.id === props.userInfo.userId) {
      notifyTopWarning(t('main_chat_to_chat_self_error'))
      return;
    }
    privateInitChat({toUserId: props.userInfo.userId}).then(res => {
      if (!res || !res.data || 200 !== res.data.status) {
        return
      }
      socketChatState.forceFocusChat = res.data.data
      if (thisRouter.currentRoute.value.name !== 'chatroom') {
        toSpecifyPage(thisRouter, 'chatroom')
      }

    })

  } else {
    notifyTopWarning(t('no_login'))
  }
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