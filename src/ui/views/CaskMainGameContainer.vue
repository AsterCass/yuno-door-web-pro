<template>
  <div class="row q-mx-xl q-mb-xl justify-center">

    <div class="col-12 row justify-center">
      <h2>
        {{ $t('main-nav-game') }}
      </h2>
    </div>

    <div class="col-12 text-center q-px-md" style="margin-bottom: 2rem; opacity: .5;max-width: 52rem">
      {{ $t('subtitle-5') }}
    </div>

    <div class="col-12 row">

      <div v-for="(game, index) in gameList" :key="index" class="col-12 col-lg-6 q-mb-lg">
        <div class="q-mx-lg q-pa-sm justify-between">
          <div style="width: 90%; margin: 0 5%">

            <div style="width: 100%;" class="cursor-pointer" @click="openLink(game.address)"
                 @mouseenter="game.enterMethod" @mouseleave="game.leaveMethod">
              <q-img v-show="game.static" :no-native-menu="false" :ratio="16/9" fit="cover" class="shadow-2"
                     :src="`/img/${game.name}.png`" style="height: 15rem;border-radius: 8px;">
              </q-img>
              <q-img v-show="!game.static" :no-native-menu="false" :ratio="16/9" fit="cover" class="shadow-2"
                     :src="`/img/${game.name}.gif`" style="height: 15rem;border-radius: 8px;">
              </q-img>
            </div>


            <div class=" row q-mx-md justify-between items-center">
              <h3>
                {{ $t(game.label) }}
              </h3>
              <q-btn no-caps unelevated class="component-none-btn-std" @click="openLink(game.address)">
                <div class="row items-center">
                  <div class="q-mr-sm">
                    {{ $t('route-game') }}
                  </div>
                  <q-icon name="fa-solid fa-align-right" size="15px"/>
                </div>
              </q-btn>
            </div>


            <div class=" q-mb-lg q-mx-md text-center">
              {{ $t(game.label + "_desc") }}
            </div>

          </div>
        </div>
      </div>


    </div>


  </div>
</template>

<script setup>

import {ref} from "vue";
import {debounce} from "quasar";
import {openLink} from "@/utils/base-tools";

//debounce 防抖动
const gameList = ref(
    [
      {
        name: "mikutap",
        label: "main_tools_game_miku",
        static: true,
        enterMethod: debounce(() => {
          imageGifSwitch("mikutap", true)
        }, 200),
        leaveMethod: debounce(() => {
          imageGifSwitch("mikutap", false)
        }, 500),
        address: "https://aidn.jp/mikutap/",
      },
      {
        name: "hextris",
        label: "main_tools_game_hex",
        static: true,
        enterMethod: debounce(() => {
          imageGifSwitch("hextris", true)
        }, 200),
        leaveMethod: debounce(() => {
          imageGifSwitch("hextris", false)
        }, 500),
        address: "https://game.astercasc.com/G-Hextris/",
      },
    ]
)

const imageGifSwitch = (code = "", switchGif = true) => {
  for (let game of gameList.value) {
    if (game.name === code) {
      game.static = !switchGif
    }
  }
}


</script>

<style scoped lang="scss">

</style>