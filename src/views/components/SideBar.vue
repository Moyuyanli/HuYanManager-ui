<template>
  <el-menu
      :show="localShow"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapsed"
  >
    <sidebar-item :routes="routes" :collapsed="isCollapsed"></sidebar-item>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import SidebarItem from './SidebarItem.vue';

const localShow  = ref(false)

const route = useRoute();
const isCollapsed = ref(false); // 控制侧边栏折叠状态
const routes = computed(() => route.matched);



</script>


<style scoped>

</style>
