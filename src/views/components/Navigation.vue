<template>
  <div class="app-wrapper">
    <div class="side-bar" ></div>
    <SideBar></SideBar>
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue'
import SideBar from "@/App.vue";

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>


<style scoped>
.app-wrapper {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
}
.side-bar {
  width: 20%;
  height: 100%;
  background: #1bf45e;
}



</style>
