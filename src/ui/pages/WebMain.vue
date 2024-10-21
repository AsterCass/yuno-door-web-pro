<template>

  <div class="ccc">
    this is main
  </div>

  <q-btn @click="switchTheme()">
    switch
  </q-btn>

</template>

<script setup>


function switchTheme() {
  let cur = document.documentElement.getAttribute("data-theme")
  let xx = 'dark'
  if (cur === 'dark') {
    xx = 'custom-green'
  } else if (cur === 'custom-green') {
    xx = 'light'
  }

  document.documentElement.setAttribute('data-theme', xx);
}


</script>

<style scoped lang="scss">

.ccc {
  color: var(--text-color);
  background-color: var(--background-color);
}

</style>