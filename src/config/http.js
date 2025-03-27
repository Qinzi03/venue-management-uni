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
        // 70000表示登录过期
        //  uni.getStorageSync("userId") 通过判断来防止重复请求跳转登录
        if (res.data?.code === 70000 && uni.getStorageSync("userInfo")) {
          uni.showToast({
            icon: "error",
            duration: 2000,
            title: "您的登录已过期，请重新登陆",
          });
          uni.clearStorageSync();
          uni.switchTab({ url: "/pages/person/index" });
          reject(res.data);
          return;
        }
        if (res.data?.code !== 200) {
          uni.showToast({
            icon: "error",
            duration: 2000,
            title: res.data.message,
          });
          reject(res.data);
          return;
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
