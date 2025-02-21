<template>
  <view class="pageBg">
    <view class="headerTop">
      <uv-collapse :value="['address']" :border="false">
        <uv-collapse-item
          :title="detailForm.name"
          name="address"
          :border="false"
        >
          <view>
            <view class="flex-start"
              ><uv-icon name="map-fill" color="#474747" size="14"></uv-icon
              >{{ detailForm.address }}</view
            >
            <view class="flex-start"
              ><uv-icon name="phone-fill" color="#474747" size="14"></uv-icon
              >{{ detailForm.phone }}</view
            >
            <view
              v-for="(item, index) in detailForm.notifies"
              :key="index"
              class="flex notice textColor"
            >
              <view class="flex"
                >通知：
                <view>
                  {{ item }}
                </view></view
              >

              <view><uv-icon name="close-circle"></uv-icon></view>
            </view>
            <view class="flex-end marginT40">
              <view class="marginR20">
                <uv-button
                  text="打卡"
                  size="small"
                  @click="onClockIn"
                ></uv-button
              ></view>
              <view class="marginR20">
                <uv-button
                  text="发布通知"
                  type="primary"
                  size="small"
                  @click="onPublish"
                ></uv-button>
              </view>
            </view>
          </view>
        </uv-collapse-item>
      </uv-collapse>
    </view>

    <view class="row">
      <uv-cell
        title="人员管理"
        :isLink="true"
        @click="onToPage"
        :border="false"
      ></uv-cell>
    </view>

    <view class="cardContent">
      <view class="cardList" v-for="(item, index) in list" :key="item.id">
        <view class="marginT10 font28 flex-start">
          <view class="label">编号：</view
          ><view class="textColor">{{ index + 1 }}</view></view
        >
        <view class="marginT10 marginB20 font28 flex-start"
          ><view class="label">使用状态：</view
          ><view class="textColor">{{ item.statusStr }}</view></view
        >
        <view class="cardBorder flex-end btnRow">
          <view class="marginR20">
            <uv-button text="删除" size="small" @click="onPublish"></uv-button>
          </view>
          <view class="marginR20">
            <uv-button
              :text="`${item.status ? '开机' : '关机'}`"
              type="primary"
              size="small"
              @click="onPublish"
            ></uv-button>
          </view>
        </view>
      </view>
    </view>

    <view class="add" @click="onAdd">
      <uv-icon name="plus" size="30" color="#ffffff"></uv-icon>
    </view>
  </view>
</template>
<script setup>
import { reactive, ref } from "vue";

const detailForm = reactive({
  name: "春来花几枝/***",
  address: "人民广场南京路步行街",
  phone: "13515511551",
  notifies: ["3.3号开始营业", "开业打8折"],
});

const onClockIn = () => {};
const onPublish = () => {};

const list = ref([
  {
    id: "123232",
    status: 1,
    statusStr: "使用中",
  },
  {
    id: "12323245",
    status: 0,
    statusStr: "未开始",
  },
]);

const onAdd = () => {
  list.value.push({
    id: Math.random(),
    status: 0,
    statusStr: "未开始",
  });
};

// 跳转详情
const onToPage = (item) => {
  uni.navigateTo({
    url: "/pages/venuePersonManage/index",
  });
};
</script>
<style lang="scss" scoped>
.pageBg {
  background-color: #f3f4f6;
  height: 100vh;
  overflow: auto;
}
::v-deep(.headerTop) {
  background-color: #ffffff;
  .content-class {
    padding: 0 15px 8px !important;
  }
}
.cardContent {
  background-color: #f3f4f6;
}

.row {
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 2px rgb(238, 238, 238);
  margin: 10px 0;
}
.btnRow {
  padding-top: 10px;
}
.notice {
  margin-top: 8px;
}
.add {
  position: fixed;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: #1989fa;
  bottom: 120px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
