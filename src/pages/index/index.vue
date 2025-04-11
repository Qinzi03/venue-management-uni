<template>
  <view class="page">
    <ve-logout-text @changeStatus="onChangeLoginStatus"></ve-logout-text>
    <view v-if="loginStatus" class="content">
      <view class="search">
        <uv-search
          placeholder="搜索场馆"
          disabled
          searchIconColor="#9fdfca"
          borderColor="#9fdfca"
          placeholderColor="#9fdfca"
          :showAction="false"
          @click="onPageSeach"
        ></uv-search>
      </view>
      <view class="calendars">
        <uv-calendars
          insert
          :selected="onRemarkDate"
          :showMonth="false"
          color="#9fdfca"
          @change="change"
        ></uv-calendars>
      </view>

      <view class="list">
        <view class="title">
          <text>最近常去的场馆</text>
        </view>
        <view
          v-if="frequantListSort && frequantListSort.length"
          v-for="(item, index) in frequantListSort"
          :key="index"
          class="listItem"
        >
          <uv-cell
            :title="item.name"
            value="去打卡"
            isLink
            @click="onPage(item)"
            :title-class="`${item.dailySignInFlag ? 'remarkColor' : ''}`"
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
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { getVisitedVenue, getSignInDate, dailySignIn } from "@/config/api.js";
import { onShow } from "@dcloudio/uni-app";
import { loginStatus, onChangeLoginStatus, formatDate } from "@/utils/util.js";
const onRemarkDate = ref([
  // { date: `2025-03-02`, info: "打卡", badge: true, infoColor: "#1989fa" },
  // { date: `2025-03-06`, info: "打卡", infoColor: "#1989fa", badge: true },
]);

const getDateInfo = async () => {
  const res = await getSignInDate();
  onRemarkDate.value = res.data.map((item) => {
    return { date: item, info: "打卡", infoColor: "#5a7f73", badge: true };
  });
  console.log("----getDateInfo", res.data, onRemarkDate.value);
};
const dailySignInList = ref([]);
const today = formatDate(new Date());

const clickDate = ref(today);
const change = async (res) => {
  console.log(res);
  clickDate.value = res.fulldate;
  getListinDaily();
};
// 获取点击日期下的签到场馆
const getListinDaily = async () => {
  const res = await dailySignIn({ date: clickDate.value });
  dailySignInList.value = res.data || [];
};
getListinDaily();
const frequantList = ref([]);

const getVisitedData = async () => {
  const res = await getVisitedVenue();
  frequantList.value = res.data || [];
};

const frequantListSort = computed(() => {
  frequantList.value.forEach((item) => {
    item.dailySignInFlag = dailySignInList.value.includes(item.name) ? 1 : 0;
  });
  return frequantList.value.sort(
    (a, b) =>
      dailySignInList.value.includes(a.dailySignInFlag) -
      dailySignInList.value.includes(b.dailySignInFlag)
  );
});

// 去打卡
const onPage = (item) => {
  uni.navigateTo({
    url: `/pages/venueDetail/index?id=${item.venue_id}`,
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
  height: 100vh;
  background-color: #f3f4f6;
}

.content {
  width: 100%;
  padding-bottom: 40px;
}

.list {
  width: 100%;
  margin-top: 20px;
  .title {
    font-size: 16px;
    color: #333333;
    padding: 10px 20px;
    font-weight: bold;
  }
  .listItem {
    background-color: #fff;
    margin: 10px;
    border-radius: 10px;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

::v-deep(.calendars) {
  height: 280px;
  padding: 0 10px 10px;
  background-color: #fff;
  border-radius: 0 0 10px 10px;

  .uv-calendar-item--disable {
    display: none !important;
  }

  .uv-calendar-item__weeks-box-item {
    height: 40px !important;
    width: 40px !important;
  }

  .uv-calendar__header {
    background-color: #8bc4b1;
    border-bottom-width: 0px !important;
    border-radius: 10px 10px 0 0;
    height: 40px !important;
    .uv-calendar__header-btn-box {
      display: none;
    }
    .uv-calendar__header-text {
      color: #fff !important;
    }
  }
  .uv-calendar__weeks-day {
    display: none !important;
  }
  .uv-calendar__weeks-day {
    border-bottom-width: 0px !important;
  }
  .uv-calendar__box {
    background-color: #9fdfca;
    border-radius: 0 0 10px 10px;
    padding-bottom: 10px;
  }

  .uv-calendar-item__weeks-box-circle {
    background-color: #f56c6c !important;
    right: 0px !important;
  }
  .uv-calendar-item__weeks-lunar-text {
    color: #5a7f73 !important;
  }

  .uv-calendar-item--isDay {
    background-color: transparent !important;
    color: #5a7f73 !important;
    .uv-calendar-item__weeks-box-item {
      background-color: #fff !important;
      border-radius: 40px;
    }
  }
  .uv-calendar-item--isDay-text {
    color: #5a7f73 !important;
  }
}
.search {
  padding: 10px 16px;
  background-color: #fff;
}
.empty {
  margin-top: 20px;
}
.remarkColor {
  color: #9fdfca !important;
  font-weight: bold;
}
</style>
