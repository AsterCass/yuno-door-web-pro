<template>
  <q-layout view="hhh lpr fff">
    <cask-base-header :always-show="false"/>

    <div class="row justify-center cask-base-simple-main">
      <div class="col-lg-3 q-pl-xl">
        <h2>
          {{ blogMeta.articleTitle }}
        </h2>

        <div class="row justify-between items-center">


          <q-btn no-caps unelevated class=" component-none-btn-grow" style="border-radius: 8px !important;">
            <div class="row items-center q-ma-xs">
              <div class="bg-black q-btn--round">
                <q-avatar size="40px" style="margin: 2px">
                  <q-img :src="blogMeta.authorAvatar"/>
                </q-avatar>
              </div>
              <div style="font-size: 1rem; margin-left: 12px">
                {{ blogMeta.authorName }}
              </div>
            </div>
          </q-btn>


          <div style="opacity: .5">
            <div>
              {{ $t('dynamic-create-time') }}:&nbsp;{{ blogMeta.createTime }}
            </div>
            <div>
              {{ $t('dynamic-update-time') }}:&nbsp;{{ blogMeta.updateTime }}
            </div>
          </div>
        </div>

        <div class="row relative-position" style="margin-top: 8rem">

          <q-img :no-native-menu="false" :ratio="1" fit="cover"
                 src="/img/article-bg.jpg" style="border-radius: 32px; position: absolute; translate: -15%; scale: 1.2">
          </q-img>

          <q-img :no-native-menu="false" :ratio="1" fit="cover"
                 src="/img/article-bg-light.svg" style="position: absolute; translate: -15%; scale: 1.21">
          </q-img>

        </div>

      </div>

      <div class="col-lg-6" style="min-height: 60rem">

      </div>


      <div class="col-lg-3">

      </div>
    </div>


    <cask-base-footer/>
  </q-layout>
</template>

<script setup>
import CaskBaseHeader from "@/ui/views/CaskBaseHeader.vue";
import {defineProps, onMounted, ref} from "vue";
import CaskBaseFooter from "@/ui/views/CaskBaseFooter.vue";
import {useGlobalStateStore} from "@/utils/global-state";
import {getBlogContent, getBlogMeta} from "@/api/article";
import {useRouter} from "vue-router";
import {decrypt} from "@/utils/crypto";

const props = defineProps({
  articleId: {
    type: String,
    default: "AT"
  },
})
const globalState = useGlobalStateStore();
//导航
const thisRouter = useRouter()
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


//请求后端获取文章meta
function getBlogMetaMethod() {
  getBlogMeta({id: props.articleId}).then(res => {
    if (!res || !res.data || !res.data.data) {
      thisRouter.push({
        path: '/404'
      })
      return
    }
    //获取文章信息
    getBlogContentMethod()
    //基础数据
    blogMeta.value = res.data.data
    //更新document，堆砌 meta keywords description 这种对现代搜索引擎的内容收录产生任何直接影响，所以这里就改个标题就完事了
    document.title = blogMeta.value.articleTitle
  })
}

onMounted(() => {
  //获取文章元数据
  getBlogMetaMethod()
})


</script>

<style scoped lang="scss">

</style>