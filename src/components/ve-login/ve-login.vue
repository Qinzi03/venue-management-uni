<template>
  <view v-if="!personalInfo.nickName" class="login">
    <view class="logo" @click="onToPage">
      <uv-icon
        name="arrow-downward"
        color="#9fdfca"
        size="40"
        labelColor="#8f8f94"
        labelSize="12px"
        labelPos="bottom"
        label="您还没有登录，请点击下方【我的】进行登录使用"
        space="16px"
      ></uv-icon>
    </view>
  </view>
</template>

<script setup>
import { reactive } from "vue";
// 定义个人信息数据
const personalInfo = reactive({
  nickName: "",
  phoneNum: "",
});

const emit = defineEmits(["changeStatus"]);
// 检查用户是否已登录
const checkLoginStatus = () => {
  const userInfo = uni.getStorageSync("userInfo");
  if (userInfo) {
    personalInfo.nickName = userInfo.nickName;
    personalInfo.phoneNum = userInfo.phoneNum;
  }
  emit("changeStatus", !!userInfo);
};

// 组件加载时检查登录状态
checkLoginStatus();

const onToPage = () => {
  uni.switchTab({ url: "/pages/person/index" });
};
</script>

<style lang="scss" scoped>
.login {
  margin-top: 400rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
  text-align: center;
}
.text-area {
  display: flex;
  justify-content: center;
  font-size: 12px;
  margin-top: 16px;
}
.logo {
  text-align: center;
}
</style>
