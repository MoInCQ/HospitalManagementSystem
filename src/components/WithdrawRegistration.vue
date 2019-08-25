<template>
  <div>
    <!-- 单号查询框 -->
    <el-row style="margin: 0px 0px 30px 10px">
      <el-col :span="18">
        <el-input placeholder="请输入内容" v-model="selectKey.value" style="background-color: #fff;">
          <el-select
            v-model="selectKey.type"
            slot="prepend"
            placeholder="查询类型"
            style="width: 130px; "
          >
            <el-option label="病历号" value="cf_id"></el-option>
            <el-option label="身份证号" value="id_card"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <el-row>
      <!-- 挂号信息列表 -->

      <el-card shadow="hover">
        <!-- 列表头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col :span="18">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >挂号信息列表</div>
            </el-col>

            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-refresh"
                @click="refreshList()"
              >刷新列表</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-delete"
                @click="deleteRegistrationInfo()"
              >批量退号</el-button>
            </el-col>

            <el-col :span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-close"
                @click="toggleSelection()"
              >取消选择</el-button>
            </el-col>
          </el-row>
        </div>

        <el-table
          ref="registration_info_list"
          :data="reregistrationInfoListData"
          highlight-current-row
          stripe
          border
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column fixed="left" type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>

          <el-table-column property="cf_id" label="病历号" width="120" align="center"></el-table-column>

          <el-table-column property="name" label="姓名" width="120" align="center"></el-table-column>

          <el-table-column property="gender" label="性别" align="center"></el-table-column>

          <el-table-column property="id_card" label="身份证号" align="center"></el-table-column>

          <el-table-column property="create_time" label="挂号日期" align="center"></el-table-column>

          <el-table-column property="clinic_date" label="就诊日期" align="center"></el-table-column>
          <!-- 后端返回是数据中没有？ -->
          <el-table-column property="treatment_state" label="就诊状态" align="center"></el-table-column>

          <el-table-column property="dpt_name" label="就诊科室" align="center"></el-table-column>
          <!-- 后端返回是数据中没有？ -->
          <el-table-column property="is_cancelled" label="挂号状态" align="center"></el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <!-- 根据“病历号”查询时及查看详情时使用的抽屉 -->
    <!-- <el-drawer :visible.sync="drawer" :direction="rtl" :before-close="handleClose"> -->
    <el-drawer :visible.sync="drawer" :before-close="handleClose">
      <div>
        <h2 style="margin: 0px 0px 30px 20px">挂号信息</h2>
      </div>

      <el-divider></el-divider>

      <el-container>
        <el-main style="height:390px">
          <el-form
            ref="registrationForm"
            :model="registrationForm"
            label-width="80px"
            style="margin:0px 30px 0px 10px"
          >
            <el-form-item label="病历编号">
              <el-input v-model="registrationForm.cf_id" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="姓名">
              <el-input v-model="registrationForm.name" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="性别">
              <el-select v-model="registrationForm.gender" placeholder :disabled="true">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="年龄">
              <el-input v-model="registrationForm.age" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="出生日期">
              <el-col>
                <el-date-picker
                  type="date"
                  v-model="registrationForm.birthday"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="身份证号">
              <el-input v-model="registrationForm.id_card" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="家庭住址">
              <el-input v-model="registrationForm.address" :disabled="true"></el-input>
            </el-form-item>

            <!-- 需后台生成 -->
            <el-form-item label="挂号日期">
              <el-col>
                <el-date-picker
                  type="date"
                  v-model="registrationForm.create_time"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="就诊日期">
              <el-col>
                <el-date-picker
                  type="date"
                  v-model="registrationForm.clinic_date"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="应收金额">
              <el-input v-model="registrationForm.price" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="结算类型">
              <el-select v-model="registrationForm.payment_type" placeholder :disabled="true">
                <el-option label="自付" value="自付"></el-option>
                <el-option label="医保" value="医保"></el-option>
                <el-option label="他付" value="他付"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="病人身份">
              <el-select v-model="registrationForm.status" placeholder :disabled="true">
                <el-option label="市民" value="市民"></el-option>
                <el-option label="军人" value="军人"></el-option>
                <el-option label="公务员" value="公务员"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="挂号类别">
              <el-select v-model="registrationForm.type" placeholder :disabled="true">
                <el-option label="普通" value="普通"></el-option>
                <el-option label="专家" value="专家"></el-option>
              </el-select>
            </el-form-item>

            <!-- 需后台生成 -->
            <el-form-item label="就诊状态">
              <el-select
                v-model="registrationForm.treatment_state"
                @change="
                  $set(
                    registrationForm,
                    registrationForm.treatment_state,
                    $event
                  )
                "
                placeholder
                :disabled="true"
              >
                <el-option label="已诊" value="已诊"></el-option>
                <el-option label="待诊断" value="待诊断"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="就诊科室">
              <el-select v-model="registrationForm.dpt_name" placeholder :disabled="true">
                <el-option label="内科" value="内科"></el-option>
                <el-option label="外科" value="外科"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="看诊医生">
              <el-select v-model="registrationForm.dct_name" placeholder :disabled="true">
                <el-option label="医生一" value="doctorOne"></el-option>
                <el-option label="医生二" value="doctorTwo"></el-option>
                <el-option label="医生三" value="doctorThree"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="挂号来源">
              <el-select v-model="registrationForm.source" placeholder :disabled="true">
                <el-option label="电话预约" value="phoneReserve"></el-option>
                <el-option label="微信预约" value="wechatReserve"></el-option>
                <el-option label="现场办理" value="presentDispose"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="挂号状态">
              <el-select
                v-model="registrationForm.is_cancelled"
                @change="
                  $set(registrationForm, registrationForm.is_cancelled, $event)
                "
                placeholder
                :disabled="true"
              >
                <el-option label="已退" value="已退"></el-option>
                <el-option label="未退号" value="未退号"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-main>

        <el-footer align="center">
          <el-button
            type="primary"
            style="marginTop:30px"
            @click="withdrawThisRegistration(drawer)"
          >退办此号</el-button>
        </el-footer>
      </el-container>
    </el-drawer>
  </div>
