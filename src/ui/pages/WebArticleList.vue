<template>
  31232131
</template>

<script setup>

import {defineProps, onMounted} from "vue";
import {simplePage} from "@/utils/page";
import {getBlogList} from "@/api/article";

const props = defineProps({
  authorId: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: ""
  }
});

let currentParam = {}
let currentPage = 1

function searchArticleList(keywordParam) {
  //参数插入
  if (props.authorId) {
    currentParam.authorId = props.authorId
  }
  if (props.type) {
    currentParam.articleType = props.type
  }
  if (keywordParam) {
    currentParam.keyword = keywordParam
  }

  getBlogList(simplePage(currentParam, currentPage)).then(res => {
    console.log(res.data.data)
  })
}


onMounted(() => {
  searchArticleList()
})


</script>


<style scoped lang="scss">

</style>