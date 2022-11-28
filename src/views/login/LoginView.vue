<template>
  <div class="container">
    <div class="login-container">
      <div class="form-box" ref="form_box">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <div class="con-box left">
        <h2 class="title"><span>图书馆管理系统</span></h2>
        <img src="@/assets/img/login.svg" class="smaller" />
        <p>已有账号</p>
        <router-link id="login" to="/login/login">去登录</router-link>
      </div>
      <div class="con-box right">
        <h2 class="title"><span>图书馆管理系统</span></h2>
        <img src="@/assets/img/register.svg" class="smaller" />
        <p>没有账号？</p>
        <router-link id="register" to="/login/register">去注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LibraryManagerSystemLoginView',

  data() {
    return {}
  },

  mounted() {
    this.transformForm()
  },

  updated() {
    this.transformForm()
  },

  methods: {
    // 初始化表单位置
    transformForm() {
      if (this.$route.fullPath === '/login/register') {
        this.$refs.form_box.style.transform = 'translateX(80%)'
      } else {
        this.$refs.form_box.style.transform = 'translateX(0%)'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  /* 100%窗口高度 */
  height: 100vh;
  /* 弹性布局 水平+垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 渐变背景 */
  background: linear-gradient(200deg, #f3e7e9, #e3eeff);
}
.login-container {
  background-color: #fff;
  width: 650px;
  height: 415px;
  /* 相对定位 */
  position: relative;
  border-radius: 5px;
  /* 阴影 */
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}
.form-box {
  /* 绝对定位 */
  position: absolute;
  top: -10%;
  left: 5%;
  background-color: #d3b7d8;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.con-box {
  width: 50%;
  /* 弹性布局 垂直排列 居中 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 绝对定位 居中 */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.con-box.left {
  left: -2%;
}
.con-box.right {
  right: -2%;
}
.con-box h2 {
  color: #8e9aaf;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 4px;
}

.con-box p {
  font-size: 12px;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;
}

.con-box span {
  color: #d3b7d8;
}

.con-box img {
  width: 150px;
  height: 150px;
  opacity: 0.9;
  margin: 40px 0;
}

.con-box a {
  margin-top: 3%;
  background-color: #fff;
  color: #a262ad;
  border: 1px solid #d3b7d8;
  padding: 6px 10px;
  border-radius: 5px;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
}

.con-box a:hover {
  background-color: #d3b7d8;
  color: #fff;
}
</style>
