<script lang="ts" setup>
// sidebarItem 项组件
import SideBarItem from './sidebar/sidebarItem.vue';
import {useRouter} from 'vue-router';


// 拿到路由列表，过滤我们不想要的
const router = useRouter();
const routerList = router.getRoutes().filter((v) => v.meta && v.meta.isShow);


console.log("router",router.getRoutes())

</script>

<template>
  <div class="sidebar">
  <div class="sidebar_box">
    <!-- 项目名称及logo -->
    <div class="sidebar-logo flex-center">
<!--      <svg-icon icon-class="logo"/>-->
      <span>HuYan 插件管理</span>
    </div>

    <!-- 导航菜单 -->
    <el-menu
        :default-active="$route.path"
        :unique-opened="true"
        class="el-menu-vertical-demo"
        active-text-color="#fff"
        background-color="#001529"
        router
        text-color="#999">

      <!-- 引入子组件 -->
      <SideBarItem :routerList="routerList"/>
    </el-menu>
  </div>
<div>
  <router-view></router-view>
</div>
    <!-- active-text-color：当前菜单项被选中时，字体的颜色 -->
    <!-- background-color：这个menu菜单的背景色 -->
    <!-- default-active：	当前激活菜单的 index -->
    <!-- text-color：菜单项字体颜色 -->
    <!-- unique-opened：unique-opened	是否只保持一个子菜单的展开 -->
    <!-- router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->

  </div>
</template>
<style lang="scss" scoped>
.sidebar{
  display: flex;
  justify-content: space-between;
}
.sidebar_box{
  width: 10%;
}
//.sidebar {
//  width: 10%;
//  height: 100%;
//
//  .sidebar-logo {
//    height: 48px;
//    background-color: #002140;
//    color: #fff;
//    font-weight: 700;
//    line-height: 48px;
//    text-align: center;
//    font-size: 20px;
//  }
//
//  .el-menu {
//    height: calc(100% - 48px);
//    border-right: 0;
//    overflow: auto;
//  }
//}
</style>

