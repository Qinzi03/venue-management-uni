<template>
  <view class="person-page">
    <view class="list-content">
      <view class="flex-start user-cell">
        <view>
          <uv-avatar
            :src="personalInfo.userImg || '/static/user-logo.png'"
            size="60"
          ></uv-avatar>
        </view>
        <view v-if="personalInfo.nickName">
          <view class="user">{{ personalInfo.nickName }}</view>
        </view>
        <view v-else>
          <!-- 修改此处，点击触发授权登录 -->
          <view class="user" @click="onToLogin">登录/注册</view>
        </view>
      </view>
      <view class="group-content">
        <uv-cell-group :border="false">
          <uv-cell title="我的积分" isLink size="large" @click="onTodo">
            <template #icon>
              <view class="icon-bg">
                <uv-icon name="gift-fill"></uv-icon>
              </view>
            </template>
          </uv-cell>
          <uv-cell title="数据报表" isLink size="large" @click="onTodo">
            <template #icon>
              <view class="icon-bg">
                <uv-icon name="eye-fill"></uv-icon>
              </view>
            </template>
          </uv-cell>
          <!-- <uv-cell title="记录流水" isLink size="large" @click="onTodo">
            <template #icon>
              <view class="icon-bg">
                <uv-icon name="file-text-fill"></uv-icon>
              </view>
            </template>
          </uv-cell> -->
          <uv-cell title="关于软件" isLink size="large" @click="onToAbout">
            <template #icon>
              <view class="icon-bg">
                <uv-icon name="setting-fill"></uv-icon>
              </view>
            </template>
          </uv-cell>
        </uv-cell-group>
      </view>
    </view>

    <ve-login ref="loginComp" @onSubmit="authorizeLogin"></ve-login>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { login } from "@/config/api.js";
import { onShow } from "@dcloudio/uni-app";

// 定义个人信息数据
const personalInfo = reactive({
  nickName: "",
  userImg: "/static/user-logo.png",
});

// 检查用户是否已登录
const checkLoginStatus = () => {
  const userInfo = uni.getStorageSync("userInfo");
  const avatar = uni.getStorageSync("userAvator");
  if (userInfo) {
    personalInfo.nickName = userInfo.nickName;
    personalInfo.userImg = avatar;
    return;
  }
  personalInfo.nickName = "";
  personalInfo.userImg = "/static/user-logo.png";
};

// 页面加载时检查登录状态
onShow(() => {
  checkLoginStatus();
});
const loginComp = ref();
const onToLogin = () => {
  loginComp.value.open();
};
// 授权登录方法
const authorizeLogin = async (userInfo) => {
  try {
    // 调用微信登录接口获取 code
    const { code } = await uni.login({
      provider: "weixin",
    });

    // 这里需要将 code 和用户信息发送到后端服务器，以下是示例代码，实际使用时需要替换为真实的后端接口地址
    const res = await login({
      code,
      nick_name: userInfo.nickName,
      avatar: userInfo.avatarUrl,
    });
    // 处理后端返回的结果
    if (res.code === 200) {
      const fileSysObj = uni.getFileSystemManager();

      console.log("res.getFileSystemManager", fileSysObj);
      fileSysObj.saveFile({
        tempFilePath: userInfo.avatarUrl,
        success: (res) => {
          console.log("saveFile---", res.savedFilePath);
          personalInfo.userImg = res.savedFilePath;
          uni.setStorageSync("userAvator", res.savedFilePath);
        },
        fail: (err) => {
          console.log("saveFile---fail", err);
        },
        complete: (res) => {
          console.log("saveFile---complete", res);
        },
      });
      // 登录成功，保存用户信息到本地存储
      uni.setStorageSync("userInfo", {
        ...userInfo,
        userId: res.data.user_id,
      });
      personalInfo.nickName = userInfo.nickName;
      uni.showToast({
        title: "登录成功",
        icon: "success",
      });
      loginComp.value.close();
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

const onTodo = () => {
  uni.showToast({
    title: "功能开发中...即将上线",
    icon: "none",
  });
};
const onToAbout = () => {
  uni.navigateTo({
    url: "/pages/about/index",
  });
};
</script>

<style lang="scss" scoped>
@import url(../../scss/global.scss);
.person-page {
  height: 100vh;
}
.list-content {
  position: relative;
  background-color: #d6f3ea;
  padding: 24px 16px 0 16px;
}
.user-cell {
  margin-bottom: 30rpx;
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
  font-size: 40rpx;
  color: #3f434e;
  margin-left: 10px;
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