</template>

<style>
/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row > td {
  background-color: #cdcdcd !important;
}
</style>

<script>
import axios from "axios";
import qs from "qs";
import Api from "../http/api";
axios.defaults.withCredentials = true;

export default {
  data() {
    return {
      //表格内容
      reregistrationInfoListData: [
        // {
        //   cf_id: "",
        //   name: "",
        //   gender: "",
        //   id_card: "",
        //   create_time: "",
        //   clinic_date: "",
        //   payment_type: "",
        //   dpt_name: "",
        //   dct_name: "",
        //   source: "",
        //   //payment_state: "",
        //   treatment_state: "",
        //   is_cancelled: ""
        // }
      ],
      currentRow: "",

      // 表单变量
      registrationForm: {
        cf_id: "",
        name: "",
        gender: "",
        birthday: "",
        id_card: "",
        address: "",
        create_time: "",
        clinic_date: "",
        price: "",
        payment_type: "",
        //身份
        status: "",
        //挂号类别 专家
        type: "",
        dpt_name: "",
        dct_name: "",
        source: "",
        //chargeState: "已收费",
        treatment_state: "未就诊",
        is_cancelled: ""
      },

      // 查询类型
      selectKey: {
        type: "",
        value: ""
      },

      // 挂号信息侧边栏是否可见
      drawer: false,
      // selectedClinics
      selectedClinics: []
    };
  },

  methods: {
    //表格--------------------------------------------------------
    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;
      this.registrationForm = this.currentRow;
      this.drawer = true;
    },

    // 取消选择
    toggleSelection() {
      this.$refs.registration_info_list.clearSelection();
      console.log("cancel selection");
    },

    refreshList() {
      console.log("refresh");
      console.log(
        this.selectKey.type == "id_card",
        this.selectKey.value !== ""
      );
      if (this.selectKey.type == "id_card" && this.selectKey.value !== "") {
        axios
          .post(
            Api.searchClinicFormUrl,
            qs.stringify(
              { key: this.selectKey.value },
              {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
              }
            )
          )
          .then(res => {
            console.log("res=>", res.data.status);
            if (res.data.status == 200 && res.data.data.length > 0) {
              this.reregistrationInfoListData = res.data.data;
            } else {
              this.$message({
                type: "error",
                message: "请输入正确的身份证号码！！"
              });
            }
          });
      }
    },

    // 表格批量删除 fake
    async deleteRegistrationInfo() {
      this.selectedClinics = this.$refs.registration_info_list.selection;
      console.log(JSON.stringify(this.selectedClinics));
      // post
      let cfIds = "";
      this.selectedClinics.forEach(item => {
        cfIds += ":" + item.cf_id;
      });
      cfIds = cfIds.substring(1, cfIds.length);
      // post
      axios
        .post(
          Api.retreatClinicFormsUrl,
          qs.stringify(
            { cf_ids: cfIds },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
        )
        .then(res => {
          if (res.data.status == 200) {
            for (var i = 0; res.data.data.length++; i++) {
              if (this.reregistrationInfoListData[i].is_cancelled == "未退号") {
                this.reregistrationInfoListData[i].payment_state = "已收费";
                this.reregistrationInfoListData[i].treatment_state = "未就诊";
              }
            }
            this.$message({
              type: "success",
              message: "退号成功！！"
            });
          } else {
            this.$message({
              type: "error",
              message: "退号失败，请重试！！"
            });
          }
        });
      // refresh
      this.$options.methods.refreshList();
    },

    // 侧边栏——————————————————————————————————————————————————————
    // 退掉此号
    withdrawThisRegistration(drawer) {
      this.$confirm("确认退掉此号？")
        .then(_ => {
          this.drawer = false;
          axios
            .post(
              Api.retreatSingleClinicFormUrl,
              qs.stringify(
                { cf_id: this.registrationForm.cf_id },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }
              )
            )
            .then(res => {
              if (res.data.status == 200) {
                this.$message({
                  type: "success",
                  message: "退号成功！！"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "退号失败，请重试！！"
                });
              }
            });
        })
        .catch(_ => {});
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    // 表单--------------------------------------------------------
    // 提交表单
    submitWithdrawRegistrationInfo(form) {
      console.log(form);
    },

    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey);
      if (this.selectKey.type == "cf_id" && this.selectKey.value != "") {
        //是病历号 加载侧边栏的详细情况
        axios
          .post(
            Api.searchClinicFormUrl,
            qs.stringify(
              { key: this.selectKey.value },
              {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
              }
            )
          )
          .then(res => {
            if (res.data.status == 200 && res.data.data.length > 0) {
              this.drawer = true;
              this.registrationForm = res.data.data[0];

              if (this.registrationForm.is_cancelled == "未退号") {
                this.registrationForm.payment_state = "已收费";
                this.registrationForm.treatment_state = "未就诊";
              }
            } else {
              this.$message({
                type: "error",
                message: "请输入正确的病历号！！"
              });
            }
          });
      } else if (selectKey.type == "id_card" && this.selectKey.value != "") {
        //是身份证号 加载下方的表格数据
        axios
          .post(
            Api.searchClinicFormUrl,
            qs.stringify(
              { key: this.selectKey.value },
              {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
              }
            )
          )
          .then(res => {
            console.log("res=>", res.data.status);
            if (res.data.status == 200 && res.data.data.length > 0) {
              this.reregistrationInfoListData = res.data.data;
              for (var i = 0; res.data.data.length++; i++) {
                if (
                  this.reregistrationInfoListData[i].is_cancelled == "未退号"
                ) {
                  this.reregistrationInfoListData[i].payment_state = "已收费";
                  this.reregistrationInfoListData[i].treatment_state = "未就诊";
                }
              }
            } else {
              this.$message({
                type: "error",
                message: "请输入正确的身份证号码！！"
              });
            }
          });
      } else {
        this.$message({
          type: "error",
          message: "请输入病历号或者身份证号码！！"
        });
      }
    }
  }
};
</script>
