<template>
  <div>
    <!-- 顶部操作区卡片 -->
    <el-card shadow="hover" class="top-card">
      <!-- 类别输入框 -->
      <span>类别：</span>
      <el-select v-model="type" placeholder="请选择">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
      </el-select>
      <!-- 按钮区 -->
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
    </el-card>
    <!-- 上传图片卡片 -->
    <el-card shadow="hover" class="upload-card">
      <!-- 上传图片组件 -->
      <el-upload class="upload" drag action="" multiple :auto-upload="false" :on-change="uploadChangeHandler" :on-remove="uploadRemoveHandler" :file-list="fileList">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <!-- 保存图片按钮 -->
      <el-button type="primary" icon="el-icon-upload" @click="saveHandle">保存</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LibraryManagerSystemIndex',

  data() {
    return {
      // 已选择类别
      type: '',
      // 类别数组
      options: [
        {
          id: 1,
          name: '西方视界'
        },
        {
          id: 2,
          name: '四大名著'
        }
      ],
      // 图片文件数组
      fileList: []
    }
  },

  mounted() {},

  methods: {
    // 上传图片改变处理函数
    uploadChangeHandler(file, fileList) {
      // 持久化
      this.fileList = fileList
      console.log(fileList)
    },
    // 上传图片清除处理函数
    uploadRemoveHandler(file, fileList) {
      // 持久化
      this.fileList = fileList
    },
    // 保存图片函数
    saveHandle() {
      // 判断图片文件数组是否为空
      if (this.fileList.length != 0) {
        // 循环图片列表
        this.fileList.forEach(item => {
          console.log(item)
          // raw 实际图片文件对象
          // 存储图片请求
          axios.post('http://localhost:3070/upload', { name: item.name, photo: item.raw }, { headers: { 'Content-Type': 'multipart/form-data' } })
        })
      } else {
        this.$message({
          message: '文件不存在',
          type: 'warning',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top-card {
  .el-select {
    width: 200px;
    margin-right: 20px;
  }
}

.top-card,
.upload-card {
  margin: 10px;
}

.upload {
  margin-bottom: 10px;
}
</style>
