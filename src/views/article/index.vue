<template>
  <el-card shadow="always">
    <el-form :inline="true" :model="datas.formInline" class="demo-form-inline">
      <el-form-item label="Approved by">
        <el-input v-model="datas.sAuthor" placeholder="Approved by" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-card shadow="always" style="margin-bottom: 10px">
      <el-button type="primary" @click="onAdd">添加文章</el-button>
    </el-card>
    <!-- 表格 -->
    <el-table :data="datas.tableData" border style="width: 100%">
      <el-table-column prop="author" label="作者" width="180" />
      <el-table-column prop="title" label="标题" width="180">
        <template #default="{row}">
          <template v-if="row.edit">
            <el-input
                v-model="row.title"
                class="edit-input"
                size="small"
            />
            <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="subTitle" label="副标题" width="180" />
      <el-table-column prop="date" label="日期" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="{row}">
          <el-button link type="primary" size="small" @click="handleUpdate(row)"
          >编辑</el-button
          >
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
<!--  添加文章-->
  <el-drawer
      v-model="datas.addDrawer"
      title="添加文章"
      :direction="direction"
      :before-close="handleClose"
  >
    <addArticle></addArticle>
  </el-drawer>
</template>

<script lang="ts" setup>
import addArticle from './addArticle'
import {ref,reactive, onMounted} from 'vue'
import {articlelist} from '@/http/api.ts'

onMounted(() => {
  getTableData()
})
const direction = ref('rtl')
const datas = reactive({
  addDrawer: false,
  sAuthor: '',
  formInline: {
    user: '',
    title: '',
    subTitle: '',
    edit: false
  },
  tableData: []
})
// 搜索
const handleSearch = () => {
  const newResult = datas.tableData.filter((x: any) => {
    return datas.sAuthor == x.author ? true : false
  })
  datas.tableData = newResult
}
// 编辑文章
const handleUpdate = (val:any) => {
  val.edit = true
}
const cancelEdit = (val:any) => {
  val.edit = false
}

// 添加文章
const onAdd = () => {
  console.log('添加数据')
  datas.addDrawer = true
}
const handleClose = () => {
  console.log('关闭新增框')
  datas.addDrawer = false
}

// 获取数据列表
const getTableData = async () => {
  const data = {
    num: 0,
    count: 10
  }
  let respone = await articlelist(data)
  if (respone.data.errCode == 0) {
    datas.tableData = respone.data.data.arr
    console.log(datas.tableData,'123456')
  }
}

</script>

<style lang="scss" scoped>

</style>
