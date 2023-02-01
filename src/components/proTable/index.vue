<template>
  <SearchForm :columns="props.columns"></SearchForm>

</template>

<script lang="ts" setup>
import {ColumnProps} from '@/components/proTable/components/index'
import SearchForm from './components/searchList'

interface propsType {
  columns: ColumnProps[]
}

// 接收父组件的参数-- 设置默认参数
const props = withDefaults(defineProps<propsType>(), {
  columns: () => []
})

console.log(props, 'props传的clumnus')
</script>

<style scoped lang="scss">

</style>
