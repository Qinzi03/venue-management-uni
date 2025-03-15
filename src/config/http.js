import { serve } from "@/config/env.js";
export function http(path, params = {}, method = "POST", loading = true) {
  console.log("%c请求拦截：", " background:orange", params);
  if (loading) {
    uni.showLoading({
      title: "加载中",
      mask: true,
    });
  }

  return new Promise((resolve, reject) => {
    uni.request({
      header: {
        Cookie: uni.getStorageSync("cookie-sessionId") || "",
      },
      url: serve + path,
      method,
      data: params,
      async success(res) {
        // uni.hideLoading();

        console.log("响应拦截：", path, res, params, res.data);
        if (res.data?.code !== 200) {
          uni.showToast({
            icon: "error",
            duration: 2000,
            title: res.data.message,
          });
          reject(res.data);
        }
        if (path === "/login") {
          uni.setStorageSync("cookie-sessionId", res.header["Set-Cookie"]);
        }
        resolve(res.data);
      },
      fail(err) {
        // uni.hideLoading();
        uni.reLaunch({
          url: "/pages/index/index",
        });
        reject(err);
      },
      complete() {
        uni.hideLoading(); // 在showToast之前执行会受影响
      },
    });
  });
}
