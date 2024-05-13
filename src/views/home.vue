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
import {login, type LoginUser,} from "@/apis/api/login";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()

const form = ref({
  username: null,
  password: null,
})

const  loginClick = () => {
  if (0 == 0) {
    router.replace('/navigation')
    return
  }
  if (form.value.username && form.value.password) {
    let loginUser: LoginUser = {
      username: form.value.username,
      password: form.value.password,
    };
    login(loginUser).then(res => {
      if (res.code === 200) {
        localStorage.setItem('token', res.data.token);
        // router.push("navigation")
      } else {
        ElMessage.error(res.msg);
      }
    }).catch(err => {
      ElMessage.error(err.msg)
    });
  }
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
