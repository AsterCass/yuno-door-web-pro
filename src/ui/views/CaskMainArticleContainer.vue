<template>
  <div class="row q-mx-xl q-mb-xl justify-center">

    <div class="col-12 row justify-center">
      <h2>
        {{ $t('main-nav-article') }}
      </h2>
    </div>

    <div class="col-12 text-center q-px-md" style="margin-bottom: 2rem; opacity: .5;max-width: 52rem">
      {{ $t('subtitle-1') }}
    </div>

    <div class="col-12 row">

      <div v-for="val in [0, 1, 2,]" :key="val" class="col-12 col-lg-4 q-mb-lg">
        <div class="q-mx-lg q-pa-sm justify-between"
             style="border-radius: 8px; background-color: rgb(var(--full-container-background-color-light))">

          <div style="width: 100%;">
            <q-img :no-native-menu="false" :ratio="16/9" fit="cover"
                   :src="`/img/main-article-${val%4}.jpg`" style="height: 15rem;border-radius: 8px;">
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

          <div class="row q-mx-md q-mb-md  justify-between items-center">

            <div style="opacity: .5; margin-top: 3px">
              1970-01-01 12:00
            </div>

            <q-btn no-caps unelevated class="component-none-btn-std">
              <div class="row items-center">
                <div class="q-mr-sm">
                  {{ $t('route-more') }}
                </div>
                <q-icon name="fa-solid fa-align-right" size="15px"/>
              </div>
            </q-btn>
          </div>

        </div>
      </div>


    </div>


    <div class="col-12 row justify-center">
      <q-btn no-caps unelevated class="shadow-2 component-full-btn-std" to="/article/list">
        <div class="row items-center">
          <div class="q-mx-xs">
            {{ $t('route-more-list') }}
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