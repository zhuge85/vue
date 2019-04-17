<template>
  <div class="table">
    <div class="block">
      <span class="mr20">带快捷选项</span>
      <el-date-picker class="mr20" v-model="datavalue" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </el-date-picker>
      <el-button type="primary" @click="onScreeoutMoney">筛选</el-button>
      <el-button type="primary" @click="article">恢复</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.create_time | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>标题: {{ scope.row.title }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.type }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-button size="mini" type="primary" @click="handleAdd">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background v-if='paginations.total > 0' :page-sizes="paginations.page_sizes" :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total" :current-page.sync='paginations.page_index' @current-change='handleCurrentChange' @size-change='handleSizeChange'>
      </el-pagination>
    </div>
    <!-- 弹框页面 -->
    <DialogForm :dialog='dialog' :form='form' @update="article"></DialogForm>
  </div>
</template>
<script>
// import DialogForm from '@c/DialogForm';
// const DialogForm = resolve => require(['@c/DialogForm'], resolve)
import { formatDate } from '@a/js/tools.js'
export default {
  data() {
    return {
      tableData: [],
      allTableData: [],
      filterTableData: [],
      datavalue: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      dialog: {
        show: false,
        title: '',
        option: ''
      },
      form: {
        title: '',
        type: ''
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 10, // 1页显示多少条
        page_sizes: [10, 15, 20, 50, 100], //每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      }
    }
  },
  created() {
    this.article()
  },
  components: {
    DialogForm: resolve => require(['@c/DialogForm'], resolve)
  },
  methods: {
    article() {
      this.$axios('/index/article.php').then(res => {
        // console.log(res.data)
        this.tableData = res.data
        this.allTableData = res.data;
        this.filterTableData = res.data;
        // 设置分页数据
        this.setPaginations();
      });
    },
    handleEdit(index, row) {
      // console.log(index, row)
      this.dialog = {
        show: true,
        title: '编辑内容',
        option: 'edit'
      };
      this.form = {
        id: row.id,
        title: row.title,
        type: row.type
      };
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: '添加内容',
        option: 'add'
      };
      this.form = {
        id: '',
        title: '',
        type: ''
      };
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const id = this.allTableData.findIndex(item => item.id === row.id)
        this.allTableData.splice(id, 1)
        this.paginations.total--
        this.handleCurrentChange(this.paginations.page_index)
        // 删除
        // this.$axios.delete(`/api/labels/delete/${row.id}`).then(res => {
        //   this.$message("删除成功");
        //   this.getLabel();
        // });
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleCurrentChange(page) {
      // 当前页
      let nowPage = this.paginations.page_size * (page - 1);
      // 数据总条数
      let num = this.allTableData.filter((item, index) => {
        return index >= nowPage;
      });
      // 设置默认分页数据
      this.tableData = num.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 10;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    onScreeoutMoney() {
      // 筛选
      if (!this.datavalue) {
        this.$message({
          type: 'warning',
          message: '请选择时间区间'
        });
        return;
      }
      const stime = this.datavalue[0].getTime();
      const etime = this.datavalue[1].getTime();
      this.allTableData = this.filterTableData.filter(item => {
        // let date = new Date(item.create_time);
        // let time = date.getTime();
        let time = parseInt(item.create_time) * 1000
        return time >= stime && time <= etime;
      });
      // 分页数据
      this.setPaginations();
    }
  },
  filters: {
    formatDate(time) {
      return formatDate(time);
    }
  }
}
</script>
<style lang="less" scoped>
.mr20 {
  margin-right: 20px;
}
.pagination {
  margin-top: 20px;
}
</style>
