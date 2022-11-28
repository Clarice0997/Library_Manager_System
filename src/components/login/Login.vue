<template>
  <div class="login-box">
    <h1>Login</h1>
    <el-form ref="form" :model="form" :rules="rules" label-width="56px" size="medium">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" clearable prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clickLoginBtn" v-loading.fullscreen="fullscreenLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入
import { loginAPI } from '@/api/login/loginAPI.js'
import router from '@/router'

export default {
  name: 'LibraryManagerSystemLogin',

  data() {
    return {
      // 表单数据对象
      form: {
        username: '',
        password: ''
      },
      // 表单校验对象
      rules: {
        username: [
          // 必填项校验
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          // 长度校验
          {
            min: 5,
            max: 16,
            message: '长度在5-16字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          // 必填项校验
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          // 长度校验
          {
            min: 6,
            max: 15,
            message: '长度在6-16字符之间',
            trigger: 'blur'
          }
        ]
      },
      // Loading显隐
      fullscreenLoading: false
    }
  },

  mounted() {},

  methods: {
    // 表单按钮点击事件 校验表单元素 发起网络请求 发送账号密码
    clickLoginBtn() {
      // 校验表单
      this.$refs.form.validate(async valid => {
        if (valid) {
          // Loading遮罩
          this.fullscreenLoading = true
          // 异步请求 解构网络请求返回值
          // const { data } = await loginAPI(this.form.username, this.form.password)
          await loginAPI(this.form.username, this.form.password)
            .then(res => {
              console.log(res)
              if (res.data.code === 200) {
                this.fullscreenLoading = false
                // 路由跳转首页
                router.replace('/home')
              } else if (res.data.code >= 400 && res.data.code <= 500) {
                this.fullscreenLoading = false
                this.$message({
                  message: res.data.data,
                  type: 'error',
                  duration: 2000
                })
              } else if (res.data.code) {
                console.log(res.data)
              } else {
                console.log(err)
              }
            })
            .catch(err => {
              this.$message({
                message: err,
                type: 'error',
                duration: 2000
              })
              this.fullscreenLoading = false
              return
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
  /* 弹性布局 垂直排列 */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  /* 转大写 */
  text-transform: uppercase;
  color: #fff;
  /* 字间距 */
  letter-spacing: 5px;
  font-weight: bolder;
  font-size: 30px;
}
</style>
