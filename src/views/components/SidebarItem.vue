<template>
  <template v-for="route in routes" :key="route.path">
    <el-sub-menu v-if="route.children && route.children.length > 0" :index="route.path">
      <template #title>
        <el-icon><component :is="route.meta || 'Menu'"/></el-icon>
        <span>{{ route.name }}</span>
      </template>
      <sidebar-item :routes="route.children" :collapsed="collapsed"></sidebar-item>
    </el-sub-menu>
    <el-menu-item v-else :index="route.path">
      <el-icon><component :is="route.meta || 'Menu'"/></el-icon>
      <span>{{ route.meta }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import {type RouteRecordRaw} from 'vue-router';

interface Props {
  routes: RouteRecordRaw[];
  collapsed: boolean;
}

const props = defineProps<Props>();


console.log(props.routes)
</script>


<style scoped>

</style>
