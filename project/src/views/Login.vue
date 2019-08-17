<template>
  <div class="pagewrap fx fx-column">
    <div class="loginpage">
      <div>
        <el-input size="medium" v-model="username" placeholder="请输入用户名" class="elinput"></el-input>
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
      <el-button type="primary" @click="loginhandle">
        <router-link :to="{name : 'login'}">登录</router-link>
      </el-button>

      <el-button type="primary">
        <router-link :to="{name : 'register'}">前往注册</router-link>
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
    loginhandle() {
      this.$axios
        .post("login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          localStorage.setItem(
            "app-logined",
            JSON.stringify([
              {
                username: this.username
              }
            ])
          );

          setTimeout(() => {
            this.$router.push({
              name: "posts",
              params: {
                name: this.username
              }
            });
          }, 2000);
        })
        .catch(err => {
          this.$message.error(`${err.response.data.errmsg}`);
        });
    }
  }
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