<template>
  <div class="row justify-center">
    <div class="col-lg-6 col-12">

      <div id="comment-reply-title" class="text-center q-mb-lg">
        <h2>
          {{ commentSum }}&nbsp;&nbsp;评论
        </h2>
      </div>

      <div>
        <div v-for="(comment, index) in commentTree" :key="index" class="q-ma-md">
          <div class="row items-center">
            <div class="relative-position q-mr-md" style="width: 50px; height: 50px">
              <q-avatar size="56px" style="filter: blur(3px); position: absolute;">
                <q-img :src="comment.commentUserAvatar"/>
              </q-avatar>
              <q-avatar size="50px" style=" position: absolute; left: 3px; top: 3px">
                <q-img :src="comment.commentUserAvatar"/>
              </q-avatar>
            </div>
            <div class="q-ma-sm" style="font-size: 1.1rem; color: rgb(var(--positive))">
              {{ comment.commentUserName }}
            </div>

            <div style="font-size: .85rem;opacity: 0.8;">
              {{ comment.commentTime }}&nbsp;·&nbsp;
            </div>
            <div style="font-size: .85rem; opacity: 0.8;">
              {{ comment.ipAddressName }}
            </div>
          </div>
          <div class="row" style="margin-left: 75px;">
            <div class="col-12 q-mb-sm" style="font-size: 0.95rem">
              {{ comment.commentContent }}
            </div>
            <div class="row items-center justify-end">
              <q-btn class="component-none-btn-grow" no-caps style="padding: 0!important;" unelevated
                     @click="updateUserLike(comment)">
                <div class="row items-center q-ma-xs">
                  <q-icon v-show="1 === comment.isLike" style="color: rgb(var(--positive))" name="fa-solid fa-thumbs-up"
                          size="1.2rem"/>
                  <q-icon v-show="1 !== comment.isLike" name="fa-regular fa-thumbs-up" size="1.2rem"/>
                </div>
              </q-btn>
              <div class="q-mx-xs" style="width: 10px">
                {{ comment.likeNum }}
              </div>
              <div class="q-ml-md">
                <div class="row items-center q-ma-xs ">
                  <q-icon name="fa-regular fa-comment-dots" size="1.2rem"/>
                </div>
              </div>
              <div class="q-mx-xs">
                {{ comment.childData.length }}
              </div>
              <div class="q-ml-md cask-jump-link-in-text" style="font-size: .85rem; margin-bottom: 1px;"
                   @click="updateReplyComment(comment, null)">
                回复
              </div>
            </div>

            <div v-if="comment.childData && 0 !== comment.childData.length"
                 class="q-mt-md col-12" style="font-size: 0.95rem">
              <div v-for="(childComment, index) in comment.childData" :key="index" class="q-ma-sm">
                <div class="row items-center">
                  <div class="relative-position q-mr-md" style="width: 30px; height: 30px">
                    <q-avatar size="36px" style="filter: blur(3px); position: absolute;">
                      <q-img :src="childComment.commentUserAvatar"/>
                    </q-avatar>
                    <q-avatar size="30px" style=" position: absolute; left: 3px; top: 3px">
                      <q-img :src="childComment.commentUserAvatar"/>
                    </q-avatar>
                  </div>
                  <div class="q-ma-sm" style="font-size: .95rem; color: rgb(var(--positive))">
                    {{ childComment.commentUserName }}
                  </div>
                  <div style="font-size: .75rem;opacity: 0.8;">
                    {{ childComment.commentTime }}&nbsp;·&nbsp;
                  </div>
                  <div style="font-size: .75rem; opacity: 0.8;">
                    {{ childComment.ipAddressName }}
                  </div>
                </div>

                <div class="row" style="margin-left: 55px">
                  <div class="col-12 q-mb-sm" style="font-size: 0.95rem">
                    <span v-if=" comment.id !== childComment.mainSubId" style="color: rgb(var(--pointer));">
                      @{{ childComment.mainSubUserName }}:&nbsp;
                    </span>
                    {{ childComment.commentContent }}
                  </div>
                  <div class="row items-center">
                    <q-btn class="component-none-btn-grow" no-caps style="padding: 0!important;" unelevated
                           @click="updateUserLike(childComment)">
                      <div class="row items-center q-ma-xs">
                        <q-icon v-show="1 === childComment.isLike" style="color: rgb(var(--positive))"
                                name="fa-solid fa-thumbs-up"
                                size="1.2rem"/>
                        <q-icon v-show="1 !== childComment.isLike" name="fa-regular fa-thumbs-up" size="1.2rem"/>
                      </div>
                    </q-btn>
                    <div class="q-mx-xs" style="width: 10px">
                      {{ childComment.likeNum }}
                    </div>
                    <div class="q-ml-md">
                      <div class="row items-center q-ma-xs">
                        <q-icon name="fa-regular fa-comment-dots" size="1.2rem"/>
                      </div>
                    </div>
                    <div class="q-mx-xs">
                      {{ childComment.replyNum }}
                    </div>
                    <div class="q-ml-md cask-jump-link-in-text" style="font-size: .85rem; margin-bottom: 1px;"
                         @click="updateReplyComment(comment, childComment)">
                      回复
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <div style="height: 15px;color: rgb(var(--pointer))" class="row items-center justify-between q-px-sm">
        <div v-if="replySubUserName" style="font-size: 0.95rem" class="cask-cursor-pointer">
          @{{ replySubUserName }}&nbsp;:
        </div>
        <div v-if="replySubUserName" style="font-size: 0.85rem" class="q-mr-sm cask-jump-link-in-text-origin"
             @click="cancelReplySub">
          取消回复
        </div>
      </div>
      <cask-long-text-input id="comment-reply-input" :elements="new Map([
          [CaskLongTextInputElement.FILE, {callback: ()=> {}}],
          [CaskLongTextInputElement.IMG, {callback: ()=> {}}],
          [CaskLongTextInputElement.EMOJI, {callback: ()=> {}}],
          [CaskLongTextInputElement.CALL, {callback: ()=> {}}],
          ])" :placeholder="replySubContent" :sendCallback="submitCommentInput" v-model="commentContent"
                            @update:model-value="data => commentContent = data"
      />
    </div>
  </div>


  <!--  todo 双语支持-->
  <!--  todo 楼层数量-->
