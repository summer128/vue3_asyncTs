<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>基本信息</span>
      </div>
    </template>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item v-for="item of datas.baseMsg" :key="item.label" :label="item.label">
        <template v-if="item.label == '爱好' || item.label == '标签'">
          <el-tag
              v-for="(item,index) in item.value"
              :key="item.label"
              :type="item.type"
              class="mx-1"
              effect="dark"
          >
            {{ item.label }}
          </el-tag>
        </template>
        <span v-else>{{item.value}}</span>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>其他信息</span>
      </div>
    </template>
    <el-form class="demo-form-inline">
      <el-form-item v-for="item of datas.baseMsg" :key="item.label" :label="item.label">
        <template v-if="item.label == '爱好' || item.label == '标签'">
          <el-tag
              v-for="(item,index) in item.value"
              :key="item.label"
              :type="item.type"
              class="mx-1"
              effect="dark"
          >
            {{ item.label }}
          </el-tag>
        </template>
        <span v-else>{{item.value}}</span>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import {Logger} from "sass";
const datas = reactive({
  baseMsg: [
    {
      label: '姓名',
      value: 'Twj'
    },
    {
      label: '性别',
      value: '女'
    },
    {
      label: '生日',
      value: '1990/12/8'
    },
    {
      label: '城市',
      value: '北京'
    },
    {
      label: '手机号',
      value: '178****8939'
    },
    {
      label: '邮箱',
      value: '2864567255@qq.com'
    },
    {
      label: '星座',
      value: '射手座'
    },
    {
      label: '座右铭',
      value: '哈哈哈哈哈哈'
    },
    {
      label: '爱好',
      value: [
        { type: '', label: '打乒乓球' },
        { type: 'success', label: '看书' },
      ]
    },
    {
      label: '标签',
      value: [
        { type: '', label: 'vue3' },
        { type: 'success', label: 'ts' },
        { type: 'danger', label: 'pinia' },
        { type: 'success', label: 'vite' },
        { type: 'warning', label: 'ele-plus' },
      ]
    },
  ]
})

/* 泛型 */
// 函数泛型
function Person<T> (val: T): T {
  return val
}
Person<number>(12)

// 接口泛型
interface P<T, A> {
  name: T,
  habits: A
}

const p1:P<string, string[]> = {
  name: 'twj',
  habits: ['watch books']
}
console.log(p1, '接口泛型')

// 泛型类
class People<T, N> {
  name: T
  age: N
  constructor(name: T, age: N) {
    this.name = name
    this.age = age
  }
}

const people1 = new People<string, number>('田', 123)

// 泛型类约束,<T extends xxx>  传的参数中必须含有xxx
interface Ilength {
  length: number
}

function getLength<T extends Ilength> (arg: T) {
  console.log(arg.length)
  return arg
}
getLength<string>('22')


</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
}
.el-form-item {
  width: 30%;
}
.mx-1 {
  margin: 0 2px;
}
</style>
