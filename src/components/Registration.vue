<template>
  <div>
    <el-row>
      <!-- 表单 -->

      <el-form ref="form" :model="form" label-width="80px">
        <!-- 表单第一行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="年龄">
              <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="出生日期">
              <el-col>
                <el-date-picker
                  type="date"
                  placeholder="请输入出生日期"
                  v-model="form.birthday"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第二行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="身份证号">
              <el-input v-model="form.identityCardID" placeholder="请输入身份证号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="18">
            <el-form-item label="家庭住址">
              <el-input v-model="form.address" placeholder="请输入家庭住址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第三行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="就诊日期">
              <el-col>
                <el-date-picker
                  type="date"
                  placeholder="请输入就诊日期"
                  v-model="form.treatmentDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="应收金额">
              <el-input
                v-model="form.charge"
                :disabled="true"
                @change="$set(form, form.charge, $event)"
                placeholder="请输入应收金额"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="结算类型">
              <el-select v-model="form.chargeType" placeholder="请选择结算类型">
                <el-option label="自付" value="自付"></el-option>
                <el-option label="医保" value="医保"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="病人身份">
              <el-select v-model="form.patientType" placeholder="请选择病人身份">
                <el-option label="市民" value="市民"></el-option>
                <el-option label="军人" value="军人"></el-option>
                <el-option label="公务员" value="公务员"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第四行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="挂号类别">
              <el-select v-model="form.registrationType" @change="rtType" placeholder="请选择挂号类别">
                <el-option label="普通" value="普通"></el-option>
                <el-option label="专家" value="专家"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="挂号科室">
              <el-select
                v-model="form.registrationOffice"
                placeholder="请选择挂号科室"
                @change="$set(form, form.getRegistrationOffice, $event)"
                @visible-change="getRegistrationOffice"
              >
                <el-option
                  v-for="(item, index) in registrationOffices"
                  :key="index"
                  :value="item.dpt_id"
                  :label="item.dpt_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="看诊医生">
              <el-select
                v-model="form.doctorID"
                placeholder="请选择看诊医生"
                @change="$set(form, form.doctorID, $event)"
                @visible-change="getDoctors"
              >
                <el-option
                  v-for="(item, index) in doctors"
                  :key="index"
                  :value="item.dct_id"
                  :label="item.dct_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="挂号来源">
              <el-select v-model="form.registrationSource" placeholder="请选择挂号来源">
                <el-option label="电话预约" value="电话预约"></el-option>
                <el-option label="微信预约" value="微信预约"></el-option>
                <el-option label="现场办理" value="现场办理"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第五行 -->
        <el-row>
          <el-col :span="6" :offset="18">
            <el-button
              style="float: right"
              type="primary"
              round
              @click="submitRegistrationInfo(form)"
            >提交挂号信息</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>

    <el-row style="marginTop: 20px">
      <!-- 挂号信息列表 -->

      <el-card shadow="hover">
        <!-- 列表头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col span="22">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >挂号信息列表</div>
            </el-col>

            <el-col span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-refresh"
                @click="refreshList()"
              >刷新列表</el-button>
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
          <el-table-column fixed="left" property="cf_id" label="病历号" width="120" align="center"></el-table-column>

          <el-table-column property="name" label="姓名" width="120" align="center"></el-table-column>

          <el-table-column property="gender" label="性别" align="center"></el-table-column>

          <el-table-column property="birthday" label="出生日期" align="center"></el-table-column>

          <el-table-column property="id_card" label="身份证号" align="center"></el-table-column>

          <el-table-column property="payment_type" label="结算类别" align="center"></el-table-column>

          <el-table-column property="status" label="挂号级别" align="center"></el-table-column>

          <el-table-column property="create_time" label="挂号日期" align="center"></el-table-column>

          <el-table-column property="clinic_date" label="就诊日期" align="center"></el-table-column>

          <el-table-column property="dpt_name" label="就诊科室" align="center"></el-table-column>
        </el-table>
      </el-card>
    </el-row>
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
        {
          cf_id: "",
          name: "",
          gender: "",
          birthday: "",
          id_card: "",
          address: "",
          payment_type: "",
          status: "",
          create_time: "",
          clinic_date: "",
          dpt_name: ""
        }
      ],
      currentRow: "",

      //表单变量
      form: {
        name: "",
        sex: "",
        age: "",

        birthday: "",
        identityCardID: "",
        address: "",

        treatmentDate: "",
        charge: "",
        chargeType: "",
        patientType: "",

        registrationType: "",

        doctorID: [],
        registrationSource: ""
      },

      list: [],

      registrationOffices: [
        {
          dpt_name: "",
          dpt_id: ""
        }
      ],
      doctors: [
        {
          dct_name: "",
          dct_id: ""
        }
      ],
      doctorType: ""
    };
  },

  mounted: function() {
    console.log("钩子函数调用");
    axios
      .post(Api.queryClinicFormUrl)
      .then(res => {
        this.reregistrationInfoListData = res.data.data;
      })
      .catch(err => {
        reject(err.data);
        console.log("部门cuowu信息：" + res);
      });
  },

  methods: {
    //表格--------------------------------------------------------
    // 表格控制当前选中行
    handleCurrentChange(row) {
      this.currentRow = row;

      console.log(this.currentRow.name);
    },

    //挂号类别
    rtType(doctorType) {
      this.doctorType = this.form.registrationType;
      if (doctorType == "普通") {
        this.form.charge = 10;
      } else {
        this.form.charge = 20;
      }
    },

    //加载科室下拉框
    getRegistrationOffice(boo) {
      //如果点击了下拉框  bool为true
      if (boo) {
        //网络加载科室
        console.log("科室下拉框可见");
        console.log("refresh");
        axios
          .get(Api.queryDepartmentsUrl)
          .then(res => {
            if (res.data.status == 200) {
              this.registrationOffices = res.data.data;
            } else {
              this.$message({
                type: "error",
                message: "加载失败，请重试！！"
              });
            }
          })
          .catch(err => {
            reject(err.data);
            console.log("部门cuowu信息：" + res);
          });
      }
    },
    //加载医生下拉框
    getDoctors(isgetDoctor) {
      if (isgetDoctor) {
        if (this.form.registrationOffice == null) {
          this.$message({
            type: "error",
            message: "请先选择科室"
          });
        } else {
          //网络加载医生  需要科室的id
          axios
            .post(
              Api.queryDoctors,
              qs.stringify(
                { dpt_id: this.form.registrationOffice },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }
              )
            )
            .then(res => {
              if (res.data.status == 200) {
                this.doctors = res.data.data;
              } else {
                this.$message({
                  type: "error",
                  message: "加载失败，请重试！！"
                });
              }
            })
            .catch(err => {
              reject(err.data);
              console.log("部门cuowu信息：" + res);
            });
        }
      }
    },

    //刷新挂号信息列表
    refreshList() {
      console.log("refresh");
      axios
        .post(Api.queryClinicFormUrl)
        .then(res => {
          console.log("所有信息：" + res.data.data[0].name);
          if (res.data.status == 200) {
            this.reregistrationInfoListData = res.data.data;
          } else {
            this.$message({
              type: "error",
              message: "加载失败，请重试！！"
            });
          }
        })
        .catch(err => {
          reject(err.data);
          console.log("部门cuowu信息：" + res);
        });
    },

    // 表单--------------------------------------------------------
    // 提交表单
    submitRegistrationInfo(form) {
      if (this.form.name != "") {
        //console.log('保单'+this.form.name);
        axios
          .post(
            Api.registerClinicFormUrl,
            qs.stringify({
              name: this.form.name,
              status: this.form.patientType,
              idCard: this.form.identityCardID,
              gender: this.form.sex,
              age: this.form.age,
              birthday: this.form.birthday,
              address: this.form.address,
              refDctId: this.form.doctorID,
              clinicDate: this.form.treatmentDate,
              price: this.form.charge,
              paymentType: this.form.chargeType,
              type: this.form.registrationType,
              source: this.form.registrationSource
            })
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "挂号成功！！"
              });
            } else {
              this.$message({
                type: "error",
                message: "挂号失败，请重试！！"
              });
              return false;
            }
          });
      } else {
        this.$message({
          type: "error",
          message: "信息不能为空！！"
        });
      }
    }
  }
};
</script>
