import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
const jwt = require('jsonwebtoken')

Vue.use(Router)

const Home = () => import('../views/home/Home.vue')
const Results = () => import('../views/results/Results.vue')
const ResultsSearch = () => import('../views/results/resultschildcomps/ResultsSearch.vue')
const ResultsManage = () => import('../views/results/resultschildcomps/ResultsManage.vue')
const User = () => import('../views/user/User.vue')
const Login = () => import('../login/Login.vue')
const Regist = () => import('../login/Regist.vue')

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
      meta: { auth: true }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { auth: true }
    },
    {
      path: '/results',
      name: 'results',
      redirect: '/results/search',
      component: Results,
      meta: { auth: true },
      children: [
        {
          path: 'search',
          name: 'search',
          component: ResultsSearch,
          meta: { auth: true }
        },
        {
          path: 'manage',
          name: 'manage',
          component: ResultsManage,
          meta: { auth: true }
        },
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { auth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { auth: true }
    },
    {
      path: '/regist',
      name: 'regist',
      component: Regist,
      meta: { auth: true }
    },
  ]
})
router.beforeEach((to,from,next) => {
  if(to.matched.some( m => m.meta.auth)) {
    // 先判断是不是登录注册页面
    if(to.name == 'home' || to.name == 'login' || to.name == 'regist') {
      next();
    }else {
      let token = store.state.token.token
      // 判断是否有token
      if(token) {
        jwt.verify(token, 'sports', (err, decoded)=>{
          if(err) {
            if(err.name == 'TokenExpiredError') { //token过期
              alert('登录已过期，请重新登录')
              next('/login')
            }else if(err.name == 'JsonWebTokenError') { //token无效
              alert('未登录，请返回登录')
              next('/login')
            }
          }else {
            let nowtime = parseInt(new Date().getTime()/1000)
            if(nowtime <= decoded.exp) {
              // console.log('token有效')
              next()
            }else {
              alert('登录已过期，请重新登录')
              next('/login')
            }
          }
        })
      }else {
        // 如果没有token则强制回到登录页面
        alert('未登录，请返回登录')
        next('/login')
      }
    }
  }
})
export default router
