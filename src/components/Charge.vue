<template>
  <div>
    <!-- 单号查询框 -->
    <el-row style="margin: 0px 0px 30px 10px">
      <el-col :span="18">
        <el-input placeholder="请输入内容" v-model="selectKey.value" style="background-color: #fff;">
          <el-select
            v-model="selectKey.type"
            slot="prepend"
            :disabled="true"
            placeholder="病历号"
            style="width: 130px; "
          >
            <!-- <el-option label="病历号" value="medicalRecordID"></el-option>
            <el-option label="姓名" value="name"></el-option>-->
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <el-row>
      <!-- 表单 -->

      <el-form ref="form" :model="form" label-width="80px">
        <!-- 表单第一行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="病历编号">
              <el-input v-model="form.caseHistoryID" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="form.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder :disabled="true">
                <el-option label="男" value="male"></el-option>
                <el-option label="女" value="female"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="年龄">
              <el-input v-model="form.age" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第二行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="出生日期">
              <el-col>
                <el-date-picker
                  type="date"
                  v-model="form.birthday"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="身份证号">
              <el-input v-model="form.identityCardID" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="家庭住址">
              <el-input v-model="form.address" :disabled="true"></el-input>
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
                  v-model="form.treatmentDate"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="总计金额">
              <el-input v-model="form.totalCharge" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="结算类型">
              <el-select v-model="form.chargeType" placeholder :disabled="true">
                <el-option label="自付" value="自付"></el-option>
                <el-option label="医保" value="医保"></el-option>
                <el-option label="他付" value="他付"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="病人身份">
              <el-select v-model="form.patientType" placeholder :disabled="true">
                <el-option label="市民" value="citizen"></el-option>
                <el-option label="军人" value="soldier"></el-option>
                <el-option label="公务员" value="civilServant"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第四行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="挂号类别">
              <el-select v-model="form.registrationType" placeholder :disabled="true">
                <el-option label="普通" value="common"></el-option>
                <el-option label="专家" value="specialist"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="挂号科室">
              <el-select v-model="form.registrationOffice" placeholder :disabled="true">
                <el-option label="内科" value="physician"></el-option>
                <el-option label="外科" value="surgery"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="看诊医生">
              <el-select v-model="form.doctorID" placeholder :disabled="true">
                <el-option label="医生一" value="doctorOne"></el-option>
                <el-option label="医生二" value="doctorTwo"></el-option>
                <el-option label="医生三" value="doctorThree"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="挂号来源">
              <el-select v-model="form.registrationSource" placeholder :disabled="true">
                <el-option label="电话预约" value="phoneReserve"></el-option>
                <el-option label="微信预约" value="wechatReserve"></el-option>
                <el-option label="现场办理" value="presentDispose"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <!-- 表单第五行 -->
        <el-row style="margin-bottom:30px">
          <el-col :span="6" :offset="18">
            <el-button
              style="float: right"
              type="primary"
              round
              @click="submitRegistrationInfo(form)"
            >收费结算</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>

    <el-row>
      <!-- 本单收费项目列表 -->

      <el-card shadow="hover">
        <!-- 列表头部 -->
        <div slot="header" class="clearfix">
          <el-row style="height:40px">
            <el-col span="16">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >本号收费项目列表</div>
            </el-col>

            <!-- <el-col span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-refresh"
                @click="refreshList()"
              >刷新列表</el-button>
            </el-col>-->

            <el-col span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-plus"
                @click="drawer = true"
              >添加项目</el-button>
            </el-col>

            <el-col span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-delete"
                @click="deleteChargeProduct()"
              >删除项目</el-button>
            </el-col>

            <!-- <el-col span="2">
              <el-button
                style="float: right; padding: 3px 0 ; height:40px; text-align:center"
                type="text"
                icon="el-icon-close"
                @click="toggleSelection()"
              >取消选择</el-button>
            </el-col>-->
          </el-row>
        </div>

        <el-table
          ref="registration_info_list"
          :data="reregistrationInfoListData"
          highlight-current-row
          height="250"
          stripe
          border
          @current-change="handleCurrentChange"
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column fixed="left" type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>

          <el-table-column property="name" label="项目名称" width="120" align="center"></el-table-column>

          <el-table-column property="type" label="规格" width="120" align="center"></el-table-column>

          <el-table-column property="price" label="单价" align="center"></el-table-column>

          <el-table-column property="num" label="数量" align="center"></el-table-column>

          <el-table-column property="uage" label="服数" align="center"></el-table-column>

          <el-table-column property="totalPrice" label="总价" align="center"></el-table-column>
          <el-table-column property="note" label="备注" align="center"></el-table-column>

          <el-table-column property="department" label="执行科室" align="center"></el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <!-- 收费结算费用详情的Dialog -->
    <el-dialog title="本单号费用详情" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="chargeForm">
        <el-form-item label="总金额" label-width="20%">
          <el-input v-model="chargeForm.clinicCharge" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="折扣金额" label-width="20%">
          <el-input v-model="chargeForm.discountCharge" :disabled="false"></el-input>
        </el-form-item>

        <el-form-item label="实收金额" label-width="20%">
          <el-input v-model="chargeForm.practicalCharge" :disabled="false"></el-input>
        </el-form-item>

        <el-form-item label="支付类型" label-width="20%">
          <el-select v-model="chargeForm.chargeType" style="width: 100%" placeholder="请选择支付类型">
            <el-option label="现金" value="现金"></el-option>
            <el-option label="刷卡" value="刷卡"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
          @click.native="handleSubmitDialogClose"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加收费项目使用的抽屉 -->
    <el-drawer :visible.sync="drawer" :direction="rtl" :before-close="handleClose">
      <div>
        <h2 style="margin: 0px 0px 30px 20px">新增收费项目</h2>
      </div>

      <el-divider></el-divider>

      <el-container>
        <el-main style="height:390px">
          <el-form
            ref="productForm"
            :model="productForm"
            label-width="80px"
            style="margin:0px 30px 0px 10px"
          >
            <el-form-item label="项目名称">
              <el-input v-model="productForm.name"></el-input>
            </el-form-item>

            <el-form-item label="规格">
              <el-input v-model="productForm.specification"></el-input>
            </el-form-item>

            <el-form-item label="单价">
              <el-input v-model="productForm.unitPrice"></el-input>
            </el-form-item>

            <el-form-item label="数量">
              <el-input v-model="productForm.amount"></el-input>
            </el-form-item>

            <el-form-item label="单位">
              <el-input v-model="productForm.unit"></el-input>
            </el-form-item>

            <el-form-item label="服数">
              <el-input v-model="productForm.dosage"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="productForm.note"></el-input>
            </el-form-item>

            <el-form-item label="执行科室">
              <el-input v-model="productForm.treatmentOffice"></el-input>
            </el-form-item>
          </el-form>
        </el-main>

        <el-footer align="center">
          <el-button
            type="primary"
            style="marginTop:30px"
            @click="addChargeProduct(drawer)"
          >完成新增收费项目</el-button>
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
        //   recordNum: "2016-05-02",
        //   name: "王小虎0",
        //   sex: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   recordNum: "2016-05-04",
        //   name: "王小虎1",
        //   sex: "上海市普陀区金沙江路 1517 弄"
        // },
        // {
        //   recordNum: "2016-05-01",
        //   name: "王小虎2",
        //   sex: "上海市普陀区金沙江路 1519 弄"
        // },
        // {
        //   recordNum: "2016-05-03",
        //   name: "王小虎3",
        //   sex: "上海市普陀区金沙江路 1516 弄"
        // }
      ],
      currentRow: "",

      //表单变量
      form: {
        caseHistoryID: "",
        name: "",
        sex: "",
        age: "",

        birthday: "",
        identityCardID: "",
        address: "",

        treatmentDate: "",
        clinicCharge: "",
        chargeType: "",
        patientType: "",

        registrationType: "",
        registrationOffice: "",
        doctorID: "",
        registrationSource: "",

        isBuyMedicalRecord: false
      },

      // 查询信息
      selectKey: {
        type: "",
        value: ""
      },

      // 添加收费项目侧边栏是否可见
      drawer: false,

      // 新增收费项目表单
      productForm: {
        name: "",
        specification: "",
        unitPrice: "",
        amount: "",
        unit: "",
        dosage: "",
        note: "",
        treatmentOffice: ""
      },

      // 收费信息Dialog是否可见
      dialogFormVisible: false,

      chargeForm: {
        clinicCharge: 0.0,
        discountCharge: 0.0,
        //practicalCharge: "",
        chargeType: ""
      },
      selectedMedications: []
    };
  },
  computed: {
    // change value
    practicalCharge: {
      get: function() {
        console.log("practicalCharge:get:");
        console.log(
          "result: " +
            this.chargeForm.clinicCharge -
            this.chargeForm.discountCharge
        );
        return this.chargeForm.clinicCharge - this.chargeForm.discountCharge;
      },
      set: function(val) {
        console.log("practicalCharge:set:val=" + val);
        this.chargeForm.practicalCharge = this.chargeForm.clinicCharge - val;
      }
    }
  },
  watch: {
    // discountCharge: function(newVal, oldVal) {
    //   console.log("discountCharge changed.");
    // },
    // practicalCharge: function(newVal, oldVal) {
    //   console.log("practicalCharge changed.");
    // }
  },
  methods: {
    //表格--------------------------------------------------------
    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;

      console.log(this.currentRow.name);
    },

    // 删除收费项目
    deleteChargeProduct() {
      //this.$$refs.registration_info_list.clearSelection();
      this.reregistrationInfoListData.forEach((column, index) => {
        console.log(column);
        console.log(index);
      });

      // 删除
      this.reregistrationInfoListData.pop(this.selectedMedications);
      // console.log(
      //   "current add medications: " + this.reregistrationInfoListData
      // );
      //this.reregistrationInfoListData.this.$refs.registration_info_list.clearSelection();
    },
    handleSelectionChange(val) {
      console.log("func: handleSelectionChange");
      //console.log(val);
      this.selectedMedications = val;
    },

    // 取消选择
    toggleSelection() {
      this.$refs.registration_info_list.clearSelection();
      console.log("cancel selection");
    },

    refreshList() {
      console.log("refresh");
    },

    // 侧边栏 ——————————————————————————————————————————————————————
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    // 提交新增收费项目
    addChargeProduct(drawer) {
      if (
        this.productForm.name == "" ||
        this.productForm.specification == "" ||
        this.productForm.unitPrice == "" ||
        this.productForm.amount == "" ||
        this.productForm.unit == "" ||
        this.productForm.dosage == "" ||
        this.productForm.note == "" ||
        this.productForm.treatmentOffice == ""
      ) {
        console.log(this.productForm);
        this.$message({
          showClose: true,
          message: "请检查输入内容：输入内容不能为空",
          type: "error"
        });
      } else {
        this.$confirm("确认添加此项目？")
          .then(_ => {
            // handle new medication item

            let newData = {
              //recordNum: this.productForm.name,
              /*
              name: this.productForm.name,
              type: this.productForm.specification,
              price: this.productForm.unitPrice,
              num: this.productForm.unit,
              uage: this.productForm.dosage,
              //totalPrice: this.productForm.unitPrice * this.productForm.unit,
              department: this.productForm.treatmentOffice
              */
              // name: this.productForm.name,
              // specification: this.productForm.specification,
              // unitPrice: this.productForm.unitPrice,
              // unit: this.productForm.unit,
              // dosage: this.productForm.dosage,
              // totalPrice: this.productForm.unitPrice * this.productForm.unit,
              // treatmentOffice: this.productForm.treatmentOffice

              name: this.productForm.name,
              type: this.productForm.specification,
              price: this.productForm.unitPrice,
              num: this.productForm.unit,
              uage: this.productForm.dosage,
              totalPrice: this.productForm.unitPrice * this.productForm.unit,
              note: this.productForm.note,
              department: this.productForm.treatmentOffice
            };
            // add to list
            this.reregistrationInfoListData.push(newData);
            //clear
            // this.productForm.name == "";
            // this.productForm.specification == "";
            // this.productForm.unitPrice == "";
            // this.productForm.amount == "";
            // this.productForm.unit == "";
            // this.productForm.dosage == "";
            // this.productForm.note == "";
            // this.productForm.treatmentOffice == "";
            this.productForm.forEach(val => {
              val = "";
            });
            this.drawer = false;
            done();
          })
          .catch(_ => {});
      }
    },

    // 表单--------------------------------------------------------
    // 收费结算
    submitRegistrationInfo(form) {
      this.dialogFormVisible = true;
      // 算钱
      let totalAmount = 0;
      this.reregistrationInfoListData.forEach((column, index) => {
        console.log(column);
        console.log(index);
        totalAmount += column.totalPrice;
      });
      //alert(totalAmount);
      // binding
      this.chargeForm.clinicCharge = totalAmount;
    },

    // 提交关闭之前 点击确认之后
    handleSubmitDialogClose() {
      //alert();
      // post data to server
      //a0d4d0a82d127e6c3ddb7cbe09e159d9
      /*
      {
        "refCfId":"a26e4ba00e4b6b4c24926266d78e023e",
        "medications":[
          {"name":"无敌中药","type":"10ml","price":20,"num":3,"uage":"注射","note":"每周一次","department":"注射科"},
          {"name":"破伤风","type":"10ml","price":30,"num":1,"uage":"注射","note":null,"department":"注射科"},
          {"name":"脑残片","type":"10颗/盒","price":50,"num":100,"uage":"口服:3颗/日","note":"心理安慰剂","department":null}],
          "paymentType":"现金",
          "accountType":"自付",
          "realAmount":100
          }

      */
      console.log("this.selectKey.value: " + this.selectKey.value);

      let postData = {
        refCfId: this.selectKey.value,
        medications: [],
        paymentType: this.chargeForm.chargeType,
        accountType: this.form.chargeType,
        realAmount:
          this.chargeForm.clinicCharge - this.chargeForm.discountCharge
      };

      // let medication = {
      //   name:"",
      //   type:"",
      //   price:"",
      //   num: "",
      //   uage: "",
      //   note:"",
      //   department:""
      // }

      //add
      this.reregistrationInfoListData.forEach((column, index) => {
        postData.medications.push(column);
      });

      postData.medications.forEach(item => {
        console.log(item);
      });

      console.log("postData:" + JSON.stringify(postData));
      //console.log("handled: " + qs.stringify({ data: qs.stringify(postData) }));
      //let dataStr = "{" + qs.stringify(postData) + "}";
      // { data: dataStr },
      console.log("fuck here");
      axios
        .post(
          Api.createPrescriptionUrl,
          qs.stringify(
            { data: JSON.stringify(postData) },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
        )
        .then(res => {
          console.log(res.data);
          if (res.data.status != 200) {
            if (res.data.status == 403) {
              this.$message({
                showClose: true,
                message: "登陆失效，请重新登陆。",
                type: "error"
              });
            } else {
              this.$message({
                showClose: true,
                message: "未知错误",
                type: "error"
              });
            }
          } else {
            this.$message({
              showClose: true,
              message: "保存成功",
              type: "success"
            });
          }
        });
    },

    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      //console.log(selectKey);
      console.log("cf_id: " + this.selectKey.value);

      if (this.selectKey.value == "") {
        this.$message({
          showClose: true,
          message: "请输入病历号",
          type: "error"
        });
      } else {
        // http request
        // 23773a6e6ea1019b871a480305fbd6d5
        // axios.defaults.withCredentials = true;
        // console.log(axios.defaults.withCredentials);
        axios
          .post(
            Api.searchClinicFormUrl,
            qs.stringify(
              { key: this.selectKey.value },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              }
            )
          )
          .then(res => {
            console.log(res.data);
            if (res.data.status != 200) {
              if (res.data.status == 403) {
                this.$message({
                  showClose: true,
                  message: "登陆失效，请重新登陆。",
                  type: "error"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "病历不存在",
                  type: "error"
                });
              }
            } else {
              if (res.data.data.length == 0) {
                this.$message({
                  showClose: true,
                  message: "病历不存在",
                  type: "error"
                });
              } else {
                this.form.caseHistoryID = res.data.data[0].cf_id;
                this.form.name = res.data.data[0].name;
                this.form.sex = res.data.data[0].gender;
                this.form.age = res.data.data[0].age;
                this.form.birthday = res.data.data[0].birthday;
                this.form.identityCardID = res.data.data[0].id_card;
                this.form.address = res.data.data[0].address;
                this.form.treatmentDate = res.data.data[0].clinic_date;
                this.form.totalCharge = res.data.data[0].price;
                this.form.chargeType = res.data.data[0].payment_type;
                this.form.patientType = res.data.data[0].status;
                this.form.registrationSource = res.data.data[0].source;
                this.form.registrationOffice = res.data.data[0].dpt_name;
                this.form.doctorID = res.data.data[0].dct_name;
                this.form.registrationType = res.data.data[0].level;
              }
            }
          });

        //
      }
    }
  }
};
</script>
