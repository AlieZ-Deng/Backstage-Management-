<template>
  <div class="pagewrap fx fx-column">
    <div class="loginpage">
      <div>
        <el-input size="medium" v-model="username" placeholder="请输入注册用户名" class="elinput"></el-input>
      </div>
      <div>
        <el-input
          size="medium"
          placeholder="请输入密码"
          v-model.trim="password"
          show-password
          class="elinput"
        ></el-input>
      </div>
    </div>

    <div class="buttonwrap">
      <el-button type="primary">
        <router-link :to="{name : 'login'}">跳转到登录页</router-link>
      </el-button>

      <el-button type="primary" @click="registerhandler">
        <router-link :to="{name : 'register'}">注册</router-link>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    registerhandler() {
      this.$axios
        .post("register", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          this.$message({
            message: "注册成功",
            type: "success"
          });
          this.password = this.username = "";
          setTimeout(() => {
            me.$router.push("/page/login");
          }, 2000);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  
};
</script>

<style scoped>
.pagewrap {
  margin-top: 30px;
}
.elinput {
  width: 300px;
  margin-bottom: 20px;
}
button {
  margin-right: 30px;
}
</style>