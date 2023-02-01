<template>
  <el-card shadow="always">
    <el-row :gutter="16">
      <el-col v-for="(item, index) in props.columns" :key="index" :span="item.layout || 6">
<!--        <slot :name="`search-${item.searchKey}`" :form-data="searchFormData">-->
          <component
              v-if="item?.search?.el"
              :is="`el-${column.search.el}`"
              v-model="searchParam[column.search.key ?? handleProp(column.prop)]"
              :placeholder="placeholderTxt(item)"
              clearable
              :disabled="item.isShow"
              :prefix-icon="item.searchType === 1 ? Search : ''"
          >
            <template v-if="item.searchType === 2 && item.option" #default>
              <el-option
                  v-for="op in item.option"
                  :key="op[item.optionLabel || 'label']"
                  :value="op[item.optionValue || 'value']"
                  :label="op[item.optionLabel || 'label']"
              />
            </template>
          </component>
<!--        </slot>-->
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import {ColumnProps} from '@/components/proTable/components/index'
import {handleProp} from '@/utils/util'
// 接收父组件的参数
interface propsType {
  columns: ColumnProps[]
  searchParam: { [key: string]: any }; // 搜索参数
}

const props = withDefaults(defineProps<propsType>(), {
  columns: () => [],
  searchParam: () => ({}),

})

// 输入框提示文字
console.log(props, '接收的数据')
const placeholderTxt = (column: ColumnProps) => {
  return column?.search?.el === 'input' ? '请输入..' : '请选择'
}

</script>

<style scoped>

</style>
