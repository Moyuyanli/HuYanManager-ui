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


<style scoped>
.home {
  width: 100%;
  height: 100vh;
  background: rgba(75, 203, 232, 0.71);
}
</style>
