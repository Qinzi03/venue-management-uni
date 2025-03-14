<template>
  <view class="person-page">
    <view class="list-content formContent">
      <view class="flex-start user-cell">
        <view>
          <image
            :src="
              personalInfo.nickName
                ? '/static/user-logo.png'
                : '/static/user-logo-gray.png'
            "
            class="user-logo"
          ></image>
        </view>
        <view v-if="personalInfo.nickName">
          <view class="user">{{ personalInfo.nickName }}</view>
          <view class="phone">{{ personalInfo.phoneNum }}</view>
        </view>
        <view v-else>
          <!-- 修改此处，点击触发授权登录 -->
          <view class="user" @click="authorizeLogin">登录/注册</view>
        </view>
      </view>
      <view class="group-content">
        <uv-cell-group :border="false">
          <uv-cell title="我的积分" isLink size="large">
            <template #icon>
              <view class="icon-bg">
                <uv-icon name="gift-fill"></uv-icon>
              </view>
            </template>
          </uv-cell>
          <uv-cell title="数据报表" isLink size="large">
            <template #icon>
              <view class="icon-bg">
                <uv-icon name="eye-fill"></uv-icon>
              </view>
            </template>
          </uv-cell>
          <uv-cell title="记录流水" isLink size="large">
            <template #icon>
              <view class="icon-bg">
                <uv-icon name="file-text-fill"></uv-icon>
              </view>
            </template>
          </uv-cell>
          <uv-cell title="关于软件" isLink size="large">
            <template #icon>
              <view class="icon-bg">
                <uv-icon name="setting-fill"></uv-icon>
              </view>
            </template>
          </uv-cell>
        </uv-cell-group>
      </view>
    </view>
  </view>
  <ve-footer tabName="person"></ve-footer>
</template>

<script setup>
import { ref, reactive } from "vue";
import { login } from "@/config/api.js";

// 定义个人信息数据
const personalInfo = reactive({
  nickName: "",
  phoneNum: "",
});

// 检查用户是否已登录
const checkLoginStatus = () => {
  const userInfo = uni.getStorageSync("userInfo");
  if (userInfo) {
    personalInfo.nickName = userInfo.nickName;
    personalInfo.phoneNum = userInfo.phoneNum;
  }
};

// 页面加载时检查登录状态
checkLoginStatus();

// 授权登录方法
const authorizeLogin = async () => {
  try {
    // 发起授权请求
    const { authSetting } = await uni.getSetting();
    if (!authSetting["scope.userInfo"]) {
      const { authSetting: newAuthSetting } = await uni.authorize({
        scope: "scope.userInfo",
      });
      if (!newAuthSetting["scope.userInfo"]) {
        uni.showToast({
          title: "用户拒绝授权",
          icon: "none",
        });
        return;
      }
    }

    // 获取用户信息
    const { userInfo } = await uni.getUserInfo({
      provider: "weixin",
    });

    // 调用微信登录接口获取 code
    const { code } = await uni.login({
      provider: "weixin",
    });

    // 这里需要将 code 和用户信息发送到后端服务器，以下是示例代码，实际使用时需要替换为真实的后端接口地址
    const res = await login({
      code,
      ...userInfo,
    });
    // 处理后端返回的结果
    if (res.code === 200) {
      // 登录成功，保存用户信息到本地存储
      uni.setStorageSync("userInfo", { ...userInfo, userId: res.data.user_id });
      personalInfo.nickName = userInfo.nickName;
      personalInfo.phoneNum = userInfo.phoneNum;
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

<style lang="scss" scoped>
@import url(../../scss/global.scss);
.person-page {
  background-image: url("https://fscdn.zto.com/GetPublicFile/clouddrive/PRO_396/person-bg.png");
  background-size: 100% 50%;
  background-repeat: no-repeat;
}
.list-content {
  position: relative;
  top: 48rpx;
}
.user-cell {
  margin-bottom: 10rpx;
}
.user-logo {
  width: 110rpx;
  height: 110rpx;
  margin-right: 20rpx;
}
.list-logo {
  width: 68rpx;
  height: 68rpx;
  margin-right: 20rpx;
}
.nav-header-self {
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, rgba(198, 224, 255, 0) 0%, #f2f3f5 100%);
}
.user {
  font-size: 36rpx;
  color: #3f434e;
}
.phone {
  font-size: 24rpx;
  color: #636877;
}
.group-content {
  background-color: #fff;
  margin-top: 20rpx;
  border-radius: 16rpx;
}
.icon-bg {
  background-color: #f5f4fc;
  padding: 6px;
  margin-right: 10px;
}
</style>
