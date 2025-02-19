<template>
  <q-layout view="hhh lpr fff">

    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
        CaskModuleElement.ARTICLE,
        CaskModuleElement.CHATROOM,
    ]"/>

    <div class="row justify-center">
      <q-img :no-native-menu="false" :ratio="1/6" fit="cover"
             :src="globalState.curThemeName !== 'dark' ? '/img/guestbook.jpg' : '/img/bg-2-fixed.jpg'"
             class="cask-guestbook-bg-image">
      </q-img>
    </div>

    <div class="row justify-center cask-base-simple-main">

      <div class="col-lg-3 col-12" :class="globalState.screenMini ? 'q-px-sm' : 'q-pl-lg'" style="margin-top: 10rem">
        <div :class="globalState.screenMini ? '' : 'guestbook-left-sidebar'">
          <h2 style="font-size: 1.75rem; line-height: 2.9rem; word-wrap: break-word;">
            {{ $t('main_board') }}
          </h2>
          <div style="opacity: .5">
            {{ $t('subtitle-7') }}
          </div>

          <div class="row q-mt-lg">
            <q-btn v-for="(tag, index) in commentTagEnums" :key="index" push
                   no-caps unelevated class="q-ma-xs component-outline-btn-mini-grow"
                   :label="$t(tag.name)" :style="`border-color: ${tag.rbg} !important`"
                   :color="selectedTagList.has(tag.code) ? tag.color : undefined"
                   @click="deleteAndAddTagSet(tag.code)"
            />
          </div>

          <div v-if="!globalState.screenMini" class="row justify-center relative-position q-mt-lg">
            <q-img v-show="showPic" class="col-8 q-mr-xl" :no-native-menu="false" :ratio="1" fit="cover"
                   src="/img/article-bg.jpg"
                   style="border-radius: 32px; position: absolute; translate: -3%; scale: .95">
              <template v-slot:loading/>
            </q-img>

            <q-img class="col-8 q-mr-xl" :no-native-menu="false" :ratio="1" fit="cover"
                   :src="globalState.curThemeName === 'dark' ? '/img/article-bg-dark.svg' : '/img/article-bg-light.svg'"
                   style="position: absolute; translate: -3%; scale: 0.96">
              <template v-slot:loading/>
            </q-img>
          </div>

        </div>
      </div>

      <div class="col-lg-7 col-12" :class="globalState.screenMini ? 'q-px-sm' : 'q-px-xl'"
           style="min-height: 60rem;" :style="globalState.screenMini ? 'margin-top: 3rem' : 'margin-top: 7rem'">
        <div v-if="dataLoaded">
          <div v-for="(comment, index) in commentTree" :key="index">
            <div class="row">

              <div class="col-2 column justify-center items-center q-mt-md">
                <div class="relative-position q-mr-md cursor-pointer" style="width: 100px; height: 95px"
                     @click="toSpecifyPageWithQuery( thisRouter, 'space', {id: comment.commentUserId})">
                  <q-avatar size="105px" style="filter: blur(5px); position: absolute;">
                    <q-img :src="comment.commentUserAvatar"/>
                  </q-avatar>
                  <q-avatar size="95px" style=" position: absolute; left: 5px; top: 5px">
                    <q-img :src="comment.commentUserAvatar"/>
                  </q-avatar>
                </div>

                <div class="cask-cursor-pointer q-mt-md" style="font-size:.95rem; color: rgb(var(--positive))"
                     @click="toSpecifyPageWithQuery(thisRouter, 'space', {id: comment.commentUserId})">
                  {{ comment.commentUserName }}
                </div>

                <div class=" q-mt-xs row justify-center">
                  <q-badge class="q-ma-xs" style="font-size: 0.72rem; padding: 5px 5px 4px 5px"
                           :color="getGenderObj(comment.commentUserGender).color"
                           :label="getGenderObj(comment.commentUserGender).label">
                  </q-badge>
                  <q-badge class="q-ma-xs" style="font-size: 0.72rem; padding: 5px 5px 4px 5px"
                           :color="getRoleTypeObj(comment.commentUserRoleType).color"
                           :label="getRoleTypeObj(comment.commentUserRoleType).label">
                    <q-icon :name="getRoleTypeObj(comment.commentUserRoleType).logo"/>
                  </q-badge>
                </div>
              </div>

              <div class="col q-px-md">

                <div class="guestbook-comment-body-main">
                  {{ comment.commentContent }}
                </div>

                <div>
                  <div class="row justify-end items-center q-mt-md guestbook-comment-footer">
                    <div class="row items-center">
                      {{ comment.ipAddressName }}&#32;·&#32;#{{ comment.floorNumber }}
                      &#32;·&#32;{{ comment.commentTime }}
                    </div>

                    <div
                        v-if="(null == comment.webSubClose || comment.webSubClose) && 0 === comment.webChildData.length"
                        class="cask-jump-link-in-text guestbook-comment-footer-reply"
                        @click="comment.webSubClose = false;
                         comment.webReplyMainSubId=comment.id;
                         comment.webReplySecondaryId=comment.id;">
                      {{ $t('main_article_reply') }}
                    </div>
                    <div v-else-if="comment.webSubClose && 0 !== comment.webChildData.length"
                         class="cask-jump-link-in-text guestbook-comment-footer-reply"
                         @click="comment.webSubClose = false">
                      {{ $t('main_article_reply') }} ({{ comment.webChildData.length }})
                    </div>
                    <div v-else class="cask-jump-link-in-text guestbook-comment-footer-reply"
                         @click="comment.webSubClose = true">
                      {{ $t('main_article_collapse_reply') }}
                    </div>
                  </div>
                </div>

              </div>


            </div>

            <q-separator v-if="index !== commentTree.length - 1" class="component-separator-base" spaced="1rem"/>

          </div>


          <cask-long-text-input style="margin: 5.5rem 0 2rem 0" id="comment-reply-input" :elements="new Map([
          [CaskLongTextInputElement.EMOJI, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
          [CaskLongTextInputElement.CALL, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
          ])" :sendCallback="submitCommentInput" v-model="commentContent"
                                @update:model-value="data => commentContent = data" :send-enable="sendBtnEnable"
          />

        </div>
      </div>


      <div class="col-lg-2 col-12" :class="globalState.screenMini ? 'q-px-sm' : 'q-pl-lg'" style="margin-top: 7.5rem">
        <div :class="globalState.screenMini ? '' : 'guestbook-left-sidebar'">


        </div>
      </div>

    </div>


    <cask-base-footer/>

  </q-layout>
