<template>
  <div>
    <el-form @submit.native.prevent="onSubmit" ref="form" :model="form" label-width="80px">
      <el-form-item label="原用户密码">
        <el-input v-model.trim="form.password"></el-input>
      </el-form-item>
      <el-form-item label="新用户密码">
        <el-input type="textarea" v-model.trim="form.newpassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit">立即修改</el-button>
        <el-button @click.native="cancel">退出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        password: "",
        newpassword: ""
      },
      dialogVisible: false
    };
  },
  computed: {
    username() {
      let localX = JSON.parse(localStorage.getItem("app-logined"));
      return localX[0].username;
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .put("user", {
          username: this.username,
          password: this.form.password,
          newpassword: this.form.newpassword
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {}
  }
};
</script>