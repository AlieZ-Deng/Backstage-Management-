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
        <el-button native-type="submit">保存</el-button>
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
      old: {
        title: "",
        content: ""
      },
      dialogVisible: false
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.fullPath == "/posts") {
      next(vm => {
        vm.form = to.params.postone;
        vm.old = { ...vm.form };
      });
    } else {
      next("/posts");
    }
  },
  methods: {
    onSubmit() {
      let { title, content } = this.form;
      if (title && content) {
        this.$axios
          .put(`posts/${this.form._id}`, this.form)
          .then(res => {
            this.$message({
              message: "修改文章成功",
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
      this.form = { ...this.old };
    }
  }
};
</script>