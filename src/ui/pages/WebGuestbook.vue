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
           :style="globalState.screenMini ? 'margin-top: 3rem' : 'margin-top: 7rem'">
        <div v-if="dataLoaded" style="min-height: 60rem;">
          <div v-for="(comment, index) in commentTree" :key="index">
            <div class="row">

              <div class="column  items-center q-mt-md" style="width: 150px">
                <div class="relative-position q-mr-md cursor-pointer" style="width: 95px; height: 95px"
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
                         @click="comment.webSubClose = true"
                         style="border-radius: .5rem .5rem 0 0;
                         padding: .3rem .6rem;
                         background-color: rgba(var(--text-color), 0.075);">
                      {{ $t('main_article_collapse_reply') }}
                    </div>
                  </div>

                  <transition name="guestbook-child-comment">
                    <div v-if="!comment.webSubClose" class="guestbook-child-comment-body">
                      <div v-if="0 !== comment.webChildData.length" class="q-pt-md">
                        <div v-for="(childComment, childIndex) in comment.webChildData" :key="childIndex">

                          <div class="row q-px-md">
                            <div class="relative-position q-mr-md cursor-pointer" style="width: 50px; height: 50px"
                                 @click="toSpecifyPageWithQuery( thisRouter, 'space', {id: childComment.commentUserId})">
                              <q-avatar size="56px" style="filter: blur(3px); position: absolute;">
                                <q-img :src="childComment.commentUserAvatar"/>
                              </q-avatar>
                              <q-avatar size="50x" style=" position: absolute; left: 3px; top: 3px">
                                <q-img :src="childComment.commentUserAvatar"/>
                              </q-avatar>
                            </div>

                            <div class="col">
                              <div class="row items-center guestbook-child-comment-body-header">
                                <div class="cask-cursor-pointer q-mt-xs"
                                     style="font-size:.85rem; color: rgb(var(--positive))"
                                     @click="toSpecifyPageWithQuery(
                                       thisRouter, 'space', {id: childComment.commentUserId})">
                                  {{ childComment.commentUserName }}
                                </div>
                                <q-badge class="q-ma-xs" style="font-size: 0.71rem; padding: 3px"
                                         :color="getRoleTypeObj(childComment.commentUserRoleType).color"
                                         :label="getRoleTypeObj(childComment.commentUserRoleType).label">
                                </q-badge>
                                <div>
                                  &#32;·&#32;{{ childComment.commentTime }}&#32;·&#32;{{ childComment.ipAddressName }}
                                </div>
                              </div>

                              <div class="q-mt-xs">
                                <span
                                    v-if="childComment.mainSubUserId && comment.id !== childComment.mainSubUserId"
                                    @click="toSpecifyPageWithQuery(
                                        thisRouter, 'space', {id: childComment.mainSubUserId})"
                                    class="cask-jump-link-in-text-name">
                                  @{{ childComment.mainSubUserName }}:
                                </span>
                                {{ childComment.commentContent }}
                              </div>

                              <div class="row justify-end q-mt-sm">
                                <div class="cask-jump-link-in-text"
                                     @click="comment.webReplyMainSubId = childComment.id;
                                     comment.webReplySecondaryId = comment.id;
                                     comment.webReplyMainSubName = childComment.commentUserName;
                                     comment.webReplyMainContext =$t('main_article_reply') + ': ' +
                                     childComment.commentContent;">
                                  {{ $t('main_article_reply') }}
                                </div>

                              </div>
                            </div>
                          </div>

                          <q-separator v-if="childIndex !== comment.webChildData.length - 1" inset
                                       class="component-separator-base" style="margin: 1rem 1rem 1.3rem 1rem"/>

                          <div v-else-if="!comment.webReplyMainSubId">

                            <div class="row justify-center">
                              <q-btn no-caps unelevated class="shadow-2 component-full-btn-mini-grow"
                                     @click="comment.webReplyMainSubId = comment.id;
                                     comment.webReplySecondaryId = comment.id;">
                                <div class="row items-center">
                                  {{ $t('main_comment_will_send') }}
                                </div>
                              </q-btn>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div v-if="comment.webReplyMainSubId" class="q-pt-lg q-mx-md">
                        <div class="row items-center justify-between q-px-sm"
                             style="height: 15px;color: rgb(var(--pointer))">
                          <div v-if="comment.webReplyMainSubName" class="cask-cursor-pointer"
                               style="font-size: 0.95rem">
                            @{{ comment.webReplyMainSubName }}&nbsp;:
                          </div>
                          <div v-if="comment.webReplyMainSubName" class="q-mr-sm cask-jump-link-in-text-origin"
                               style="font-size: 0.85rem"
                               @click="comment.webReplyMainSubId = comment.id;
                               comment.webReplySecondaryId = comment.id;
                               comment.webReplyMainContext = '';
                               comment.webReplyMainSubName=''">
                            {{ $t('main_article_cancel_reply') }}
                          </div>
                        </div>

                        <cask-long-text-input v-model="comment.webReplyContext"
                                              :elements="new Map([])"
                                              :placeholder="comment.webReplyMainContext"
                                              :send-enable="globalSendEnable"
                                              :sendCallback="() => {submitCommentInput(comment)}"
                                              @update:model-value="data => comment.webReplyContext = data"
                        />

                      </div>


                      <div v-if="comment.webChildData.length !== comment.childData.length"
                           class="row justify-center q-mt-md cask-cursor-pointer"
                           style="height: 20px;
                                 background-color: rgba(var(--text-color), 0.15);
                                 border-radius: 0 0 8px 8px;"
                           @click="comment.webChildData = comment.childData">
                        <q-icon name="fa-solid fa-caret-down" size="20px"/>
                      </div>
                      <div v-else-if="0 !== comment.webChildData.length || comment.webReplyMainSubId" class="q-my-md"/>
                    </div>
                  </transition>
                </div>
              </div>


            </div>

            <q-separator v-if="index !== commentTree.length - 1" class="component-separator-base" spaced="1rem"/>

          </div>

        </div>

        <div v-else style="min-height: 60rem;">
          <div class="row justify-center q-my-xl">
            <q-spinner-pie size="50px"/>
          </div>
        </div>

        <cask-long-text-input style="margin: 5.5rem 0 2rem 0" :elements="new Map([
                  [CaskLongTextInputElement.EMOJI, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],
                  [CaskLongTextInputElement.CALL, {callback: ()=> {notifyTopWarning($t('in_develop'))}}],])"
                              :sendCallback="()=>{submitCommentInput()}"
                              v-model="websiteReplyContext"
                              @update:model-value="data => websiteReplyContext = data"
                              :send-enable="globalSendEnable"
        />
      </div>


      <div v-if="!globalState.screenMini" class="col-lg-2 col-12" style="margin-top: 7.5rem">
        <div class="guestbook-left-sidebar">
          <div class="column justify-between items-center full-height" style="padding-bottom: 2rem; width: 5rem">
            <div class="col-10 column" style="padding-top: 6rem;">
              <q-btn :disable="commentPageNo <= 1" class="q-ma-xs component-none-btn-mini" no-caps
                     unelevated
                     @click="commentPageNo = Math.max(commentPageNo - 1, 1);
                     refreshCommentTree();">
                <div class="row justify-center">
                  <q-icon name="fa-solid fa-chevron-up" size="1rem"/>
                </div>
              </q-btn>
              <div v-for="(page, index) in commentPageShow" :key="index">
                <q-btn v-if="dataLoaded && page.code === commentPageNo" no-caps unelevated
                       class="q-ma-xs shadow-2 component-full-btn-mini">
                  <div class="row justify-center">
                    {{ page.label }}
                  </div>
                </q-btn>
                <q-btn v-else no-caps unelevated class="q-ma-xs component-none-btn-mini"
                       @click="dataLoaded = false; commentPageNo = page.code;refreshCommentTree();">
                  <div class="row justify-center">
                    {{ page.label }}
                  </div>
                </q-btn>
              </div>
              <q-btn :disable="commentPageNo > commentPageShow.length - 1" class="q-ma-xs component-none-btn-mini"
                     no-caps
                     unelevated
                     @click="commentPageNo = Math.min(commentPageNo + 1, commentPageShow.length);
                     refreshCommentTree();">
                <div class="row justify-center">
                  <q-icon name="fa-solid fa-chevron-down" size="1rem"/>
                </div>
              </q-btn>
            </div>
            <div class="col-2">
              <q-btn no-caps unelevated class="q-ma-md shadow-2 component-full-btn-std-sq" push
                     @click="gotoPageTop()">
                <div class="row justify-center items-center">
                  <q-icon name="fa-solid fa-plane-up" size="1.2rem"/>
                </div>
              </q-btn>
              <!--          todo dash animation -->
            </div>
          </div>
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
import {delay, gotoPageTop} from "@/utils/base-tools";
import {commentTagEnums} from "@/constant/enums/comment-tag";
import {getCommentWebsite, replyCommentWebsite} from "@/api/comment";
import {toSpecifyPageWithQuery} from "@/router";
import {getGenderObj} from "@/constant/enums/gender-opt";
import {getRoleTypeObj} from "@/constant/enums/role-type";
import CaskLongTextInput from "@/ui/components/CaskLongTextInput.vue";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const globalState = useGlobalStateStore();
const thisRouter = useRouter()


