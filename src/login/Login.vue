<template>
  <div id="login">
    <div class="loginbody"></div>
    <div class="box">
      <div class="logo"><img src="~assets/img/loginlogo.png" alt=""></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" round @click="submitForm('ruleForm')">登录</el-button>
        <el-button round @click="resetForm('ruleForm')">重置</el-button>
      </div>
      <div class="reg-bar">
        <router-link to="/regist"><el-link :underline="false" class="reg">立刻注册</el-link></router-link>
      </div>
    </div>
  </div>
</template>

<script>
// 导入网络请求
import {login} from 'network/login.js'

export default {
  name: 'login',
  data() {
    return {
      // bodyBgImage: 'url(' + require('assets/img/home/home.jpg') + ')',
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            required: true,
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/,
            message: '邮箱不正确',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    // // 添加body图片
    // setBodyBackGround () {
    //   document.body.style.backgroundSize = '100% 100%'
    //   document.body.style.backgroundRepeat = 'no-repeat'
    //   document.body.style.backgroundImage = this.bodyBgImage
    // },
    //   // 清除背景图
    //   clearBodyBackGround () {
    //     document.body.style.backgroundImage = ''
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 编写数据
          let data = { email: this.ruleForm.email, password: this.ruleForm.password }
          // 发送数据
          login(data).then(res=>{
            if(res.length == 0){
              this.$message({
                type: 'info',
                message: '登录失败，请检查邮箱密码'
              });
            }else{
              // 保存用户的数据到localstorge里
              this.$store.commit('setUserID',{ userID: res[0].id})
              this.$store.commit('setUsername',{ username: res[0].userName})
              this.$store.commit('setEmail',{ email: res[0].userEmail})
              this.$store.commit('setPassword',{ password: res[0].password})
              this.$store.commit('setToken',{ token: res[0].token})
              this.$store.commit('setRoot',{ root: res[0].root})
              this.$store.commit('setSex',{ sex: res[0].sex})
              this.$store.commit('setPhone',{ phone: res[0].phone})
              this.$message({
                type: 'success',
                message: '登录成功!'
              })
              this.$router.push({
                path: `/home`,
              })
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  // mounted() {
  //   // 进入页面的时候添加
  //   this.setBodyBackGround()
  // },
  // beforeDestroy(){
  //   // 离开页面的时候清除
  //   this.clearBodyBackGround()
  // }
}
</script>

<style scoped>
  #login {
    width: 100%;
    height: 100%;
  }
  .loginbody {
    width: 100%;
    height: 100vh;
    background: #fff url('~assets/img/login.jpg') 50% 50% no-repeat;
    background-size: cover;
    filter:alpha(opacity=50);  
    -moz-opacity:0.5;  
    -khtml-opacity: 0.5;  
    opacity: 0.5;
    filter: blur(10px);
  }
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 430px;
    height: 550px;
    margin: -300px 0 0 -215px;
    border: 1px solid #fff;
    border-radius: 20px;
    overflow: hidden;
    opacity: 1;
    background-color: #fff;
  }
  .logo {
    width: 140px;
    height: 140px;
    margin: 50px auto 50px;
  }
  .logo img {
    width: 140px;
    height: 140px;
  }
  .box >>> .el-form-item__label{
    width: 70px;
    margin-left: 30px;
    text-align: center;
  }
  .box >>> .el-form-item__content{
    width: 60%;
    float: left;
  }
  .button {
    display: flex;
    justify-content: space-around;
    width: 260px;
    margin: 50px auto 0;
  }
  .reg-bar {
    width: 360px;
    margin: 50px auto 0;
    font-size: 14px;
    overflow: hidden;
  }
  .reg-bar .reg {
    color: rgb(43, 184, 231);
    float: right;
  }
  .reg-bar .reg:hover {
    color: rgb(24, 124, 245);
  }
</style>