</template>

<script setup>
import {CaskLongTextInputElement, CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {delay} from "@/utils/base-tools";
import {commentTagEnums} from "@/constant/enums/comment-tag";
import {getCommentWebsite} from "@/api/comment";
import {toSpecifyPageWithQuery} from "@/router";
import {getGenderObj} from "@/constant/enums/gender-opt";
import {getRoleTypeObj} from "@/constant/enums/role-type";
import CaskLongTextInput from "@/ui/components/CaskLongTextInput.vue";
import {notifyTopWarning} from "@/utils/notification-tools";

const globalState = useGlobalStateStore();
const thisRouter = useRouter()


//页面元素
const dataLoaded = ref(false)
const showPic = ref(false)
const commentPageNo = ref(1)
let commentPages = ref(1)
const commentType = ref(null)
let commentOriginObj = ref({
  tree: [],
  sum: 0
})
const commentTree = ref([
  {
    webSubClose: null,
    webReplyMainSubId: null,
    webReplySecondaryId: null,
    webReplyMainSubName: null,
    webReplyMainContext: null,
    webReplyContext: null,
    webChildData: null,
    commentUserId: "",
    commentUserName: "",
    commentContent: "",
    commentTime: "",
    ipAddressName: "",
    floorNumber: 1,
    commentUserAvatar: "",
    likeNum: 0,
    isLike: 0,
    commentUserGender: null,
    commentUserRoleType: 0,
    childData: [{
      mainSubId: "",
      mainSubUserId: "",
      mainSubUserName: "",
      likeNum: 0,
      isLike: 0,
      replyNum: 0,
    }],
  }
])
let lastCommentId = ref("")
//筛选
const selectedTagList = ref(new Set([0, 1]))


function deleteAndAddTagSet(code) {
  if (selectedTagList.value.has(code)) {
    selectedTagList.value.delete(code)
  } else {
    selectedTagList.value.add(code)
  }
  // Refresh
  if (2 === selectedTagList.value.size) {
    commentType.value = null
  } else if (0 === selectedTagList.value.size) {
    commentType.value = -1
  } else {
    commentType.value = selectedTagList.value.values().next().value
  }
  refreshCommentTree(true)
}


function refreshCommentTree(navigateTo1 = false, rebuild = true) {
  //reset data
  if (rebuild) {
    dataLoaded.value = false
    commentTree.value = [];
  }
  if (navigateTo1) {
    commentPageNo.value = 1
  }
  //request
  getCommentWebsite({
    size: 10,
    commentType: commentType.value,
    page: commentPageNo.value - 1
  }).then(res => {
    if (!res || !res.data || !res.data.data) {
      return
    }
    commentOriginObj.value = res.data.data
    commentTree.value = commentOriginObj.value.content
    commentPages.value = commentOriginObj.value.totalPages
    for (let obj of commentTree.value) {
      if (obj.childData.length > 0) {
        if (obj.id !== lastCommentId.value) {
          obj.webChildData = obj.childData.slice(0, 5)
        } else {
          obj.webChildData = obj.childData
        }
      } else {
        obj.webChildData = []
      }
    }
    dataLoaded.value = true
  })
}

function initData() {
  commentTree.value = [];
}

onMounted(() => {
  initData()
  refreshCommentTree()
  delay(300).then(() => {
    showPic.value = true
  })
})


</script>

<style scoped lang="scss">

.guestbook-comment-body-main {
  margin-top: .5rem;
  line-height: 1.6rem;
  min-height: 10rem;
  font-size: 0.95rem;
  white-space: pre-wrap;
  color: rgb(var(--text-color), 0.88);
}

.guestbook-comment-footer {
  font-size: 0.9rem;
  color: rgb(var(--text-color), 0.88);

  .guestbook-comment-footer-reply {
    margin-left: .5rem;
  }
}


.guestbook-left-sidebar {
  width: 100%;
  height: 800px;
  position: sticky;
  top: 9rem;
  align-self: flex-start;
}

.cask-guestbook-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 12rem;
  z-index: -1 !important;
  opacity: 0.9;

  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0));
}

</style>