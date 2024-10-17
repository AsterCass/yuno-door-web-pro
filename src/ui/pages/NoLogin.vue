<template>
  <div class="error-page-main-600">
    <span class="error-page-mask"/>
    <div class="error-page-container">
      <div class="row justify-center">
        <div class="col-lg-12 text-center">
          <h1>
            Error 600
          </h1>
          <h2>
            Erm. User not login
          </h2>
          <p>
            您还有没有登录喔，请登录
          </p>
          <q-btn class="q-mt-lg error-page-btn"
                 outline push label="Go to Homepage" @click="toSpecifyPage(thisRouter, 'login')"/>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
import {toSpecifyPage} from "@/router/index.js"
import {useRouter} from "vue-router";

const thisRouter = useRouter()
</script>

<style lang="scss" scoped>

</style>