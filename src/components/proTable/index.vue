<template>
  <!-- 查询条件 -->
  <SearchForm class="searchForm" :columns="props.columns" :searchParam="searchParam" :searchFn="searchFn" :resetFn="resetFn"></SearchForm>

  <el-card class="box-card">
    <!-- 操作按钮 -->
    <div class="oprateBtn">
      <div class="async_oprateBtn">
        <slot name="asyncBtn"></slot>
      </div>
      <!-- 固定栏目-按钮 -->
      <div class="static_oprateBtn">
        <p @click="handleRefresh">sx</p>
        <p @click="handlePrint">dy</p>
        <p @click="handleColuSet">ls</p>
        <p @click="handleSearch">ss</p>
      </div>
    </div>

    <!-- 表格   -->
    <el-table :data="asyncTableData" border style="width: 100%;margin-bottom: 10px">
      <el-table-column
          v-for="item of data.asyncHeader"
          :prop="item.prop"
          :label="item.label"
          :width="item.width ? item.width : 120 "
      ></el-table-column>
    </el-table>
    <Pagination :pageable="pageable" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"></Pagination>
  </el-card>

</template>

<script lang="ts" setup name="proTable">
import SearchForm from './components/searchList'
import Pagination from './components/pagination'
import {onMounted, reactive} from 'vue'
import {ColumnProps} from '@/components/proTable/components/index'
import { useTable } from '@/hooks/useTable'


/*
定义数据
 */
const data = reactive({
  asyncHeader: []
})
const { asyncTableData,searchParam,searchFn,resetFn,pageable,handleSizeChange,handleCurrentChange,handleRefresh,handlePrint,handleColuSet,handleSearch } = useTable()
/*
ts-定义数据类型
 */
interface propsType {
  columns: ColumnProps[]
}

// 接收父组件的参数-- 设置默认参数
const props = withDefaults(defineProps<propsType>(), {
  columns: () => []
})

/*
生命周期
 */
onMounted(() => {
  data.asyncHeader = props.columns
  console.log(props, 'props传的clumnus',data.asyncHeader)
})

</script>

<style scoped lang="scss">
.searchForm,.oprateBtn {
  margin-bottom: 10px;
}

.oprateBtn {
  display: flex;
  justify-content: space-between;
  .static_oprateBtn {
    display: flex;
    p {
      flex-direction: column-reverse;
      padding: 4px;
      margin: 6px;
      border: 1px solid #dcdfe6;
      border-radius: 50%;
      text-align: center;
    }
  }
}
</style>
