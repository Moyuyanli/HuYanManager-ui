<script lang="ts" setup>
import {type RouteRecordRaw} from 'vue-router';
import Icon from "@/components/icons/icon.vue";
// 做类型限制，解决ts类型报错
type CustomRouteRecordRaw = RouteRecordRaw & {
  meta: {
    isShow?: boolean;
    title?: string;
    icon?: string;
  };
};

const props = defineProps({
  // 拿到父组件传递过来的路由列表进行渲染
  routerList: {
    type: Array as () => CustomRouteRecordRaw[],
    required: true
  }
});
</script>

<template>
  <template v-for="item in props.routerList" :key="item.path">
    <!-- 当该菜单项有子菜单时 -->
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
      <template v-if="item.meta.icon" #title>
        <!-- 菜单项图标，我此处用的是全局封装的 svg组件 -->
        <el-icon>
          <icon :icon="item.meta.icon"></icon>
        </el-icon>
        <!-- 菜单项名称，在路由中定义好 -->
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 若路由中未定义菜单项icon，则仅展示名称--（我的仅一级菜单有图标） -->
      <template v-else #title>{{ item.meta.title }}</template>

      <!-- 递归遍历-自己调用自己（核心代码） -->
      <sidebarItem :routerList="( item.children as CustomRouteRecordRaw[])"/>
    </el-sub-menu>

    <!-- 当前菜单项无子菜单 -->
    <el-menu-item v-else :index="item.path">
      <!-- 与上面注释大致相同，不多做额外注释 -->
      <template v-if="item.meta.icon">
        <el-icon>
          <icon :icon="item.meta.icon"></icon>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-else>
        {{ item.meta.title }}
      </template>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/theme.scss' as *;

.is-active {
  background: $bg-light-color;
  color: $text-color;
  font-weight: 500;
}

.el-menu-item {
  &:hover {
    background: $bg-hover-color;
    color: $text-color;
  }
}

.el-menu--collapse {
  .el-menu-item {
    justify-content: center;
  }
}

// 下列代码是用于兼容horizontal所写，酌情删或留
//.el-menu--horizontal {
//  .el-menu-item.is-active {
//    background-color: transparent !important;
//border-bottom: 2px solid #409eff !important;
//
//    .el-icon,
//    span {
//color: #409eff !important;
//    }
//  }
//
//  .el-sub-menu.is-active {
//    .el-sub-menu__title {
//      border: 0 !important;
//    }
//
//    .el-icon,
//    span {
//color: #409eff !important;
//    }
//  }
//}
</style>


