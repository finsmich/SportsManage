import {request} from "./require";

// 获取体育成绩数据
export function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}