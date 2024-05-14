<script lang="ts" setup>
// sidebarItem 项组件
import SideBarItem from './sidebar/sidebarItem.vue';
import topBar from './topBar/index.vue';
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
        <div class="title">
          <!--      <svg-icon icon-class="logo"/>-->
          <icon icon="House"></icon>
          <span>HuYan 插件管理</span>
        </div>

        <!-- 导航菜单 -->
        <el-menu
            :default-active="$route.path"
            :unique-opened="true"
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
      <div class="top_bar">
        <topBar></topBar>
      </div>
      <!-- 内容 -->
      <el-scrollbar class="content" view-class="scrollbar">
        <router-view class="view"></router-view>
      </el-scrollbar>
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
  background: $bg-grey-color;
  //background: url("https://data.chahuyun.cn/file/bg-4.jpg") no-repeat center center;
  //background-size: cover;
}

.sidebar {
  width: 9.5%;
  height: 100vh;
  background: $bg-color;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.3);
}


.subject {
  width: 90%;
  height: 100vh;
}

.top_bar {
  width: 99.5%;
  height: 8%;
  background-color: $bg-color;
  border-radius: 0 0 10px 10px;
  margin: auto;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.3);
}

.title {
  height: 8vh;
  text-align: center;
  line-height: 8vh;
  background-color: $title-bg-color;
  color: $title-lord-color;
  margin-bottom: 3px;
}

.content {
  width: 99.5%;
  height: 90%;
  overflow-y: auto;
  margin: 10px auto 0;
  border-radius: 10px 0 0 10px;
  background: linear-gradient($bg-transparent-color, $bg-transparent-color), url("https://data.chahuyun.cn/file/bg-4.jpg") no-repeat center center;
  background-size: cover;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.3);

  .view {
    padding: 5px 0 0 5px;
  }
}

:deep(.el-scrollbar__thumb) {
  background-color: $scroll-block-color !important;
}


</style>

