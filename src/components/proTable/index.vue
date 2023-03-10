<template>
  <!-- 查询条件 -->
  <SearchForm :columns="props.columns" :searchParam="searchParam" :searchFn="searchFn" :resetFn="resetFn"></SearchForm>
  <el-card class="box-card">
    <!-- 操作按钮 -->
    <div class="oprateBtn">
      <div class="async_oprateBtn">
        <slot name="asyncBtn"></slot>
      </div>
      <!-- 固定栏目-按钮 -->
      <div class="static_oprateBtn">
        <p><i class="iconfont icon-shezhi"></i></p>
        <p><i class="iconfont icon-shezhi"></i></p>
        <p><i class="iconfont icon-shezhi"></i></p>
        <p><i class="iconfont icon-shezhi"></i></p>
      </div>
    </div>
    <!-- 表格   -->
    <el-table :data="asyncTableData" border style="width: 100%">
      <el-table-column
          v-for="item of data.asyncHeader"
          :prop="item.prop"
          :label="item.label"
          :width="item.width ? item.width : 120 "
      ></el-table-column>
    </el-table>
  </el-card>

</template>

<script lang="ts" setup name="proTable">
import SearchForm from './components/searchList'
import {onMounted, reactive} from 'vue'
import {ColumnProps} from '@/components/proTable/components/index'
import { useTable } from '@/hooks/useTable'


/*
定义数据
 */
const data = reactive({
  asyncHeader: []
})
const { asyncTableData,isHideSearch,searchParam,searchFn,resetFn } = useTable()
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
