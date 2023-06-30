<template>
  <div class="paginationStyle">
    <el-pagination
        v-model:current-page="currentPage1"
        :page-size="100"
        :small="small"
        :disabled="disabled"
        :background="true"
        layout="total, prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup name="pagination">
interface pageableItf {
  pageNum: number
  pageSize: number
  total: number
}

interface paginationProps {
  pageable: pageableItf
  handleSizeChange: (size:number) => void
  handleCurrentChange: (currentPage: number) => void
}
defineProps<paginationProps>()
</script>

<style lang="scss" scoped>
.paginationStyle {
  display: flex;
  justify-content: flex-end;
}
</style>