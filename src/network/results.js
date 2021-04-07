import {request} from "./require";

// 获取体育成绩数据
export function getResults(type) {
  return request({
    url: '/results',
    params: {
      type
    }
  })
}

// 插入体育成绩数据
export function insertResults(data){
  return request({
    url: '/results/insert',
    method: 'POST',
    data
  })
}

// 查询体育成绩数据
export function selectResults(data){
  return request({
    url: '/results/select',
    method: 'POST',
    data
  })
}

// 删除体育成绩数据
export function deleteResults(data){
  return request({
    url: '/results/delete',
    method: 'POST',
    data
  })
}
// 修改体育成绩数据
export function updateResults(data){
  return request({
    url: '/results/update',
    method: 'POST',
    data
  })
}