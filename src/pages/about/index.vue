<template>
  <view class="about-page">
    <view class="header">
      <img
        class="img"
        src="https://qapp-chimera.vivo.com.cn/assets/img/quick-app-logo.2e96865f.png"
      />
    </view>
    <view class="content">
      <view class="title">功能介绍</view>
      <view class="item">
        <view class="mark">打卡：</view
        >当进入到某个场馆后，可在该场馆进行打卡，每月打卡将进行统计，打卡次数越多，可获得福利越多
      </view>
      <view class="item">
        <view class="mark">活动设置：</view
        >入口在场馆详情页，可进行相关开启活动的设置后，在【我的】-【活动打卡】页可进行查看，当满足时间范围和打卡次数后将展示【参与活动】入口
      </view>
      <view class="item">
        <view class="mark">记录流水：</view
        >可将每日开销进行记录，会生成月度流水报表可供查看
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.about-page {
  background-color: #f3f4f6;
  height: 100vh;
}
.header {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    width: 100px;
    height: 100px;
  }
}
.content {
  margin: 10px;
  padding: 14px;
  background-color: #fff;
  border-radius: 4px;
  .title {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  .item {
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
  }
  .mark {
    font-weight: bold;
  }
}
</style>
