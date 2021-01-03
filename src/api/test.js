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
