<template>
  <uv-popup ref="popup" mode="bottom" round="8" @change="onChange">
    <view class="title">请填写登录信息</view>
    <view class="login">
      <view class="loginImg">
        <button
          class="avatar-wrapper"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <image class="avatar" :src="avatarUrl"></image>
        </button>
      </view>
      <view class="loginInput">
        <input
          v-model="nickName"
          type="nickname"
          class="weui-input"
          placeholder="请输入昵称"
        />
      </view>
    </view>
    <uv-button type="primary" @click="onConfirm">提交</uv-button>
  </uv-popup>
</template>
<script setup>
import { ref } from "vue";

const defaultAvatarUrl =
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
const avatarUrl = ref(defaultAvatarUrl);
const nickName = ref("");
const onChooseAvatar = (e) => {
  avatarUrl.value = e.detail.avatarUrl;
};

const emit = defineEmits(["onSubmit"]);
const onConfirm = () => {
  console.log("avatarUrl", avatarUrl.value);
  console.log("nickName", nickName.value);

  if (!avatarUrl.value) {
    uni.showToast({
      title: "请选择头像",
      icon: "none",
    });
    return;
  }
  if (!nickName.value) {
    uni.showToast({
      title: "请输入昵称",
      icon: "none",
    });
    return;
  }
  emit("onSubmit", {
    avatarUrl: avatarUrl.value,
    nickName: nickName.value,
  });
};

const onChange = ({ show }) => {
  if (show) {
    uni.hideTabBar();
    return;
  }
  uni.showTabBar();
};
const popup = ref();
const open = () => {
  popup.value.open();
};
const close = () => {
  popup.value.close();
};

defineExpose({
  open,
  close,
});
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 10px;
}
.avatar {
  width: 80px;
  height: 80px;
}
.loginInput {
  width: 90%;
  border: 1px solid #efefef;
  margin: 20px;
  padding: 10px;
}
.title {
  font-size: 16px;
  color: #333;
  text-align: center;
  padding-top: 14px;
}
</style>
