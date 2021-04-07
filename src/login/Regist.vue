<template>
  <div id="regist">
    <div class="registbody"></div>
    <div class="box">
      <div class="logo"><img src="~assets/img/registlogo.png" alt=""></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input minlength=4 type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" round @click="submitForm('ruleForm')">注册</el-button>
        <el-button round @click="resetForm('ruleForm')">重置</el-button>
      </div>
      <div class="login-bar">
        <router-link to="/login"><el-link :underline="false" class="login">返回登录</el-link></router-link>
      </div>
    </div>
  </div>
</template>
<script>
// 导入网络请求
import {regist} from 'network/regist.js'

export default {
  name: 'regist',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        email: '',
        password: '',
        checkPass: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '姓名不支持特殊字符',
            trigger: 'blur'
          }
        ],
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
          { validator: validatePass, required: true, min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.ruleForm.username || !this.ruleForm.email || !this.ruleForm.password){
            this.$message({
              type: 'info',
              message: '缺失信息!'
            })
          }else {
            // 编写数据
            let data = {
              username: this.ruleForm.username,
              email: this.ruleForm.email,
              password: this.ruleForm.password,
            }
            regist(data).then(res => {
              if(res) {
                if(res.data === "邮箱重复" || res === "邮箱重复"){
                  this.$message({
                    type: 'info',
                    message: '该邮箱已被注册!'
                  })
                }else {
                  // 保存用户的数据到localstorge里
                  this.$store.commit('setToken',{ token: res[0].token})
                  this.$store.commit('setUserID',{ userID: res[0].id})
                  this.$store.commit('setUsername',{ username: res[0].userName})
                  this.$store.commit('setRoot',{ root: res[0].root})
                  this.$message({
                    type: 'success',
                    message: '注册成功!'
                  })
                  this.$router.push({
                    path: `/home`,
                  })
                }
              }else {
                this.$message({
                  type: 'info',
                  message: '注册失败!'
                })
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped>
  #regist {
    width: 100%;
    height: 100%;
  }
  .registbody {
    width:100%;
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
    height: 600px;
    margin: -300px 0 0 -215px;
    border: 1px solid #fff;
    border-radius: 20px;
    overflow: hidden;
    opacity: 1;
    background-color: #fff;
  }
  .logo {
    width: 162px;
    height: 120px;
    margin: 30px auto 30px;
  }
  .logo img {
    width: 162px;
    height: 120px;
  }
  .box >>> .el-form-item__label{
    width: 80px;
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
    margin: 30px auto;
  }
  .login-bar {
    width: 360px;
    margin: 20px auto 0;
    font-size: 14px;
    overflow: hidden;
  }
  .login-bar .login {
    color: rgb(43, 184, 231);
    float: right;
  }
  .login-bar .login:hover {
    color: rgb(24, 124, 245);
  }
</style>