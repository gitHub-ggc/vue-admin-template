<template>
  <div id="event-add">
    <el-dialog
      :before-close="handeClose"
      :title="eventTitles"
      :visible.sync="eventVisible"
      width="980px"
    >
      <div class="dialog-box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="活动名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入活动名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="开始时间" required>
            <el-form-item prop="date1">
              <el-date-picker
                type="datetime"
                placeholder="选择开始时间"
                v-model="ruleForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-form-item prop="date2">
              <el-date-picker
                v-model="ruleForm.date2"
                type="datetime"
                placeholder="选择结束时间"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="活动分享" prop="eventSharing">
            <el-switch v-model="ruleForm.eventSharing"></el-switch>
            <span class="event-sharing">{{
              ruleForm.eventSharing ? "已开启" : "已关闭"
            }}</span>
          </el-form-item>
          <el-form-item label="关联问卷" prop="region">
            <el-select
              style="width: 100%"
              v-model="ruleForm.region"
              placeholder="请选择关联问卷"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="活动主标题"
            prop="eventTitle"
            class="questions-red"
          >
            <el-input
              v-model="ruleForm.eventTitle"
              placeholder="请输入活动主标题"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="活动副标题"
            prop="eventSubTitle"
            class="questions-red"
          >
            <el-input
              v-model="ruleForm.eventSubTitle"
              placeholder="请输入活动副标题"
            ></el-input>
          </el-form-item>
          <div class="top-red">答题红包</div>
          <el-form-item
            label="有无答题红包"
            prop="questionsRed"
            class="questions-red"
          >
            <el-switch
              v-model="ruleForm.questionsRed"
              @change="changeSwitch"
            ></el-switch>
            <span class="event-sharing">{{
              ruleForm.questionsRed ? "有" : "无"
            }}</span>
          </el-form-item>
          <el-form-item
            label="红包单额"
            prop="singleAmount"
            :rules="{
              required: singleAmountFlag ? true : false,
              message: '请输入红包单额',
            }"
          >
            <el-input
              v-model="ruleForm.singleAmount"
              :disabled="!ruleForm.questionsRed"
              placeholder="请输入红包单额"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="红包数量"
            prop="numberRed"
            type="number"
            :rules="{
              required: numberRedFlag ? true : false,
              message: '请输入红包数量',
            }"
          >
            <el-input
              :disabled="!ruleForm.questionsRed"
              v-model="ruleForm.numberRed"
              placeholder="请输入红包数量"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eventAddCancle('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="eventAddOk('ruleForm')"
          >提 交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { activeAdd, activeEdit } from "@/api/activeManager";
export default {
  props: {
    eventVisible: {
      type: Boolean,
    },
    eventTitles: {
      type: String,
    },
  },
  data() {
    return {
      ruleForm: {
        name: "", //活动名称
        region: "", //关联问卷
        date1: "", //开始时间
        date2: "", //结束时间
        eventSharing: true, //活动分享
        eventTitle: "", //活动主标题
        eventSubTitle: "", //活动副标题
        questionsRed: true, //有无答题红包
        singleAmount: "", //红包单额
        numberRed: "", //红包数量
      },
      numberRedFlag: true, //红包数量校验
      singleAmountFlag: true, //红包单额校验
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { max: 10, message: "你输入的字数过长", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        eventTitle: [
          { required: true, message: "请输入活动主标题", trigger: "blur" },
          { max: 10, message: "您输入的字数过长", trigger: "blur" },
        ],
        eventSubTitle: [
          { required: true, message: "请输入活动副标题", trigger: "blur" },
          { max: 10, message: "您输入的字数过长", trigger: "blur" },
        ],
        singleAmount: [{ message: "请输入红包单额", trigger: "blur" }],
        numberRed: [{ message: "请输入红包数量", trigger: "blur" }],
        eventSharing: [
          { required: true, message: "请选择活动资源", trigger: "blur" },
        ],
      },
      editId: "", //修改ID
    };
  },
  methods: {
    //确定按钮
    eventAddOk(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("您确认要提交配置吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          });
          let {
            name,
            region,
            date1,
            date2,
            eventSharing,
            eventTitle,
            eventSubTitle,
            questionsRed,
            singleAmount,
            numberRed,
          } = that.ruleForm
            .then(() => {
              let params = {
                name: name, // 活动名称
                startTime: date1, //活动开始
                endTime: date2, // 活动结束时间
                // banner: "banner图路径", // banner图路径
                mainTitle: eventTitle, //主标题
                viceTitle: eventSubTitle, //副标题
                // shareLink: eventSharing, // 分享链接
                questionnaireId: region, //关联问卷名称
                createTime: "2020-20-21", //创建时间
                share: eventSharing ? "1" : "0", //活动分享
                coin_bag: questionsRed ? "1" : "0", //有无答题红包
                bag: [
                  {
                    money: singleAmount, //红包单额 (元)
                    amount: numberRed, //红包数量
                  },
                ],
              };
              if (that.eventTitles == "新增活动") {
                activeAdd(params).then((res) => {
                  if (res.code == 200) {
                    that.$emit("addInit");
                    that.$message.success("新增成功");
                  } else {
                    that.$message.error(res.msg || "未知异常，请联系管理员");
                  }
                });
              } else {
                params.id = this.editId;
                activeEdit(params).then((res) => {
                  if (res.code == 200) {
                    that.$emit("addInit");
                    this.editId = "";
                    that.$message.success("修改成功");
                  } else {
                    that.$message.error(res.msg || "未知异常，请联系管理员");
                  }
                });
              }
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消按钮
    eventAddCancle(formName) {
      this.$refs[formName].resetFields();
      this.$emit("eventAddCancle");
    },
    //弹框关闭前的回调
    handeClose() {
      this.eventAddCancle("ruleForm");
    },
    //活动编辑数据获取
    eventEdit(row) {
      this.editId = row.id;
      this.ruleForm = {
        name: row.name,
        region: row.questionnaireId,
        date1: row.startTime,
        date2: row.endTime,
        eventSharing: Number(row.share) ? true : false,
        eventTitle: row.mainTitle,
        eventSubTitle: row.viceTitle,
        questionsRed: Number(row.coin_bag) ? true : false,
        singleAmount: row.bag && row.bag[0].money ? row.bag[0].money : "",
        numberRed: row.bag && row.bag[0].amount ? row.bag[0].amount : "",
      };
    },
    //
    changeSwitch(msg) {
      if (msg) {
        this.singleAmountFlag = true;
        this.numberRedFlag = true;
      } else {
        this.ruleForm.singleAmount = ""; //红包单额
        this.ruleForm.numberRed = ""; //红包数量
        this.singleAmountFlag = false;
        this.numberRedFlag = false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
#event-add {
  .event-sharing {
    display: inline-block;
    margin-left: 10px;
    color: #409eff;
    padding-top: 0px;
  }
}
</style>
<style lang="scss">
#event-add {
  .el-dialog {
    margin-top: 5vh !important;
  }
  .el-form-item__label {
    font-size: 15px;
  }
  .questions-red {
    font-size: 15px;
    .el-form-item__label {
      width: 110px !important;
    }
    .el-form-item__content {
      margin-left: 110px !important;
    }
  }
  .top-red {
    font-size: 16px;
    font-weight: bold;
    padding: 20px 0;
    border-top: 1px solid #dcdfe6;
  }
}
</style>