<template>
  <div class="row justify-center">
    <div class="col-lg-6 col-12">
      <cask-long-text-input :elements="new Map([
          [CaskLongTextInputElement.FILE, {callback: ()=> {}}],
          [CaskLongTextInputElement.IMG, {callback: ()=> {}}],
          [CaskLongTextInputElement.EMOJI, {callback: ()=> {}}],
          [CaskLongTextInputElement.CALL, {callback: ()=> {}}],
          ])"/>
    </div>
  </div>
</template>

<script setup>
import {defineProps, onMounted, ref} from "vue";
import {getCommentTree} from "@/api/comment";
import {commentTree2TwoLevelTree} from "@/utils/comment-tree";
import CaskLongTextInput from "@/ui/components/CaskLongTextInput.vue";
import {CaskLongTextInputElement} from "@/constant/enums/component-enums";

const props = defineProps({
  mainId: {
    type: String,
    default: "UN_KNOW"
  },
})
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
//用户信息
const userData = ref({})


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

onMounted(() => {
  initCommentData()
  buildCommentTree()
})


</script>

<style scoped lang="scss">

</style>