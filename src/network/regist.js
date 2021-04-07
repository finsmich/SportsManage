// import axios from 'axios'

// export function regist(data) {
//   const config = axios.post('http://192.168.137.1:3000/regist', data)
//   return config
// }

import {request} from "./require";

// 获取体育成绩数据
export function regist(data) {
  return request({
    url: '/regist',
    method: 'POST',
    data
  })
}