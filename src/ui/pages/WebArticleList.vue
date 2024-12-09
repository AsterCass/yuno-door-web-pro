<template>
  <q-layout view="hhh lpr fff">
    <cask-base-header :center-elements="[
        CaskModuleElement.HOME,
        CaskModuleElement.CHATROOM,
    ]"/>


    <div class="row justify-center">
      <q-img :no-native-menu="false" :ratio="1/6" fit="cover"
             :src="globalState.curThemeName !== 'dark' ? '/img/article-list.jpg' : '/img/bg-2-fixed.jpg'"
             class="cask-article-list-bg-image">
      </q-img>
    </div>


    <div class="row justify-center cask-base-simple-main">

      <div class="col-lg-3 col-12" :class="globalState.screenMini ? 'q-px-sm' : 'q-pl-lg'" style="margin-top: 7.5rem">
        <div :class="globalState.screenMini ? '' : 'article-list-left-sidebar'">
          <h2 style="font-size: 1.75rem; line-height: 2.9rem; word-wrap: break-word;">
            {{ type === '1' ? $t('main-nav-article') : $t('main-nav-essay') }}
          </h2>
          <div style="opacity: .5">
            {{ type === '1' ? $t('subtitle-1') : $t('subtitle-2') }}
          </div>

          <div class="q-mt-lg q-pl-xs q-pr-lg">
            <q-input v-model="searchArticle" tabindex="0" dense outlined :placeholder="$t('component_search')"
                     class="q-mb-md component-outline-input-grow">
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-magnifying-glass" size="1rem"/>
              </template>
            </q-input>
          </div>

          <div class="row q-mt-lg">
            <q-btn v-for="(tag, index) in articleTagEnums" :key="index" push
                   no-caps unelevated class="q-ma-xs component-outline-btn-mini-grow"
                   :label="tag.name" :style="`border-color: ${tag.rbg} !important`"
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

      <div class="col-lg-6 col-12 q-mt-xl" :class="globalState.screenMini ? 'q-px-sm' : 'q-px-xl'"
           style="min-height: 60rem">

      </div>

      <div v-if="!globalState.screenMini" class="col-lg-3 col-12 q-pr-lg" style="margin-top: 7rem">
        <div class="article-list-right-sidebar">


        </div>
      </div>

    </div>


    <cask-base-footer/>

  </q-layout>
</template>

<script setup>

import {defineProps, onMounted, ref} from "vue";
import {simplePage} from "@/utils/page";
import {getBlogList} from "@/api/article";
import {CaskModuleElement} from "@/constant/enums/component-enums";
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {useRouter} from "vue-router";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {articleTagEnums} from "@/constant/enums/article-tag";
import {delay} from "@/utils/base-tools";

const props = defineProps({
  authorId: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: ""
  }
})
const globalState = useGlobalStateStore();
//导航
const thisRouter = useRouter()
//页面元素
const searchArticle = ref("")
const showPic = ref(false)
//筛选
const selectedTagList = ref(new Set())
//分页
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

function deleteAndAddTagSet(code) {
  if (selectedTagList.value.has(code)) {
    selectedTagList.value.delete(code)
  } else {
    selectedTagList.value.add(code)
  }

  console.log(selectedTagList.value)
}


onMounted(() => {
  searchArticleList()
  delay(300).then(() => {
    showPic.value = true
  })
})


</script>


<style scoped lang="scss">

.cask-article-list-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  z-index: -1 !important;
  opacity: 0.9;

  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0));
}

.article-list-right-sidebar {
  width: 100%;
  height: 800px;
  position: sticky;
  top: 9rem;
  align-self: flex-start;
}

.article-list-left-sidebar {
  width: 100%;
  height: 800px;
  position: sticky;
  top: 9rem;
  align-self: flex-start;
}

</style>