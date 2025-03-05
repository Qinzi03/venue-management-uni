<template>
  <div>
    <!-- 登录按钮 -->
    <button @click="wxLogin">微信登录</button>
    <ve-footer tabName="person"></ve-footer>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 定义微信登录方法
const wxLogin = async () => {
  try {
    // 调用微信登录接口获取 code
    const { code } = await uni.login({
      provider: "weixin",
    });

    // 这里需要将 code 发送到后端服务器，以下是示例代码，实际使用时需要替换为真实的后端接口地址
    const response = await uni.request({
      url: "https://your-backend-api.com/login",
      method: "POST",
      data: {
        code,
      },
    });

    // 处理后端返回的结果
    const { data } = response;
    if (data.code === 200) {
      // 登录成功，处理后续逻辑
      uni.showToast({
        title: "登录成功",
        icon: "success",
      });
    } else {
      // 登录失败，提示用户
      uni.showToast({
        title: "登录失败，请稍后重试",
        icon: "none",
      });
    }
  } catch (error) {
    // 处理登录过程中出现的错误
    console.error("微信登录出错:", error);
    uni.showToast({
      title: "登录出错，请稍后重试",
      icon: "none",
    });
  }
};
</script>
