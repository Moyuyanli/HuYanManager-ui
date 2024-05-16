<template>
  <div class="home">
    <div class="top-bar">
      <p>这是一个主页！</p>
    </div>
    <div class="middle-bar">
      <gauge class="gauge" :value="10" title="CPU"></gauge>
      <gauge class="gauge" :value="50" title="MEMORY"></gauge>
      <gauge class="gauge" :value="10" title="DISK"></gauge>
    </div>
  </div>
</template>

<script lang="ts" setup>

import gauge from "@/views/home/gauge.vue";

const cleanToken = () => {
  localStorage.clear()
}


</script>


<style lang="scss" scoped>
@use "@/assets/scss/theme.scss" as *;

.home {
  width: 100%;
  height: 90vh;
}

.top-bar {
  width: 100%;
  height: 10vh;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 25px;
  }
}

.middle-bar {
  display: flex;
  justify-content: center;
  align-items: center;
gap: 60px;

  height: 40vh;

  .gauge {
    //margin: 0 25px 0;
  }
}
</style>
