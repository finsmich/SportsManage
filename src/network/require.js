import axios from 'axios'
import store from 'store/store'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://1.15.149.134:3000',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截
  instance.interceptors.request.use(config => {
    // 从vuex中取出token
    const token = store.state.token.token
    // 从vuex中取出userID
    const userID = store.state.userID.userID
    // 从vuex中取出root
    const root = store.state.root.root
    // 如果有token则添加到headers中
    if (token) {
      config.headers.token = `${token}`
      config.headers.authorization = `${userID}`
      config.headers.root = `${root}`
    }
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    // console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}