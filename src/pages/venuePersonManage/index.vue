<template>
  <view>
    <!-- 筛选 -->
    <view class="header">
      <uv-drop-down
        ref="dropDown"
        sign="dropDown_1"
        text-active-color="#333"
        :extra-active-icon="{ name: 'arrow-up', color: '#333' }"
        :custom-style="{ padding: '0 30rpx' }"
      >
        <uv-drop-down-item
          name="time"
          type="2"
          :label="timeLabel"
          :value="time.label"
        >
        </uv-drop-down-item>
      </uv-drop-down>
      <uv-drop-down-popup
        sign="dropDown_1"
        ref="dropDownTime"
        :click-overlay-on-close="true"
        :currentDropItem="currentDropItem"
        @popupChange="change"
      >
        <uv-calendars
          insert
          ref="calendars"
          mode="range"
          :date="time.label"
          color="#9fdfca"
          startDate="2025-01-01"
          :endDate="today"
          :allowSameDay="true"
          @change="onClickDate"
        />
        <view class="btnGroup">
          <view class="footerBtnItem">
            <uv-button
              type="primary"
              size="large"
              @click="onConfirmDate"
              text="确定"
            >
            </uv-button>
          </view>
          <view class="footerBtnItem">
            <uv-button
              type="default"
              :plain="true"
              size="large"
              text="取消"
              :hairline="true"
              @click="onCloseDate"
            >
            </uv-button>
          </view>
        </view>
      </uv-drop-down-popup>
    </view>
    <!-- tab -->
    <view>
      <uv-tabs :list="list" lineColor="#9fdfca" @click="onClickTab"></uv-tabs>
    </view>
  </view>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
import { formatDate, formatShortDate } from "@/utils/util.js";
import { visitedByDateRange } from "@/config/api.js";
import { onLoad } from "@dcloudio/uni-app";

const today = formatDate(new Date());
const time = reactive({
  label: [today, today],
  activeIndex: 0,
});

const timeLabel = computed(() => {
  return `${formatShortDate(time.label[0])} - ${formatShortDate(
    time.label[1]
  )}`;
});
const calendars = ref();
const clickDateValue = ref("");
const onClickDate = (res) => {
  console.log(res, "confirm");
  clickDateValue.value = res.range.data;
};

const venueId = ref("");
const onClickTab = async (index) => {
  const res = await visitedByDateRange({
    venue_id: venueId.value,
    start_date: time.label[0],
    end_date: time.label[1],
  });
  console.log(res);
};

const dropDownTime = ref();
const onConfirmDate = () => {
  if (!clickDateValue.value.length) {
    uni.showToast({
      title: "请选择开始时间和结束时间",
      icon: "none",
    });
    return;
  }
  time.label = clickDateValue.value;
  dropDownTime.value.close();
  onClickTab();
};
const onCloseDate = () => {
  dropDownTime.value.close();
};

const list = ref([
  {
    name: "全部",
    index: 0,
  },
  {
    name: "新人",
    index: 1,
  },
  {
    name: "熟客",
    index: 2,
  },
]);

onLoad((option) => {
  console.log(option);
  venueId.value = option.id;
  onClickTab(0);
});
</script>
<style lang="scss" scoped>
.btnGroup {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  border-top: 1px solid #efefef;
  margin-top: 10px;
}
.footerBtnItem {
  width: 48%;
}
::v-deep(.header) {
  margin-top: 12px;
  padding: 5px 12px;

  .uv-drop-down {
    padding: 0 !important;
    border-bottom: none !important;
  }
  .uv-drop-down-item {
    padding: 6px 12px !important;
    background-color: #f2f3f5;
    border-radius: 4px;
  }
  .uv-text__value {
    max-width: 180px !important;
  }
}
</style>
