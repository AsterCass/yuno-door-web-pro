<template>
  <div class="row q-mx-xl q-mb-xl justify-center">

    <div class="col-12 row justify-center">
      <h2>
        Technical Articles
      </h2>
    </div>

    <div class="col-12 text-center q-mb-lg" style="opacity: .5;max-width: 60rem">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro.
      Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
    </div>

    <div class="col-12 row">

      <div v-for="val in [1, 2, 3]" :key="val" class="col-12 col-lg-4 q-mb-lg">
        <div class="q-mx-lg q-pa-sm justify-between"
             style="border-radius: 8px; background-color: rgb(var(--full-container-background-color-light))">

          <div style="width: 100%;">
            <q-img :no-native-menu="false" :ratio="16/9" fit="cover"
                   :src="`/img/main-article-${val%3}.jpg`" style="height: 10rem;border-radius: 8px;">
            </q-img>
          </div>

          <div class=" row q-mx-md">
            <h3>
              Article Title
            </h3>
          </div>


          <div class=" q-mb-lg q-mx-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
            porro.
            Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
          </div>


          <div class="row q-mx-lg q-mb-md  justify-end">
            View More
          </div>


        </div>
      </div>


    </div>


    <div class="col-12 row justify-center">
      <q-btn no-caps unelevated class="shadow-2 component-full-btn-std">
        <div class="row items-center">
          <div class="q-mx-xs">
            Explore
          </div>
        </div>
      </q-btn>
    </div>


  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

</style>