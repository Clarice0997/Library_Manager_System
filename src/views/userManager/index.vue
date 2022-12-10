<template>
  <div>
    <!-- 顶部操作区卡片 -->
    <!-- shadow设置阴影显示时机 -->
    <el-card shadow="hover" class="top-card">
      <!-- 学号&姓名 输入框 -->
      <span>学号：</span>
      <el-input placeholder="请输入学号（精准匹配）" class="sid-input" prefix-icon="el-icon-search" v-model="sid" @keydown.native.13="searchHandler"></el-input>
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
      <el-table ref="userManagerTable" :data="userData" tooltip-effect="dark" class="userManagerTable" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" height="500" max-height="700" :default-sort="{ prop: 'id', order: 'ascending' }">
        <!-- 选择列 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 学号列 -->
        <el-table-column label="学号" width="80" prop="id" sortable> </el-table-column>
        <!-- 姓名列 -->
        <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
        <!-- 状态列 -->
        <el-table-column prop="audited" label="状态" width="120" sortable>
          <template slot-scope="scope">
            <!-- 标签 -->
            <!-- 判断当前用户状态 -->
            <el-tag size="medium" v-if="scope.row.audited">正常</el-tag>
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
          </template>
        </el-table-column>
        <!-- 入网时间列 -->
        <el-table-column label="入网时间" width="260">
          <!-- 自定义列模板 -->
          <template slot-scope="scope">
            <i class="el-icon-time" style="margin-right: 10px"></i>
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <!-- 操作列  -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleAuthorize(scope.$index, scope.row)">授权</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="warning" size="mini" @click="handleReset(scope.$index, scope.row)">重置密码</el-button>
            <el-button type="success" size="mini" v-if="!scope.row.audited" @click="handleAudited(scope.$index, scope.row)">审核</el-button>
          </template>
        </el-table-column>
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
import dateformat from 'dateformat-util'

export default {
  name: 'userManager',

  data() {
    return {
      sid: '',
      sname: '',
      pageNumber: 1,
      pageSize: 20,
      // 用户数据源
      userData: [
        {
          id: 111,
          name: 'Clarice',
          type: 1,
          audited: true,
          college: '计算与信息科学学院',
          major: '软件工程',
          createTime: '2022年12月06日 23时00分'
        },
        {
          id: 222,
          name: 'Clarice',
          type: 1,
          audited: false,
          college: '计算与信息科学学院',
          major: '软件工程',
          createTime: '2022年12月06日 23时00分'
        },
        {
          id: 333,
          name: 'Clarice',
          type: 1,
          audited: false,
          college: '计算与信息科学学院',
          major: '软件工程',
          createTime: '2022年12月06日 23时00分'
        },
        {
          id: 444,
          name: 'Clarice',
          type: 1,
          audited: true,
          college: '计算与信息科学学院',
          major: '软件工程',
          createTime: '2022年12月06日 23时00分'
        },
        {
          id: 555,
          name: 'Clarice',
          type: 1,
          audited: true,
          college: '计算与信息科学学院',
          major: '软件工程',
          createTime: '2022年12月06日 23时00分'
        }
      ],
      // 选中列数组
      multipleSelection: []
    }
  },

  computed: {
    // 计算数据条数
    totalData() {
      return this.userData.length
    }
  },

  mounted() {},

  methods: {
    // 搜索按钮点击事件
    searchHandler() {
      this.$message({
        message: '搜索中...',
        type: 'info'
      })
    },
    // 选择列数据事件
    handleSelectionChange(val) {
      this.multipleSelection = val
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
      console.log(`每页 ${val} 条`)
    },
    // 页码改变事件
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
}
.block {
  margin-top: 10px;
}
</style>
