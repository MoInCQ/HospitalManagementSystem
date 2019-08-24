<template>
    <div>
      <el-row >
                <!-- 表单 -->

                <el-form ref="form" :model="form" label-width="80px" >

                  <!-- 表单第一行 -->
                  <el-row >
 
                    
                    <el-col :span="6">
                      <el-form-item label="姓名" >
                        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                      </el-form-item>
                    </el-col>

      
                    <el-col :span="6">
                      <el-form-item label="性别">
                        <el-select v-model="form.sex" placeholder="请选择性别">
                          <el-option label="男" value="male"></el-option>
                          <el-option label="女" value="female"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col> 

                    <el-col :span="6">
                      <el-form-item label="年龄">
                        <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="6" >
                      <el-form-item label="出生日期">
                        <el-col >
                          <el-date-picker type="date" placeholder="请输入出生日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
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
                  <el-row >
                    <el-col :span="6">
                      <el-form-item label="就诊日期">
                        <el-col >
                          <el-date-picker type="date" placeholder="请输入就诊日期" v-model="form.treatmentDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    
                    <el-col :span="6">
                      <el-form-item label="应收金额">
                        <el-input v-model="form.charge" placeholder="请输入应收金额"></el-input>
                      </el-form-item>
                    </el-col>


                    <el-col :span="6">
                      <el-form-item label="结算类型">
                        <el-select v-model="form.chargeType" placeholder="请选择结算类型">
                          <el-option label="自付" value="selfPay"></el-option>
                          <el-option label="医保" value="healthInsurance"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col> 

                    <el-col :span="6">
                      <el-form-item label="病人身份">
                        <el-select v-model="form.patientType" placeholder="请选择病人身份">
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
                         <el-select v-model="form.registrationType" placeholder="请选择挂号类别">
                          <el-option label="普通" value="common"></el-option>
                          <el-option label="专家" value="specialist"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

      
                    <el-col :span="6">
                      <el-form-item label="挂号科室">
                        <el-select v-model="form.registrationOffice" placeholder="请选择挂号科室">
                          <el-option label="内科" value="physician"></el-option>
                          <el-option label="外科" value="surgery"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col> 

                    <el-col :span="6">
                      <el-form-item label="看诊医生">
                        <el-select v-model="form.doctorID" placeholder="请选择看诊医生">
                          <el-option label="医生一" value="doctorOne"></el-option>
                          <el-option label="医生二" value="doctorTwo"></el-option>
                          <el-option label="医生三" value="doctorThree"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col> 


                    <el-col :span="6">
                      <el-form-item label="挂号来源">
                        <el-select v-model="form.registrationSource" placeholder="请选择挂号来源">
                          <el-option label="电话预约" value="phoneReserve"></el-option>
                          <el-option label="微信预约" value="wechatReserve"></el-option>
                          <el-option label="现场办理" value="presentDispose"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  

                  <!-- 表单第五行 -->
                  <el-row >



                    <el-col :span="6" :offset="18">
                      <el-button style="float: right" type="primary" round 
                          @click="submitRegistrationInfo(form)">提交挂号信息</el-button> 
                    </el-col>
                  
                  </el-row>
                  


                </el-form>



      </el-row>
      
      <el-row style="marginTop: 20px">

          
              <!-- 挂号信息列表 -->
              
                    <el-card shadow="hover" >

                        <!-- 列表头部 -->
                        <div slot="header" class="clearfix">
                            <el-row style="height:40px">
                              <el-col span="22">
                                <div style="font-size:20px; text-align:left; color:#000000; margin:10px 0px 0px 10px" >挂号信息列表</div>
                              </el-col>

                              <el-col span="2" >

                                <el-button 
                                  style="float: right; padding: 3px 0 ; height:40px; text-align:center" 
                                  type="text"
                                  icon="el-icon-refresh"
                                  @click="refreshList()" >刷新列表</el-button>

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
                            type="index"
                            label="序号"
                            width="50"
                            align="center">
                          </el-table-column>
                          
                          <el-table-column
                            fixed="left"
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
                            property="birthday"
                            label="出生日期"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="identity_id"
                            label="身份证号"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="invoice_id"
                            label="发票号"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="payment_category"
                            label="结算类别"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="registration_rank"
                            label="挂号级别"
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
                            property="recovery_state"
                            label="康复状态"
                            align="center">
                          </el-table-column>

                          <el-table-column
                            property="payment_state"
                            label="收费状态"
                            align="center">
                          </el-table-column>



                          
                        </el-table>
                  
                
                      </el-card>     

      </el-row>

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

          },


  


      };
    },


    methods: {

      //表格--------------------------------------------------------
      // 表格控制当前选中行
      handleCurrentChange(row) {
        this.currentRow = row;

        console.log(this.currentRow.name);
      },

      refreshList() {
        console.log("refresh");
      },




      // 表单--------------------------------------------------------
      // 提交表单
      submitRegistrationInfo(form) {
        console.log(form);
      }
    }
  }
</script>
