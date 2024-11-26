<template>

  <div class="video-col-frame-main">

    <div v-if="isEmpty" class="video-col-card-new">
      <q-btn class="row video-col-card-new-inner bg-grey-3" style="padding: 1%" label="UPLOAD"
             icon="fa-solid fa-plus" text-color="green-10" stack size="25px" @click="uploadVideo"/>

      <div class="text-center q-mt-sm video-col-title">
        <div class="text-center text-grey-7 simple-content simple-a-no-underline">上传视频</div>
      </div>

    </div>

    <div v-else class="video-col-card-list">

      <q-btn class="video-col-card-img bg-white" @click="playVideoList">
        <q-img :src="`${videoColData.collectionImg}`" :ratio="9/16" style="border-radius: 1rem">
        </q-img>
      </q-btn>
      <div class="text-center video-col-card-title">
        <div class="text-center text-grey-7 simple-content simple-a-no-underline">
          {{ videoColData.collectionName }}
        </div>
      </div>

    </div>


  </div>


</template>

<script setup>
import {defineProps} from "vue";

//prop
const props = defineProps({
  isEmpty: {
    type: Boolean,
    default: false
  },
  videoColData: {
    id: ""
  }
})

function uploadVideo() {
}

function playVideoList() {
}


</script>

<style lang="scss" scoped>

.video-col-frame-main {
  width: 100%;
  height: 100%;

  .video-col-card-new {
    width: 100%;
    height: 92%;
    border-radius: 1rem;

    .video-col-card-new-inner {
      height: 100%;
      width: 100%;
      box-shadow: 4px 4px 2px rgb(var(--container-text-color));
      border-radius: 1rem;
    }
  }


  .video-col-card-list {

    .video-col-card-img {
      //animation: fadeOutDown 1.7s infinite;
      padding: 1%;
      border-radius: 1rem;
      box-shadow: 4px 4px 2px rgb(var(--container-text-color));
      position: relative;
      width: 92%;
      left: 4%;
      transition-duration: .3s;
    }

    .video-col-card-title {
      transition-duration: .3s;
      margin-top: 5%;
    }
  }

  .video-col-card-list:hover {
    .video-col-card-img {
      margin: -20% -10%;
      box-shadow: 8px 8px 8px rgb(var(--container-text-color));
      width: 110%;
    }

    .video-col-card-title {
      margin-top: 25%;
      font-size: 1.2rem;
    }


  }


}


</style>