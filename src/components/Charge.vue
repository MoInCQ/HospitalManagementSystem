<template>
    <div>

      <!-- 单号查询框 -->
      <el-row style="margin: 0px 0px 30px 10px">
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="selectKey.value"  style="background-color: #fff;">
            <el-select v-model="selectKey.type" slot="prepend" :disabled="true" placeholder="病历号" style="width: 130px; ">
              <!-- <el-option label="病历号" value="medicalRecordID"></el-option>
              <el-option label="姓名" value="name"></el-option> -->

            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
          </el-input>

        </el-col>
          
      </el-row>

      <el-divider></el-divider>

      <el-row  >
                <!-- 表单 -->

                <el-form ref="form" :model="form" label-width="80px" >

                  <!-- 表单第一行 -->
                  <el-row >
                    <el-col :span="6">
                      <el-form-item label="病历编号" >
                        <el-input v-model="form.caseHistoryID" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    
                    <el-col :span="6">
                      <el-form-item label="姓名" >
                        <el-input v-model="form.name"  :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>

      
                    <el-col :span="6">
                      <el-form-item label="性别">
                        <el-select v-model="form.sex" placeholder="" :disabled="true">
                          <el-option label="男" value="male"></el-option>
                          <el-option label="女" value="female"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col> 

                    <el-col :span="6">
                      <el-form-item label="年龄">
                        <el-input v-model="form.age"  :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    
                  </el-row>


                  <!-- 表单第二行 -->
                  <el-row>

                    <el-col :span="6" >
                      <el-form-item label="出生日期">
                        <el-col >
                          <el-date-picker type="date"  v-model="form.birthday" style="width: 100%;" :disabled="true"></el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>


                    <el-col :span="6">
                      <el-form-item label="身份证号">
                        <el-input v-model="form.identityCardID"  :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="家庭住址">
                        <el-input v-model="form.address"  :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    
                  </el-row>
                  

                  <!-- 表单第三行 -->
                  <el-row >
                    <el-col :span="6">
                      <el-form-item label="就诊日期">
                        <el-col >
                          <el-date-picker type="date"  v-model="form.treatmentDate" style="width: 100%;" :disabled="true"></el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    
                    <el-col :span="6">
                      <el-form-item label="总计金额">
                        <el-input v-model="form.totalCharge"  :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>


                    <el-col :span="6">
                      <el-form-item label="结算类型">
                        <el-select v-model="form.chargeType" placeholder="" :disabled="true">
                          <el-option label="自付" value="selfPay"></el-option>
                          <el-option label="医保" value="healthInsurance"></el-option>
                          <el-option label="他付" value="othersPay"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col> 

                    <el-col :span="6">
                      <el-form-item label="病人身份">
                        <el-select v-model="form.patientType" placeholder="" :disabled="true">
                          <el-option label="市民" value="citizen"></el-option>
                          <el-option label="军人" value="soldier"></el-option>
                          <el-option label="公务员" value="civilServant"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  

                  <!-- 表单第四行 -->
                  <el-row >
                    
                  
                    <el-col :span="6">
                      <el-form-item label="挂号类别">
                         <el-select v-model="form.registrationType" placeholder="" :disabled="true">
                          <el-option label="普通" value="common"></el-option>
                          <el-option label="专家" value="specialist"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

      
                    <el-col :span="6">
                      <el-form-item label="挂号科室">
                        <el-select v-model="form.registrationOffice" placeholder="" :disabled="true">
                          <el-option label="内科" value="physician"></el-option>
                          <el-option label="外科" value="surgery"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col> 

                    <el-col :span="6">
                      <el-form-item label="看诊医生">
                        <el-select v-model="form.doctorID" placeholder="" :disabled="true">
                          <el-option label="医生一" value="doctorOne"></el-option>
                          <el-option label="医生二" value="doctorTwo"></el-option>
                          <el-option label="医生三" value="doctorThree"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col> 


                    <el-col :span="6">
                      <el-form-item label="挂号来源">
                        <el-select v-model="form.registrationSource" placeholder="" :disabled="true">
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
                      <el-button style="float: right" type="primary" round 
                          @click="submitRegistrationInfo(form)">收费结算</el-button> 
                    </el-col>
                  
                  </el-row>
                  


                </el-form>



      </el-row >
      
      
      <el-row >

          
              <!-- 本单收费项目列表 -->
              
                    <el-card shadow="hover" >

                        <!-- 列表头部 -->
                        <div slot="header" class="clearfix">
                            <el-row style="height:40px">
                              <el-col span="16">
                                <div style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px" >本号收费项目列表</div>
                              </el-col>

                              <el-col span="2" >

                                <el-button 
                                  style="float: right; padding: 3px 0 ; height:40px; text-align:center" 
                                  type="text"
                                  icon="el-icon-refresh"
                                  @click="refreshList()" >刷新列表</el-button>

                              </el-col>


                              <el-col span="2" >

                                <el-button 
                                  style="float: right; padding: 3px 0 ; height:40px; text-align:center" 
                                  type="text"
                                  icon="el-icon-plus"
                                  @click="drawer = true" >添加项目</el-button>

                              </el-col>

                              <el-col span="2" >

                                <el-button 
                                  style="float: right; padding: 3px 0 ; height:40px; text-align:center" 
                                  type="text"
                                  icon="el-icon-delete"
                                  @click="deleteChargeProduct()" >删除项目</el-button>

                              </el-col>




                              <el-col span="2" >
                                <el-button 
                                  style="float: right; padding: 3px 0 ; height:40px; text-align:center" 
                                  type="text"
                                  icon="el-icon-close"
                                  @click="toggleSelection()" >取消选择</el-button>

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
                          style="width: 100%">

                          <el-table-column
                            fixed="left"
                            type="selection"
                            width="55">
                          </el-table-column>

                          <el-table-column
                            type="index"
                            label="序号"
                            width="50"
                            align="center">
                          </el-table-column>
                          
                          <el-table-column
                            property="record_num"
                            label="项目名称"
                            width="120"
                            align="center">
                          </el-table-column>
                          
                          <el-table-column
                            property="name"
                            label="规格"
                            width="120"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="sex"
                            label="单价"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="birthday"
                            label="数量"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="identity_id"
                            label="单位"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="invoice_id"
                            label="服数"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="payment_category"
                            label="金额"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="registration_rank"
                            label="执行科室"
                            align="center">
                          </el-table-column>
                          
                        </el-table>
                  
                
                      </el-card>     

      </el-row>

      <!-- 收费结算费用详情的Dialog -->
      <el-dialog title="本单号费用详情" :visible.sync="dialogFormVisible" width="30%">

          <el-form :model="chargeForm">

            <el-form-item label="总计金额" label-width="20%" >
              <el-input v-model="chargeForm.totalCharge" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="折扣金额" label-width="20%" >
              <el-input v-model="chargeForm.discountCharge" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="实收金额" label-width="20%" >
              <el-input v-model="chargeForm.practicalCharge" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="支付类型" label-width="20%">
               <el-select v-model="chargeForm.chargeType" style="width: 100%" placeholder="请选择支付类型">
                  <el-option label="现金" value="chargeInCash"></el-option>
                  <el-option label="刷卡" value="chargeWithCard"></el-option>
               </el-select>
            </el-form-item>

          </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>

      </el-dialog>


      <!-- 添加收费项目使用的抽屉 -->
      <el-drawer
          
          :visible.sync="drawer"
          :direction="rtl"
          :before-close="handleClose" >
          
          <div>
            <h2 style="margin: 0px 0px 30px 20px">新增收费项目</h2>

          </div>

          <el-divider></el-divider>

        

            <el-container >
              <el-main style="height:390px">

                  <el-form ref="productForm" :model="productForm" label-width="80px" style="margin:0px 30px 0px 10px">
              
                  <el-form-item label="项目名称">
                    <el-input v-model="productForm.name"></el-input>
                  </el-form-item>

                  <el-form-item label="规格" >
                    <el-input v-model="productForm.specification"></el-input>
                  </el-form-item>

                  <el-form-item label="单价" >
                    <el-input v-model="productForm.unitPrice"></el-input>
                  </el-form-item>

                  <el-form-item label="数量" >
                    <el-input v-model="productForm.amount"></el-input>
                  </el-form-item>

                  <el-form-item label="单位" >
                    <el-input v-model="productForm.unit"></el-input>
                  </el-form-item>

                  <el-form-item label="服数" >
                    <el-input v-model="productForm.dosage"></el-input>
                  </el-form-item>

                  <el-form-item label="总计金额" >
                    <el-input v-model="productForm.totalPrice"></el-input>
                  </el-form-item>

                  <el-form-item label="执行科室" >
                    <el-input v-model="productForm.treatmentOffice"></el-input>
                  </el-form-item>

                </el-form>

              </el-main>
              

              <el-footer align="center">
                <el-button type="primary" style="marginTop:30px" @click="addChargeProduct(drawer)" >完成新增收费项目</el-button>

              </el-footer>
               
            </el-container>

       </el-drawer>

    </div>
         
  
