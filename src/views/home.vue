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
        <button class="login-button" @click="login">登录</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const form = ref({
  username: null,
  password: null,
})

const login = () => {
  http.get()
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