<template>
  <!--  <div class="footer">-->
  <!--    <ul class="copyright">-->
  <!--      <li>&copy; 2020-{{ curYear }} astercasc.com 版权所有 互联网ICP备案：-->
  <!--        <a target="_blank" href="https://beian.miit.gov.cn/">浙ICP备2022023127号</a>-->
  <!--      </li>-->
  <!--      <li>-->
  <!--        <q-icon name="eva-github"/>-->
  <!--        Github: <a target="_blank" href="https://github.com/AsterCass?tab=repositories">AsterCass</a>-->
  <!--      </li>-->
  <!--      <li>-->
  <!--        <q-icon name="fa-solid fa-envelope"/>-->
  <!--        Mail: astercass@qq.com-->
  <!--      </li>-->
  <!--      <li>-->
  <!--        <q-icon name="fa-brands fa-qq"/>-->
  <!--        QQ: 404919617-->
  <!--      </li>-->
  <!--    </ul>-->
  <!--  </div>-->

  <div class="bottom-footer-base row items-center justify-center">

    <div class="row items-center">
      &copy; 2020-{{ curYear }} astercasc.com 版权所有 互联网ICP备案：
      <a target="_blank" href="https://beian.miit.gov.cn/">浙ICP备2022023127号</a>
    </div>

    <q-separator vertical class="component-separator-in-container" size="1px" style="margin: 16px"/>

    <div class="row items-center">
      Github：
      <a target="_blank" href="https://github.com/AsterCass?tab=repositories">AsterCass</a>
    </div>

    <q-separator vertical class="component-separator-in-container" size="1px" style="margin: 16px"/>

    <div class="row items-center">
      Mail：astercass@qq.com
    </div>

    <q-separator vertical class="component-separator-in-container" size="1px" style="margin: 16px"/>

    <div class="row items-center">
      QQ：404919617
    </div>

  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {date} from "quasar";

const curYear = ref("2020")

onMounted(() => {
  const timeStamp = new Date()
  curYear.value = date.formatDate(timeStamp, 'YYYY')
})

</script>

<style scoped lang="scss">

.bottom-footer-base {
  margin-top: 1rem;
  background-color: var(--full-container-background-color-dark);
  color: var(--full-container-text-color);
  min-height: 3rem;

  a {
    color: var(--full-container-text-color);
  }

}

</style>