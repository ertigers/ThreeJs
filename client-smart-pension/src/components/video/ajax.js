function ajax(method, url, params) {
  return new Promise((resolve, reject) => {
    // 创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest();
    // 状态改变时的回调
    xhr.onreadystatechange = function () {
      // readyState为4的时候已接收完毕
      if (xhr.readyState === 4) {
        // 状态码200表示成功
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.status);
        }
      }
    };

    // get
    if (method === "get" || method === "GET") {
      if (typeof params === "object") {
        // params拆解成字符串
        params = Object.keys(params)
          .map(function (key) {
            return (
              encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
            );
          })
          .join("&");
      }
      url = params ? url + "?" + params : url;
      xhr.open(method, url, true);
      xhr.send();
    }

    //post
    if (method === "post" || method === "POST") {
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.setRequestHeader("Accept", "*/*");
      xhr.send(JSON.stringify(params));
    }
  });
}

// 获取华米数据
export const getHuami = (host = "127.0.0.1", params) => {
  return ajax("get", `http://${host}/api/huami/user`, params);
};

// 获取华米用户数据
export const getHuamiName = (host = "127.0.0.1") => {
  return ajax("get", `http://${host}/api/user`);
};
