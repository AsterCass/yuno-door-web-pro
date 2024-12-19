<template>
  <q-layout view="hhh lpr fff">
    <cask-base-header :center-elements="[
        CaskModuleElement.ARTICLE,
        CaskModuleElement.HOME,
        CaskModuleElement.CHATROOM,
    ]"/>

    <div class="row justify-center">
      <q-img :no-native-menu="false" :ratio="1/6" fit="cover"
             :src="globalState.curThemeName !== 'dark' ? '/img/article-detail.jpg' : '/img/bg-2-fixed.jpg'"
             class="cask-article-detail-bg-image">
      </q-img>
    </div>


    <div v-if="!inLoading" class="row justify-center cask-base-simple-main">

      <div class="col-lg-3 col-12" :class="globalState.screenMini ? 'q-px-sm' : 'q-pl-lg'" style="margin-top: 7.5rem">
        <div :class="globalState.screenMini ? '' : 'article-left-sidebar'">
          <h2 style="font-size: 1.75rem; line-height: 2.9rem; word-wrap: break-word;">
            {{ blogMeta.articleTitle }}
          </h2>

          <div class="row justify-between items-center q-mt-lg">
            <div class="row items-center">
              <q-btn round push color="black" @click="toSpecifyPageWithQuery(
                  thisRouter, 'space', {id: blogMeta.authorId})">
                <q-avatar size="38px" style="margin: 2px">
                  <q-img :src="blogMeta.authorAvatar"/>
                </q-avatar>
              </q-btn>
              <div style="font-size: 1rem; margin-left: 12px" class="cask-jump-link-in-text-origin"
                   @click="toSpecifyPageWithQuery( thisRouter, 'space', {id: blogMeta.authorId})">
                {{ blogMeta.authorName }}
              </div>
            </div>
            <div style="opacity: .5">
              <div>
                {{ $t('dynamic-create-time') }}:&nbsp;{{ blogMeta.createTime }}
              </div>
              <div>
                {{ $t('dynamic-update-time') }}:&nbsp;{{ blogMeta.updateTime }}
              </div>
            </div>
          </div>

          <div v-if="!globalState.screenMini" class="row relative-position q-mt-lg">
            <q-img v-show="showPic" :no-native-menu="false" :ratio="1" fit="cover"
                   src="/img/article-bg.jpg"
                   style="border-radius: 32px; position: absolute; translate: -3%; scale: .95">
              <template v-slot:loading/>
            </q-img>

            <q-img :no-native-menu="false" :ratio="1" fit="cover"
                   :src="globalState.curThemeName === 'dark' ? '/img/article-bg-dark.svg' : '/img/article-bg-light.svg'"
                   style="position: absolute; translate: -3%; scale: 0.96">
              <template v-slot:loading/>
            </q-img>
          </div>
        </div>
      </div>

      <div class="col-lg-6 col-12 component-marked-view q-mt-xl" :class="globalState.screenMini ? 'q-px-sm' : 'q-px-xl'"
           style="min-height: 60rem">
        <div ref="articleMainContent">
          <div v-html="markdownToHtml" class="blogMarkDown"></div>
        </div>
      </div>

      <div v-if="!globalState.screenMini" class="col-lg-3 col-12 q-pr-lg" style="margin-top: 7rem">
        <div class="article-right-sidebar">

          <q-scroll-area delay="100" style="height: 600px;"
                         :thumb-style="globalState.curThemeName === 'dark' ?
                         { background: 'white', width: '6px' } :
                          { background: 'black', width: '6px' }">
            <h3 v-if="showAnchor" style="font-size: 1.5rem !important;">
              {{ $t('main_article_nav') }}
            </h3>
            <q-list>
              <q-item clickable v-ripple dense style="border-radius: 8px"
                      v-for="item in titleAnchorData"
                      :key="item.title"
                      @click="togoElementCenter(item.value)">
                <q-item-section class="q-my-xs">
                  <h6>
                    {{ item.title }}
                  </h6>
                </q-item-section>
              </q-item>
            </q-list>

            <h3 v-if="showRecommend" style="font-size: 1.5rem !important;">
              {{ $t('main_article_recommend') }}
            </h3>

            <q-list>
              <q-item clickable v-ripple dense style="border-radius: 8px"
                      v-for="item in titleRefData" :key="item"
                      @click="()=>{toSpecifyPageWithQueryNewTab(
                          thisRouter, 'webArticleDetail', {articleId: item.articleId})}">
                <q-item-section class="q-my-xs">
                  <h6 style="color: rgb(var(--pointer));text-decoration: underline;">
                    {{ item.title }}
                  </h6>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple dense style="border-radius: 8px"
                      v-for="item in extraArticleData" :key="item"
                      @click="()=>{toSpecifyPageWithQueryNewTab(
                          thisRouter, 'webArticleDetail', {articleId: item.id})}">
                <q-item-section class="q-my-xs">
                  <h6 style="color: rgb(var(--pointer));text-decoration: underline;">
                    {{ item.articleTitle }}
                  </h6>
                </q-item-section>
              </q-item>
            </q-list>

          </q-scroll-area>


        </div>
      </div>

    </div>

    <div v-else class="row justify-center cask-base-simple-main" style="min-height: 60rem">
      <div style="position: fixed; top: 50%; left: 50%;transform: translateX(-50%);">
        <q-spinner-pie size="75px"/>
      </div>
    </div>

    <div v-if="!inLoading" class="cask-base-simple-bottom">
      <cask-base-comment-tree :main-id="articleId"/>
    </div>

    <cask-dialog-image v-model="showImg" :src="showImgSrc"/>

    <cask-base-footer/>
  </q-layout>
