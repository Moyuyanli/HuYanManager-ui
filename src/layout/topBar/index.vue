<template>
  <div class="topBar">
    <div class="left">
      <el-card class="card" shadow="always">
        当前mirai-console-load运行时间: {{ duration }}
      </el-card>
    </div>
    <div class="right">
      <div class="name">欢迎:{{ userInfo.username }}</div>
      <icon :size="30" icon="HomeFilled" @click="goHome"></icon>
      <icon :size="30" icon="Tools" @click="logout"></icon>
      <el-avatar :size="50" :src="userInfo.url" class="avatar" shape="square"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {type UserInfo} from "@/apis/api/login";
import {ref, toRaw} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const userInfo: UserInfo = JSON.parse(localStorage.getItem("userInfo")!)

let duration = ref('')


// 实时时间更新
setInterval(() => {
  refreshTime()
}, 1000);


const refreshTime = () => {
// 当前时间
  let nowTime = new Date();


  // 将 userInfo.startTime 转换为Date对象，这里假设它是一个正确格式化的日期字符串
  let startTime = new Date(userInfo.startTime);


  // 计算时间差，单位为秒
  let diffInMinutes = Math.floor((nowTime.getTime() - startTime.getTime()) / (1000));


  // 定义时间单位和阈值
  const units = [
    {name: '小时', threshold: 60 * 60},
    {name: '天', threshold: 24 * 60 * 60},
    {name: '月', threshold: 30 * 24 * 60 * 60}, // 简单按每月30天计算
  ];

  duration.value = `${Math.floor(diffInMinutes / 60 % 60)} 分 ${diffInMinutes % 60} 秒`

  // 计算并决定显示的单位
  for (const unit of units) {
    if (diffInMinutes >= unit.threshold) {
      const count = Math.floor(diffInMinutes / unit.threshold);
      duration.value = `${count} ${unit.name} ` + duration.value;
      break;
    }
  }
};

/**
 * 回到首页
 */
const goHome = () => {
  if (toRaw(router).currentRoute.value.path === '/home') {
    return
  }
  router.push("/home")
}

/**
 * 退出登录
 */
const logout = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  //todo 调用退出登录的后台接口
  router.replace('/login')
}


</script>


<style scoped>
.topBar {
  height: 100%;
  display: flex;
  align-items: center; /* 垂直 */
  justify-content: space-between;
}

.left {

  .card {
    max-width: 480px;
    margin-left: 8px;
    border-radius: 3px 3px 3px 10px;
  }

}

.right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 30%;

  .avatar {
    margin-right: 15px;
  }

  .custom-icon {
    margin-right: 15px;
  }

  .name {
    margin-right: 15px;
    font-size: 16px;
  }
}
</style>
