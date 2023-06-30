<template>
  <el-form
      ref="formRef"
      :model="data"
      status-icon
      :rules="data.rules"
      label-width="80px"
      class="registerForm"
  >
    <el-form-item label="username" prop="username">
      <el-input v-model.number="data.username" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
          v-model="data.password"
          type="password"
          autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
      >Submit</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {registerApi} from "@/http/api";
import { ElMessage } from "element-plus";
import {LoginData} from "@/types/loginTypes";
const data = reactive(new LoginData())
// 路由
const router = useRouter();
// 清空form
const formRef = ref();
// 注册按钮
function submitForm() {
  registerApi({ ...data }).then((res) => {
    if (res.status === 0) {
      ElMessage.success(res.message);
    }
  });
  router.push("/");
}
function resetForm() {
  formRef.value.resetFields();
}
</script>

<style lang="scss" scoped>
.registerForm {
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid grey;
}
</style>