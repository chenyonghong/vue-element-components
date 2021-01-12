import request from "@/utils/request";

export function getUserList(data) {
  return request({
    url: `/user/list`,
    method: "post",
    data,
  });
}
export function fetchRegionAll(data) {
  return request({
    url: `/region/listAll`,
    method: "post",
    data,
  });
}
export function fetchRegionList(data) {
  return request({
    url: `/region/list`,
    method: "post",
    data,
  });
}

export function fetchTableList(data) {
  return request({
    url: 'project/list',
    method: 'post',
    data
  })
}
export function fetchProjectAdd(data) {
  return request({
    url: 'project/add',
    method: 'post',
    data
  })
}
export function fetchProjectUpdate(data) {
  return request({
    url: 'project/update',
    method: 'post',
    data
  })
}

export function fetchProjectDelete(data) {
  return request({
    url: 'project/delete',
    method: 'post',
    data
  })
}
