<template>
  <div class="error-page-main" style="background-image: url('/img/601-bg.jpg')">
    <span class="error-page-mask"/>
    <div class="error-page-container">
      <div class="row justify-center">
        <div class="col-lg-12 text-center">
          <h1>
            Error 403
          </h1>
          <h2>
            Erm. User authentication failed
          </h2>
          <p>
            您还未被授权当前页面，回到主页重新看看吧
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