//页面元素
const globalSendEnable = ref(true)
const dataLoaded = ref(false)
const showPic = ref(false)
const websiteReplyContext = ref("")
const commentPageNo = ref(1)
const commentPages = ref(1)
const commentType = ref(null)
const commentPageShow = ref([
  {code: 1, label: "1"},
])
const commentOriginObj = ref({
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

function submitCommentInput(comment) {
  globalSendEnable.value = false
  if (comment) {
    if (!comment.webReplyContext || 0 === comment.webReplyContext.trim().length) {
      notifyTopWarning(t('main_comment_send_empty'))
      globalSendEnable.value = true
    } else {
      comment.webReplyContext = comment.webReplyContext.trim()
      replyCommentWebsite({
        commentContent: comment.webReplyContext,
        secondaryId: comment.webReplySecondaryId,
        mainSubId: comment.webReplyMainSubId,
      }).then(res => {
        if (!res || !res.data) {
          globalSendEnable.value = true
          return
        }
        notifyTopPositive(t('main_comment_send_successful'))
        lastCommentId.value = comment.id
        refreshCommentTree(false, false)
        globalSendEnable.value = true
      })
    }
  } else {
    if (!websiteReplyContext.value || 0 === websiteReplyContext.value.trim().length) {
      notifyTopWarning(t('main_comment_send_empty'))
      globalSendEnable.value = true
    } else {
      websiteReplyContext.value = websiteReplyContext.value.trim()
      replyCommentWebsite({commentContent: websiteReplyContext.value}).then(res => {
        if (!res || !res.data) {
          globalSendEnable.value = true
          return
        }
        notifyTopPositive(t('main_comment_send_successful'))
        websiteReplyContext.value = ""
        refreshCommentTree(true)
        globalSendEnable.value = true
      })
    }
  }
}


function refreshCommentTree(navigateTo1 = false, rebuild = true) {
  //reset data
  if (rebuild) {
    dataLoaded.value = false
    commentTree.value = [];
    gotoPageTop()
  }
  if (navigateTo1) {
    commentPageShow.value = []
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
    // Build current page
    commentOriginObj.value = res.data.data
    commentTree.value = commentOriginObj.value.content
    commentPages.value = commentOriginObj.value.totalPages
    for (let obj of commentTree.value) {
      obj.webReplyContext = ""
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
    // Build pagination
    if (rebuild) {
      const commentPageShowNew = []
      const maxPageSlide = 2
      let hasPreEllipsis = false
      let hasPostEllipsis = false
      for (let pageNo = 1; pageNo <= commentPages.value; pageNo++) {

        // Deal with pre ellipsis
        if (pageNo < commentPageNo.value && commentPageNo.value - pageNo - maxPageSlide > 1) {
          hasPreEllipsis = true
        }

        // Deal with post ellipsis
        if (pageNo > commentPageNo.value && pageNo - commentPageNo.value - maxPageSlide > 1) {
          hasPostEllipsis = true
        }

        // Build
        if (pageNo === 1 || pageNo === commentPages.value || Math.abs(commentPageNo.value - pageNo) <= maxPageSlide) {
          commentPageShowNew.push({code: pageNo, label: pageNo})
        } else if (hasPreEllipsis && commentPageNo.value - pageNo === maxPageSlide + 1) {
          commentPageShowNew.push({code: pageNo, label: "···"})
        } else if (hasPostEllipsis && pageNo - commentPageNo.value === maxPageSlide + 2) {
          commentPageShowNew.push({code: pageNo - 1, label: "···"})
        }
        commentPageShow.value = commentPageShowNew
      }
    }
    // Finish
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

.guestbook-child-comment-body {
  overflow: hidden;
  border-radius: 1rem 0 1rem 1rem;
  background-color: rgba(var(--text-color), 0.075);
  font-size: .9rem;
  color: rgb(var(--text-color), 0.88);
  margin-bottom: 1rem;

  .guestbook-child-comment-body-header {
    font-size: 0.8rem;
    color: rgb(var(--text-color), 0.86);
  }
}

.guestbook-child-comment-enter-active,
.guestbook-child-comment-leave-active {
  max-height: 40rem;
  transition: all .5s cubic-bezier(0.1, 0.7, 0.2, 0.7);
}

.guestbook-child-comment-enter-from,
.guestbook-child-comment-leave-to {
  max-height: 0;
  opacity: 0;
}

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