</template>




<style>

/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row>td{
  background-color: #cdcdcd !important;
}


</style>





<script>

export default {
    data() {
      return {
        //表格内容
        reregistrationInfoListData: [{
            recordNum: '2016-05-02',
            name: '王小虎0',
            sex: '上海市普陀区金沙江路 1518 弄'
          }, {
            recordNum: '2016-05-04',
            name: '王小虎1',
            sex: '上海市普陀区金沙江路 1517 弄'
          }, {
            recordNum: '2016-05-01',
            name: '王小虎2',
            sex: '上海市普陀区金沙江路 1519 弄'
          }, {
            recordNum: '2016-05-03',
            name: '王小虎3',
            sex: '上海市普陀区金沙江路 1516 弄'
          }],
          currentRow: "",


          //表单变量
          form: {

            caseHistoryID: '',
            name: '',
            sex: '',
            age: '',

            birthday: '',
            identityCardID: '',
            address: '',

            treatmentDate: '',
            totalCharge: '',
            chargeType: '',
            patientType: '',

            registrationType: '',
            registrationOffice: '',
            doctorID: '',
            registrationSource: '',

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
            totalPrice: "",
            treatmentOffice: ""
          },


          // 收费信息Dialog是否可见
          dialogFormVisible: false,

          chargeForm: {
            totalCharge: '',
            discountCharge: '',
            practicalCharge: '',
            chargeType: ''
          }


      };
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
        this.$refs.registration_info_list.clearSelection();
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
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      // 提交新增收费项目
      addChargeProduct(drawer) {
          this.$confirm('确认添加此项目？')
          .then(_ => {
            this.drawer = false;
          })
          .catch(_ => {});
      },



      // 表单--------------------------------------------------------
      // 收费结算
      submitRegistrationInfo(form) {
        this.dialogFormVisible = true;
        console.log(form);
      },


      // 查询框-------------------------------------------------------
      selectByPrimaryKey(selectKey) {
        console.log(selectKey);
      }
    }
  }
</script>
