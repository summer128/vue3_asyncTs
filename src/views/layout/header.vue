<template>
  <el-icon color="#606266" size="20" class="skinIcon" @click="handelChangeSkin"><MagicStick /></el-icon>
  <el-dropdown>
    <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="a">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- 切换主题 -->
  <el-drawer
      v-model="datas.skinDrawer"
      title="布局设置"
      :direction="direction"
  >

    <el-form :inline="true">
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <el-form-item label="暗黑模式">
        <el-switch v-model="isDarkThem" class="mb-2" active-text="黑夜" inactive-text="白天" @change="handleChangeDark" />
      </el-form-item>
      <el-divider>
        <el-icon><Setting /></el-icon>
        界面设置
      </el-divider>
      <el-form-item label="面包屑">
        <el-switch v-model="store.isShowBread" class="mb-2" @change="handleChangeBread" />
      </el-form-item>
    </el-form>

  </el-drawer>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
const direction = ref('rtl')
import { useThem } from '@/hooks/changeColor'
import { useStore } from '@/store/index'

const store = useStore()

const { isDarkThem, changeThem } = useThem();
const datas = reactive({
  skinDrawer: false,
  darkSwitch: false
})
const handelChangeSkin = () => {
  console.log('切换主题')
  datas.skinDrawer = true
}

const handleChangeDark = (val:any) => {
  isDarkThem.value = val
  changeThem()
}
const handleChangeBread = (val:any) =>{
  store.isShowBread = val
}
</script>

<style lang="scss" scoped>
</style>
