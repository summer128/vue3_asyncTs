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
        <el-menu-item v-for="chItem of item.children"  :key="chItem.path" :index="chItem.path" v-show="chItem.isHidden">{{chItem.name}}</el-menu-item>
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
import { useMenu } from "@/store/index";

const router = useRouter()
console.log(router.getRoutes(), '动态路由')

// 获pinia数据
const mainStore = useMenu();

const datas = reactive({
  menus: [] as any[],
  toPage: {}
})

// 获取动态路由sider数据
const localMenu = JSON.parse(localStorage.getItem('userInfo') || "{}").roleMenus
// filter 是根据true/false 来判断，返回最后为true的数据
var r = localMenu.filter(function (x:any) {
  return x.name && x.isHidden;
});
datas.menus = r

console.log(router.currentRoute.value, datas.menus, 'router')

// 添加标签栏
const changeSidebar = (index:string) => {
  console.log(router.getRoutes(), '添加页签', index)
  const allRoutes = router.getRoutes()
  const currentRoute = allRoutes.filter(x => {
    if (x.children.length > 0) {
    for (let i = 0; i< x.children.length; i++) {
        if (x.children[i].path === index) {
          console.log( x.children[i], 'toPage')
          datas.toPage = x.children[i]
        }
      }
    }
    return datas.toPage
    // return x.path === index
  })
  console.log(datas.toPage, currentRoute, '当前的路由--添加的页签')
  mainStore.addTagsData(datas.toPage);
};

</script>

<style scoped>
</style>
