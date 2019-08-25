<template>
  <div id="home">
    <el-container>
      <!-- 顶部栏--------------------------------------------------------------------------------------------- -->
      <el-header style="background-color: #ffffff; margin: 0px 0px 0px 0px; height:70px">
        <el-row>
          <el-col :span="3">
            <el-image :src="logoUrl" style="height:70px"></el-image>
          </el-col>
          <el-col :span="10">
            <h2 style="text-align:left;">东软医院信息管理系统</h2>
          </el-col>
        </el-row>
      </el-header>

      <el-divider style="width:100%"></el-divider>

      <el-container>
        <!-- 侧边栏--------------------------------------------------------------------------------------------- -->
        <el-aside
          width="200px"
          style="background-color: rgb(238, 241, 246); margin: 2px 5px 0px 0px"
        >
          <!-- 基本信息 -->
          <el-row style="background-color: #ffffff; height:70px">
            <el-row>
              <!-- 头像 -->
              <el-col :span="12">
                <div class="portrait">
                  <el-avatar :size="60" :src="circleUrl"></el-avatar>
                </div>
              </el-col>

              <!-- 用户名+身份 -->
              <el-col :span="12">
                <el-row style="height:40px">
                  <div
                    style="font-size:15px; font-weight: bold; text-align:left; color:#000000; margin:10px 0px 0px 3px"
                  >蔡徐坤</div>
                </el-row>

                <el-row style="height:30px">
                  <div
                    style="font-size:12px; text-align:left; color:#303133; margin:0px 0px 0px 3px"
                  >超级管理员</div>
                </el-row>
              </el-col>
            </el-row>
          </el-row>

          <!-- 导航栏 -->
          <el-menu :default-active="activeIndex" router>
            <!-- 首页 -->
            <el-menu-item index="/Home/homePage">
              <i class="el-icon-message"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <!-- 挂号管理 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>挂号管理
              </template>
              <el-menu-item index="/Home/registration">门诊挂号</el-menu-item>
              <el-menu-item index="/Home/withdrawRegistration">门诊退号</el-menu-item>
            </el-submenu>

            <!-- 费用管理 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-tickets"></i>费用管理
              </template>

              <el-menu-item index="/Home/charge">门诊收费</el-menu-item>
              <el-menu-item index="/Home/withdrawCharge">门诊退费</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 主要内容显示(tab切换)------------------------------------------------------------------------------------------- -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.menu-right {
  margin-left: 200px;
}
</style>

<script>
export default {
  name: "home",
  data() {
    return {
      circleUrl:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566319876268&di=0144317d17547fbe52fb592b4af11ce5&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F09%2F20180309201807_2EhwS.jpeg",
      userName: "",

      logoUrl: require("../assets/logoPic.jpg"),

      activeIndex: "/Home/homePage"
    };
  },

  methods: {}
};
</script>
