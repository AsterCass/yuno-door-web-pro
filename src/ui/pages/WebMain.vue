<template>


  <q-layout>


    <q-img class="index-img"
           :no-native-menu="false"
           src="/img/bg-1.jpg"
           alt=""
           :ratio="4/3"
           :fit="'cover'">
    </q-img>


    <h6 v-for="index in 15" :key="index">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro.
      Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
    </h6>

  </q-layout>





</template>

<script setup>


</script>

<style lang="scss">


</style>