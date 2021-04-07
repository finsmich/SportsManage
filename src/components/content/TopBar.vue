<template>
  <div class="top-bar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-horizontal-demo"
      mode="horizontal"
      text-color="#fff"
      background-color="#009ad6"
      router>
      <div class="top-bar-title"><h2>体育竞赛成绩管理系统</h2></div>
      <el-menu-item style="pointer-events: none; border-left: 1px solid #fff;">{{username}}</el-menu-item>
      <el-menu-item @click="logout">退出登录</el-menu-item>
      <el-menu-item index="/user">用户管理</el-menu-item>
      <el-submenu index="1">
        <template slot="title">体育成绩</template>
        <el-menu-item index="/results/search">成绩查询</el-menu-item>
        <el-menu-item index="/results/manage" :hidden = isHidden>成绩管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home">首页新闻</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      isHidden: true
    }
  },
  methods: {
    logout() {
      if(this.$store.state.token.token) {
        this.$confirm('确定要退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>{
          let storage = window.localStorage;
          storage.clear()
          this.$router.push({
            path: `/login`,
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
  },
  created() {
    this.username = this.$store.state.username.username
    if(this.$store.state.root.root == 1) { //如果是老师，则添加成绩管理页面
      this.isHidden = false
    }
  },
}
</script>

<style scoped>
  @import "~assets/css/topbar/topbar.css";
  .top-bar .el-menu--horizontal>.el-menu-item {
    float: right;
  }
  .top-bar .el-menu--horizontal>.el-submenu {
    float: right;
  }
  .top-bar >>> .el-submenu__title i {
    color: #fff;
  }
  .top-bar .el-menu-item.is-disabled {
    opacity: 1;
  }
  .top-bar >>> .el-menu--horizontal>.el-menu-item.is-active {
    color: gold;
  }
  .top-bar >>> .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    color: gold;
  }
  .el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu.is-active>.el-submenu__title {
    color: gold;
  }
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    color: gold;
  }
</style>