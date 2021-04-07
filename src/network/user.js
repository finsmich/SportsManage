import {request} from "./require";

export function reviseUser(data) {
  return request({
    url: '/userInfo',
    method: 'POST',
    data
  })
}