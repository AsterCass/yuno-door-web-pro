<template>

  <div v-if="simple" class="bottom-footer-base-simple row items-center justify-evenly">

    <div style="opacity: .85">
      <div>
        &copy; 2020-{{ curYear }} astercasc.com {{ $t('main-nav-ipc-pre') }}
        <a target="_blank" href="https://beian.miit.gov.cn/">{{ $t('main-nav-ipc-center') }}</a>
      </div>
    </div>

    <div class="row" style="opacity: .85">
      <div class="q-mr-md">
        {{ $t('main-nav-contact-me-long') }}
      </div>
      <div class="q-mx-sm">
        {{ $t('main-fa-mail') }}: astercass@qq.com
      </div>
      <div class="q-mx-sm">
        {{ $t('main-fa-qq') }}: 4040191617
      </div>
      <div class="q-mx-sm">
        {{ $t('main-fa-wechat') }}: AsterCasc
      </div>
    </div>


  </div>
  <div v-else class="bottom-footer-base row justify-evenly">

    <div class="bottom-footer-base-header column justify-between q-my-sm" style="max-width: 35rem">
      <div style="font-size: 1.5rem">
        astercasc.com
      </div>
      <div style="opacity: .5" class="q-my-sm">
        {{ $t('main_web_desc') }}
      </div>
      <div style="opacity: .85" class="q-my-sm">
        <div>
          &copy; 2020-{{ curYear }} astercasc.com {{ $t('main-nav-ipc-pre') }}
          <a target="_blank" href="https://beian.miit.gov.cn/">{{ $t('main-nav-ipc-center') }}</a>
        </div>
      </div>
    </div>

    <div class="q-ma-sm column">
      <div class="q-mb-md" style="font-size: 1.1rem;opacity: .85">
        {{ $t('main-nav-quick-link') }}
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="toSpecifyPageWithQueryNewTab(thisRouter, 'webArticleList')">
        {{ $t('main_articles') }}
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="toSpecifyPageWithQueryNewTab(thisRouter, 'mainVideoCollection')">
        {{ $t('main_videos') }}
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="toSpecifyPageWithQueryNewTab(thisRouter, 'board')">
        {{ $t('main_board') }}
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="toSpecifyPageWithQueryNewTab(thisRouter, 'chatroom')">
        {{ $t('main_chat_room') }}
      </div>
    </div>

    <div class="q-ma-sm column">
      <div class="q-mb-md" style="font-size: 1.1rem;opacity: .85">
        {{ $t('main-nav-tool') }}
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="toSpecifyPage(thisRouter, 'mainToolsTimestamp')">
        {{ $t('main_tools_time_con') }}
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="toSpecifyPage(thisRouter, 'mainToolsMd5')">
        {{ $t('main_tools_md5_gen') }}
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="toSpecifyPage(thisRouter, 'mainToolsImgBase64')">
        {{ $t('main_tools_base64_con') }}
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="toSpecifyPage(thisRouter, 'mainToolsRgbHex')">
        {{ $t('main_tools_rgb_con') }}
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="toSpecifyPage(thisRouter, 'mainToolsQrcode')">
        {{ $t('main_tools_qrcode_gen') }}
      </div>
    </div>

    <div class="q-ma-sm column">
      <div class="q-mb-md" style="font-size: 1.1rem;opacity: .85">
        {{ $t('main-nav-game') }}
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="openLink('https://game.astercasc.com/G-Hextris/')">
        Hextris
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="openLink('https://aidn.jp/mikutap/')">
        Mikutap
      </div>
    </div>

    <div class="q-ma-sm column">
      <div class="q-mb-md" style="font-size: 1.1rem;opacity: .85">
        {{ $t('main-nav-personal-res') }}
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="openLink('https://github.com/AsterCass?tab=repositories')">
        GitHub
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="openLink('https://github.com/AsterCass/Tomoyo')">
        Tomoyo
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="openLink('https://github.com/AsterCass/sql-garble-spring-boot')">
        Mybatis Sql Garble
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="openLink('https://github.com/AsterCass/yuno-door-web-pro')">
        Yuno Web Door Pro
      </div>
      <div class="cask-jump-link-in-text-origin q-my-xs " style="opacity: .5"
           @click="openLink('https://github.com/AsterCass/yuno-saas-door')">
        Yuno Saas Door
      </div>
    </div>

    <div class="q-ma-sm column">
      <div class="q-mb-md" style="font-size: 1.1rem;opacity: .85">
        {{ $t('main-nav-contact-me') }}
      </div>
      <div class="q-my-xs" style="opacity: .5">
        {{ $t('main-fa-mail') }}: astercass@qq.com
      </div>
      <div class="q-my-xs" style="opacity: .5">
        {{ $t('main-fa-qq') }}: 4040191617
      </div>
      <div class="q-my-xs" style="opacity: .5">
        {{ $t('main-fa-wechat') }}: AsterCasc
      </div>
    </div>


  </div>
</template>

<script setup>
import {defineProps, onMounted, ref} from "vue";
import {date} from "quasar";
import {openLink} from "@/utils/base-tools";
import {useRouter} from "vue-router";
import {notifyTopWarning} from "@/utils/notification-tools";
import {toSpecifyPage, toSpecifyPageWithQueryNewTab} from "@/router";

const thisRouter = useRouter()

const curYear = ref("2020")

const props = defineProps({
  simple: {
    type: Boolean,
    required: false,
    default: false,
  },
});

onMounted(() => {
  const timeStamp = new Date()
  curYear.value = date.formatDate(timeStamp, 'YYYY')
})

</script>

<style scoped lang="scss">

.bottom-footer-base {
  margin-top: 1rem;
  padding: 1rem 2rem 1.2rem 2rem;
  background-color: rgb(var(--full-container-background-color-dark));
  color: rgb(var(--full-container-text-color));
  min-height: 16rem;

  a {
    color: rgb(var(--full-container-text-color));
  }
}

.bottom-footer-base-simple {
  padding: 0.5rem 2rem 0.6rem 2rem;
  background-color: rgb(var(--full-container-background-color-dark));
  color: rgb(var(--full-container-text-color));
  min-height: 3rem;

  a {
    color: rgb(var(--full-container-text-color));
  }
}

</style>