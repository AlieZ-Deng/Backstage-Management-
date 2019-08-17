<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :router="true" :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-folder-opened"></i>内容管理
          </template>
          <el-menu-item index="/posts">文章列表</el-menu-item>
          <el-menu-item index="/create">新建文章</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-user" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="editpassword">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{user}}</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.user = to.params.name;
    });
  },
  methods: {
    editpassword() {
      this.$router.push('/editpassword')
    }
  }
};
</script>

<style>
.el-aside {
  color: #333;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>