<template>
  <div>
    <el-form @submit.native.prevent="onSubmit" ref="form" :model="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model.trim="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input type="textarea" v-model.trim="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit">立即创建</el-button>
        <el-button @click.native="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: "",
        content: ""
      },
      dialogVisible: false
    };
  },
  methods: {
    onSubmit() {
      let { title, content } = this.form;
      if (title && content) {
        this.$axios
          .post("newpost", {
            title,
            content
          })
          .then(res => {
            this.$message({
              message: "创建文章成功",
              type: "success"
            });
            this.$router.push("/posts");
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    cancel() {
      this.form.title  ="";
      this.form.content  ="";
    }
  }
};
</script>