<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      :default-active="router.currentRoute.value.path"
      mode="vertical"
      :router="true"
      :collapse="mainStore.siderIsFold"
      text-color="#fff"
      @select="changeSidebar"
  >
    <template v-for="item of datas.menus" :key="item.path">
      <el-sub-menu v-if="item.children" :index="item.path">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item v-for="chItem of item.children"  :key="chItem.path" :index="chItem.path" v-show="chItem.hidden">{{chItem.name}}</el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        <el-icon><setting /></el-icon>
        <span>{{item.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
import asyncRouter from '@/utils/asyncRoutes'

const router = useRouter()
// 获pinia数据
const mainStore = useStore();
// const { siderIsFold } = storeToRefs(mainStore);

const datas = reactive({
  menus: []
})

// 获取sider数据
const localMenu = JSON.parse(localStorage.getItem('asyncMenu'))
// filter 是根据true/false 来判断，返回最后为true的数据
var r = localMenu.filter(function (x) {
  return x.name && x.hidden;
});
datas.menus = r

// 添加标签栏
const changeSidebar = (index:string) => {
  console.log(router.getRoutes(), '添加页签', index)
  const allRoutes = router.getRoutes()
  const currentRoute = allRoutes.filter(x => {
    return x.path === index
  })
  console.log(currentRoute,'1234')
  mainStore.addTagsData(currentRoute[0]);
};
</script>

<style scoped>
</style>
