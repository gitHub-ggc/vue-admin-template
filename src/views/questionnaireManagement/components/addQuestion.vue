<template>
  <div id="question-add">
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
          <el-form-item label="问卷名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入问卷名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否需要手机号授权">
            <el-radio-group v-model="ruleForm.isPhone">
              <el-radio label="是" value="1"></el-radio>
              <el-radio label="否" value="0"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="说明" prop="dec">
            <el-input type="textarea" v-model="ruleForm.describe"></el-input>
          </el-form-item>
          <!-- 修改模板 -->
          <el-form-item
            label="题目"
            v-for="(item, index) in ruleForm.editDataArr"
            :key="item.id || item.ids"
            class="question-top"
          >
            <div class="dan-question">
              <div class="question-box">
                <el-form-item
                  label="题型"
                  :prop="'editDataArr.' + index + '.questionType'"
                  :rules="{
                    required: true,
                    message: '请选择题型',
                    trigger: 'change',
                  }"
                  class="box-item question-tom"
                >
                  <el-select
                    style="width: 100%"
                    v-model="item.questionType"
                    placeholder="请选择题型"
                  >
                    <el-option label="单选" value="1"></el-option>
                    <el-option label="多选" value="2"></el-option>
                    <el-option label="填空" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="标题"
                  :prop="'editDataArr.' + index + '.queryTitle'"
                  :rules="[
                    {
                      required: true,
                      message: '请填写标题',
                      trigger: 'blur',
                    },
                    {
                      max: 30,
                      message: '您输入的字数过长',
                      trigger: 'blur',
                    },
                  ]"
                  class="box-item question-tom"
                >
                  <el-input
                    v-model="item.queryTitle"
                    placeholder="请输入标题"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="选项A"
                  v-if="item.questionType != 3"
                  :prop="'editDataArr.' + index + '.changeA'"
                  :rules="[
                    {
                      required: true,
                      message: '请填写选项A',
                      trigger: 'blur',
                    },
                    {
                      max: 30,
                      message: '您输入的字数过长',
                      trigger: 'blur',
                    },
                  ]"
                  class="box-item question-tom"
                >
                  <el-input
                    v-model="item.changeA"
                    placeholder="请输入选项A"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="选项B"
                  v-if="item.questionType != 3"
                  :prop="'editDataArr.' + index + '.changeB'"
                  :rules="[
                    {
                      required: true,
                      message: '请填写选项B',
                      trigger: 'blur',
                    },
                    {
                      max: 30,
                      message: '您输入的字数过长',
                      trigger: 'blur',
                    },
                  ]"
                  class="box-item question-tom"
                >
                  <el-input
                    v-model="item.changeB"
                    placeholder="请输入选项B"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="选项C"
                  v-if="item.questionType != 3"
                  :prop="'editDataArr.' + index + '.changeC'"
                  :rules="[
                    {
                      required: true,
                      message: '请填写选项C',
                      trigger: 'blur',
                    },
                    {
                      max: 30,
                      message: '您输入的字数过长',
                      trigger: 'blur',
                    },
                  ]"
                  class="box-item question-tom"
                >
                  <el-input
                    v-model="item.changeC"
                    placeholder="请输入选项C"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="正确选项"
                  v-if="item.questionType != 3"
                  :prop="'editDataArr.' + index + '.changeOk'"
                  :rules="[
                    {
                      required: true,
                      message: '请填写正确选项',
                      trigger: 'blur',
                    },
                  ]"
                  class="box-item question-tom"
                >
                  <el-input
                    v-model="item.changeOk"
                    placeholder="请输入正确选项"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="add-btn">
              <el-button type="primary" @click="editAddQuest(item)">
                <i class="el-icon-plus"></i> 新增题目</el-button
              >
              <el-button
                type="primary"
                :disabled="ruleForm.editDataArr.length == 1"
                @click="editDelQuest(item)"
                ><i class="el-icon-delete"></i> 删除题目</el-button
              >
            </div>
          </el-form-item>
          <!-- 新增模板 -->
          <el-form-item
            label="题目"
            v-for="(item, index) in ruleForm.questionArr"
            :key="item.ids"
            class="question-top"
          >
            <div class="dan-question">
              <div class="question-box">
                <el-form-item
                  label="题型"
                  :prop="'questionArr.' + index + '.questionType'"
                  :rules="{
                    required: true,
                    message: '请选择题型',
                    trigger: 'change',
                  }"
                  class="box-item question-tom"
                >
                  <el-select
                    style="width: 100%"
                    v-model="item.questionType"
                    placeholder="请选择题型"
                  >
                    <el-option label="单选" value="1"></el-option>
                    <el-option label="多选" value="2"></el-option>
                    <el-option label="填空" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="标题"
                  :prop="'questionArr.' + index + '.queryTitle'"
                  :rules="[
                    {
                      required: true,
                      message: '请填写标题',
                      trigger: 'blur',
                    },
                    {
                      max: 30,
                      message: '您输入的字数过长',
                      trigger: 'blur',
                    },
                  ]"
                  class="box-item question-tom"
                >
                  <el-input
                    v-model="item.queryTitle"
                    placeholder="请输入标题"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="选项A"
                  v-if="item.questionType != 3"
                  :prop="'questionArr.' + index + '.changeA'"
                  :rules="[
                    {
                      required: true,
                      message: '请填写选项A',
                      trigger: 'blur',
                    },
                    {
                      max: 30,
                      message: '您输入的字数过长',
                      trigger: 'blur',
                    },
                  ]"
                  class="box-item question-tom"
                >
                  <el-input
                    v-model="item.changeA"
                    placeholder="请输入选项A"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="选项B"
                  v-if="item.questionType != 3"
                  :prop="'questionArr.' + index + '.changeB'"
                  :rules="[
                    {
                      required: true,
                      message: '请填写选项B',
                      trigger: 'blur',
                    },
                    {
                      max: 30,
                      message: '您输入的字数过长',
                      trigger: 'blur',
                    },
                  ]"
                  class="box-item question-tom"
                >
                  <el-input
                    v-model="item.changeB"
                    placeholder="请输入选项B"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="选项C"
                  v-if="item.questionType != 3"
                  :prop="'questionArr.' + index + '.changeC'"
                  :rules="[
                    {
                      required: true,
                      message: '请填写选项C',
                      trigger: 'blur',
                    },
                    {
                      max: 30,
                      message: '您输入的字数过长',
                      trigger: 'blur',
                    },
                  ]"
                  class="box-item question-tom"
                >
                  <el-input
                    v-model="item.changeC"
                    placeholder="请输入选项C"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="正确选项"
                  v-if="item.questionType != 3"
                  :prop="'questionArr.' + index + '.changeOk'"
                  :rules="[
                    {
                      required: true,
                      message: '请填写正确选项',
                      trigger: 'blur',
                    },
                  ]"
                  class="box-item question-tom"
                >
                  <el-input
                    v-model="item.changeOk"
                    placeholder="请输入正确选项"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="add-btn">
              <el-button type="primary" @click="addQuest(item.ids)">
                <i class="el-icon-plus"></i> 新增题目</el-button
              >
              <el-button type="primary" @click="delQuest(item.ids)"
                ><i class="el-icon-delete"></i> 删除题目</el-button
              >
            </div>
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
import {
  questionAdd,
  questionEdit,
  questionTitleDel,
} from "@/api/activeManager";
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
        name: "", //问卷名称
        isPhone: "1", //是否关联手机号
        region: "", //关联问卷
        describe: "", //说明
        questionArr: [
          {
            ids: 1,
            questionType: "1", //题型
            queryTitle: "", //标题
            changeA: "", //选项A
            changeB: "", //选项B
            changeC: "", //选项C
            changeOk: "", //正确选项
          },
        ],
        editDataArr: [], //编辑时，题型数组
        rowId: "", //问卷ID
      },
      rules: {
        name: [
          { required: true, message: "请输入问卷名称", trigger: "blur" },
          { max: 10, message: "你输入的字数过长", trigger: "blur" },
        ],
      },
      idsNumber: 1, //问题计数
    };
  },
  methods: {
    // 删除题目
    delQuest(ids) {
      for (let i = 0; i < this.ruleForm.questionArr.length; i++) {
        if (ids == this.ruleForm.questionArr[i].ids) {
           this.$confirm("确认删除此问题吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.ruleForm.questionArr.splice(i, 1);
              that.$message.success('删除成功');
            }).catch(() => {});
        }
      }
    },
    // 新增题目
    addQuest(ids) {
      for (let i = 0; i < this.ruleForm.questionArr.length; i++) {
        if (ids == this.ruleForm.questionArr[i].ids) {
          this.idsNumber++;
          this.ruleForm.questionArr.splice(i + 1, 0, {
            ids: this.idsNumber,
            questionType: "1", //题型
            queryTitle: "", //标题
            changeA: "", //选项A
            changeB: "", //选项B
            changeC: "", //选项C
            changeOk: "", //正确选项
          });
        }
      }
    },
    //修改状态下新增题目
    editAddQuest(item) {
      if (item.id) {
        for (let i = 0; i < this.ruleForm.editDataArr.length; i++) {
          if (item.id == this.ruleForm.editDataArr[i].id) {
            this.idsNumber++;
            this.ruleForm.editDataArr.splice(i + 1, 0, {
              ids: this.idsNumber,
              questionType: "1", //题型
              queryTitle: "", //标题
              changeA: "", //选项A
              changeB: "", //选项B
              changeC: "", //选项C
              changeOk: "", //正确选项
            });
          }
        }
      } else if (item.ids) {
        for (let i = 0; i < this.ruleForm.editDataArr.length; i++) {
          if (item.ids == this.ruleForm.editDataArr[i].ids) {
            this.idsNumber++;
            this.ruleForm.editDataArr.splice(i + 1, 0, {
              ids: this.idsNumber,
              questionType: "1", //题型
              queryTitle: "", //标题
              changeA: "", //选项A
              changeB: "", //选项B
              changeC: "", //选项C
              changeOk: "", //正确选项
            });
          }
        }
      }
    },
    //修改状态下删除题目
    editDelQuest(item) {
      let that = this;
      if (item.id) {
        for (let i = 0; i < this.ruleForm.editDataArr.length; i++) {
          if (item.id == this.ruleForm.editDataArr[i].id) {
            this.$confirm("确认删除此问题吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.ruleForm.editDataArr.splice(i, 1);
              questionTitleDel({
                id:item.id,
                delFlag:1,
              }).then(res =>{
                if(res.code == 200){
                  that.$message.success('删除成功')
                }else{
                  that.$message.error(res.msg || '未知异常，请联系管理员')
                }
              })
            }).catch(() => {});
          }
        }
      } else if (item.ids) {
        for (let i = 0; i < this.ruleForm.editDataArr.length; i++) {
          if (item.ids == this.ruleForm.editDataArr[i].ids) {
             this.$confirm("确认删除此问题吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.ruleForm.editDataArr.splice(i, 1);
              that.$message.success('删除成功');
            }).catch(() => {});
          }
        }
      }
    },
    //确定按钮
    eventAddOk(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("您确认要提交配置吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let qestionArr = JSON.parse(
                JSON.stringify(this.ruleForm.questionArr)
              );
              let qestionParams = [];
              for (let i = 0; i < qestionArr.length; i++) {
                qestionParams.push({
                  type: qestionArr[i].questionType,
                  password: qestionArr[i].changeOk,
                  sort: i + 1,
                  title: qestionArr[i].queryTitle,
                  option: [
                    {
                      optionContext: qestionArr[i].changeA,
                      sort: 1, //排序
                    },
                    {
                      optionContext: qestionArr[i].changeB,
                      sort: 2, //排序
                    },
                    {
                      optionContext: qestionArr[i].changeC,
                      sort: 3, //排序
                    },
                  ],
                });
              }
              let params = {
                name: that.ruleForm.name,
                phone_authorize: that.ruleForm.isPhone,
                describe: that.ruleForm.describe,
                questions: qestionParams,
              };
              if (that.eventTitles == "新增问卷") {
                questionAdd(params).then((res) => {
                  if (res.code == 200) {
                    that.$emit("addInit");
                    that.$message.success("新增成功");
                  } else {
                    that.$messagge.error(res.msg || "未知异常，请联系管理员");
                  }
                });
              } else {
                params.id = this.rowId;
                questionEdit(params).then((res) => {
                  if (res.code == 200) {
                    that.$emit("addInit");
                    that.$message.success("修改成功");
                  } else {
                    that.$messagge.error(res.msg || "未知异常，请联系管理员");
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
    //点击新增时的事件
    eventAdd() {
      this.rowId = "";
      this.ruleForm.editDataArr = [];
      if (!this.ruleForm.questionArr.length) {
        this.ruleForm.questionArr.push({
          ids: 1,
          questionType: "1", //题型
          queryTitle: "", //标题
          changeA: "", //选项A
          changeB: "", //选项B
          changeC: "", //选项C
          changeOk: "", //正确选项
        });
      }
    },
    //活动编辑数据获取
    eventEdit(row) {
      this.rowId = row.id;
      this.ruleForm.questionArr = [];
      this.ruleForm.name = row.name;
      this.ruleForm.isPhone = row.phone_authorize;
      this.ruleForm.describe = row.describe;
      let editQuestion = [];
      for (let i = 0; i < row.questions.length; i++) {
        editQuestion.push({
          id: row.questions[i].id,
          questionType: row.questions[i].type, //题型
          queryTitle: row.questions[i].title,
          changeOk: row.questions[i].password,
        });
      }
      for (let i = 0; i < row.questions.length; i++) {
        for (let j = 0; j < row.questions[i].option.length; j++) {
          for (let m = 0; m < editQuestion.length; m++) {
            if (row.questions[i].option[j].sort == 1) {
              editQuestion[m].changeA =
                row.questions[i].option[j].optionContext;
            } else if (row.questions[i].option[j].sort == 2) {
              editQuestion[m].changeB =
                row.questions[i].option[j].optionContext;
            } else if (row.questions[i].option[j].sort == 3) {
              editQuestion[m].changeC =
                row.questions[i].option[j].optionContext;
            }
          }
        }
      }
      this.ruleForm.editDataArr = editQuestion;
      // for(let i=0; i<editQuestion.length; i++){
      //   editQuestion[i].changeA = changeA;
      // }
    },
  },
};
</script>
<style scoped lang="scss">
#question-add {
  .event-sharing {
    display: inline-block;
    margin-left: 10px;
    color: #409eff;
    padding-top: 0px;
  }
  .dan-question {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px 20px 20px 0;
  }
  .box-item {
    padding-top: 20px;
  }
  .add-btn {
    margin-top: 10px;
  }
}
</style>
<style lang="scss">
#question-add {
  .el-dialog {
    margin-top: 5vh !important;
  }
  .el-form-item__label {
    font-size: 15px;
    width: 160px !important;
  }
  .question-top {
    .el-form-item__label {
      line-height: 12px;
    }
    .question-tom {
      .el-form-item__label {
        line-height: 40px;
      }
    }
  }
  .el-form-item__content {
    margin-left: 160px !important;
  }
  .questions-red {
    font-size: 16px;
    .el-form-item__label {
      width: 110px !important;
    }
    .el-form-item__content {
      margin-left: 110px !important;
    }
  }
}
</style>