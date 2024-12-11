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
                     class="q-mb-md component-outline-input-grow" @keyup.enter="searchArticleList">
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-magnifying-glass" size="1rem"/>
              </template>
            </q-input>
          </div>

          <div class="row q-mt-lg" v-if="type === '1'">
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

      <div v-if="firstLoading" class="col-lg-9 col-12 q-mt-xl row items-center justify-center">
        <q-spinner-pie size="75px"/>
      </div>

      <div v-else class="col-lg-9 col-12 q-mt-xl" :class="globalState.screenMini ? 'q-px-sm' : 'q-px-xl'"
           style="min-height: 60rem;">

        <q-infinite-scroll @load="onLoadArticleListData" :offset="250" :disable="scrollDisable">
          <q-intersection once v-for="(article, index) in articleList" :key="index"
                          transition="slide-up" transition-duration="600" class="q-my-lg">

            <div class="full-width row justify-center">
              <div class="col-11 col-lg article-list-card-body" @click="toSpecifyPageWithQuery(
                  thisRouter, 'webArticleDetail', {articleId: article.id})">
                <h3>
                  {{ article.articleTitle }}
                </h3>
                <div class=" q-mb-md component-max-line-text-3">
                  {{ article.articleBrief }}
                </div>
                <div class="row justify-between items-center">
                  <div class="row items-center">
                    <q-avatar
                        size="30px" class="q-mr-sm">
                      <q-img spinner-size="1rem" :src="article.authorAvatar"/>
                    </q-avatar>
                    <div>
                      {{ article.authorName }}
                    </div>
                  </div>

                  <div class="row q-mr-xs relative-position">
                    <q-icon v-for="(tag, index) in getArticleTagDescList(article.articleTagList)" :key="index"
                            class="article-list-card-body-tag absolute" :style="`top: 0; right: ${(index-1)*40 + 50}px`"
                            name="fa-solid fa-bookmark" size="28px"
                            :color="tag.color"/>
                    <div class="row justify-end article-list-card-body-tag-focus">
                      <div v-for="(tag, index) in getArticleTagDescList(article.articleTagList).reverse()" :key="index"
                           class="q-mx-sm" :style="`background-color: ${tag.rbg}`"
                           style="padding: 2px 5px; color: #eee; border-radius: 4px">
                        {{ tag.name }}
                      </div>
                    </div>
                  </div>


                </div>

              </div>
              <div v-if="!globalState.screenMini" class="column items-center" style="width: 50px">
                <div style="width: 10px;height: 10px;border-radius: 50%; margin-top: 12px;
                        background-color: rgba(var(--text-color), .75)"/>
                <div class="col" style="width: 2px; background-color: rgba(var(--text-color), .5);
                 margin: 12px 0 18px 0; border-radius: 1px;">
                </div>
              </div>
              <div v-if="!globalState.screenMini" class="col-lg-3 q-mt-xs">
                <div>
                  {{ $t('dynamic-create-time') }}:&nbsp;{{ article.createTime }}
                </div>
                <div class="q-mt-xs">
                  {{ $t('dynamic-update-time') }}:&nbsp;{{ article.updateTime }}
                </div>
              </div>
            </div>

          </q-intersection>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-pie size="50px"/>
            </div>
          </template>
        </q-infinite-scroll>


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
import {articleTagEnums, getArticleTagDescList} from "@/constant/enums/article-tag";
import {delay, gotoPageTop} from "@/utils/base-tools";
import {toSpecifyPageWithQuery} from "@/router";

const props = defineProps({
  authorId: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "1"
  }
})
const globalState = useGlobalStateStore();
//导航
const thisRouter = useRouter()
//页面元素
const searchArticle = ref("")
const showPic = ref(false)
const articleList = ref([])
const scrollDisable = ref(true)
const firstLoading = ref(true)
//筛选
const selectedTagList = ref(new Set())
//分页
let currentParam = {}
let currentPage = 1

function searchArticleList() {
  //数据重置
  currentPage = 1
  articleList.value.splice(0)
  //参数插入
  if (props.authorId) {
    currentParam.authorId = props.authorId
  }
  if (props.type) {
    currentParam.articleType = props.type
  }
  //keyword
  if (searchArticle.value) {
    currentParam.keyword = searchArticle.value
  } else {
    currentParam.keyword = ""
  }
  //标签参数
  if (0 !== selectedTagList.value.size) {
    currentParam.tags = [...selectedTagList.value].join()
  } else {
    currentParam.tags = null
  }
  //request
  getBlogList(simplePage(currentParam, currentPage)).then(res => {
    if (!res || !res.data || !res.data.data) {
      return
    }
    articleList.value.push(...res.data.data)
    firstLoading.value = false
    //首次请求完成后开启无限滚动
    scrollDisable.value = false
    gotoPageTop()
  })
}

function onLoadArticleListData(index, done) {
  ++currentPage
  currentParam.articleType = props.type
  getBlogList(simplePage(currentParam, currentPage)).then(res => {
    if (!res || !res.data || !res.data.data) {
      return
    }
    //获取了全部数据关闭无限滚动
    if (0 === res.data.data.length) {
      scrollDisable.value = true
      return
    }
    //继续请求
    articleList.value.push(...res.data.data)
    done()
  })
}


function deleteAndAddTagSet(code) {
  if (selectedTagList.value.has(code)) {
    selectedTagList.value.delete(code)
  } else {
    selectedTagList.value.add(code)
  }
  searchArticleList()
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

.article-list-card-body {
  border-radius: 12px;
  padding: 0 1rem 1rem 1rem;
  border-bottom: solid 2px rgba(var(--text-color), 0.75);
  transition: transform .5s ease, box-shadow .5s ease;
  cursor: pointer;

  .article-list-card-body-tag {
    transition: transform .5s ease .2s, opacity .5s ease .2s;
    transform: translateY(35px);
    opacity: 1;
  }

  .article-list-card-body-tag-focus {
    transition: transform .5s ease .2s, opacity .5s ease .2s;
    transform: translateX(30px);
    opacity: 0;
  }

  &:hover {
    transform: translateX(-3%) translateY(-3%);
    box-shadow: 3px 3px 6px 2px rgb(var(--container-text-color));
  }

  &:hover .article-list-card-body-tag {
    transform: rotate(-90deg);
    opacity: 0;
  }

  &:hover .article-list-card-body-tag-focus {
    transform: translateX(0px);
    opacity: 1;
  }

}

</style>