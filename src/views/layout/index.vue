<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside style="background-color: #545c64">
      <sider></sider>
    </el-aside>
    <el-container>
      <el-header style="font-size: 12px;display: flex;align-items: center;justify-content: flex-end;">
        <headers></headers>
      </el-header>
      <el-main>
        <pageTags v-if="store.isShowBread"></pageTags>
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
import pageTags from './pageTag'
import {useStore} from '@/store/index'
const store = useStore()
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
  /*background-color: #B3C0D1;*/
  border-bottom: 1px solid #f1f1f1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  max-width: 200px;
  color: #333;
}

.skinIcon {
  margin-right: 10px;
}
</style>
