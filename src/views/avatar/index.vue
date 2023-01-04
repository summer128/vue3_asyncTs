<template>
  <el-form
      label-width="100px"
      :model="datas"
      style="max-width: 460px"
  >
    <el-form-item label="图片标题">
      <el-input v-model="datas.imgTitle" />
    </el-form-item>
    <el-form-item label="图片地址">
      <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
      >
        <img v-if="datas.imgUrl" :src="datas.imgUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleUpImg">上传图片</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { UploadProps } from 'element-plus'
  import {reactive} from 'vue'
  const datas = reactive({
    imgTitle: '',
    imgUrl: ''
  })

  const handleUpImg = () => {
    console.log(datas,'图片')
  }

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  datas.imgUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style scoped>

</style>
