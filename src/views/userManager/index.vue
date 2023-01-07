<template>
  <div>
    <!-- 顶部操作区卡片 -->
    <!-- shadow设置阴影显示时机 -->
    <el-card shadow="hover" class="top-card">
      <!-- 学号&姓名 输入框 -->
      <span>学号：</span>
      <el-input placeholder="请输入学号（精准匹配）" class="sid-input" prefix-icon="el-icon-search" v-model="sid" type="number" oninput="if(value<0)value=0" @keydown.native.13="searchHandler"></el-input>
      <span>姓名：</span>
      <el-input placeholder="请输入姓名（模糊匹配）" class="sname-input" prefix-icon="el-icon-search" v-model="sname" @keydown.native.13="searchHandler"></el-input>
      <!-- 按钮区 -->
      <el-button type="primary" icon="el-icon-search" @click="searchHandler">查找</el-button>
      <el-button type="success" icon="el-icon-plus">新增</el-button>
      <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
    </el-card>
    <!-- 主体表格区卡片 -->
    <el-card shadow="hover" class="body-card">
      <!-- element表格 用户表格 -->
      <el-table ref="userManagerTable" :data="userData" tooltip-effect="dark" class="userManagerTable" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" height="700" max-height="900" :default-sort="{ prop: 'id', order: 'ascending' }">
        <!-- 选择列 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 学号列 -->
        <el-table-column label="学号" width="80" prop="id" sortable> </el-table-column>
        <!-- 姓名列 -->
        <el-table-column prop="nickname" label="姓名" width="120"> </el-table-column>
        <!-- 状态列 -->
        <el-table-column prop="audited" label="状态" width="120" sortable>
          <template slot-scope="scope">
            <!-- 标签 -->
            <!-- 判断当前用户状态 -->
            <el-tag size="medium" v-if="scope.row.audited == '1'">正常</el-tag>
            <el-tag size="warning" v-else>待审核</el-tag>
          </template>
        </el-table-column>
        <!-- 学院列 -->
        <el-table-column label="学院" width="180" sortable>
          <template slot-scope="scope">
            <!-- 弹框标签 -->
            <el-popover trigger="hover" placement="top" v-if="scope.row.college">
              <p>专业: {{ scope.row.major }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" type="success">{{ scope.row.college }}</el-tag>
              </div>
            </el-popover>
            <el-tag size="medium" type="warning" v-else>未选择学院</el-tag>
          </template>
        </el-table-column>
        <!-- 入网时间列 -->
        <el-table-column label="入网时间" width="260">
          <!-- 自定义列模板 -->
          <template slot-scope="scope">
            <i class="el-icon-time" style="margin-right: 10px"></i>
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <!-- 操作列  -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleAuthorize(scope.$index, scope.row)">授权</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="warning" size="mini" @click="handleReset(scope.$index, scope.row)">重置密码</el-button>
            <el-button type="success" size="mini" v-if="scope.row.audited != '1'" @click="handleAudited(scope.$index, scope.row)">审核</el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="empty">
            <img src="@/assets/img/empty.png" />
            <span>暂无用户数据</span>
          </div>
        </template>
      </el-table>
      <!-- 分页栏 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalData"> </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import
import { getUsersInfo, searchUser } from '@/api/userManagerAPI'

export default {
  name: 'userManager',

  data() {
    return {
      sid: '',
      sname: '',
      pageNumber: 1,
      pageSize: 20,
      totalData: 0,
      // 用户数据源
      userData: [
        // {
        //   id: 111,
        //   nickname: 'Clarice',
        //   type: 1,
        //   audited: true,
        //   college: '计算与信息科学学院',
        //   major: '软件工程',
        //   create_time: '2022年12月06日 23时00分'
        // }
      ],
      // 选中列数组
      multipleSelection: []
    }
  },

  computed: {
    // 计算总页数
    totalPage() {
      return Math.ceil(this.totalData / this.pageSize)
    }
  },
  // Vue实例创建时发起网络请求
  created() {
    // 获取用户信息
    this.getUsersInfoHandler()
  },
  mounted() {},

  methods: {
    // 搜索按钮点击事件
    searchHandler() {
      // 搜索弹框
      this.$message({
        message: '搜索中...',
        type: 'info'
      })
      // 搜索用户
      searchUser(this.sid, this.sname, this.pageNumber, this.pageSize)
        .then(({ data: { result } }) => {
          console.log(result)
          // 搜索不存在该用户情况
          if (result.code === 412) {
            // 清空数据总条数
            this.totalData = 0
            // 清空数组
            this.userData = []
            // 警告弹框
            this.$message({
              message: result.message,
              type: 'warning'
            })
          } else if (result.code === 200) {
            // 数据总条数
            this.totalData = result.count
            // 重置数组
            this.userData = []
            // 结果赋值
            this.userData = result.data
            // 成功弹框
            this.$message({
              message: '搜索成功',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
          // 清空数据总条数
          this.totalData = 0
          // 清空数组
          this.userData = []
          // 警告弹框
          this.$message({
            message: '搜索用户失败',
            type: 'warning'
          })
        })
    },
    // 选择列数据事件
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 判断行状态函数
    tableRowClassName({ row, rowIndex }) {
      if (!row.audited) {
        return 'warning-row'
      }
      return ''
    },
    // 授权按钮点击事件
    handleAuthorize(index, row) {},
    // 编辑按钮点击事件
    handleEdit(index, row) {},
    // 重置密码按钮点击事件
    handleReset(index, row) {},
    // 审核按钮点击事件
    handleAudited(index, row) {},
    // 页面显示条数改变事件
    handleSizeChange(val) {
      // 赋值页面显示条数
      this.pageSize = val
      // 显示条数改变重新获取用户数据
      this.getUsersInfoHandler()
    },
    // 页码改变事件
    handleCurrentChange(val) {
      // 页码改变
      this.pageNumber = val
      // 页码改变改变重新获取用户数据
      this.getUsersInfoHandler()
    },
    // 发起网络请求获取用户数据函数
    getUsersInfoHandler() {
      getUsersInfo(this.pageNumber, this.pageSize)
        .then(({ data: { result } }) => {
          console.log(result)
          if (result.code == 200) {
            this.$message({
              message: '获取用户信息成功',
              type: 'success'
            })
            // 重置数组
            this.userData = []
            // 赋值
            this.userData = result.data
            this.totalData = result.count
          } else {
            this.$message({
              message: '获取用户信息失败',
              type: 'error'
            })
            // 重置数组
            this.userData = []
            // 数据条数
            this.totalData = 0
          }
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '获取用户信息失败',
            type: 'error'
          })
          // 重置数组
          this.userData = []
          // 数据条数
          this.totalData = 0
        })
    }
  }
}
</script>

<style lang="less" scoped>
.top-card {
  .el-input {
    width: 200px;
  }
  .el-input {
    margin-right: 20px;
  }
}

.top-card,
.body-card {
  margin: 10px;
}

.body-card {
  .userManagerTable {
    width: 100%;
    button {
      margin-right: 5px;
    }
  }
  .empty {
    // 元素上下居中
    display: flex;
    flex-direction: column;
    align-items: center;
    // 居中
    margin: auto;
    text-align: center;
    width: 20%;
    img {
      width: 30%;
    }
  }
}
.block {
  margin-top: 10px;
}
</style>
