<template>

  <q-layout view="hhh lpr fff">

    <q-page-container>

      <div class="q-my-xl q-mr-md">

        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <div :key="route.name">
              <component :is="Component"></component>
            </div>
          </transition>
        </router-view>

      </div>

    </q-page-container>

  </q-layout>


</template>

<script setup>

</script>

<style scoped lang="scss">

.fade-enter-from {
  opacity: 0;
  transform: scale(.95);
}

.fade-enter-active {
  transition: all .5s ease;
}

.fade-leave-active {
  transition: all .5s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: scale(.95);
}

</style>