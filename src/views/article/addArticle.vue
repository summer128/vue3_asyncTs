<template>
  <el-form :model="addDatas.formInline" class="demo-form-inline">
<!--    <el-form-item label="作者">-->
<!--      <el-input v-model="addDatas.formInline.author" placeholder="Approved by" />-->
<!--    </el-form-item>-->
    <el-form-item label="标题">
      <el-input v-model="addDatas.formInline.title" placeholder="标题" />
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="addDatas.formInline.subTitle" placeholder="副标题" />
    </el-form-item>
    <el-form-item label="内容">
      <el-input v-model="addDatas.formInline.content" placeholder="内容" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import {ArticleAdd} from '@/types/articleType'
import {addArticle} from '@/http/api'
const addDatas = reactive(new ArticleAdd())

const onSubmit = () => {
  console.log('确认添加', addDatas)
  addArticle({...addDatas.formInline}).then(res => {
    console.log(res, '是否添加成功')
  })
}
</script>

<style scoped>

</style>
