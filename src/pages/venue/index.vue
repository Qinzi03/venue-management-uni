<template>
  <view class="page">
    <uv-list
      v-if="createList.length"
      class="marginT20"
      :itemStyle="{ height: '50px' }"
    >
      <view class="cardContent">
        <view class="cardList" v-for="item in createList" :key="item.id">
          <view class="row" @click="onToPage">
            <view class="title">{{ item.Name }}</view>
            <view class="value">打卡人数：{{ item.onLineNum || 0 }}人</view>
          </view>

          <view class="marginT20">
            <!-- <view class="person">场馆合伙人：</view> -->

            <view class="row marginT20">
              <view
                class="avatar"
                v-for="partnerItem in partnerList"
                :key="item.id"
              >
                <uv-avatar
                  src="https://via.placeholder.com/200x200.png/2878ff"
                  text="北"
                  fontSize="18"
                  randomBgColor
                ></uv-avatar>
                <view
                  class="deleteIcon"
                  @click="onDelPartner(item, partnerItem)"
                >
                  <uv-icon name="close-circle"></uv-icon>
                </view>
              </view>

              <view class="flex" @click.stop="onClickPartner(item)">
                <uv-icon name="plus"></uv-icon>增加合伙人
              </view>
            </view>
          </view>
        </view>
      </view>
    </uv-list>
    <view class="empty" v-else>
      <uv-empty
        mode="list"
        icon="https://tse3-mm.cn.bing.net/th/id/OIP-C.A6sNosOAiGe9IDUlLVETvAHaHa?rs=1&pid=ImgDetMain"
        text="您还没有创建的场馆，请点击右下角进行创建"
      ></uv-empty>
    </view>
    <view class="add" @click="onAdd"> 创建场馆 </view>
    <ve-footer tabName="venue"> </ve-footer>

    <uv-modal
      ref="modal"
      title="删除合伙人"
      :content="`确定将${delName}从合伙人删除`"
      @confirm="onConfirmDel"
    ></uv-modal>
  </view>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { myVenue, delPartner } from "@/config/api.js";
onMounted(() => {
  getListData();
});
const createList = ref([]);
const partnerList = ref([]);

const getListData = async () => {
  const res = await myVenue();
  createList.value = res.venues || [];
  partnerList.value = res.partnerList || [];
};
// const getPartnerData = async () => {
//   const res = await getPartnerList({venue_id:});
//   partnerList.value = res.data || [];
// };

const onAdd = () => {
  uni.navigateTo({
    url: `/pages/createVenue/index`,
  });
};

// 合伙人管理
const onClickPartner = (item) => {
  uni.navigateTo({
    url: `/pages/addPartner/index?venueId=${item.VenueId}`,
    events: {
      confirm: function () {
        getListData();
      },
    },
  });
};
// 跳转详情
const onToPage = (item) => {
  uni.navigateTo({
    url: `/pages/venueDetail/index?venueId=${item.VenueId}`,
  });
};

const delName = ref("");
const modal = ref();
const onDelPartner = async (item, partnerItem) => {
  modal.value.open();
};
const onConfirmDel = async () => {
  await delPartner({ venue_id: item.venueId, user_id: partnerItem.userId });
  uni.showToast({
    icon: "success",
    title: "删除成功",
  });
  getListData();
};
</script>
<style lang="scss" scoped>
.page {
  background-color: #f3f4f6;
  height: 100vh;
  overflow: auto;
}
.add {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 60px;
  background-color: #1989fa;
  bottom: 120px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 10px;
  text-align: center;
}
.flex {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
.marginT20 {
  margin-top: 20px;
}
.marginR {
  margin-right: 10px;
}
.empty {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -140px;
  margin-top: -180px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: 16px;
    font-weight: 700;
  }
  .label {
    color: #9e9e9e;
  }
  .value {
    font-size: 12px;
    color: #333333;
  }
}
.person {
  color: #333333;
  margin-bottom: 4px;
}
.avatar {
  margin-right: 10px;
  position: relative;
}
.deleteIcon {
  position: absolute;
  top: 0;
  right: -10px;
}
</style>
