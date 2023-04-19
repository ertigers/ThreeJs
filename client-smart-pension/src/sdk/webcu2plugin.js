import { qxajax } from "./request";

let QxRequest = qxajax;
// let QxRequest = qxjsonp;
const base_url = "http://127.0.0.1:9585/icvs2/"; // 本地插件

export const webcu2plugin = {
  // 登录
  login: (params) => {
    return QxRequest("post", `${base_url}login`, params);
  },
  // 获取设备列表
  getDeviceList: (params) => {
    return QxRequest("get", `${base_url}CAS/C_CAS_QueryPUIDSets`, params);
  },
  // 获取设备列表子资源
  getDeviceByPuid: (params) => {
    return QxRequest("get", `${base_url}C_CAS_QueryPUIDRes`, params);
  },
  // 获取播放ID
  getPlayVideoId: (params) => {
    return QxRequest("get", `${base_url}video/startVideo2`, params);
  },
};