</template>

<script setup>
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import {computed, defineProps, onBeforeUnmount, onMounted, ref} from "vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {getBlogContent, getBlogList, getBlogMeta} from "@/api/article";
import {useRouter} from "vue-router";
import {decrypt} from "@/utils/crypto";
import {buildImgFormat, headToHtmlTag, importStyle, importStyleLight, marked} from "@/utils/marked-tools";
import {delay, togoElementCenter} from "@/utils/base-tools";
import {customPageNP} from "@/utils/page";
import {toSpecifyPage, toSpecifyPageWithQuery, toSpecifyPageWithQueryNewTab} from "@/router";
import CaskDialogImage from "@/ui/components/CaskDialogImage.vue";
import CaskBaseCommentTree from "@/ui/views/CaskBaseCommentTree.vue";
import {CaskModuleElement} from "@/constant/enums/component-enums";

const props = defineProps({
  articleId: {
    type: String,
    default: "AT"
  },
})
const globalState = useGlobalStateStore();
//导航
const thisRouter = useRouter()
//页面元素
const baseElement = ref(null)
const titleAnchorData = ref([])
const titleRefData = ref([])
const extraArticleData = ref([])
const showRecommend = ref(false)
const showAnchor = ref(false)
const inLoading = ref(true)
const showPic = ref(false)
const articleMainContent = ref(null)
//图片放大
const showImg = ref(false)
const showImgSrc = ref("")
//基础数据
const blogContent = ref("")
const blogMeta = ref({
  articleTitle: "Loading...",
  createTime: "1970-01-01",
  updateTime: "1970-01-01",
  refArticleList: [],
  articleBrief: "description",
  articleKeyList: [],
  authorAvatar: "",
  authorId: "",
  authorName: "",
})

//请求后端获取文章内容
function getBlogContentMethod() {
  getBlogContent({id: props.articleId}).then(res => {
    decrypt(res.data).then(text => {
          blogContent.value = text
        }
    )
  })
}

//左侧导航不够填充，获取更多推荐
function loadMoreRecommend(num) {
  getBlogList(customPageNP(0, num)).then(res => {
    if (!res || !res.data || !res.data.data) {
      return
    }
    extraArticleData.value.push(...res.data.data)
  })
}

//markdown转html
const markdownToHtml = computed(() => {
  const html = marked.parse(blogContent.value)
  buildImgFormat(articleMainContent.value, (element) => {
    showImgSrc.value = element.src
    showImg.value = true
  })
  return html
})

//请求后端获取文章meta
function getBlogMetaMethod() {
  getBlogMeta({id: props.articleId}).then(res => {
    if (!res || !res.data || !res.data.data) {
      toSpecifyPage(thisRouter, '404')
      return
    }
    //获取文章信息
    getBlogContentMethod()
    //基础数据
    blogMeta.value = res.data.data
    //更新document，堆砌 meta keywords description 这种对现代搜索引擎的内容收录产生任何直接影响，所以这里就改个标题就完事了
    document.title = blogMeta.value.articleTitle
    //渲染导航信息
    titleAnchorData.value = headToHtmlTag(blogMeta.value)
    const titleNum = titleAnchorData.value ? titleAnchorData.value.length : 0
    //渲染推荐信息
    titleRefData.value = blogMeta.value.refArticleList
    const refNum = titleRefData.value ? titleRefData.value.length : 0
    //剩余容量 容量最小值10
    let remain = 10 - titleNum - refNum
    if (remain > 0) {
      loadMoreRecommend(remain)
    }
    showRecommend.value = remain > 0 || refNum > 0
    showAnchor.value = titleNum > 0
    inLoading.value = false
    delay(300).then(() => {
      showPic.value = true
    })
  })
}

onMounted(() => {
  //该页面所有链接均打开新标签，不在本页面打开，目的兼容markdown语法
  const base = document.createElement("base")
  base.setAttribute("target", "_blank")
  document.querySelector('head').append(base)
  baseElement.value = base
  //随机导入code样式
  if (globalState.curThemeName === 'dark') {
    importStyle()
  } else {
    importStyleLight()
  }
  //获取文章元数据
  getBlogMetaMethod()
})

onBeforeUnmount(() => {
  //删除页面标签基础标签
  document.querySelector('head').removeChild(baseElement.value)
})


</script>

<style scoped lang="scss">

.article-left-sidebar {
  width: 100%;
  height: 800px;
  position: sticky;
  top: 9rem;
  align-self: flex-start;
  //margin-bottom: 5rem;
}

.article-right-sidebar {
  width: 100%;
  height: 800px;
  position: sticky;
  top: 9rem;
  align-self: flex-start;
  //margin-bottom: 5rem;
}

.cask-article-detail-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  z-index: -1 !important;
  opacity: 0.9;

  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0));
}

</style>

<style lang="scss">
@import "@/styles/base-marked";

</style>