import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from './storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // 变量: 保存公共数据 在设置vuex中的初值时，先从本地存储中取，如果取不到，则初始为空
  state: {
    // 存放用户的id
    userID: getItem('userID') || {},
    // 存放用户的名字
    username: getItem('username') || {},
    // 存放用户的邮箱
    email: getItem('email') || {},
    // 存放用户的密码
    password: getItem('password') || {},
    // 存放用户登录状态
    token: getItem('token') || {},
    // 存放用户的root(区分是学生还是管理员)
    root: getItem('root') || {},
    // 存放用户的性别
    sex: getItem('sex') || {},
    // 存放用户的手机号
    phone: getItem('phone') || {},
  },
  // 方法
  mutations: {
    // 保存用户的userID, 且保存到localStorage中
    setUserID(state, userIDObj) {
      state.userID = userIDObj
      setItem('userID', userIDObj)
    },
    // 保存用户的username, 且保存到localStorage中
    setUsername(state, usernameObj) {
      state.username = usernameObj
      setItem('username', usernameObj)
    },
    // 保存用户的email, 且保存到localStorage中
    setEmail(state, emailObj) {
      state.email = emailObj
      setItem('email', emailObj)
    },
    // 保存用户的password, 且保存到localStorage中
    setPassword(state, passwordObj) {
      state.password = passwordObj
      setItem('password', passwordObj)
    },
    // 保存用户的token 且保存到localStorage中
    setToken (state, tokenObj) {
      state.token = tokenObj
      setItem('token', tokenObj)
    },
    // 保存用户的root, 且保存到localStorage中
    setRoot(state, rootObj) {
      state.root = rootObj
      setItem('root', rootObj)
    },
    // 保存用户的sex, 且保存到localStorage中
    setSex(state, sexObj) {
      state.sex = sexObj
      setItem('sex', sexObj)
    },
    // 保存用户的phone, 且保存到localStorage中
    setPhone(state, phoneObj) {
      state.phone = phoneObj
      setItem('phone', phoneObj)
    },
  },
  actions: {

  },
  getters: {

  },
  modules: {

  }
})
