import {request} from "./require";

export function updatePassword(data) {
  return request({
    url: '/updatePassword',
    method: 'POST',
    data
  })
}