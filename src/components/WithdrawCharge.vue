<template>
  <div>
    <!-- 单号查询框 -->
    <el-row style="margin: 0px 0px 30px 10px">
      <el-col :span="18">
        <el-input placeholder="请输入内容" v-model="selectKey.value" style="background-color: #fff;">
          <el-select
            v-model="selectKey.type"
            slot="prepend"
            placeholder="病历号"
            :disabled="true"
            style="width: 130px; "
          ></el-select>
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
            <el-form-item label="身份证号">
              <el-input v-model="form.identityCardID" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="结算类型">
              <el-select v-model="form.chargeType" placeholder :disabled="true">
                <el-option label="自付" value="selfPay"></el-option>
                <el-option label="医保" value="healthInsurance"></el-option>
                <el-option label="他付" value="othersPay"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第二行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="总计金额">
              <el-input v-model="form.totalPrice" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="实付金额">
              <el-input v-model="form.practicalCharge" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="现金支付">
              <el-input v-model="form.chargeByCash" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="账户支付">
              <el-input v-model="form.chargeByAccount" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 表单第三行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="报销金额">
              <el-input v-model="form.chargeByInsurance" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <!-- 表单第四行 -->
        <el-row style="margin-bottom:30px">
          <el-col :span="6" :offset="18">
            <el-button
              style="float: right"
              type="primary"
              round
              @click="submitWithdrawchargeInfo(form)"
            >全额退费</el-button>
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
            <el-col :span="18">
              <div
                style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px"
              >本号已收费用明细</div>
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
                @click="deleteChargeProduct()"
              >批量退款</el-button>
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
          :data="registrationInfoListData"
          highlight-current-row
          stripe
          border
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column fixed="left" type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>

          <el-table-column property="name" label="项目名称" width="120" align="center"></el-table-column>

          <el-table-column property="type" label="规格" width="120" align="center"></el-table-column>

          <el-table-column property="price" label="单价" align="center"></el-table-column>

          <el-table-column property="num" label="数量" align="center"></el-table-column>

          <el-table-column property="uage" label="单位" align="center"></el-table-column>

          <el-table-column property="note" label="服数" align="center"></el-table-column>

          <el-table-column property="department" label="执行科室" align="center"></el-table-column>
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
      registrationInfoListData: [
        {
          name: "",
          type: "",
          price: "",
          num: "",
          uage: "",
          note: "",
          department: ""
        }
      ],
      currentRow: "",

      //表单变量
      form: {
        caseHistoryID: "",
        name: "",
        identityCardID: "",
        chargeType: "",

        totalPrice: "",
        practicalCharge: "",
        chargeByCash: "",
        chargeByAccount: "",

        chargeByInsurance: "",

        // 处方单号
        prescriptionID: ""
      },

      // 查询信息
      selectKey: {
        type: "",
        value: ""
      },
      // 选中的药物
      selectedMedications: []
    };
  },
  methods: {
    //表格--------------------------------------------------------
    // 表格控制当前选中行
    handleCurrentChange(val) {
      this.currentRow = val;
      this.selectedMedications.push(val);
      //this.selectedMedications.val;
    },

    async postDataToSever(mdc_id) {
      await axios
        .post(
          Api.removeMedicationUrl,
          qs.stringify(
            {
              cf_id: this.selectKey.value,
              mdc_id: mdc_id
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
        )
        .then(
          res => {
            this.registrationInfoListData = res.data.data;
          },
          err => {
            console.log(err);
          }
        )
        .catch(err => {
          console.log(err);
        });
    },

    // 批量退款 // 判断选中的
    async deleteChargeProduct() {
      // 先表面删除
      this.selectedMedications = this.$refs.registration_info_list.selection;
      console.log(
        "this.selectedMedications.length: " + this.selectedMedications.length
      );
      const selectedOnes = this.selectedMedications;
      if (selectedOnes) {
        selectedOnes.forEach((column, index) => {
          this.registrationInfoListData.forEach((c, i) => {
            if (column.name === c.name) {
              this.registrationInfoListData.splice(i, 1);
              //this.registrationInfoListData.pop(c);
            }
          });
        });
      }

      //post data
      //a0d4d0a82d127e6c3ddb7cbe09e159d9
      let mdcIds = "";
      console.log(
        "selectedMedications: " + JSON.stringify(this.selectedMedications)
      );
      this.selectedMedications.forEach(item => {
        console.log(item.mdc_id);
        mdcIds += ":" + item.mdc_id;
      });
      mdcIds = mdcIds.substring(1, mdcIds.length);
      console.log("mdcIds: " + mdcIds);

      // post

      axios
        .post(
          Api.removeMedicationUrl,
          qs.stringify(
            {
              cf_id: this.selectKey.value,
              mdc_ids: mdcIds
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
        )
        .then(
          res => {
            this.registrationInfoListData = res.data.data;
          },
          err => {
            console.log(err);
          }
        )
        .catch(err => {
          console.log(err);
        });

      //refresh list
      this.$options.methods.refreshList();

      // axios
      //   .post(
      //     Api.removeMedicationUrl,
      //     qs.stringify(
      //       {
      //         cf_id: this.selectKey.value,
      //         mdc_id: this
      //       },
      //       {
      //         headers: {
      //           "Content-Type": "application/x-www-form-urlencoded"
      //         }
      //       }
      //     )
      //   )
      //   .then(
      //     res => {
      //       this.registrationInfoListData = res.data.data;
      //     },
      //     err => {
      //       console.log(err);
      //     }
      //   )
      //   .catch(err => {
      //     console.log(err);
      //   });
      // refresh
    },

    // 刷新收费项目
    refreshList() {
      console.log("refresh");

      axios
        .post(
          Api.queryMedicationsUrl,
          qs.stringify(
            {
              cf_id: this.selectKey.value
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
        )

        .then(
          res => {
            this.registrationInfoListData = res.data.data;
          },

          err => {
            console.log(err);
          }
        )
        .catch(err => {
          console.log(err);
        });
    },

    // 取消选择
    toggleSelection() {
      this.$refs.registration_info_list.clearSelection();
      console.log("cancel selection");
    },

    // 表单--------------------------------------------------------
    // 提交表单
    submitWithdrawchargeInfo(form) {
      //post
      axios
        .post(
          Api.fullRefundPrescriptionUrl,
          qs.stringify(
            {
              cf_id: this.selectKey.value
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
        )

        .then(
          res => {
            //this.registrationInfoListData = res.data.data;
            if (res.data.status == 200) {
              this.$message({
                showClose: true,
                message: "退款成功",
                type: "success"
              });
            }
          },

          err => {
            console.log(err);
          }
        )
        .catch(err => {
          console.log(err);
        });
    },

    // 查询框-------------------------------------------------------
    selectByPrimaryKey(selectKey) {
      console.log(selectKey.value);

      // 查询
      axios
        .post(
          Api.searchPrescriptionUrl,
          qs.stringify(
            {
              cf_id: this.selectKey.value
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
        )

        .then(
          res => {
            console.log(res);
            this.form.caseHistoryID = res.data.data.cf_id;
            this.form.name = res.data.data.name;
            this.form.identityCardID = res.data.data.id_card;
            this.form.chargeType = res.data.data.account_type;
            this.form.totalPrice = res.data.data.total_amount;
            this.form.practicalCharge = res.data.data.real_amount;

            if (res.data.data.payment_type == "现金") {
              this.form.chargeByCash = res.data.data.real_amount;
              this.form.chargeByAccount = 0;
            } else {
              this.form.chargeByCash = 0;
              this.form.chargeByAccount = res.data.data.real_amount;
            }

            this.form.chargeByInsurance =
              res.data.data.total_amount - res.data.data.real_amount;

            this.form.prescriptionID = res.data.data.psp_id;

            console.log(this.form.prescriptionID);
          },

          err => {
            reject(err);
          }
        )

        .catch(err => {
          reject(err);
        });

      this.$options.methods.refreshList.bind(this)();
    }
  }
};
</script>
