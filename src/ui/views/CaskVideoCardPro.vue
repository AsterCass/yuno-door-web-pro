<template>

  <div>
    <div class="column items-center justify-center" style="width: 10rem;" @click="onClick">
      <div class="card cursor-pointer">
        <div class="wrapper">
          <img :src="coverImage" class="cover-image"/>
        </div>
        <img :src="characterImage" class="character"/>
      </div>
      <div class="title">
        {{ name }}
      </div>
    </div>
  </div>


</template>

<script setup>
import {defineProps} from "vue";

//prop
const props = defineProps({
  coverImage: {
    type: String,
    required: false,
    default: '',
  },
  characterImage: {
    type: String,
    required: false,
    default: '',
  },
  name: {
    type: String,
    required: false,
    default: '',
  },
  onClick: {
    type: Function,
    required: false,
    default: () => {
    },
  }
})


</script>

<style lang="scss" scoped>


.card {
  width: 10rem;
  height: 15rem;
  border-radius: 8px;
  perspective: 2500px;
  position: relative;
}

.wrapper {
  transition: all 0.75s;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  z-index: -1;
}

.cover-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.character {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.75s;
  position: absolute;
  transform: translateY(-100%);
}

.title {
  padding-top: .2rem;
  text-align: center;
  width: 10rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  transition: all 0.75s;
}

.card:hover ~ .title {
  color: white;
  text-shadow: 5px 5px 5px black, -5px 5px 5px black, 5px -5px 5px black, -5px -5px 5px black;
  -webkit-animation: focus-in-contract 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: focus-in-contract 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  transform: translateY(-250%);
}

.card:hover .wrapper {
  transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
  box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
}

.wrapper::before,
.wrapper::after {
  content: "";
  opacity: 0;
  width: 100%;
  transition: all 0.75s;
  position: absolute;
  left: 0;
  border-radius: 8px;
}

.wrapper::before {
  top: 0;
  height: 100%;
  background-image: linear-gradient(
          to top,
          transparent 46%,
          rgba(12, 13, 19, 0.5) 68%,
          rgba(12, 13, 19) 97%
  );
}

.wrapper::after {
  bottom: 0;
  opacity: 1;
  background-image: linear-gradient(
          to bottom,
          transparent 46%,
          rgba(12, 13, 19, 0.5) 68%,
          rgba(12, 13, 19) 97%
  );
}

.card:hover .wrapper::before,
.wrapper::after {
  opacity: 1;
}

.card:hover .wrapper::after {
  height: 120px;
}

.card:hover .character {
  opacity: 1;
  transform: translate3d(0%, -130%, 100px);
}


</style>