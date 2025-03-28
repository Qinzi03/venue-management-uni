<template>
  <view class="page">
    <ve-logout-text @changeStatus="onChangeLoginStatus"></ve-logout-text>
    <view v-if="loginStatus">
      <uv-list
        v-if="createList.length"
        class="marginT20"
        :itemStyle="{ height: '50px' }"
      >
        <view class="cardContent">
          <view
            class="cardList"
            v-for="item in createList"
            :key="item.venue_id"
          >
            <view class="row" @click="onToPage(item)">
              <view class="title">{{ item.venue_name }}</view>
              <view class="value"
                >打卡人数：{{ item.sign_in_count || 0 }}人</view
              >
            </view>

            <view class="marginT20">
              <!-- <view class="person">场馆合伙人：</view> -->

              <view class="row marginT20">
                <view
                  class="avatar"
                  v-for="partnerItem in item.partner_list"
                  :key="item.user_id"
                >
                  <uv-avatar
                    :text="getTextAvatar(partnerItem)"
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
          text="您还没有创建的场馆，请点击右下角进行创建"
        ></uv-empty>
      </view>
      <view class="add" @click="onAdd"> 创建场馆 </view>
    </view>

    <uv-modal
      ref="modal"
      title="删除合伙人"
      :showCancelButton="true"
      :asyncClose="true"
      :content="`确定将${clickPartner.nick_name}从合伙人删除`"
      @confirm="onConfirmDel"
      @cancel="onCancelDel"
    ></uv-modal>
  </view>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { myVenue, delPartner } from "@/config/api.js";
import { loginStatus, onChangeLoginStatus } from "@/utils/util.js";
onMounted(() => {
  getListData();
});

const createList = ref([]);
const getListData = async () => {
  const res = await myVenue();
  createList.value = res.data || [];
};

const getTextAvatar = (partnerItem) => {
  if (partnerItem.nick_name) {
    return partnerItem.nick_name.slice(0, 2);
  }
  return "名称";
};
const onAdd = () => {
  uni.navigateTo({
    url: `/pages/createVenue/index`,
  });
};

// 合伙人管理
const onClickPartner = (item) => {
  uni.navigateTo({
    url: `/pages/addPartner/index?venueId=${item.venue_id}`,
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
    url: `/pages/venueDetail/index?id=${item.venue_id}`,
  });
};

const modal = ref();
const clickPartner = ref({});
const onDelPartner = async (item, partnerItem) => {
  modal.value.open();
  clickPartner.value = { ...item, ...partnerItem };
};
const onConfirmDel = async () => {
  try {
    await delPartner({
      venue_id: clickPartner.value.venue_id,
      user_id: clickPartner.value.user_id,
    });
    uni.showToast({
      icon: "success",
      title: "删除成功",
    });
  } finally {
    modal.value.closeLoading();
    modal.value.close();
  }

  getListData();
};

const onCancelDel = () => {
  modal.value.close();
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
  background-color: $uni-color-primary;
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
