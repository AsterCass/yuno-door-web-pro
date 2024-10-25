<template>
  <div class="q-ma-lg">

    <q-btn @click="switchTheme" color="primary" label="Switch Theme"/>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <div class="row items-center">

      <q-btn no-caps unelevated class="q-ma-md shadow-2 component-full-btn-std ">
        <div class="row items-center">
          <q-icon name="fa-solid fa-arrow-down" size=".9rem"/>
          <div class="q-mx-xs">
            Import
          </div>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md shadow-1 component-outline-btn-std">
        <div class="row items-center">
          <q-icon name="fa-solid fa-arrow-up" size=".9rem"/>
          <div class="q-mx-xs">
            Upload
          </div>
        </div>
      </q-btn>


      <q-btn no-caps unelevated class="q-ma-md shadow-1 component-outline-btn-mini">
        <div class="row items-center">
          <q-icon name="fa-solid fa-angle-left" size=".9rem"/>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md shadow-1 component-outline-btn-mini">
        <div class="row items-center">
          <q-icon name="fa-solid fa-angle-right" size=".9rem"/>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md component-none-btn-std">
        <div class="row items-center">
          <q-icon name="fa-solid fa-bell" size="1.5rem"/>
        </div>
      </q-btn>

      <q-btn no-caps unelevated class="q-ma-md component-none-btn-std" icon="fa-solid fa-wand-sparkles"/>

      <q-btn no-caps unelevated class="q-ma-md  component-none-btn-std">
        <div class="row items-center">
          <div class="q-mx-xs">
            Show more
          </div>
          <q-icon name="fa-solid fa-caret-down" size="1rem"/>
        </div>
      </q-btn>

      <q-input v-model="input" tabindex="0" dense outlined placeholder="Search"
               class="q-ma-md component-outline-input-std">
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-magnifying-glass" size=".9rem"/>
        </template>
      </q-input>

      <!--      selected class use component-outline-input-std, no selected component-outline-input-std-->


      <q-select outlined clearable class="q-ma-md component-outline-input-std"
                dropdown-icon="fa-solid fa-caret-down"
                popup-content-class="component-extra-card-std"
                clear-icon="fa-solid fa-xmark"
                menu-anchor="bottom start" :menu-offset="[0, 5]"
                v-model="selected" :options="options">
        <template v-slot:prepend>
          Go to
        </template>
      </q-select>

      <q-select outlined clearable class="q-ma-md component-outline-select-std"
                dropdown-icon="fa-solid fa-caret-down"
                popup-content-class="component-extra-card-std"
                clear-icon="fa-solid fa-xmark"
                menu-anchor="bottom start" :menu-offset="[0, 5]"
                v-model="selected" :options="options">
        <template v-slot:prepend>
          Go to
        </template>
      </q-select>

      <q-select outlined clearable multiple use-chips class="q-ma-md component-outline-input-std"
                dropdown-icon="fa-solid fa-caret-down"
                popup-content-class="component-extra-card-std"
                clear-icon="fa-solid fa-xmark"
                menu-anchor="bottom start" :menu-offset="[0, 5]"
                v-model="selectedMulti" :options="options">
        <template v-slot:prepend>
          Multiple Go to
        </template>
      </q-select>


      <div class="row">
        <div id="one"></div>
        <div id="two"></div>
      </div>


    </div>

    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>

    <div>
      This is Text
    </div>

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h1>-->
    <!--      This is h1-->
    <!--    </h1>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h2>-->
    <!--      This is h2-->
    <!--    </h2>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h3>-->
    <!--      This is h3-->
    <!--    </h3>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h4>-->
    <!--      This is h4-->
    <!--    </h4>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size="2px"/>-->

    <!--    <h5>-->
    <!--      This is h5-->
    <!--    </h5>-->

    <!--    <q-separator class="component-separator-base" spaced="2rem" size=".15rem"/>-->

    <!--    <h6>-->
    <!--      This is h6-->
    <!--    </h6>-->


  </div>

</template>

<script setup>
import {switchTheme} from "@/utils/base-tools";
import {ref} from "vue";

let input = ref("")
let selected = ref("")
let selectedMulti = ref([])
let options = ref(["Beijing", "Shanghai", "Hangzhou", "Shenzhen",])
let currentTab = ref("")

</script>

<style scoped lang="scss">


#one {
  height: 5rem;
  width: 10rem;
  border: #1D1D1D solid 2px;
  background: red;
  position: relative;
}

#two {
  height: 5rem;
  width: 10rem;
  border: #1D1D1D solid 2px;
  position: relative;
}

#one::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: white;
  animation: fillColor 3s forwards;
}

#two::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: red;
  animation: fillColor 3s forwards;
}

@keyframes fillColor {
  0% {
    width: 0; /* 从0宽度开始 */
  }
  100% {
    width: 100%; /* 填满宽度 */
  }
}
</style>