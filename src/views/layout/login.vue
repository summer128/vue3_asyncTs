<template>
  <div class="loginContainer">
    <div class="loginLeft">
      <el-image class="loginImg" src="/images/loginRight.jpg"></el-image>
    </div>
    <div class="loginRight">
      <el-form
          ref="ruleFormRef"
          status-icon
          :model="data"
          label-width="60px"
          class="loginForm"
          size="large"
      >
        <p>{{ systitle }}</p>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="data.ruleForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
              v-model="data.ruleForm.password"
              type="password"
              autocomplete="off"
          />
        </el-form-item>
        <div
            style="
            color: firebrick;
            font-size: 12px;
            cursor: pointer;
            text-align: left;
            margin-left: 60px;
            margin-top: -20px;
            margin-bottom: 16px;
          "
            @click="handleRegister"
        >
          去注册
        </div>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" style="width: 100%"
          >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import {LoginData} from "@/types/loginTypes";
import {loginApi} from "@/http/api";
import {useRouter} from 'vue-router'
import { reactive } from 'vue'
// 接受ts定义的类型
const data = reactive(new LoginData())
const router = useRouter()
const handleLogin = () => {
  const {ruleForm} = data
  console.log(data,'数据', ruleForm)
  loginApi(ruleForm).then((res) => {
    console.log(res.data, "登录信息");
    if (res.data.errCode === 0) {
      // 存储userMsg
      localStorage.setItem("userMsg", JSON.stringify(res.data.data));
      localStorage.setItem("token", JSON.stringify(res.data.data["cms-token"]));
      if (res.data.data["cms-token"]) {
        router.push("/");
      }
      ElMessage({
        message: res.data.message,
        type: "success",
      });
    } else {
      ElMessage.error(res.data.message);
    }
  });
};
const handleRegister = () => {
  console.log('去注册！', router)
  router.push({path: 'register'});
};
</script>
<style lang="scss" scoped>
.loginContainer {
  width: 100%;
  height: 100vh;
  background: #f2f3f5;
  display: flex;
  .loginLeft {
    flex-grow: 1;
    position: relative;
    .loginImg {
      width: 70%;
      border-radius: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .loginRight {
    flex-grow: 2;
    position: relative;
    .loginForm {
      width: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      p {
        font-size: 24px;
        font-weight: bolder;
        text-align: center;
        padding: 16px;
      }
    }
  }
}
</style>
