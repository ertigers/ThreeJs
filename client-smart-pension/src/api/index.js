import { qxajax } from "./request";

// 获取华米数据
export const getHuami = (host = "127.0.0.1", params) => {
  return qxajax("get", `http://${host}/api/huami/user`, params);
};

// 获取华米用户数据
export const getHuamiName = (host = "127.0.0.1") => {
  return qxajax("get", `http://${host}/api/user`);
};
