<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside style="background-color: #545c64">
      <sider></sider>
    </el-aside>
    <el-container>
      <el-header style="height:50px;line-height:50px;font-size: 12px;padding: 0 0">
        <headers></headers>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import {reactive} from "vue"
import sider from './sider.vue'
import headers from './header.vue'

import {useMenu} from '@/store/index'
const store = useMenu()
const data = reactive({
  item: {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  tableData: [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
  ]
})
</script>

<style>
.el-header {
  width: 100%;
  background-color: #18bc9c;
  border-bottom: 1px solid #f1f1f1;
  color: #333;
  line-height: 60px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.el-aside {
  width: auto !important;
  color: #333;
}

.skinIcon {
  margin-right: 10px;
}
</style>
