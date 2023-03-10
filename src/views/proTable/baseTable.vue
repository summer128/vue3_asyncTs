<template>
<ProTable :columns="columns">
  <template #asyncBtn>
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="primary" @click="search">搜索1</el-button>
  </template>
</ProTable>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import {ColumnProps} from '@/components/proTable/components'
import ProTable from '@/components/proTable'

// 表格表头-配置项
const columns: ColumnProps[] = [
  { type: "selection", fixed: "left", width: 80 },
  { type: "index", label: "#", width: 80 },
  {
    prop: "username",
    label: "用户姓名",
    search: { el: "input",disabled: false }
  },
  {
    prop: "gender",
    label: "性别",
    search: { el: "select",disabled: false },
    fieldNames: { label: "genderLabel", value: "genderValue" }
  },
  // 多级 prop
  { prop: "user.detail.age", label: "年龄", search: { el: "input" } },
  { prop: "idCard", label: "身份证号", search: { el: "input" } },
  { prop: "email", label: "邮箱" },
  { prop: "address", label: "居住地址" },
  {
    prop: "status",
    label: "用户状态",
    fieldNames: { label: "userLabel", value: "userStatus" },
    search: {
      el: "tree-select",
      props: { props: { label: "userLabel" }, nodeKey: "userStatus" }
    }
  },
  {
    prop: "createTime",
    label: "创建时间",
    width: 120,
    search: {
      el: "date-picker",
      span: 2,
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
      defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"]
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 100 }
];
</script>

<style scoped>

</style>
