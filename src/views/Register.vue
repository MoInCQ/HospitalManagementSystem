<template>
<el-container>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-form" align="center">
    <h3>注册</h3>

    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submitBtn" @click="submitForm(ruleForm)">注册</el-button>
    </el-form-item>
  </el-form>
</el-container>
</template>



<script>
import api from "../request/Api";
//import { constants } from "crypto";

// function getuuid() {
//   var uid = [];
//   var hexDigits = "0123456789abcdefghijklmnopqrst";
//   for (var i = 0; i < 32; i++) {
//     uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
//   }
//   uid[6] = "4";
//   uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1);
//   var uuid = uid.join("");
//   return uuid;
// }

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
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      activeName: "second",
      ruleForm: {
        name: '',
        pass: '',
      },
      rules: {
        name: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 14 个字符", trigger: "blur" }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },

  mounted: function() {
    this.getUsers();
  },

  //获取用户数据
  getUsers() {
    this.loading = true;
    api._get().then(
      res => {
        this.users = res.datas;
        this.total_rows = res.datas.total_rows;
        this.loading = false;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  },

  methods: {
    /**
     * 注册用户
     */
    submitForm(form) {
      console.log(form);
      api._post(form);
      //this.$router.push("/login");
      // this.$refs.formName.validate(valid => {
      //   console.log(formName);
      //   if (valid) {
      //     this.$message({
      //       type: "success",
      //       message: "注册成功"
      //     });
      //     //register._post(formName);
      //     this.$router.push("/login");
      //     // this.activeName: 'first',
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
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
