<template>
  <div class="register-box">
    <h1>Register</h1>
    <el-form ref="form" :model="form" :rules="rules" label-width="56px" size="medium">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" clearable maxlength="12" minlength="6" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password maxlength="18" minlength="6" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item label="确认" prop="repassword">
        <el-input v-model="form.repassword" show-password maxlength="18" minlength="6" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="clickRegisterBtn" v-loading.fullscreen="fullscreenLoading" :loading="btnLoading">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入
import { registerAPI } from '@/api/login/registerAPI'
import md5 from 'md5'

export default {
  name: 'LibraryManagerSystemRegister',

  data() {
    // 自定义校验 确认密码
    var repasswordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      },
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
        ],
        repassword: [
          // 必填项校验
          {
            required: true,
            message: '请输入确认密码',
            trigger: 'blur'
          },
          // 自定义校验 确认密码
          {
            validator: repasswordValidator,
            trigger: 'blur'
          }
        ]
      },
      // Loading显隐
      fullscreenLoading: false,
      // 按钮加载状态
      btnLoading: false
    }
  },

  mounted() {},

  methods: {
    clickRegisterBtn() {
      // 校验表单
      this.$refs.form.validate(async valid => {
        if (valid) {
          // Loading遮罩
          this.fullscreenLoading = true
          // 加载按钮
          this.btnLoading = true
          // const { data: res } = await registerAPI(this.form.username, this.form.password)
          // 采用上述解构赋值 无法使用catch进行错误处理
          await registerAPI(this.form.username, this.form.password)
            .then(res => {
              console.log(res)
              // 返回值200 跳转登录组件
              if (res.data.code === 200) {
                this.fullscreenLoading = false
                // 重置表单数据
                this.form = this.$options.data().form
                // 成功注册弹窗
                this.$message({
                  message: res.data.message,
                  type: 'success',
                  duration: 2000
                })
                this.$router.replace('/login')
                // 返回值409 账号已存在
              } else if (res.data.code === 409) {
                this.fullscreenLoading = false
                // 账号已存在弹窗
                this.$message({
                  message: res.data.message,
                  type: 'error',
                  duration: 2000
                })
                // 重置表单数据
                this.form = this.$options.data().form
              } else {
                this.fullscreenLoading = false
                this.$message({
                  message: res.data.message,
                  type: 'error',
                  duration: 2000
                })
                // 重置表单数据
                this.form = this.$options.data().form
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
            .finally(() => {
              // 停止加载按钮
              this.btnLoading = false
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
.register-box {
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
