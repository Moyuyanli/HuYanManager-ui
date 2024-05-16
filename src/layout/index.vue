<script lang="ts" setup>
// sidebarItem 项组件
import SideBarItem from './sidebar/sidebarItem.vue';
import topBar from './topBar/index.vue';
import {useRouter} from 'vue-router';
import Icon from "@/components/icons/icon.vue";
import {getSysInfo, type SystemInfo} from "@/apis/api/info";
import {ElMessage} from "element-plus";
import {ref} from "vue";

// 拿到路由列表，过滤我们不想要的
const router = useRouter();
const routerList = router.getRoutes().filter((v) => v.meta && v.meta.isShow);

console.log("routers",router.getRoutes())

const systemInfo = ref<SystemInfo>({
  title: "插件管理",
  description: "管理平台",
  service_version: "v1.0.0",
  ui_version: "v1.0.0",
  plugin_version: "v1.0.0"
})

async function fetchSystemInfo() {

  // 尝试从localStorage中获取系统信息
  const cachedInfo = localStorage.getItem("sys-info");
  if (cachedInfo) {
    return JSON.parse(cachedInfo); // 解析缓存的信息
  }

  // 如果缓存中没有，再发起请求获取
  const res = await getSysInfo();
  if (res.code === 200) {
    const info = res.data;
    // 将获取到的信息存储到localStorage中，以便下次直接使用
    localStorage.setItem("sys-info", JSON.stringify(info));
    return info;
  } else {
    ElMessage.error("系统信息获取失败!")
    // 处理错误情况，可以抛出错误，或者返回默认值等
    return {
      title: "插件管理",
      description: "管理平台",
      service_version: "v1.0.0",
      ui_version: "v1.0.0",
      plugin_version: "v1.0.0"
    };
  }
}

fetchSystemInfo()

</script>

<template>
  <div class="navigation">
    <div class="sidebar">

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
      <div class="bottom-bar">
        <div>当前管理系统版本</div>
        <div class="info">插件: {{ systemInfo.plugin_version }}</div>
        <div class="info">后端: {{ systemInfo.service_version }}</div>
        <div class="info">页面: {{ systemInfo.ui_version }}</div>
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
  width: 9.8%;
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
  box-shadow: $shadow;

  .view {
    padding: 5px 0 0 5px;
  }
}

:deep(.el-scrollbar__thumb) {
  background-color: $scroll-block-color !important;
}

.bottom-bar {
  width: 7.5%;
  height: 12vh;
  position: absolute;
  bottom: 0;
  left: 1%;
  text-align: center;
  border-top: solid 1px #181818;

  .info {
    margin-left: 11px;
    text-align: left;
  }
}

</style>

