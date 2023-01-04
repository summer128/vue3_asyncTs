<template>
  <el-button type="primary" class="addButton" @click="handleAddMenu">
    <el-icon class="no-inherit">
      <Plus />
    </el-icon>
    新增菜单
  </el-button>
  <el-table
      :data="datas.tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="path"
      border
      default-expand-all
  >
    <el-table-column prop="name" label="菜单名" sortable />
    <el-table-column prop="path" label="地址" sortable />
    <el-table-column prop="alwaysShow" label="是否隐藏" sortable />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
        >
          <el-icon class="no-inherit">
            <Edit />
          </el-icon>
        </el-button
        >
        <el-button link type="primary" size="small">
          <el-icon class="no-inherit">
            <Delete />
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 新增菜单框 -->
  <el-dialog v-model="datas.addMenuDialog" title="新增菜单" @close="handleCloseMenu">
    <el-form :model="datas.editForm">
      <el-form-item label="上级菜单">
        <el-select v-model="datas.editForm.beforeMenu" placeholder="Please select a zone">
          <template v-for="item in asyncRouter" :key="item.path">
            <el-option :label="item.name" :value="item.name" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input v-model="datas.editForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="菜单路径">
        <el-input v-model="datas.editForm.path" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="datas.editForm.isShow" />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import asyncRouter from '@/utils/asyncRoutes'
import {reactive} from 'vue'
const datas = reactive({
  tableData: [],
  addMenuDialog: false,
  editForm: {
    beforeMenu: '',
    name: '',
    path: '',
    isShow: false
  }
})
datas.tableData = asyncRouter
// 新增菜单
const handleAddMenu = () => {
  datas.addMenuDialog = true
  console.log('菜单', datas.addMenuDialog)
}

const handleCloseMenu = () => {
  datas.addMenuDialog = false
}

const handleClick = () => {

}
</script>

<style scoped>
.addButton {
  margin-bottom: 10px;
}
</style>
