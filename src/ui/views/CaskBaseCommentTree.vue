<template>
  <div class="row justify-center">
    <div class="col-lg-6 col-12">

      <div class="text-center q-mb-lg">
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
          <div class="row" style="margin-left: 75px; font-size: 0.95rem">
            <div class="col-12 q-mb-sm">
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
              <q-btn class="component-none-btn-grow q-ml-md" no-caps style="padding: 0!important;" unelevated>
                <div class="row items-center q-ma-xs">
                  <q-icon name="fa-regular fa-comment-dots" size="1.2rem"/>
                </div>
              </q-btn>
              <div class="q-mx-xs">
                {{ comment.childData.length }}
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

                <div class="row" style="margin-left: 55px; font-size: 0.95rem">
                  <div class="col-12 q-mb-sm">
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
                    <q-btn class="component-none-btn-grow q-ml-md" no-caps style="padding: 0!important;" unelevated>
                      <div class="row items-center q-ma-xs">
                        <q-icon name="fa-regular fa-comment-dots" size="1.2rem"/>
                      </div>
                    </q-btn>
                    <div class="q-mx-xs">
                      {{ childComment.replyNum }}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <cask-long-text-input :elements="new Map([
          [CaskLongTextInputElement.FILE, {callback: ()=> {}}],
          [CaskLongTextInputElement.IMG, {callback: ()=> {}}],
          [CaskLongTextInputElement.EMOJI, {callback: ()=> {}}],
          [CaskLongTextInputElement.CALL, {callback: ()=> {}}],
          ])" class="q-mt-lg"/>
    </div>
  </div>
</template>

<script setup>
import {defineProps, onMounted, ref} from "vue";
import {getCommentTree, likeComment} from "@/api/comment";
import {commentTree2TwoLevelTree} from "@/utils/comment-tree";
import CaskLongTextInput from "@/ui/components/CaskLongTextInput.vue";
import {CaskLongTextInputElement} from "@/constant/enums/component-enums";
import {useGlobalStateStore} from "@/utils/global-state";
import {notifyTopWarning} from "@/utils/notification-tools";

const props = defineProps({
  mainId: {
    type: String,
    default: "UN_KNOW"
  },
})
const globalState = useGlobalStateStore();
//回复相关
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

onMounted(() => {
  initCommentData()
  buildCommentTree()
})


</script>

<style scoped lang="scss">

</style>