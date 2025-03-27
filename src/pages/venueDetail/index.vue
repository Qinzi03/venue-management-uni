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
            <view v-if="detailForm.Notice" class="flex notice textColor">
              <uv-notice-bar :text="detailForm.Notice"></uv-notice-bar>

              <view class="delNoticeIcon" @click="onCancelPub"
                ><uv-icon name="close-circle" color="#f9ae3d"></uv-icon
              ></view>
            </view>
            <view class="flex-end marginT40">
              <view class="marginR20">
                <uv-button
                  text="发布通知"
                  type="primary"
                  color="#9fdfca"
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
              v-if="!hasSignIn"
              text="打卡"
              color="#9fdfca"
              size="small"
              @click="onClockInSingle(item.id)"
            ></uv-button>
          </view>
          <view class="marginR20">
            <uv-button
              text="删除"
              size="small"
              @click="onDelTable(item)"
            ></uv-button>
          </view>
          <view class="marginR20">
            <uv-button
              :text="`${item.status ? '开机' : '关机'}`"
              type="primary"
              color="#9fdfca"
              size="small"
              @click="onChangeTableStatus"
            ></uv-button>
          </view>
        </view>
      </view>

      <uv-button
        @click="onAdd"
        class="add"
        type="primary"
        color="#9fdfca"
        text="增加桌子"
      ></uv-button>

      <uv-modal
        ref="publishModal"
        title="发布公告"
        :showCancelButton="true"
        :asyncClose="true"
        @confirm="onConfirmPub"
        @cancel="onCancelPub"
      >
        <view class="slot-content">
          <uv-textarea v-model="notice" placeholder="请输入内容"></uv-textarea>
        </view>
      </uv-modal>
    </view>
  </view>
</template>
<script setup>
import { reactive, ref } from "vue";
import {
  getDetailsVenue,
  getDetailsTableVenue,
  signIn,
  dailySignIn,
  publishNotice,
  addTable,
  delTable,
  delNotice,
} from "@/config/api.js";
import { onLoad } from "@dcloudio/uni-app";
let detailForm = reactive({
  name: "",
  address: "",
  phone: "",
  Notice: "",
});
const venueId = ref("");
const onClockInSingle = async (id) => {
  await signIn({ venue_id: venueId.value, table_id: id });
  uni.showToast({
    duration: 2000,
    title: "打卡成功！",
  });
  getSignInStatus();
};

const notice = ref("");
const publishModal = ref();
const onPublish = () => {
  publishModal.value.open();
};

const onConfirmPub = async () => {
  if (!notice.value) {
    uni.showToast({
      icon: "error",
      duration: 2000,
      title: "请先输入公告内容！",
    });
    publishModal.value.closeLoading();
    return;
  }
  try {
    await publishNotice({ venue_id: venueId.value, notice: notice.value });

    getDetailsInfo(venueId.value);
  } finally {
    publishModal.value.closeLoading();
    publishModal.value.close();
  }
};

const onCancelPub = async () => {
  await delNotice({ venue_id: venueId.value });
  getDetailsInfo(venueId.value);
};
const onDelTable = async (item) => {
  await delTable({ table_id: item.id });

  getTableDetail(venueId.value);
};
const onChangeTableStatus = () => {};

const list = ref([]);

// 场馆详情
const getDetailsInfo = async (id) => {
  const res = await getDetailsVenue(id);
  detailForm.name = res.data.Name;
  detailForm.address = res.data.Location;
  detailForm.phone = res.data.Contact;
  detailForm.Notice = res.data.Notice;
};

// 桌子详情
const getTableDetail = async (id) => {
  const res = await getDetailsTableVenue(id);
  list.value =
    res.data &&
    res.data.map((item) => {
      return {
        id: item.ID,
        status: item.Status,
        statusStr: item.Status ? "使用中" : "未开始",
      };
    });
};
const onAdd = async () => {
  await addTable({ venue_id: venueId.value });

  getTableDetail(venueId.value);
};

const hasSignIn = ref(false);

const getSignInStatus = async () => {
  const today = new Date()
    .toLocaleDateString("zh", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", "-");
  const res = await dailySignIn({ date: today });
  // 场馆id在日签到的所有场馆中，表示已经签到过了
  hasSignIn.value =
    (res &&
      res.data &&
      res.data.some((item) => item.venue_id === venueId.value)) ||
    false;
};

onLoad((option) => {
  console.log(option);
  venueId.value = option.id;
  getDetailsInfo(venueId.value);
  getTableDetail(venueId.value);
  getSignInStatus();
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
  .delNoticeIcon {
    position: relative;
    top: -16px;
  }
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
.slot-content {
  width: 240px;
}
</style>
