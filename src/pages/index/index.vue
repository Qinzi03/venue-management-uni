<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title"> 您还没有登录，请点击下方【我的】进行登录使用 </text>
    </view>
    <ve-footer tabName="index"></ve-footer>
  </view>
</template>

<script setup></script>
<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 28rpx;
  color: #8f8f94;
}
</style>
