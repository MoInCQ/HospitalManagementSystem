<template>
  <el-container>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="0"
      class="login-form"
      align="center"
    >
      <h3>注册</h3>

      <el-form-item prop="name">
        <el-input type="text" v-model="ruleForm.name" placeholder="请输入电话号码或者电子邮箱"></el-input>
      </el-form-item>

      <el-form-item prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" placeholder="请再次输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="idCard">
        <el-input type="text" v-model="ruleForm.idCard" placeholder="请输入你的身份证号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择你的身份">
            <el-option label="护士" value="NURSE"></el-option>
            <el-option label="管理员" value="ADMIN"></el-option>
            <el-option label="病人" value="PATIENT"></el-option>
            <el-option label="医生" value="DOCTOR"></el-option>
          </el-select>
        </el-form-item>

        <el-button
          type="primary"
          class="submitBtn"
          @click.native.prevent="submitForm('ruleForm')"
        >注册</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>



<script>
import axios from "axios";
import qs from "qs";
import Api from "../http/api";
axios.defaults.withCredentials = true;

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      activeName: "second",
      ruleForm: {
        name: "",
        pwd: "",
        checkPass: "",
        type: "",
        idCard: ""
      },
      rules: {
        id: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 14 个字符", trigger: "blur" }
        ],
        pwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    /**
     * 注册用户
     */
    submitForm(formName) {
      console.log({
        name: this.ruleForm.name,
        idCard: this.ruleForm.idCard,
        pwd: this.ruleForm.pwd,
        type: this.ruleForm.type
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(
              Api.registerUrl,
              qs.stringify(
                {
                  name: this.ruleForm.name,
                  idCard: this.ruleForm.idCard,
                  pwd: this.ruleForm.pwd,
                  type: this.ruleForm.type
                },
                {
                  // headers: {
                  //   "Content-Type": "application/x-www-form-urlencoded"
                  // }
                }
              )
            )
            .then(res => {
              console.log(res.data.status);
              if (res.data.status == 200) {
                //弹出消息 提示已经注册成功
                this.$message({
                  type: "success",
                  message: "注册成功"
                });
                this.$router.push("/");
              } else {
                //弹出消息 提示已经注册失败
                this.$message({
                  type: "error",
                  message: "已被注册，请重新注册！"
                });
              }
            });
        } else {
          //注册失败

          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-form {
  margin: 20px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 35px #b4bccc;
  padding: 30px 30px 0 30px;
  border-radius: 25px;
}
.submitBtn {
  width: 65%;
}
.to {
  color: #67c23a;
  cursor: pointer;
}
</style>
