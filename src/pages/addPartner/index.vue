<template>
  <view class="search">
    <uv-search
      placeholder="搜索合伙人微信昵称"
      :showAction="false"
      v-model="keyword"
      @change="onInput"
    ></uv-search>
    <view class="list">
      <uv-list>
        <uv-list-item
          v-for="item in list"
          :key="item.user_id"
          :title="item.nick_name"
        >
          <view
            class="listItem"
            @click="onClickItem(item)"
            v-html="item.nick_name"
          ></view>
        </uv-list-item>
      </uv-list>
    </view>
    <uv-modal
      ref="modal"
      title="添加合伙人"
      :showCancelButton="true"
      :asyncClose="true"
      :content="`确定将${choosedItem.nick_name}添加为合伙人`"
      @confirm="onConfirm"
      @cancel="onCancel"
    ></uv-modal>
  </view>
</template>

<script setup>
import { getCurrentInstance, ref, onMounted } from "vue";
import { searchUser, addPartner } from "@/config/api.js";
import { onLoad } from "@dcloudio/uni-app";

const list = ref([]);
const getListData = async (keyword) => {
  if (!keyword) {
    list.value = [];
    return;
  }
  const res = await searchUser({ name: keyword });
  list.value = res.data;
};
const keyword = ref("");
const onInput = (keyword) => {
  getListData(keyword);
};

const modal = ref();
const choosedItem = ref({});
const onClickItem = (item) => {
  modal.value.open();
  choosedItem.value = item;
};

const eventChannel = ref();
onMounted(() => {
  const instance = getCurrentInstance().proxy;
  eventChannel.value = instance.getOpenerEventChannel();
});

const venueId = ref();
const onConfirm = async () => {
  try {
    await addPartner({
      venue_id: venueId.value,
      user_id: choosedItem.value.user_id,
    });
    uni.showToast({
      icon: "success",
      title: "新增成功",
    });
  } finally {
    modal.value.closeLoading();
    modal.value.close();
  }
  eventChannel.value.emit("confirm", {
    data: "1",
  });

  uni.navigateBack();
};
const onCancel = () => {
  modal.value.close();
};
onLoad((option) => {
  venueId.value = option.venueId;
});
</script>

<style scoped>
.search {
  padding: 10px 16px;
}
.list {
  margin-top: 20px;
}
.listItem {
  padding: 10px;
}
</style>
