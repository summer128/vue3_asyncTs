<template>
  <el-card shadow="always">
    <el-form :inline="true" :model="data.formInline" class="demo-form-inline">
      <el-form-item label="Approved by">
        <el-input v-model="data.formInline.user" placeholder="Approved by" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="author" label="作者" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="subTitle" label="副标题" width="180" />
      <el-table-column prop="date" label="日期" />
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import {reactive, onMounted} from 'vue'
import {articlelist} from '@/http/api.ts'

onMounted(() => {
  getTableData()
})
const data = reactive({
  formInline: {
    user: ''
  },

})
let tableData = []

interface tableParam {
  num:number,
  count:number
}

const getTableData = async () => {
  const data: tableParam = {
    num: 0,
    count: 10
  }

  let respone = await articlelist(data)
  console.log(respone.data.errCode,'1234560----')
  if (respone.data.errCode == 0) {
    tableData = respone.data.data.arr
    console.log(tableData,'123456')
  }
  // articlelist(data).then(res => {
  //   console.log(res, res.data.data.arr, 'table数据列表')
  //   if (res.data.errCode === 0) {
  //     data.tableData = res.data.data.arr
  //   }
  // })
}

</script>

<style lang="scss" scoped>

</style>