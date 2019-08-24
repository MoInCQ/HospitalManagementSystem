
<template>
    <div>

      <!-- 单号查询框 -->
      <el-row style="margin: 0px 0px 30px 10px">
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="selectKey.value"  style="background-color: #fff;">
            <el-select v-model="selectKey.type" slot="prepend" placeholder="查询类型" style="width: 130px; ">
              <el-option label="病历号" value="medicalRecordID"></el-option>
              <el-option label="身份证号" value="name"></el-option>

            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="selectByPrimaryKey(selectKey)">查询</el-button>
          </el-input>

        </el-col>
          
  
      </el-row>
      
      <el-divider></el-divider>


      
      <el-row >    
              <!-- 挂号信息列表 -->
              
                    <el-card shadow="hover" >

                        <!-- 列表头部 -->
                        <div slot="header" class="clearfix">
                            <el-row style="height:40px">

                              <el-col span="18">
                                <div style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px" >挂号信息列表</div>
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
                                  icon="el-icon-delete"
                                  @click="deleteRegistrationInfo()" >批量退号</el-button>

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
                            label="病历号"
                            width="120"
                            align="center">
                          </el-table-column>
                          
                          <el-table-column
                            property="name"
                            label="姓名"
                            width="120"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="sex"
                            label="性别"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="identity_id"
                            label="身份证号"
                            align="center">
                          </el-table-column>


                          <el-table-column
                            property="registration_date"
                            label="挂号日期"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="treatment_date"
                            label="就诊日期"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="treatment_state"
                            label="就诊状态"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="treatment_office"
                            label="就诊科室"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="payment_state"
                            label="收费状态"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                              <el-button @click="viewDetails(scope.row)" type="text" size="small">查看详情</el-button>
                            </template>
                          </el-table-column>

                          
                        </el-table>
                  
                
                      </el-card>     

      </el-row>

      <!-- 根据“病历号”查询时及查看详情时使用的抽屉 -->
      <el-drawer
          
          :visible.sync="drawer"
          :direction="rtl"
          :before-close="handleClose" >
          
          <div>
            <h2 style="margin: 0px 0px 30px 20px">挂号信息</h2>

          </div>

          <el-divider></el-divider>

        

            <el-container >

              <el-main style="height:390px">

                <el-form ref="registrationForm" :model="registrationForm" label-width="80px" style="margin:0px 30px 0px 10px">
              
                      <el-form-item label="病历编号" >
                        <el-input v-model="registrationForm.caseHistoryID" :disabled="true"></el-input>
                      </el-form-item>

                      <el-form-item label="姓名" >
                        <el-input v-model="registrationForm.name"  :disabled="true"></el-input>
                      </el-form-item>

                      <el-form-item label="性别">
                        <el-select v-model="registrationForm.sex" placeholder="" :disabled="true">
                          <el-option label="男" value="male"></el-option>
                          <el-option label="女" value="female"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="年龄">
                        <el-input v-model="registrationForm.age"  :disabled="true"></el-input>
                      </el-form-item>


                       <el-form-item label="出生日期">
                        <el-col >
                          <el-date-picker type="date"  v-model="registrationForm.birthday" style="width: 100%;" :disabled="true"></el-date-picker>
                        </el-col>
                      </el-form-item>

                      <el-form-item label="身份证号">
                        <el-input v-model="registrationForm.identityCardID"  :disabled="true"></el-input>
                      </el-form-item>

                      <el-form-item label="家庭住址">
                        <el-input v-model="registrationForm.address"  :disabled="true"></el-input>
                      </el-form-item>

                      <!-- 需后台生成 -->
                      <el-form-item label="挂号日期">
                        <el-col >
                          <el-date-picker type="date"  v-model="registrationForm.registrationDate" style="width: 100%;" :disabled="true"></el-date-picker>
                        </el-col>
                      </el-form-item>

                      <el-form-item label="就诊日期">
                        <el-col >
                          <el-date-picker type="date"  v-model="registrationForm.treatmentDate" style="width: 100%;" :disabled="true"></el-date-picker>
                        </el-col>
                      </el-form-item>

                      <!-- 需后台生成 -->
                      <el-form-item label="发票号">
                        <el-input v-model="registrationForm.invoiceID"  :disabled="true"></el-input>
                      </el-form-item>

                      <el-form-item label="应收金额">
                        <el-input v-model="registrationForm.charge"  :disabled="true"></el-input>
                      </el-form-item>

                      <el-form-item label="结算类型">
                        <el-select v-model="registrationForm.chargeType" placeholder="" :disabled="true">
                          <el-option label="自付" value="selfPay"></el-option>
                          <el-option label="医保" value="healthInsurance"></el-option>
                          <el-option label="他付" value="othersPay"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="病人身份">
                        <el-select v-model="registrationForm.patientType" placeholder="" :disabled="true">
                          <el-option label="市民" value="citizen"></el-option>
                          <el-option label="军人" value="soldier"></el-option>
                          <el-option label="公务员" value="civilServant"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="挂号类别">
                         <el-select v-model="registrationForm.registrationType" placeholder="" :disabled="true">
                          <el-option label="普通" value="common"></el-option>
                          <el-option label="专家" value="specialist"></el-option>
                        </el-select>
                      </el-form-item>

                      <!-- 需后台生成 -->
                      <el-form-item label="就诊状态">
                         <el-select v-model="registrationForm.treatmentState" placeholder="" :disabled="true">
                          <el-option label="已诊" value="accomplish"></el-option>
                          <el-option label="待诊断" value="unfinished"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="就诊科室">
                        <el-select v-model="registrationForm.registrationOffice" placeholder="" :disabled="true">
                          <el-option label="内科" value="physician"></el-option>
                          <el-option label="外科" value="surgery"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="看诊医生">
                        <el-select v-model="registrationForm.doctorID" placeholder="" :disabled="true">
                          <el-option label="医生一" value="doctorOne"></el-option>
                          <el-option label="医生二" value="doctorTwo"></el-option>
                          <el-option label="医生三" value="doctorThree"></el-option>
                        </el-select>
                      </el-form-item>

                      <!-- 需后台生成 -->
                      <el-form-item label="康复状态">
                         <el-select v-model="registrationForm.recoveryState" placeholder="" :disabled="true">
                          <el-option label="已康复" value="recovery"></el-option>
                          <el-option label="未康复" value="notRcovery"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="挂号来源">
                        <el-select v-model="registrationForm.registrationSource" placeholder="" :disabled="true">
                          <el-option label="电话预约" value="phoneReserve"></el-option>
                          <el-option label="微信预约" value="wechatReserve"></el-option>
                          <el-option label="现场办理" value="presentDispose"></el-option>
                        </el-select>
                      </el-form-item>

                      <!-- 需联系收费界面完成 -->
                      <el-form-item label="收费状态">
                         <el-select v-model="registrationForm.chargeState" placeholder="" :disabled="true">
                          <el-option label="已结" value="accountPaid"></el-option>
                          <el-option label="未结" value="nonPayment"></el-option>
                        </el-select>
                      </el-form-item>


                </el-form>

              </el-main>
              

              <el-footer align="center">
                <el-button type="primary" style="marginTop:30px" @click="withdrawThisRegistration(drawer)" >退办此号</el-button>

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


          // 表单变量
          registrationForm: {

            caseHistoryID: '',
            name: '',
            sex: '',
            age: '',

            birthday: '',
            identityCardID: '',
            address: '',

            treatmentDate: '',
            charge: '',
            chargeType: '',
            patientType: '',

            registrationType: '',
            registrationOffice: '',
            doctorID: '',
            registrationSource: '',



            // 需后台生成字段
            registrationDate: '',
            invoiceID: '',
            recoveryState: '',
            treatmentState: '',

            chargeState: '',

          },

          // 查询类型
          selectKey: {
             type: "",
             value: ""

          },

          // 挂号信息侧边栏是否可见
          drawer: false,



      };
    },


    methods: {

      //表格--------------------------------------------------------
      // 表格控制当前选中行
      handleCurrentChange(val) {
        this.currentRow = val;

        console.log(this.currentRow.name);
      },

      // 取消选择
      toggleSelection() {
        this.$refs.registration_info_list.clearSelection();
        console.log("cancel selection");
      },

      refreshList() {
        console.log("refresh");
      },

      // 表格批量删除
      deleteRegistrationInfo() {

      },
      
      // 查看详情
      viewDetails(row) {
        this.drawer = true;
        console.log(row);
      },

      // 侧边栏——————————————————————————————————————————————————————
      // 退掉此号
      withdrawThisRegistration(drawer) {
          this.$confirm('确认退掉此号？')
          .then(_ => {
            this.drawer = false;
          })
          .catch(_ => {});
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
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
        if (selectKey.type == "medicalRecordID") {
          this.drawer = true;
        }
      }
    }
  }
</script>
