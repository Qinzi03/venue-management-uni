<template>
  <view class="page">
    <image
      v-if="!personalInfo.nickName"
      class="logo"
      src="/static/logo.png"
    ></image>
    <view v-if="!personalInfo.nickName" class="text-area">
      <text class="tip"> 您还没有登录，请点击下方【我的】进行登录使用 </text>
    </view>
    <view class="content" v-else>
      <view class="calendars">
        <uv-calendars
          insert
          :selected="onRemarkDate"
          @change="change"
        ></uv-calendars>
      </view>

      <view class="search">
        <uv-search
          placeholder="搜索场馆"
          disabled
          :showAction="false"
          @click="onPageSeach"
        ></uv-search>
      </view>
      <view class="list">
        <view class="title">
          <text>最近常去的场馆：</text>
        </view>
        <view
          v-if="frequantList.length"
          v-for="(item, index) in frequantList"
          :key="index"
        >
          <uv-cell
            :title="item.name"
            value="去打卡"
            isLink
            @click="onPage"
            :label="`${item.count}次`"
          ></uv-cell>
        </view>
        <view class="empty" v-else>
          <uv-empty
            mode="order"
            text="您还没有前往过场馆，请点击上方搜索前往"
          ></uv-empty>
        </view>
      </view>
    </view>
    <ve-footer tabName="index"></ve-footer>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getVisitedVenue, getSignInDate } from "@/config/api.js";
import { onShow } from "@dcloudio/uni-app";
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
const onRemarkDate = ref([
  // { date: `2025-03-02`, info: "打卡", badge: true, infoColor: "#1989fa" },
  // { date: `2025-03-06`, info: "打卡", infoColor: "#1989fa", badge: true },
]);

const getDateInfo = async () => {
  const res = await getSignInDate();
  onRemarkDate.value = res.data;
};
const change = (res) => {
  console.log(res);
};

const frequantList = ref([
  // {
  //   name: "场馆1",
  //   count: 5,
  // },
  // {
  //   name: "场馆2",
  //   count: 3,
  // },
  // {
  //   name: "场馆3",
  //   count: 2,
  // },
]);

const getVisitedData = async () => {
  const res = await getVisitedVenue();
  frequantList.value = res.data;
};
// 去打卡
const onPage = () => {
  uni.navigateTo({
    url: "/pages/venueDetail/index",
  });
};

const onPageSeach = () => {
  uni.navigateTo({
    url: "/pages/search/index",
  });
};

onShow(() => {
  getVisitedData();
  getDateInfo();
});
</script>
<style lang="scss">
.page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content {
  width: 100%;
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

.tip {
  font-size: 28rpx;
  color: #8f8f94;
}

.list {
  width: 100%;
  margin-top: 20px;
  .title {
    font-size: 14px;
    color: #333333;
    padding: 10px 20px;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.uv-calendar-item__weeks-box-item {
  height: 40px !important;
  width: 36px !important;
}
.uv-calendar-item--isDay {
  background-color: transparent !important;
  .uv-calendar-item__weeks-box-item {
    background-color: #3c9cff !important;
    border-radius: 4px;
  }
}
.calendars {
  height: 50vh;
}
.search {
  padding: 10px 16px;
}
.empty {
  margin-top: 20px;
}
</style>
