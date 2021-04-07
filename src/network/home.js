import {request} from "./require";

export function getHomeSportsNews(type) {
  return request({
    url: '/news',
    params: {
      type
    }
  })
}