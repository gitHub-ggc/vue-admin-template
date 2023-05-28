<template>
  <div id="question-management">
    <div class="evnet-top">
      <el-row>
        <el-col :span="6" class="event-col">
          <label class="event-label" for="">问卷名称：</label>
          <el-input
            v-model="questionName"
            placeholder="请输入问卷名称"
          ></el-input>
        </el-col>
        <el-col :span="6" class="event-col">
          <label class="event-label event-label-wid" for=""
            >是否关联活动：</label
          >
          <el-select
            style="width: 100%"
            v-model="region"
            placeholder="请选择是否关联活动"
          >
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" class="event-col">
          <label class="event-label event-label-wid" for="">关联活动ID：</label>
          <el-input
            v-model="questionnaireID"
            placeholder="请输入关联活动ID"
          ></el-input>
        </el-col>
        <el-col :span="6" class="event-col">
          <el-button type="primary" icon="el-icon-search" @click="tableSearch"
            >搜索</el-button
          >
          <el-button type="primary" @click="tableResh"
            ><i class="el-icon-refresh-right"></i> 重置</el-button
          >
          <el-button type="primary" @click="tableAdd">
            <i class="el-icon-plus"></i> 新增活动</el-button
          >
        </el-col>
      </el-row>
      <!-- <el-row class="event-row"></el-row> -->
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="100%"
      v-loading="tableLoading"
    >
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="问卷名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="titleNum"
        label="题目数量"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="createTime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="isWithActivity"
        label="是否关联活动"
      >
        <template slot-scope="scope">
          <div>
            {{ Number(scope.row.isWithActivity) ? "是" : "否" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="activityIds"
        label="关联活动ID"
      >
      </el-table-column>
      <!-- <el-table-column
        :show-overflow-tooltip="true"
        prop="phone_authorize"
        label="是否授权手机号"
      >
      <template slot-scope="scope">
        <div>
          {{Number(scope.row.phone_authorize) ? '是':'否'}}
        </div>
      </template>
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          > -->
          <el-button
            type="text"
            class="table-btn"
            size="small"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small">|</el-button>
          <el-button
            type="text"
            class="table-btn"
            size="small"
            @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <question-add
      ref="eventAdd"
      :eventTitles="eventTitle"
      :eventVisible="eventVisible"
      @eventAddCancle="eventAddCancle"
      @addInit="addInit"
    ></question-add>
  </div>
</template>
<script>
import questionAdd from "./components/addQuestion.vue";
import { questionQuery, questionDel } from "@/api/activeManager";
export default {
  components: {
    questionAdd,
  },
  data() {
    return {
      questionName: "", //问卷名称
      questionnaireID: "", //关联活动ID
      region: "", //是否关联活动
      pageSize: 10, //表格当前页数
      total: 0, //表格数据总页数
      tableData: [
        //表格数据
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      currentPage: 1, //当前页
      eventVisible: false, //是否打开新增或编辑弹窗
      eventTitle: "", //活动新增或者编辑弹窗标题
      tableLoading: false, //表格loading效果
    };
  },
  created() {
    // this.init();
  },
  methods: {
    //表格数据请求
    init() {
      this.tableLoading = true;
      questionQuery({
        name: this.questionName, // 问卷名称
        isWithActivity: this.region, // 1关联 0 不关联
        activityId: this.questionnaireID, //关联活动ID
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      }).then((res) => {
        this.tableLoading = false;
        if (res.code == 200) {
          this.total = res.data.total;
          this.tableData = res.data.lists;
        } else {
          this.$message.error(res.msg || "未知异常，请联系管理员");
        }
      });
    },
    //新增或者修改完成时，更新数据
    addInit(){
      this.init();
    },
    //表格搜索
    tableSearch() {
      this.init();
    },
    //表单重置
    tableResh() {
      this.questionName = ""; //问卷名称
      this.questionnaireID = ""; //关联活动ID
      this.region = ""; //是否关联活动
      this.currentPage = 1;
      this.init();
    },
    //新增
    tableAdd() {
      this.eventTitle = "新增问卷";
      this.eventVisible = true;
      this.$nextTick(() => {
        this.$refs["eventAdd"].eventAdd();
      })
    },
    //关闭新增弹窗
    eventAddCancle() {
      this.eventVisible = false;
    },
    //表格编辑
    handleEdit(row) {
      this.eventTitle = "编辑问卷";
      this.eventVisible = true;
      this.$nextTick(() => {
        this.$refs["eventAdd"].eventEdit(row);
      })
    },
    //表格删除
    handleDel(row) {
      let that = this;
      this.$confirm("您确认要删除此问卷吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          questionDel({
            id: row.id,
            delFlag: 1,
          }).then((res) => {
            if (res.code == 200) {
              that.init();
              that.$message({
                type: "success",
                message: "删除成功!",
              });
            }else{
              that.$message.error(res.msg || '未知异常，请联系管理员')
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //表格页数切换
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.init();
    },
    //表格当前页事件
    handleCurrentChange(val) {
      this.currentPage = val;
      this.init();
    },
  },
};
</script>
<style scoped lang="scss">
#question-management {
  margin: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  height: calc(100vh - 157px);
  .evnet-top {
    padding-top: 10px;
    .event-row {
      padding-top: 10px;
    }
    .event-col {
      display: flex;
      align-content: center;
      padding-left: 10px;
      // width:100%;
      .event-label {
        width: 100px;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .event-label-wid {
        width: 174px;
      }
    }
  }
  .el-table {
    width: 100%;
    .cell {
      font-size: 16px;
      color: #000;
    }
    .table-btn {
      font-size: 15px;
    }
  }
  .el-pagination button,
  .el-pagination span:not([class*="suffix"]) {
    font-size: 16px;
  }
  .el-pagination__total {
    font-size: 16px;
  }
}
</style>
<style lang="scss">
#question-management {
  .el-table {
    width: 100%;
    .cell {
      font-size: 16px;
      color: #000;
    }
    .table-btn {
      font-size: 15px;
    }
  }
  .el-pagination button,
  .el-pagination span:not([class*="suffix"]) {
    font-size: 16px;
  }
  .el-pagination__total {
    font-size: 16px;
  }
}
</style>