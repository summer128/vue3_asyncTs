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
        <el-form-item label="角色" prop="password">
          <el-select v-model="data.ruleForm.roleId" placeholder="请选择角色" @change="handleSelectRoles">
            <el-option
                v-for="item in options.rolesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
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
import { getRoleMenus, loginApi } from "@/http/api";
import {useRouter} from 'vue-router'
import { reactive } from 'vue'

import pinia from '../../store/store'
// @ts-ignore
import { useMenu } from "../../store/index"
const store = useMenu(pinia)  // 这里一定要把 pinia传入进去
// 接受ts定义的类型
const data = reactive(new LoginData())
const router = useRouter()

/*
  定义数据
 */

const options = reactive({
  rolesOptions: [
    {
      value: 10,
      label: '超级管理员'
    },
    {
      value: 11,
      label: '管理员'
    },
    {
      value: 12,
      label: '普通用户'
    },
    {
      value: 13,
      label: '兼职'
    },
  ]
})

/*
  登陆接口
 */
const handleLogin = () => {
  localStorage.clear()
  const {ruleForm} = data
  loginApi(ruleForm).then((res) => {
    console.log(res.data, "登录信息::::",);
    if (res.data.status === 0) {
      localStorage.setItem("Authorization", res.data["token"]);
      const authors = localStorage.getItem('Authorization')
      if (authors) {
        // 获取到token，通过选择的角色权限，获取菜单列表
        getRoleMenus({roleId: res.data.roleId}).then(res => {
          if (res.data.status !== 1) {
            localStorage.setItem('userInfo', JSON.stringify(res.data.data))
            /* Reflect.get(属性名，属性值key) 为了解决 返回的数据 为Proxy(Object)类型，取不到值 的问题 */
            store.$state.staticRouter = Reflect.get(res.data.data, 'roleMenus')
            console.log(store.$state.staticRouter, store.$state.staticRouter.length, '000')
            if (store.$state.staticRouter.length > 0) {
              store.$state.hasMenus = true
              localStorage.setItem('hasMenus', 'true')
              router.push("/");
            }
            console.log(store.$state, '获取动态的路由')
          }
        })
      }
    }
  });
};
const handleRegister = () => {
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
