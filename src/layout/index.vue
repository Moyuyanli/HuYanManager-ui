<script lang="ts" setup>
// sidebarItem 项组件
import SideBarItem from './sidebar/sidebarItem.vue';
import {useRouter} from 'vue-router';
import Icon from "@/components/icons/icon.vue";


// 拿到路由列表，过滤我们不想要的
const router = useRouter();
const routerList = router.getRoutes().filter((v) => v.meta && v.meta.isShow);

</script>

<template>
  <div class="navigation">
    <div class="sidebar">
      <div>
        <!-- 项目名称及logo -->
        <div class="title" >
          <!--      <svg-icon icon-class="logo"/>-->
          <icon icon="House"></icon>
          <span>HuYan 插件管理</span>
        </div>

        <!-- 导航菜单 -->
        <el-menu
            :default-active="$route.path"
            :unique-opened="true"
            class="el-menu"
            router

        >
          <!--        active-text-color="#fff"-->
          <!--        background-color="#00e676"-->
          <!--        text-color="#999"-->
          <!-- active-text-color：当前菜单项被选中时，字体的颜色 -->
          <!-- background-color：这个menu菜单的背景色 -->
          <!-- default-active：	当前激活菜单的 index -->
          <!-- text-color：菜单项字体颜色 -->
          <!-- unique-opened：unique-opened	是否只保持一个子菜单的展开 -->
          <!-- router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->

          <!-- 引入子组件 -->
          <SideBarItem :routerList="routerList"/>
        </el-menu>
      </div>
    </div>
    <div class="subject">
      <!-- 顶栏 -->
      <div class="top_bar"></div>
      <!-- 内容 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/theme.scss" as *;

.navigation {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  background: url("https://data.chahuyun.cn/file/bg-3.png") no-repeat center center;
  background-size: cover;
}

.sidebar {
  width: 9%;
  height: 98vh;
  margin-top: 5px;
  margin-left: 10px;
  border-radius: 30px;
  background: $bg-color;
}


.subject {
  width: 90%;
  height: 100vh;
}

.top_bar {
  width: 98%;
  height: 8%;
  background-color: $bg-color;
  border-radius: 30px;
  margin: 5px auto;
}

.title {
  height: 50px;
  text-align: center;
  line-height: 50px;
  //background-color: $title-bg-color;
  color: $title-lord-color
}

.content {
  width: 98%;
  height: 88%;
  overflow-y: auto;
  margin: 15px auto 0;
  border-radius: 30px;
}
</style>

