<template>
  <q-header class="top-semi-trans-header-base row justify-center items-center"
            :class="headerInTop ? 'top-semi-trans-header-base-top' : 'top-semi-trans-header-base-no-top'">
    <h5>
      this is main
    </h5>
  </q-header>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";

const headerInTop = ref(true);

const onScroll = () => {
  headerInTop.value = window.scrollY === 0;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
})


</script>

<style scoped lang="scss">

.top-semi-trans-header-base {
  background-color: transparent;
  left: 0;
  right: 0;
  margin: 1rem 4rem;
  height: 3rem;
  text-align: center;
  border-radius: 8px;
  transition: background-color 1s ease, box-shadow 1s ease;
  position: fixed
}

.top-semi-trans-header-base-top {
  color: var(--full-container-text-color);
  background-color: transparent;
}

.top-semi-trans-header-base-no-top {
  color: var(--text-color);
  background-color: var(--container-background-color);
  box-shadow: inset 0 0 1px 1px var(--background-color);
  backdrop-filter: saturate(200%) blur(30px);
}


</style>