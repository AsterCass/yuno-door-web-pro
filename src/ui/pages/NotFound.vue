<template>
  <div class="error-page-main" style="background-image: url('/img/404-bg.jpg')">
    <span class="error-page-mask"/>
    <div class="error-page-container">
      <div class="row justify-center">
        <div class="col-md-12 text-center">
          <h1>
            Error 404
          </h1>
          <h2>
            Erm. Page not found
          </h2>
          <p>
            页面地址错咯，回到主页重新看看吧
          </p>
          <q-btn class="q-mt-lg error-page-btn"
                 outline push label="Go to Homepage" @click="backToHome(thisRouter)"/>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
import {backToHome} from "@/router/index.js"
import {useRouter} from "vue-router";

const thisRouter = useRouter()
</script>

<style lang="scss" scoped>
@import "@/styles/main";

</style>