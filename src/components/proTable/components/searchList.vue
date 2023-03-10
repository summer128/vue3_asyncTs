<template>
  <el-card shadow="always">
    <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef">
      <el-row :gutter="20">
        <template v-for="(item, index) in datas.newSearchList" :key="item.prop">
          <el-col :span="8" v-if="item?.search" :style="{display: datas.isHideSearch && index >= 5 ? 'none': 'block'}">
            <el-form-item :label="item.label">
              <component
                  v-if="item?.search?.el"
                  :is="`el-${item.search.el}`"
                  v-model="props.searchParam[item.prop]"
                  :placeholder="placeholderTxt(item)"
                  clearable
                  :disabled="item?.search.disabled"
              >
                <template v-if="item?.search?.el === 'select'" #default>
                  <el-option
                      v-for="op in item.option"
                      :key="op[item.optionLabel || 'label']"
                      :value="op[item.optionValue || 'value']"
                      :label="op[item.optionLabel || 'label']"
                  />
                </template>
              </component>
            </el-form-item>
          </el-col>
        </template>
        <el-form-item>
          <el-button type="primary" @click="props.searchFn">搜索</el-button>
          <el-button @click="props.resetFn(ruleFormRef)">重置</el-button>
          <el-button type="primary" link class="search-isOpen" @click="isShow">{{datas.isHideSearch ? '展开' : '折叠'}}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import {onMounted, ref,reactive} from 'vue'
import {ColumnProps} from '@/components/proTable/components/index'
import {handleProp} from '@/utils/util'

/* 定义数据 */
let datas = reactive({
  newSearchList: [],
  isHideSearch: true // 默认隐藏
})

onMounted(() => {
  const List = props.columns.filter(x => x?.search)
  console.log(List, '9999')
  datas.newSearchList = List
})


/*接收父组件的参数*/
interface propsType {
  columns: ColumnProps[]
  searchParam: object,
  searchFn: (params: any) => void
  resetFn: (params: any) => void
}

// const props = defineProps<propsType>({
//   columns: {
//     type:Array, // 参数类型
//     required: true, //是否必传
//   },
//   searchParam: Object, //undefined
//   searchFn: () => {}
// })

const props = withDefaults(defineProps<propsType>(), {
  columns: () => [],
  searchParam: () => ({})
})

/* 函数 --- 事件 */

// 输入框提示文字
console.log(props, '接收的数据')
const placeholderTxt = (column: ColumnProps) => {
  return column?.search?.el === 'input' ? '请输入..' : '请选择'
}

const isShow = () => {
  datas.isHideSearch = !datas.isHideSearch
}

</script>

<style scoped>

</style>
