<template>
  <div class="home"> >
    <p>这是一个主页！</p>
    <el-button @click="cleanToken">清除token</el-button>
  </div>
</template>

<script lang="ts" setup>

const cleanToken = () => {
  localStorage.clear()
}


</script>


<style lang="scss" scoped>
@use "@/assets/scss/theme.scss" as *;
.home {
  width: 100%;
  height: 100vh;
  //background: $bg-color;
}
</style>
