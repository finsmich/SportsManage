<template>
  <div class="user">
    <top-bar></top-bar>
    <div class="userContent">
      <div class="message">
        <div class="usertop">
          <ul>
            <li
            v-for="(item,index) in liList"
            :key="item"
            @click="liClick(index)"
            :class="{active:isActive == index}">{{item}}</li>
          </ul>
        </div>
        <div class="userbox1" :style="{display:isDisplay1}">
          <el-card class="box-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>基本信息</span>
              </div>
            </template>
            <div>
              <h3>用户名:</h3>
              <p>{{$store.state.username.username}}</p>
            </div>
            <div>
              <h3>性别:</h3>
              <p>{{$store.state.sex.sex}}</p>
            </div>
          </el-card>
          <el-card class="box-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>联系方式</span>
              </div>
            </template>
            <div>
              <h3>邮箱:</h3>
              <p>{{$store.state.email.email}}</p>
            </div>
            <div>
              <h3>手机:</h3>
              <p>{{$store.state.phone.phone}}</p>
            </div>
          </el-card>
        </div>
        <div class="userbox2" :style="{display:isDisplay2}">
          <el-link type="primary" @click="revise" :underline="false">修改个人信息</el-link>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" :disabled="isDisable">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <div class="sex">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </div>
            <div class="button">
              <el-button type="primary" round @click="submitForm('ruleForm')">确认修改</el-button>
              <el-button type="primary" round @click="cancelRevise">取消修改</el-button>
            </div>
          </el-form>
          <el-button round @click="update" size="small" class="udPsButton">修改密码</el-button>
          <el-dialog title="修改密码" :visible.sync="editFormVisible" :modal-append-to-body="false" :close-on-click-modal="true" :close-on-press-escape="true">
            <el-form :model="editForm" :rules="rules" style="padding: 0 50px">
              <el-form-item label="旧密码" prop="oldPassword">
                <el-input type="password" v-model="editForm.oldPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="editForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="checkPassword">
                <el-input type="password" v-model="editForm.checkPassword" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="concel">取 消</el-button>
              <el-button type="primary" @click="handleUpdate">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入导航栏
import TopBar from 'components/content/TopBar'
// 导入网络请求
import {reviseUser} from 'network/user.js'
import {updatePassword} from 'network/userUpdatePassword.js'

export default {
  name: 'user',
  components: {
    TopBar
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.editForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword');
        }
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.editForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      bodyBgImage: 'url(' + require('assets/img/home/home.jpg') + ')',
      liList: ['基本信息','账号管理'],
      isActive: 0,
      isDisplay1: 'block',
      isDisplay2: 'none',
      isDisable: true,
      editFormVisible: false,
      editForm: {
        oldPassword: '',
        password: '',
        checkPassword: ''
      },
      ruleForm: {
        username: '',
        sex: '',
        phone: ''
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
        phone: [
          {
            pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
            message: '手机号不正确',
            trigger: 'blur'
          }
        ],
        oldPassword: [
          { required: true, min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, required: true, min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validateCheckPass, required: true, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    // 添加body图片
    setBodyBackGround () {
      document.body.style.backgroundSize = '100% 100%'
      document.body.style.backgroundRepeat = 'no-repeat'
      document.body.style.backgroundImage = this.bodyBgImage
    },
      // 清除背景图
      clearBodyBackGround () {
        document.body.style.backgroundImage = ''
    },
    liClick(index) {
      if(this.isActive == index){
      }else{
        this.isActive = index
      }
      if(index == 0){
        this.isDisable = true
        this.isDisplay1 = 'block',
        this.isDisplay2 = 'none'
      }else{
        this.isDisplay1 = 'none',
        this.isDisplay2 = 'block'
      }
    },
    revise() {
      this.isDisable = false
    },
    cancelRevise() {
      this.isDisable = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.ruleForm.username){
            this.$message({
              type: 'info',
              message: '缺失用户名!'
            })
          }else {
            this.$confirm('确定要修改吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() =>{
              let sex
              if(this.ruleForm.sex == 0) sex="女"
              else sex="男"
              // 编写数据
              let data = {
                email: this.$store.state.email.email,
                password: this.$store.state.password.password,
                username: this.ruleForm.username,
                sex: sex,
                phone: this.ruleForm.phone
              }
              reviseUser(data).then(res => {
                if(res){
                  // 保存用户的数据到localstorge里
                  this.$store.commit('setUsername',{ username: res[0].userName})
                  this.$store.commit('setSex',{ sex: res[0].sex})
                  this.$store.commit('setPhone',{ phone: res[0].phone})
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
                  this.isDisable = true
                }else {
                  this.$message({
                    type: 'info',
                    message: '修改失败!'
                  })
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });          
            });
          }
        } else {
          return false;
        }
      });
    },
    update() {
      this.editFormVisible = true;
    },
    concel() {
      this.editFormVisible = false;
      this.editForm.oldPassword = ''
      this.editForm.password = ''
      this.editForm.checkPassword = ''
    },
    handleUpdate() {
      if(!this.editForm.oldPassword || !this.editForm.password || !this.editForm.checkPassword){
        this.$message({
          type: 'info',
          message: '信息不全!'
        })
      }else if(this.editForm.oldPassword !== this.$store.state.password.password){
        this.$message({
          type: 'info',
          message: '旧密码不正确!'
        })
      }else {
        this.$confirm('确定要修改密码吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>{
          // 编写数据
          let data = {
            email: this.$store.state.email.email,
            oldPassword: this.$store.state.password.password,
            newPassword: this.editForm.password,
          }
          updatePassword(data).then(res => {
            if(res){
              // 将修改后的密码保存到localstorge里
              this.$store.commit('setPassword',{ password: res[0].password})
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.editForm.oldPassword = ''
              this.editForm.password = ''
              this.editForm.checkPassword = ''
              this.editFormVisible = false
            }else {
              this.$message({
                type: 'info',
                message: '修改失败!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    }
  },
  mounted() {
    //进入页面时添加
    this.setBodyBackGround()
    this.ruleForm.username = this.$store.state.username.username
    if(this.$store.state.sex.sex === 'null'){}
    else if(this.$store.state.sex.sex === '男'){
      this.ruleForm.sex = 1
    }
    else if(this.$store.state.sex.sex === '女'){
      this.ruleForm.sex = 0
    }
    if(this.$store.state.phone.phone === 'null'){}
    else this.ruleForm.phone = this.$store.state.phone.phone
  },
  beforeDestroy(){
    // 离开页面的时候清除
    this.clearBodyBackGround()
  }
}
</script>

<style scoped>
  @import "~assets/css/user/user.css";
  .active {
    font-size: 18px;
    color: #2A2A2A;
    font-weight: 700;
    border-bottom: 2px solid black;
  }
  .display {
    display: none;
  }
  .el-card {
    border: none;
    padding-top: 50px;
  }
  .el-card__header {
    padding: 20px 0;
  }
  .el-card__body {
    padding: 0 50px;
  }
  .el-card__body>div{
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
  .el-card__body>div>h3{
    float: left;
    width: 70px;
  }
  .el-card__body>div>p{
    float: left;
    margin-left: 30px;
  }
  .el-link.el-link--primary {
    padding: 20px 0;
  }
  .el-form {
    padding-bottom: 50px;
  }
  .sex {
    padding-bottom: 20px;
  }
  .udPsButton {
    color: #66b1ff;
    margin-bottom: 50px;
  }
</style>