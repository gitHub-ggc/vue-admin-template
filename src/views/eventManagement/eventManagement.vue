<template>
  <div id="event-management">
    <div class="evnet-top">
      <el-row>
        <el-col :span="6" class="event-col">
          <label class="event-label" for="">活动名称：</label>
          <el-input
            v-model="activeName"
            placeholder="请输入活动名称"
          ></el-input>
        </el-col>
        <el-col :span="6" class="event-col">
          <label class="event-label event-label-wid" for=""
            >关联问卷名称：</label
          >
          <el-input
            v-model="questionnaireName"
            placeholder="请输入关联问卷名称"
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
        type="index"
        width="50"
        label="活动ID"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="活动名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="startTime"
        label="开始时间"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="endTime"
        label="结束时间"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="banner"
        label="banner图片"
      >
      </el-table-column>
       <el-table-column
        :show-overflow-tooltip="true"
        prop="mainTitle"
        label="活动主标题"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="viceTitle"
        label="活动副标题"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="rate"
        label="活动进度"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="questionnaireId"
        label="关联问卷"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="shareLink"
        label="活动分享名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="shareLink"
        label="活动分享链接(请复制链接)"
      >
      </el-table-column>
     
      <el-table-column :show-overflow-tooltip="true" label="有无答题红包">
        <template slot-scope="scope">
          <div>
            {{ scope.row.coin_bag ? "有" : "无" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="红包单额"
      >
        <template slot-scope="scope">
          <div>
            {{ scope.row.bag[0].money }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="红包数量"
      >
        <template slot-scope="scope">
          <div>
            {{ scope.row.bag[0].amount }}
          </div>
        </template>
      </el-table-column>
       <el-table-column
        :show-overflow-tooltip="true"
        prop="createTime"
        label="创建时间"
      >
      </el-table-column>
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
    <event-add
      ref="eventAdd"
      :eventTitles="eventTitle"
      :eventVisible="eventVisible"
      @eventAddCancle="eventAddCancle"
      @addInit="addInit"
    ></event-add>
  </div>
</template>
<script>
import eventAdd from "./components/eventAdd.vue";
import { activeQuery, activeDel } from "@/api/activeManager";
export default {
  components: {
    eventAdd,
  },
  data() {
    return {
      activeName: "", //活动名称
      questionnaireName: "", //问卷名称
      tableData: [], //表格数据
      currentPage: 1, //当前页
      eventVisible: false, //是否打开新增或编辑弹窗
      eventTitle: "", //活动新增或者编辑弹窗标题
      pageSize: 10, //表格当前页数
      total: 0, //表格数据总页数
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
      activeQuery({
        name: this.activeName,
        questionnaireId: this.questionnaireName,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
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
    //新增或者修改时，表格的数据刷新
    addInit(){
      this.init();
    },
    //表格搜索
    tableSearch() {
      this.currentPage = 1;
      this.init();
    },
    //表单重置
    tableResh() {
      this.activeName = ""; //活动名称
      this.questionnaireName = ""; //问卷名称
      this.currentPage = 1;
      this.init();
    },
    //新增
    tableAdd() {
      this.eventTitle = "新增活动";
      this.eventVisible = true;
    },
    //关闭新增弹窗
    eventAddCancle() {
      this.eventVisible = false;
    },
    //表格编辑
    handleEdit(row) {
      this.eventTitle = "编辑活动";
      this.eventVisible = true;
      this.$refs["eventAdd"].eventEdit(row);
    },
    //表格删除
    handleDel(row) {
      let that = this;
      this.$confirm("您确认要删除此活动吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          activeDel({ id: row.id, delFlag: 1 }).then((res) => {
            if (res.code == 200) {
              that.init()
              that.$message({
                type: "success",
                message: "删除成功!",
              });
            }else{
              that.$message.error(res.code || '未知异常，请联系管理员')
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
#event-management {
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
</style>