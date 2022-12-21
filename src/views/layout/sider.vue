<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :default-active="router.currentRoute.value.path"
      mode="vertical"
      :router="true"
      text-color="#fff"
  >
    <template v-for="item of datas.menus" :key="item.path">
      <el-sub-menu v-if="item.children" :index="item.path">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          {{item.name}}
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

const router = useRouter()
console.log(router.getRoutes(), '获取所有的路由')
const datas = reactive({
  menus: []
})
const localMenu = JSON.parse(localStorage.getItem('asyncMenu'))
// filter 是根据true/false 来判断，返回最后为true的数据
var r = localMenu.filter(function (x) {
  return x.name && x.hidden;
});
datas.menus = r
</script>

<style scoped>

</style>