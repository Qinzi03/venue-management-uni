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
            <view class="flex-start marginB">
              <view class="marginR">
                <uv-icon name="map-fill" color="#474747" size="14"></uv-icon>
              </view>

              {{ detailForm.address }}</view
            >
            <view class="flex-start marginB">
              <view class="marginR">
                <uv-icon name="phone-fill" color="#474747" size="14"></uv-icon>
              </view>
              {{ detailForm.phone }}</view
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
          <view class="label">桌子编号：</view
          ><view class="textColor">{{ index + 1 }}</view></view
        >
        <view class="marginT10 marginB20 font28 flex-start"
          ><view class="label">使用状态：</view
          ><view class="textColor">{{ item.statusStr }}</view></view
        >
        <view class="cardBorder flex-end btnRow">
          <view class="marginR20">
            <uv-button
              text="打卡"
              size="small"
              @click="onClockInSingle(item.id)"
            ></uv-button>
          </view>
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

      <uv-button
        @click="onAdd"
        class="add"
        type="primary"
        text="增加桌子"
      ></uv-button>
    </view>
  </view>
</template>
<script setup>
import { reactive, ref } from "vue";
import { getDetailsVenue, signIn } from "@/config/api.js";
import { onLoad } from "@dcloudio/uni-app";
let detailForm = reactive({
  name: "",
  address: "",
  phone: "",
  notifies: [],
});
const venueId = ref("");
const onClockIn = () => {};
const onClockInSingle = async (id) => {
  await signIn({ venue_id: venueId.value, table_id: id });
  uni.showToast({
    duration: 2000,
    title: "打卡成功！",
  });
};
const onPublish = () => {};

const list = ref([]);

const getDetailsInfo = async (id) => {
  const res = await getDetailsVenue(id);
  detailForm.name = res.venue.Name;
  detailForm.address = res.venue.Location;
  detailForm.phone = res.venue.Contact;
  detailForm.notifies = res.venue.notifies;
  list.value = res.tables.map((item) => {
    return {
      id: item.ID,
      status: item.Status,
      statusStr: item.Status ? "使用中" : "未开始",
    };
  });
};
const onAdd = () => {
  list.value.push({
    id: Math.random(),
    status: 0,
    statusStr: "未开始",
  });
};

onLoad((option) => {
  console.log(option);
  venueId.value = option.id;
  getDetailsInfo(option.id);
});

// 跳转人员详情
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
  margin-top: 20px;
}
.marginB {
  margin-bottom: 10px;
}
.marginR {
  margin-right: 8px;
}
</style>
