<template>
  <div class="home">
    <el-form :model="form" class="login" label-width="auto" style="max-width: 600px">
      <el-form-item class="userId" label="用户">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item class="password" label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" @click="loginClick">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {login, type LoginUser, type UserInfo,} from "@/apis/api/login";
import {ElLoading, ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {getToken} from "@/utils/auth";
import {handleLoginSuccess} from "@/router";


/**
 * 全屏loading
 */
const fullscreenLoading = ref(false)

const router = useRouter()

const form = ref({
  username: null,
  password: null,
})

const loginClick = () => {
  if (0 == 0) {
    localStorage.setItem('token', "abc123456");
    let user: UserInfo = {
      id: 572490972,
      username: "放空",
      url: "https://data.chahuyun.cn/file/bg-3.png",
      startTime: new Date(),
    }
    localStorage.setItem('userInfo', JSON.stringify(user));
    toHome()
    return;
  }
  if (getToken()) {
    ElMessage.success("你已登录，请勿重复登录!")
    toHome()
    return;
  }
  if (form.value.username && form.value.password) {
    let loginUser: LoginUser = {
      username: form.value.username,
      password: form.value.password,
    };
    login(loginUser).then(res => {
      if (res.code === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        toHome()
      } else {
        ElMessage.error(res.msg);
      }
    }).catch(err => {
      ElMessage.error(err.msg)
    });
  }
}

const toHome = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  handleLoginSuccess().then(() => {
    setTimeout(() => {
      loading.close()
      router.replace('/home')
    }, 2000)
  })


}

</script>


<style scoped>
.home {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直 */
  width: 100%;
  height: 100vh;
  background: url("https://data.chahuyun.cn/file/bg-1.png") no-repeat center center;
  background-size: cover;
}

.login {
  width: 400px;
  height: 250px;
  background: rgba(255, 255, 255, 0.72);
  border-radius: 30px;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.3);
}

.userId {
  margin: 50px auto 0;
  width: 65%;
}

.password {
  margin: 30px auto 0;
  width: 65%;
}

.login-button {
  width: 80px;
  height: 30px;
  margin: 30px auto 0;
}
</style>
