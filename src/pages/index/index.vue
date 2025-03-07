<template>
  <view class="content">
    <image
      v-if="!personalInfo.nickname"
      class="logo"
      src="/static/logo.png"
    ></image>
    <view v-if="!personalInfo.nickname" class="text-area">
      <text class="title"> 您还没有登录，请点击下方【我的】进行登录使用 </text>
    </view>
    <view v-else>
      <uv-calendars
        insert
        :selected="onRemarkDate"
        @change="change"
      ></uv-calendars>
    </view>
    <view class="list">
      <text class="title">最近常去的场馆：</text>
      <view v-for="(item, index) in frequantList" :key="index">
        <uv-cell
          :title="item.name"
          value="去打卡"
          isLink
          @click="onPage"
          :label="`${item.count}次`"
        ></uv-cell>
      </view>
    </view>
    <ve-footer tabName="index"></ve-footer>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 定义个人信息数据
const personalInfo = reactive({
  nickname: "zhangsan",
  phoneNum: "",
});

// 检查用户是否已登录
const checkLoginStatus = () => {
  const userInfo = uni.getStorageSync("userInfo");
  if (userInfo) {
    personalInfo.nickname = userInfo.nickname;
    personalInfo.phoneNum = userInfo.phoneNum;
  }
};

// 页面加载时检查登录状态
checkLoginStatus();
const onRemarkDate = ref([
  { date: `2025-03-02`, info: "打卡", badge: true, infoColor: "#1989fa" },
  { date: `2025-03-06`, info: "打卡", infoColor: "#1989fa", badge: true },
]);

const change = (res) => {
  console.log(res);
};

const frequantList = [
  {
    name: "场馆1",
    count: 5,
  },
  {
    name: "场馆2",
    count: 3,
  },
  {
    name: "场馆3",
    count: 2,
  },
];
// 去打卡
const onPage = () => {
  uni.navigateTo({
    url: "pages/venueDetail/index",
  });
};
</script>
<style lang="scss">
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

.list {
  width: 100%;
  margin-top: 20px;
  .title {
    font-size: 16px;
    color: #333333;
    padding: 0px 20px;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
