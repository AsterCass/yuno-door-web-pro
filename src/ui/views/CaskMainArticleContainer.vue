<template>
  <div class="row q-mx-xl q-mb-xl justify-center">

    <div class="col-12 row justify-center">
      <h2>
        {{ $t('main-nav-article') }}
      </h2>
    </div>

    <div class="col-12 text-center q-px-md" style="margin-bottom: 2rem; opacity: .5;max-width: 52rem">
      {{ $t('subtitle-1') }}
    </div>

    <div class="col-12 row">

      <div v-if="0 === articleList.length" class="col-12 row justify-center q-mb-xl">
        <q-spinner-bars size="40px"/>
      </div>

      <div v-for="(article, index) in articleList" :key="index" class="col-12 col-lg-4 q-mb-lg">
        <div class="q-mx-lg q-pa-sm justify-between"
             style="border-radius: 8px; background-color: rgb(var(--full-container-background-color-light))">

          <div style="width: 100%;">
            <q-img :no-native-menu="false" :ratio="16/9" fit="cover"
                   :src="`/img/main-article-${index%4}.jpg`" style="height: 15rem;border-radius: 8px;">
            </q-img>
          </div>

          <div class=" row q-mx-md">
            <h3>
              {{ article.articleTitle }}
            </h3>
          </div>


          <div class=" q-mb-lg q-mx-md component-max-line-text-4">
            {{ article.articleBrief }}
          </div>

          <div class="row q-mx-md q-mb-md  justify-between items-center">

            <div style="opacity: .5; margin-top: 3px">
              {{ article.createTime }}
            </div>

            <q-btn no-caps unelevated class="component-none-btn-grow"
                   @click="toSpecifyPageWithQuery(
                       thisRouter, 'webArticleDetail', {articleId: article.id})">
              <div class="row items-center">
                <div class="q-mr-sm">
                  {{ $t('route-more') }}
                </div>
                <q-icon name="fa-solid fa-align-right" size="15px"/>
              </div>
            </q-btn>
          </div>

        </div>
      </div>


    </div>


    <div class="col-12 row justify-center">
      <q-btn no-caps unelevated class="shadow-2 component-full-btn-std"
             @click="toSpecifyPageWithQuery(thisRouter, 'webArticleList', {type: 1})">
        <div class="row items-center">
          <div class="q-mx-xs">
            {{ $t('route-more-list') }}
          </div>
        </div>
      </q-btn>
    </div>


  </div>
</template>

<script setup>


import {onMounted, ref} from "vue";
import {getBlogList} from "@/api/article";
import {customPage} from "@/utils/page";
import {toSpecifyPageWithQuery} from "@/router";
import {useRouter} from "vue-router";

const thisRouter = useRouter()

const articleList = ref([])

onMounted(() => {
  let currentParam = {articleType: 1}
  getBlogList(customPage(currentParam, 0, 3)).then(res => {
    if (!res || !res.data || !res.data.data) {
      return
    }
    articleList.value.push(...res.data.data)
  })

})

</script>

<style scoped lang="scss">

</style>