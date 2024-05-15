<template>
  <div class="home">
    <div class="top-bar">
      <p>这是一个主页！</p>
    </div>
    <div class="middle-bar">
      <cpu></cpu>
    </div>
  </div>
</template>

<script lang="ts" setup>

import Cpu from "@/views/home/cpu.vue";

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
}
</style>
