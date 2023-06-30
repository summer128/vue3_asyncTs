<template>
  <el-card class="searchCard" shadow="always">
    <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef">
      <el-row :gutter="20">
        <template v-for="(item, index) in datas.newSearchList" :key="item.prop">
          <el-col :span="8" v-if="item?.search" :style="{display: datas.isHideSearch && index >= 6 ? 'none': 'block'}">
            <el-form-item :label="item.label">
              <component
                  v-if="item?.search?.el"
                  :is="`el-${item.search.el}`"
                  v-model="props.searchParam[item.prop]"
                  :placeholder="placeholderTxt(item)"
                  clearable
                  :disabled="item?.search.disabled"
                  :type="item?.search?.props?.type"
                  :value-format="item?.search?.props?.valueFormat"
              >
                <template v-if="item?.search?.el === 'select'" #default>
                  <el-option
                      v-for="op in item?.search?.options"
                      :key="op.value"
                      :value="op.key"
                      :label="op.value"
                  />
                </template>
              </component>
            </el-form-item>
          </el-col>
        </template>
<!--        <el-form-item style="display: flex;justify-content: right">-->
<!--          -->
<!--        </el-form-item>-->
      </el-row>
    </el-form>
    <div class="serchSiderBtn">
      <el-button type="primary" @click="props.searchFn">搜索</el-button>
      <el-button @click="props.resetFn(ruleFormRef)">重置</el-button>
      <el-button type="primary" link class="search-isOpen" @click="isShow" v-if="datas.newSearchList.length <= 6 ? false : true">{{datas.isHideSearch ? '展开' : '折叠'}}</el-button>
    </div>
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
  datas.newSearchList = List
  console.log(List, '9999',datas.newSearchList.length)
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

<style lang="scss" scoped>
.searchCard {
  overflow: hidden;
  .demo-form-inline {
    width: 94%;
    float: left;
  }
  .serchSiderBtn {
    width: 6%;
    float: right;
    button {
      margin-bottom: 10px;
      margin-left: 0 !important;
    }
  }
}

</style>
