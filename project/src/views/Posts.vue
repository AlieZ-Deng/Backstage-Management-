<template>
  <el-table :data="tableData">
    <el-table-column prop="title" label="标题" width="200px"></el-table-column>
    <el-table-column prop="content" label="内容" width="300px"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.$axios
      .get("posts")
      .then(res => {
        this.tableData = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleEdit(num, item) {
      this.$router.push({
        name: "edit",
        params: { postone: this.tableData[num] }
      });
    },
    handleDelete(num, item) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "⚠", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete("posts/" + item._id)
            .then(res => {
              console.log(res.data);
            })
            .catch(err => {
              console.log(err);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.tableData.splice(num, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style  scoped>
.table {
  width: 100%;
}
</style>



