<template>
  <div>
    <!-- 左侧容器 -->
    <div class="left-container">
      <!-- 左侧头部LOGO容器 -->
      <div class="left-header">
        <div>
          <router-link to="/main/home">
            <img src="@/assets/img/library.svg" />
            <h1>图书馆管理系统</h1>
          </router-link>
        </div>
      </div>
      <!-- 左侧侧边栏容器 -->
      <div class="left-sidebar">
        <!-- element侧栏 -->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
          <el-menu-item index="/main/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-menu-item index="/main/userManager">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/main/bookManager">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">图书管理</span>
          </el-menu-item>
          <el-menu-item index="/main/bookSort" disabled>
            <i class="el-icon-notebook-2"></i>
            <span slot="title">图书分类</span>
          </el-menu-item>
          <el-menu-item index="/main/noticeManager" disabled>
            <i class="el-icon-message"></i>
            <span slot="title">公告管理</span>
          </el-menu-item>
          <el-menu-item index="/main/seatManager" disabled>
            <i class="el-icon-school"></i>
            <span slot="title">座位管理</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <!-- 右侧容器 -->
    <div class="right-container">
      <div class="right-header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- 动态面包屑 -->
          <el-breadcrumb-item :to="item.path && { path: item.path }" v-for="item in menuPath" :key="item.path">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 头部右侧个人信息 -->
        <!-- element下拉菜单 触发el-dropdown-link -->
        <!-- @command点击下拉菜单事件 -->
        <el-dropdown placement="bottom" @command="logout">
          <div class="user-container el-dropdown-link">
            <div>
              <span>{{ userNickName }}，欢迎您！</span>
            </div>
            <img src="@/assets/img/userImg.jpg" />
          </div>
          <!-- 下拉菜单容器 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>用户设置</el-dropdown-item>
            <!-- command命令值 -->
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 右侧主体部分 路由控制 -->
      <div class="right-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// 导入删除Token函数
import { deleteToken } from '@/utils/auth'

export default {
  name: 'LibraryManagerSystemHomeView',

  data() {
    return {
      // 用户名
      userNickName: '郑润平',
      // 面包屑数组对象
      menuPath: [
        {
          name: '首页',
          path: '/main/home'
        }
      ]
    }
  },

  mounted() {},

  methods: {
    logout(value) {
      if (value == 'logout') {
        // 删除校验token
        deleteToken()
        // 刷新页面
        location.reload()
      }
    }
  },
  watch: {
    // 监听路由地址变化监听器
    // 动态改变面包屑数组对象
    '$route.path': {
      handler: function (newVal, oldVal) {
        if (newVal == '/main/home') {
          // 删除第一位对象元素
          this.menuPath.splice(1, 1)
        } else {
          // 判断访问地址 修改面包屑对象
          let temp = {}
          if (newVal == '/main/userManager') {
            temp.name = '用户管理'
            temp.path = newVal
          } else if (newVal == '/main/bookManager') {
            temp.name = '图书管理'
            temp.path = newVal
          }
          this.menuPath[1] = temp
        }
      },
      // 首次加载触发
      immediate: true
    }
  }
}
</script>

<style scoped lang="less">
.left-container {
  width: 200px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}
.left-header {
  height: 50px;
  background: #545c64;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  transition: 0.2s;
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    h1 {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      vertical-align: middle;
    }
  }
}
.left-header:hover {
  background: rgb(67, 74, 80);
}
.left-sidebar {
  height: calc(100% - 50px);
  background: #545c64;
  // 清除侧边栏右边框
  .el-menu {
    border-right: 0;
  }
  .el-menu-item {
    padding-left: 30px !important;
  }
}
.right-container {
  width: calc(100% - 200px);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
}
.right-header {
  height: 50px;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-breadcrumb {
    margin-left: 10px;
  }
  .user-container {
    margin-right: 10px;
    display: flex;
    align-items: center;
    height: 100%;
    img {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      border: 1px solid white;
    }
  }
}
.right-body {
  height: calc(100% - 50px);
  min-width: 1200px;
}
</style>