</template>

<script setup>
import {defineProps, onMounted, ref} from "vue";
import {getCommentTree, likeComment, replyComment} from "@/api/comment";
import {commentTree2TwoLevelTree} from "@/utils/comment-tree";
import CaskLongTextInput from "@/ui/components/CaskLongTextInput.vue";
import {CaskLongTextInputElement} from "@/constant/enums/component-enums";
import {useGlobalStateStore} from "@/utils/global-state";
import {notifyTopPositive, notifyTopWarning} from "@/utils/notification-tools";
import {delay, togoElementCenter} from "@/utils/base-tools";
import {checkReply} from "@/utils/format-check";

const props = defineProps({
  mainId: {
    type: String,
    default: "UN_KNOW"
  },
})
const globalState = useGlobalStateStore();
//回复相关
const replySubMainId = ref(props.mainId)
const replySecondaryId = ref(props.mainId)
const replySubUserName = ref("")
const replySubContent = ref("")
const commentContent = ref("")
//评论树
const commentOriginObj = ref({
  tree: [],
  sum: 0
})
const commentTree = ref([
  {
    commentUserId: "",
    commentUserName: "",
    commentContent: "",
    commentTime: "",
    ipAddressName: "",
    commentUserAvatar: "",
    likeNum: 0,
    isLike: 0,
    childData: [{
      mainSubId: "",
      mainSubUserName: "",
      likeNum: 0,
      isLike: 0,
      replyNum: 0,
    }],
  }
])
const commentSum = ref(0)

function initCommentData() {
  commentSum.value = 0;
  commentTree.value = [];
}

function buildCommentTree() {
  getCommentTree(props.mainId).then(res => {
    if (!res || !res.data || !res.data.data) {
      return
    }
    commentOriginObj.value = res.data.data
    commentSum.value = commentOriginObj.value.sum
    commentTree.value = commentTree2TwoLevelTree(commentOriginObj.value.tree)
  })
}

function updateUserLike(comment) {
  if (!globalState.isLogin) {
    notifyTopWarning("未登录用户无法点赞，请登录后操作")
    return
  }
  if (0 === comment.isLike) {
    comment.isLike = 1
    comment.likeNum = comment.likeNum + 1
  } else {
    comment.isLike = 0
    comment.likeNum = comment.likeNum - 1
  }
  likeComment(comment.id, comment.isLike)
}

function updateReplyComment(comment, childComment) {
  if (childComment) {
    replySubMainId.value = childComment.id
    replySubUserName.value = childComment.commentUserName
    replySubContent.value = "回复: " + childComment.commentContent
  } else {
    replySubMainId.value = comment.id
    replySubUserName.value = comment.commentUserName
    replySubContent.value = "回复: " + comment.commentContent
  }
  replySecondaryId.value = comment.id
  togoElementCenter("comment-reply-input")
}

function cancelReplySub() {
  replySubMainId.value = props.mainId
  replySecondaryId.value = props.mainId
  replySubUserName.value = ""
  replySubContent.value = ""
}

function submitCommentInput() {
  let replyNewData = {mainId: props.mainId, mainSubId: replySubMainId.value, secondaryId: replySecondaryId.value};
  if (!checkReply(commentContent.value)) {
    notifyTopWarning("输入内容不允许为空，且不能超过500字符")
    return
  }
  replyNewData.commentContent = commentContent.value.trim()
  replyComment(replyNewData).then(res => {
    if (!res || !res.data || 200 !== res.data.status) {
      return
    }
    notifyTopPositive("回复成功")
    commentContent.value = ""
    buildCommentTree()
    delay(100).then(() => {
      togoElementCenter("comment-reply-title")
    })
  })
}

onMounted(() => {
  initCommentData()
  buildCommentTree()
})


</script>

<style scoped lang="scss">

</style>